import {
	ExploreMediaQueryVariables,
	MediaListSort,
} from '@/store/services/anilist/generated-anilist';
import { commonSorts } from '@/constants/anilist';

export type FilterOptions = Partial<ExploreMediaQueryVariables>;

export type UpdateFilter = (filter: ExploreMediaQueryVariables) => void;

export type SortModes = keyof typeof commonSorts;

export const ListSortOptions = {
	...MediaListSort,
	AverageScoreDesc: 'AverageScore_DESC',
	AverageScore: 'AverageScore',
	MeanScoreDesc: 'MeanScore_DESC',
	MeanScore: 'MeanScore',
};
export type ListSortOptionsType = (typeof ListSortOptions)[keyof typeof ListSortOptions];
