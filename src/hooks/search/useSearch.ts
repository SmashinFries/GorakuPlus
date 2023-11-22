import { useCallback, useState } from 'react';
import {
    useLazyCharacterSearchQuery,
    useLazyExploreMediaQuery,
    useLazyStaffSearchQuery,
    useLazyStudioSearchQuery,
} from '@/store/services/anilist/enhanced';
import {
    CharacterSearchQuery,
    CharacterSort,
    ExploreMediaQuery,
    MediaType,
    StaffSearchQuery,
    StaffSort,
    StudioSearchQuery,
    StudioSort,
} from '@/store/services/anilist/generated-anilist';
import { cleanFilter } from '@/utils/search/cleanFilter';
import { useAppSelector } from '@/store/hooks';

export const useSearch = (searchType: string) => {
    const [searchTrigger, searchStatus] = useLazyExploreMediaQuery();
    const [searchCharTrig, searchCharStatus] = useLazyCharacterSearchQuery();
    const [searchStaffTrig, searchStaffStatus] = useLazyStaffSearchQuery();
    const [searchStudioTrig, searchStudioStatus] = useLazyStudioSearchQuery();

    const { showNSFW, tagBlacklist } = useAppSelector((state) => state.persistedSettings);

    const [mediaResults, setMediaResults] = useState<ExploreMediaQuery>();
    const [charResults, setCharResults] = useState<CharacterSearchQuery>();
    const [staffResults, setStaffResults] = useState<StaffSearchQuery>();
    const [studioResults, setStudioResults] = useState<StudioSearchQuery>();

    const SearchTypes = {
        media: searchTrigger,
        characters: searchCharTrig,
        staff: searchStaffTrig,
        studios: searchStudioTrig,
    };

    const SearchStatus = {
        media: searchStatus,
        characters: searchCharStatus,
        staff: searchStaffStatus,
        studios: searchStudioStatus,
    };

    const SearchResults = {
        media: mediaResults,
        characters: charResults,
        staff: staffResults,
        studios: studioResults,
    };

    const updateNewResults = useCallback(
        (results) => {
            if (searchType === MediaType.Anime || searchType === MediaType.Manga) {
                setMediaResults(results);
            } else if (searchType === 'characters') {
                setCharResults(results);
            } else if (searchType === 'staff') {
                setStaffResults(results);
            } else if (searchType === 'studios') {
                setStudioResults(results);
            }
        },
        [searchType],
    );

    const addMoreResults = useCallback(
        (results) => {
            if (searchType === MediaType.Anime || searchType === MediaType.Manga) {
                setMediaResults((prev) => ({
                    ...prev,
                    Page: {
                        ...prev.Page,
                        media: [...prev.Page.media, ...results.Page.media],
                        pageInfo: { ...results.Page.pageInfo },
                    },
                }));
            } else if (searchType === 'characters') {
                setCharResults((prev) => ({
                    ...prev,
                    Page: {
                        ...prev.Page,
                        characters: [...prev.Page.characters, ...results.Page.characters],
                        pageInfo: { ...results.Page.pageInfo },
                    },
                }));
            } else if (searchType === 'staff') {
                setStaffResults((prev) => ({
                    ...prev,
                    Page: {
                        ...prev.Page,
                        staff: [...prev.Page.staff, ...results.Page.staff],
                        pageInfo: { ...results.Page.pageInfo },
                    },
                }));
            } else if (searchType === 'studios') {
                setStudioResults((prev) => ({
                    ...prev,
                    Page: {
                        ...prev.Page,
                        studios: [...prev.Page.studios, ...results.Page.studios],
                        pageInfo: { ...results.Page.pageInfo },
                    },
                }));
            }
        },
        [searchType],
    );

    const nextMediaPage = async (currentPage: number, filter) => {
        if (!searchStatus?.isFetching) {
            const tag_not_in = filter.filter.tag_not_in
                ? [...filter.filter.tag_not_in, ...tagBlacklist]
                : tagBlacklist
                ? tagBlacklist
                : [];
            const cleansedFilter = cleanFilter({
                ...filter.filter,
                search: filter.search,
                page: currentPage + 1,
                perPage: 24,
                isAdult: showNSFW ? filter.filter.isAdult : false,
                tag_not_in: tag_not_in,
            });
            const response = await searchTrigger(cleansedFilter, false).unwrap();

            addMoreResults(response);
        }
    };

    const nextCharPage = async (currentPage: number, search: string, isbday?: boolean) => {
        if (!searchStatus?.isFetching) {
            const response = await searchCharTrig({
                name: search,
                page: currentPage + 1,
                isBirthday: !search || search?.length < 1 ? true : undefined,
                sort:
                    !search || search?.length < 1
                        ? [CharacterSort.FavouritesDesc]
                        : [CharacterSort.SearchMatch],
            }).unwrap();

            addMoreResults(response);
        }
    };

    const nextStaffPage = async (currentPage: number, search: string, isBday?: boolean) => {
        if (!searchStatus?.isFetching) {
            const response = await searchStaffTrig({
                name: search,
                page: currentPage + 1,
                isBirthday: !search || search?.length < 1 ? true : undefined,
                sort:
                    !search || search?.length < 1
                        ? [StaffSort.FavouritesDesc]
                        : [StaffSort.SearchMatch],
            }).unwrap();

            addMoreResults(response);
        }
    };

    const nextStudioPage = async (currentPage: number, search: string) => {
        if (!searchStatus?.isFetching) {
            const response = await searchStudioTrig({
                name: search,
                page: currentPage + 1,
                sort:
                    !search || search?.length < 1
                        ? [StudioSort.FavouritesDesc]
                        : [StudioSort.SearchMatch],
            }).unwrap();

            addMoreResults(response);
        }
    };

    return {
        searchContent:
            SearchTypes[
                searchType === MediaType.Anime || searchType === MediaType.Manga
                    ? 'media'
                    : searchType
            ],
        searchStatus:
            SearchStatus[
                searchType === MediaType.Anime || searchType === MediaType.Manga
                    ? 'media'
                    : searchType
            ],
        searchResults:
            SearchResults[
                searchType === MediaType.Anime || searchType === MediaType.Manga
                    ? 'media'
                    : searchType
            ],
        updateNewResults,
        addMoreResults,
        nextMediaPage,
        nextCharPage,
        nextStaffPage,
        nextStudioPage,
    };
};
