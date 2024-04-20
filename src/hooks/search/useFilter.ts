import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import {
	ExploreMediaQueryVariables,
	MediaFormat,
	MediaSort,
	MediaType,
} from '@/store/services/anilist/generated-anilist';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { SearchType } from '@/types/search';
import {
	AnimeFormats,
	AscSorts,
	AvailableSorts,
	DescSorts,
	MangaFormats,
} from '@/constants/mediaConsts';
import { setFilter, setIsTagBlacklist, setSort } from '@/store/slices/search/filterSlice';
import { getDatetoFuzzyInt } from '@/utils';

export const useFilter = () => {
	const { showNSFW, tagBlacklist } = useAppSelector((state) => state.persistedSettings);
	const { filter, isTagBlacklist, sort, filterType } = useAppSelector((state) => state.filter);
	const dispatch = useAppDispatch();
	// const [sort, setSort] = useState<{ value: AvailableSorts; asc: boolean }>({
	// 	value: 'TRENDING',
	// 	asc: false,
	// });
	// const [filter, setFilter] = useState<ExploreMediaQueryVariables>({
	// 	type: searchType === MediaType.Manga ? MediaType.Manga : MediaType.Anime,
	// 	sort: DescSorts.TRENDING,
	// 	isAdult: showNSFW ? undefined : false,
	// 	page: 1,
	// 	perPage: 24,
	// 	tag_not_in: tagBlacklist.length > 0 ? tagBlacklist : undefined,
	// });

	// const [isTagBlacklist, setIsTagBlacklist] = useState(true);

	const onTagBlacklistChange = (toggle: boolean) => {
		if (toggle) {
			dispatch(
				setFilter({
					tag_not_in:
						(filter.tag_not_in?.length ?? 0) + (tagBlacklist?.length ?? 0) > 0
							? [...(filter.tag_not_in ?? []), ...tagBlacklist].filter(
									(value, index, array) => array.indexOf(value) === index,
								)
							: undefined,
				}),
			);
			console.log('tagBlacklist:', tagBlacklist);
			// setFilter((prev) => ({
			// 	...prev,
			// 	tag_not_in:
			// 		(prev.tag_not_in?.length ?? 0) + (tagBlacklist?.length ?? 0) > 0
			// 			? [...prev.tag_not_in, ...tagBlacklist]
			// 			: undefined,
			// }));
		} else {
			dispatch(
				setFilter({
					tag_not_in:
						(filter.tag_not_in as string[])?.filter(
							(tag) => !tagBlacklist.includes(tag),
						).length > 0
							? (filter.tag_not_in as string[])?.filter(
									(tag) => !tagBlacklist.includes(tag),
								)
							: undefined,
				}),
			);
			// setFilter((prev) => ({
			// 	...prev,
			// 	tag_not_in:
			// 		(prev.tag_not_in as string[])?.filter((tag) => !tagBlacklist.includes(tag))
			// 			.length > 0
			// 			? (prev.tag_not_in as string[])?.filter(
			// 					(tag) => !tagBlacklist.includes(tag),
			// 				)
			// 			: undefined,
			// }));
		}
		// setIsTagBlacklist(toggle);
		dispatch(setIsTagBlacklist(toggle));
	};

	const onSortChange = (sort: AvailableSorts, asc = false) => {
		dispatch(setFilter({ sort: asc ? AscSorts[sort] : DescSorts[sort] }));
		dispatch(setSort({ value: sort, asc }));
		// setFilter((prev) => ({
		// 	...prev,
		// 	sort: asc ? AscSorts[sort] : DescSorts[sort],
		// }));
		// setSort({ value: sort, asc });
	};

	const onFilterUpdate = (filterType: keyof ExploreMediaQueryVariables, value: any) => {
		dispatch(setFilter({ [filterType]: value }));
		// setFilter((prev) => ({ ...prev, [filterType]: value }));
	};

	const onMediaTypeChange = (newMediaType: SearchType) => {
		// Update values if previous type isnt compatible
		if (newMediaType === MediaType.Anime) {
			dispatch(
				setFilter({
					type: MediaType.Anime,
					format: undefined,
					format_in: AnimeFormats.includes(filter.format) ? filter.format : undefined,
					isLicensed: undefined,
				}),
			);
			dispatch(
				setSort({
					value: (['CHAPTERS', 'VOLUMES'] as AvailableSorts[]).includes(sort.value)
						? 'EPISODES'
						: sort.value,
					asc: sort.asc,
				}),
			);
		} else {
			dispatch(
				setFilter({
					type: MediaType.Manga,
					format: undefined,
					format_in: MangaFormats.includes(filter.format) ? filter.format : undefined,
					season: undefined,
					seasonYear: undefined,
				}),
			);
			dispatch(
				setSort({
					value: (['EPISODES'] as AvailableSorts[]).includes(sort.value)
						? 'CHAPTERS'
						: sort.value,
					asc: sort.asc,
				}),
			);
		}
	};

	const updateTag = (tag: string) => {
		if (filter.tag_in?.includes(tag)) {
			dispatch(
				setFilter({
					tag_in:
						(filter.tag_in as string[])?.length === 1
							? undefined
							: (filter.tag_in as string[])?.filter((t) => t !== tag),
					tag_not_in: filter.tag_not_in
						? [...(filter.tag_not_in as string[]), tag]
						: [tag],
				}),
			);
			// setFilter((prev) => ({
			// 	...prev,
			// 	tag_in:
			// 		(prev.tag_in as string[])?.length === 1
			// 			? undefined
			// 			: (prev.tag_in as string[])?.filter((t) => t !== tag),
			// 	tag_not_in: prev.tag_not_in ? [...(prev.tag_not_in as string[]), tag] : [tag],
			// }));
		} else if (filter.tag_not_in?.includes(tag)) {
			dispatch(
				setFilter({
					tag_not_in:
						(filter.tag_not_in as string[])?.length === 1
							? undefined
							: (filter.tag_not_in as string[])?.filter((t) => t !== tag),
				}),
			);
			// setFilter((prev) => ({
			// 	...prev,
			// 	tag_not_in:
			// 		(prev.tag_not_in as string[])?.length === 1
			// 			? undefined
			// 			: (prev.tag_not_in as string[])?.filter((t) => t !== tag),
			// }));
		} else {
			dispatch(
				setFilter({
					tag_in: filter.tag_in ? [...(filter.tag_in as string[]), tag] : [tag],
				}),
			);
			// setFilter((prev) => ({
			// 	...prev,
			// 	tag_in: prev.tag_in ? [...(prev.tag_in as string[]), tag] : [tag],
			// }));
		}
	};

	const updateGenre = (genre: string) => {
		if (filter.genre_in?.includes(genre)) {
			// moves genre to not include
			dispatch(
				setFilter({
					genre_in:
						(filter.genre_in as string[])?.length === 1
							? undefined
							: (filter.genre_in as string[])?.filter((t) => t !== genre),
					genre_not_in: filter.genre_not_in
						? [...(filter.genre_not_in as string[]), genre]
						: [genre],
				}),
			);
			// setFilter((prev) => ({
			// 	...prev,
			// 	genre_in:
			// 		(prev.genre_in as string[])?.length === 1
			// 			? undefined
			// 			: (prev.genre_in as string[])?.filter((t) => t !== genre),
			// 	genre_not_in: prev.genre_not_in
			// 		? [...(prev.genre_not_in as string[]), genre]
			// 		: [genre],
			// }));
		} else if (filter.genre_not_in?.includes(genre)) {
			// removes genre from all
			dispatch(
				setFilter({
					genre_not_in:
						(filter.genre_not_in as string[]).length === 1
							? undefined
							: (filter.genre_not_in as string[])?.filter((t) => t !== genre),
				}),
			);
			// setFilter((prev) => ({
			// 	...prev,
			// 	genre_not_in:
			// 		(prev.genre_not_in as string[]).length === 1
			// 			? undefined
			// 			: (prev.genre_not_in as string[])?.filter((t) => t !== genre),
			// }));
		} else {
			// adds new genre to be included
			dispatch(
				setFilter({
					genre_in: filter.genre_in ? [...(filter.genre_in as string[]), genre] : [genre],
				}),
			);
			// setFilter((prev) => ({
			// 	...prev,
			// 	genre_in: prev.genre_in ? [...(prev.genre_in as string[]), genre] : [genre],
			// }));
		}
	};

	const resetTagsGenre = (type: 'tag' | 'genre') => {
		if (type === 'tag') {
			dispatch(
				setFilter({
					tag_in: undefined,
					tag_not_in:
						isTagBlacklist && tagBlacklist?.length > 0 ? [...tagBlacklist] : undefined,
				}),
			);
			// setFilter((prev) => ({
			// 	...prev,
			// 	tag_in: undefined,
			// 	tag_not_in:
			// 		isTagBlacklist && tagBlacklist?.length > 0 ? [...tagBlacklist] : undefined,
			// }));
		} else {
			dispatch(
				setFilter({
					genre_in: undefined,
					genre_not_in: undefined,
				}),
			);
			// setFilter((prev) => ({
			// 	...prev,
			// 	genre_in: undefined,
			// 	genre_not_in: undefined,
			// }));
		}
	};

	const updateFuzzyInt = (dateType: keyof ExploreMediaQueryVariables, date: Date | undefined) => {
		if (date) {
			const fuzzyInt = getDatetoFuzzyInt(date);
			dispatch(setFilter({ [dateType]: fuzzyInt }));
		} else {
			dispatch(setFilter({ [dateType]: undefined }));
		}
	};

	useEffect(() => {
		if (isTagBlacklist) {
			for (const tag of tagBlacklist) {
				if (filter.tag_not_in?.includes(tag)) {
					continue;
				} else {
					dispatch(
						setFilter({
							tag_not_in:
								(filter.tag_not_in?.length ?? 0) + (tagBlacklist?.length ?? 0) > 0
									? [...(filter.tag_not_in ?? []), ...tagBlacklist]
									: undefined,
						}),
					);
					break;
				}
			}
		}
	}, [tagBlacklist, isTagBlacklist]);

	useEffect(() => {
		onFilterUpdate('sort', sort.asc ? AscSorts[sort.value] : DescSorts[sort.value]);
		// setFilter((prev) => ({
		// 	...prev,
		// 	sort: sort.asc ? AscSorts[sort.value] : DescSorts[sort.value],
		// }));
	}, [sort]);

	return {
		filter,
		isTagBlacklist,
		sort,
		onTagBlacklistChange,
		onSortChange,
		onFilterUpdate,
		onMediaTypeChange,
		updateTag,
		updateGenre,
		resetTagsGenre,
		updateFuzzyInt,
	};
};
