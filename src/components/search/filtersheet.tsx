import React, { ReactNode, useEffect, useState } from 'react';
import {
	Button,
	Checkbox,
	CheckboxItemProps,
	Chip,
	Divider,
	IconButton,
	List,
	RadioButton,
	RadioButtonItemProps,
	Searchbar,
	Text,
} from 'react-native-paper';
import { DialogSelectDate } from './dropdown';
import { Pressable, View } from 'react-native';
import {
	CharacterSearchQueryVariables,
	ExternalLinkType,
	MediaExternalLink,
	MediaFormat,
	MediaSearchQueryVariables,
	MediaSeason,
	MediaSource,
	MediaStatus,
	MediaType,
	StaffSearchQueryVariables,
	UserSort,
} from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import {
	SearchSortType,
	SearchState,
	SearchType,
	useSearchStore,
} from '@/store/search/searchStore';
import { getDatetoFuzzyInt, getFuzzyInttoString } from '@/utils';
import { Accordion } from '../animations';
import { COUNTRY_OPTIONS, MEDIA_FORMAT_ALT, mediaStatusOptions } from '@/constants/anilist';
import {
	ANIME_FORMATS,
	AnimeSorts,
	AvailableStudioSorts,
	AvailableUserSorts,
	CharacterSorts,
	MANGA_FORMATS,
	MangaSorts,
	StaffSorts,
	StudioSorts,
	UserSorts,
} from '@/constants/mediaConsts';
import { updateMultiSelectFilters } from '@/utils/search/filtering';
import { RangeSlider, Slider } from '../slider';
import { MaterialSwitchListItem } from '../switch';
import { useCollectionStore } from '@/store/useCollectionStore';
import ActionSheet, {
	ActionSheetRef,
	FlatList,
	ScrollView,
	useSheetRef,
} from 'react-native-actions-sheet';
import { MediaSelector } from './mediaSelector';
import { getStreamingSiteEmoji } from '@/utils/emoji';
import { useShallow } from 'zustand/react/shallow';

type FilterSheetSectionProps = {
	title: string;
	children: ReactNode;
	description?: ReactNode;
	nestedLevel?: number;
	initialExpand?: boolean;
};
const FilterSheetSection = ({
	title,
	children,
	description,
	nestedLevel,
	initialExpand = false,
}: FilterSheetSectionProps) => {
	const { colors } = useAppTheme();
	return (
		// <List.Accordion title={title} description={description}>{children}</List.Accordion>
		// <AccordionTest title={title} isExpanded={false}>{children}</AccordionTest>
		<Accordion
			title={title}
			titleVariant="titleSmall"
			titleStyle={[{ color: colors.onSurface, fontWeight: '900' }]}
			description={description}
			initialExpand={initialExpand}
			left={
				nestedLevel && (
					<View
						style={{
							width: 22 * (nestedLevel + 0.5),
							height: 1,
							backgroundColor: colors.primary,
							marginLeft: 16,
						}}
					/>
				)
			}
			// <Icon source={'minus'} size={undefined} />
		>
			{children}
		</Accordion>
	);
};

const FilterCheckbox = (props: CheckboxItemProps) => {
	return <Checkbox.Item {...props} position="leading" />;
};

const FilterRadioButton = (props: RadioButtonItemProps) => {
	return <RadioButton.Item {...props} position="leading" />;
};

const FilterSortButton = ({
	title,
	isSelected,
	isAsc,
	onPress,
}: {
	title: string;
	isSelected: boolean;
	isAsc?: boolean;
	onPress: () => void;
}) => {
	const { colors } = useAppTheme();
	return (
		<List.Item
			title={title}
			titleStyle={{ textTransform: 'capitalize' }}
			onPress={onPress}
			left={(props) => (
				<List.Icon
					{...props}
					icon={isAsc ? 'arrow-up' : 'arrow-down'}
					color={isSelected ? colors.primary : 'transparent'}
				/>
			)}
		/>
		// <Pressable
		// 	onPress={onPress}
		// 	style={{
		// 		flexDirection: 'row',
		// 		alignItems: 'center',
		// 		paddingVertical: 8,
		// 		paddingHorizontal: 16,
		// 	}}
		// >
		// 	<List.Icon
		// 		icon={isAsc ? 'arrow-up' : 'arrow-down'}
		// 		color={isSelected ? colors.primary : 'transparent'}
		// 	/>
		// 	<Text
		// 		variant="bodyLarge"
		// 		style={{ textTransform: 'capitalize', paddingHorizontal: 16 }}
		// 	>
		// 		{title}
		// 	</Text>
		// </Pressable>
	);
};

const QuickActionParent = ({ children }: { children: ReactNode }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				flexWrap: 'wrap',
				gap: 6,
				paddingHorizontal: 10,
			}}
		>
			{children}
		</View>
	);
};

type MediaFiltersProps = {
	tempFilter: MediaSearchQueryVariables;
	tempSort: SearchSortType;
	mediaType: MediaType;
	setTempFilter: React.Dispatch<React.SetStateAction<MediaSearchQueryVariables>>;
	setTempSort: React.Dispatch<React.SetStateAction<SearchSortType>>;
};
const MediaFilters = ({
	mediaType,
	tempFilter,
	tempSort,
	setTempSort,
	setTempFilter,
}: MediaFiltersProps) => {
	const { colors } = useAppTheme();
	const isAnime = mediaType === MediaType.Anime;
	const isAuthed = useAuthStore(useShallow((state) => !!state.anilist.token));
	// const showNSFW = useSettingsStore(useShallow((state) => state.showNSFW));
	const { showNSFW, tagBlacklist } = useSettingsStore(
		useShallow((state) => ({ showNSFW: state.showNSFW, tagBlacklist: state.tagBlacklist })),
	);
	const { mediaFilter, mediaSort, isTagBlacklistEnabled, toggleTagBlacklist } = useSearchStore(
		useShallow((state) => ({
			mediaFilter: state.mediaFilter,
			mediaSort: state.mediaSort,
			isTagBlacklistEnabled: state.isTagBlacklistEnabled,
			toggleTagBlacklist: state.toggleTagBlacklist,
		})),
	);
	const { genreData, tagData, animeSites, mangaSites } = useCollectionStore(
		useShallow((state) => ({
			genreData: state.genres,
			tagData: state.tags,
			animeSites: state.animeLinks,
			mangaSites: state.mangaLinks,
		})),
	);

	const streamSites: { [key in string]: MediaExternalLink[] } = {};
	const sortedSites = (isAnime ? animeSites : mangaSites)
		.sort((a, b) => {
			if (a.site < b.site) {
				return -1;
			}
			if (a.site > b.site) {
				return 1;
			}
			return 0;
		})
		.forEach((site) =>
			streamSites[site.language]
				? streamSites[site.language].push(site)
				: (streamSites[site.language] = [site]),
		);

	const [tagSearch, setTagSearch] = useState('');

	const updateTempFilter = (props: MediaSearchQueryVariables) =>
		setTempFilter((prev) => ({ ...prev, ...props }));

	const updateTempMultiSelect = (
		newVal: string,
		in_key: keyof MediaSearchQueryVariables,
		not_in_key?: keyof MediaSearchQueryVariables | undefined,
		enableBlankArray?: boolean,
	) => {
		const { in_values, not_in_values } = updateMultiSelectFilters(
			newVal,
			tempFilter[in_key] ?? (enableBlankArray ? [] : undefined),
			tempFilter[not_in_key] ?? (enableBlankArray ? [] : undefined),
		);
		setTempFilter((prev) => ({ ...prev, [in_key]: in_values, [not_in_key]: not_in_values }));
	};

	const renderCountryOptions = () =>
		Object.keys(COUNTRY_OPTIONS).map((c_code, idx) => (
			<FilterRadioButton
				key={idx}
				label={c_code === 'ANY' ? 'Any' : COUNTRY_OPTIONS[c_code]['name']}
				value={c_code}
			/>
		));

	// const renderSourceOptions = () =>
	// 	Object.keys(MediaSource).map((sourceOption, idx) => (
	// 		<FilterCheckbox
	// 			key={idx}
	// 			label={MediaSource[sourceOption].replaceAll('_', ' ')}
	// 			labelStyle={{ textTransform: 'capitalize' }}
	// 			onPress={() => updateTempMultiSelect(sourceOption, 'source_in')}
	// 			status={
	// 				(tempFilter.source_in as MediaSource[])?.includes(sourceOption as MediaSource)
	// 					? 'checked'
	// 					: 'unchecked'
	// 			}
	// 		/>
	// 	));

	useEffect(() => {
		setTempSort(mediaSort);
		setTempFilter(mediaFilter);
	}, [mediaSort, mediaFilter]);

	return (
		<>
			<MaterialSwitchListItem
				title={`Tag Blacklist`}
				titleStyle={{ textTransform: 'capitalize' }}
				selected={!!isTagBlacklistEnabled === true}
				onPress={toggleTagBlacklist}
				disabled={tagBlacklist?.length < 1}
				fluid
			/>
			<FilterSheetSection title="Sort">
				{(isAnime ? AnimeSorts : MangaSorts).map((sortType, idx) => (
					<FilterSortButton
						key={idx}
						title={sortType.replaceAll('_', ' ')}
						isSelected={tempSort.value === sortType}
						isAsc={tempSort.asc}
						onPress={() =>
							setTempSort({
								value: sortType,
								asc: tempSort.value === sortType ? !tempSort.asc : false,
							})
						}
					/>
				))}
			</FilterSheetSection>
			{/* <SortDropdown sort={tempSort} onUpdate={(sort) => updateTempSort(sort)} /> */}
			{isAuthed && (
				<FilterSheetSection
					title="Your List"
					description={
						(tempFilter.onList === true || tempFilter.onList === false) && (
							<QuickActionParent>
								<Chip
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() => updateTempFilter({ onList: undefined })}
								>
									{tempFilter.onList ? 'Only List' : 'Exclude List'}
								</Chip>
							</QuickActionParent>
						)
					}
				>
					<MaterialSwitchListItem
						title={`Only Show My ${mediaType}`}
						titleStyle={{ textTransform: 'capitalize' }}
						selected={!!tempFilter.onList === true}
						onPress={() =>
							setTempFilter((prev) => ({
								...prev,
								onList: prev.onList ? undefined : true,
							}))
						}
						fluid
						disabled={tempFilter.onList === false}
					/>
					<MaterialSwitchListItem
						title={`Hide My ${mediaType}`}
						titleStyle={{ textTransform: 'capitalize' }}
						selected={tempFilter.onList === false && tempFilter.onList !== undefined}
						onPress={() =>
							setTempFilter((prev) => ({
								...prev,
								onList: prev.onList === false ? undefined : false,
							}))
						}
						fluid
						disabled={tempFilter.onList === true}
					/>
				</FilterSheetSection>
			)}
			<FilterSheetSection
				title="Meta"
				description={
					(tempFilter.isAdult ||
						tempFilter.isAdult === false ||
						tempFilter.isLicensed ||
						tempFilter.isLicensed === false ||
						tempFilter.episodes_greater ||
						tempFilter.episodes_lesser ||
						tempFilter.duration_greater ||
						tempFilter.duration_lesser ||
						tempFilter.volumes_greater ||
						tempFilter.volumes_lesser) && (
						<QuickActionParent>
							{(tempFilter.isAdult || tempFilter.isAdult === false) && (
								<Chip
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() => updateTempFilter({ isAdult: undefined })}
								>
									{tempFilter.isAdult ? 'Adult Content' : 'No Adult Content'}
								</Chip>
							)}
							{(tempFilter.isLicensed || tempFilter.isLicensed === false) && (
								<Chip
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() => updateTempFilter({ isLicensed: undefined })}
								>
									{tempFilter.isLicensed ? 'Licensed' : 'Not Licensed'}
								</Chip>
							)}
							{(((tempFilter.episodes_greater || tempFilter.episodes_lesser) &&
								isAnime) ||
								tempFilter.chapters_greater ||
								tempFilter.chapters_lesser) && (
								<Chip
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() =>
										isAnime
											? updateTempFilter({
													episodes_greater: undefined,
													episodes_lesser: undefined,
												})
											: updateTempFilter({
													chapters_greater: undefined,
													chapters_lesser: undefined,
												})
									}
								>
									{`${(tempFilter.episodes_greater || tempFilter.chapters_greater) ?? 0} - ${tempFilter.episodes_lesser ?? tempFilter.chapters_lesser ?? '150+'} ${isAnime ? 'Episodes' : 'Chapters'} `}
								</Chip>
							)}
							{(tempFilter.duration_greater || tempFilter.duration_lesser) && (
								<Chip
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() =>
										updateTempFilter({
											duration_greater: undefined,
											duration_lesser: undefined,
										})
									}
								>
									{`${tempFilter.duration_greater ?? 0} - ${tempFilter.duration_lesser ? tempFilter.duration_lesser + 'm' : '180m+'}`}
								</Chip>
							)}
							{(tempFilter.volumes_greater || tempFilter.volumes_lesser) && (
								<Chip
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() =>
										updateTempFilter({
											volumes_greater: undefined,
											volumes_lesser: undefined,
										})
									}
								>
									{`${tempFilter.volumes_greater ?? 0} - ${tempFilter.volumes_lesser ? tempFilter.volumes_lesser + ' Volumes' : '150+ Volumes'}`}
								</Chip>
							)}
						</QuickActionParent>
					)
				}
			>
				<FilterCheckbox
					label="Adult Content"
					status={
						tempFilter.isAdult === true
							? 'checked'
							: tempFilter.isAdult === false
								? 'indeterminate'
								: 'unchecked'
					}
					onPress={() =>
						setTempFilter((prev) => ({
							...prev,
							isAdult:
								prev.isAdult === undefined
									? true
									: prev.isAdult
										? false
										: undefined,
						}))
					}
					position="leading"
					disabled={!showNSFW}
				/>
				<FilterCheckbox
					label="Doujin"
					status={
						tempFilter.isLicensed === false
							? 'checked'
							: tempFilter.isLicensed === true
								? 'indeterminate'
								: 'unchecked'
					}
					onPress={() =>
						setTempFilter((prev) => ({
							...prev,
							isLicensed:
								prev.isLicensed === undefined
									? false
									: prev.isLicensed === false
										? true
										: undefined,
						}))
					}
				/>
				<RangeSlider
					title={isAnime ? 'Episodes' : 'Chapters'}
					initialValues={
						isAnime
							? [tempFilter.episodes_greater ?? 0, tempFilter.episodes_lesser ?? 150]
							: [tempFilter.chapters_greater ?? 0, tempFilter.chapters_lesser ?? 500]
					}
					minValue={0}
					maxValue={isAnime ? 150 : 500}
					onValueUpdate={(vals) =>
						updateTempFilter(
							isAnime
								? {
										episodes_greater: vals[0] === 0 ? undefined : vals[0],
										episodes_lesser: vals[1] === 150 ? undefined : vals[1],
									}
								: {
										chapters_greater: vals[0] === 0 ? undefined : vals[0],
										chapters_lesser: vals[1] === 0 ? undefined : vals[1],
									},
						)
					}
				/>
				<RangeSlider
					title={isAnime ? 'Duration' : 'Volumes'}
					initialValues={
						isAnime
							? [tempFilter.duration_greater ?? 0, tempFilter.duration_lesser ?? 180]
							: [tempFilter.volumes_greater ?? 0, tempFilter.volumes_lesser ?? 50]
					}
					minValue={0}
					maxValue={isAnime ? 180 : 50}
					onValueUpdate={(vals) =>
						updateTempFilter(
							isAnime
								? {
										duration_greater: vals[0] === 0 ? undefined : vals[0],
										duration_lesser: vals[1] === 180 ? undefined : vals[1],
									}
								: {
										volumes_greater: vals[0] === 0 ? undefined : vals[0],
										volumes_lesser: vals[1] === 50 ? undefined : vals[1],
									},
						)
					}
				/>
			</FilterSheetSection>
			<FilterSheetSection
				title={`Genre${tempFilter.genre_in?.length > 0 || tempFilter.genre_not_in?.length > 0 ? ` (${(tempFilter.genre_in?.length ?? 0) + (tempFilter.genre_not_in?.length ?? 0)})` : ''}`}
				description={
					(tempFilter.genre_in || tempFilter.genre_not_in) && (
						<QuickActionParent>
							{(tempFilter.genre_in as string[])?.map((genre, idx) => (
								<Chip
									key={idx}
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() =>
										updateTempMultiSelect(genre, 'genre_in', 'genre_not_in')
									}
								>
									{genre.replaceAll('_', ' ')}
								</Chip>
							))}
							{(tempFilter.genre_not_in as string[])?.map((genre, idx) => (
								<Chip
									key={idx}
									compact
									mode="outlined"
									style={{ borderColor: colors.error }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() =>
										updateTempMultiSelect(genre, 'genre_in', 'genre_not_in')
									}
								>
									{genre.replaceAll('_', ' ')}
								</Chip>
							))}
						</QuickActionParent>
					)
				}
			>
				{genreData.map((genre, idx) => (
					<FilterCheckbox
						key={idx}
						label={genre}
						labelStyle={{ textTransform: 'capitalize' }}
						status={
							tempFilter.genre_in?.includes(genre)
								? 'checked'
								: tempFilter.genre_not_in?.includes(genre)
									? 'indeterminate'
									: 'unchecked'
						}
						onPress={() => updateTempMultiSelect(genre, 'genre_in', 'genre_not_in')}
					/>
				))}
			</FilterSheetSection>
			<FilterSheetSection
				title={`Status${tempFilter.status_in?.length > 0 || tempFilter.status_not_in?.length > 0 ? ` (${(tempFilter.status_in?.length ?? 0) + (tempFilter.status_not_in?.length ?? 0)})` : ''}`}
				description={
					(tempFilter.status_in || tempFilter.status_not_in) && (
						<QuickActionParent>
							{(tempFilter.status_in as MediaStatus[])?.map((status, idx) => (
								<Chip
									key={idx}
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() =>
										updateTempMultiSelect(status, 'status_in', 'status_not_in')
									}
								>
									{status.replaceAll('_', ' ')}
								</Chip>
							))}
							{(tempFilter.status_not_in as MediaStatus[])?.map((status, idx) => (
								<Chip
									key={idx}
									compact
									mode="outlined"
									style={{ borderColor: colors.error }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() =>
										updateTempMultiSelect(status, 'status_in', 'status_not_in')
									}
								>
									{status.replaceAll('_', ' ')}
								</Chip>
							))}
						</QuickActionParent>
					)
				}
			>
				{mediaStatusOptions.map((status, idx) => (
					<FilterCheckbox
						key={idx}
						label={status.replaceAll('_', ' ')}
						labelStyle={{ textTransform: 'capitalize' }}
						status={
							tempFilter.status_in?.includes(status)
								? 'checked'
								: tempFilter.status_not_in?.includes(status)
									? 'indeterminate'
									: 'unchecked'
						}
						onPress={() =>
							updateTempMultiSelect(status, 'status_in', 'status_not_in', true)
						}
					/>
				))}
			</FilterSheetSection>
			<FilterSheetSection
				title={'Format'}
				description={
					(tempFilter.format_in || tempFilter.format_not_in) && (
						<QuickActionParent>
							{(tempFilter.format_in as MediaFormat[])?.map((format, idx) => (
								<Chip
									key={idx}
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									onPress={() =>
										updateTempMultiSelect(
											format,
											'format_in',
											'format_not_in',
											true,
										)
									}
								>
									{MEDIA_FORMAT_ALT[format]}
								</Chip>
							))}
							{(tempFilter.format_not_in as MediaFormat[])?.map((format, idx) => (
								<Chip
									key={idx}
									compact
									mode="outlined"
									style={{ borderColor: colors.error }}
									onPress={() =>
										updateTempMultiSelect(
											format,
											'format_in',
											'format_not_in',
											true,
										)
									}
								>
									{MEDIA_FORMAT_ALT[format]}
								</Chip>
							))}
						</QuickActionParent>
					)
				}
			>
				{(mediaType === MediaType.Anime ? ANIME_FORMATS : MANGA_FORMATS).map(
					(format, idx) => (
						<FilterCheckbox
							key={idx}
							label={MEDIA_FORMAT_ALT[format]}
							onPress={() =>
								updateTempMultiSelect(format, 'format_in', 'format_not_in', true)
							}
							status={
								(tempFilter.format_in as MediaFormat[])?.includes(format)
									? 'checked'
									: (tempFilter.format_not_in as MediaFormat[])?.includes(format)
										? 'indeterminate'
										: 'unchecked'
							}
						/>
					),
				)}
			</FilterSheetSection>
			<FilterSheetSection
				title="Source"
				description={
					tempFilter.source_in && (
						<QuickActionParent>
							{(tempFilter.source_in as string[])?.map((source, idx) => (
								<Chip
									key={idx}
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() => updateTempMultiSelect(source, 'source_in')}
								>
									{source.replaceAll('_', ' ')}
								</Chip>
							))}
						</QuickActionParent>
					)
				}
			>
				{Object.keys(MediaSource).map((source, idx) => (
					<FilterCheckbox
						key={idx}
						label={MediaSource[source].replaceAll('_', ' ')}
						labelStyle={{ textTransform: 'capitalize' }}
						onPress={() => updateTempMultiSelect(source, 'source_in')}
						status={
							(tempFilter.source_in as MediaSource[])?.includes(source as MediaSource)
								? 'checked'
								: 'unchecked'
						}
					/>
				))}
			</FilterSheetSection>
			<FilterSheetSection
				title={isAnime ? 'Streaming Platform' : 'Reading Platform'}
				description={
					(tempFilter.licensedBy_in as string[])?.length > 0 && (
						<QuickActionParent>
							{(tempFilter.licensedBy_in as string[])?.map((tempSite, idx) => (
								<Chip
									key={idx}
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() =>
										updateTempMultiSelect(
											tempSite,
											'licensedBy_in',
											undefined,
											false,
										)
									}
								>
									{tempSite}
								</Chip>
							))}
						</QuickActionParent>
					)
				}
			>
				{Object.keys(streamSites).map((lang, idx) => (
					<FilterSheetSection
						key={idx}
						title={
							getStreamingSiteEmoji(lang === 'null' ? 'English' : lang) +
							' ' +
							(lang === 'null' ? 'English' : lang)
						}
						nestedLevel={1}
					>
						{
							<FlatList
								data={streamSites[lang]}
								scrollEnabled={false}
								nestedScrollEnabled
								keyExtractor={(item, idx) => idx.toString()}
								renderItem={({ item: site }) => (
									<FilterCheckbox
										key={idx}
										label={
											site.site +
											(site.language
												? `${getStreamingSiteEmoji(site.language)}`
												: '')
										}
										status={
											((tempFilter.licensedBy_in as string[]) ?? []).includes(
												site.site,
											)
												? 'checked'
												: 'unchecked'
										}
										onPress={() =>
											updateTempMultiSelect(
												site.site,
												'licensedBy_in',
												undefined,
												false,
											)
										}
									/>
								)}
							/>
						}
					</FilterSheetSection>
				))}
			</FilterSheetSection>
			<FilterSheetSection
				title="Country"
				description={
					tempFilter.countryOfOrigin && (
						<View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
							<Chip
								compact
								mode="outlined"
								onPress={() => updateTempFilter({ countryOfOrigin: undefined })}
							>
								{COUNTRY_OPTIONS[tempFilter.countryOfOrigin]['name']}
							</Chip>
						</View>
					)
				}
			>
				<RadioButton.Group
					onValueChange={(c_code) =>
						updateTempFilter({ countryOfOrigin: c_code === 'ANY' ? undefined : c_code })
					}
					value={tempFilter.countryOfOrigin ?? 'ANY'}
				>
					{renderCountryOptions()}
				</RadioButton.Group>
			</FilterSheetSection>
			{isAnime && (
				<FilterSheetSection
					title="Season"
					description={
						(tempFilter.season || tempFilter.seasonYear) && (
							<QuickActionParent>
								{tempFilter.season && (
									<Chip
										mode="outlined"
										compact
										style={{ borderColor: colors.primary }}
										textStyle={{ textTransform: 'capitalize' }}
										onPress={() => updateTempFilter({ season: undefined })}
									>
										{tempFilter.season}
									</Chip>
								)}
								{tempFilter.seasonYear && (
									<Chip
										compact
										mode="outlined"
										style={{ borderColor: colors.primary }}
										textStyle={{ textTransform: 'capitalize' }}
										onPress={() => updateTempFilter({ seasonYear: undefined })}
									>
										{tempFilter.seasonYear}
									</Chip>
								)}
							</QuickActionParent>
						)
					}
				>
					<Slider
						title="Year"
						initialValue={tempFilter.seasonYear ?? 'ANY'}
						maxValue={new Date().getFullYear() + 1}
						minValue={1970}
						onValueUpdate={(val) => updateTempFilter({ seasonYear: val })}
						allowTextInput
					/>
					<RadioButton.Group
						value={tempFilter.season ?? 'ANY'}
						onValueChange={(val: MediaSeason | 'ANY') =>
							updateTempFilter({ season: val === 'ANY' ? undefined : val })
						}
					>
						<FilterRadioButton label={'Any'} value={'ANY'} />
						<FilterRadioButton label={'🌱 Spring '} value={MediaSeason.Spring} />
						<FilterRadioButton label={'🏖️ Summer'} value={MediaSeason.Summer} />
						<FilterRadioButton label={'🍂 Fall'} value={MediaSeason.Fall} />
						<FilterRadioButton label={'❄️ Winter'} value={MediaSeason.Winter} />
					</RadioButton.Group>
					{/* <SeasonDropdown
						season={tempFilter.season}
						onUpdate={(season) => updateTempFilter({ season })}
					/> */}
				</FilterSheetSection>
			)}
			<FilterSheetSection
				title="Dates"
				description={
					(tempFilter.startDate_greater || tempFilter.endDate_lesser) && (
						<QuickActionParent>
							{tempFilter.startDate_greater && (
								<Chip
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() =>
										updateTempFilter({ startDate_greater: undefined })
									}
								>
									Start: {getFuzzyInttoString(tempFilter.startDate_greater)}
								</Chip>
							)}
							{tempFilter.endDate_lesser && (
								<Chip
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() => updateTempFilter({ endDate_lesser: undefined })}
								>
									End: {getFuzzyInttoString(tempFilter.endDate_lesser)}
								</Chip>
							)}
						</QuickActionParent>
					)
				}
			>
				<DialogSelectDate
					label="Start Date ↓"
					value={tempFilter.startDate_greater}
					maxDate={tempFilter.endDate_lesser}
					onSelect={(date) =>
						updateTempFilter({
							startDate_greater: date ? getDatetoFuzzyInt(date) : undefined,
						})
					}
				/>
				<DialogSelectDate
					label="End Date ↑"
					value={tempFilter.endDate_lesser}
					minDate={tempFilter.startDate_greater}
					onSelect={(date) =>
						updateTempFilter({
							endDate_lesser: date ? getDatetoFuzzyInt(date) : undefined,
						})
					}
				/>
			</FilterSheetSection>
			<FilterSheetSection
				title={'Scores'}
				description={
					(tempFilter.averageScore_greater || tempFilter.averageScore_lesser) && (
						<QuickActionParent>
							<Chip
								mode="outlined"
								compact
								style={{ borderColor: colors.primary }}
								textStyle={{ textTransform: 'capitalize' }}
								onPress={() =>
									updateTempFilter({
										averageScore_greater: undefined,
										averageScore_lesser: undefined,
									})
								}
							>
								{`${tempFilter.averageScore_greater ?? 0} - ${tempFilter.averageScore_lesser ?? '100'}%`}
							</Chip>
						</QuickActionParent>
					)
				}
			>
				<RangeSlider
					title={'Average Score'}
					initialValues={[
						tempFilter.averageScore_greater ?? 0,
						tempFilter.averageScore_lesser ?? 100,
					]}
					steps={5}
					minValue={0}
					maxValue={100}
					onValueUpdate={(vals) =>
						updateTempFilter({
							averageScore_greater: vals[0] === 0 ? undefined : vals[0],
							averageScore_lesser: vals[1] === 100 ? undefined : vals[1],
						})
					}
				/>
				{/* <Slider
					title="Minimum Score"
					initialValue={tempFilter.averageScore_greater ?? 0}
					// initialScore={tempFilter.averageScore_greater}
					maxValue={tempFilter.averageScore_lesser ?? 100}
					minValue={0}
					onValueUpdate={(score) => updateTempFilter({ averageScore_greater: score })}
					allowTextInput
				/>
				<Slider
					title="Maximum Score"
					maxValue={100}
					minValue={tempFilter.averageScore_greater}
					initialValue={tempFilter.averageScore_lesser ?? 100}
					onValueUpdate={(score) => updateTempFilter({ averageScore_lesser: score })}
					allowTextInput
				/> */}
			</FilterSheetSection>
			<FilterSheetSection
				title={'Tags'}
				description={
					(tempFilter.tag_in || tempFilter.tag_not_in) && (
						<QuickActionParent>
							{(tempFilter.tag_in as string[])?.map((tempTag, idx) => (
								<Chip
									key={idx}
									mode="outlined"
									compact
									style={{ borderColor: colors.primary }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() =>
										updateTempMultiSelect(tempTag, 'tag_in', 'tag_not_in', true)
									}
								>
									{tempTag}
								</Chip>
							))}
							{(tempFilter.tag_not_in as string[])?.map((tempTag, idx) => (
								<Chip
									key={idx}
									mode="outlined"
									compact
									style={{ borderColor: colors.error }}
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() =>
										updateTempMultiSelect(tempTag, 'tag_in', 'tag_not_in', true)
									}
								>
									{tempTag}
								</Chip>
							))}
						</QuickActionParent>
					)
				}
			>
				<Searchbar
					value={tagSearch}
					onChangeText={(txt) => setTagSearch(txt)}
					style={{ marginHorizontal: 10, marginVertical: 6 }}
					mode="view"
					blurOnSubmit
				/>
				{tagData
					?.filter((val) =>
						val.subCategories &&
						val.subCategories.some((subCat) =>
							subCat.tags.some((subCatTag) =>
								subCatTag.name.toLowerCase().includes(tagSearch.toLowerCase()),
							),
						)
							? true
							: val.tags?.some((data) =>
									data.name.toLowerCase().includes(tagSearch.toLowerCase()),
								),
					)
					.map((tagSection, idx) =>
						(!showNSFW || tempFilter.isAdult === false) &&
						tagSection.title === 'Sexual Content' ? null : (
							<FilterSheetSection
								key={idx}
								title={tagSection.title}
								nestedLevel={1}
								initialExpand={tagSearch.length > 0 && idx === 0}
							>
								{tagSection.tags &&
									tagSection.tags
										?.filter((val) =>
											val.name
												.toLowerCase()
												.includes(tagSearch.toLowerCase()),
										)
										.map((tag, idx) =>
											tag.name === 'Sexual Content' ? null : (
												<FilterCheckbox
													key={idx}
													label={tag.name}
													status={
														tempFilter?.tag_in?.includes(tag.name)
															? 'checked'
															: tempFilter?.tag_not_in?.includes(
																		tag.name,
																  )
																? 'indeterminate'
																: 'unchecked'
													}
													onPress={() =>
														updateTempMultiSelect(
															tag.name,
															'tag_in',
															'tag_not_in',
															true,
														)
													}
												/>
											),
										)}
								{tagSection.subCategories &&
									tagSection.subCategories
										?.filter((val) =>
											val.tags?.some((data) =>
												data.name
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
															val.name
																.toLowerCase()
																.includes(tagSearch.toLowerCase()),
														)
														.map((tag, idx) => (
															<FilterCheckbox
																key={idx}
																label={tag.name}
																status={
																	tempFilter?.tag_in?.includes(
																		tag.name,
																	)
																		? 'checked'
																		: tempFilter?.tag_not_in?.includes(
																					tag.name,
																			  )
																			? 'indeterminate'
																			: 'unchecked'
																}
																onPress={() =>
																	updateTempMultiSelect(
																		tag.name,
																		'tag_in',
																		'tag_not_in',
																		true,
																	)
																}
															/>
														))}
											</FilterSheetSection>
										))}
							</FilterSheetSection>
						),
					)}
			</FilterSheetSection>
			{/* <TagSelection openTagDialog={() => setTagDialogVis(true)} /> */}
		</>
	);
};

type CharacterStaffFilterProps = {
	type: SearchType;
	tempCharFilter: CharacterSearchQueryVariables;
	tempStaffFilter: StaffSearchQueryVariables;
	tempCharSort: SearchState['characterSort'];
	tempStaffSort: SearchState['staffSort'];
	setTempCharFilter: React.Dispatch<React.SetStateAction<CharacterSearchQueryVariables>>;
	setTempStaffFilter: React.Dispatch<React.SetStateAction<StaffSearchQueryVariables>>;
	setTempCharSort: React.Dispatch<React.SetStateAction<SearchState['characterSort']>>;
	setTempStaffSort: React.Dispatch<React.SetStateAction<SearchState['staffSort']>>;
};
const CharacterStaffFilters = ({
	type,
	tempCharFilter,
	tempStaffFilter,
	tempCharSort,
	tempStaffSort,
	setTempStaffSort,
	setTempCharSort,
	setTempCharFilter,
	setTempStaffFilter,
}: CharacterStaffFilterProps) => {
	const { characterFilter, characterSort, staffFilter, staffSort } = useSearchStore(
		useShallow((state) => ({
			characterFilter: state.characterFilter,
			characterSort: state.characterSort,
			staffFilter: state.staffFilter,
			staffSort: state.staffSort,
		})),
	);

	const updateTempSort = (sortType: any) => {
		if (type === 'CHARACTER') {
			setTempCharSort({
				value: sortType,
				asc: tempCharSort.value === sortType ? !tempCharSort.asc : false,
			});
		} else {
			setTempStaffSort({
				value: sortType,
				asc: tempStaffSort.value === sortType ? !tempStaffSort.asc : false,
			});
		}
	};

	useEffect(() => {
		setTempCharSort(characterSort);
		setTempCharFilter(characterFilter);
	}, [characterFilter, characterSort]);

	useEffect(() => {
		setTempStaffSort(staffSort);
		setTempStaffFilter(staffFilter);
	}, [staffFilter, staffSort]);

	return (
		<>
			<FilterSheetSection title="Sort">
				{(type === 'CHARACTER' ? CharacterSorts : StaffSorts).map((sortType, idx) => (
					<FilterSortButton
						key={idx}
						title={sortType.replaceAll('_', ' ')}
						isSelected={
							(type === 'CHARACTER' ? tempCharSort : tempStaffSort).value === sortType
						}
						isAsc={(type === 'CHARACTER' ? tempCharSort : tempStaffSort).asc}
						onPress={() => updateTempSort(sortType)}
					/>
				))}
			</FilterSheetSection>
			<MaterialSwitchListItem
				title="Show Birthday"
				selected={
					type === 'CHARACTER'
						? tempCharFilter.isBirthday
							? true
							: false
						: tempStaffFilter.isBirthday
							? true
							: false
				}
				onPress={() =>
					type === 'CHARACTER'
						? setTempCharFilter((prev) => ({
								isBirthday: prev.isBirthday === true ? undefined : true,
							}))
						: setTempStaffFilter((prev) => ({
								isBirthday: prev.isBirthday === true ? undefined : true,
							}))
				}
			/>
		</>
	);
};

type UserFilterProps = {
	tempUserFilter: SearchState['userFilter'];
	tempUserSort: SearchState['userSort'];
	setTempUserFilter: React.Dispatch<React.SetStateAction<SearchState['userFilter']>>;
	setTempUserSort: React.Dispatch<React.SetStateAction<SearchState['userSort']>>;
};
const UserFilters = ({
	tempUserFilter,
	tempUserSort,
	setTempUserFilter,
	setTempUserSort,
}: UserFilterProps) => {
	const { userFilter, userSort } = useSearchStore(
		useShallow((state) => ({
			userFilter: state.userFilter,
			userSort: state.userSort,
		})),
	);

	useEffect(() => {
		setTempUserSort(userSort);
		setTempUserFilter(userFilter);
	}, [userFilter, userSort]);

	return (
		<>
			<FilterSheetSection title="Sort">
				{UserSorts.map((sortType, idx) => (
					<FilterSortButton
						key={idx}
						title={sortType.replaceAll('_', ' ')}
						isSelected={tempUserSort.value === sortType}
						isAsc={tempUserSort.asc}
						onPress={() =>
							setTempUserSort({
								value: sortType as AvailableUserSorts,
								asc: tempUserSort.value === sortType ? !tempUserSort.asc : false,
							})
						}
					/>
				))}
			</FilterSheetSection>
			<MaterialSwitchListItem
				title="Moderator"
				selected={tempUserFilter.isModerator ? true : false}
				onPress={() =>
					setTempUserFilter({
						isModerator: tempUserFilter.isModerator === undefined ? true : undefined,
					})
				}
			/>
		</>
	);
};

type StudioFilterProps = {
	tempStudioSort: SearchState['studioSort'];
	setTempStudioSort: React.Dispatch<React.SetStateAction<SearchState['studioSort']>>;
};
const StudioFilters = ({ tempStudioSort, setTempStudioSort }: StudioFilterProps) => {
	const { studioFilter, studioSort } = useSearchStore(
		useShallow((state) => ({
			studioFilter: state.studioFilter,
			studioSort: state.studioSort,
		})),
	);

	useEffect(() => {
		setTempStudioSort(studioSort);
	}, [studioSort]);

	return (
		<>
			<FilterSheetSection title="Sort" initialExpand>
				{StudioSorts.map((sortType, idx) => (
					<FilterSortButton
						key={idx}
						title={sortType.replaceAll('_', ' ')}
						isSelected={tempStudioSort.value === sortType}
						isAsc={tempStudioSort.asc}
						onPress={() =>
							setTempStudioSort({
								value: sortType as AvailableStudioSorts,
								asc:
									tempStudioSort.value === sortType ? !tempStudioSort.asc : false,
							})
						}
					/>
				))}
			</FilterSheetSection>
		</>
	);
};

export const FilterSheetTest = ({ sheetRef }: { sheetRef: React.Ref<ActionSheetRef> }) => {
	const { colors } = useAppTheme();
	const searchType = useSearchStore(useShallow((state) => state.searchType));
	const ref = useSheetRef();

	// Anime / Manga
	const { mediaFilter, mediaSort } = useSearchStore(
		useShallow((state) => ({
			searchType: state.searchType,
			mediaFilter: state.mediaFilter,
			mediaSort: state.mediaSort,
		})),
	);
	const resetFilter = useSearchStore(useShallow((state) => state.resetFilter));
	const updateMediaFilter = useSearchStore(useShallow((state) => state.updateMediaFilter));
	const [tempMediaFilter, setTempMediaFilter] = useState(mediaFilter);
	const [tempMediaSort, setTempMediaSort] = useState(mediaSort);

	// Character / Staff
	const { characterFilter, characterSort } = useSearchStore(
		useShallow((state) => ({
			characterFilter: state.characterFilter,
			characterSort: state.characterSort,
		})),
	);
	const { staffFilter, staffSort } = useSearchStore(
		useShallow((state) => ({
			staffFilter: state.staffFilter,
			staffSort: state.staffSort,
		})),
	);
	const updateCharStaffFilter = useSearchStore(
		useShallow((state) => state.updateCharStaffFilter),
	);
	const [tempCharFilter, setTempCharFilter] = useState(characterFilter);
	const [tempStaffFilter, setTempStaffFilter] = useState(staffFilter);
	const [tempCharSort, setTempCharSort] = useState(characterSort);
	const [tempStaffSort, setTempStaffSort] = useState(staffSort);

	// Studio
	const { studioFilter, studioSort } = useSearchStore(
		useShallow((state) => ({
			studioFilter: state.studioFilter,
			studioSort: state.studioSort,
		})),
	);
	const updateStudioFilter = useSearchStore((state) => state.updateStudioFilter);
	// const [tempStudioFilter, setTempStudioFilter] = useState(studioFilter);
	const [tempStudioSort, setTempStudioSort] = useState(studioSort);

	// User
	const { userFilter, userSort } = useSearchStore(
		useShallow((state) => ({
			userFilter: state.userFilter,
			userSort: state.userSort,
		})),
	);
	const updateUserFilter = useSearchStore(useShallow((state) => state.updateUserFilter));
	const [tempUserFilter, setTempUserFilter] = useState(userFilter);
	const [tempUserSort, setTempUserSort] = useState(userSort);

	const onFilterApply = () => {
		switch (searchType) {
			case MediaType.Anime:
			case MediaType.Manga:
				updateMediaFilter(tempMediaFilter, tempMediaSort);

			case 'CHARACTER':
			case 'STAFF':
				updateCharStaffFilter(
					searchType,
					searchType === 'CHARACTER' ? tempCharFilter : tempStaffFilter,
					searchType === 'CHARACTER' ? tempCharSort : tempStaffSort,
				);
			case 'STUDIO':
				updateStudioFilter({}, tempStudioSort);
			case 'USER':
				updateUserFilter(tempUserFilter, tempUserSort);
		}
		ref.current?.hide();
	};

	const onReset = () => {
		resetFilter(searchType);
		switch (searchType) {
			case MediaType.Anime:
			case MediaType.Manga:
				setTempMediaSort(mediaSort);
				setTempMediaFilter(mediaFilter);
			case 'CHARACTER':
				setTempCharSort(characterSort);
				setTempCharFilter(characterFilter);
			case 'STAFF':
				setTempStaffSort(staffSort);
				setTempStaffFilter(staffFilter);
			case 'STUDIO':
				setTempStudioSort(studioSort);
			// setTempStudioFilter(studioFilter);
			case 'USER':
				setTempUserSort(userSort);
				setTempUserFilter(userFilter);
		}
		// ref.current?.hide();
	};

	return (
		<ActionSheet
			ref={sheetRef}
			gestureEnabled
			backgroundInteractionEnabled={false}
			CustomHeaderComponent={
				searchType !== 'ALL' && (
					<View style={{ width: '100%' }}>
						<View
							style={{
								padding: 8,
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<Button onPress={onReset}>Reset</Button>
							<Button mode="contained" onPress={onFilterApply}>
								Filter
							</Button>
						</View>
						<Divider />
					</View>
				)
			}
			indicatorStyle={
				searchType === 'ALL' && {
					backgroundColor: colors.onSurfaceVariant,
					marginVertical: 22,
					width: 32,
					height: 4,
				}
			}
			// keyboardHandlerEnabled={false}
			containerStyle={{
				backgroundColor: colors.elevation.level1,
				zIndex: 999,
				overflow: 'hidden',
			}}
		>
			{/* Keyboard causes sheet to reopen; ruining UX. This temp fix isn't great but better than without imo. */}
			{/* <KeyboardAvoidingView behavior="padding"  keyboardVerticalOffset={100}> */}
			<ScrollView
				keyboardShouldPersistTaps="handled"
				automaticallyAdjustKeyboardInsets
				contentContainerStyle={{ paddingBottom: 12, overflow: 'hidden' }}
			>
				<MediaSelector />
				{(searchType === MediaType.Anime || searchType === MediaType.Manga) && (
					<MediaFilters
						mediaType={searchType}
						tempFilter={tempMediaFilter}
						tempSort={tempMediaSort}
						setTempSort={setTempMediaSort}
						setTempFilter={setTempMediaFilter}
					/>
				)}
				{(searchType === 'CHARACTER' || searchType === 'STAFF') && (
					<CharacterStaffFilters
						type={searchType}
						tempCharFilter={tempCharFilter}
						setTempCharFilter={setTempCharFilter}
						tempStaffFilter={tempStaffFilter}
						setTempStaffFilter={setTempStaffFilter}
						tempCharSort={tempCharSort}
						tempStaffSort={tempStaffSort}
						setTempCharSort={setTempCharSort}
						setTempStaffSort={setTempStaffSort}
					/>
				)}
				{searchType === 'STUDIO' && (
					<StudioFilters
						tempStudioSort={tempStudioSort}
						setTempStudioSort={setTempStudioSort}
					/>
				)}
				{searchType === 'USER' && (
					<UserFilters
						tempUserFilter={tempUserFilter}
						tempUserSort={tempUserSort}
						setTempUserFilter={setTempUserFilter}
						setTempUserSort={setTempUserSort}
					/>
				)}
			</ScrollView>
			{/* </KeyboardAvoidingView> */}
		</ActionSheet>
	);
};
