import {
	AniMediaQuery,
	AnimeExploreQuery,
	AnimeMetaFragment,
	Character,
	CharacterMetaDataFragment,
	MainMetaFragment,
	MangaMetaFragment,
	Media,
	Staff,
	StaffMetaDataFragment,
} from '@/api/anilist/__genereated__/gql';
import { AniTrendzCharChoice } from '@/api/anitrendz/types';
import { useAuthStore } from '@/store/authStore';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';

/**
 * Quick Action hook for Anime / Manga
 */
export const useQuickActionSheet = () => {
	const quickActionRef = useRef<BottomSheetModal>(null);
	const [selectedMedia, setSelectedMedia] = useState<AnimeMetaFragment | MangaMetaFragment>(null);

	const onMediaLongSelect = (media: AnimeMetaFragment | MangaMetaFragment) => {
		setSelectedMedia(media);
		quickActionRef.current?.present();
	};

	return {
		quickActionRef,
		selectedMedia,
		onMediaLongSelect,
	};
};

/**
 * Quick Action hook for Characters and Staff
 */
export const useQuickActionCS = () => {
	const quickActionCSRef = useRef<BottomSheetModal>(null);
	const [selectedCS, setSelectedCS] = useState<
		(CharacterMetaDataFragment | StaffMetaDataFragment) & { type: 'character' | 'staff' }
	>(null);

	const onCSLongSelect = (type: 'character' | 'staff', cs: Character | Staff) => {
		setSelectedCS({ ...cs, type: type });
		quickActionCSRef.current?.present();
	};

	return { quickActionCSRef, selectedCS, onCSLongSelect };
};

export const useQuickActionUser = () => {
	const quickActionUserRef = useRef<BottomSheetModal>(null);
	const viewerId = useAuthStore((state) => state.anilist.userID);
	const [selectedUser, setSelectedUser] =
		useState<AniMediaQuery['Following']['mediaList'][0]['user']>(null);

	const onUserLongSelect = (user: AniMediaQuery['Following']['mediaList'][0]['user']) => {
		if (viewerId !== user.id) {
			setSelectedUser(user);
			quickActionUserRef.current?.present();
		}
	};

	return { quickActionUserRef, selectedUser, onUserLongSelect };
};

export const useQuickActionAniTrendz = () => {
	const quickActionAniTrendzRef = useRef<BottomSheetModal>(null);
	const [selectedChoice, setSelectedChoice] = useState<{
		link: string;
		names: string[];
		anime?: string;
	}>(null);

	const onChoiceSelect = (
		choice: AniTrendzCharChoice,
		link: string,
		isAnime: boolean = false,
	) => {
		const names = choice.name.split(' x ');
		setSelectedChoice({
			link,
			names: isAnime ? [] : names,
			anime: isAnime ? choice.name : choice.subText,
		});
		quickActionAniTrendzRef.current?.present();
	};

	return { quickActionAniTrendzRef, selectedChoice, onChoiceSelect };
};
