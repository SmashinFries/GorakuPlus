import { combineReducers, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import {
	ExploreMediaQueryVariables,
	MediaFormat,
	MediaSort,
	MediaType,
} from '@/store/services/anilist/generated-anilist';
import { SearchType } from '@/types/search';
import { SortCategories } from '@/constants/anilist';
import {
	AnimeFormats,
	AscSorts,
	AvailableSorts,
	DescSorts,
	MangaFormats,
} from '@/constants/mediaConsts';

export type FilterState = {
	filter: ExploreMediaQueryVariables;
	sort: { value: AvailableSorts; asc: boolean };
	isTagBlacklist: boolean;
	filterType: SearchType;
};

export type FilterActions = {
	onTagBlacklistChange: {
		toggle: boolean;
		tagBlacklist: string[];
	};
	onSortChange: { sort: AvailableSorts; asc?: boolean };
	onFilterUpdate: {
		filterType: keyof ExploreMediaQueryVariables;
		value: any;
	};
	onMediaTypeChange: {
		newMediaType: SearchType;
	};
	updateTag: {
		tag: string;
	};
	updateGenre: {
		genre: string;
	};
	resetTagsGenre: {
		type: 'tag' | 'genre';
		tagBlacklist?: string[];
	};
};

const initialState: () => FilterState = () => ({
	filter: {
		type: MediaType.Anime,
		sort: DescSorts.TRENDING,
		isAdult: false,
		page: 1,
		perPage: 24,
		tag_not_in: undefined,
	},
	filterType: MediaType.Anime,
	sort: {
		value: 'TRENDING',
		asc: false,
	},
	isTagBlacklist: true,
});

export const filterSlice = createSlice({
	name: 'filter',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: initialState(),
	reducers: {
		setFilter: (state, action: PayloadAction<ExploreMediaQueryVariables>) => {
			state.filter = { ...state.filter, ...action.payload };
			// state.sort = action.payload.sort;
		},
		setSort: (state, action: PayloadAction<{ value: AvailableSorts; asc: boolean }>) => {
			state.sort = action.payload;
		},
		setIsTagBlacklist: (state, action: PayloadAction<boolean>) => {
			state.isTagBlacklist = action.payload;
		},
		setFilterType: (state, action: PayloadAction<SearchType>) => {
			state.filterType = action.payload;

			if (action.payload === MediaType.Anime) {
				state.filter = {
					...state.filter,
					type: MediaType.Anime,
					format: undefined,
					format_in: AnimeFormats.includes(state.filter.format_in as MediaFormat)
						? state.filter.format_in
						: undefined,
					isLicensed: undefined,
				};
				state.sort = {
					asc: state.sort.asc,
					value: (['CHAPTERS', 'VOLUMES'] as AvailableSorts[]).includes(state.sort.value)
						? 'EPISODES'
						: state.sort.value,
				};
			} else {
				state.filter = {
					...state.filter,
					type: MediaType.Manga,
					format: undefined,
					format_in: MangaFormats.includes(state.filter.format_in as MediaFormat)
						? state.filter.format_in
						: undefined,
					season: undefined,
					seasonYear: undefined,
				};
				state.sort = {
					asc: state.sort.asc,
					value: (['EPISODES'] as AvailableSorts[]).includes(state.sort.value)
						? 'CHAPTERS'
						: state.sort.value,
				};
			}
		},
	},
});

export const {
	setFilter,
	setSort,
	setIsTagBlacklist,
	setFilterType,
	// onTagBlacklistChange,
	// onSortChange,
	// onFilterUpdate,
	// onMediaTypeChange,
	// resetTagsGenre,
	// updateGenre,
	// updateTag,
} = filterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default filterSlice.reducer;
