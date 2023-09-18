import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { StatsTabProps } from '../../navigation/types';
import { useUserAnimeStats } from './hooks/useStats';
import { GeneralStatBlock } from './components/blocks';
import { ScoreGraph } from './components/graphs';
import { CountryPie, FormatPie, StatusPie } from './components/pies';
import { ReleaseYearsLineChart } from './components/line';
// import { ScoreGraph } from './components/graphs';

const AnimeStatTab = ({ navigation, route }: MaterialTopTabScreenProps<StatsTabProps, 'anime'>) => {
    const { data, isFetching } = useUserAnimeStats(route.params?.userId);

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
                            ).minutesWatched / 1440
                        ).toFixed(2) ?? '???'
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

export default AnimeStatTab;
