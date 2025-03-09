import {
	ActivityLikeNotification,
	ActivityMentionNotification,
	ActivityMessageNotification,
	ActivityReplyNotification,
	AiringNotification,
	FollowingNotification,
	MediaDataChangeNotification,
	MediaDeletionNotification,
	MediaMergeNotification,
	NotificationType,
	RelatedMediaAdditionNotification,
} from '@/api/anilist/__genereated__/gql';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

export const captilize = (txt: string) => txt.charAt(0).toUpperCase() + txt.slice(1);

export const getCompactNumberForm = (number: number | null | undefined) =>
	number &&
	Intl.NumberFormat('en-US', {
		notation: 'compact',
		maximumFractionDigits: 1,
	}).format(number);

export const copyToClipboard = async (txt?: string | null) => {
	if (!txt) return;
	await Clipboard.setStringAsync(txt);
	await Haptics.selectionAsync();
};

export const countryFlags = {
	JP: '🇯🇵',
	KR: '🇰🇷',
	CN: '🇨🇳',
	TW: '🇹🇼',
};

export const getNotificationMessage = (
	notif:
		| ActivityLikeNotification
		| MediaDataChangeNotification
		| ActivityMessageNotification
		| ActivityReplyNotification
		| AiringNotification
		| FollowingNotification
		| ActivityMentionNotification
		| MediaDeletionNotification
		| MediaMergeNotification
		| RelatedMediaAdditionNotification,
	language: 'english' | 'native' | 'romaji',
) => {
	if (!('__typename' in notif)) {
		return null;
	}
	switch (notif.type as NotificationType) {
		case NotificationType.ActivityLike:
			return `${(notif as ActivityLikeNotification).user?.name} liked your activity`;
		case NotificationType.ActivityMention:
			return `${(notif as ActivityMentionNotification).user?.name} mentioned you in an activity`;
		case NotificationType.ActivityMessage:
			return `${(notif as ActivityMessageNotification).user?.name} commented on your activity`;
		case NotificationType.ActivityReply:
			return `${(notif as ActivityReplyNotification).user?.name} replied to your activity`;
		case NotificationType.Airing:
			return `${(notif as AiringNotification).contexts?.[0]}${(notif as AiringNotification).episode}${(notif as AiringNotification).contexts?.[2]}`;
		case NotificationType.Following:
			return `${(notif as FollowingNotification).user?.name} started following you`;
		case NotificationType.MediaDataChange:
			return (notif as MediaDataChangeNotification).reason
				? `${(notif as MediaDataChangeNotification).media?.title?.[language] ?? (notif as MediaDataChangeNotification).media?.title?.romaji}${(notif as MediaDataChangeNotification).context}<br/>${
						(notif as MediaDataChangeNotification).reason
					}`
				: `${(notif as MediaDataChangeNotification).media?.title?.[language] ?? (notif as MediaDataChangeNotification).media?.title?.romaji}${(notif as MediaDataChangeNotification).context}`;
		case NotificationType.MediaDeletion:
			if ((notif as MediaDeletionNotification).reason) {
				return `${(notif as MediaDeletionNotification).deletedMediaTitle}${(notif as MediaDeletionNotification).context}<br/>${(notif as MediaDeletionNotification).reason}`;
			} else {
				return `${(notif as MediaDeletionNotification).deletedMediaTitle}${(notif as MediaDeletionNotification).context}`;
			}
		case NotificationType.MediaMerge:
			return (notif as MediaMergeNotification).reason
				? `${(notif as MediaMergeNotification).deletedMediaTitles} merged with ${
						(notif as MediaMergeNotification).media?.title?.[language] ??
						(notif as MediaMergeNotification).media?.title?.romaji
					}<br/>${(notif as MediaMergeNotification).reason}`
				: `${(notif as MediaMergeNotification).deletedMediaTitles} merged with ${
						(notif as MediaMergeNotification).media?.title?.[language] ??
						(notif as MediaMergeNotification).media?.title?.romaji
					}`;
		case NotificationType.RelatedMediaAddition:
			return `${(notif as RelatedMediaAdditionNotification).context?.trim()}`;
		default:
			return null;
	}
};
