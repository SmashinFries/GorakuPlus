import 'react-native-gesture-handler';
import { SplashScreen, Stack, router, useNavigationContainerRef } from 'expo-router';
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
import * as Sentry from '@sentry/react-native';
import { isRunningInExpoGo } from 'expo';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import { useThemeStore } from '@/store/theme/themeStore';
import { availableThemes, themeOptions } from '@/store/theme/themes';

if (typeof window !== 'undefined') {
	// @ts-ignore
	window._frameTimestamp = null;
}

registerTranslation('en-GB', enGB);

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
	dsn: 'https://c3347c2b80f12ce25d6eeede51177fbb@o4507794960547840.ingest.us.sentry.io/4507794962055168',
	debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
	integrations: [
		new Sentry.ReactNativeTracing({
			// Pass instrumentation to be used as `routingInstrumentation`
			routingInstrumentation,
			enableNativeFramesTracking: !isRunningInExpoGo(),
			// ...
		}),
	],
	// enabled: Constants?.executionEnvironment === ExecutionEnvironment.Standalone,
	enabled: false,
});

Platform.OS !== 'web' && removeUpdateAPKs();
Platform.OS !== 'web' && reattachDownloads();

notifee.onBackgroundEvent(async ({ type, detail }) => {
	const { notification, pressAction } = detail;
	if (type === EventType.PRESS) {
		const link = Linking.createURL(detail.notification?.data?.url as string);
		console.log('Link:', link);
		Linking.openURL(link ?? 'gorakuplus://user');
		await notifee.cancelNotification(notification.id);
	}
});

TaskManager.defineTask('Notifs', async () => {
	await fetchAnilistNotifications();

	// Be sure to return the successful result type!
	return BackgroundFetch.BackgroundFetchResult.NewData;
});

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const { isFirstLaunch } = useSettingsStore();
	const updaterBtmSheetRef = useRef<BottomSheetModal>(null);
	const { updateDetails, checkForUpdates } = useAppUpdates();
	const url = Linking.useURL();
	// Capture the NavigationContainer ref and register it with the instrumentation.
	const ref = useNavigationContainerRef();
	const isDark = useThemeStore((state) => state.isDark);
	const mode = useThemeStore((state) => state.mode);

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
			// router.navigate(url);
		}
		SplashScreen.hideAsync();
	}, [isFirstLaunch, url]);

	useEffect(() => {
		if (ref) {
			routingInstrumentation.registerNavigationContainer(ref);
		}
	}, [ref]);

	useEffect(() => {
		if (Constants.executionEnvironment !== ExecutionEnvironment.StoreClient) {
			// Platform.OS !== 'web' && runUpdateChecker();
		}
	}, []);

	return (
		<RootProvider>
			<GestureHandlerRootView
				style={{
					flex: 1,
				}}
			>
				<PaperThemeProvider>
					<BottomSheetModalProvider>
						<AnimatedStack
							screenOptions={{
								headerShown: false,
								statusBarStyle: isDark ? 'light' : 'dark',
								statusBarTranslucent: true,
								statusBarAnimation: 'fade',
							}}
						>
							<Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
							<Stack.Screen name="(anime)/[...media]" />
							<Stack.Screen name="(manga)/[...media]" />
							<Stack.Screen name="music" />
							<Stack.Screen name="character" />
							<Stack.Screen name="staff" />
							<Stack.Screen name="news" />
							<Stack.Screen name="art" />
							<Stack.Screen name="user" />
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
				</PaperThemeProvider>
			</GestureHandlerRootView>
		</RootProvider>
	);
};

export default Sentry.wrap(RootLayout);
