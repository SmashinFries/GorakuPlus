import { commonSorts } from '@/constants/anilist';
import { ExploreMediaQueryVariables } from '@/store/services/anilist/generated-anilist';

export type FilterOptions = Partial<ExploreMediaQueryVariables>;

export type UpdateFilter = (filter: ExploreMediaQueryVariables) => void;

export type SortModes = keyof typeof commonSorts;
