import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { MD3Colors, SegmentedButtons, useTheme } from 'react-native-paper';
import { MediaType } from '../../../app/services/anilist/generated-anilist';
import { MediaSearchSelection } from '../types';
import { FilterState } from '../filterSlice';

type SegButtons = {
    value: FilterState['current'];
    label: string;
};

type MediaSelectorProps = {
    selection: string;
    onSelect: (type: FilterState['current']) => void;
};

export const MediaSelector = ({ selection, onSelect }: MediaSelectorProps) => {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const buttons: SegButtons[] = [
        {
            value: 'anime',
            label: 'Anime',
        },
        {
            value: 'manga',
            label: 'Manga',
        },
        {
            value: 'manhwa',
            label: 'Manhwa',
        },
        {
            value: 'novel',
            label: 'Novel',
        },
    ];

    return (
        <SafeAreaView
            style={[styles.container, { width, backgroundColor: colors.elevation.level2 }]}
        >
            <SegmentedButtons
                value={selection}
                onValueChange={onSelect}
                density="small"
                buttons={buttons}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
});
