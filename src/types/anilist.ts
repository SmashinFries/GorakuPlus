import {
	AnimeExploreQueryVariables,
	MangaExploreQueryVariables,
	MediaListSort,
} from '@/api/anilist/__genereated__/gql';
import { commonSorts } from '@/constants/anilist';

export type FilterOptions = Partial<AnimeExploreQueryVariables | MangaExploreQueryVariables>;

export type UpdateFilter = (filter: AnimeExploreQueryVariables) => void;

export type SortModes = keyof typeof commonSorts;

export const ListSortOptions = {
	...MediaListSort,
	AverageScoreDesc: 'AverageScore_DESC',
	AverageScore: 'AverageScore',
	MeanScoreDesc: 'MeanScore_DESC',
	MeanScore: 'MeanScore',
};
export type ListSortOptionsType = (typeof ListSortOptions)[keyof typeof ListSortOptions];

export type AnilistLanguages = 'JP' | 'KR' | 'CN';
