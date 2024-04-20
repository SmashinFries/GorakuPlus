import {
	Badge,
	Button,
	Chip,
	IconButton,
	Searchbar,
	SearchbarProps,
	Text,
} from 'react-native-paper';
import { MotiView } from 'moti';
import {
	ExploreMediaQueryVariables,
	GenreTagCollectionQuery,
} from '@/store/services/anilist/generated-anilist';
import { SectionList, View } from 'react-native';
import { Ref, forwardRef, memo, useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
	BottomSheetView,
	useBottomSheetInternal,
	useBottomSheetModalInternal,
} from '@gorhom/bottom-sheet';
import { TagBanSwitch } from './buttons';
import { setSettings } from '@/store/slices/settingsSlice';
import { router } from 'expo-router';
import { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';
import { sendToast } from '@/utils/toast';

type TagProps = {
	name: string;
	state?: 'in' | 'not_in' | undefined;
	description?: string;
	disabled?: boolean;
	onToggle: (mode: 'in' | 'not_in' | 'remove') => void;
};
export const FilterTag = ({ name, description, state, onToggle, disabled }: TagProps) => {
	return (
		<Chip
			style={{
				margin: 5,
				// shadowColor: state === 'in' ? 'green' : state === 'not_in' ? 'red' : undefined,
				borderColor: state === 'in' ? 'green' : state === 'not_in' ? 'red' : undefined,
			}}
			selected={state === 'in' ? true : state === 'not_in'}
			icon={state === 'in' ? 'check' : state === 'not_in' ? 'close' : undefined}
			onPress={() => {
				onToggle(state === 'in' ? 'not_in' : state === 'not_in' ? 'remove' : 'in');
			}}
			onLongPress={() => description && sendToast(name, description)}
			// onPress={() => console.log(name)}
			selectedColor={state === 'in' ? 'green' : state === 'not_in' ? 'red' : undefined}
			// elevated
			disabled={disabled}
			mode={'outlined'}
		>
			{name}
		</Chip>
	);
};

type TagSelectionProps = {
	tags_in: string[];
	tags_not_in: string[];
	isAdult: boolean;
	tagBanEnabled: boolean;
	toggleTag: (tag: string) => void;
	resetTagsGenre: () => void;
	onTagBlacklistChange: (value: boolean) => void;
	openTagDialog: () => void;
};

type GenreSelectionProps = {
	data: GenreTagCollectionQuery['GenreCollection'];
	genre_in: ExploreMediaQueryVariables['genre_in'];
	genre_not_in: ExploreMediaQueryVariables['genre_not_in'];
	isAdult: boolean;
	toggleGenre: (genre: string) => void;
	resetTagsGenre: () => void;
};

export const TagSelection = ({
	tags_in,
	tags_not_in,
	isAdult,
	tagBanEnabled,
	toggleTag,
	resetTagsGenre,
	onTagBlacklistChange,
	openTagDialog,
}: TagSelectionProps) => {
	const { defaultTagLayout, tagBlacklist } = useAppSelector((state) => state.persistedSettings);
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
			if (tags_in?.includes(name)) {
				return 'in';
			} else if (tags_not_in?.includes(name)) {
				return 'not_in';
			} else {
				return undefined;
			}
		},
		[tags_in, tags_not_in],
	);

	const TagItem = useCallback(
		({ item }) => {
			return !isAdult && item.isAdult ? null : (
				<FilterTag
					name={item.name}
					state={getTagState(item.name)}
					onToggle={() => toggleTag(item.name)}
					disabled={tagBanEnabled ? tagBlacklist?.includes(item.name) : false}
				/>
			);
		},
		[isAdult, tags_in, tags_not_in, tagBanEnabled],
	);

	return (
		<View style={{ paddingBottom: 20 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Text style={{ paddingHorizontal: 10 }} variant="titleLarge">
					Tags
				</Text>
				<View>
					<IconButton icon={'filter-off-outline'} onPress={() => resetTagsGenre()} />
					{tags_in?.length > 0 || tags_not_in?.length > 0 ? (
						<Badge style={{ position: 'absolute', right: -8, top: 0 }}>
							{(tags_in?.length ?? 0) + (tags_not_in?.length ?? 0)}
						</Badge>
					) : null}
				</View>
				<TagBanSwitch
					initialState={tagBanEnabled}
					totalBanned={tagBlacklist?.length}
					onPress={(value) => onTagBlacklistChange(value)}
				/>
			</View>
			<ScrollView horizontal contentContainerStyle={{ paddingVertical: 10 }}>
				{tags_in?.map((tag, idx) => (
					<TagItem key={idx} item={{ name: tag, isAdult: false }} />
				))}
				{tags_not_in?.map(
					(tag, idx) =>
						tagBanEnabled &&
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

export const GenreSelection = ({
	data,
	genre_in,
	genre_not_in,
	isAdult,
	toggleGenre,
	resetTagsGenre,
}: GenreSelectionProps) => {
	const { defaultGenreLayout } = useAppSelector((state) => state.persistedSettings);
	const [genreMode, setGenreMode] = useState(defaultGenreLayout);
	const settingsDispatch = useAppDispatch();

	const changeLayout = useCallback(() => {
		setGenreMode((prev) => (prev === 'list' ? 'row' : 'list'));
		settingsDispatch(
			setSettings({
				entryType: 'defaultGenreLayout',
				value: genreMode === 'list' ? 'row' : 'list',
			}),
		);
	}, []);

	const getGenreState = useCallback(
		(name: string) => {
			if (genre_in?.includes(name)) {
				return 'in';
			} else if (genre_not_in?.includes(name)) {
				return 'not_in';
			} else {
				return undefined;
			}
		},
		[genre_in, genre_not_in],
	);

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
					<IconButton icon={'filter-off-outline'} onPress={resetTagsGenre} />
					{genre_in?.length > 0 || genre_not_in?.length > 0 ? (
						<Badge style={{ position: 'absolute', right: -8, top: 0 }}>
							{(genre_in?.length ?? 0) + (genre_not_in?.length ?? 0)}
						</Badge>
					) : null}
				</View>
			</View>
			<FlatList
				key={genreMode}
				scrollEnabled={genreMode === 'row'}
				data={data}
				renderItem={({ item }) =>
					!isAdult && item === 'Hentai' ? null : (
						<FilterTag
							name={item}
							state={getGenreState(item)}
							onToggle={() => toggleGenre(item)}
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
