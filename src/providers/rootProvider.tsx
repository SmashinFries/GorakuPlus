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
				case EventType.PRESS: {
					const link = Linking.createURL(detail.notification?.data?.url as string);
					Linking.openURL(link ?? 'gorakuplus://user');
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
