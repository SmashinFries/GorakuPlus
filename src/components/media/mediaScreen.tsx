import { Share, View } from 'react-native';
import { useCallback, useMemo, useRef } from 'react';
import { router } from 'expo-router';
import { useMedia } from '@/hooks/media/useMedia';
import { openWebBrowser } from '@/utils/webBrowser';
import { MediaLoading } from '@/components/media/loading';
import { MediaBanner } from '@/components/media/banner';
import { FrontCoverMem } from '@/components/media/sections/frontCover';
import BodyContainer from '@/components/media/body';
import TagView from '@/components/media/sections/tags';
import { MediaInteractionBar } from '@/components/media/sections/entry';
import { Description } from '@/components/media/sections/description';
import Relations from '@/components/media/sections/relations';
import { MUData, MetaData } from '@/components/media/sections/meta';
import { CharacterPrevList } from '@/components/media/sections/characters';
import { StaffPrevList } from '@/components/media/sections/staff';
import { AnimeTrailer } from '@/components/media/sections/trailer';
import MediaLinks from '@/components/media/sections/links';
import Animated, { FadeIn } from 'react-native-reanimated';
import ReviewsSection from '@/components/media/sections/reviews';
import { StatSection } from '@/components/media/sections/stats';
import ScreenshotImages from '@/components/media/sections/screenshots';
import {
	ExternalLinkType,
	FuzzyDate,
	MediaExternalLink,
	MediaFormat,
	MediaType,
	useThreadsOverviewQuery,
} from '@/api/anilist/__genereated__/gql';
import { AnimeFull } from '@/api/jikan/models';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { MediaScoresView } from '@/components/media/sections/scores';
import { ThreadOverview } from '@/components/media/sections/threads';
import { FollowingPrevList } from '@/components/media/sections/following';
import RecList from '@/components/media/sections/recoms';
import { AniCardPageParams } from '@/types/anicard';
import { useReleaseTimes } from '@/hooks/useReleaseTimes';
import { useShallow } from 'zustand/react/shallow';
import { ChapterPreview } from './sections/chapterPreview';
import { useMatchStore } from '@/store/matchStore';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { AccordionMemo } from '../animations';
import { MangaUpdatesSearchSheet, MediaReleasesSheet } from '../sheets/bottomsheets';
import { AnimPaperHeader, FadeHeaderScrollView } from '../headers';
import { HeaderActionsProps } from '../headers/components/actions';
import { getStreamingSiteEmoji } from '@/utils/emoji';
import { Icon, Text } from 'react-native-paper';

const MediaScreen = ({ aniId, type }: { aniId: number; type: MediaType }) => {
	const { mediaLanguage } = useSettingsStore();
	const { userID } = useAuthStore(useShallow((state) => state.anilist));
	const { mangadex: mangadexDB } = useMatchStore();
	const { anilist, jikan, muReleases, muSeries, isReady } = useMedia(aniId, type);
	const threadsQuery = useThreadsOverviewQuery({ id: aniId, page: 1, perPage: 10 });
	const releaseText = useReleaseTimes({
		type,
		status: anilist?.data?.Media?.status,
		chapters: anilist?.data?.Media?.chapters,
		episodes: anilist?.data?.Media?.episodes,
		volumes: anilist?.data?.Media?.volumes,
		nextEpisode: anilist?.data?.Media?.nextAiringEpisode,
		releases: muReleases?.data?.results,
		startDate: anilist?.data?.Media?.startDate as FuzzyDate,
	});
	const mediaReleasesRef = useRef<TrueSheet>(null);
	const mangaUpdatesSheetRef = useRef<TrueSheet>(null);

	const openEdit = useCallback(() => {
		openWebBrowser(`https://anilist.co/edit/${type}/${aniId}`);
	}, []);

	const streamLinks = useMemo(
		() => [
			...(anilist?.data?.Media?.externalLinks?.filter(
				(link): link is NonNullable<typeof link> =>
					link !== null && link.type === ExternalLinkType.Streaming,
			) ?? []),
			mangadexDB[aniId]
				? {
						id: 1,
						site: 'MangaDex',
						url: `https://mangadex.org/title/${mangadexDB[aniId]?.mangaId}`,
					}
				: null,
		],
		[anilist?.data?.Media?.externalLinks, aniId],
	);

	const shareLinkConfig = useMemo(
		() =>
			({
				icon: 'share-variant-outline',
				onPress: () => {
					Share.share({
						url: anilist?.data?.Media?.siteUrl ?? '',
						title: anilist?.data?.Media?.siteUrl ?? '',
						message: anilist?.data?.Media?.siteUrl ?? '',
					});
				},
			}) as NonNullable<HeaderActionsProps['actions']>[0],
		[anilist?.data?.Media?.siteUrl],
	);

	if (aniId === undefined || aniId === null) return null;

	return (
		<View>
			{!isReady && (
				<MediaLoading
					aniLoading={anilist.isFetching}
					mangaUpdatesLoading={
						type === MediaType.Manga
							? muSeries.isFetching || muReleases.isFetching
							: null
					}
					aniError={anilist?.error}
					malLoading={jikan.isFetching || jikan.isPending}
					malError={jikan?.error}
					mangaUpdatesError={muSeries?.error}
				/>
			)}

			{isReady && (
				<View>
					<FadeHeaderScrollView
						BgImage={({ style }) => (
							<MediaBanner
								style={style}
								urls={
									(anilist?.data?.Media?.relations?.edges ?? []).length > 0
										? [
												anilist?.data?.Media?.bannerImage ??
													anilist?.data?.Media?.coverImage?.extraLarge,
												...(anilist?.data?.Media?.relations?.edges
													?.filter(
														(edge): edge is NonNullable<typeof edge> =>
															edge !== null,
													)
													.map((edge) => edge?.node?.bannerImage) ?? []),
											].filter((val): val is string => val !== null)
										: [
												anilist?.data?.Media?.bannerImage ??
													anilist?.data?.Media?.coverImage?.extraLarge ??
													'',
											]
								}
							/>
						)}
						Header={(props) => (
							<AnimPaperHeader
								{...props}
								options={{
									...props.options,
									title:
										(mediaLanguage &&
											anilist?.data?.Media?.title?.[mediaLanguage]) ??
										anilist?.data?.Media?.title?.romaji ??
										'',
								}}
								actions={[
									streamLinks.filter(
										(link) => link !== undefined && link !== null,
									).length > 0
										? {
												icon: anilist?.data?.Media?.siteUrl?.includes(
													'anime',
												)
													? 'play-box-multiple-outline'
													: 'book-open-page-variant-outline',
												title: 'Stream Sites',
												menuItems: streamLinks.map(
													(link) =>
														link && {
															leadingIcon: link.language
																? (props) =>
																		link?.language && (
																			<Text {...props}>
																				{getStreamingSiteEmoji(
																					link?.language,
																				)}
																			</Text>
																		)
																: undefined,

															trailingIcon: link.icon
																? (props) => (
																		<Icon
																			{...props}
																			source={{
																				uri: link.icon,
																			}}
																			color={
																				link?.color ??
																				props.color
																			}
																		/>
																	)
																: undefined,

															onPress: () =>
																openWebBrowser(link.url, true),
															title: link.site,
														},
												),
											}
										: null,
									shareLinkConfig,
									{
										icon: 'card-text-outline',
										title: 'AniCard',
										onPress: () => {
											router.push({
												pathname: '/anicard',
												params: {
													id: `${aniId}`,
													cardType: 'media',
													mediaType: type,
													idMal: `${anilist?.data?.Media?.idMal}`,
												} as AniCardPageParams,
											});
										},
									},
									{
										icon: 'file-document-edit-outline',
										title: 'Edit Data',
										onPress: () => openEdit(),
									},
								]}
							/>
						)}
					>
						<Animated.View entering={FadeIn}>
							<BodyContainer>
								<FrontCoverMem
									data={anilist?.data?.Media}
									defaultTitle={mediaLanguage ?? 'romaji'}
								/>
								<View>
									<TagView
										genres={anilist?.data?.Media?.genres}
										tags={anilist?.data?.Media?.tags}
									/>
									<View style={{ paddingVertical: 8 }}>
										<MediaScoresView
											height={60}
											averageScore={
												anilist?.data?.Media?.averageScore ?? null
											}
											meanScore={anilist?.data?.Media?.meanScore ?? null}
											malScore={jikan?.data?.data?.data?.score ?? null}
											userScore={
												anilist?.data?.Media?.mediaListEntry?.score ?? null
											}
										/>
									</View>
									{/* <ScoreCircles
									avgScore={anilist?.data?.Media?.averageScore}
									meanScore={anilist?.data?.Media?.meanScore}
									malScore={jikan?.data?.data?.data?.score}
									userScore={anilist?.data?.Media?.mediaListEntry?.score}
									scoreColors={scoreColors}
								/> */}
								</View>
								<MediaInteractionBar
									id={aniId}
									type={type}
									status={anilist?.data?.Media?.status}
									releaseMessage={releaseText ?? undefined}
									onShowReleases={() => mediaReleasesRef.current?.present()}
									data={anilist?.data?.Media?.mediaListEntry ?? undefined}
									customLists={
										type === MediaType.Anime
											? (anilist?.data?.User?.mediaListOptions?.animeList?.customLists?.filter(
													(list): list is string => list !== null,
												) ?? [])
											: (anilist?.data?.User?.mediaListOptions?.mangaList?.customLists?.filter(
													(list): list is string => list !== null,
												) ?? [])
									}
									scoreFormat={anilist?.data?.User?.mediaListOptions?.scoreFormat}
									media={anilist?.data?.Media}
									refreshData={anilist?.refetch}
								/>
								<View>
									<Description
										aniDescription={anilist?.data?.Media?.descriptionHTML}
										malDescription={
											jikan?.data?.data?.data?.synopsis ??
											muSeries?.data?.data?.description
										}
									/>
								</View>
								<View>
									<MetaData
										data={anilist?.data?.Media}
										malData={jikan?.data?.data?.data}
									/>
									{((anilist?.data?.Media?.rankings?.length ?? 0) > 0 ||
										(anilist?.data?.Media?.stats?.scoreDistribution?.length ??
											0) > 0 ||
										(anilist?.data?.Media?.stats?.statusDistribution?.length ??
											0) > 0) && (
										<StatSection
											id={aniId}
											rankData={anilist?.data?.Media?.rankings}
											statData={anilist?.data?.Media?.stats}
										/>
									)}
									{!muSeries?.isError &&
										muSeries?.data &&
										anilist?.data?.Media?.type !== MediaType.Anime && (
											<MUData
												data={muSeries?.data?.data}
												openMuDialog={() =>
													mangaUpdatesSheetRef.current?.present()
												}
											/>
										)}
								</View>
								{anilist?.data?.Media?.relations && (
									<View>
										<Relations
											data={anilist?.data?.Media?.relations}
											parentMediaId={aniId}
										/>
									</View>
								)}
								<AccordionMemo title="Characters / Staff">
									{anilist?.data?.Media?.characters && (
										<View>
											<CharacterPrevList
												mediaId={aniId}
												data={anilist?.data?.Media?.characters}
												openMore={() =>
													router.push({
														// @ts-ignore
														pathname: '/character/characterList',
														params: {
															mediaId: anilist?.data?.Media?.id,
														},
													})
												}
											/>
										</View>
									)}
									{anilist?.data?.Media?.staff && (
										<View>
											<StaffPrevList
												mediaId={aniId}
												data={anilist?.data?.Media?.staff}
												openMore={() =>
													router.push({
														// @ts-ignore router type gen aint workin
														pathname: '/staff/staffList',
														params: {
															mediaId: anilist?.data?.Media?.id,
														},
													})
												}
											/>
										</View>
									)}
								</AccordionMemo>
								<AccordionMemo title="Reviews / Threads">
									{anilist?.data?.Media?.reviews && (
										<ReviewsSection
											data={anilist?.data?.Media?.reviews}
											openMore={() =>
												router.push(`/reviews/${anilist?.data?.Media?.id}`)
											}
										/>
									)}
									{threadsQuery?.data && (
										<ThreadOverview
											aniId={aniId}
											data={threadsQuery?.data}
											isFetching={threadsQuery?.isFetching}
										/>
									)}
								</AccordionMemo>

								{userID && (
									<FollowingPrevList
										data={
											anilist?.data?.Following?.mediaList?.filter(
												(item): item is NonNullable<typeof item> =>
													item !== null,
											) ?? []
										}
									/>
								)}
								{anilist?.data?.Media?.recommendations && (
									<RecList
										data={anilist?.data?.Media?.recommendations}
										parentMediaId={aniId}
									/>
								)}
								{anilist?.data?.Media?.externalLinks &&
									anilist?.data?.Media?.siteUrl && (
										<MediaLinks
											links={
												anilist?.data?.Media
													?.externalLinks as MediaExternalLink[]
											}
											aniLink={anilist?.data?.Media?.siteUrl}
											malLink={
												anilist?.data?.Media?.idMal
													? `https://myanimelist.net/${anilist?.data?.Media?.type?.toLowerCase()}/${
															anilist?.data?.Media?.idMal
														}`
													: undefined
											}
											muLink={
												type === MediaType.Manga
													? muSeries?.data?.data?.url
													: undefined
											}
										/>
									)}
								{type === MediaType.Anime && (
									<ScreenshotImages
										data={anilist?.data?.Media?.streamingEpisodes}
									/>
								)}
								{type === MediaType.Anime && anilist?.data?.Media?.trailer?.id && (
									<AnimeTrailer video={anilist?.data?.Media?.trailer?.id} />
								)}

								{type === MediaType.Manga &&
									anilist?.data?.Media?.title?.romaji &&
									anilist?.data?.Media?.format !== MediaFormat.Novel && (
										<ChapterPreview
											aniId={aniId}
											title={
												anilist.data.Media.title.english ??
												anilist.data.Media.title.romaji
											}
										/>
									)}
							</BodyContainer>
						</Animated.View>
					</FadeHeaderScrollView>
					<MediaReleasesSheet
						sheetRef={mediaReleasesRef}
						status={anilist?.data?.Media?.status ?? undefined}
						animeReleases={
							(anilist?.data?.Media?.airingSchedule?.nodes?.length ?? 0) > 0
								? anilist?.data?.Media?.airingSchedule?.nodes
								: undefined
						}
						releases={type === MediaType.Manga ? muReleases?.data?.results : undefined}
						mangaUpdatesUrl={muSeries?.data?.data?.url}
						streamingEpisodes={
							anilist?.data?.Media?.streamingEpisodes?.filter(
								(episode): episode is NonNullable<typeof episode> =>
									episode !== null,
							) ?? []
						}
						streamingSites={(jikan?.data?.data?.data as AnimeFull)?.streaming}
					/>
					<MangaUpdatesSearchSheet
						sheetRef={mangaUpdatesSheetRef}
						aniId={aniId}
						title={
							anilist?.data?.Media?.title?.english ??
							anilist?.data?.Media?.title?.romaji ??
							''
						}
						altTitles={[
							...new Set([
								...Object.values(anilist?.data?.Media?.title ?? {}),
								...(anilist?.data?.Media?.synonyms ?? []),
							]),
						].filter((title): title is string => title !== null)}
						onConfirm={() => muSeries.refetch()}
					/>
				</View>
			)}
		</View>
	);
};

export default MediaScreen;
