import { useCallback, useEffect, useState } from 'react';
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
	ExploreMediaQueryVariables,
	MediaType,
	StaffSearchQuery,
	StaffSort,
	StudioSearchQuery,
	StudioSort,
} from '@/store/services/anilist/generated-anilist';
import { cleanFilter } from '@/utils/search/cleanFilter';
import {
	SearchBody,
	SearchResult,
	useLazyGetSearchQuery,
	usePostSearchMutation,
} from '@/store/services/tracemoe/traceMoeApi';
import { SearchType } from '@/types/search';
import { getImageB64, selectImage } from '@/utils/images';
import { useLazyPredictWaifuQuery } from '@/store/services/huggingface/wdTagger';
import * as Burnt from 'burnt';
import { TOAST } from '@/constants/toast';

type SearchCategoriesType<Media, Char, Staff, Studio> = {
	media: Media;
	characters: Char;
	staff: Staff;
	studios: Studio;
};

export const useSearch = (filterType: SearchType) => {
	const [query, setQuery] = useState<string>('');
	const [searchTrigger, searchStatus] = useLazyExploreMediaQuery();
	const [searchCharTrig, searchCharStatus] = useLazyCharacterSearchQuery();
	const [searchStaffTrig, searchStaffStatus] = useLazyStaffSearchQuery();
	const [searchStudioTrig, searchStudioStatus] = useLazyStudioSearchQuery();

	const [searchLocalImage, localImageStatus] = usePostSearchMutation();
	const [searchImageUrl, imageUrlStatus] = useLazyGetSearchQuery();
	const [searchWaifuImage, waifuImageStatus] = useLazyPredictWaifuQuery();
	const [searchWaifuData, searchWaifuDataStatus] = useLazyCharacterSearchQuery();

	const [mediaResults, setMediaResults] = useState<ExploreMediaQuery>();
	const [charResults, setCharResults] = useState<CharacterSearchQuery>();
	const [staffResults, setStaffResults] = useState<StaffSearchQuery>();
	const [studioResults, setStudioResults] = useState<StudioSearchQuery>();
	const [imageSearchResults, setImageSearchResults] = useState<SearchResult>();
	const [waifuImageResults, setWaifuImageResults] = useState<
		CharacterSearchQuery['Page']['characters'] & { confidence: number }[]
	>([]);

	const SearchStatus = {
		media: searchStatus,
		characters: searchCharStatus,
		staff: searchStaffStatus,
		studios: searchStudioStatus,
	};

	const searchImage = async (url?: string, camera?: boolean) => {
		if (url) {
			try {
				const response = await searchImageUrl({ url, anilistInfo: 'true' }).unwrap();
				setImageSearchResults(response);
			} catch (e) {
				Burnt.toast({
					title: `Error ${e?.status} - ${e?.data?.error?.split('http')[0]}`,
					duration: TOAST.LONG,
				});
			}
		} else {
			const imageFormData = await selectImage(camera);
			if (imageFormData) {
				try {
					const response = await searchLocalImage({
						searchBody: imageFormData as SearchBody,
						anilistInfo: 'true',
						cutBorders: 'true',
					}).unwrap();
					setImageSearchResults(response);
				} catch (e) {
					Burnt.toast({
						title: `Error ${e?.status} - ${e?.data?.error?.split('http')[0]}`,
						duration: TOAST.LONG,
					});
				}
			} else {
				Burnt.toast({ title: 'Could not process image', duration: TOAST.LONG });
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
				if (response?.data?.[3].confidences) {
					for (const predictResult of response.data[3].confidences) {
						if (predictResult.label) {
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
				}
			} catch (e) {
				Burnt.toast({ title: 'Something went wrong... 😅', duration: TOAST.LONG });
			}
		} else {
			Burnt.toast({ title: 'Could not process image', duration: TOAST.LONG });
		}
	};

	const updateNewResults = useCallback(
		(results) => {
			if (filterType === MediaType.Anime || filterType === MediaType.Manga) {
				setMediaResults(results);
			} else if (filterType === 'characters') {
				setCharResults(results);
			} else if (filterType === 'staff') {
				setStaffResults(results);
			} else if (filterType === 'studios') {
				setStudioResults(results);
			}
		},
		[filterType],
	);

	const addMoreResults = useCallback(
		(results) => {
			if (filterType === MediaType.Anime || filterType === MediaType.Manga) {
				setMediaResults((prev) => ({
					...prev,
					Page: {
						...prev.Page,
						media: [...prev.Page.media, ...results.Page.media],
						pageInfo: results.Page.pageInfo,
					},
				}));
			} else if (filterType === 'characters') {
				setCharResults((prev) => ({
					...prev,
					Page: {
						...prev.Page,
						characters: [...prev.Page.characters, ...results.Page.characters],
						pageInfo: results.Page.pageInfo,
					},
				}));
			} else if (filterType === 'staff') {
				setStaffResults((prev) => ({
					...prev,
					Page: {
						...prev.Page,
						staff: [...prev.Page.staff, ...results.Page.staff],
						pageInfo: { ...results.Page.pageInfo },
					},
				}));
			} else if (filterType === 'studios') {
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
		[filterType],
	);

	const nextMediaPage = async (currentPage: number, filter: ExploreMediaQueryVariables) => {
		if (!searchStatus?.isFetching) {
			const cleansedFilter = {
				...filter,
				page: currentPage + 1,
			};
			const response = await searchTrigger(cleansedFilter, false).unwrap();

			addMoreResults(response);
		}
	};

	const nextCharPage = async () => {
		if (!searchStatus?.isFetching) {
			if (charResults?.Page?.pageInfo?.hasNextPage) {
				const response = await searchCharTrig({
					name: query ?? undefined,
					page: charResults?.Page?.pageInfo?.currentPage + 1,
					isBirthday: !query || query?.length < 1 ? true : false,
					sort:
						!query || query?.length < 1
							? [CharacterSort.FavouritesDesc]
							: [CharacterSort.SearchMatch],
				}).unwrap();

				addMoreResults(response);
			}
		}
	};

	const nextStaffPage = async () => {
		if (!searchStatus?.isFetching) {
			if (staffResults?.Page?.pageInfo?.hasNextPage) {
				const response = await searchStaffTrig({
					name: query ?? undefined,
					page: staffResults?.Page?.pageInfo?.currentPage + 1,
					isBirthday: !query || query?.length < 1 ? true : undefined,
					sort:
						!query || query?.length < 1
							? [StaffSort.FavouritesDesc]
							: [StaffSort.SearchMatch],
				}).unwrap();

				addMoreResults(response);
			}
		}
	};

	const nextStudioPage = async () => {
		if (!searchStatus?.isFetching) {
			if (studioResults?.Page?.pageInfo?.hasNextPage) {
				const response = await searchStudioTrig({
					name: query ?? undefined,
					page: studioResults.Page?.pageInfo?.currentPage + 1,
					sort:
						!query || query?.length < 1
							? [StudioSort.FavouritesDesc]
							: [StudioSort.SearchMatch],
				}).unwrap();

				addMoreResults(response);
			}
		}
	};

	return {
		searchMedia: searchTrigger,
		searchCharacters: searchCharTrig,
		searchStaff: searchStaffTrig,
		searchStudios: searchStudioTrig,
		searchWaifu,
		searchImage,
		searchStatus:
			SearchStatus[
				filterType === MediaType.Anime || filterType === MediaType.Manga
					? 'media'
					: filterType
			],
		mediaResults,
		charResults,
		staffResults,
		studioResults,
		imageSearchResults,
		localImageStatus,
		imageUrlStatus,
		waifuImageResults,
		waifuImageStatus,
		query,
		setQuery,
		updateNewResults,
		addMoreResults,
		nextMediaPage,
		nextCharPage,
		nextStaffPage,
		nextStudioPage,
	};
};
