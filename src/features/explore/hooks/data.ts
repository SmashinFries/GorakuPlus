import { useEffect, useState } from 'react';
import { getSeason } from '../helpers/helpers';
import {
    useAnimeNextSeasonQuery,
    useAnimePopularQuery,
    useAnimeThisSeasonQuery,
    useAnimeTopScoredQuery,
    useMangaTrendingQuery,
    useMangaPopularQuery,
    useMangaTopScoredQuery,
    useManhwaTrendingQuery,
    useManhwaPopularQuery,
    useManhwaTopScoredQuery,
    useNovelTrendingQuery,
    useNovelPopularQuery,
    useNovelTopScoredQuery,
    useAnimeTrendingQuery,
} from '../../../app/services/anilist/enhanced';
import { useAppSelector } from '../../../app/hooks';

export const useAnimeExplorer = () => {
    const thisSeasonParams = getSeason();
    const nextSeasonParams = getSeason(true);
    const { showNSFW, globalTagExclude } = useAppSelector((state) => state.persistedSettings);

    const [skip, setSkip] = useState(true);
    const [trendPage, setTrendPage] = useState(1);
    const [cSeasonPage, setCSeasonPage] = useState(1);
    const [nSeasonPage, setNSeasonPage] = useState(1);
    const [popularPage, setPopularPage] = useState(1);
    const [scorePage, setScorePage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const getParams = (page: number) => {
        return {
            page: page,
            perPage: 30,
            isAdult: showNSFW ? undefined : false,
            tag_not_in: globalTagExclude ?? undefined,
        };
    };

    const trend = useAnimeTrendingQuery(getParams(trendPage), { skip: skip });
    const curSeason = useAnimeThisSeasonQuery(
        {
            page: cSeasonPage,
            perPage: 25,
            season: thisSeasonParams.current_season,
            seasonYear: thisSeasonParams.year,
            isAdult: showNSFW ? undefined : false,
        },
        { skip: skip },
    );
    const nxtSeason = useAnimeNextSeasonQuery(
        {
            page: nSeasonPage,
            perPage: 25,
            season: nextSeasonParams.current_season,
            seasonYear: nextSeasonParams.year,
            isAdult: showNSFW ? undefined : false,
        },
        { skip: skip },
    );
    const popular = useAnimePopularQuery(getParams(popularPage), { skip: skip });
    const top = useAnimeTopScoredQuery(getParams(scorePage), { skip: skip });
    const [isError, setIsError] = useState(false);

    const fetchAnime = (refetch = false) => {
        setSkip(false);
        if (refetch) {
            trend.refetch();
            curSeason.refetch();
            nxtSeason.refetch();
            popular.refetch();
            top.refetch();
        }
    };

    const fetchMore = (category: 'trending' | 'c_season' | 'n_season' | 'popular' | 'score') => {
        switch (category) {
            case 'trending':
                setTrendPage((prev) => prev + 1);
                break;
            case 'c_season':
                setCSeasonPage((prev) => prev + 1);
                break;
            case 'n_season':
                setNSeasonPage((prev) => prev + 1);
                break;
            case 'popular':
                setPopularPage((prev) => prev + 1);
                break;
            case 'score':
                setScorePage((prev) => prev + 1);
                break;
        }
    };

    useEffect(() => {
        if (
            trend.isError ||
            curSeason.isError ||
            nxtSeason.isError ||
            popular.isError ||
            top.isError
        ) {
            console.log(trend.error);
            setIsError(true);
        }
    }, [trend.isError, curSeason.isError, nxtSeason.isError, popular.isError, top.isError]);

    useEffect(() => {
        if (
            !trend.isUninitialized &&
            !curSeason.isUninitialized &&
            !nxtSeason.isUninitialized &&
            !popular.isUninitialized &&
            !top.isUninitialized
        ) {
            if (
                !trend.isFetching &&
                !curSeason.isFetching &&
                !nxtSeason.isFetching &&
                !popular.isFetching &&
                !top.isFetching
            ) {
                setIsLoading(false);
            }
        }
    }, [
        trend.isFetching,
        curSeason.isFetching,
        nxtSeason.isFetching,
        popular.isFetching,
        top.isFetching,
    ]);

    return {
        trendResults: trend,
        curSeasonResults: curSeason,
        nxtSeasonResults: nxtSeason,
        popularResults: popular,
        topResults: top,
        isError,
        isLoading,
        fetchAnime,
        fetchMore,
    };
};

export const useMangaExplorer = () => {
    const { showNSFW, globalTagExclude } = useAppSelector((state) => state.persistedSettings);
    const [skip, setSkip] = useState(true);
    const [trendPage, setTrendPage] = useState(1);
    const [popularPage, setPopularPage] = useState(1);
    const [topPage, setTopPage] = useState(1);

    const getParams = (page: number) => {
        return {
            page: page,
            perPage: 30,
            isAdult: showNSFW ? undefined : false,
            tag_not_in: globalTagExclude ?? undefined,
        };
    };

    const trend = useMangaTrendingQuery(getParams(trendPage), { skip: skip });
    const popular = useMangaPopularQuery(getParams(popularPage), { skip: skip });
    const top = useMangaTopScoredQuery(getParams(topPage), { skip: skip });
    const [isError, setIsError] = useState(false);

    const fetchManga = (refetch = false) => {
        setSkip(false);
        if (refetch) {
            trend.refetch();
            popular.refetch();
            top.refetch();
        }
    };

    const fetchMore = (category: 'trending' | 'popular' | 'score') => {
        switch (category) {
            case 'trending':
                setTrendPage((prev) => prev + 1);
                break;
            case 'popular':
                setPopularPage((prev) => prev + 1);
                break;
            case 'score':
                setTopPage((prev) => prev + 1);
                break;
        }
    };

    useEffect(() => {
        if (trend.isError || popular.isError || top.isError) {
            setIsError(true);
        }
    }, [trend.isError, popular.isError, top.isError]);

    return {
        trendResults: trend,
        popularResults: popular,
        topResults: top,
        isError,
        fetchManga,
        fetchMore,
    };
};

export const useManhwaExplorer = () => {
    const { showNSFW, globalTagExclude } = useAppSelector((state) => state.persistedSettings);
    const [skip, setSkip] = useState(true);
    const [trendPage, setTrendPage] = useState(1);
    const [popularPage, setPopularPage] = useState(1);
    const [topPage, setTopPage] = useState(1);
    const [isError, setIsError] = useState(false);

    const getParams = (page: number) => {
        return {
            page: page,
            perPage: 30,
            isAdult: showNSFW ? undefined : false,
            tag_not_in: globalTagExclude ?? undefined,
        };
    };

    const trend = useManhwaTrendingQuery(getParams(trendPage), { skip: skip });
    const popular = useManhwaPopularQuery(getParams(popularPage), { skip: skip });
    const top = useManhwaTopScoredQuery(getParams(topPage), { skip: skip });

    const fetchManhwa = (refetch = false) => {
        setSkip(false);
        if (refetch) {
            trend.refetch();
            popular.refetch();
            top.refetch();
        }
    };

    const fetchMore = (category: 'trending' | 'popular' | 'score') => {
        switch (category) {
            case 'trending':
                setTrendPage((prev) => prev + 1);
                break;
            case 'popular':
                setPopularPage((prev) => prev + 1);
                break;
            case 'score':
                setTopPage((prev) => prev + 1);
                break;
        }
    };

    useEffect(() => {
        if (trend.isError || popular.isError || top.isError) {
            setIsError(true);
        }
    }, [trend.isError, popular.isError, top.isError]);

    return {
        trendResults: trend,
        popularResults: popular,
        topResults: top,
        isError,
        fetchManhwa,
        fetchMore,
    };
};

export const useNovelExplorer = () => {
    const { showNSFW, globalTagExclude } = useAppSelector((state) => state.persistedSettings);
    const [skip, setSkip] = useState(true);
    const [trendPage, setTrendPage] = useState(1);
    const [popularPage, setPopularPage] = useState(1);
    const [topPage, setTopPage] = useState(1);
    const [isError, setIsError] = useState(false);

    const getParams = (page: number) => {
        return {
            page: page,
            perPage: 30,
            isAdult: showNSFW ? undefined : false,
            tag_not_in: globalTagExclude ?? undefined,
        };
    };

    const trend = useNovelTrendingQuery(getParams(trendPage), { skip: skip });
    const popular = useNovelPopularQuery(getParams(popularPage), { skip: skip });
    const top = useNovelTopScoredQuery(getParams(topPage), { skip: skip });

    const fetchNovels = (refetch = false) => {
        setSkip(false);
        if (refetch) {
            trend.refetch();
            popular.refetch();
            top.refetch();
        }
    };

    const fetchMore = (category: 'trending' | 'popular' | 'score') => {
        switch (category) {
            case 'trending':
                setTrendPage((prev) => prev + 1);
                break;
            case 'popular':
                setPopularPage((prev) => prev + 1);
                break;
            case 'score':
                setTopPage((prev) => prev + 1);
                break;
        }
    };

    useEffect(() => {
        if (trend.isError || popular.isError || top.isError) {
            setIsError(true);
        }
    }, [trend.isError, popular.isError, top.isError]);

    return {
        trendResults: trend,
        popularResults: popular,
        topResults: top,
        isError,
        fetchNovels,
        fetchMore,
    };
};
