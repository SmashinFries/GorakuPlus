import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import notifee, { EventType } from '@notifee/react-native';
import * as Linking from 'expo-linking';

const queryClient = new QueryClient();

export const RootProvider = ({ children }: { children: ReactNode }) => {
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
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
