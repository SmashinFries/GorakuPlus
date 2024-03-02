import { combineReducers, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import {
	ExploreMediaQueryVariables,
	MediaFormat,
	MediaSort,
	MediaType,
} from '@/store/services/anilist/generated-anilist';
import { SearchType } from '@/types/search';
import { SearchTypes, SortCategories } from '@/constants/anilist';

const animeParams: ExploreMediaQueryVariables = {
	type: MediaType.Anime,
	countryOfOrigin: null,
};

const mangaParams: ExploreMediaQueryVariables = {
	type: MediaType.Manga,
	countryOfOrigin: 'JP',
};

const manhwaParams: ExploreMediaQueryVariables = {
	type: MediaType.Manga,
	countryOfOrigin: 'KR',
};

const novelParams: ExploreMediaQueryVariables = {
	type: MediaType.Manga,
	countryOfOrigin: null,
	format: MediaFormat.Novel,
};

export const getTypeParams = (mediaType: SearchType): ExploreMediaQueryVariables => {
	switch (mediaType) {
		case MediaType.Anime:
			return animeParams;
		case MediaType.Manga:
			return mangaParams;
	}
};

const getSortParam = (mode: 'asc' | 'desc', sort: SortCategories) => {
	switch (sort) {
		case 'Trending':
			return mode === 'asc' ? MediaSort.Trending : MediaSort.TrendingDesc;
		case 'Popularity':
			return mode === 'asc' ? MediaSort.Popularity : MediaSort.PopularityDesc;
		case 'Score':
			return mode === 'asc' ? MediaSort.Score : MediaSort.ScoreDesc;
		case 'Updated At':
			return mode === 'asc' ? MediaSort.UpdatedAt : MediaSort.UpdatedAtDesc;
		case 'Episodes':
			return mode === 'asc' ? MediaSort.Episodes : MediaSort.EpisodesDesc;
		case 'Duration':
			return mode === 'asc' ? MediaSort.Duration : MediaSort.DurationDesc;
		case 'Chapters':
			return mode === 'asc' ? MediaSort.Chapters : MediaSort.ChaptersDesc;
		case 'Volumes':
			return mode === 'asc' ? MediaSort.Volumes : MediaSort.VolumesDesc;
	}
};

export type FilterState = {
	current: SearchType;
	filter: ExploreMediaQueryVariables;
	sort: {
		mode: 'asc' | 'desc';
		category: SortCategories;
	};
};
