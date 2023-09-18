import 'expo-dev-client';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { AppProvider } from './src/provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootStackNavigation from './src/navigation/root';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Linking from 'expo-linking';
import notifee, { EventType } from '@notifee/react-native';
import { store } from './src/app/store';
import {
    displayNotification,
    parseNotif,
} from './src/features/more/settings/notifications/backgroundFetch';
import { useEffect } from 'react';
import { api } from './src/app/services/anilist/enhanced';

// import * as Localization from 'expo-localization';
// import { I18n } from 'i18n-js';
// import en from './languages/english.json';
// import ja from './languages/japanese.json';

if (typeof window !== 'undefined') {
    // @ts-ignore
    window._frameTimestamp = null;
}

// const translations = {
//     en: { ...en },
//     ja: { ...ja },
// };
// const i18n = new I18n(translations);

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    if (type === EventType.PRESS) {
        const link = Linking.createURL(detail.notification?.data?.url);
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

const App = () => {
    useEffect(() => {
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.PRESS:
                    const link = Linking.createURL(detail.notification?.data?.url);
                    Linking.openURL(link ?? 'gorakuplus://user');
                    break;
            }
        });
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AppProvider>
                <RootStackNavigation />
            </AppProvider>
        </GestureHandlerRootView>
    );
};

export default App;
