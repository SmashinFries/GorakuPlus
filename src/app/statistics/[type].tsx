import { GeneralStatBlock } from '@/components/statistics/blocks';
import { CountryPie, FormatPie, StatusPie } from '@/components/statistics/pies';
import { RenderTabBar } from '@/components/tab';
import { useUserAnimeStats, useUserMangaStats } from '@/hooks/statistics/useStats';
import { useAppSelector } from '@/store/hooks';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import {
    NavigationState,
    Route,
    SceneMap,
    SceneRendererProps,
    TabBar,
    TabBarIndicator,
    TabBarItem,
    TabView,
} from 'react-native-tab-view';

const AnimeStatTab = () => {
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const { data, isFetching, isLoading } = useUserAnimeStats(userID);

    if (isFetching || isLoading)
        return (
            <View>
                <ActivityIndicator size={'large'} />
            </View>
        );

    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                    flexGrow: 1,
                }}
            >
                <GeneralStatBlock
                    icon="television"
                    title="Total Anime"
                    value={data.User?.statistics?.anime?.count}
                />
                <GeneralStatBlock
                    icon="play"
                    title="Episodes Watched"
                    value={data.User?.statistics?.anime?.episodesWatched}
                />
                <GeneralStatBlock
                    icon="calendar-month"
                    title="Days Watched"
                    value={
                        (data.User?.statistics?.anime?.minutesWatched / 60 / 24)?.toFixed(2) ??
                        '???'
                    }
                />
                <GeneralStatBlock
                    icon="timer-sand-full"
                    title="Days Planned"
                    value={
                        (
                            data.User?.statistics?.anime?.statuses?.find(
                                (item) => item.status === 'PLANNING',
                            )?.minutesWatched / 1440
                        )?.toFixed(2) ?? '???'
                    }
                />
                <GeneralStatBlock
                    icon="division"
                    title="Mean Score"
                    value={data.User?.statistics?.anime?.meanScore ?? '???'}
                />
                <GeneralStatBlock
                    icon="division"
                    title="Standard Deviation"
                    value={data.User?.statistics?.anime?.standardDeviation ?? '???'}
                />
                {/* <ScoreGraph scores={data.User?.statistics?.anime?.scores} /> */}
                <FormatPie data={data.User?.statistics?.anime.formats} />
                <StatusPie data={data.User?.statistics?.anime.statuses} />
                <CountryPie data={data.User?.statistics?.anime.countries} />
                {/* <ReleaseYearsLineChart data={data.User?.statistics?.anime.releaseYears} /> */}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ marginHorizontal: 10 }} numberOfLines={2} variant="titleMedium">
                    More graphs and charts coming soon!
                </Text>
            </View>
        </ScrollView>
    );
};

const MangaStatTab = () => {
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const { data, isFetching } = useUserMangaStats(userID);

    if (isFetching)
        return (
            <View>
                <ActivityIndicator size={'large'} />
            </View>
        );

    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                    flexGrow: 1,
                }}
            >
                <GeneralStatBlock
                    icon="television"
                    title="Total Manga"
                    value={data.User?.statistics?.manga?.count}
                />
                <GeneralStatBlock
                    icon="play"
                    title="Chapters Read"
                    value={data.User?.statistics?.manga?.chaptersRead}
                />
                <GeneralStatBlock
                    icon="play"
                    title="Volumes Read"
                    value={data.User?.statistics?.manga?.volumesRead}
                />
                <GeneralStatBlock
                    icon="timer-sand-full"
                    title="Chapters Planned"
                    value={
                        data.User?.statistics?.manga?.statuses?.find(
                            (item) => item.status === 'PLANNING',
                        )?.chaptersRead ?? '???'
                    }
                />
                <GeneralStatBlock
                    icon="division"
                    title="Mean Score"
                    value={data.User?.statistics?.manga?.meanScore ?? '???'}
                />
                <GeneralStatBlock
                    icon="division"
                    title="Standard Deviation"
                    value={data.User?.statistics?.manga?.standardDeviation ?? '???'}
                />
                <FormatPie data={data.User?.statistics?.manga.formats} />
                <StatusPie data={data.User?.statistics?.manga.statuses} />
                <CountryPie data={data.User?.statistics?.manga.countries} />
                {/* <ScoreGraph scores={data.User?.statistics?.anime?.scores} /> */}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ marginHorizontal: 10 }} numberOfLines={2} variant="titleMedium">
                    More graphs and charts coming soon!
                </Text>
            </View>
        </ScrollView>
    );
};

const StatisticsPage = () => {
    const layout = useWindowDimensions();
    const { type } = useLocalSearchParams<{ type: 'anime' | 'manga' }>();
    const [index, setIndex] = useState<number>(type === 'anime' ? 0 : 1);
    const [routes] = useState([
        { key: 'anime', title: 'Anime' },
        { key: 'manga', title: 'Manga' },
    ]);

    const renderScene = SceneMap({
        anime: AnimeStatTab,
        manga: MangaStatTab,
    });

    return (
        <>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={RenderTabBar}
                swipeEnabled={true}
            />
        </>
    );
};

export default StatisticsPage;
