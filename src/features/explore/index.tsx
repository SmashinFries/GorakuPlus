import { RefreshControl, useWindowDimensions, View } from 'react-native';
import { useAnimeThisSeasonQuery } from '../../app/services/anilist/enhanced';
import {
    MediaSeason,
    useAnimeNextSeasonQuery,
    useAnimePopularQuery,
    useAnimeTopScoredQuery,
    useAnimeTrendingQuery,
    useLazyMangaPopularQuery,
    useLazyMangaTopScoredQuery,
    useLazyMangaTrendingQuery,
    useMangaPopularQuery,
    useMangaTopScoredQuery,
    useMangaTrendingQuery,
    useNovelPopularQuery,
    useNovelTopScoredQuery,
    useNovelTrendingQuery,
} from '../../app/services/anilist/generated-anilist';
import { useState, useCallback, useEffect } from 'react';
// import { SectionScroll } from './components/lists';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import { ExploreTabsProps } from '../../navigation/types';
import { Text } from 'react-native-paper';
import { RefreshableScroll, SectionScroll } from './components/lists';
import { getSeason } from './helpers/helpers';
import { NetworkError } from '../../components/error';
import { useFocusEffect } from '@react-navigation/native';
import {
    useAnimeExplorer,
    useMangaExplorer,
    useManhwaExplorer,
    useNovelExplorer,
} from './hooks/data';
import { useRefresh } from '../../hooks/refresh';

const AnimeTab = ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'anime'>) => {
    const {
        trendResults,
        curSeasonResults,
        nxtSeasonResults,
        popularResults,
        topResults,
        fetchAnime,
        isError,
    } = useAnimeExplorer();
    const { isRefreshing, onRefresh } = useRefresh(() => fetchAnime(true));

    const nextSeasonParams = getSeason(true);

    useFocusEffect(
        useCallback(() => {
            fetchAnime();
        }, []),
    );

    if (isError) {
        // @ts-ignore
        return <NetworkError status={trendResults?.error} />;
        // return null;
    }

    return (
        <RefreshableScroll onRefresh={onRefresh} refreshing={isRefreshing}>
            <View style={{ paddingVertical: 10 }}>
                <SectionScroll
                    category_title={'Trending'}
                    data={trendResults.data}
                    isLoading={trendResults.isLoading}
                />
                <SectionScroll
                    category_title={'Current Season'}
                    data={curSeasonResults.data}
                    isLoading={curSeasonResults.isLoading}
                />
                <SectionScroll
                    category_title={`${nextSeasonParams.same_year ? 'This' : 'Next'} ${
                        nextSeasonParams.current_season
                    }`}
                    data={nxtSeasonResults.data}
                    isLoading={nxtSeasonResults.isLoading}
                />
                <SectionScroll
                    category_title={'Popular'}
                    data={popularResults.data}
                    isLoading={popularResults.isLoading}
                />
                <SectionScroll
                    category_title={'Top Scored'}
                    data={topResults.data}
                    isLoading={topResults.isLoading}
                />
            </View>
        </RefreshableScroll>
    );
};

const MangaTab = ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'manga'>) => {
    const { trendResults, popularResults, topResults, isError, fetchManga } = useMangaExplorer();
    const { isRefreshing, onRefresh } = useRefresh(() => fetchManga(true));

    useFocusEffect(
        useCallback(() => {
            fetchManga();
        }, []),
    );

    if (isError) {
        return <NetworkError status={popularResults.status} />;
    }

    return (
        <RefreshableScroll onRefresh={onRefresh} refreshing={isRefreshing}>
            <SectionScroll
                category_title={'Trending'}
                data={trendResults.data}
                isLoading={trendResults.isLoading}
            />
            <SectionScroll
                category_title={'Popular'}
                data={popularResults.data}
                isLoading={popularResults.isLoading}
            />
            <SectionScroll
                category_title={'Top Scored'}
                data={topResults.data}
                isLoading={topResults.isLoading}
            />
        </RefreshableScroll>
    );
};

const ManhwaTab = ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'manhwa'>) => {
    const { trendResults, popularResults, topResults, isError, fetchManhwa } = useManhwaExplorer();
    const { isRefreshing, onRefresh } = useRefresh(() => fetchManhwa(true));

    useFocusEffect(
        useCallback(() => {
            fetchManhwa();
        }, []),
    );

    if (isError) {
        return <NetworkError status={popularResults.status} />;
    }

    return (
        <RefreshableScroll onRefresh={onRefresh} refreshing={isRefreshing}>
            <SectionScroll
                category_title={'Trending'}
                data={trendResults.data}
                isLoading={trendResults.isLoading}
            />
            <SectionScroll
                category_title={'Popular'}
                data={popularResults.data}
                isLoading={popularResults.isLoading}
            />
            <SectionScroll
                category_title={'Top Scored'}
                data={topResults.data}
                isLoading={topResults.isLoading}
            />
        </RefreshableScroll>
    );
};

const NovelsTab = ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'novels'>) => {
    const { trendResults, popularResults, topResults, isError, fetchNovels } = useNovelExplorer();
    const { isRefreshing, onRefresh } = useRefresh(() => fetchNovels(true));

    useFocusEffect(
        useCallback(() => {
            fetchNovels();
        }, []),
    );

    if (isError) {
        return <NetworkError status={trendResults.status} />;
    }

    return (
        <RefreshableScroll onRefresh={onRefresh} refreshing={isRefreshing}>
            <SectionScroll
                category_title={'Trending'}
                data={trendResults.data}
                isLoading={trendResults.isLoading}
            />
            <SectionScroll
                category_title={'Popular'}
                data={popularResults.data}
                isLoading={popularResults.isLoading}
            />
            <SectionScroll
                category_title={'Top Scored'}
                data={topResults.data}
                isLoading={topResults.isLoading}
            />
        </RefreshableScroll>
    );
};

export { AnimeTab, MangaTab, ManhwaTab, NovelsTab };
