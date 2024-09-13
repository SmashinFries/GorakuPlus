import React, { memo, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { MD3Colors, SegmentedButtons, useTheme } from 'react-native-paper';
import { SearchType, useSearchStore } from '@/store/search/searchStore';
import { MediaType } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';

type SegButtons = {
	value: SearchType;
	label: string;
};

export const MediaSelector = () => {
	const { colors } = useAppTheme();
	const { width } = useWindowDimensions();
	const { searchType, updateSearchType } = useSearchStore();
	const buttons: SegButtons[] = useMemo(
		() => [
			{
				value: 'ALL',
				label: 'All',
			},
			{
				value: MediaType.Anime,
				label: 'Anime',
			},
			{
				value: MediaType.Manga,
				label: 'Manga',
			},
			{
				value: 'CHARACTER',
				label: 'Characters',
			},
			{
				value: 'STAFF',
				label: 'Staff',
			},
			{
				value: 'STUDIO',
				label: 'Studios',
			},
		],
		[],
	);

	return (
		<SafeAreaView style={[styles.container, { width, backgroundColor: colors.background }]}>
			<SegmentedButtons
				value={searchType}
				onValueChange={updateSearchType}
				density="small"
				buttons={[buttons[0], buttons[1], buttons[2]]}
			/>
			<SegmentedButtons
				value={searchType}
				onValueChange={updateSearchType}
				density="small"
				buttons={[buttons[3], buttons[4], buttons[5]]}
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
