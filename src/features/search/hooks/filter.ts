import React, { useEffect, useState } from 'react';
import {
    ExploreMediaQueryVariables,
    MediaFormat,
    MediaSort,
    MediaType,
} from '../../../app/services/anilist/generated-anilist';
import { FilterOptions } from '../types';
import { ANIME_DANGER, MANGA_DANGER } from '../constants/mediaConsts';

export const useFilter = () => {
    const [filterOptions, setFilterOptions] = useState<ExploreMediaQueryVariables>({
        type: MediaType.Anime,
        sort: MediaSort.TrendingDesc,
    });

    const updateFilter = <Opt extends keyof FilterOptions>(
        option_type: Opt,
        value: FilterOptions[Opt] | string,
    ) => {
        setFilterOptions((prev) => {
            return { ...prev, [option_type]: value };
        });
    };

    const switchType = (type: ExploreMediaQueryVariables['type'] | 'NOVEL') => {
        if (type === 'NOVEL') {
            updateFilter('type', MediaType.Manga);
            updateFilter('format_in', [MediaFormat.Novel]);
        } else {
            updateFilter('type', type);
            updateFilter('format_in', undefined);
        }
    };

    useEffect(() => {
        if (filterOptions.type === MediaType.Anime) {
            setFilterOptions((prev) => {
                return { ...prev, ...MANGA_DANGER };
            });
        } else {
            setFilterOptions((prev) => {
                return { ...prev, ...ANIME_DANGER };
            });
        }
    }, [filterOptions.type]);

    useEffect(() => {
        console.log('filterOptions', filterOptions);
    }, [filterOptions]);

    return { filterOptions, updateFilter, switchType };
};
