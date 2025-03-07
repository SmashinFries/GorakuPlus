import React, { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { List } from 'react-native-paper';
import { SceneRendererProps, TabView } from 'react-native-tab-view';
import { RenderTabBar } from '../tab';
import { ListSortOptions, ListSortOptionsType } from '@/types/anilist';
import { MediaListSort, MediaTag, MediaType } from '@/api/anilist/__genereated__/gql';
import { useListFilterStore } from '@/store/listStore';
import { useAppTheme } from '@/store/theme/themes';
import { BottomSheetParent } from './bottomsheets';
import { useShallow } from 'zustand/react/shallow';

const ListFilterSort = () => {
	const { colors } = useAppTheme();
	const { sort, updateListFilter } = useListFilterStore(
		useShallow((state) => ({
			sort: state.sort,
			updateListFilter: state.updateListFilter,
		})),
	);

	const onSortSelect = (newSort: ListSortOptionsType) => {
		if (sort && newSort.replace('_DESC', '').includes(sort.replace('_DESC', ''))) {
			updateListFilter?.({
				sort: !sort?.includes('DESC')
					? (newSort as MediaListSort)
					: (newSort.replace('_DESC', '') as MediaListSort),
			});
		} else {
			updateListFilter?.({ sort: newSort as MediaListSort });
		}
	};

	const ListSortItem = ({ title, value }: { title: string; value: ListSortOptionsType }) => {
		return (
			<List.Item
				title={title}
				titleStyle={{ textTransform: 'capitalize' }}
				onPress={() => onSortSelect(value)}
				left={(props) => (
					<List.Icon
						{...props}
						icon={sort?.includes('DESC') ? 'sort-descending' : 'sort-ascending'}
						color={
							sort?.replace('_DESC', '') === value.replace('_DESC', '')
								? colors.primary
								: 'transparent'
						}
					/>
				)}
				// right={(props) => sort.replace("_DESC", '') === value.replace("_DESC", '') ? <List.Icon {...props} icon={'check'} /> : null}
			/>
		);
	};

	return (
		<View>
			{/* {Object.values(MediaListSort).map((sortValue, idx) => !sortValue.includes('DESC') && (
                <List.Item key={idx} title={sortValue.replaceAll('_', ' ')} titleStyle={{textTransform:'capitalize'}} onPress={() => dispatch(updateListFilter({entryType:'sort', value:sortValue}))} right={(props) => sort === sortValue ? <List.Icon {...props} icon={'check'} /> : null} />
            ))} */}
			<ListSortItem
				title={MediaListSort.UpdatedTime.replaceAll('_', ' ')}
				value={MediaListSort.UpdatedTimeDesc}
			/>
			<ListSortItem title={'Added Time'} value={MediaListSort.AddedTimeDesc} />
			<ListSortItem
				title={MediaListSort.Progress.replaceAll('_', ' ')}
				value={MediaListSort.ProgressDesc}
			/>
			<ListSortItem title={'Your Score'} value={MediaListSort.ScoreDesc} />
			<ListSortItem title={'Title (Romaji)'} value={MediaListSort.MediaTitleRomajiDesc} />
			<ListSortItem title={'Title (English)'} value={MediaListSort.MediaTitleEnglishDesc} />
			<ListSortItem title={'Average Score'} value={ListSortOptions.AverageScoreDesc} />
			<ListSortItem title={'Mean Score'} value={ListSortOptions.MeanScoreDesc} />
			{/* <ListSortItem
                title={MediaListSort.StartedOn.replaceAll('_', ' ')}
                value={MediaListSort.StartedOnDesc}
            /> */}
			{/* <List.Item title={MediaListSort.AddedTime.replaceAll('_', ' ')} titleStyle={{textTransform:'capitalize'}} onPress={() => onSortSelect(MediaListSort.AddedTimeDesc)} right={(props) => sort === MediaListSort.AddedTimeDesc ? <List.Icon {...props} icon={'check'} /> : null} /> */}
		</View>
	);
};

const ListFilterTabs = () => {
	const { colors } = useAppTheme();
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [routes, _setRoutes] = useState<{ key: string; title: string }[]>([
		{
			key: 'sort',
			title: 'sort',
		},
		// {
		//     key: 'filter',
		//     title: 'filter',
		// },
	]);

	const renderScene = ({
		route,
	}: SceneRendererProps & {
		route: {
			key: string;
			title: string;
		};
	}) => {
		switch (route.key) {
			case 'sort':
				return <ListFilterSort />;
			// case 'filter':
			//     return <ListFilterFilter genres={genres} tags={tags} />;
			default:
				return null;
		}
	};

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={(props) => <RenderTabBar {...props} bgColor={colors.elevation.level5} />}
			swipeEnabled={false}
		/>
	);
};

export type ListFilterProps = {
	mediaType: MediaType;
	genres: string[];
	tags: MediaTag[];
};

export const ListFilterSheet = ({ genres, mediaType, tags }: ListFilterProps) => {
	return (
		<BottomSheetParent>
			<ListFilterTabs />
		</BottomSheetParent>
	);
};
