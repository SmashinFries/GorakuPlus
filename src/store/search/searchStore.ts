import {
	CharacterSearchQueryVariables,
	CharacterSort,
	MediaFormat,
	MediaSearchQueryVariables,
	MediaStatus,
	MediaType,
	StaffSearchQueryVariables,
	StaffSort,
	StudioSearchQueryVariables,
	StudioSort,
	UserSearchQueryVariables,
	UserSort,
} from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '../settings/settingsStore';
import {
	AnimeFormats,
	AscSorts,
	AvailableCharSorts,
	AvailableSorts,
	AvailableStaffSorts,
	AvailableStudioSorts,
	AvailableUserSorts,
	CharacterAscSorts,
	CharacterDescSorts,
	DescSorts,
	MangaFormats,
	StaffAscSorts,
	StaffDescSorts,
	StudioAscSorts,
	StudioDescSorts,
	UserAscSorts,
	UserDescSorts,
} from '@/constants/mediaConsts';
import { updateMultiSelectFilters } from '@/utils/search/filtering';
import { create } from 'zustand';

export type SearchSortType = {
	value:
		| AvailableSorts
		| AvailableCharSorts
		| AvailableStaffSorts
		| AvailableStudioSorts
		| AvailableUserSorts;
	asc: boolean;
};
export type SearchType =
	| MediaType.Anime
	| MediaType.Manga
	| 'CHARACTER'
	| 'STAFF'
	| 'STUDIO'
	| 'USER'
	| 'ALL';

export type SearchState = {
	isTagBlacklistEnabled: boolean;
	searchType: SearchType;
	imageSearchMode: MediaType | 'CHARACTER';
	isImageSearchEnabled: boolean;
	query: string;
	mediaFilter: MediaSearchQueryVariables;
	characterFilter: CharacterSearchQueryVariables;
	staffFilter: StaffSearchQueryVariables;
	studioFilter: StudioSearchQueryVariables;
	userFilter: UserSearchQueryVariables;
	mediaSort: { value: AvailableSorts; asc: boolean };
	characterSort: { value: AvailableCharSorts; asc: boolean };
	staffSort: { value: AvailableStaffSorts; asc: boolean };
	studioSort: { value: AvailableStudioSorts; asc: boolean };
	userSort: { value: AvailableUserSorts; asc: boolean };
};

type SearchActions = {
	updateQuery: (txt: string) => void;
	updateSearchType: (type: SearchState['searchType']) => void;
	toggleTagBlacklist: () => void;
	updateMediaFilter: (
		params: SearchState['mediaFilter'],
		sort?: SearchState['mediaSort'],
	) => void;
	updateCharStaffFilter: (
		type: SearchType,
		params: StaffSearchQueryVariables | CharacterSearchQueryVariables,
		sort?: SearchState['characterSort'] | SearchState['staffSort'],
	) => void;
	updateStudioFilter: (
		params: StudioSearchQueryVariables,
		sort?: SearchState['studioSort'],
	) => void;
	updateUserFilter: (params: UserSearchQueryVariables, sort?: SearchState['userSort']) => void;
	updateTags: (tag: string) => void;
	updateGenre: (genre: string) => void;
	updateStatus: (status: MediaStatus) => void;
	updateFormat: (format: MediaFormat) => void;
	resetFilter: (type: SearchType) => void;
	reset: () => void;
};

const initialState: SearchState = {
	isTagBlacklistEnabled: false, // if true by default, search may seem broken
	query: '',
	mediaSort: {
		asc: false,
		value: 'TRENDING',
	},
	searchType: 'ALL',
	isImageSearchEnabled: false,
	imageSearchMode: MediaType.Anime,
	mediaFilter: {
		sort: DescSorts.TRENDING,
		isAdult: useSettingsStore.getState().showNSFW ? undefined : false,
		page: 1,
		perPage: 24,
		tag_not_in: undefined,
	},
	characterFilter: { isBirthday: true, sort: CharacterSort.FavouritesDesc },
	staffFilter: { isBirthday: true, sort: StaffSort.FavouritesDesc },
	studioFilter: { sort: StudioSort.FavouritesDesc },
	userFilter: { sort: UserSort.WatchedTimeDesc, isModerator: undefined },
	characterSort: { value: 'FAVOURITES', asc: false },
	staffSort: { value: 'FAVOURITES', asc: false },
	studioSort: { value: 'FAVOURITES', asc: false },
	userSort: { value: 'WATCHED_TIME', asc: false },
};
export const useSearchStore = create<SearchState & SearchActions>((set, get) => ({
	...initialState,
	updateQuery(txt) {
		if (txt === '') {
			set((state) => ({
				query: txt,
				characterFilter: { ...state.characterFilter, isBirthday: true },
				staffFilter: { ...state.staffFilter, isBirthday: true },
			}));
		} else {
			set((state) =>
				state.searchType === 'CHARACTER' || state.searchType === 'STAFF'
					? {
							query: txt,
							characterFilter: { ...state.characterFilter, isBirthday: undefined },
							staffFilter: { ...state.staffFilter, isBirthday: undefined },
						}
					: { query: txt },
			);
		}
	},
	updateSearchType(type) {
		switch (type) {
			case MediaType.Anime:
				set((state) => ({
					mediaFilter: {
						...state.mediaFilter,
						format: undefined,
						format_in: AnimeFormats.includes(state.mediaFilter.format)
							? state.mediaFilter.format
							: undefined,
						isLicensed: undefined,
						licensedBy_in: undefined,
						chapters_greater: undefined,
						chapters_lesser: undefined,
						volumes_greater: undefined,
						volumes_lesser: undefined,
					},
					mediaSort: {
						value: (['CHAPTERS', 'VOLUMES'] as AvailableSorts[]).includes(
							state.mediaSort.value,
						)
							? 'EPISODES'
							: state.mediaSort.value,
						asc: state.mediaSort.asc,
					},
				}));
				break;
			case MediaType.Manga:
				set((state) => ({
					mediaFilter: {
						...state.mediaFilter,
						format: undefined,
						format_in: MangaFormats.includes(state.mediaFilter.format)
							? state.mediaFilter.format
							: undefined,
						season: undefined,
						seasonYear: undefined,
						licensedBy_in: undefined,
						episodes_greater: undefined,
						episodes_lesser: undefined,
						duration_greater: undefined,
						duration_lesser: undefined,
					},
					mediaSort: {
						value: (['EPISODES'] as AvailableSorts[]).includes(state.mediaSort.value)
							? 'CHAPTERS'
							: state.mediaSort.value,
						asc: state.mediaSort.asc,
					},
				}));
				break;
			case 'CHARACTER':
				set((state) =>
					state.query.length > 0
						? {
								searchType: type,
								characterFilter: {
									...state.characterFilter,
									isBirthday: undefined,
								},
							}
						: { searchType: type },
				);
				break;
			case 'STAFF':
				set((state) =>
					state.query.length > 0
						? {
								searchType: type,
								staffFilter: { ...state.staffFilter, isBirthday: undefined },
							}
						: { searchType: type },
				);
				break;
		}
		set({ searchType: type });
	},
	toggleTagBlacklist: () => {
		const tagBlacklist = useSettingsStore.getState().tagBlacklist;
		const isTagBlacklistEnabled = !get().isTagBlacklistEnabled;
		if (isTagBlacklistEnabled) {
			set((state) => ({
				isTagBlacklistEnabled,
				mediaFilter: {
					...state.mediaFilter,
					tag_not_in:
						(state.mediaFilter.tag_not_in?.length ?? 0) + (tagBlacklist?.length ?? 0) >
						0
							? [...(state.mediaFilter.tag_not_in ?? []), ...tagBlacklist].filter(
									(value, index, array) => array.indexOf(value) === index,
								)
							: undefined,
				},
			}));
		} else {
			set((state) => ({
				isTagBlacklistEnabled,
				mediaFilter: {
					...state.mediaFilter,
					tag_not_in:
						(state.mediaFilter.tag_not_in as string[])?.filter(
							(tag) => !tagBlacklist.includes(tag),
						).length > 0
							? (state.mediaFilter.tag_not_in as string[])?.filter(
									(tag) => !tagBlacklist.includes(tag),
								)
							: undefined,
				},
			}));
		}
	},
	updateTags(tag) {
		const { in_values, not_in_values } = updateMultiSelectFilters(
			tag,
			get().mediaFilter.tag_in,
			get().mediaFilter.tag_not_in,
		);

		set((state) => ({
			...state,
			mediaFilter: {
				...state.mediaFilter,
				tag_in: in_values,
				tag_not_in: not_in_values,
			},
		}));
	},
	updateGenre(genre) {
		const { in_values, not_in_values } = updateMultiSelectFilters(
			genre,
			get().mediaFilter.genre_in,
			get().mediaFilter.genre_not_in,
		);

		set((state) => ({
			...state,
			mediaFilter: {
				...state.mediaFilter,
				genre_in: in_values,
				genre_not_in: not_in_values,
			},
		}));
	},
	updateMediaFilter(params, sort) {
		set((state) => ({
			mediaFilter: sort
				? {
						...state.mediaFilter,
						...params,
						sort: sort.asc ? AscSorts[sort.value] : DescSorts[sort.value],
					}
				: { ...state.mediaFilter, ...params },
			mediaSort: sort,
		}));
	},
	updateCharStaffFilter(type, params, sort) {
		const key: keyof SearchState = type === 'CHARACTER' ? 'characterFilter' : 'staffFilter';
		const sortKey: keyof SearchState = type === 'CHARACTER' ? 'characterSort' : 'staffSort';
		set((state) => ({
			[key]: sort
				? {
						...state[key],
						...params,
						sort: sort.asc
							? type === 'CHARACTER'
								? CharacterAscSorts
								: StaffAscSorts
							: (type === 'CHARACTER' ? CharacterDescSorts : StaffDescSorts)[
									sort.value
								],
					}
				: { ...state[key], ...params },
			[sortKey]: sort,
		}));
	},
	updateStudioFilter(params, sort) {
		set((state) => ({
			studioFilter: sort
				? {
						...state.studioFilter,
						...params,
						sort: sort.asc ? StudioAscSorts[sort.value] : StudioDescSorts[sort.value],
					}
				: { ...state.studioFilter, ...params },
			studioSort: sort,
		}));
	},
	updateUserFilter(params, sort) {
		set((state) => ({
			userFilter: sort
				? {
						...state.userFilter,
						...params,
						sort: sort.asc ? UserAscSorts[sort.value] : UserDescSorts[sort.value],
					}
				: { ...state.userFilter, ...params },
			userSort: sort,
		}));
	},
	updateStatus(status) {
		const { in_values, not_in_values } = updateMultiSelectFilters(
			status,
			get().mediaFilter.status_in,
			get().mediaFilter.status_not_in,
		);

		set((state) => ({
			...state,
			mediaFilter: {
				...state.mediaFilter,
				status_in: in_values as MediaStatus[],
				status_not_in: not_in_values as MediaStatus[],
			},
		}));
	},
	updateFormat(format) {
		const { in_values, not_in_values } = updateMultiSelectFilters(
			format,
			get().mediaFilter.format_in,
			get().mediaFilter.format_not_in,
		);

		set((state) => ({
			...state,
			mediaFilter: {
				...state.mediaFilter,
				format_in: in_values as MediaFormat[],
				format_not_in: not_in_values as MediaFormat[],
			},
		}));
	},
	resetFilter(type) {
		switch (type) {
			case MediaType.Anime:
			case MediaType.Manga:
				set(() => ({
					mediaFilter: initialState.mediaFilter,
					mediaSort: initialState.mediaSort,
				}));
			case 'CHARACTER':
				set(() => ({
					characterFilter: initialState.characterFilter,
					characterSort: initialState.characterSort,
				}));
			case 'STAFF':
				set(() => ({
					staffFilter: initialState.staffFilter,
					staffSort: initialState.staffSort,
				}));
			case 'STUDIO':
				set(() => ({
					studioFilter: initialState.studioFilter,
					studioSort: initialState.studioSort,
				}));
			case 'USER':
				set(() => ({
					userFilter: initialState.userFilter,
					userSort: initialState.userSort,
				}));
		}
	},
	reset() {
		set(initialState);
	},
}));
