import 'react-native-gesture-handler';
import { Link, Stack } from 'expo-router';
import { PaperProvider, Portal, Text } from 'react-native-paper';
import { ThemeProvider } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import * as Linking from 'expo-linking';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import notifee, { EventType } from '@notifee/react-native';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { availableThemes } from '@/store/theme/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { UpdateDialog } from '@/components/updates';
import PaperHeader from '@/components/headers';
import { api } from '@/store/services/anilist/enhanced';
import { displayNotification, parseNotif } from '@/utils/notifications/backgroundFetch';
import { setStatusBarStyle } from 'expo-status-bar';
import { ToastAndroid } from 'react-native';
import Constants from 'expo-constants';

if (typeof window !== 'undefined') {
    // @ts-ignore
    window._frameTimestamp = null;
}

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    if (type === EventType.PRESS) {
        const link = Linking.createURL(detail.notification?.data?.url as string);
        Linking.openURL(link ?? 'gorakuplus://user');
        await notifee.cancelNotification(notification.id);
    }
});

TaskManager.defineTask('Notifs', async () => {
    const { enabled } = store.getState().persistedNotifs;
    const { mediaLanguage } = store.getState().persistedSettings;
    const fetchNotifs = store.dispatch(
        api.endpoints.GetNotifications.initiate({ amount: 50, page: 1, reset: true }),
    );
    try {
        const response = await fetchNotifs.unwrap();
        const newNotifs = response.Page?.notifications
            ?.slice(0, response.Viewer?.unreadNotificationCount ?? 0)
            ?.filter((notif) => enabled?.includes(notif.__typename));

        if (newNotifs.length === 1) {
            const parsedData = parseNotif(mediaLanguage, newNotifs[0]);
            displayNotification(parsedData);
        } else if (newNotifs.length > 1) {
            await notifee.displayNotification({
                title: 'AniList Notifications',
                subtitle: `${newNotifs.length} new notifications`,
                android: {
                    channelId: 'anilist-notifs',
                    groupSummary: true,
                    groupId: 'anilist-notifs-group',
                },
            });
            newNotifs.forEach((notif) => {
                const parsedData = parseNotif(mediaLanguage, notif);
                displayNotification({ ...parsedData, group: true });
            });
        } else {
            return BackgroundFetch.BackgroundFetchResult.NoData;
        }
    } catch (err) {
        return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData;
});

const AppProvider = () => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);
    const { isDark, mode } = useAppSelector((state) => state.persistedTheme);
    const [updateLink, setUpdateLink] = useState<string | null>(null);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    // const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    // const updatesListener = (e: Updates.UpdateEvent) => {
    //     if (e.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
    //         setShowUpdateDialog(true);
    //     }
    // };

    // Updates.useUpdateEvents(updatesListener);

    const checkForUpdates = async () => {
        const results = await fetch('https://api.github.com/repos/KuzuLabz/GorakuSite/releases');
        const jsonResult = await results?.json();
        const newestVersion = jsonResult[0]?.tag_name ?? null;

        if (newestVersion && newestVersion !== Constants?.expoConfig?.version) {
            setUpdateLink(jsonResult[0]?.assets[0]?.browser_download_url);
            setShowUpdateDialog(true);
        }
    };

    useEffect(() => {
        if (isDark) {
            setStatusBarStyle('light');
        } else {
            setStatusBarStyle('dark');
        }
    }, [isDark]);

    useEffect(() => {
        checkForUpdates();
    }, []);

    return (
        <PaperProvider
            theme={
                isDark
                    ? availableThemes['dark'][mode]
                        ? availableThemes['dark'][mode]
                        : availableThemes['dark']['default']
                    : availableThemes['light'][mode]
                    ? availableThemes['light'][mode]
                    : availableThemes['light']['default']
            }
        >
            <ThemeProvider
                value={
                    isDark
                        ? availableThemes['dark'][mode]
                            ? availableThemes['dark'][mode]
                            : availableThemes['dark']['default']
                        : availableThemes['light'][mode]
                        ? availableThemes['light'][mode]
                        : availableThemes['light']['default']
                }
            >
                <BottomSheetModalProvider>
                    <Stack
                        initialRouteName="(tabs)"
                        screenOptions={{ headerShown: false, animation: navAnimation }}
                    >
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen
                            name="(media)/[...params]"
                            getId={(params) => params?.params?.params}
                        />
                        <Stack.Screen
                            name="music"
                            options={{
                                headerShown: true,
                                headerTransparent: true,
                                title: '',
                                headerTitle: '',
                                header: (props) => <PaperHeader {...props} />,
                            }}
                        />
                        <Stack.Screen name="characters" />
                        <Stack.Screen name="staff" />
                        <Stack.Screen name="news" />
                        <Stack.Screen name="art" />
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
                    </Stack>
                    <Portal>
                        <UpdateDialog
                            visible={showUpdateDialog}
                            onDismiss={() => setShowUpdateDialog(false)}
                            updateLink={updateLink}
                        />
                    </Portal>
                </BottomSheetModalProvider>
            </ThemeProvider>
            {/* <Portal>
                <UpdateDialog
                    visible={showUpdateDialog}
                    onDismiss={() => setShowUpdateDialog(false)}
                />
            </Portal> */}
        </PaperProvider>
    );
};

const RootLayout = () => {
    useEffect(() => {
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.PRESS:
                    const link = Linking.createURL(detail.notification?.data?.url as string);
                    Linking.openURL(link ?? 'gorakuplus://user');
                    break;
            }
        });
    }, []);

    // This broke the app \_0-0_/
    // useEffect(() => {
    // 	if (!__DEV__) {
    // 		checkForUpdates().then(isAvailable => setShowUpdateDialog(isAvailable));
    // 	}
    // },[]);

    return (
        <Provider store={store}>
            <PersistGate loading={<Text>loading...</Text>} persistor={persistor}>
                <AppProvider />
            </PersistGate>
        </Provider>
    );
};

export default RootLayout;
