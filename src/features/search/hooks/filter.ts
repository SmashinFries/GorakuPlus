import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ExploreMediaQueryVariables,
    MediaFormat,
} from '../../../app/services/anilist/generated-anilist';
import { FilterTypes } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
    FilterState,
    addFilterParam,
    changeSort,
    removeFilterParam,
    setMediaType,
} from '../filterSlice';
import { ANIME_FORMATS, MANGA_FORMATS, animeSort, mangaNovelSort } from '../constants/mediaConsts';

export type FilterValues = {
    filter: RootState['persistedFilter']['filter'];
    sort: RootState['persistedFilter']['sort'];
    current: RootState['persistedFilter']['current'];
    updateFilter: (param: keyof ExploreMediaQueryVariables, value: any) => void;
    removeFilter: (filter_param: keyof ExploreMediaQueryVariables) => void;
    switchType: (m_type: FilterTypes) => void;
    updateSort: (
        mode: FilterState['sort']['mode'],
        category: FilterState['sort']['category'],
    ) => void;
};

export const useFilter = (): FilterValues => {
    const { current, filter, sort } = useSelector((state: RootState) => state.persistedFilter);
    const { search } = useSelector((state: RootState) => state.persistedSearch);
    const dispatch = useDispatch();

    const updateFilter = (param: keyof ExploreMediaQueryVariables, value: any) => {
        dispatch(addFilterParam({ param: param, value: value }));
    };

    const removeFilter = (filter_param: keyof ExploreMediaQueryVariables) => {
        dispatch(removeFilterParam(filter_param));
    };

    const switchType = (m_type: FilterTypes) => {
        dispatch(setMediaType(m_type));

        // sort adjust
        if (m_type === 'anime' && animeSort.includes(sort.category) === false) {
            updateSort(sort.mode, 'Trending');
        } else if (m_type !== 'anime' && mangaNovelSort.includes(sort.category) === false) {
            updateSort(sort.mode, 'Trending');
        }

        // format adjust
        if (m_type === 'anime' && ANIME_FORMATS.includes(filter.format) === false) {
            removeFilter('format');
            console.log('removed!');
        } else if (
            (m_type === 'manga' || m_type === 'manhwa') &&
            MANGA_FORMATS.includes(filter.format) === false
        ) {
            removeFilter('format');
        } else if (m_type === 'novel') {
            updateFilter('format', MediaFormat.Novel);
        }

        // Country adjust
        if (m_type === 'manga') {
            updateFilter('countryOfOrigin', 'JP');
        } else if (m_type === 'manhwa') {
            updateFilter('countryOfOrigin', 'KR');
        } else {
            removeFilter('countryOfOrigin');
        }
    };

    const updateSort = (
        mode: FilterState['sort']['mode'],
        category: FilterState['sort']['category'],
    ) => {
        dispatch(changeSort({ mode: mode, sort: category }));
    };

    useEffect(() => {
        updateFilter('search', search);
    }, [search]);

    return {
        filter,
        sort,
        current,
        updateFilter,
        removeFilter,
        switchType,
        updateSort,
    };
};
