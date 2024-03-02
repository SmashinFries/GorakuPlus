import {
	GetNotificationsQuery,
	UserTitleLanguage,
} from '@/store/services/anilist/generated-anilist';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

export const captilize = (txt: string) => txt.charAt(0).toUpperCase() + txt.slice(1);

export const copyToClipboard = async (txt: string) => {
	await Clipboard.setStringAsync(txt);
	await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const countryFlags = {
	JP: '🇯🇵',
	KR: '🇰🇷',
	CN: '🇨🇳',
	TW: '🇹🇼',
};

export const getNotificationMessage = (
	notif: GetNotificationsQuery['Page']['notifications'][0],
	language: 'english' | 'native' | 'romaji',
) => {
	switch (notif.__typename) {
		case 'ActivityLikeNotification':
			return `${notif.user.name} liked your activity`;
		case 'ActivityMentionNotification':
			return `${notif.user.name} mentioned you in an activity`;
		case 'ActivityMessageNotification':
			return `${notif.user.name} commented on your activity`;
		case 'ActivityReplyNotification':
			return `${notif.user.name} replied to your activity`;
		case 'AiringNotification':
			return `${notif.contexts[0]}${notif.episode}${notif.contexts[2]}`;
		case 'FollowingNotification':
			return `${notif.user.name} started following you`;
		case 'MediaDataChangeNotification':
			return notif.reason
				? `${notif.media.title[language] ?? notif.media.title.romaji}${notif.context}<br/>${
						notif.reason
					}`
				: `${notif.media.title[language] ?? notif.media.title.romaji}${notif.context}`;
		case 'MediaDeletionNotification':
			return notif.reason
				? `${notif.deletedMediaTitle}${notif.context}<br/>${notif.reason}`
				: `${notif.deletedMediaTitle}${notif.context}`;
		case 'MediaMergeNotification':
			return notif.reason
				? `${notif.deletedMediaTitles} merged with ${
						notif.media.title[language] ?? notif.media.title.romaji
					}<br/>${notif.reason}`
				: `${notif.deletedMediaTitles} merged with ${
						notif.media.title[language] ?? notif.media.title.romaji
					}`;
		case 'RelatedMediaAdditionNotification':
			return `${notif.context.trim()}`;
	}
};
