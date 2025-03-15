import { DanbooruRating } from '@/api/danbooru/types';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useMemo, useState } from 'react';

const nsfwLevelOrder = [
	DanbooruRating.General,
	DanbooruRating.Sensitive,
	DanbooruRating.Questionable,
	DanbooruRating.Explicit,
];

export const useNsfwBlur = (nsfwLevel: DanbooruRating | undefined) => {
	const { blurNSFW, blurNSFWLevel } = useSettingsStore();
	const [isBlurred, setIsBlurred] = useState<boolean>(!!blurNSFW);

	const userNsfwLevel = useMemo(
		() => nsfwLevelOrder.findIndex((value) => value === blurNSFWLevel),
		[blurNSFWLevel],
	);
	const imageNsfwLevel = useMemo(
		() => nsfwLevelOrder.findIndex((value) => value === nsfwLevel),
		[nsfwLevel],
	);

	const blurAmount = useMemo(
		() => (userNsfwLevel < imageNsfwLevel && isBlurred && blurNSFW ? 200 : 0),
		[userNsfwLevel, imageNsfwLevel, isBlurred],
	);

	const toggleBlur = () => setIsBlurred((prev) => !prev);

	const resetBlur = () => setIsBlurred(!!blurNSFW);

	return { blurAmount, isBlurred, toggleBlur, resetBlur };
};

export const useBlur = (blurStrength = 200, initialBlur = true) => {
	const [isBlur, setIsBlur] = useState<boolean>(initialBlur);

	const toggleBlur = () => setIsBlur((prev) => !prev);

	const blurAmount = useMemo(() => (isBlur ? blurStrength : 0), [isBlur]);

	return { blurAmount, isBlur, toggleBlur, setIsBlur };
};
