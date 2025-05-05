import * as BackgroundFetch from 'expo-background-fetch';
import notifee, {
	AndroidBigPictureStyle,
	AndroidImportance,
	AndroidStyle,
	AndroidVisibility,
	Notification,
	NotificationAndroid,
} from '@notifee/react-native';
import { useNotificationStore } from '@/store/notifications/notificationStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAuthStore } from '@/store/authStore';
import {
	ActivityLikeNotification,
	ActivityMentionNotification,
	ActivityMessageNotification,
	ActivityReplyLikeNotification,
	ActivityReplyNotification,
	ActivityReplySubscribedNotification,
	AiringNotification,
	GetNotificationsQuery,
	MainMetaFragment,
	MediaType,
	NotificationType,
	useGetNotificationsQuery,
} from '@/api/anilist/__genereated__/gql';
import { ANILIST_GROUP_ID, ANILIST_NOTIF_BF_ID } from '@/constants/backgroundTasks';
import { router } from 'expo-router';

export type TaskNames = 'Bg-Notifs';
export type NotificationPressActionIds = 'activity-route' | 'media-route' | 'user-route';

const ActivityConfig: { [key: string]: Notification } = {
	ActivityLikeNotification: {
		title: 'Activity Like',
		body: 'liked your activity',
	},
	ActivityMentionNotification: {
		title: 'Activity Mention',
		body: 'mentioned you in an activity',
	},
	ActivityMessageNotification: {
		title: 'Activity Message',
		body: 'commented on your activity',
	},
	ActivityReplyNotification: {
		title: 'Activity Reply',
		body: 'replied to your activity',
	},
	ActivityReplyLikeNotification: {
		title: 'Activity Reply Like',
		body: 'liked your reply',
	},
	ActivityReplySubscribedNotification: {
		title: 'Activity Reply Subcription',
		body: 'subscribed to your reply',
	},
};

// NEED HELP! I CANT REALLY TEST CAUSE I DONT INTERACT WITH THREADS
const _ThreadConfig: { [key: string]: Notification } = {
	ThreadCommentLikeNotification: {
		title: 'Thread Comment Like',
		body: '',
	},
	ThreadCommentMentionNotification: {
		title: 'Thread Comment Mention',
		body: '',
	},
	ThreadCommentReplyNotification: {
		title: 'Thread Comment Reply',
		body: '',
	},
	ThreadCommentSubscribedNotification: {
		title: 'Thread Comment Subscribed',
		body: '',
	},
	ThreadLikeNotification: {
		title: 'Thread Liked',
		body: '',
	},
};

export const notifNavigate = (notif: Notification, pressActionId: NotificationPressActionIds) => {
	switch (pressActionId) {
		case 'activity-route':
			// @ts-ignore
			router.navigate(
				// @ts-ignore
				`/activity/${(notif.data as GetNotificationsQuery['Page']['notifications'][0])?.activityId ?? notif.data?.id}`,
			);
			break;
		case 'media-route':
			// @ts-ignore
			router.navigate(
				`/${((notif.data?.media as MainMetaFragment)?.type as MediaType)?.toLowerCase() as 'anime' | 'manga'}/${(notif.data?.media as MainMetaFragment)?.id}`,
			);
			break;
		case 'user-route':
			// @ts-ignore
			router.navigate(`/user/${notif.data.user?.name}`);
			break;
		default:
			break;
	}
};

const createActivityNotification = (
	data:
		| ActivityLikeNotification
		| ActivityMentionNotification
		| ActivityMessageNotification
		| ActivityReplyNotification
		| ActivityReplyLikeNotification
		| ActivityReplySubscribedNotification,
	channelInfo: NotificationAndroid,
): Notification => {
	const activity_body = `${data?.user?.name} ${ActivityConfig[data?.__typename as string].body}`;
	return {
		title: ActivityConfig[data?.__typename as string].title,
		body: activity_body,
		data: createNotificationData(data),
		android: {
			...channelInfo,
			largeIcon: data?.user?.avatar?.large ?? undefined,
			timestamp: data?.createdAt ? getTimestamp(data?.createdAt) : undefined,
			pressAction: { id: 'activity-route' },
			actions: [
				{ title: 'View Activity', pressAction: { id: 'activity-route' } },
				{ title: 'View User', pressAction: { id: 'user-route' } },
			],
		},
	};
};

const createMediaNotification = (
	data: AiringNotification,
	channelInfo: NotificationAndroid,
	language?: 'english' | 'native' | 'romaji',
): Notification => {
	const title = data?.media?.title?.[language ?? 'romaji'] ?? '';
	return {
		title,
		body: `${data?.contexts?.[0]}${data.episode}${data.contexts?.[2]}`,
		data: data ? { ...(data as object), contexts: '' } : undefined,
		android: {
			...channelInfo,
			pressAction: { id: 'media-route' },
			actions: data.media?.type ? [createMediaViewAction(data.media?.type)] : undefined,
			largeIcon: data.media?.coverImage?.large ?? undefined,
			style: createMediaStyle(data.media) ?? undefined,
			timestamp: data.createdAt ? getTimestamp(data.createdAt) : undefined,
		},
	};
};

const createNotificationData = (data: any) => {
	return Object.entries(data).reduce(
		(acc, [key, value]) => ({
			...acc,
			[key]: value ?? undefined,
		}),
		{},
	);
};

const getTimestamp = (createdAt?: number) => {
	return createdAt ? new Date(createdAt * 1000).getTime() : undefined;
};

const createMediaViewAction = (type?: MediaType) => ({
	title: `View ${type === MediaType.Anime ? 'Anime' : 'Manga'}`,
	pressAction: { id: 'media-route' },
});

const createMediaStyle = (media?: any): AndroidBigPictureStyle | undefined =>
	media
		? {
			type: AndroidStyle.BIGPICTURE,
			picture: media?.bannerImage ?? media?.coverImage?.large ?? '',
		}
		: undefined;

export const parseNotif = (
	data: NonNullable<NonNullable<GetNotificationsQuery['Page']>['notifications']>[0],
): Notification => {
	const language = useSettingsStore.getState().mediaLanguage;
	const notifType = data?.__typename.replace('Notification', '') as keyof typeof NotificationType;
	const channelId = NotificationType[notifType];
	const channelInfo: NotificationAndroid = { channelId, groupId: ANILIST_GROUP_ID };

	const notificationHandlers = {
		ActivityLikeNotification: () =>
			createActivityNotification(data as ActivityLikeNotification, channelInfo),
		ActivityMentionNotification: () =>
			createActivityNotification(data as ActivityMentionNotification, channelInfo),
		ActivityMessageNotification: () =>
			createActivityNotification(data as ActivityMessageNotification, channelInfo),
		ActivityReplyNotification: () =>
			createActivityNotification(data as ActivityReplyNotification, channelInfo),
		ActivityReplyLikeNotification: () =>
			createActivityNotification(data as ActivityReplyLikeNotification, channelInfo),
		ActivityReplySubscribedNotification: () =>
			createActivityNotification(data as ActivityReplySubscribedNotification, channelInfo),
		AiringNotification: () =>
			createMediaNotification(data as AiringNotification, channelInfo, language),
		// Add other notification type handlers here...
	};

	const handler = notificationHandlers[data?.__typename as keyof typeof notificationHandlers];
	return handler ? handler() : {};
};
const createNotifChannels = async () => {
	const username = useAuthStore.getState().anilist.username;
	if (username) {
		await notifee.createChannelGroup({
			id: ANILIST_GROUP_ID,
			name: username,
		});
		Object.values(NotificationType).forEach(
			async (type) =>
				await notifee.createChannel({
					id: type,
					name: type.replaceAll('_', ' '),
					vibration: true,
					visibility: AndroidVisibility.PUBLIC,
					importance: AndroidImportance.DEFAULT,
				}),
		);
	}
};

export const registerBGFetch = async (hours: number) => {
	await notifee.requestPermission();
	await createNotifChannels();
	return BackgroundFetch.registerTaskAsync(ANILIST_NOTIF_BF_ID, {
		minimumInterval: 3600 * hours,
		stopOnTerminate: false, // android only,
		startOnBoot: true, // android only
	});
};

export const unregisterBGFetch = async () => {
	return BackgroundFetch.unregisterTaskAsync(ANILIST_NOTIF_BF_ID);
};

export const displayNotification = async ({ title, body, data, android }: Notification) => {
	const androidConfig: NotificationAndroid = {
		...android,
		groupId: ANILIST_GROUP_ID,
		showTimestamp: true,
		importance: AndroidImportance.DEFAULT,
		smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
		visibility: AndroidVisibility.PUBLIC,
	};

	await notifee.displayNotification({
		title,
		body,
		data,
		android: androidConfig,
	});
};

export const fetchAnilistNotifications = async () => {
	const enabled = useNotificationStore.getState().enabled;
	try {
		if (!enabled) return BackgroundFetch.BackgroundFetchResult.NoData;
		const getNotifications = useGetNotificationsQuery.fetcher({
			amount: 50,
			page: 1,
			reset: true,
		});
		const data = await getNotifications();
		const newNotifs = data.Page?.notifications?.slice(
			0,
			data.Viewer?.unreadNotificationCount ?? 0,
		);
		if ((newNotifs?.length ?? 0) > 0) {
			newNotifs?.forEach((notif) => {
				const parsedData = parseNotif(notif);
				displayNotification({ ...parsedData });
			});
			return BackgroundFetch.BackgroundFetchResult.NewData;
		} else {
			return BackgroundFetch.BackgroundFetchResult.NoData;
		}
	} catch (_err) {
		return BackgroundFetch.BackgroundFetchResult.Failed;
	}
};
