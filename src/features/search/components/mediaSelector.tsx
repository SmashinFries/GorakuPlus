import React, { memo, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { MD3Colors, SegmentedButtons, useTheme } from 'react-native-paper';
import { MediaType } from '../../../app/services/anilist/generated-anilist';
import { MediaSearchSelection, SearchTypes } from '../types';
import { FilterState } from '../filterSlice';

type SegButtons = {
    value: SearchTypes;
    label: string;
};

type MediaSelectorProps = {
    selection: string;
    onSelect: (type: FilterState['current']) => void;
};

export const MediaSelector = ({ selection, onSelect }: MediaSelectorProps) => {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const buttons: SegButtons[] = useMemo(
        () => [
            {
                value: MediaType.Anime,
                label: 'Anime',
            },
            {
                value: MediaType.Manga,
                label: 'Manga',
            },
            {
                value: 'characters',
                label: 'Characters',
            },
            {
                value: 'staff',
                label: 'Staff',
            },
            {
                value: 'studios',
                label: 'Studios',
            },
        ],
        [],
    );

    return (
        <SafeAreaView style={[styles.container, { width, backgroundColor: colors.background }]}>
            <SegmentedButtons
                value={selection}
                onValueChange={onSelect}
                density="small"
                buttons={[buttons[0], buttons[1]]}
            />
            <SegmentedButtons
                value={selection}
                onValueChange={onSelect}
                density="small"
                buttons={[buttons[2], buttons[3], buttons[4]]}
                style={{ marginTop: 5 }}
            />
        </SafeAreaView>
    );
};

export const MediaSelectorMem = memo(MediaSelector);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
        alignSelf: 'center',
    },
});
