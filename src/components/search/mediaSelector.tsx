import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SegmentedButtons, SegmentedButtonsProps } from 'react-native-paper';
import { useSearchStore } from '@/store/search/searchStore';
import { MediaType } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';

export const MediaSelector = () => {
	const { searchType, updateSearchType } = useSearchStore();
	const { roundness } = useAppTheme();
	const buttons: SegmentedButtonsProps['buttons'] = useMemo(
		() =>
			[
				{
					value: 'ALL',
					label: 'All',
					style: {
						borderRightWidth: 1,
						borderTopRightRadius: 5 * roundness,
						borderBottomRightRadius: 5 * roundness,
					},
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
				{
					value: 'USER',
					label: 'Users',
				},
			] as SegmentedButtonsProps['buttons'],
		[],
	);

	return (
		<View style={[styles.container]}>
			<SegmentedButtons
				value={searchType}
				onValueChange={updateSearchType}
				density="small"
				buttons={[buttons[0]]}
			/>
			<SegmentedButtons
				value={searchType}
				onValueChange={updateSearchType}
				density="small"
				buttons={[buttons[1], buttons[2], buttons[3]]}
				style={{ marginTop: 5 }}
			/>
			<SegmentedButtons
				value={searchType}
				onValueChange={updateSearchType}
				density="small"
				buttons={[buttons[4], buttons[5], buttons[6]]}
				style={{ marginTop: 5 }}
			/>
		</View>
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
