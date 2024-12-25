import { View } from 'react-native';
import { Button, Portal } from 'react-native-paper';
import { useCallback, useState } from 'react';
import { router } from 'expo-router';
import { useMedia } from '@/hooks/media/useMedia';
import { openWebBrowser } from '@/utils/webBrowser';
import { MediaLoading } from '@/components/media/loading';
import { FadeHeaderProvider } from '@/components/headers';
import { MediaBanner } from '@/components/media/banner';
import { FrontCoverMem } from '@/components/media/sections/frontCover';
import { AnimViewMem } from '@/components/animations';
import BodyContainer from '@/components/media/body';
import TagView from '@/components/media/sections/tags';
import ListEntryView from '@/components/media/sections/entry';
import { Description } from '@/components/media/sections/description';
import Relations from '@/components/media/sections/relations';
import { MUData, MetaData } from '@/components/media/sections/meta';
import { CharacterPrevList } from '@/components/media/sections/characters';
import { StaffPrevList } from '@/components/media/sections/staff';
import { AnimeTrailer } from '@/components/media/sections/trailer';
import MediaLinks from '@/components/media/sections/links';
import { MuSearchDialog, ReleasesDialog } from '@/components/media/dialogs';
import Animated from 'react-native-reanimated';
import ReviewsSection from '@/components/media/sections/reviews';
import { StatSection } from '@/components/media/sections/stats';
import ScreenshotImages from '@/components/media/sections/screenshots';
import {
	ExternalLinkType,
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
import { SheetManager } from 'react-native-actions-sheet';
import { useReleaseTimes } from '@/hooks/useReleaseTimes';
import { useShallow } from 'zustand/react/shallow';
import { ChapterPreview } from './sections/chapterPreview';
import { useMatchStore } from '@/store/matchStore';
import { getChapterFrequency, getReleaseTime } from '@/utils';

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
	});

	const [showReleaseDialog, setShowReleaseDialog] = useState(false);
	const [showMuDialog, setShowMuDialog] = useState(false);

	const toggleMuDialog = useCallback(() => setShowMuDialog((prev) => !prev), []);

	const onConfirmMuDialog = useCallback(() => {
		muSeries.refetch();
		toggleMuDialog();
	}, []);

	const openEdit = useCallback(() => {
		openWebBrowser(`https://anilist.co/edit/${type}/${aniId}`);
	}, []);

	// const getRelease = useCallback(() => {
	// 	return anilist?.data
	// 		? getReleaseTime(
	// 				type,
	// 				anilist?.data?.Media?.status,
	// 				anilist?.data?.Media?.nextAiringEpisode,
	// 				type === MediaType.Manga
	// 					? getChapterFrequency(
	// 							muReleases?.data?.results?.map(
	// 								(release) => release.record?.release_date,
	// 							),
	// 						)
	// 					: '',
	// 				anilist?.data?.Media?.chapters,
	// 				anilist?.data?.Media?.episodes,
	// 				anilist?.data?.Media?.volumes,
	// 			)
	// 		: '';
	// }, [type, muReleases, anilist?.data]);

	if (!aniId) return null;

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
				<Animated.View>
					<FadeHeaderProvider
						// onBack={() => {
						// 	dispatch(api.util.invalidateTags([{ id: aniId, type: 'AniMedia' }]));
						// }}
						title={
							anilist?.data?.Media?.title[mediaLanguage] ??
							anilist?.data?.Media?.title?.romaji
						}
						shareLink={anilist?.data?.Media?.siteUrl}
						onEdit={openEdit}
						loading={false}
						BgImage={({ style }) => (
							<MediaBanner
								style={style}
								urls={
									anilist?.data?.Media?.relations?.edges?.length > 0
										? [
												anilist?.data?.Media?.bannerImage ??
													anilist?.data?.Media?.coverImage?.extraLarge,
												...anilist?.data?.Media?.relations?.edges?.map(
													(edge) => edge.node.bannerImage,
												),
											].filter((val) => val !== null)
										: [
												anilist?.data?.Media?.bannerImage ??
													anilist?.data?.Media?.coverImage?.extraLarge,
											]
								}
							/>
						)}
						isMediaScreen
						streamingLinks={[
							...anilist?.data?.Media?.externalLinks?.filter(
								(link) => link.type === ExternalLinkType.Streaming,
							),
							mangadexDB[aniId]
								? {
										id: 1,
										site: 'MangaDex',
										url: `https://mangadex.org/title/${mangadexDB[aniId]?.mangaId}`,
									}
								: null,
						]}
						onAniCard={() => {
							router.push({
								pathname: '/anicard',
								params: {
									id: `${aniId}`,
									cardType: 'media',
									mediaType: type,
									idMal: `${anilist?.data?.Media?.idMal}`,
								} as AniCardPageParams,
							});
						}}
					>
						<BodyContainer>
							<AnimViewMem>
								<FrontCoverMem
									data={anilist?.data?.Media}
									defaultTitle={mediaLanguage}
								/>
							</AnimViewMem>
							<AnimViewMem delay={200}>
								<TagView
									genres={anilist?.data?.Media?.genres}
									tags={anilist?.data?.Media?.tags}
								/>
								<View style={{ paddingVertical: 8 }}>
									<MediaScoresView
										height={60}
										averageScore={anilist?.data?.Media?.averageScore}
										meanScore={anilist?.data?.Media?.meanScore}
										malScore={jikan?.data?.data?.data?.score}
										userScore={anilist?.data?.Media?.mediaListEntry?.score}
									/>
								</View>
								{/* <ScoreCircles
									avgScore={anilist?.data?.Media?.averageScore}
									meanScore={anilist?.data?.Media?.meanScore}
									malScore={jikan?.data?.data?.data?.score}
									userScore={anilist?.data?.Media?.mediaListEntry?.score}
									scoreColors={scoreColors}
								/> */}
							</AnimViewMem>

							{userID && (
								<ListEntryView
									id={aniId}
									type={anilist?.data?.Media?.type}
									status={anilist?.data?.Media?.status}
									releaseMessage={releaseText}
									onShowReleases={() =>
										SheetManager.show('MediaReleasesSheet', {
											payload: {
												status: anilist?.data?.Media?.status,
												animeReleases:
													anilist?.data?.Media?.airingSchedule?.nodes
														?.length > 0
														? anilist?.data?.Media?.airingSchedule
																?.nodes
														: undefined,
												releases:
													type === MediaType.Manga
														? muReleases?.data?.results
														: undefined,
												streamingEpisodes:
													anilist?.data?.Media?.streamingEpisodes,
												streamingSites: (
													jikan?.data?.data?.data as AnimeFull
												)?.streaming,
											},
										})
									}
									data={anilist?.data?.Media?.mediaListEntry}
									customLists={
										type === MediaType.Anime
											? (anilist?.data?.User?.mediaListOptions?.animeList
													?.customLists ?? [])
											: (anilist?.data?.User?.mediaListOptions?.mangaList
													?.customLists ?? [])
									}
									scoreFormat={anilist?.data?.User?.mediaListOptions?.scoreFormat}
									media={anilist?.data?.Media}
									refreshData={anilist?.refetch}
								/>
							)}
							<AnimViewMem delay={400}>
								<Description
									aniDescription={anilist?.data?.Media?.descriptionHTML}
									malDescription={jikan?.data?.data?.data?.synopsis}
								/>
							</AnimViewMem>
							<AnimViewMem delay={600}>
								<MetaData
									data={anilist?.data?.Media}
									malData={jikan?.data?.data?.data}
								/>
								{(anilist?.data?.Media?.rankings?.length > 0 ||
									anilist?.data?.Media?.stats?.scoreDistribution?.length > 0 ||
									anilist?.data?.Media?.stats?.statusDistribution?.length >
										0) && (
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
											openMuDialog={toggleMuDialog}
										/>
									)}
							</AnimViewMem>
							<AnimViewMem delay={800}>
								<Relations data={anilist?.data?.Media?.relations} />
							</AnimViewMem>
							<AnimViewMem delay={1000}>
								<CharacterPrevList
									data={anilist?.data?.Media?.characters}
									openMore={() =>
										router.push({
											// @ts-ignore
											pathname: '/character/characterList',
											params: { mediaId: anilist?.data?.Media?.id },
										})
									}
								/>
							</AnimViewMem>
							<AnimViewMem delay={1200}>
								<StaffPrevList
									data={anilist?.data?.Media?.staff}
									openMore={() =>
										router.push({
											// @ts-ignore router type gen aint workin
											pathname: '/staff/staffList',
											params: { mediaId: anilist?.data?.Media?.id },
										})
									}
								/>
							</AnimViewMem>
							<ReviewsSection
								data={anilist?.data?.Media?.reviews}
								openMore={() => router.push(`/reviews/${anilist?.data?.Media?.id}`)}
							/>
							<ThreadOverview
								aniId={aniId}
								data={threadsQuery?.data}
								isFetching={threadsQuery?.isFetching}
							/>
							{userID && (
								<FollowingPrevList data={anilist?.data?.Following?.mediaList} />
							)}
							<RecList data={anilist?.data?.Media?.recommendations} />
							{type === MediaType.Anime && (
								<AnimeTrailer video={anilist?.data?.Media?.trailer?.id} />
							)}
							{type === MediaType.Anime && (
								<ScreenshotImages data={anilist?.data?.Media?.streamingEpisodes} />
							)}
							{type === MediaType.Manga &&
								anilist?.data?.Media?.format !== MediaFormat.Novel && (
									<ChapterPreview
										aniId={aniId}
										title={
											anilist?.data?.Media?.title?.romaji ??
											anilist?.data?.Media?.title?.native
										}
									/>
								)}
							<MediaLinks
								links={anilist?.data?.Media?.externalLinks}
								aniLink={anilist?.data?.Media?.siteUrl}
								malLink={
									anilist?.data?.Media?.idMal
										? `https://myanimelist.net/${anilist?.data?.Media?.type?.toLowerCase()}/${
												anilist?.data?.Media?.idMal
											}`
										: null
								}
								muLink={type === MediaType.Manga && muSeries?.data?.data?.url}
							/>
						</BodyContainer>
					</FadeHeaderProvider>
					<Portal>
						{type === MediaType.Manga && (
							<MuSearchDialog
								title={
									anilist?.data?.Media?.title?.english ??
									anilist?.data?.Media?.title?.romaji
								}
								altTitles={[
									...new Set([
										...Object.values(anilist?.data?.Media?.title),
										...(anilist?.data?.Media?.synonyms ?? []),
									]),
								]}
								aniId={aniId}
								visible={showMuDialog}
								onDismiss={toggleMuDialog}
								onConfirm={onConfirmMuDialog}
							/>
						)}
						{(anilist?.data?.Media?.airingSchedule?.nodes ||
							muReleases?.data?.results) && (
							<ReleasesDialog
								visible={showReleaseDialog}
								onDismiss={() => setShowReleaseDialog(false)}
								releases={
									type === MediaType.Manga ? muReleases?.data?.results : undefined
								}
								animeReleases={
									anilist?.data?.Media?.airingSchedule?.nodes?.length > 0
										? anilist?.data?.Media?.airingSchedule?.nodes
										: undefined
								}
								status={anilist?.data?.Media?.status}
								streamingEpisodes={anilist?.data?.Media?.streamingEpisodes}
								streamingSites={(jikan?.data?.data?.data as AnimeFull)?.streaming}
							/>
						)}
					</Portal>
				</Animated.View>
			)}
		</View>
	);
};

export default MediaScreen;
