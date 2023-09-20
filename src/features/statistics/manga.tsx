import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { StatsStackProps, StatsTabProps } from '../../navigation/types';
import { GeneralStatBlock } from './components/blocks';
import { useUserMangaStats } from './hooks/useStats';
import { CountryPie, FormatPie, StatusPie } from './components/pies';

const MangaStatTab = ({ navigation, route }: MaterialTopTabScreenProps<StatsTabProps, 'manga'>) => {
    const { data, isFetching } = useUserMangaStats(route.params?.userId);

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

export default MangaStatTab;
