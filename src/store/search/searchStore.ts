import {
	MediaSort,
	MediaType,
	SearchAnimeQueryVariables,
	SearchMangaQueryVariables,
} from '@/api/anilist/__genereated__/gql';
import { create } from 'zustand';
import { useSettingsStore } from '../settings/settingsStore';
import {
	AnimeFormats,
	AscSorts,
	AvailableSorts,
	DescSorts,
	MangaFormats,
} from '@/constants/mediaConsts';

export type SearchType =
	| MediaType.Anime
	| MediaType.Manga
	| 'CHARACTER'
	| 'STAFF'
	| 'STUDIO'
	| 'ALL';

type SearchState = {
	isTagBlacklistEnabled: boolean;
	searchType: SearchType;
	filter: SearchAnimeQueryVariables | SearchMangaQueryVariables;
	query: string;
	sort: { value: AvailableSorts; asc: boolean };
};

type SearchActions = {
	updateQuery: (txt: string) => void;
	updateSearchType: (type: SearchState['searchType']) => void;
	toggleTagBlacklist: () => void;
	updateFilter: (params: SearchState['filter']) => void;
	updateTags: (tag: string) => void;
	updateGenre: (genre: string) => void;
	updateSort: (sort: AvailableSorts, asc?: boolean) => void;
};

export const useSearchStore = create<SearchState & SearchActions>((set, get) => ({
	query: '',
	sort: {
		asc: false,
		value: 'TRENDING',
	},
	isTagBlacklistEnabled: true,
	searchType: MediaType.Anime,
	filter: {
		sort: DescSorts.TRENDING,
		isAdult: false,
		page: 1,
		perPage: 24,
		tag_not_in: undefined,
	},
	updateQuery(txt) {
		set({ query: txt });
	},
	updateSearchType(type) {
		if (type === MediaType.Anime) {
			set((state) => ({
				filter: {
					format: undefined,
					format_in: AnimeFormats.includes(state.filter.format)
						? state.filter.format
						: undefined,
					isLicensed: undefined,
				},
				sort: {
					value: (['CHAPTERS', 'VOLUMES'] as AvailableSorts[]).includes(state.sort.value)
						? 'EPISODES'
						: state.sort.value,
					asc: state.sort.asc,
				},
			}));
		} else if (type === MediaType.Manga) {
			set((state) => ({
				filter: {
					format: undefined,
					format_in: MangaFormats.includes(state.filter.format)
						? state.filter.format
						: undefined,
					season: undefined,
					seasonYear: undefined,
				},
				sort: {
					value: (['EPISODES'] as AvailableSorts[]).includes(state.sort.value)
						? 'CHAPTERS'
						: state.sort.value,
					asc: state.sort.asc,
				},
			}));
		}
		set({ searchType: type });
	},
	toggleTagBlacklist: () => {
		const tagBlacklist = useSettingsStore.getState().tagBlacklist;
		const isTagBlacklistEnabled = !get().isTagBlacklistEnabled;
		if (isTagBlacklistEnabled) {
			set((state) => ({
				isTagBlacklistEnabled,
				filter: {
					tag_not_in:
						(state.filter.tag_not_in?.length ?? 0) + (tagBlacklist?.length ?? 0) > 0
							? [...(state.filter.tag_not_in ?? []), ...tagBlacklist].filter(
									(value, index, array) => array.indexOf(value) === index,
								)
							: undefined,
				},
			}));
		} else {
			set((state) => ({
				isTagBlacklistEnabled,
				filter: {
					tag_not_in:
						(state.filter.tag_not_in as string[])?.filter(
							(tag) => !tagBlacklist.includes(tag),
						).length > 0
							? (state.filter.tag_not_in as string[])?.filter(
									(tag) => !tagBlacklist.includes(tag),
								)
							: undefined,
				},
			}));
		}
	},
	updateFilter(params) {
		set((state) => ({ filter: { ...state.filter, ...params } }));
	},
	updateTags(tag) {
		const tag_in = get().filter.tag_in;
		const tag_not_in = get().filter.tag_not_in;
		if (tag_in?.includes(tag)) {
			set((state) => ({
				filter: {
					tag_in:
						(tag_in as string[])?.length === 1
							? undefined
							: (tag_in as string[])?.filter((t) => t !== tag),
					tag_not_in: state.filter.tag_not_in
						? [...(state.filter.tag_not_in as string[]), tag]
						: [tag],
				},
			}));
		} else if (tag_not_in?.includes(tag)) {
			set((state) => ({
				filter: {
					tag_not_in:
						(state.filter.tag_not_in as string[])?.length === 1
							? undefined
							: (state.filter.tag_not_in as string[])?.filter((t) => t !== tag),
				},
			}));
		} else {
			set((state) => ({
				filter: {
					tag_in: state.filter.tag_in ? [...state.filter.tag_in, tag] : [tag],
				},
			}));
		}
	},
	updateGenre(genre) {
		const genre_in = get().filter.genre_in;
		const genre_not_in = get().filter.genre_not_in;
		if (genre_in?.includes(genre)) {
			// moves genre to not include
			set({
				filter: {
					genre_in:
						(genre_in as string[])?.length === 1
							? undefined
							: (genre_in as string[])?.filter((t) => t !== genre),
					genre_not_in: genre_not_in ? [...(genre_not_in as string[]), genre] : [genre],
				},
			});
		} else if (genre_not_in?.includes(genre)) {
			// removes genre from all
			set({
				filter: {
					genre_not_in:
						(genre_not_in as string[]).length === 1
							? undefined
							: (genre_not_in as string[])?.filter((t) => t !== genre),
				},
			});
		} else {
			// adds new genre to be included
			set({
				filter: {
					genre_in: genre_not_in ? [...(genre_in as string[]), genre] : [genre],
				},
			});
		}
	},
	updateSort(sort, asc = false) {
		set({
			filter: {
				sort: asc ? AscSorts[sort] : DescSorts[sort],
			},
			sort: { value: sort, asc },
		});
	},
}));
