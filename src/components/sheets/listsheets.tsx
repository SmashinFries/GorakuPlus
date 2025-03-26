import React, { RefObject, useState } from 'react';
import { Button, Checkbox, Chip, Divider, List, RadioButton, Searchbar } from 'react-native-paper';
import { ListSortOptions, ListSortOptionsType } from '@/types/anilist';
import { MediaFormat, MediaListSort, MediaType } from '@/api/anilist/__genereated__/gql';
import { useListFilterStore } from '@/store/listStore';
import { useAppTheme } from '@/store/theme/themes';
import { BottomSheetParent } from './bottomsheets';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { Accordion } from '../animations';
import { View } from 'react-native';
import { useCollectionStore } from '@/store/useCollectionStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { FilterSheetSection } from '../search/filtersheet';
import { ANIME_FORMATS, MANGA_FORMATS } from '@/constants/mediaConsts';
import { COUNTRY_OPTIONS, MEDIA_FORMAT_ALT } from '@/constants/anilist';

const ListFilterSort = () => {
	const { colors } = useAppTheme();
	const { sort, updateListFilter } = useListFilterStore();

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
		<Accordion title="Sort">
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
			<ListSortItem
				title={MediaListSort.StartedOn.replaceAll('_', ' ')}
				value={MediaListSort.StartedOnDesc}
			/>
			<ListSortItem
				title={MediaListSort.FinishedOn.replaceAll('_', ' ')}
				value={MediaListSort.FinishedOnDesc}
			/>
			<ListSortItem
				title={MediaListSort.MediaPopularity.replaceAll('_', ' ')}
				value={MediaListSort.MediaPopularityDesc}
			/>
		</Accordion>
	);
};

const ListFilterTags = () => {
	const { tags_include, tags_exclude, updateTagGenre } = useListFilterStore();
	const tagData = useCollectionStore((state) => state.tags);
	const { showNSFW } = useSettingsStore();
	const { colors } = useAppTheme();

	const [tagSearch, setTagSearch] = useState('');

	const updateTag = (val: string) => updateTagGenre(val, 'tags');

	return (
		<Accordion
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
		</Accordion>
	);
};

const ListFilterGenre = () => {
	const { genre_include, genre_exclude, updateTagGenre } = useListFilterStore();
	const genreData = useCollectionStore((state) => state.genres);

	const updateGenre = (val: string) => updateTagGenre(val, 'genre');

	return (
		<Accordion
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
		</Accordion>
	);
};

const ListFilterFormats = ({ type }: { type: MediaType }) => {
	const { colors } = useAppTheme();
	const {
		anime_format_in,
		anime_format_not_in,
		manga_format_in,
		manga_format_not_in,
		updateFormats,
	} = useListFilterStore();

	return (
		<Accordion
			title="Formats"
			description={
				((type === MediaType.Anime ? anime_format_in : manga_format_in).length > 0 ||
					(type === MediaType.Anime ? anime_format_not_in : manga_format_not_in).length >
						0) && (
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							gap: 6,
							paddingHorizontal: 10,
						}}
					>
						{(type === MediaType.Anime ? anime_format_in : manga_format_in).map(
							(tempFormat, idx) => (
								<Chip
									key={idx}
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() => updateFormats(type, tempFormat as MediaFormat)}
								>
									{tempFormat}
								</Chip>
							),
						)}
						{(type === MediaType.Anime ? anime_format_not_in : manga_format_not_in).map(
							(tempFormat, idx) => (
								<Chip
									key={idx}
									mode="outlined"
									compact
									style={{ borderColor: colors.error }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() => updateFormats(type, tempFormat as MediaFormat)}
								>
									{tempFormat}
								</Chip>
							),
						)}
					</View>
				)
			}
		>
			{(type === MediaType.Anime ? ANIME_FORMATS : MANGA_FORMATS).map((format, idx) => (
				<Checkbox.Item
					position="leading"
					key={idx}
					label={MEDIA_FORMAT_ALT[format]}
					onPress={() => updateFormats(type, format)}
					status={
						(type === MediaType.Anime ? anime_format_in : manga_format_in)?.includes(
							format,
						)
							? 'checked'
							: (type === MediaType.Anime
										? anime_format_not_in
										: manga_format_not_in
								  )?.includes(format)
								? 'indeterminate'
								: 'unchecked'
					}
				/>
			))}
		</Accordion>
	);
};

const ListFilterOrigin = () => {
	const { countryOfOrigin, updateListFilter } = useListFilterStore();

	const renderCountryOptions = () =>
		Object.keys(COUNTRY_OPTIONS).map((c_code, idx) => (
			<RadioButton.Item
				position="leading"
				key={idx}
				label={
					c_code === 'ANY'
						? 'Any'
						: COUNTRY_OPTIONS[c_code as keyof typeof COUNTRY_OPTIONS]['name']
				}
				value={c_code}
			/>
		));

	return (
		<Accordion
			title="Country"
			description={
				countryOfOrigin && (
					<View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
						<Chip
							compact
							mode="outlined"
							onPress={() => updateListFilter({ countryOfOrigin: undefined })}
						>
							{
								COUNTRY_OPTIONS[countryOfOrigin as keyof typeof COUNTRY_OPTIONS][
									'name'
								]
							}
						</Chip>
					</View>
				)
			}
		>
			<RadioButton.Group
				onValueChange={(c_code) =>
					updateListFilter({ countryOfOrigin: c_code === 'ANY' ? undefined : c_code })
				}
				value={countryOfOrigin ?? 'ANY'}
			>
				{renderCountryOptions()}
			</RadioButton.Group>
		</Accordion>
	);
};

export type ListFilterProps = {
	sheetRef: RefObject<TrueSheet>;
	selectedType: MediaType;
};

export const ListFilterSheet = ({ sheetRef, selectedType }: ListFilterProps) => {
	const { reset } = useListFilterStore();
	return (
		<BottomSheetParent
			sheetRef={sheetRef}
			sizes={['auto', 'large']}
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
						<Button onPress={() => reset(selectedType)}>Reset</Button>
					</View>
					<Divider />
				</>
			}
			scrollable
		>
			<ListFilterSort />
			<ListFilterFormats type={selectedType} />
			<ListFilterOrigin />
			<ListFilterGenre />
			<ListFilterTags />
		</BottomSheetParent>
	);
};
