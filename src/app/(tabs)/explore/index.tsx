import {
	AnimeExploreQuery,
	AnimeExploreQueryVariables,
	MangaExploreQuery,
	ManhuaExploreQuery,
	ManhwaExploreQuery,
	MediaType,
	NovelExploreQuery,
	useAnimeExploreQuery,
	useMangaExploreQuery,
	useManhuaExploreQuery,
	useManhwaExploreQuery,
	useNovelExploreQuery,
} from '@/api/anilist/__genereated__/gql';
import { ParticleBackground } from '@/components/animations';
import BarcodeScanner from '@/components/barcodeScanner';
import { NetworkError } from '@/components/error';
import { RefreshableScroll, SectionScroll } from '@/components/explore/lists';
import { ExploreHeader } from '@/components/headers';
import { RenderTabBar } from '@/components/tab';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAppTheme } from '@/store/theme/themes';
import { ExploreTabsProps } from '@/types/navigation';
import { subtractMonths } from '@/utils';
import { getSeason } from '@/utils/explore/helpers';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { Stack, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, View, useWindowDimensions } from 'react-native';
import { Portal } from 'react-native-paper';
import { TabView } from 'react-native-tab-view';
import { useShallow } from 'zustand/react/shallow';

const perPage = 24;
const thisSeasonParams = getSeason();
const nextSeasonParams = getSeason(true);

type ExploreSectionsProps = {
	type: MediaType;
	onRefresh: () => Promise<void>;
	status?: UseQueryResult<unknown, unknown>['status'];
	isError?: boolean;
	isLoading?: boolean;
	data:
		| AnimeExploreQuery
		| MangaExploreQuery
		| ManhwaExploreQuery
		| ManhuaExploreQuery
		| NovelExploreQuery;
};
const ExploreSections = ({
	type,
	data,
	status,
	isError,
	isLoading,
	onRefresh,
}: ExploreSectionsProps) => {
	const [t] = useTranslation();

	return (
		<View style={{ paddingVertical: 10 }}>
			{isError && <NetworkError status={status} onRefresh={onRefresh} />}
			<View>
				{type === MediaType.Manga && (
					<SectionScroll
						category_title={t('New Releases')}
						data={(data as MangaExploreQuery)?.newReleases?.media}
						viewer={data?.Viewer}
						isLoading={isLoading}
					/>
				)}
				<SectionScroll
					category_title={t('Trending')}
					data={data?.trending?.media}
					viewer={data?.Viewer}
					isLoading={isLoading}
				/>
				{type === MediaType.Anime && (
					<>
						<SectionScroll
							category_title={t('Current Season')}
							data={(data as AnimeExploreQuery)?.thisSeason?.media}
							viewer={data?.Viewer}
							isLoading={isLoading}
						/>
						<SectionScroll
							category_title={t('Next Season')}
							data={(data as AnimeExploreQuery)?.nextSeason?.media}
							viewer={data?.Viewer}
							isLoading={isLoading}
						/>
					</>
				)}
				<SectionScroll
					category_title={t('Popular')}
					data={data?.popular?.media}
					viewer={data?.Viewer}
					isLoading={isLoading}
				/>
				<SectionScroll
					category_title={t('Top Scored')}
					data={data?.top?.media}
					viewer={data?.Viewer}
					isLoading={isLoading}
				/>
			</View>
		</View>
	);
};

type ExploreTabProps = {
	type: keyof ExploreTabsProps;
};
const ExploreTab = ({ type }: ExploreTabProps) => {
	const userId = useAuthStore(useShallow((state) => state.anilist.userID));
	const { showNSFW, tagBlacklist } = useSettingsStore();

	// ugly but works
	const queryIndex =
		type === 'anime'
			? 0
			: type === 'manga'
				? 1
				: type === 'manhwa'
					? 2
					: type === 'manhua'
						? 3
						: 4;
	const animeConfig: AnimeExploreQueryVariables = {
		includeViewer: !!userId,
		perPage: perPage,
		isAdult: showNSFW ? undefined : false,
		tag_not_in: tagBlacklist ?? undefined,
		season: thisSeasonParams.current_season,
		seasonYear: thisSeasonParams.year,
		nextSeason: nextSeasonParams.current_season,
		nextSeasonYear: nextSeasonParams.year,
	};
	const mangaConfig = {
		includeViewer: !!userId,
		perPage: perPage,
		isAdult: showNSFW ? undefined : false,
		tag_not_in: tagBlacklist ?? undefined,
		startDate_greater: subtractMonths(3),
	};

	const exploreKey = { includeViewer: !!userId };

	const queries = useQueries({
		queries: [
			{
				queryKey: useAnimeExploreQuery.getKey(exploreKey),
				queryFn: useAnimeExploreQuery.fetcher(animeConfig),
				enabled: type === 'anime',
			},
			{
				queryKey: useMangaExploreQuery.getKey(exploreKey),
				queryFn: useMangaExploreQuery.fetcher(mangaConfig),
				enabled: type === 'manga',
			},
			{
				queryKey: useManhwaExploreQuery.getKey(exploreKey),
				queryFn: useManhwaExploreQuery.fetcher(mangaConfig),
				enabled: type === 'manhwa',
			},
			{
				queryKey: useManhuaExploreQuery.getKey(exploreKey),
				queryFn: useManhuaExploreQuery.fetcher(mangaConfig),
				enabled: type === 'manhua',
			},
			{
				queryKey: useNovelExploreQuery.getKey(exploreKey),
				queryFn: useNovelExploreQuery.fetcher(mangaConfig),
				enabled: type === 'novels',
			},
		],
	});

	const onRefresh = async () => {
		await queries[queryIndex].refetch();
	};

	return (
		<>
			<RefreshableScroll onRefresh={onRefresh} refreshing={queries[queryIndex].isRefetching}>
				<ExploreSections
					type={type === 'anime' ? MediaType.Anime : MediaType.Manga}
					data={queries[queryIndex].data}
					onRefresh={onRefresh}
					isError={queries[queryIndex].isError}
					isLoading={queries[queryIndex]?.isLoading}
					status={queries[queryIndex]?.status}
				/>
			</RefreshableScroll>
		</>
	);
};

const ExplorePage = () => {
	const layout = useWindowDimensions();
	const { exploreTabOrder, exploreTabs } = useSettingsStore();
	const { colors } = useAppTheme();

	const [isBCScannerVis, setIsBCScannerVis] = useState(false);

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
			return <ExploreTab type={route.key} />;
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

	// Allows hardware back to close camera
	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
				setIsBCScannerVis(false);
				return true;
			};

			const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

			return () => backHandler.remove();
		}, []),
	);

	return (
		<>
			<Stack.Screen
				options={{
					header: (props) => (
						<ExploreHeader {...props} showScanner={() => setIsBCScannerVis(true)} />
					),
				}}
			/>
			<ParticleBackground backgroundColor={colors.background} />
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
				renderLazyPlaceholder={(_props) => <View />}
			/>
			<Portal>
				<BarcodeScanner
					visible={isBCScannerVis}
					onDismiss={() => setIsBCScannerVis(false)}
					openScanner={() => setIsBCScannerVis(true)}
				/>
			</Portal>
		</>
	);
};

export default ExplorePage;
