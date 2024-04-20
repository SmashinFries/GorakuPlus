import {
	ExploreMediaQueryVariables,
	MediaFormat,
	MediaSort,
	MediaType,
} from '@/store/services/anilist/generated-anilist';
import { SearchType } from '@/types/search';

// export type FilterReducerState = {
// 	search: string | null;
// 	searchType: SearchType;
// 	enableTagBlacklist: boolean;
// 	filter: ExploreMediaQueryVariables;
// };

export type FilterActions<T extends keyof ExploreMediaQueryVariables> = {
	entry: T;
	payload: ExploreMediaQueryVariables[T];
};

const UniSorts: MediaSort[] = [
	MediaSort.PopularityDesc,
	MediaSort.Popularity,
	MediaSort.Favourites,
	MediaSort.FavouritesDesc,
	MediaSort.Format,
	MediaSort.FormatDesc,
	MediaSort.SearchMatch,
	MediaSort.Trending,
	MediaSort.TrendingDesc,
	MediaSort.Score,
	MediaSort.ScoreDesc,
	MediaSort.StartDate,
	MediaSort.StartDateDesc,
	MediaSort.EndDate,
	MediaSort.EndDateDesc,
];

export const filterReducer = (
	state: ExploreMediaQueryVariables,
	action: FilterActions
): ExploreMediaQueryVariables => {

}

// export const filterReducer = (
// 	state: FilterReducerState,
// 	action: FilterActions,
// ): FilterReducerState => {
// 	switch (action.type) {
// 		case 'SET_SEARCH':
// 			return {
// 				...state,
// 				search: action.payload.length > 0 ? action.payload : null,
// 			};
// 		case 'SET_TYPE':
// 			return {
// 				...state,
// 				filter: {
// 					...state.filter,
// 					type: action.payload,
// 					format: undefined,
// 					season: state.filter.type === MediaType.Anime ? state.filter.season : undefined,
// 					seasonYear:
// 						state.filter.type === MediaType.Anime ? state.filter.seasonYear : undefined,
// 					sort: UniSorts.every((sort) => state.filter.sort.includes(sort))
// 						? [state.filter.sort]
// 						: [MediaSort.TrendingDesc, MediaSort.PopularityDesc],
// 				},
// 			};
// 		case 'SET_FORMAT':
// 			return {
// 				...state,
// 				filter: { ...state.filter, format: action.payload },
// 			};

// 		case 'TOGGLE_TAG':
// 			switch (action.key) {
// 				case 'genre_in':
// 					return {
// 						...state,
// 						filter: {
// 							...state.filter,
// 							genre_in:
// 								typeof state.filter.genre_in === 'object'
// 									? [...state.filter.genre_in, action.payload]
// 									: [action.payload],
// 						},
// 					};
// 				case 'tag_in':
// 					return {
// 						...state,
// 						filter: {
// 							...state.filter,
// 							tag_in:
// 								typeof state.filter.tag_in === 'object'
// 									? [...state.filter.tag_in, action.payload]
// 									: [action.payload],
// 						},
// 					};
// 				case 'genre_not_in':
// 					return {
// 						...state,
// 						filter: {
// 							...state.filter,
// 							genre_not_in:
// 								typeof state.filter.genre_not_in === 'object'
// 									? [...state.filter.genre_not_in, action.payload]
// 									: [action.payload],
// 							genre_in: state.filter.genre_in?.filter(
// 								(genre: string) => genre !== action.payload,
// 							),
// 						},
// 					};
// 				case 'tag_not_in':
// 					return {
// 						...state,
// 						filter: {
// 							...state.filter,
// 							tag_not_in:
// 								typeof state.filter.tag_not_in === 'object'
// 									? [...state.filter.tag_not_in, action.payload]
// 									: [action.payload],
// 							tag_in: state.filter.tag_in?.filter(
// 								(tag: string) => tag !== action.payload,
// 							),
// 						},
// 					};
// 			}
// 		case 'REMOVE_TAG':
// 			// state.filter.tag_not_in = state.filter.tag_not_in?.filter(
// 			//     (tag: string) => tag !== action.payload.name,
// 			// );
// 			return {
// 				...state,
// 				filter: {
// 					...state.filter,
// 					tag_not_in: state.filter.tag_not_in?.filter(
// 						(tag: string) => tag !== action.payload,
// 					),
// 				},
// 			};
// 		case 'REMOVE_GENRE':
// 			return {
// 				...state,
// 				filter: {
// 					...state.filter,
// 					genre_not_in: (state.filter.genre_not_in = state.filter.genre_not_in?.filter(
// 						(genre: string) => genre !== action.payload,
// 					)),
// 				},
// 			};
// 		case 'RESET_TAGS_GENRES':
// 			if (action.payload === 'genre') {
// 				return {
// 					...state,
// 					filter: {
// 						...state.filter,
// 						genre_in: [],
// 						genre_not_in: [],
// 					},
// 				};
// 			} else if (action.payload === 'tag') {
// 				return {
// 					...state,
// 					filter: {
// 						...state.filter,
// 						tag_in: [],
// 						tag_not_in: [],
// 					},
// 				};
// 			}
// 		case 'SET_FILTER':
// 			return { ...state, filter: { ...state.filter, [action.key]: action.payload } };
// 		case 'REMOVE_FILTER':
// 			delete state.filter[action.key];
// 			return { ...state };
// 		case 'CHANGE_SEARCHTYPE':
// 			if (action.payload === MediaType.Anime || action.payload === MediaType.Manga) {
// 				return {
// 					...state,
// 					searchType: action.payload,
// 					filter: {
// 						...state.filter,
// 						type: action.payload,
// 					},
// 				};
// 			} else {
// 				return {
// 					...state,
// 					searchType: action.payload,
// 				};
// 			}
// 		case 'ENABLE_TAGBAN':
// 			return {
// 				...state,
// 				enableTagBlacklist: action.payload,
// 			};
// 		case 'RESET':
// 			return {
// 				filter: { type: MediaType.Anime, sort: MediaSort.TrendingDesc },
// 				search: null,
// 				searchType: MediaType.Anime,
// 				enableTagBlacklist: true,
// 			};

// 		default:
// 			return state;
// 	}
// };
