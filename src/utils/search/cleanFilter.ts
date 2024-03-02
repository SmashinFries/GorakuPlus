import {
	ExploreMediaQuery,
	ExploreMediaQueryVariables,
} from '../../../app/services/anilist/generated-anilist';

export const cleanFilter = (filter: ExploreMediaQueryVariables): ExploreMediaQueryVariables => {
	// const { genre_in, genre_not_in, tag_in, tag_not_in, format, search, ...rest } = filter;
	// const tempFilter = {
	//     ...filter,
	//     ...(search?.length > 0 && { search }),
	//     ...(format && { format }),
	//     ...(genre_in?.length > 0 && { genre_in }),
	//     ...(genre_not_in?.length > 0 && { genre_not_in }),
	//     ...(tag_in?.length > 0 && { tag_in }),
	//     ...(tag_not_in?.length > 0 && { tag_not_in }),
	// };
	const tempFilter = filter;
	if (tempFilter?.genre_in?.length < 1) {
		delete tempFilter.genre_in;
	}
	if (tempFilter?.genre_not_in?.length < 1) {
		delete tempFilter.genre_not_in;
	}
	if (tempFilter?.tag_in?.length < 1) {
		delete tempFilter.tag_in;
	}
	if (tempFilter?.tag_not_in?.length < 1) {
		delete tempFilter.tag_not_in;
	} else {
		const uniq = [...new Set(tempFilter?.tag_not_in)];
		tempFilter.tag_not_in = uniq;
	}
	if (tempFilter?.search?.length < 1) {
		delete tempFilter.search;
	}
	if (!tempFilter?.format) {
		delete tempFilter.format;
	}
	if (!tempFilter?.status) {
		delete tempFilter.status;
	}
	if (!tempFilter?.search) {
		delete tempFilter.search;
	}
	if (!tempFilter?.season || tempFilter?.type === 'MANGA') {
		delete tempFilter.season;
	}
	if (!tempFilter?.seasonYear || tempFilter?.type === 'MANGA') {
		delete tempFilter.seasonYear;
	}
	if (!tempFilter?.countryOfOrigin) {
		delete tempFilter.countryOfOrigin;
	}
	if (!tempFilter?.onList === null || !tempFilter?.onList === undefined) {
		delete tempFilter.onList;
	}
	if (tempFilter?.isLicensed === null || tempFilter?.isLicensed === undefined) {
		delete tempFilter.isLicensed;
	}

	return tempFilter;
};
