import 'react-native-gesture-handler';
import { Stack, router } from 'expo-router';
import * as Linking from 'expo-linking';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import notifee, { EventType } from '@notifee/react-native';
import { useEffect, useRef, useState } from 'react';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { UpdaterBottomSheet } from '@/components/updates';
import PaperHeader from '@/components/headers';
import { fetchAnilistNotifications } from '@/utils/notifications/backgroundFetch';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import AnimatedStack from '@/components/stack';
import { Toaster } from 'burnt/web';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import i18next from '../i18n';
import { Platform } from 'react-native';
import { reattachDownloads, removeUpdateAPKs } from '@/utils/update';
import useAppUpdates from '@/hooks/useAppUpdates';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { PaperThemeProvider } from '@/providers/themeProvider';
import { RootProvider } from '@/providers/rootProvider';

if (typeof window !== 'undefined') {
	// @ts-ignore
	window._frameTimestamp = null;
}

Platform.OS !== 'web' && removeUpdateAPKs();
Platform.OS !== 'web' && reattachDownloads();

notifee.onBackgroundEvent(async ({ type, detail }) => {
	const { notification, pressAction } = detail;
	if (type === EventType.PRESS) {
		const link = Linking.createURL(detail.notification?.data?.url as string);
		Linking.openURL(link ?? 'gorakuplus://user');
		await notifee.cancelNotification(notification.id);
	}
});

TaskManager.defineTask('Notifs', async () => {
	await fetchAnilistNotifications();

	// Be sure to return the successful result type!
	return BackgroundFetch.BackgroundFetchResult.NewData;
});

const RootLayout = () => {
	const { isFirstLaunch } = useSettingsStore();
	const updaterBtmSheetRef = useRef<BottomSheetModal>(null);
	const { updateDetails, checkForUpdates } = useAppUpdates();
	const url = Linking.useURL();

	const runUpdateChecker = async () => {
		const hasUpdate = await checkForUpdates();
		if (hasUpdate) {
			updaterBtmSheetRef.current?.present();
		}
	};

	useEffect(() => {
		if (isFirstLaunch) {
			router.replace('/setup');
		} else if (url) {
			console.log('Initial URL:', url);
			router.navigate(url);
		} else {
			router.replace('/(tabs)/explore');
		}
	}, [isFirstLaunch, url]);

	useEffect(() => {
		if (Constants.executionEnvironment !== ExecutionEnvironment.StoreClient) {
			Platform.OS !== 'web' && runUpdateChecker();
		}
	}, []);

	return (
		<RootProvider>
			<PaperThemeProvider>
				<GestureHandlerRootView
					style={{
						flex: 1,
					}}
				>
					<BottomSheetModalProvider>
						<AnimatedStack
							initialRouteName="(tabs)"
							screenOptions={{ headerShown: false }}
						>
							<Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
							<Stack.Screen name="(media)/[...media]" />
							<Stack.Screen name="music" />
							<Stack.Screen name="characters" />
							<Stack.Screen name="staff" />
							<Stack.Screen name="news" />
							<Stack.Screen name="art" />
							<Stack.Screen
								name="statistics"
								options={{
									title: i18next.t('Statistics', { ns: 'tabs' }),
									header: (props) => <PaperHeader {...props} />,
									headerShown: true,
								}}
							/>
							<Stack.Screen
								name="notifications"
								options={{
									title: i18next.t('Notifications', { ns: 'tabs' }),
									header: (props) => <PaperHeader {...props} />,
									headerShown: true,
								}}
							/>
							<Stack.Screen
								name="setup"
								options={{
									headerShown: false,
									presentation: 'modal',
								}}
							/>
						</AnimatedStack>
						{Platform.OS !== 'web' && (
							<UpdaterBottomSheet
								ref={updaterBtmSheetRef}
								updateDetails={updateDetails}
							/>
						)}
						<Toaster position="bottom-right" />
					</BottomSheetModalProvider>
				</GestureHandlerRootView>
			</PaperThemeProvider>
		</RootProvider>
	);
};

export default RootLayout;
