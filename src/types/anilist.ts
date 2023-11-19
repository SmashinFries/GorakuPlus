import { ExploreMediaQueryVariables } from '@/store/services/anilist/generated-anilist';
import { commonSorts } from '@/constants/anilist';

export type FilterOptions = Partial<ExploreMediaQueryVariables>;

export type UpdateFilter = (filter: ExploreMediaQueryVariables) => void;

export type SortModes = keyof typeof commonSorts;
