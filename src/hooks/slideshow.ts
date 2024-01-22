import React, { useCallback, useReducer, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

type SlideShowProps = {
    images: string[];
};
export const useSlideshow = ({ images }: SlideShowProps) => {
    const [bg, setBg] = useState({ id: 0, bg: images[0] });
    const [visible, toggle] = useReducer((s) => !s, true);

    const imagesLength = images.length;

    const updateBG = () => {
        if (imagesLength > 1) {
            const nextID = imagesLength - 1 === bg.id ? 0 : bg.id + 1;
            const nextBG = images[nextID];
            setBg({ id: nextID, bg: nextBG });
            toggle();
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (imagesLength > 1) {
                const interval = setInterval(() => {
                    toggle();
                }, 15000);
                return () => {
                    clearInterval(interval);
                };
            }
        }, [bg]),
    );

    if (imagesLength === 0) {
        return { bg: '', visible, updateBG };
    }

    return { bg: bg.bg, visible, updateBG };
};
