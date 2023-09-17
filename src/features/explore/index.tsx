import { useState, useCallback, useEffect, useMemo } from 'react';
// import { SectionScroll } from './components/lists';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ExploreTabsProps } from '../../navigation/types';
import { RefreshableScroll, SectionScroll, SectionScrollMem } from './components/lists';
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
import { View, useWindowDimensions } from 'react-native';
import { useAppSelector } from '../../app/hooks';

const AnimeTab = ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'anime'>) => {
    const {
        trendResults,
        curSeasonResults,
        nxtSeasonResults,
        popularResults,
        topResults,
        fetchAnime,
        fetchMore,
        isLoading,
        isError,
    } = useAnimeExplorer();
    const { isRefreshing, onRefresh } = useRefresh(() => fetchAnime(true));
    const { width, height } = useWindowDimensions();
    const { scoreHealthBar, itemScore, scoreNumber } = useAppSelector(
        (state) => state.persistedSettings,
    );

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
            <View style={{ flex: 1, width: width, marginVertical: 10 }}>
                {isError ? (
                    <NetworkError status={trendResults?.error} />
                ) : (
                    <>
                        <SectionScrollMem
                            category_title={'Trending'}
                            data={trendResults.data}
                            isLoading={trendResults?.isLoading}
                        />
                        <SectionScrollMem
                            category_title={'Current Season'}
                            data={curSeasonResults.data}
                            isLoading={curSeasonResults.isLoading}
                        />
                        <SectionScrollMem
                            category_title={`${nextSeasonParams.same_year ? 'This' : 'Next'} ${
                                nextSeasonParams.current_season
                            }`}
                            data={nxtSeasonResults.data}
                            isLoading={nxtSeasonResults.isLoading}
                        />
                        <SectionScrollMem
                            category_title={'Popular'}
                            data={popularResults.data}
                            isLoading={popularResults.isLoading}
                        />
                        <SectionScrollMem
                            category_title={'Top Scored'}
                            data={topResults.data}
                            isLoading={topResults.isLoading}
                        />
                    </>
                )}
            </View>
        </RefreshableScroll>
    );
};

const MangaTab = ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'manga'>) => {
    const { trendResults, popularResults, topResults, isError, fetchManga, fetchMore } =
        useMangaExplorer();
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
            <View style={{ marginVertical: 10 }}>
                <SectionScrollMem
                    category_title={'Trending'}
                    data={trendResults.data}
                    isLoading={trendResults.isLoading}
                    fetchMore={() => fetchMore('trending')}
                />
                <SectionScrollMem
                    category_title={'Popular'}
                    data={popularResults.data}
                    isLoading={popularResults.isLoading}
                    fetchMore={() => fetchMore('popular')}
                />
                <SectionScrollMem
                    category_title={'Top Scored'}
                    data={topResults.data}
                    isLoading={topResults.isLoading}
                    fetchMore={() => fetchMore('score')}
                />
            </View>
        </RefreshableScroll>
    );
};

const ManhwaTab = ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'manhwa'>) => {
    const { trendResults, popularResults, topResults, isError, fetchManhwa, fetchMore } =
        useManhwaExplorer();
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
            <View style={{ marginVertical: 10 }}>
                <SectionScrollMem
                    category_title={'Trending'}
                    data={trendResults.data}
                    isLoading={trendResults.isLoading}
                    fetchMore={() => fetchMore('trending')}
                />
                <SectionScrollMem
                    category_title={'Popular'}
                    data={popularResults.data}
                    isLoading={popularResults.isLoading}
                    fetchMore={() => fetchMore('popular')}
                />
                <SectionScrollMem
                    category_title={'Top Scored'}
                    data={topResults.data}
                    isLoading={topResults.isLoading}
                    fetchMore={() => fetchMore('score')}
                />
            </View>
        </RefreshableScroll>
    );
};

const NovelsTab = ({}: MaterialTopTabScreenProps<ExploreTabsProps, 'novels'>) => {
    const { trendResults, popularResults, topResults, isError, fetchNovels, fetchMore } =
        useNovelExplorer();
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
            <View style={{ marginVertical: 10 }}>
                <SectionScrollMem
                    category_title={'Trending'}
                    data={trendResults.data}
                    isLoading={trendResults.isLoading}
                    fetchMore={() => fetchMore('trending')}
                />
                <SectionScrollMem
                    category_title={'Popular'}
                    data={popularResults.data}
                    isLoading={popularResults.isLoading}
                    fetchMore={() => fetchMore('popular')}
                />
                <SectionScrollMem
                    category_title={'Top Scored'}
                    data={topResults.data}
                    isLoading={topResults.isLoading}
                    fetchMore={() => fetchMore('score')}
                />
            </View>
        </RefreshableScroll>
    );
};

export { AnimeTab, MangaTab, ManhwaTab, NovelsTab };
