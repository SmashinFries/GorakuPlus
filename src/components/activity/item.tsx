import {
	ListActivity,
	MediaListStatus,
	MediaType,
	MessageActivity,
	TextActivity,
} from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useShallow } from 'zustand/react/shallow';
import { ThreadItem } from '../thread/items';
import { router } from 'expo-router';

export const ListActivityView = ({
	data,
	isViewerActivity,
}: {
	data: ListActivity;
	isViewerActivity?: boolean;
}) => {
	const mediaLanguage = useSettingsStore(useShallow((state) => state.mediaLanguage));
	const listBodyText = `${data?.status.charAt(0).toUpperCase() + data?.status.slice(1)} ${data?.media?.mediaListEntry?.status === MediaListStatus.Current ? data?.progress + ' of\n' : '\n'}${data?.media?.title[mediaLanguage] ?? data?.media?.title?.romaji}`;
	return (
		<ThreadItem
			{...data}
			isMain
			body={listBodyText}
			coverImage={data?.media?.coverImage?.extraLarge}
			// @ts-ignore
			onImagePress={() =>
				router.navigate(
					`/${data.media?.type === MediaType.Anime ? 'anime' : 'manga'}/${data.media?.id}`,
				)
			}
			isViewerActivity={isViewerActivity}
			isReply={false}
		/>
	);
};

export const MessageActivityView = ({
	data,
	isViewerActivity,
}: {
	data: MessageActivity;
	isViewerActivity?: boolean;
}) => {
	return (
		<ThreadItem
			{...data}
			isViewerActivity={isViewerActivity}
			isMain
			body={data.message}
			isReply={false}
		/>
	);
};

export const TextActivityView = ({
	data,
	isViewerActivity,
}: {
	data: TextActivity;
	isViewerActivity?: boolean;
}) => {
	return (
		<ThreadItem
			{...data}
			isMain
			isViewerActivity={isViewerActivity}
			body={data.text}
			isReply={false}
		/>
	);
};
