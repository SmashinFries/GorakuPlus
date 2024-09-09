import {
	AnimeExploreQuery,
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
import { QuickActionBottomSheet, QuickActionProps } from '@/components/bottomsheets';
import { NetworkError } from '@/components/error';
import { RefreshableScroll, SectionScroll, SectionScrollMem } from '@/components/explore/lists';
import { RenderTabBar } from '@/components/tab';
import { useQuickActionSheet } from '@/hooks/useQuickAction';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { ExploreTabsProps } from '@/types/navigation';
import { subtractMonths } from '@/utils';
import { getSeason } from '@/utils/explore/helpers';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Button, useTheme } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { TabView } from 'react-native-tab-view';

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
	// const quickActionRef = useRef<BottomSheetModal>();
	const { quickActionRef, selectedMedia, onMediaLongSelect } = useQuickActionSheet();
	const [t] = useTranslation();
	// const [selectedMedia, setSelectedMedia] = useState<QuickActionProps>();

	// const onLongSelect = (props: QuickActionProps) => {
	// 	setSelectedMedia({ ...props });
	// 	quickActionRef.current?.present();
	// };

	return (
		<View style={{ marginVertical: 10 }}>
			{isError && <NetworkError status={status} onRefresh={onRefresh} />}
			<View style={{ gap: 20 }}>
				{type === MediaType.Manga && (
					<SectionScroll
						category_title={t('New Releases')}
						data={(data as MangaExploreQuery)?.newReleases?.media}
						isLoading={isLoading}
						onLongSelect={onMediaLongSelect}
					/>
				)}
				<SectionScroll
					category_title={t('Trending')}
					data={data?.trending?.media}
					isLoading={isLoading}
					onLongSelect={onMediaLongSelect}
				/>
				{type === MediaType.Anime && (
					<>
						<SectionScroll
							category_title={t('Current Season')}
							data={(data as AnimeExploreQuery)?.thisSeason?.media}
							isLoading={isLoading}
							onLongSelect={onMediaLongSelect}
						/>
						<SectionScroll
							category_title={t('Next Season')}
							data={(data as AnimeExploreQuery)?.nextSeason?.media}
							isLoading={isLoading}
							onLongSelect={onMediaLongSelect}
						/>
					</>
				)}
				<SectionScroll
					category_title={t('Popular')}
					data={data?.popular?.media}
					isLoading={isLoading}
					onLongSelect={onMediaLongSelect}
				/>
				<SectionScroll
					category_title={t('Top Scored')}
					data={data?.top?.media}
					isLoading={isLoading}
					onLongSelect={onMediaLongSelect}
				/>
			</View>
			<QuickActionBottomSheet ref={quickActionRef} {...selectedMedia} />
		</View>
	);
};

// const AnimeTab = () => {
// 	const { showNSFW, tagBlacklist } = useSettingsStore();
// 	const animeQuery = useAnimeExploreQuery(
// 		{
// 			perPage: perPage,
// 			isAdult: showNSFW ? undefined : false,
// 			tag_not_in: tagBlacklist ?? undefined,
// 			season: thisSeasonParams.current_season,
// 			seasonYear: thisSeasonParams.year,
// 			nextSeason: nextSeasonParams.current_season,
// 			nextSeasonYear: nextSeasonParams.year,
// 		},
// 		{ refetchOnMount: false, refetchOnWindowFocus: false, refetchOnReconnect: false },
// 	);
// 	const [t] = useTranslation();

// 	const onRefresh = async () => {
// 		await animeQuery.refetch();
// 	};

// 	return (
// 		<RefreshableScroll onRefresh={onRefresh} refreshing={animeQuery.isRefetching}>
// 			<View style={{ marginVertical: 10 }}>
// 				{animeQuery.isError && (
// 					<NetworkError status={animeQuery?.status} onRefresh={onRefresh} />
// 				)}
// 				<View>
// 					<SectionScroll
// 						category_title={t('Trending')}
// 						data={animeQuery.data?.trending?.media}
// 						isLoading={animeQuery?.isLoading}
// 					/>
// 					<SectionScroll
// 						category_title={t('Current Season')}
// 						data={animeQuery.data?.thisSeason?.media}
// 						isLoading={animeQuery.isLoading}
// 					/>
// 					<SectionScroll
// 						category_title={t('Next Season')}
// 						data={animeQuery.data?.nextSeason?.media}
// 						isLoading={animeQuery.isLoading}
// 					/>
// 					<SectionScroll
// 						category_title={t('Popular')}
// 						data={animeQuery.data?.popular?.media}
// 						isLoading={animeQuery.isLoading}
// 					/>
// 					<SectionScroll
// 						category_title={t('Top Scored')}
// 						data={animeQuery.data?.top?.media}
// 						isLoading={animeQuery.isLoading}
// 					/>
// 				</View>
// 				{/* )} */}
// 			</View>
// 		</RefreshableScroll>
// 	);
// };

type ExploreTabProps = {
	type: keyof ExploreTabsProps;
};
const ExploreTab = ({ type }: ExploreTabProps) => {
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
	const animeConfig = {
		perPage: perPage,
		isAdult: showNSFW ? undefined : false,
		tag_not_in: tagBlacklist ?? undefined,
		season: thisSeasonParams.current_season,
		seasonYear: thisSeasonParams.year,
		nextSeason: nextSeasonParams.current_season,
		nextSeasonYear: nextSeasonParams.year,
	};
	const mangaConfig = {
		perPage: perPage,
		isAdult: showNSFW ? undefined : false,
		tag_not_in: tagBlacklist ?? undefined,
		startDate_greater: subtractMonths(3),
	};
	// const mangaQuery = useMangaExploreQuery(
	// 	{
	// 		perPage: perPage,
	// 		isAdult: showNSFW ? undefined : false,
	// 		tag_not_in: tagBlacklist ?? undefined,
	// 		startDate_greater: subtractMonths(3),
	// 	},
	// 	{ refetchOnMount: false, refetchOnWindowFocus: false, refetchOnReconnect: false },
	// );

	const queries = useQueries({
		queries: [
			{
				queryKey: useAnimeExploreQuery.getKey(),
				queryFn: useAnimeExploreQuery.fetcher(animeConfig),
				enabled: type === 'anime',
			},
			{
				queryKey: useMangaExploreQuery.getKey(),
				queryFn: useMangaExploreQuery.fetcher(mangaConfig),
				enabled: type === 'manga',
			},
			{
				queryKey: useManhwaExploreQuery.getKey(),
				queryFn: useManhwaExploreQuery.fetcher(mangaConfig),
				enabled: type === 'manhwa',
			},
			{
				queryKey: useManhuaExploreQuery.getKey(),
				queryFn: useManhuaExploreQuery.fetcher(mangaConfig),
				enabled: type === 'manhua',
			},
			{
				queryKey: useNovelExploreQuery.getKey(),
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

// const ManhwaTab = () => {
// 	const { showNSFW, tagBlacklist } = useSettingsStore();
// 	const manhwaQuery = useManhwaExploreQuery(
// 		{
// 			perPage: perPage,
// 			isAdult: showNSFW ? undefined : false,
// 			tag_not_in: tagBlacklist ?? undefined,
// 			startDate_greater: subtractMonths(3),
// 		},
// 		{ refetchOnMount: false, refetchOnWindowFocus: false, refetchOnReconnect: false },
// 	);
// 	const [t] = useTranslation();

// 	const onRefresh = async () => {
// 		await manhwaQuery.refetch();
// 	};

// 	return (
// 		<RefreshableScroll onRefresh={onRefresh} refreshing={manhwaQuery.isRefetching}>
// 			<View style={{ marginVertical: 10 }}>
// 				{manhwaQuery.isFetching && (
// 					<Animated.View
// 						exiting={FadeOut}
// 						style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
// 					>
// 						<ActivityIndicator size="large" />
// 					</Animated.View>
// 				)}
// 				{manhwaQuery.isError && (
// 					<NetworkError status={manhwaQuery?.status} onRefresh={onRefresh} />
// 				)}
// 				<View>
// 					<SectionScroll
// 						category_title={t('New Releases')}
// 						data={manhwaQuery.data?.newReleases?.media}
// 						isLoading={manhwaQuery?.isLoading}
// 					/>
// 					<SectionScroll
// 						category_title={t('Trending')}
// 						data={manhwaQuery.data?.trending?.media}
// 						isLoading={manhwaQuery?.isLoading}
// 					/>
// 					<SectionScroll
// 						category_title={t('Popular')}
// 						data={manhwaQuery.data?.popular?.media}
// 						isLoading={manhwaQuery.isLoading}
// 					/>
// 					<SectionScroll
// 						category_title={t('Top Scored')}
// 						data={manhwaQuery.data?.top?.media}
// 						isLoading={manhwaQuery.isLoading}
// 					/>
// 				</View>
// 			</View>
// 		</RefreshableScroll>
// 	);
// };

// const ManhuaTab = () => {
// 	const { showNSFW, tagBlacklist } = useSettingsStore();
// 	const manhuaQuery = useManhuaExploreQuery({
// 		perPage: 20,
// 		isAdult: showNSFW ? undefined : false,
// 		tag_not_in: tagBlacklist ?? undefined,
// 		startDate_greater: subtractMonths(3),
// 	});
// 	const [t] = useTranslation();

// 	const onRefresh = async () => {
// 		await manhuaQuery.refetch();
// 	};

// 	return (
// 		<RefreshableScroll onRefresh={onRefresh} refreshing={manhuaQuery.isRefetching}>
// 			<View style={{ marginVertical: 10 }}>
// 				{manhuaQuery.isFetching && (
// 					<Animated.View
// 						exiting={FadeOut}
// 						style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
// 					>
// 						<ActivityIndicator size="large" />
// 					</Animated.View>
// 				)}
// 				{manhuaQuery.isError && (
// 					<NetworkError status={manhuaQuery?.status} onRefresh={onRefresh} />
// 				)}
// 				<View>
// 					<SectionScrollMem
// 						category_title={t('New Releases')}
// 						data={manhuaQuery.data?.newReleases?.media}
// 						isLoading={manhuaQuery?.isLoading}
// 					/>
// 					<SectionScrollMem
// 						category_title={t('Trending')}
// 						data={manhuaQuery.data?.trending?.media}
// 						isLoading={manhuaQuery?.isLoading}
// 					/>
// 					<SectionScrollMem
// 						category_title={t('Popular')}
// 						data={manhuaQuery.data?.popular?.media}
// 						isLoading={manhuaQuery.isLoading}
// 					/>
// 					<SectionScrollMem
// 						category_title={t('Top Scored')}
// 						data={manhuaQuery.data?.top?.media}
// 						isLoading={manhuaQuery.isLoading}
// 					/>
// 				</View>
// 			</View>
// 		</RefreshableScroll>
// 	);
// };

// const NovelsTab = () => {
// 	const { showNSFW, tagBlacklist } = useSettingsStore();
// 	const novelQuery = useNovelExploreQuery({
// 		perPage: 20,
// 		isAdult: showNSFW ? undefined : false,
// 		tag_not_in: tagBlacklist ?? undefined,
// 		startDate_greater: subtractMonths(3),
// 	});
// 	const [t] = useTranslation();

// 	const onRefresh = async () => {
// 		await novelQuery.refetch();
// 	};

// 	return (
// 		<RefreshableScroll onRefresh={onRefresh} refreshing={novelQuery.isRefetching}>
// 			<View style={{ marginVertical: 10 }}>
// 				{novelQuery.isFetching && (
// 					<Animated.View
// 						exiting={FadeOut}
// 						style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
// 					>
// 						<ActivityIndicator size="large" />
// 					</Animated.View>
// 				)}
// 				{novelQuery.isError && (
// 					<NetworkError status={novelQuery?.status} onRefresh={onRefresh} />
// 				)}
// 				<View>
// 					<SectionScrollMem
// 						category_title={t('New Releases')}
// 						data={novelQuery.data?.newReleases?.media}
// 						isLoading={novelQuery?.isLoading}
// 					/>
// 					<SectionScrollMem
// 						category_title={t('Trending')}
// 						data={novelQuery.data?.trending?.media}
// 						isLoading={novelQuery?.isLoading}
// 					/>
// 					<SectionScrollMem
// 						category_title={t('Popular')}
// 						data={novelQuery.data?.popular?.media}
// 						isLoading={novelQuery.isLoading}
// 					/>
// 					<SectionScrollMem
// 						category_title={t('Top Scored')}
// 						data={novelQuery.data?.top?.media}
// 						isLoading={novelQuery.isLoading}
// 					/>
// 				</View>
// 			</View>
// 		</RefreshableScroll>
// 	);
// };

const ExplorePage = () => {
	const layout = useWindowDimensions();
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
			return <ExploreTab type={route.key} />;
			// switch (route.key) {
			// 	case 'anime':
			// 		return <ExploreTab />;
			// 	case 'manga':
			// 		return <ExploreTab />;
			// 	case 'manhwa':
			// 		return <ExploreTab />;
			// 	case 'manhua':
			// 		return <ExploreTab />;
			// 	case 'novels':
			// 		return <ExploreTab />;
			// }
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
