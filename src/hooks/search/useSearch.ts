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
import {
    SearchResult,
    useLazyGetSearchQuery,
    usePostSearchMutation,
} from '@/store/services/tracemoe/traceMoeApi';
import { SearchType } from '@/types/search';
import { getImageB64, selectImage } from '@/utils/images';
import { ToastAndroid } from 'react-native';
import { useLazyPredictWaifuQuery } from '@/store/services/huggingface/wdTagger';
import { WdTaggerOutput } from '@/store/services/huggingface/types';

export const useSearch = (searchType: SearchType) => {
    const [searchTrigger, searchStatus] = useLazyExploreMediaQuery();
    const [searchCharTrig, searchCharStatus] = useLazyCharacterSearchQuery();
    const [searchStaffTrig, searchStaffStatus] = useLazyStaffSearchQuery();
    const [searchStudioTrig, searchStudioStatus] = useLazyStudioSearchQuery();

    const [searchLocalImage, localImageStatus] = usePostSearchMutation();
    const [searchImageUrl, imageUrlStatus] = useLazyGetSearchQuery();
    const [searchWaifuImage, waifuImageStatus] = useLazyPredictWaifuQuery();
    const [searchWaifuData, searchWaifuDataStatus] = useLazyCharacterSearchQuery();

    const { showNSFW, tagBlacklist } = useAppSelector((state) => state.persistedSettings);

    const [mediaResults, setMediaResults] = useState<ExploreMediaQuery>();
    const [charResults, setCharResults] = useState<CharacterSearchQuery>();
    const [staffResults, setStaffResults] = useState<StaffSearchQuery>();
    const [studioResults, setStudioResults] = useState<StudioSearchQuery>();
    const [imageSearchResults, setImageSearchResults] = useState<SearchResult>();
    const [waifuImageResults, setWaifuImageResults] = useState<
        CharacterSearchQuery['Page']['characters'] & { confidence: number }[]
    >([]);

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

    const searchImage = async (url?: string, camera?: boolean) => {
        if (url) {
            try {
                const response = await searchImageUrl({ url, anilistInfo: 'true' }).unwrap();
                setImageSearchResults(response);
            } catch (e) {
                ToastAndroid.show(
                    `Error ${e?.status} - ${e?.data?.error?.split('http')[0]}`,
                    ToastAndroid.LONG,
                );
            }
        } else {
            const imageFormData = await selectImage(camera);
            if (imageFormData) {
                try {
                    const response = await searchLocalImage({
                        searchBody: imageFormData,
                        anilistInfo: 'true',
                        cutBorders: 'true',
                    }).unwrap();
                    setImageSearchResults(response);
                } catch (e) {
                    ToastAndroid.show(
                        `Error ${e?.status} - ${e?.data?.error?.split('http')[0]}`,
                        ToastAndroid.LONG,
                    );
                }
            } else {
                ToastAndroid.show('Could not process imag.', ToastAndroid.LONG);
            }
        }
    };

    const searchWaifu = async (url?: string, camera?: boolean) => {
        setWaifuImageResults([]);
        const imageBase64 = await getImageB64(camera, url);
        if (imageBase64) {
            try {
                const response = await searchWaifuImage({
                    data: [imageBase64, 'MOAT', 0.35, 0.35],
                }).unwrap();
                if (response?.data) {
                    for (const predictResult of response?.data?.[3].confidences) {
                        const searchresult = await searchWaifuData({
                            name: predictResult.label.replaceAll('_', ' ').split('(')[0],
                        });
                        setWaifuImageResults((prev) => [
                            ...prev,
                            {
                                ...searchresult?.data?.Page?.characters[0],
                                confidence: predictResult.confidence,
                            },
                        ]);
                    }
                }
            } catch (e) {
                ToastAndroid.show('Something went wrong... 😅', ToastAndroid.LONG);
            }
        } else {
            ToastAndroid.show('Could not process imag.', ToastAndroid.LONG);
        }
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
        imageSearchResults,
        localImageStatus,
        imageUrlStatus,
        waifuImageResults,
        waifuImageStatus,
        searchWaifu,
        searchImage,
        updateNewResults,
        addMoreResults,
        nextMediaPage,
        nextCharPage,
        nextStaffPage,
        nextStudioPage,
    };
};
