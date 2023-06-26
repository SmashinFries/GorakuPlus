import { ExploreMediaQueryVariables } from '../../../app/services/anilist/generated-anilist';
import { commonSorts } from '../constants/mediaConsts';
import { FilterState } from '../filterSlice';

export type FilterOptions = Partial<ExploreMediaQueryVariables>;

export type UpdateFilter = (filter: ExploreMediaQueryVariables) => void;

export type SortModes = keyof typeof commonSorts;
