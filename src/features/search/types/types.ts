import { ExploreMediaQueryVariables } from '../../../app/services/anilist/generated-anilist';

export type FilterOptions = Partial<ExploreMediaQueryVariables>;

export type UpdateFilter = <Opt extends keyof FilterOptions>(
    option_type: Opt,
    value: FilterOptions[Opt] | string,
) => void;
