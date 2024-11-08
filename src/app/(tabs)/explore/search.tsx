import { MediaType } from '@/api/anilist/__genereated__/gql';
import { SearchHeader } from '@/components/headers';
import { KeyboardSpacerView } from '@/components/keyboard';
import { ImageSearchDialog } from '@/components/search/dialogs';
import { FilterSheetTest } from '@/components/search/filtersheet';
import {
	AnimeSearchList,
	CharacterSearchList,
	MangaSearchList,
	SearchAllList,
	StaffSearchList,
	StudioSearchList,
	UserSearchList,
} from '@/components/search/lists';
import { useSearchHistoryStore } from '@/store/search/searchHistoryStore';
import { useSearchStore } from '@/store/search/searchStore';
import { useAppTheme } from '@/store/theme/themes';
import { Stack } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Keyboard, ScrollView, TextInput } from 'react-native';
import { View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { IconButton, List, Portal } from 'react-native-paper';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

const SearchPage = () => {
	const { colors } = useAppTheme();
	const searchbarRef = useRef<TextInput>();

	const [isFocused, setIsFocused] = useState(false);

	const [showImageSearchDialog, setShowImageSearchDialog] = useState(false);

	const toggleIsFocused = useCallback((value: boolean) => setIsFocused(value), []);

	const { searchType, updateQuery } = useSearchStore();
	const { searchTerms, removeSearchTerm } = useSearchHistoryStore();

	// Filter Sheet
	const sheetRef = useRef<ActionSheetRef>(null);

	return (
		<>
			<Stack.Screen
				options={{
					header: (props) => (
						<View>
							<SearchHeader
								{...props}
								// searchContent={onSearch}
								openFilter={() => {
									Keyboard.dismiss();
									// onSearchTypeChange
									// openSheet();
									sheetRef.current?.show();
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
				{isFocused && searchTerms.length > 0 && (
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
							{searchTerms.map((term, idx) => (
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
			<FilterSheetTest sheetRef={sheetRef} />
			<Portal>
				<ImageSearchDialog
					visible={showImageSearchDialog}
					onDismiss={() => setShowImageSearchDialog(false)}
				/>
			</Portal>
		</>
	);
};

export default SearchPage;
