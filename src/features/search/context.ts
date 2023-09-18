import React from 'react';
import { ExploreMediaQueryVariables } from '../../app/services/anilist/generated-anilist';

const FilterContext = React.createContext({});

export const useFilterContext = () => {
    return React.useContext(FilterContext);
};

export default FilterContext;
