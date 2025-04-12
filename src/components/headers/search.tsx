import { useSearchStore } from '@/store/search/searchStore';
import { useAppTheme } from '@/store/theme/themes';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { Appbar, IconButton, Searchbar } from 'react-native-paper';
import { SlideInUp, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShallow } from 'zustand/react/shallow';
import { AnimViewMem } from '../animations';
import { MediaType } from '@/api/anilist/__genereated__/gql';
import { router } from 'expo-router';

type SearchHeaderProps = NativeStackHeaderProps & {
	openFilter: () => void;
	searchbarRef: React.RefObject<TextInput>;
	toggleIsFocused: (value: boolean) => void;
	openImageSearch: () => void;
	openWaifuSearch: () => void;
	onFocus: () => void;
	autoFocus?: boolean;
};
export const SearchHeader = ({
	navigation,
	openFilter,
	searchbarRef,
	autoFocus = true,
	toggleIsFocused,
	openImageSearch,
	// openWaifuSearch,
	onFocus,
}: SearchHeaderProps) => {
	const { colors } = useAppTheme();
	const { right, left } = useSafeAreaInsets();
	const { query, searchType, updateQuery } = useSearchStore(
		useShallow((state) => ({
			searchType: state.searchType,
			query: state.query,
			updateQuery: state.updateQuery,
		})),
	);

	const [tempQuery, setTempQuery] = useState(query);

	// temp solution to input lag
	useEffect(() => {
		updateQuery(tempQuery);
	}, [tempQuery]);

	useEffect(() => {
		setTempQuery(query);
	}, [query]);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			toggleIsFocused(true);
		});
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			toggleIsFocused(false);
		});

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return (
		<Appbar.Header>
			<AnimViewMem
				entering={SlideInUp.duration(500)}
				exiting={SlideOutDown}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingHorizontal: Math.max(left, right),
					zIndex: 5,
				}}
			>
				<Searchbar
					ref={searchbarRef}
					value={tempQuery}
					// onChangeText={setSearchTerm}
					onChangeText={(txt) => setTempQuery(txt)}
					// onSubmitEditing={searchContent}
					scrollEnabled
					returnKeyType="search"
					autoFocus={autoFocus}
					onFocus={() => {
						// searchbarRef?.current?.focus();
						toggleIsFocused(true);
						onFocus();
					}}
					onBlur={() => {
						toggleIsFocused(false);
					}}
					placeholder="Search sauce..."
					mode="bar"
					onIconPress={() => navigation.goBack()}
					selectionColor={colors.primaryContainer}
					icon={'arrow-left'}
					traileringIcon={
						searchType === MediaType.Anime ||
						searchType === MediaType.Manga ||
						searchType === 'CHARACTER'
							? 'image-search-outline'
							: undefined
					}
					onTraileringIconPress={
						searchType === MediaType.Anime ||
						searchType === MediaType.Manga ||
						searchType === 'CHARACTER'
							? openImageSearch
							: undefined
					}
					style={{ flex: 1, backgroundColor: 'transparent' }}
					inputStyle={{ justifyContent: 'center', textAlignVertical: 'center' }}
					onClearIconPress={() => {
						setTempQuery('');
					}}
				/>
				{/* <IconButton
                    icon={'filter-variant'} //filter-variant
                    onPress={openFilter}
                    // onPress={() => setIsFilterOpen((prev) => !prev)}
                    disabled={
                        ![MediaType.Anime, MediaType.Manga, 'imageSearch'].includes(currentType)
                    }
                /> */}
				{searchType !== 'STUDIO' && (
					<IconButton
						icon={'view-module'}
						onPress={() =>
							router.push({
								pathname: '/(sheets)/displayConfig',
								params: { type: 'search' },
							})
						}
						// onPress={() => setIsFilterOpen((prev) => !prev)}
						// disabled={
						// 	![MediaType.Anime, MediaType.Manga, 'imageSearch'].includes(currentType)
						// }
					/>
				)}
				<IconButton
					icon={'filter-outline'}
					onPress={openFilter}
					// onPress={() => setIsFilterOpen((prev) => !prev)}
					// disabled={
					// 	![MediaType.Anime, MediaType.Manga, 'imageSearch'].includes(currentType)
					// }
				/>
			</AnimViewMem>
		</Appbar.Header>
	);
};
