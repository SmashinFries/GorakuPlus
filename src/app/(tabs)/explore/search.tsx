import { MediaType } from '@/api/anilist/__genereated__/gql';
import { SearchHeader } from '@/components/headers';
import { KeyboardSpacerView } from '@/components/keyboard';
import { ImageSearchDialog } from '@/components/search/dialogs';
import { FilterSheet } from '@/components/search/filtersheet';
import {
	AnimeSearchList,
	CharacterSearchList,
	MangaSearchList,
	SearchAllList,
	StaffSearchList,
	StudioSearchList,
	UserSearchList,
} from '@/components/search/lists';
import {
	SauceNaoSheet,
	SauceNaoSheetProps,
	TraceMoeSheet,
	TraceMoeSheetProps,
} from '@/components/sheets/bottomsheets';
import { useSearchHistoryStore } from '@/store/search/searchHistoryStore';
import { useSearchStore } from '@/store/search/searchStore';
import { useAppTheme } from '@/store/theme/themes';
import { SearchPreset } from '@/types/anilist';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { useCallback, useRef, useState } from 'react';
import { Keyboard, ScrollView, TextInput } from 'react-native';
import { View } from 'react-native';
import { IconButton, List, Portal } from 'react-native-paper';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

const SearchPage = () => {
	const { colors } = useAppTheme();
	const searchbarRef = useRef<TextInput>(null);

	const { preset, presetType } = useLocalSearchParams<{
		preset?: SearchPreset;
		presetType?: MediaType;
	}>();

	const [isFocused, setIsFocused] = useState(false);

	const [showImageSearchDialog, setShowImageSearchDialog] = useState(false);

	const toggleIsFocused = useCallback((value: boolean) => setIsFocused(value), []);

	const { searchType, updateQuery, setPreset, reset } = useSearchStore();
	const { searchTerms, removeSearchTerm } = useSearchHistoryStore();

	const [traceMoeParams, setTraceMoeParams] = useState<Omit<TraceMoeSheetProps, 'sheetRef'>>({
		image: undefined,
		url: undefined,
	});
	const [sauceNaoParams, setSauceNaoParams] = useState<SauceNaoSheetProps['file'] | undefined>(
		undefined,
	);

	// Filter Sheet
	const sheetRef = useRef<TrueSheet>(null);
	const traceMoeSheetRef = useRef<TrueSheet>(null);
	const sauceNaoSheetRef = useRef<TrueSheet>(null);

	useEffect(() => {
		if (preset && presetType) {
			setPreset(presetType, preset);
		} else {
			reset();
		}
	}, []);

	return (
		<>
			<Stack.Screen
				options={{
					header: (props) => (
						<View>
							<SearchHeader
								{...props}
								autoFocus={!preset && !presetType}
								// searchContent={onSearch}
								openFilter={() => {
									Keyboard.dismiss();
									// onSearchTypeChange
									// openSheet();
									sheetRef.current?.present();
									// router.push('/filter');
								}}
								toggleIsFocused={toggleIsFocused}
								searchbarRef={searchbarRef}
								openImageSearch={() => {
									Keyboard.dismiss();
									// onSearchTypeChange('imageSearch');
									// onMediaTypeChange('imageSearch');
									setShowImageSearchDialog(true);
								}}
								openWaifuSearch={() => {
									Keyboard.dismiss();
									setShowImageSearchDialog(true);
								}}
								onFocus={() => {
									// scrollClamp.value = withTiming(-categoryHeight);
								}}
							/>
						</View>
					),
				}}
			/>
			<View style={{ flex: 1 }}>
				{searchType === 'ALL' && <SearchAllList />}
				{searchType === MediaType.Anime && <AnimeSearchList />}
				{searchType === MediaType.Manga && <MangaSearchList />}
				{searchType === 'CHARACTER' && <CharacterSearchList />}
				{searchType === 'STAFF' && <StaffSearchList />}
				{searchType === 'STUDIO' && <StudioSearchList />}
				{searchType === 'USER' && <UserSearchList />}
				{isFocused && (searchTerms?.length ?? 0) > 0 && (
					<Animated.View
						style={{
							position: 'absolute',
							height: '100%',
							width: '100%',
							backgroundColor: colors.background,
							zIndex: 1,
						}}
						exiting={SlideOutDown}
						entering={SlideInDown}
					>
						<ScrollView keyboardShouldPersistTaps={'always'}>
							{searchTerms?.map((term, idx) => (
								<List.Item
									key={idx}
									title={term}
									right={(props) => (
										<IconButton
											{...props}
											icon={'delete-outline'}
											onPress={() => removeSearchTerm(term)}
										/>
									)}
									onPress={() => {
										updateQuery(term);
									}}
								/>
							))}
							<KeyboardSpacerView />
						</ScrollView>
					</Animated.View>
				)}
			</View>
			<FilterSheet sheetRef={sheetRef} />
			<TraceMoeSheet sheetRef={traceMoeSheetRef} {...traceMoeParams} />
			<SauceNaoSheet sheetRef={sauceNaoSheetRef} file={sauceNaoParams} />
			<Portal>
				<ImageSearchDialog
					visible={showImageSearchDialog}
					onDismiss={() => setShowImageSearchDialog(false)}
					openTraceMoeSheet={(url, image) => {
						setTraceMoeParams({ url, image });
						traceMoeSheetRef.current?.present();
					}}
					openSauceNaoSheet={(file) => {
						setSauceNaoParams(file);
						sauceNaoSheetRef.current?.present();
					}}
				/>
			</Portal>
		</>
	);
};

export default SearchPage;
