import {
	useAnimeExploreQuery,
	useMangaExploreQuery,
	useManhuaExploreQuery,
	useManhwaExploreQuery,
	useNovelExploreQuery,
} from '@/api/anilist/__genereated__/gql';
import { NetworkError } from '@/components/error';
import { RefreshableScroll, SectionScroll, SectionScrollMem } from '@/components/explore/lists';
import { RenderTabBar } from '@/components/tab';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { ExploreTabsProps } from '@/types/navigation';
import { subtractMonths } from '@/utils';
import { getSeason } from '@/utils/explore/helpers';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Button, useTheme } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { TabView } from 'react-native-tab-view';

const perPage = 24;

const AnimeTab = () => {
	const thisSeasonParams = getSeason();
	const nextSeasonParams = getSeason(true);
	const { showNSFW, tagBlacklist } = useSettingsStore();
	const animeQuery = useAnimeExploreQuery({
		perPage: perPage,
		isAdult: showNSFW ? undefined : false,
		tag_not_in: tagBlacklist ?? undefined,
		season: thisSeasonParams.current_season,
		seasonYear: thisSeasonParams.year,
		nextSeason: nextSeasonParams.current_season,
		nextSeasonYear: nextSeasonParams.year,
	});
	const { width, height } = useWindowDimensions();
	const [t] = useTranslation();

	const onRefresh = async () => {
		await animeQuery.refetch();
	};

	return (
		<RefreshableScroll onRefresh={onRefresh} refreshing={animeQuery.isRefetching}>
			<View style={{ flex: 1, width: width, marginVertical: 10 }}>
				{animeQuery.isFetching && (
					<Animated.View
						exiting={FadeOut}
						style={{ alignItems: 'center', justifyContent: 'center' }}
					>
						<ActivityIndicator size="large" />
					</Animated.View>
				)}
				{animeQuery && <NetworkError status={animeQuery?.status} onRefresh={onRefresh} />}
				{animeQuery.data && !animeQuery.isError && !animeQuery.isFetching && (
					<Animated.View entering={FadeIn}>
						{/* <Button onPress={() => console.log(animeExplore.data?.trending)}>
							TEST
						</Button> */}
						<SectionScroll
							category_title={t('Trending')}
							data={animeQuery.data.trending?.media}
							isLoading={animeQuery?.isLoading}
						/>
						<SectionScroll
							category_title={t('Current Season')}
							data={animeQuery.data.thisSeason.media}
							isLoading={animeQuery.isLoading}
						/>
						<SectionScroll
							category_title={t('Next Season')}
							data={animeQuery.data.nextSeason.media}
							isLoading={animeQuery.isLoading}
						/>
						<SectionScroll
							category_title={t('Popular')}
							data={animeQuery.data.popular.media}
							isLoading={animeQuery.isLoading}
						/>
						<SectionScroll
							category_title={t('Top Scored')}
							data={animeQuery.data.top.media}
							isLoading={animeQuery.isLoading}
						/>
					</Animated.View>
				)}
			</View>
		</RefreshableScroll>
	);
};

const MangaTab = () => {
	const { showNSFW, tagBlacklist } = useSettingsStore();
	const mangaQuery = useMangaExploreQuery({
		perPage: perPage,
		isAdult: showNSFW ? undefined : false,
		tag_not_in: tagBlacklist ?? undefined,
		startDate_greater: subtractMonths(3),
	});
	const [t] = useTranslation();

	const onRefresh = async () => {
		await mangaQuery.refetch();
	};

	return (
		<RefreshableScroll onRefresh={onRefresh} refreshing={mangaQuery.isRefetching}>
			<View style={{ marginVertical: 10 }}>
				{mangaQuery.isFetching && (
					<Animated.View
						exiting={FadeOut}
						style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
					>
						<ActivityIndicator size="large" />
					</Animated.View>
				)}
				{mangaQuery.isError && (
					<NetworkError status={mangaQuery?.status} onRefresh={onRefresh} />
				)}
				{mangaQuery.data && !mangaQuery.isError && !mangaQuery.isFetching && (
					<Animated.View entering={FadeIn}>
						<SectionScroll
							category_title={t('New Releases')}
							data={mangaQuery.data.newReleases?.media}
							isLoading={mangaQuery?.isLoading}
						/>
						<SectionScroll
							category_title={t('Trending')}
							data={mangaQuery.data.trending?.media}
							isLoading={mangaQuery?.isLoading}
						/>
						<SectionScroll
							category_title={t('Popular')}
							data={mangaQuery.data.popular.media}
							isLoading={mangaQuery.isLoading}
						/>
						<SectionScroll
							category_title={t('Top Scored')}
							data={mangaQuery.data.top.media}
							isLoading={mangaQuery.isLoading}
						/>
					</Animated.View>
				)}
			</View>
		</RefreshableScroll>
	);
};

const ManhwaTab = () => {
	const { showNSFW, tagBlacklist } = useSettingsStore();
	const manhwaQuery = useManhwaExploreQuery({
		perPage: perPage,
		isAdult: showNSFW ? undefined : false,
		tag_not_in: tagBlacklist ?? undefined,
		startDate_greater: subtractMonths(3),
	});
	const [t] = useTranslation();

	const onRefresh = async () => {
		await manhwaQuery.refetch();
	};

	return (
		<RefreshableScroll onRefresh={onRefresh} refreshing={manhwaQuery.isRefetching}>
			<View style={{ marginVertical: 10 }}>
				{manhwaQuery.isFetching && (
					<Animated.View
						exiting={FadeOut}
						style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
					>
						<ActivityIndicator size="large" />
					</Animated.View>
				)}
				{manhwaQuery.isError && (
					<NetworkError status={manhwaQuery?.status} onRefresh={onRefresh} />
				)}
				{manhwaQuery.data && !manhwaQuery.isError && !manhwaQuery.isFetching && (
					<Animated.View entering={FadeIn}>
						<SectionScroll
							category_title={t('New Releases')}
							data={manhwaQuery.data.newReleases?.media}
							isLoading={manhwaQuery?.isLoading}
						/>
						<SectionScroll
							category_title={t('Trending')}
							data={manhwaQuery.data.trending?.media}
							isLoading={manhwaQuery?.isLoading}
						/>
						<SectionScroll
							category_title={t('Popular')}
							data={manhwaQuery.data.popular.media}
							isLoading={manhwaQuery.isLoading}
						/>
						<SectionScroll
							category_title={t('Top Scored')}
							data={manhwaQuery.data.top.media}
							isLoading={manhwaQuery.isLoading}
						/>
					</Animated.View>
				)}
			</View>
		</RefreshableScroll>
	);
};

const ManhuaTab = () => {
	const { showNSFW, tagBlacklist } = useSettingsStore();
	const manhuaQuery = useManhuaExploreQuery({
		perPage: 20,
		isAdult: showNSFW ? undefined : false,
		tag_not_in: tagBlacklist ?? undefined,
		startDate_greater: subtractMonths(3),
	});
	const [t] = useTranslation();

	const onRefresh = async () => {
		await manhuaQuery.refetch();
	};

	return (
		<RefreshableScroll onRefresh={onRefresh} refreshing={manhuaQuery.isRefetching}>
			<View style={{ marginVertical: 10 }}>
				{manhuaQuery.isFetching && (
					<Animated.View
						exiting={FadeOut}
						style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
					>
						<ActivityIndicator size="large" />
					</Animated.View>
				)}
				{manhuaQuery.isError && (
					<NetworkError status={manhuaQuery?.status} onRefresh={onRefresh} />
				)}
				{manhuaQuery.data && !manhuaQuery.isError && !manhuaQuery.isFetching && (
					<Animated.View entering={FadeIn}>
						<SectionScrollMem
							category_title={t('New Releases')}
							data={manhuaQuery.data.newReleases?.media}
							isLoading={manhuaQuery?.isLoading}
						/>
						<SectionScrollMem
							category_title={t('Trending')}
							data={manhuaQuery.data.trending?.media}
							isLoading={manhuaQuery?.isLoading}
						/>
						<SectionScrollMem
							category_title={t('Popular')}
							data={manhuaQuery.data.popular.media}
							isLoading={manhuaQuery.isLoading}
						/>
						<SectionScrollMem
							category_title={t('Top Scored')}
							data={manhuaQuery.data.top.media}
							isLoading={manhuaQuery.isLoading}
						/>
					</Animated.View>
				)}
			</View>
		</RefreshableScroll>
	);
};

const NovelsTab = () => {
	const { showNSFW, tagBlacklist } = useSettingsStore();
	const novelQuery = useNovelExploreQuery({
		perPage: 20,
		isAdult: showNSFW ? undefined : false,
		tag_not_in: tagBlacklist ?? undefined,
		startDate_greater: subtractMonths(3),
	});
	const [t] = useTranslation();

	const onRefresh = async () => {
		await novelQuery.refetch();
	};

	return (
		<RefreshableScroll onRefresh={onRefresh} refreshing={novelQuery.isRefetching}>
			<View style={{ marginVertical: 10 }}>
				{novelQuery.isFetching && (
					<Animated.View
						exiting={FadeOut}
						style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
					>
						<ActivityIndicator size="large" />
					</Animated.View>
				)}
				{novelQuery.isError && (
					<NetworkError status={novelQuery?.status} onRefresh={onRefresh} />
				)}
				{novelQuery.data && !novelQuery.isError && !novelQuery.isFetching && (
					<Animated.View entering={FadeIn}>
						<SectionScrollMem
							category_title={t('New Releases')}
							data={novelQuery.data.newReleases?.media}
							isLoading={novelQuery?.isLoading}
						/>
						<SectionScrollMem
							category_title={t('Trending')}
							data={novelQuery.data.trending?.media}
							isLoading={novelQuery?.isLoading}
						/>
						<SectionScrollMem
							category_title={t('Popular')}
							data={novelQuery.data.popular.media}
							isLoading={novelQuery.isLoading}
						/>
						<SectionScrollMem
							category_title={t('Top Scored')}
							data={novelQuery.data.top.media}
							isLoading={novelQuery.isLoading}
						/>
					</Animated.View>
				)}
			</View>
		</RefreshableScroll>
	);
};

const ExplorePage = () => {
	const layout = useWindowDimensions();
	const { colors } = useTheme();
	const { exploreTabOrder, exploreTabs } = useSettingsStore();

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
		<>
			{/* <LinearGradient
                colors={[colors.background, rgbToRgba(colors.primaryContainer, 0.1)]}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                }}
            /> */}
			<TabView
				navigationState={{ index, routes }}
				// @ts-ignore
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={(props) => (
					<RenderTabBar {...props} disableAutoWidth={routes.length < 4} />
				)}
				swipeEnabled={true}
				lazy={true}
				renderLazyPlaceholder={(props) => <View />}
			/>
		</>
	);
};

export default ExplorePage;
