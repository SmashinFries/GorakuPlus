import * as BackgroundFetch from 'expo-background-fetch';
import notifee, {
	AndroidImportance,
	AndroidStyle,
	AndroidVisibility,
	Notification,
	NotificationAndroid,
} from '@notifee/react-native';
import { useNotificationStore } from '@/store/notifications/notificationStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';
import {
	GetNotificationsDocument,
	GetNotificationsQuery,
	MediaType,
	NotificationType,
} from '@/api/anilist/__genereated__/gql';
import { ANILIST_GROUP_ID, ANILIST_NOTIF_BF_ID } from '@/constants/backgroundTasks';

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

export const parseNotif = (
	data: GetNotificationsQuery['Page']['notifications'][0],
): Notification => {
	const language = useSettingsStore.getState().mediaLanguage;
	const channelId = NotificationType[data.__typename];
	const channelInfo: NotificationAndroid = { channelId, groupId: ANILIST_GROUP_ID };
	switch (data.__typename) {
		case 'ActivityLikeNotification':
		case 'ActivityMentionNotification':
		case 'ActivityMessageNotification':
		case 'ActivityReplyNotification':
		case 'ActivityReplyLikeNotification':
		case 'ActivityReplySubscribedNotification':
			const activity_body = `${data.user.name} ${ActivityConfig[data.__typename].body}`;
			return {
				title: ActivityConfig[data.__typename].title,
				body: activity_body,
				data: {
					...data,
				},
				android: {
					...channelInfo,
					largeIcon: data.user.avatar.large,
					timestamp: new Date(data.createdAt * 1000).getTime(),
					actions: [
						{
							title: 'View Activity',
							pressAction: {
								id: 'activity-route',
							},
						},
						{
							title: 'View User',
							pressAction: {
								id: 'user-route',
							},
						},
					],
				},
			};
		case 'AiringNotification':
			return {
				title: data.media.title[language] ?? data.media.title.romaji,
				body: `${data.contexts[0]}${data.episode}${data.contexts[2]}`,
				data: {
					...data,
				},
				android: {
					...channelInfo,
					actions: [
						{
							title: `View ${data.media?.type === MediaType.Anime ? 'Anime' : 'Manga'}`,
							pressAction: {
								id: 'media-route',
							},
						},
						{
							title: 'View Activity',
							pressAction: {
								id: 'activity-route',
							},
						},
					],
					largeIcon: data.media.coverImage.large,
					style: {
						type: AndroidStyle.BIGPICTURE,
						picture: data.media.bannerImage ?? data.media.coverImage.large,
					},
					timestamp: new Date(data.createdAt * 1000).getTime(),
				},
			};
		case 'FollowingNotification':
			return {
				title: 'New Follower',
				body: `${data.user.name} started following you`,
				data: { ...data },
				android: {
					...channelInfo,
					largeIcon: data.user.avatar.large,
					timestamp: new Date(data.createdAt * 1000).getTime(),
					actions: [
						{
							title: 'View Activity',
							pressAction: {
								id: 'activity-route',
							},
						},
						{
							title: 'View User',
							pressAction: {
								id: 'user-route',
							},
						},
					],
				},
			};
		case 'MediaDataChangeNotification':
			return {
				title: data.media.title[language] ?? data.media.title.romaji,
				body: data.reason
					? `${data.media.title[language] ?? data.media.title.romaji}${
							data.context
						}<br/>${data.reason}`
					: `${data.media.title[language] ?? data.media.title.romaji}${data.context}`,
				data: { ...data },
				android: {
					...channelInfo,
					largeIcon: data.media.coverImage.large,
					timestamp: new Date(data.createdAt * 1000).getTime(),
					style: {
						type: AndroidStyle.BIGPICTURE,
						picture: data.media.bannerImage ?? data.media.coverImage.large,
					},
					actions: [
						{
							title: 'View Activity',
							pressAction: {
								id: 'activity-route',
							},
						},
						{
							title: `View ${data.media?.type === MediaType.Anime ? 'Anime' : 'Manga'}`,
							pressAction: {
								id: 'media-route',
							},
						},
					],
				},
			};
		case 'MediaDeletionNotification':
			return {
				title: data.deletedMediaTitle,
				body: data.reason
					? `${data.deletedMediaTitle}${data.context}<br/>${data.reason}`
					: `${data.deletedMediaTitle}${data.context}`,
				data: { ...data },
				android: {
					...channelInfo,
					timestamp: new Date(data.createdAt * 1000).getTime(),
					actions: [
						{
							title: 'View Activity',
							pressAction: {
								id: 'activity-route',
							},
						},
					],
				},
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
				data: { ...data },
				android: {
					...channelInfo,
					timestamp: new Date(data.createdAt * 1000).getTime(),
					largeIcon: data.media.coverImage.large,
					style: {
						type: AndroidStyle.BIGPICTURE,
						picture: data.media.bannerImage ?? data.media.coverImage.large,
					},
					actions: [
						{
							title: 'View Activity',
							pressAction: {
								id: 'activity-route',
							},
						},
						{
							title: `View ${data.media?.type === MediaType.Anime ? 'Anime' : 'Manga'}`,
							pressAction: {
								id: 'media-route',
							},
						},
					],
				},
			};
		case 'RelatedMediaAdditionNotification':
			return {
				title: data.media.title[language] ?? data.media.title.romaji,
				body: `${data.media.title[language] ?? data.media.title.romaji}${data.context}`,
				data: { ...data },
				android: {
					...channelInfo,
					largeIcon: data.media.coverImage.large,
					timestamp: new Date(data.createdAt * 1000).getTime(),
					style: {
						type: AndroidStyle.BIGPICTURE,
						picture: data.media.bannerImage ?? data.media.coverImage.large,
					},
					actions: [
						{
							title: 'View Activity',
							pressAction: {
								id: 'activity-route',
							},
						},
						{
							title: `View ${data.media?.type === MediaType.Anime ? 'Anime' : 'Manga'}`,
							pressAction: {
								id: 'media-route',
							},
						},
					],
				},
			};
		// case 'ThreadCommentLikeNotification':
		// case 'ThreadCommentMentionNotification':
		// case 'ThreadCommentReplyNotification':
		// case 'ThreadCommentSubscribedNotification':
		// case 'ThreadLikeNotification':
	}
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

	// const fetchNotifs = store.dispatch(
	// 	api.endpoints.GetNotifications.initiate({ amount: 50, page: 1, reset: true }),
	// );
	try {
		// const response = await fetchNotifs.unwrap();
		const token = useAuthStore.getState().anilist.token;
		const { data } = await axios.post<GetNotificationsQuery>(
			'https://graphql.anilist.co',
			JSON.stringify({
				query: GetNotificationsDocument,
				variables: { amount: 50, page: 1, reset: true },
			}),
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		const newNotifs = data.Page?.notifications
			?.slice(0, data.Viewer?.unreadNotificationCount ?? 0)
			?.filter((notif) => enabled?.includes(notif.__typename));

		if (newNotifs.length > 0) {
			newNotifs.forEach((notif) => {
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
