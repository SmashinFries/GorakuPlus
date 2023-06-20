import React, { useCallback, useReducer, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ExploreMediaQuery } from '../../../app/services/anilist/generated-anilist';
import { useDynamicAnimation } from 'moti';

const getBG = (media) => {
    const bg = media.bannerImage ?? media.coverImage.extraLarge;
    return bg;
};

const useBackground = (data: ExploreMediaQuery) => {
    const [bg, setBg] = useState({ id: 0, bg: getBG(data.Page.media[0]) });
    const [key, setKey] = useState(bg.bg + Math.floor(Math.random() * 1001).toString());
    const [visible, toggle] = useReducer((s) => !s, true);

    const updateBG = () => {
        const nextID = data.Page.media.length - 1 === bg.id ? 0 : bg.id + 1;
        const nextBG = getBG(data.Page.media[nextID]);
        console.log('Changed!', nextID, `LENGHT: ${data.Page.media.length}`);
        setBg({ id: nextID, bg: nextBG });
        toggle();
    };

    useFocusEffect(
        useCallback(() => {
            const interval = setInterval(() => {
                toggle();
            }, 15000);
            return () => {
                console.log('clearing interval');
                clearInterval(interval);
            };
        }, [bg]),
    );

    return { bg: bg.bg, key, updateBG, visible };
};

export default useBackground;
