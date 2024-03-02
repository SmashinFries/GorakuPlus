import { commonSorts } from '@/constants/anilist';
import { ExploreMediaQueryVariables, MediaType } from '@/store/services/anilist/generated-anilist';

export type FilterOptions = Partial<ExploreMediaQueryVariables>;

export type UpdateFilter = (filter: ExploreMediaQueryVariables) => void;

export type SortModes = keyof typeof commonSorts;

export type SearchType =
	| MediaType.Anime
	| MediaType.Manga
	| 'users'
	| 'characters'
	| 'staff'
	| 'studios'
	| 'imageSearch'
	| 'waifuSearch';
