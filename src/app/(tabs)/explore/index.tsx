import { NetworkError } from '@/components/error';
import { RefreshableScroll, SectionScrollMem } from '@/components/explore/lists';
import { RenderTabBar } from '@/components/tab';
import {
    useAnimeExplorer,
    useMangaExplorer,
    useManhuaExplorer,
    useManhwaExplorer,
    useNovelExplorer,
} from '@/hooks/explore/data';
import { useRefresh } from '@/hooks/refresh';
import { useAppSelector } from '@/store/hooks';
import { ExploreTabsProps } from '@/types/navigation';
import { useCallback, useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TabBar, TabView } from 'react-native-tab-view';

const AnimeTab = () => {
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
    // const { scoreHealthBar, scoreNumber } = useAppSelector((state) => state.persistedSettings);

    // const nextSeasonParams = getSeason(true);

    useEffect(() => {
        fetchAnime();
    }, []);

    if (isError) {
        // @ts-ignore
        return <NetworkError status={trendResults?.error} />;
        // return null;
    }

    return (
        <RefreshableScroll onRefresh={onRefresh} refreshing={isRefreshing}>
            <View style={{ flex: 1, width: width, marginVertical: 10 }}>
                {isError ? (
                    <NetworkError status={trendResults?.status} />
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
                            // category_title={`${nextSeasonParams.same_year ? 'This' : 'Next'} ${
                            //     nextSeasonParams.current_season
                            // }`}
                            category_title={'Next Season'}
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

const MangaTab = () => {
    const {
        trendResults,
        popularResults,
        topResults,
        releasesResults,
        isError,
        fetchManga,
        fetchMore,
    } = useMangaExplorer();
    const { isRefreshing, onRefresh } = useRefresh(() => fetchManga(true));

    useEffect(() => {
        fetchManga();
    }, []);

    if (isError) {
        return <NetworkError status={popularResults.status} />;
    }

    return (
        <RefreshableScroll onRefresh={onRefresh} refreshing={isRefreshing}>
            <View style={{ marginVertical: 10 }}>
                <SectionScrollMem
                    category_title={'New Releases'}
                    data={releasesResults.data}
                    isLoading={releasesResults.isLoading}
                />
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

const ManhwaTab = () => {
    const {
        trendResults,
        popularResults,
        topResults,
        releasesResults,
        isError,
        fetchManhwa,
        fetchMore,
    } = useManhwaExplorer();
    const { isRefreshing, onRefresh } = useRefresh(() => fetchManhwa(true));

    useEffect(() => {
        fetchManhwa();
    }, []);

    if (isError) {
        return <NetworkError status={popularResults.status} />;
    }

    return (
        <RefreshableScroll onRefresh={onRefresh} refreshing={isRefreshing}>
            <View style={{ marginVertical: 10 }}>
                <SectionScrollMem
                    category_title={'New Releases'}
                    data={releasesResults.data}
                    isLoading={releasesResults.isLoading}
                />
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

const ManhuaTab = () => {
    const {
        trendResults,
        popularResults,
        topResults,
        releasesResults,
        isError,
        fetchManhua,
        fetchMore,
    } = useManhuaExplorer();
    const { isRefreshing, onRefresh } = useRefresh(() => fetchManhua(true));

    useEffect(() => {
        fetchManhua();
    }, []);

    if (isError) {
        return <NetworkError status={popularResults.status} />;
    }

    return (
        <RefreshableScroll onRefresh={onRefresh} refreshing={isRefreshing}>
            <View style={{ marginVertical: 10 }}>
                <SectionScrollMem
                    category_title={'New Releases'}
                    data={releasesResults.data}
                    isLoading={releasesResults.isLoading}
                />
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

const NovelsTab = () => {
    const {
        trendResults,
        popularResults,
        topResults,
        releasesResults,
        isError,
        fetchNovels,
        fetchMore,
    } = useNovelExplorer();
    const { isRefreshing, onRefresh } = useRefresh(() => fetchNovels(true));

    useEffect(() => {
        fetchNovels();
    }, []);

    if (isError) {
        return <NetworkError status={trendResults.status} />;
    }

    return (
        <RefreshableScroll onRefresh={onRefresh} refreshing={isRefreshing}>
            <View style={{ marginVertical: 10 }}>
                <SectionScrollMem
                    category_title={'New Releases'}
                    data={releasesResults.data}
                    isLoading={releasesResults.isLoading}
                />
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

const ExplorePage = () => {
    const layout = useWindowDimensions();
    const { colors } = useTheme();
    const { exploreTabs, exploreTabOrder } = useAppSelector((state) => state.persistedSettings);

    const [routes, setRoutes] = useState<{ key: string; title: string }[]>(
        exploreTabOrder
            .filter((tabName) => exploreTabs.includes(tabName))
            .map((tab) => {
                return { key: tab, title: tab };
            }),
    );

    const [index, setIndex] = useState(0);

    const renderScene = useCallback(
        ({ route }: { route: { key: keyof ExploreTabsProps; title: keyof ExploreTabsProps } }) => {
            switch (route.key) {
                case 'anime':
                    return <AnimeTab />;
                case 'manga':
                    return <MangaTab />;
                case 'manhwa':
                    return <ManhwaTab />;
                case 'manhua':
                    return <ManhuaTab />;
                case 'novels':
                    return <NovelsTab />;
            }
        },
        [],
    );

    useEffect(() => {
        setRoutes(
            exploreTabOrder
                .filter((tabName) => exploreTabs.includes(tabName))
                .map((tab) => {
                    return { key: tab, title: tab };
                }),
        );
    }, [exploreTabOrder, exploreTabs]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={RenderTabBar}
            swipeEnabled={true}
            lazy={true}
            renderLazyPlaceholder={(props) => <View />}
        />
    );
};

export default ExplorePage;
