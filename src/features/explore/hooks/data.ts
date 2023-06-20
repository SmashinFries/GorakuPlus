import { useEffect, useState } from 'react';
import {
    useLazyAnimeNextSeasonQuery,
    useLazyAnimePopularQuery,
    useLazyAnimeThisSeasonQuery,
    useLazyAnimeTopScoredQuery,
    useLazyAnimeTrendingQuery,
    useLazyMangaPopularQuery,
    useLazyMangaTopScoredQuery,
    useLazyMangaTrendingQuery,
    useLazyManhwaPopularQuery,
    useLazyManhwaTopScoredQuery,
    useLazyManhwaTrendingQuery,
    useLazyNovelPopularQuery,
    useLazyNovelTopScoredQuery,
    useLazyNovelTrendingQuery,
} from '../../../app/services/anilist/generated-anilist';
import { getSeason } from '../helpers/helpers';

export const useAnimeExplorer = () => {
    const thisSeasonParams = getSeason();
    const nextSeasonParams = getSeason(true);

    // { page: 1, perPage: 25 }
    const [trendTrig, trendResults, lastPromiseInfo] = useLazyAnimeTrendingQuery();
    const [curSeasonTrig, curSeasonResults] = useLazyAnimeThisSeasonQuery();
    const [nxtSeasonTrig, nxtSeasonResults] = useLazyAnimeNextSeasonQuery();
    const [popularTrig, popularResults] = useLazyAnimePopularQuery();
    const [topTrig, topResults] = useLazyAnimeTopScoredQuery();
    const [isError, setIsError] = useState(false);

    const fetchAnime = (refetch = false) => {
        trendTrig({ page: 1, perPage: 25 }, !refetch);
        curSeasonTrig(
            {
                page: 1,
                perPage: 25,
                season: thisSeasonParams.current_season,
                seasonYear: thisSeasonParams.year,
            },
            !refetch,
        );
        nxtSeasonTrig(
            {
                page: 1,
                perPage: 25,
                season: nextSeasonParams.current_season,
                seasonYear: nextSeasonParams.year,
            },
            !refetch,
        );
        popularTrig({ page: 1, perPage: 25 }, !refetch);
        topTrig({ page: 1, perPage: 25 }, !refetch);
    };

    useEffect(() => {
        if (
            trendResults.isError ||
            curSeasonResults.isError ||
            nxtSeasonResults.isError ||
            popularResults.isError ||
            topResults.isError
        ) {
            setIsError(true);
        }
    }, [
        trendResults.isError,
        curSeasonResults.isError,
        nxtSeasonResults.isError,
        popularResults.isError,
        topResults.isError,
    ]);

    return {
        trendResults,
        curSeasonResults,
        nxtSeasonResults,
        popularResults,
        topResults,
        isError,
        fetchAnime,
    };
};

export const useMangaExplorer = () => {
    const [trendTrig, trendResults] = useLazyMangaTrendingQuery();
    const [popularTrig, popularResults] = useLazyMangaPopularQuery();
    const [topTrig, topResults] = useLazyMangaTopScoredQuery();
    const [isError, setIsError] = useState(false);

    const fetchManga = (refetch = false) => {
        trendTrig({ page: 1, perPage: 25 }, !refetch);
        popularTrig({ page: 1, perPage: 25 }, !refetch);
        topTrig({ page: 1, perPage: 25 }, !refetch);
    };

    useEffect(() => {
        if (trendResults.isError || popularResults.isError || topResults.isError) {
            setIsError(true);
        }
    }, [trendResults.isError, popularResults.isError, topResults.isError]);

    return {
        trendResults,
        popularResults,
        topResults,
        isError,
        fetchManga,
    };
};

export const useManhwaExplorer = () => {
    const [trendTrig, trendResults] = useLazyManhwaTrendingQuery();
    const [popularTrig, popularResults] = useLazyManhwaPopularQuery();
    const [topTrig, topResults] = useLazyManhwaTopScoredQuery();
    const [isError, setIsError] = useState(false);

    const fetchManhwa = (refetch = false) => {
        trendTrig({ page: 1, perPage: 25 }, !refetch);
        popularTrig({ page: 1, perPage: 25 }, !refetch);
        topTrig({ page: 1, perPage: 25 }, !refetch);
    };

    useEffect(() => {
        if (trendResults.isError || popularResults.isError || topResults.isError) {
            setIsError(true);
        }
    }, [trendResults.isError, popularResults.isError, topResults.isError]);

    return {
        trendResults,
        popularResults,
        topResults,
        isError,
        fetchManhwa,
    };
};

export const useNovelExplorer = () => {
    const [trendTrig, trendResults] = useLazyNovelTrendingQuery();
    const [popularTrig, popularResults] = useLazyNovelPopularQuery();
    const [topTrig, topResults] = useLazyNovelTopScoredQuery();
    const [isError, setIsError] = useState(false);

    const fetchNovels = (refetch = false) => {
        trendTrig({ page: 1, perPage: 25 }, !refetch);
        popularTrig({ page: 1, perPage: 25 }, !refetch);
        topTrig({ page: 1, perPage: 25 }, !refetch);
    };

    useEffect(() => {
        if (trendResults.isError || popularResults.isError || topResults.isError) {
            setIsError(true);
        }
    }, [trendResults.isError, popularResults.isError, topResults.isError]);

    return {
        trendResults,
        popularResults,
        topResults,
        isError,
        fetchNovels,
    };
};
