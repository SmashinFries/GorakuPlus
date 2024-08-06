import { Badge, Button, Chip, IconButton, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useCallback, useState } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { TagBanSwitch } from './buttons';
import { sendToast } from '@/utils/toast';
import {
	GenreTagCollectionQuery,
	SearchAnimeQueryVariables,
} from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useSearchStore } from '@/store/search/searchStore';

type TagProps = {
	name: string;
	state?: 'in' | 'not_in' | undefined;
	description?: string;
	disabled?: boolean;
	isAdult?: boolean;
	onToggle: (mode: 'in' | 'not_in' | 'remove') => void;
};
export const FilterTag = ({ name, description, state, isAdult, onToggle, disabled }: TagProps) => {
	return (
		<Chip
			style={[
				{
					margin: 5,
					// shadowColor: state === 'in' ? 'green' : state === 'not_in' ? 'red' : undefined,
					borderColor: state === 'in' ? 'green' : state === 'not_in' ? 'red' : undefined,
				},
				isAdult && { backgroundColor: '#ffb6c1' },
			]}
			selected={state === 'in' ? true : state === 'not_in'}
			icon={state === 'in' ? 'check' : state === 'not_in' ? 'close' : undefined}
			onPress={() => {
				onToggle(state === 'in' ? 'not_in' : state === 'not_in' ? 'remove' : 'in');
			}}
			onLongPress={() => description && sendToast(name, description)}
			selectedColor={state === 'in' ? 'green' : state === 'not_in' ? 'red' : undefined}
			textStyle={[isAdult && { color: 'black' }]}
			disabled={disabled}
			mode={'outlined'}
		>
			{name}
		</Chip>
	);
};

type TagSelectionProps = {
	openTagDialog: () => void;
};

type GenreSelectionProps = {
	data: GenreTagCollectionQuery['GenreCollection'];
	// genre_in: string | string[];
	// genre_not_in: string | string[];
	// isAdult: boolean;
	// toggleGenre: (genre: string) => void;
	// resetTagsGenre: () => void;
};

export const TagSelection = ({
	// tags_in,
	// tags_not_in,
	// isAdult,
	// tagBanEnabled,
	// toggleTag,
	// resetTagsGenre,
	// onTagBlacklistChange,
	openTagDialog,
}: TagSelectionProps) => {
	const { filter, isTagBlacklistEnabled, updateTags, updateFilter, toggleTagBlacklist } =
		useSearchStore();
	const { tagBlacklist } = useSettingsStore();
	// const [tagMode, setTagMode] = useState(defaultTagLayout);
	// const settingsDispatch = useAppDispatch();

	// const changeLayout = useCallback(() => {
	// 	setTagMode((prev) => (prev === 'list' ? 'row' : 'list'));
	// 	settingsDispatch(
	// 		setSettings({
	// 			entryType: 'defaultTagLayout',
	// 			value: tagMode === 'list' ? 'row' : 'list',
	// 		}),
	// 	);
	// }, []);

	const getTagState = useCallback(
		(name: string) => {
			if (filter.tag_in?.includes(name)) {
				return 'in';
			} else if (filter.tag_not_in?.includes(name)) {
				return 'not_in';
			} else {
				return undefined;
			}
		},
		[filter.tag_in, filter.tag_not_in],
	);

	const TagItem = useCallback(
		({ item }) => {
			return !filter.isAdult && item.isAdult ? null : (
				<FilterTag
					name={item.name}
					state={getTagState(item.name)}
					onToggle={() => updateTags(item.name)}
					isAdult={item.isAdult}
					disabled={isTagBlacklistEnabled ? tagBlacklist?.includes(item.name) : false}
				/>
			);
		},
		[filter.isAdult, filter.tag_in, filter.tag_not_in, isTagBlacklistEnabled],
	);

	return (
		<View style={{ paddingBottom: 20 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Text style={{ paddingHorizontal: 10 }} variant="titleLarge">
					Tags
				</Text>
				<View>
					<IconButton
						icon={'filter-off-outline'}
						onPress={() => updateFilter({ tag_in: undefined, tag_not_in: undefined })}
					/>
					{filter.tag_in?.length > 0 || filter.tag_not_in?.length > 0 ? (
						<Badge style={{ position: 'absolute', right: -8, top: 0 }}>
							{(filter.tag_in?.length ?? 0) + (filter.tag_not_in?.length ?? 0)}
						</Badge>
					) : null}
				</View>
				<TagBanSwitch
					initialState={isTagBlacklistEnabled}
					totalBanned={tagBlacklist?.length}
					onPress={toggleTagBlacklist}
				/>
			</View>
			<ScrollView horizontal contentContainerStyle={{ paddingVertical: 10 }}>
				{(filter.tag_in as string[])?.map((tag, idx) => (
					<TagItem key={idx} item={{ name: tag, isAdult: false }} />
				))}
				{(filter.tag_not_in as string[])?.map(
					(tag, idx) =>
						isTagBlacklistEnabled &&
						!tagBlacklist?.includes(tag) && (
							<TagItem key={idx} item={{ name: tag, isAdult: false }} />
						),
				)}
				{/* {tagBanEnabled &&
					tagBlacklist?.map((tag, idx) => (
						<TagItem key={idx} item={{ name: tag, isAdult: false }} />
					))} */}
			</ScrollView>
			<Button mode="outlined" onPress={openTagDialog}>
				Add Tags
			</Button>
		</View>
	);
};

export const GenreSelection = ({ data }: GenreSelectionProps) => {
	const { filter, updateGenre, updateFilter } = useSearchStore();
	const { defaultGenreLayout, setSettings } = useSettingsStore();
	const [genreMode, setGenreMode] = useState(defaultGenreLayout);

	const changeLayout = useCallback(() => {
		setGenreMode((prev) => (prev === 'list' ? 'row' : 'list'));
		setSettings({ defaultGenreLayout: genreMode === 'list' ? 'row' : 'list' });
	}, []);

	const getGenreState = useCallback(
		(name: string) => {
			if (filter.genre_in?.includes(name)) {
				return 'in';
			} else if (filter.genre_not_in?.includes(name)) {
				return 'not_in';
			} else {
				return undefined;
			}
		},
		[filter.genre_in, filter.genre_not_in],
	);

	const resetGenres = () => updateFilter({ genre_in: undefined, genre_not_in: undefined });

	if (!data) {
		return null;
	}

	return (
		<View>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Text style={{ paddingHorizontal: 10 }} variant="titleLarge">
					Genres
				</Text>
				<IconButton
					icon={
						genreMode === 'list' ? 'arrow-expand-vertical' : 'arrow-expand-horizontal'
					}
					style={{ marginLeft: 10 }}
					onPress={() => changeLayout()}
				/>
				<View>
					<IconButton icon={'filter-off-outline'} onPress={resetGenres} />
					{filter.genre_in?.length > 0 || filter.genre_not_in?.length > 0 ? (
						<Badge style={{ position: 'absolute', right: -8, top: 0 }}>
							{(filter.genre_in?.length ?? 0) + (filter.genre_not_in?.length ?? 0)}
						</Badge>
					) : null}
				</View>
			</View>
			<FlatList
				key={genreMode}
				scrollEnabled={genreMode === 'row'}
				data={data}
				renderItem={({ item }) =>
					!filter.isAdult && item === 'Hentai' ? null : (
						<FilterTag
							name={item}
							state={getGenreState(item)}
							onToggle={() => updateGenre(item)}
						/>
					)
				}
				numColumns={genreMode === 'list' ? 3 : null}
				keyExtractor={(item, index) => item + index.toString()}
				horizontal={genreMode === 'row'}
				nestedScrollEnabled
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ padding: 10, paddingTop: 0, paddingVertical: 20 }}
			/>
		</View>
	);
};
