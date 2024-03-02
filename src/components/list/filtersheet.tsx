import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetScrollView,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useMemo, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Button, Chip, List, Switch, useTheme } from 'react-native-paper';
import { updateListFilter } from '@/store/slices/listSLice';
import { MediaListSort, MediaTag, MediaType } from '@/store/services/anilist/generated-anilist';
import { TabView } from 'react-native-tab-view';
import { RenderTabBar } from '../tab';
import { useAppTheme } from '@/store/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { ListSortOptions, ListSortOptionsType } from '@/types/anilist';

// export enum ListSortOptions {
//     "AverageScore" = "AverageScore",
// } & MediaListSort;

const ListFilterFilter = ({ genres, tags }: { genres: string[]; tags: MediaTag[] }) => {
	const { genre } = useAppSelector((state) => state.listFilter);
	const dispatch = useAppDispatch();

	const addGenre = (genres: string) => {
		dispatch(updateListFilter({ entryType: 'genre', value: [...genre, genres] }));
	};
	const removeGenre = (genres: string) => {
		dispatch(
			updateListFilter({ entryType: 'genre', value: genre.filter((g) => g !== genres) }),
		);
	};

	return (
		<BottomSheetScrollView>
			<List.Section title={'Genres'}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{genres.map((genre, idx) => (
						<Chip
							key={idx}
							onPress={() => addGenre(genre)}
							style={{ marginHorizontal: 3 }}
						>
							{genre}
						</Chip>
					))}
				</ScrollView>
			</List.Section>
			<List.Section title={'Tags'}>
				<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
					{tags.map((tag, idx) => (
						<Chip key={idx} style={{ margin: 3 }}>
							{tag.name}
						</Chip>
					))}
				</View>
			</List.Section>
		</BottomSheetScrollView>
	);
};

const ListFilterSort = ({ setHeight }: { setHeight: (height: number) => void }) => {
	const { colors } = useAppTheme();
	const { sort } = useAppSelector((state) => state.listFilter);
	const dispatch = useAppDispatch();

	const onSortSelect = (newSort: ListSortOptionsType) => {
		// console.log('NEW SORT:', newSort);
		// console.log('SORT:', sort);
		if (newSort.replace('_DESC', '').includes(sort.replace('_DESC', ''))) {
			dispatch(
				updateListFilter({
					entryType: 'sort',
					value: !sort.includes('DESC') ? newSort : newSort.replace('_DESC', ''),
				}),
			);
		} else {
			dispatch(updateListFilter({ entryType: 'sort', value: newSort }));
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
						icon={sort.includes('DESC') ? 'sort-descending' : 'sort-ascending'}
						color={
							sort.replace('_DESC', '') === value.replace('_DESC', '')
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
		<BottomSheetView
			onLayout={(e) => {
				setHeight(e.nativeEvent.layout.height + 20 + 50); // add 20 paddingTop + 50 tab height
			}}
		>
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
		</BottomSheetView>
	);
};

const ListFilterTabs = ({
	mediaType,
	setHeight,
	genres,
	tags,
}: {
	mediaType: MediaType;
	setHeight: (height: number) => void;
	genres: string[];
	tags: MediaTag[];
}) => {
	const { colors } = useAppTheme();
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [routes, setRoutes] = useState<{ key: string; title: string }[]>([
		{
			key: 'sort',
			title: 'sort',
		},
		// {
		//     key: 'filter',
		//     title: 'filter',
		// },
	]);

	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'sort':
				return <ListFilterSort setHeight={(height) => setHeight(height)} />;
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

type ListFilterSheetProps = {
	mediaType: MediaType;
	genres: string[];
	tags: MediaTag[];
};

export const ListFilterSheet = React.forwardRef<BottomSheetModalMethods, ListFilterSheetProps>(
	(props, ref) => {
		const { height } = useWindowDimensions();
		const { colors } = useTheme();
		const [mainEntryHeight, setMainEntryHeight] = useState(0);
		// const snapPoints = useMemo(
		//     () => [
		//         `${(
		//             (mainEntryHeight / height > 0 ? (mainEntryHeight + 20) / height : 0.3) * 100
		//         ).toFixed(4)}%`,
		//         '50%',
		//     ],
		//     [mainEntryHeight, height],
		// );

		const snapPoints = useMemo(
			() => [
				mainEntryHeight ? `${((mainEntryHeight / height) * 100).toFixed(2)}%` : '30%',
				'80%',
			],
			[mainEntryHeight, height],
		);

		return (
			<BottomSheetModal
				ref={ref}
				index={0}
				snapPoints={snapPoints}
				backgroundStyle={{ backgroundColor: colors.elevation.level5 }}
				// onDismiss={() => submitNewEntry()}
				// onChange={handleSheetChange}
				// backdropComponent={CustomBackdrop}
				backdropComponent={(props) => (
					<BottomSheetBackdrop
						{...props}
						pressBehavior={'close'}
						disappearsOnIndex={-1}
					/>
				)}
			>
				{/* <BottomSheetView onLayout={(e) => setMainEntryHeight(e.nativeEvent.layout.height)}> */}
				<ListFilterTabs
					mediaType={props.mediaType}
					setHeight={(newHeight) => setMainEntryHeight(newHeight)}
					genres={props.genres}
					tags={props.tags}
				/>
				{/* </BottomSheetView> */}
			</BottomSheetModal>
		);
	},
);
