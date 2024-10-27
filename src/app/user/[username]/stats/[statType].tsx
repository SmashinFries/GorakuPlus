import {
	MediaType,
	useUserAnimeStatsQuery,
	useUserMangaStatsQuery,
} from '@/api/anilist/__genereated__/gql';
import { GorakuActivityIndicator } from '@/components/loading';
import { GeneralStatBlock } from '@/components/statistics/blocks';
import { CountryPie, FormatPie, StatusPie } from '@/components/statistics/pies';
import { RenderTabBar } from '@/components/tab';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { SceneRendererProps, TabView } from 'react-native-tab-view';

type StatTabProps = { username: string };

const AnimeStatTab = ({ username }: StatTabProps) => {
	const { data, isFetching, isLoading } = useUserAnimeStatsQuery(
		{ username },
		{ enabled: !!username },
	);

	if (isFetching || isLoading)
		return (
			<View>
				<GorakuActivityIndicator />
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

const MangaStatTab = ({ username }: StatTabProps) => {
	const { data, isFetching } = useUserMangaStatsQuery({ username }, { enabled: !!username });

	if (isFetching)
		return (
			<View>
				<GorakuActivityIndicator />
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
	const { username, statType } = useLocalSearchParams<{
		username: string;
		statType: 'anime' | 'manga';
	}>();
	const [index, setIndex] = useState<number>(statType === 'anime' ? 0 : 1);
	const [routes] = useState<{ key: 'anime' | 'manga'; title: string }[]>([
		{ key: 'anime', title: 'Anime' },
		{ key: 'manga', title: 'Manga' },
	]);

	const renderScene = ({
		route,
	}: SceneRendererProps & { route: { key: 'anime' | 'manga'; title: string } }) => {
		switch (route.key) {
			case 'anime':
				return <AnimeStatTab username={username} />;
			case 'manga':
				return <MangaStatTab username={username} />;
			default:
				return null;
		}
	};

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
