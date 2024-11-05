import { QueryClient } from '@tanstack/react-query';
import {
	PersistQueryClientOptions,
	PersistQueryClientProvider,
} from '@tanstack/react-query-persist-client';
import { ReactNode, useEffect } from 'react';
import notifee, { EventType } from '@notifee/react-native';
import * as Linking from 'expo-linking';
import { clientPersister } from '@/store/persister';
import { useCollectionUpdater } from '@/hooks/useCollections';
import { NotificationPressActionIds, notifNavigate } from '@/utils/notifications/backgroundFetch';

const queryClient = new QueryClient();

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
					notifNavigate(
						detail.notification,
						detail.pressAction.id as NotificationPressActionIds,
					);
					break;
				}
			}
		});
	}, []);
	return (
		<PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
			{children}
		</PersistQueryClientProvider>
	);
};
