import {
	AniMediaQuery_Media_Media_airingSchedule_AiringScheduleConnection,
	AniMediaQuery_Media_Media_airingSchedule_AiringScheduleConnection_nodes_AiringSchedule,
	AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge,
	AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review,
	AniMediaQuery_Media_Media_streamingEpisodes_MediaStreamingEpisode,
	MainMetaFragment,
	MediaListEntryMetaFragment,
	MediaStatus,
	MediaType,
	ReviewsQuery_Page_Page_reviews_Review,
	SaveMediaListItemMutationVariables,
	ScoreFormat,
} from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { TrueSheet, TrueSheetProps } from '@lodev09/react-native-true-sheet';
import React, { MutableRefObject, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, ListRenderItemInfo, Share, View, Pressable } from 'react-native';
import {
	Avatar,
	Button,
	Chip,
	Divider,
	Icon,
	List,
	Searchbar,
	Surface,
	Text,
} from 'react-native-paper';
import { MediaCard } from '../cards';
import { GorakuActivityIndicator } from '../loading';
import { Accordion, AccordionProps } from '../animations';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { DisplayState, useDisplayStore } from '@/store/displayStore';
import { MaterialSwitchListItem } from '../switch';
import { useListFilterStore } from '@/store/listStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAnilistAuth } from '@/api/anilist/useAnilistAuth';
import { useColumns } from '@/hooks/useColumns';
import { useGetSearch, usePostSearch } from '@/api/tracemoe/tracemoe';
import { Result, SearchBody } from '@/api/tracemoe/models';
import { ImageSearchItem } from '../search/media';
import { useSauceNaoSearch } from '@/api/saucenao/saucenao';
import { SauceNaoResultItem } from '@/api/saucenao/types';
import { useSearchStore } from '@/store/search/searchStore';
import {
	SearchReleasesPostMutationResult,
	useSearchSeriesPost,
} from '@/api/mangaupdates/mangaupdates';
import { AnimeFull } from '@/api/jikan/models';
import { useShallow } from 'zustand/react/shallow';
import * as Haptics from 'expo-haptics';
import { openWebBrowser } from '@/utils/webBrowser';
import { useGetSearchManga } from '@/api/mangadex/mangadexExtended';
import { Manga } from '@/api/mangadex/models';
import { getGetChapterQueryOptions } from '@/api/mangadex/mangadex';
import { useMatchStore } from '@/store/matchStore';
import {
	ReleaseSearchResponseV1ResultsItem,
	SeriesSearchResponseV1ResultsItem,
} from '@/api/mangaupdates/models';

type BottomSheetParentProps = TrueSheetProps & {
	scrollable?: boolean;
	header?: ReactNode;
	sheetRef?: RefObject<TrueSheet>;
	enabledHaptic?: boolean;
};
export const BottomSheetParent = ({
	grabber = true,
	enabledHaptic = true,
	scrollable = false,
	...props
}: BottomSheetParentProps) => {
	const { colors } = useAppTheme();

	return (
		<TrueSheet
			ref={props.sheetRef}
			backgroundColor={colors.elevation.level1}
			grabber={grabber}
			grabberProps={{
				color: colors.onSurfaceVariant,
				topOffset: grabber ? 22 : 0,
				width: 32,
				height: 4,
				visible: grabber,
			}}
			cornerRadius={8}
			onPresent={(e) => {
				enabledHaptic && Haptics.selectionAsync();
				props?.onPresent?.(e);
			}}
			scrollRef={props.scrollRef}
			{...props}
			contentContainerStyle={[
				{ backgroundColor: colors.elevation.level1 },
				props.contentContainerStyle,
			]}
			style={[{ backgroundColor: colors.elevation.level1 }, props.style]}
			// indicatorStyle={{
			// 	backgroundColor: colors.onSurfaceVariant,
			// 	marginVertical: 22,
			// 	width: 32,
			// 	height: 4,
			// }}
		>
			<View style={{ paddingTop: grabber ? 22 * 2 : 4 }}>
				{props?.header && props.header}
			</View>
			{scrollable ? (
				<ScrollView
					ref={props.scrollRef as MutableRefObject<ScrollView>}
					nestedScrollEnabled
					contentContainerStyle={{ paddingBottom: grabber ? 22 : 4 }}
					showsVerticalScrollIndicator={false}
				>
					{props.children}
				</ScrollView>
			) : (
				<View style={{ paddingBottom: 6 }}>{props.children}</View>
			)}

			{/* {props.children} */}
		</TrueSheet>
	);
};

export const GlobalBottomSheetParent = ({ ...props }: BottomSheetParentProps) => {
	const canGoBack = router.canGoBack();
	return (
		<BottomSheetParent
			onDismiss={() => canGoBack && router.back()}
			initialIndex={0}
			{...props}
		/>
	);
};

export const BottomSheetAccordion = (props: AccordionProps & { icon?: IconSource }) => {
	const { colors } = useAppTheme();
	const [initialExpand, setInitialExpand] = useState(props.initialExpand);

	useEffect(() => {
		setInitialExpand(props?.initialExpand ?? false);
	}, [props?.initialExpand]);
	return (
		<Accordion
			titleVariant="titleMedium"
			left={
				<List.Icon
					icon={props.icon ?? 'eye-outline'}
					color={colors.onSurfaceVariant}
					style={{ paddingLeft: 16 }}
				/>
			}
			{...props}
			initialExpand={initialExpand}
		>
			{props.children}
		</Accordion>
	);
};

export type MediaQuickActionProps = MainMetaFragment & {
	scoreFormat?: ScoreFormat;
	activityId?: number;
	followingUsername?: string;
	allowEntryEdit?: boolean;
};

// AniMediaQuery['Media']['reviews']['edges'][0] | ReviewsQuery['Page']['reviews'][0]
export type ReviewOverviewSheetProps = {
	sheetRef: React.RefObject<TrueSheet>;
	data:
		| AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review
		| ReviewsQuery_Page_Page_reviews_Review
		| null
		| undefined;
};
export const ReviewActionsSheet = ({ sheetRef, data }: ReviewOverviewSheetProps) => {
	const review =
		(data as AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge)?.node ??
		(data as ReviewsQuery_Page_Page_reviews_Review);

	const onUserNav = () => {
		router.navigate({
			// @ts-ignore it works tho...
			pathname: `/user/${review?.user?.id}/${review?.user?.name}`,
			params: {
				avatar: review?.user?.avatar?.large,
				// banner: data?.node?.user?.bannerImage,
			},
		});
		sheetRef.current?.dismiss();
	};

	return (
		<BottomSheetParent sheetRef={sheetRef} enabledHaptic sizes={['auto']}>
			<List.Item
				title={'Read Review'}
				left={(props) => <List.Icon {...props} icon={'forum-outline'} />}
			/>
			<List.Item
				title={'View Creator'}
				onPress={onUserNav}
				left={(props) => (
					<Avatar.Image
						source={{ uri: review?.user?.avatar?.large ?? undefined }}
						size={24}
						style={[props.style]}
					/>
				)}
			/>
		</BottomSheetParent>
	);
};

export type AniTrendzQuickActionProps = {
	sheetRef: React.RefObject<TrueSheet>;
	link: string;
	names: string[];
	anime?: string;
	onCharacterSearch?: (name: string) => void;
	onAnimeSearch?: (anime: string) => void;
};
export const AniTrendzQuickActionSheet = ({
	sheetRef,
	names,
	anime,
	link,
	onAnimeSearch,
	onCharacterSearch,
}: AniTrendzQuickActionProps) => {
	const searchCharacter = (name: string) => {
		onCharacterSearch?.(name);
	};

	const searchAnime = () => {
		anime && onAnimeSearch?.(anime);
	};

	const shareLink = async () => {
		await Share.share({ url: link, message: link });
		sheetRef.current?.dismiss();
	};

	return (
		<BottomSheetParent sheetRef={sheetRef} sizes={['small', 'medium']} enabledHaptic>
			<View>
				{names?.map((name, idx) => (
					<List.Item
						key={idx}
						title={`Search ${name.replace(',', '')}`}
						onPress={() => searchCharacter(name)}
						left={(props) => <List.Icon {...props} icon={'account-search-outline'} />}
					/>
				))}
				{anime && (
					<List.Item
						title={'Search Anime'}
						onPress={searchAnime}
						left={(props) => <List.Icon {...props} icon={'movie-search-outline'} />}
					/>
				)}
				<List.Item
					title={'Share Site'}
					onPress={shareLink}
					left={(props) => <List.Icon {...props} icon="share-variant-outline" />}
				/>
			</View>
		</BottomSheetParent>
	);
};

export const CalendarFilterSheet = ({ sheetRef }: { sheetRef: RefObject<TrueSheet> }) => {
	const { userID } = useAuthStore().anilist;
	const { calendar, updateCalendarDisplay } = useDisplayStore(
		useShallow((state) => ({
			calendar: state.calendar,
			updateCalendarDisplay: state.updateCalendarDisplay,
		})),
	);

	const updateOnlyShowList = (val: boolean) => {
		updateCalendarDisplay({ list_only: val });
		// updateAllTitles(val);
	};

	return (
		<BottomSheetParent sheetRef={sheetRef} sizes={['auto', 'medium']}>
			{userID && (
				<MaterialSwitchListItem
					title="List only"
					selected={!!calendar.list_only}
					onPress={() => updateOnlyShowList(!calendar.list_only)}
				/>
			)}
		</BottomSheetParent>
	);
};

export type DisplayConfigProps = {
	type: keyof DisplayState;
	active?: boolean;
};

// export type AnilistAccountProps = {};
export const AnilistAccountSheet = ({ sheetRef }: { sheetRef: React.RefObject<TrueSheet> }) => {
	const { userID } = useAuthStore(useShallow((state) => state.anilist));
	const clearAuth = useAuthStore(useShallow((state) => state.clearAuth));
	const updateListFilter = useListFilterStore(useShallow((state) => state.updateListFilter));
	const queryClient = useQueryClient();
	const aniAuth = useAnilistAuth();

	const onLogout = () => {
		clearAuth('anilist');
		updateListFilter?.({
			animeTabOrder: ['Watching', 'Planning', 'Completed', 'Rewatching', 'Paused', 'Dropped'],
			mangaTabOrder: ['Reading', 'Planning', 'Completed', 'Rereading', 'Paused', 'Dropped'],
		});
		queryClient.invalidateQueries();
	};

	const onLogin = () => {
		aniAuth.promptAsync();
	};

	return (
		<BottomSheetParent sizes={['auto']} sheetRef={sheetRef}>
			<View>
				{userID && <List.Item title={'Logout'} onPress={onLogout} />}
				<List.Item title={userID ? 'Relogin' : 'Login'} onPress={onLogin} />
			</View>
		</BottomSheetParent>
	);
};

export type TraceMoeSheetProps = {
	sheetRef: React.RefObject<TrueSheet>;
	url?: string;
	image?: {
		uri: string;
		type: string;
		name: string;
	};
};
export const TraceMoeSheet = ({ sheetRef, url, image }: TraceMoeSheetProps) => {
	const scrollRef = useRef<ScrollView>(null);
	const urlImageQuery = useGetSearch(
		{ url: url ?? '', anilistInfo: 'true', cutBorders: 'true' },
		{ query: { enabled: !!url } },
	);
	const localImageMutation = usePostSearch({
		axios: { headers: { 'Content-Type': 'multipart/form-data' } },
	}); // not really mutation but...
	const imageQuery = useQuery({
		queryKey: ['tracemoe_image', image],
		queryFn: async () =>
			localImageMutation?.mutateAsync({
				data: { image } as unknown as SearchBody,
				params: { anilistInfo: 'true', cutBorders: 'true' },
			}),
		enabled: !!image,
	});

	const RenderItem = ({ item }: { item: Result }) => {
		return <ImageSearchItem item={item} />;
	};

	// useEffect(() => {
	// 	if (image) {
	// 		localImageMutation.mutate({
	// 			data: { image } as unknown as SearchBody,
	// 			params: { anilistInfo: 'true', cutBorders: 'true' },
	// 		});
	// 	}
	// }, [image]);

	return (
		<BottomSheetParent
			sheetRef={sheetRef}
			sizes={['auto', 'large']}
			header={
				<View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
					<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
						Image Search
					</Text>
					<Divider />
				</View>
			}
		>
			<ScrollView
				ref={scrollRef}
				nestedScrollEnabled
				contentContainerStyle={{ padding: 10, paddingBottom: 22 * 4 }}
			>
				{(url ? urlImageQuery?.isFetching : imageQuery?.isFetching) ? (
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<GorakuActivityIndicator />
					</View>
				) : (
					(url ? urlImageQuery?.data?.data?.result : imageQuery?.data?.data?.result)?.map(
						(item, idx) => <RenderItem item={item} key={idx} />,
					)
					// <FlatList
					// 	ref={scrollRef}
					// 	nestedScrollEnabled
					// 	data={url ? urlImageQuery?.data?.data?.result : imageQuery?.data?.data?.result}
					// 	keyExtractor={(item, idx) => idx.toString()}
					// 	numColumns={1}
					// 	// centerContent
					// 	ListHeaderComponent={() => (
					// 		<View style={{ marginBottom: 10 }}>
					// 			<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
					// 				Image Search
					// 			</Text>
					// 			<Divider />
					// 		</View>
					// 	)}
					// 	// contentContainerStyle={{ padding: 10, paddingBottom: 22 * 4 }}
					// 	renderItem={RenderItem}
					// 	windowSize={5}
					// />
				)}
			</ScrollView>
		</BottomSheetParent>
	);
};

export type SauceNaoSheetProps = {
	sheetRef: React.RefObject<TrueSheet>;
	file:
		| string
		| {
				uri: string;
				type: string;
				name: string;
		  }
		| undefined;
};

export const SauceNaoSheet = ({ sheetRef, file }: SauceNaoSheetProps) => {
	const sheet = useRef<TrueSheet>(null);
	const scrollRef = useRef<ScrollView>(null);
	const { colors } = useAppTheme();
	const { updateQuery } = useSearchStore(
		useShallow((state) => ({
			query: state.query,
			updateQuery: state.updateQuery,
		})),
	);
	const sauceNaoQuery = useSauceNaoSearch({
		file: file as NonNullable<typeof file>,
		enabled: !!file,
	});

	const RenderItem = ({ item }: { item: SauceNaoResultItem }) => {
		const onSearch = () => {
			updateQuery(item.data.source);
			sheet.current?.dismiss();
		};
		return (
			<Surface style={{ marginVertical: 8, borderRadius: 6, overflow: 'hidden' }}>
				<View style={{ flexDirection: 'row' }}>
					<Image
						source={{ uri: item.header.thumbnail }}
						style={{ height: 140, width: 90 }}
						contentFit="cover"
					/>
					<View style={{ flex: 1, paddingHorizontal: 10, height: '100%' }}>
						<Text variant="titleMedium">
							{item.data?.source} {item.data.mal_id}
						</Text>
						<Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
							Similarity: {item.header?.similarity}
						</Text>
						<View
							style={{
								justifyContent: 'flex-end',
								alignItems: 'flex-end',
								height: '100%',
								flex: 1,
								padding: 6,
							}}
						>
							<Button mode="contained" icon={'magnify'} onPress={onSearch}>
								Search
							</Button>
						</View>
					</View>
					{parseFloat(item.header.similarity) > 90 && (
						// @ts-ignore
						<Icon source={'check'} size={undefined} />
					)}
				</View>
			</Surface>
		);
	};

	return (
		<BottomSheetParent
			sheetRef={sheetRef}
			sizes={['auto', 'large']}
			header={
				<View
					style={{
						marginBottom: 10,
						paddingHorizontal: 10,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<View>
							<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
								Image Search
							</Text>
							<Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
								Long Remaining: {sauceNaoQuery?.data?.header?.long_remaining} /{' '}
								{sauceNaoQuery?.data?.header?.long_limit} {'(per day)'}
							</Text>
							<Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
								Short Remaining: {sauceNaoQuery?.data?.header?.short_remaining} /{' '}
								{sauceNaoQuery?.data?.header?.short_limit} {'(per 30s)'}
							</Text>
						</View>
						<Image
							source={{ uri: typeof file === 'string' ? file : file?.uri }}
							style={{ height: 70, width: 50 }}
						/>
					</View>
					<Divider />
				</View>
			}
		>
			<ScrollView
				nestedScrollEnabled
				ref={scrollRef}
				contentContainerStyle={{ padding: 10, paddingBottom: 22 * 12 }}
			>
				{sauceNaoQuery?.isFetching && (
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<GorakuActivityIndicator />
					</View>
				)}
				{!sauceNaoQuery?.isFetching &&
					sauceNaoQuery?.data?.results?.map((item, idx) => (
						<RenderItem key={idx} item={item} />
					))}
			</ScrollView>
			{/* // <FlatList
				// 	ref={scrollRef}
				// 	data={sauceNaoQuery?.data?.results}
				// 	keyExtractor={(item, idx) => idx.toString()}
				// 	numColumns={1}
				// 	centerContent
				// 	nestedScrollEnabled
				// 	ListHeaderComponent={() => (
				// 		<View style={{ marginBottom: 10 }}>
				// 			<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
				// 				Image Search
				// 			</Text>
				// 			<Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
				// 				Long Remaining: {sauceNaoQuery?.data?.header?.long_remaining} /{' '}
				// 				{sauceNaoQuery?.data?.header?.long_limit} {'(per day)'}
				// 			</Text>
				// 			<Text variant="labelSmall" style={{ color: colors.onSurfaceVariant }}>
				// 				Short Remaining: {sauceNaoQuery?.data?.header?.short_remaining} /{' '}
				// 				{sauceNaoQuery?.data?.header?.short_limit} {'(per 30s)'}
				// 			</Text>
				// 			<Divider />
				// 		</View>
				// 	)}
				// 	contentContainerStyle={{ padding: 10, paddingBottom: 22 * 4 }}
				// 	renderItem={RenderItem}
				// 	windowSize={5}
				// /> */}
		</BottomSheetParent>
	);
};

export type MediaReleasesSheetProps = {
	sheetRef: React.RefObject<TrueSheet>;
	releases: SearchReleasesPostMutationResult['data']['results'] | undefined;
	animeReleases:
		| AniMediaQuery_Media_Media_airingSchedule_AiringScheduleConnection['nodes']
		| undefined;
	streamingSites: AnimeFull['streaming'];
	status: MediaStatus | undefined;
	streamingEpisodes: AniMediaQuery_Media_Media_streamingEpisodes_MediaStreamingEpisode[];
	mangaUpdatesUrl?: string;
};
export const MediaReleasesSheet = ({
	sheetRef,
	releases,
	animeReleases,
	status,
	streamingEpisodes,
	mangaUpdatesUrl,
}: MediaReleasesSheetProps) => {
	const sortedStreamingSites = streamingEpisodes?.length > 0 ? streamingEpisodes.sort() : null;

	const MangaRenderItem = ({ item }: ListRenderItemInfo<ReleaseSearchResponseV1ResultsItem>) => {
		return (
			<List.Item
				title={
					(item.record?.chapter?.length ?? 0) > 0
						? item.record?.chapter
						: `v${item.record?.volume}`
				}
				description={item.record?.groups?.[0]?.name}
				right={(props) => <Text style={[props.style]}>{item.record?.release_date}</Text>}
			/>
		);
	};

	const AnilistAnimeRenderItem = ({
		item,
	}: ListRenderItemInfo<AniMediaQuery_Media_Media_streamingEpisodes_MediaStreamingEpisode>) => {
		return (
			<Surface
				elevation={2}
				style={{
					flex: 1,
					borderRadius: 8,
					marginVertical: 6,
					padding: 6,
				}}
			>
				<View
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
					}}
				>
					{/* <CrunchyRollIcon fontColor={colors.onSurface} /> */}
					<Text variant="titleMedium" style={{ flexShrink: 1 }}>
						{item.title}
					</Text>
				</View>
				<Image
					source={{ uri: item.thumbnail }}
					contentFit="cover"
					style={{
						width: '100%',
						aspectRatio: 32 / 9,
						borderRadius: 8,
						marginTop: 4,
					}}
				/>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
					<Button onPress={() => openWebBrowser(item?.url, true)}>{item.site}</Button>
				</View>
			</Surface>
		);
	};
	const MalAnimeRenderItem = ({
		item,
	}: ListRenderItemInfo<AniMediaQuery_Media_Media_airingSchedule_AiringScheduleConnection_nodes_AiringSchedule>) => {
		return (
			<List.Item
				title={`EP ${item.episode}`}
				right={(props) => (
					<Text style={[props.style]}>
						{new Date(item.airingAt * 1000).toLocaleString()}
					</Text>
				)}
			/>
		);
	};

	return (
		<BottomSheetParent sheetRef={sheetRef}>
			{/* @ts-ignore */}
			<FlatList
				data={releases ?? sortedStreamingSites ?? animeReleases}
				keyExtractor={(item, idx) => idx.toString()}
				nestedScrollEnabled
				numColumns={1}
				centerContent
				ListHeaderComponent={() => (
					<View style={{ marginBottom: 10 }}>
						<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
							Release Guide
						</Text>
						<Text>
							This series is currently{' '}
							<Text style={{ fontWeight: 'bold' }}>
								{status?.toLowerCase().replaceAll('_', ' ')}.{'\n'}
							</Text>
						</Text>
						{status &&
						![MediaStatus.Cancelled, MediaStatus.Hiatus, MediaStatus.Finished].includes(
							status,
						) ? (
							<Text style={{ fontStyle: 'italic' }}>
								{releases
									? 'The estimated chapter release is based on the releases recorded on MangaUpdates.\n'
									: 'The episode release time is a direct reflection of the data provided by AniList.\n'}
							</Text>
						) : null}
						{releases && (
							<Button
								mode="contained"
								icon={'launch'}
								onPress={() => openWebBrowser(mangaUpdatesUrl)}
							>
								MangaUpdates
							</Button>
						)}
						<Divider />
					</View>
				)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ padding: 10 }}
				renderItem={
					releases
						? MangaRenderItem
						: sortedStreamingSites
							? AnilistAnimeRenderItem
							: MalAnimeRenderItem
				}
			/>
		</BottomSheetParent>
	);
};

export type ListEntrySheetProps = {
	entryData: MediaListEntryMetaFragment;
	scoreFormat: ScoreFormat;
	updateEntry: (variables: SaveMediaListItemMutationVariables) => void;
	media?: MainMetaFragment;
};

export type MangaDexSearchProps = {
	sheetRef: React.RefObject<TrueSheet>;
	aniId?: number;
	search?: string;
};
export const MangaDexSearchSheet = ({ sheetRef, aniId, search }: MangaDexSearchProps) => {
	const sheet = useRef<TrueSheet>(null);
	const { addMangaDexID } = useMatchStore(
		useShallow((state) => ({ addMangaDexID: state.addMangaDexID })),
	);
	const queryClient = useQueryClient();
	const { data, isFetching } = useGetSearchManga(
		{
			title: search,
			limit: 10,
			'includes[]': ['cover_art'],
			order: { relevance: 'desc' },
		},
		{ enabled: !!search },
	);

	const { columns, itemWidth } = useColumns('search');

	const onSelection = async (mangaId: string) => {
		const result = await queryClient.fetchQuery({
			...getGetChapterQueryOptions({
				manga: mangaId,
				'translatedLanguage[]': ['en'],
				limit: 1,
				order: { chapter: 'asc' },
			}),
		});
		aniId && addMangaDexID(aniId, mangaId, result?.data?.data?.[0]?.id);
		sheet.current?.dismiss();
	};

	const MediaRenderItem = ({ item }: { item: Manga }) => {
		const englishTitle = item?.attributes?.title?.en;
		const nativeTitle =
			item?.attributes?.altTitles?.find(
				(title) => title?.[item?.attributes?.originalLanguage as string],
			)?.[item?.attributes?.originalLanguage as string] ?? englishTitle;
		// `${item?.attributes?.originalLanguage}-ro`
		const romajiTitle =
			item?.attributes?.altTitles?.find(
				(title) => title?.[`${item?.attributes?.originalLanguage}-ro`],
			)?.[`${item?.attributes?.originalLanguage}-ro`] ?? englishTitle;

		const coverFilename = item?.relationships?.find((relation) => relation.type === 'cover_art')
			?.attributes?.fileName;

		return (
			<View style={{ width: itemWidth }}>
				<View
					style={{
						// flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-start',
						marginVertical: 10,
						marginHorizontal: 5,
					}}
				>
					<MediaCard
						id={item.id as any}
						type={MediaType.Manga}
						isFavourite={false}
						title={{
							english: englishTitle,
							romaji: romajiTitle,
							native: nativeTitle,
						}}
						coverImage={{
							// extraLarge: `https://uploads.mangadex.org/covers/${item?.id}/${coverFilename}`,
							extraLarge: coverFilename
								? `https://uploads.mangadex.org/covers/${item?.id}/${coverFilename}`
								: 'https://mangadex.org/covers/f1aa643f-6921-4eeb-b1c9-a1619e7f07c0/a34a2ff4-309c-4de6-ad42-ef08583ad3e5.jpg',
						}}
						fitToParent
						isMangaDex
						navigate={() => item.id && onSelection(item.id)}
					/>
				</View>
			</View>
		);
	};

	return (
		<BottomSheetParent sheetRef={sheetRef}>
			{isFetching ? (
				<View
					style={{
						height: 100,
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			) : (
				<FlatList
					key={columns}
					data={data?.data?.data}
					keyExtractor={(_item, idx) => idx.toString()}
					numColumns={columns}
					centerContent
					ListHeaderComponent={() => (
						<View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
							<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
								MangaDex Search
							</Text>
							<Divider />
						</View>
					)}
					renderItem={(props) => <MediaRenderItem {...props} />}
				/>
			)}
		</BottomSheetParent>
	);
};

export type MangaUpdatesSearchProps = {
	sheetRef: React.RefObject<TrueSheet>;
	title?: string;
	aniId?: number;
	altTitles?: string[];
	onConfirm?: (id: number) => void;
};
export const MangaUpdatesSearchSheet = ({
	sheetRef,
	title,
	aniId,
	altTitles,
	onConfirm,
}: MangaUpdatesSearchProps) => {
	const addMangaUpdatesID = useMatchStore(useShallow((state) => state.addMangaUpdatesID));
	const { colors } = useAppTheme();
	const listRef = useRef<FlatList>(null);
	const muDB = useMatchStore((state) => state.mangaUpdates);
	const { data: results, mutateAsync: search } = useSearchSeriesPost();

	const [query, setQuery] = useState(title?.replace('[', '').replace(']', '') ?? '');

	// muDB[aniId]

	const MediaRenderItem = ({ item }: { item: SeriesSearchResponseV1ResultsItem }) => {
		return (
			<View style={{ paddingHorizontal: 8 }}>
				<Pressable
					onPress={() => {
						if (aniId && item?.record?.series_id) {
							addMangaUpdatesID(aniId, item?.record?.series_id);
							onConfirm?.(item?.record?.series_id);
							sheetRef.current?.dismiss();
						}
					}}
					android_ripple={{ color: colors.primary, foreground: true }}
					style={{
						flex: 1,
						flexDirection: 'row',
						marginVertical: 8,
						borderRadius: 8,
						backgroundColor:
							aniId && muDB[aniId] === item.record?.series_id
								? colors.secondaryContainer
								: 'transparent',
						alignItems: 'center',
						padding: 4,
						overflow: 'hidden',
					}}
				>
					<Image
						source={{ uri: item?.record?.image?.url?.original ?? undefined }}
						style={{
							height: 140,
							width: 100,
							borderRadius: 8,
						}}
						contentFit="cover"
					/>
					<View style={{ flex: 1 }}>
						<Text
							variant="titleMedium"
							numberOfLines={3}
							style={{ flex: 1, padding: 5, textAlign: 'center' }}
						>
							{item?.record?.title}
						</Text>
						<Text
							variant="titleSmall"
							numberOfLines={3}
							style={{
								flex: 1,
								textAlign: 'center',
								color: colors.onSurfaceVariant,
							}}
						>
							{item?.record?.type}
						</Text>
					</View>
				</Pressable>
			</View>
		);
	};

	const searchManga = async (qry: string) => {
		await search({
			data: { search: qry, stype: 'title' },
		});
	};

	return (
		<BottomSheetParent
			sheetRef={sheetRef}
			scrollRef={listRef}
			onPresent={() => {
				title && searchManga(title);
			}}
		>
			<FlatList
				ref={listRef}
				key={1}
				data={results?.data?.results}
				keyExtractor={(_item, idx) => idx.toString()}
				numColumns={1}
				centerContent
				nestedScrollEnabled
				ListHeaderComponent={() => (
					<View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
						<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
							MangaDex Search
						</Text>
						<Divider style={{ marginVertical: 6 }} />
						<Searchbar
							value={query}
							onChangeText={(txt) => setQuery(txt)}
							onSubmitEditing={({ nativeEvent }) => searchManga(nativeEvent.text)}
						/>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{ paddingVertical: 18 }}
							fadingEdgeLength={20}
						>
							{altTitles?.map(
								(title, idx) =>
									title && (
										<Chip
											key={idx}
											mode="flat"
											style={{ marginHorizontal: 5 }}
											onPress={() => {
												setQuery(title);
												searchManga(title);
											}}
										>
											{title}
										</Chip>
									),
							)}
						</ScrollView>
						<Button mode="outlined" onPress={() => searchManga(query)}>
							Search
						</Button>
					</View>
				)}
				renderItem={(props) => <MediaRenderItem {...props} />}
			/>
		</BottomSheetParent>
	);
};
