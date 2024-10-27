import { useCallback, useReducer, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AnimeExploreQuery } from '@/api/anilist/__genereated__/gql';

const getBG = (media) => {
	const bg = media.bannerImage ?? media.coverImage.extraLarge;
	return bg;
};

const useBackground = (data: AnimeExploreQuery['trending']['media']) => {
	const [bg, setBg] = useState({ id: 0, bg: getBG(data[0]) });
	const [key, _setKey] = useState(bg.bg + Math.floor(Math.random() * 1001).toString());
	const [visible, toggle] = useReducer((s) => !s, true);

	const updateBG = () => {
		const nextID = data.length - 1 === bg.id ? 0 : bg.id + 1;
		const nextBG = getBG(data[nextID]);
		setBg({ id: nextID, bg: nextBG });
		toggle();
	};

	useFocusEffect(
		useCallback(() => {
			const interval = setInterval(() => {
				toggle();
			}, 15000);
			return () => {
				clearInterval(interval);
			};
		}, [bg]),
	);

	return { bg: bg.bg, key, updateBG, visible };
};

export default useBackground;
