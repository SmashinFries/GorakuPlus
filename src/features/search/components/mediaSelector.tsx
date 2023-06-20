import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MD3Colors, SegmentedButtons, useTheme } from 'react-native-paper';
import { MediaType } from '../../../app/services/anilist/generated-anilist';
import { MediaSearchSelection } from '../types';

type SegButtons = {
    value: MediaSearchSelection;
    label: string;
};

type MediaSelectorProps = {
    selection: string;
    onSelect: (type: MediaSearchSelection) => void;
};

export const MediaSelector = ({ selection, onSelect }: MediaSelectorProps) => {
    const { colors } = useTheme();
    const buttons: SegButtons[] = [
        {
            value: MediaType.Anime,
            label: 'Anime',
        },
        {
            value: MediaType.Manga,
            label: 'Manga',
        },
        {
            value: 'NOVEL',
            label: 'Novel',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
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
