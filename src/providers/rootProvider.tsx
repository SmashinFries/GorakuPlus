import { QueryClient } from '@tanstack/react-query';
import {
	PersistQueryClientOptions,
	PersistQueryClientProvider,
} from '@tanstack/react-query-persist-client';
import { ReactNode, useEffect } from 'react';
import notifee, { EventType } from '@notifee/react-native';
import { clientPersister } from '@/store/persister';
import { useCollectionUpdater } from '@/hooks/useCollections';
import { NotificationPressActionIds, notifNavigate } from '@/utils/notifications/backgroundFetch';
import { sendErrorMessage } from '@/utils/toast';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const queryClient = new QueryClient({
	defaultOptions: {
		mutations: {
			onError(error) {
				sendErrorMessage(error.name, error.message);
			},
		},
	},
});

const persistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
	persister: clientPersister,
	dehydrateOptions: {
		shouldDehydrateQuery: (query) => query.meta?.persist as boolean,
	},
};

export const RootProvider = ({ children }: { children: ReactNode }) => {
	const { fetchAllCollections } = useCollectionUpdater(queryClient);

	useEffect(() => {
		fetchAllCollections();
	}, []);

	useEffect(() => {
		return notifee.onForegroundEvent(({ type, detail }) => {
			switch (type) {
				case EventType.ACTION_PRESS:
				case EventType.PRESS: {
					detail.notification &&
						detail.pressAction &&
						notifNavigate(
							detail.notification,
							detail.pressAction.id as NotificationPressActionIds,
						);
					break;
				}
				default:
					break;
			}
		});
	}, []);

	return (
		<PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
			<KeyboardProvider>{children}</KeyboardProvider>
		</PersistQueryClientProvider>
	);
};
