import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import notifee, {
    AndroidImportance,
    AndroidStyle,
    AndroidVisibility,
    NotificationAndroid,
} from '@notifee/react-native';
import { useAppSelector } from '../../../../app/hooks';
import {
    GetNotificationsQuery,
    useLazyGetNotificationsQuery,
} from '../../../../app/services/anilist/generated-anilist';
import { store } from '../../../../app/store';
import { api } from '../../../../app/services/anilist/enhanced';

export type TaskNames = 'Bg-Notifs';

export type ParsedNotifResp = {
    title: string;
    body: string;
    largeIcon?: string;
    timestamp?: number;
    picture?: string;
    url?: string;
};
export const parseNotif = (
    language: 'english' | 'native' | 'romaji',
    data: GetNotificationsQuery['Page']['notifications'][0],
): ParsedNotifResp => {
    switch (data.__typename) {
        case 'ActivityLikeNotification':
            return {
                title: 'Activity Like',
                body: `${data.user.name} liked your activity`,
                largeIcon: data.user.avatar.large,
                timestamp: new Date(data.createdAt * 1000).getTime(),
            };
        case 'ActivityMentionNotification':
            return {
                title: 'Activity Mention',
                body: `${data.user.name} mentioned you in an activity`,
                largeIcon: data.user.avatar.large,
                timestamp: new Date(data.createdAt * 1000).getTime(),
            };
        case 'ActivityMessageNotification':
            return {
                title: 'Activity Message',
                body: `${data.user.name} commented on your activity`,
                largeIcon: data.user.avatar.large,
                timestamp: new Date(data.createdAt * 1000).getTime(),
            };
        case 'ActivityReplyNotification':
            return {
                title: 'Activity Reply',
                body: `${data.user.name} replied to your activity`,
                largeIcon: data.user.avatar.large,
                timestamp: new Date(data.createdAt * 1000).getTime(),
            };
        case 'AiringNotification':
            return {
                title: data.media.title[language] ?? data.media.title.romaji,
                body: `${data.contexts[0]}${data.episode}${data.contexts[2]}`,
                largeIcon: data.media.coverImage.large,
                picture: data.media.bannerImage ?? data.media.coverImage.large,
                timestamp: new Date(data.createdAt * 1000).getTime(),
                url: `media/${data.media?.type}/${data.media?.id}`,
            };
        case 'FollowingNotification':
            return {
                title: 'New Follower',
                body: `${data.user.name} started following you`,
                largeIcon: data.user.avatar.large,
                timestamp: new Date(data.createdAt * 1000).getTime(),
            };
        case 'MediaDataChangeNotification':
            return {
                title: data.media.title[language] ?? data.media.title.romaji,
                body: data.reason
                    ? `${data.media.title[language] ?? data.media.title.romaji}${
                          data.context
                      }<br/>${data.reason}`
                    : `${data.media.title[language] ?? data.media.title.romaji}${data.context}`,
                largeIcon: data.media.coverImage.large,
                picture: data.media.bannerImage ?? data.media.coverImage.large,
                timestamp: new Date(data.createdAt * 1000).getTime(),
                url: `media/${data.media?.type}/${data.media?.id}`,
            };
        case 'MediaDeletionNotification':
            return {
                title: data.deletedMediaTitle,
                body: data.reason
                    ? `${data.deletedMediaTitle}${data.context}<br/>${data.reason}`
                    : `${data.deletedMediaTitle}${data.context}`,
                timestamp: new Date(data.createdAt * 1000).getTime(),
            };
        case 'MediaMergeNotification':
            return {
                title: data.media.title[language] ?? data.media.title.romaji,
                body: data.reason
                    ? `${data.deletedMediaTitles} merged with ${
                          data.media.title[language] ?? data.media.title.romaji
                      }<br/>${data.reason}`
                    : `${data.deletedMediaTitles} merged with ${
                          data.media.title[language] ?? data.media.title.romaji
                      }`,
                largeIcon: data.media.coverImage.large,
                picture: data.media.bannerImage ?? data.media.coverImage.large,
                timestamp: new Date(data.createdAt * 1000).getTime(),
                url: `media/${data.media?.type}/${data.media?.id}`,
            };
        case 'RelatedMediaAdditionNotification':
            return {
                title: data.media.title[language] ?? data.media.title.romaji,
                body: `${data.media.title[language] ?? data.media.title.romaji}${data.context}`,
                largeIcon: data.media.coverImage.large,
                picture: data.media.bannerImage ?? data.media.coverImage.large,
                timestamp: new Date(data.createdAt * 1000).getTime(),
                url: `media/${data.media?.type}/${data.media?.id}`,
            };
    }
};
const createNotifChannels = async () => {
    await notifee.createChannelGroup({
        id: 'anilist-notifs-group',
        name: 'Anilist Group Notifications',
    });

    // Create a channel (required for Android)
    await notifee.createChannel({
        id: 'anilist-notifs',
        name: 'Anilist Notifications',
        vibration: true,
    });
};

export const registerBGFetch = async (hours: number) => {
    await notifee.requestPermission();
    return BackgroundFetch.registerTaskAsync('Notifs', {
        minimumInterval: 3600 * hours,
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
    });
};

export const unregisterBGFetch = async () => {
    return BackgroundFetch.unregisterTaskAsync('Notifs');
};

export const displayNotification = async (
    props: ParsedNotifResp & { group?: boolean; url?: string },
) => {
    await createNotifChannels();
    const channelID = 'anilist-notifs';
    const groupID = 'anilist-notifs-group';
    const androidConfig: NotificationAndroid = {
        channelId: channelID,
        showTimestamp: true,
        importance: AndroidImportance.HIGH,
        timestamp: props.timestamp,
        largeIcon: props.largeIcon,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
            id: 'default',
        },
        style: props.picture && {
            type: AndroidStyle.BIGPICTURE,
            largeIcon: null,
            picture: props.picture,
        },
        visibility: AndroidVisibility.PUBLIC,
        groupId: groupID,
    };

    if (!props.group) delete androidConfig.groupId;
    if (!props.picture) delete androidConfig.style;
    if (!props.largeIcon) delete androidConfig.largeIcon;
    if (!props.timestamp) delete androidConfig.timestamp;

    try {
        await notifee.displayNotification({
            title: props.title,
            body: props.body,
            data: { url: props.url ?? '' },
            android: androidConfig,
        });
    } catch (err) {
        console.log(err);
    }
};

export const testAnilistFetchNotif = async () => {
    const { enabled } = store.getState().persistedNotifs;
    const { mediaLanguage } = store.getState().persistedSettings;
    const fetchNotifs = store.dispatch(
        api.endpoints.GetNotifications.initiate({ amount: 50, page: 1, reset: true }),
    );
    try {
        const response = await fetchNotifs.unwrap();
        const newNotifs = response.Page?.notifications?.slice(
            0,
            response.Viewer?.unreadNotificationCount ?? 0,
        )?.filter((notif) => enabled?.includes(notif.__typename));

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
        }
    } catch (err) {
        console.log(err);
    }
};
