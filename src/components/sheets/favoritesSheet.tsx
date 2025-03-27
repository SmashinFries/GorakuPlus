import { useFavoritesFilterStore } from '@/store/favoritesStore';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { RefObject, useState } from 'react';
import { BottomSheetParent } from './bottomsheets';
import { View } from 'react-native';
import { Button, Checkbox, Chip, Divider, Searchbar } from 'react-native-paper';
import { useCollectionStore } from '@/store/useCollectionStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAppTheme } from '@/store/theme/themes';
import { AccordionMemo } from '../animations';
import { FilterSheetSection } from '../search/filtersheet';

const FavoritesFilterTags = () => {
	const { tags_include, tags_exclude, updateTagGenre } = useFavoritesFilterStore();
	const tagData = useCollectionStore((state) => state.tags);
	const { showNSFW } = useSettingsStore();
	const { colors } = useAppTheme();

	const [tagSearch, setTagSearch] = useState('');

	const updateTag = (val: string) => updateTagGenre(val, 'tags');

	return (
		<AccordionMemo
			title={'Tags'}
			description={
				(tags_include.length > 0 || tags_exclude.length > 0) && (
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							gap: 6,
							paddingHorizontal: 10,
						}}
					>
						{tags_include.map((tempTag, idx) => (
							<Chip
								key={idx}
								mode="outlined"
								compact
								style={{ borderColor: colors.primary }}
								textStyle={{ textTransform: 'capitalize' }}
								onPress={() => updateTag(tempTag)}
							>
								{tempTag}
							</Chip>
						))}
						{tags_exclude.map((tempTag, idx) => (
							<Chip
								key={idx}
								mode="outlined"
								compact
								style={{ borderColor: colors.error }}
								textStyle={{ textTransform: 'capitalize' }}
								onPress={() => updateTag(tempTag)}
							>
								{tempTag}
							</Chip>
						))}
					</View>
				)
			}
		>
			<Searchbar
				value={tagSearch}
				onChangeText={(txt) => setTagSearch(txt)}
				style={{ marginHorizontal: 10, marginVertical: 6 }}
				mode="view"
			/>
			{tagData
				?.filter((val) =>
					val.subCategories &&
					val.subCategories.some((subCat) =>
						subCat?.tags?.some((subCatTag) =>
							subCatTag?.name.toLowerCase().includes(tagSearch.toLowerCase()),
						),
					)
						? true
						: val.tags?.some((data) =>
								data?.name.toLowerCase().includes(tagSearch.toLowerCase()),
							),
				)
				.map((tagSection, idx) =>
					!showNSFW && tagSection.title === 'Sexual Content' ? null : (
						<FilterSheetSection
							key={idx}
							title={tagSection.title}
							nestedLevel={1}
							initialExpand={tagSearch.length > 0 && idx === 0}
						>
							{tagSection.tags &&
								tagSection.tags
									?.filter((val) =>
										val?.name.toLowerCase().includes(tagSearch.toLowerCase()),
									)
									.map(
										(tag, idx) =>
											tag &&
											(tag.name === 'Sexual Content' ? null : (
												<Checkbox.Item
													position="leading"
													key={idx}
													label={tag.name}
													status={
														tags_include?.includes(tag.name)
															? 'checked'
															: tags_exclude?.includes(tag.name)
																? 'indeterminate'
																: 'unchecked'
													}
													onPress={() => updateTag(tag.name)}
												/>
											)),
									)}
							{tagSection.subCategories &&
								tagSection.subCategories
									?.filter((val) =>
										val.tags?.some((data) =>
											data?.name
												.toLowerCase()
												.includes(tagSearch.toLowerCase()),
										),
									)
									.map((subTagSection, idx) => (
										<FilterSheetSection
											key={idx}
											title={subTagSection.title}
											nestedLevel={2}
											initialExpand={tagSearch.length > 0 && idx === 0}
										>
											{subTagSection.tags &&
												subTagSection.tags
													?.filter((val) =>
														val?.name
															.toLowerCase()
															.includes(tagSearch.toLowerCase()),
													)
													.map(
														(tag, idx) =>
															tag && (
																<Checkbox.Item
																	position="leading"
																	key={idx}
																	label={tag.name}
																	status={
																		tags_include?.includes(
																			tag.name,
																		)
																			? 'checked'
																			: tags_exclude?.includes(
																						tag.name,
																				  )
																				? 'indeterminate'
																				: 'unchecked'
																	}
																	onPress={() =>
																		updateTag(tag.name)
																	}
																/>
															),
													)}
										</FilterSheetSection>
									))}
						</FilterSheetSection>
					),
				)}
		</AccordionMemo>
	);
};

const FavoritesFilterGenre = () => {
	const { genre_include, genre_exclude, updateTagGenre } = useFavoritesFilterStore();
	const genreData = useCollectionStore((state) => state.genres);

	const updateGenre = (val: string) => updateTagGenre(val, 'genre');

	return (
		<AccordionMemo
			title={`Genre${(genre_include?.length ?? 0) > 0 || (genre_exclude?.length ?? 0) > 0 ? ` (${(genre_include?.length ?? 0) + (genre_exclude?.length ?? 0)})` : ''}`}
			description={
				(genre_include || genre_exclude) && (
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							gap: 6,
							paddingHorizontal: 10,
						}}
					>
						{genre_include?.map((genre, idx) => (
							<Chip
								key={idx}
								mode="outlined"
								compact
								style={{ borderColor: 'green' }}
								textStyle={{ textTransform: 'capitalize' }}
								onPress={() => updateGenre(genre)}
							>
								{genre.replaceAll('_', ' ')}
							</Chip>
						))}
						{genre_exclude?.map((genre, idx) => (
							<Chip
								key={idx}
								compact
								mode="outlined"
								style={{ borderColor: 'red' }}
								textStyle={{ textTransform: 'capitalize' }}
								onPress={() => updateGenre(genre)}
							>
								{genre.replaceAll('_', ' ')}
							</Chip>
						))}
					</View>
				)
			}
		>
			{genreData.map((genre, idx) => (
				<Checkbox.Item
					position="leading"
					key={idx}
					label={genre}
					labelStyle={{ textTransform: 'capitalize' }}
					status={
						genre_include?.includes(genre)
							? 'checked'
							: genre_exclude?.includes(genre)
								? 'indeterminate'
								: 'unchecked'
					}
					onPress={() => updateGenre(genre)}
				/>
			))}
		</AccordionMemo>
	);
};

export type FavoritesFilterProps = {
	sheetRef: RefObject<TrueSheet>;
};

export const FavoritesFilterSheet = ({ sheetRef }: FavoritesFilterProps) => {
	const { reset } = useFavoritesFilterStore();
	return (
		<BottomSheetParent
			sheetRef={sheetRef}
			sizes={['auto', 'medium', 'large']}
			grabber={false}
			header={
				<>
					<View
						style={{
							width: '100%',
							padding: 8,
							flexDirection: 'row',
							justifyContent: 'flex-end',
						}}
					>
						<Button onPress={reset}>Reset</Button>
					</View>
					<Divider />
				</>
			}
			scrollable
		>
			<FavoritesFilterGenre />
			{/* <FavoritesFilterTags /> */}
		</BottomSheetParent>
	);
};
