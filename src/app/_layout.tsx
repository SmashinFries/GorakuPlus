import 'react-native-gesture-handler';
import { Stack, router, useNavigationContainerRef } from 'expo-router';
import * as TaskManager from 'expo-task-manager';
import { useEffect } from 'react';
import PaperHeader from '@/components/headers';
import { fetchAnilistNotifications, notifNavigate } from '@/utils/notifications/backgroundFetch';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import AnimatedStack from '@/components/stack';
import { Toaster } from 'burnt/web';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { reattachDownloads, removeUpdateAPKs } from '@/utils/update';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { PaperThemeProvider } from '@/providers/themeProvider';
import { RootProvider } from '@/providers/rootProvider';
import * as Sentry from '@sentry/react-native';
import { en, registerTranslation } from 'react-native-paper-dates';
import { useThemeStore } from '@/store/theme/themeStore';
import notifee, { EventType } from '@notifee/react-native';
import { ANILIST_NOTIF_BF_ID } from '@/constants/backgroundTasks';
import { useQuickActionRouting } from 'expo-quick-actions/router';
import * as SplashScreen from 'expo-splash-screen';
import { useAppUpdaterStore } from '@/store/appUpdateStore';

if (typeof window !== 'undefined') {
	// @ts-ignore
	window._frameTimestamp = null;
}

registerTranslation('en', en);

const navigationIntegration = Sentry.reactNavigationIntegration({
	enableTimeToInitialDisplay: Constants.executionEnvironment === ExecutionEnvironment.StoreClient,
});

Sentry.init({
	dsn: 'https://c3347c2b80f12ce25d6eeede51177fbb@o4507794960547840.ingest.us.sentry.io/4507794962055168',
	debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
	tracesSampleRate: 1.0,
	integrations: [navigationIntegration],
	// enabled: Constants?.executionEnvironment === ExecutionEnvironment.Standalone,
	enabled: true,
});

Platform.OS !== 'web' && removeUpdateAPKs();
Platform.OS !== 'web' && reattachDownloads();

notifee.onBackgroundEvent(async ({ type, detail }) => {
	const { notification } = detail;
	if ((type === EventType.PRESS || type === EventType.ACTION_PRESS) && detail.notification) {
		notifNavigate(detail.notification, detail.pressAction?.id as any);
		!!notification?.id && (await notifee.cancelNotification(notification.id));
	}
});

TaskManager.defineTask(ANILIST_NOTIF_BF_ID, async () => {
	await fetchAnilistNotifications();
});

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	useQuickActionRouting();
	// const { loading } = useNotifications();
	const { isFirstLaunch } = useSettingsStore();
	const { checkForUpdate } = useAppUpdaterStore();
	// Capture the NavigationContainer ref and register it with the instrumentation.
	const ref = useNavigationContainerRef();
	const { isDark } = useThemeStore();

	const runUpdateChecker = async () => {
		await checkForUpdate();
	};

	useEffect(() => {
		const isReady = ref.current?.isReady();
		if (isReady) {
			if (isFirstLaunch) {
				router.replace('/setup');
			} else {
				router.replace('/(tabs)/explore/(home)');
			}
			SplashScreen.hideAsync();
		}
	}, [isFirstLaunch, ref]);

	useEffect(() => {
		if (ref) {
			navigationIntegration.registerNavigationContainer(ref);
		}
	}, [ref]);

	useEffect(() => {
		if (Constants.executionEnvironment !== ExecutionEnvironment.StoreClient) {
			Platform.OS !== 'web' && runUpdateChecker();
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
					<AnimatedStack
						screenOptions={{
							headerShown: false,
							statusBarStyle: isDark ? 'light' : 'dark',
							statusBarTranslucent: true,
							statusBarAnimation: 'fade',
							statusBarBackgroundColor: 'transparent',
						}}
					>
						<Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
						<Stack.Screen name="anicard" />
						<Stack.Screen name="anime/[id]" getId={({ params }) => params?.id} />
						<Stack.Screen name="manga/[id]" getId={({ params }) => params?.id} />
						<Stack.Screen name="music" />
						<Stack.Screen name="character" />
						<Stack.Screen name="staff" />
						<Stack.Screen name="news" />
						<Stack.Screen name="art" />
						<Stack.Screen name="user/[username]" />
						<Stack.Screen
							name="statistics"
							options={{
								title: 'Statistics',
								header: (props) => <PaperHeader {...props} />,
								headerShown: true,
							}}
						/>
						<Stack.Screen
							name="notifications"
							options={{
								title: 'Notifications',
								header: (props) => <PaperHeader {...props} />,
								headerShown: true,
							}}
						/>
						<Stack.Screen
							name="setup"
							options={{
								presentation: 'modal',
							}}
						/>
						<Stack.Screen
							name={'(sheets)'}
							options={{
								contentStyle: { backgroundColor: 'transparent' },
								presentation: 'transparentModal',
							}}
						/>
						<Stack.Screen name={'auth'} />
					</AnimatedStack>
					<Toaster position="bottom-right" />
				</PaperThemeProvider>
			</GestureHandlerRootView>
		</RootProvider>
	);
};

export default Sentry.wrap(RootLayout);
