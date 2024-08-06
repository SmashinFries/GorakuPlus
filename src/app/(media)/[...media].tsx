import { StyleSheet, View } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useMedia, useTestMedia } from '@/hooks/media/useMedia';
import { openWebBrowser } from '@/utils/webBrowser';
import { MediaLoading, MediaLoadingMem } from '@/components/media/loading';
import { FadeHeaderProvider } from '@/components/headers';
import { MediaBanner } from '@/components/media/banner';
import { FrontCoverMem } from '@/components/media/sections/frontCover';
import { TransYUpViewMem } from '@/components/animations';
import ScoreCircles from '@/components/media/sections/scores';
import BodyContainer from '@/components/media/body';
import TagView from '@/components/media/sections/tags';
import { ListEntryViewMem } from '@/components/media/sections/entry';
import { DescriptionMem } from '@/components/media/sections/description';
import { RelationsMem } from '@/components/media/sections/relations';
import { MUData, MetaData } from '@/components/media/sections/meta';
import { CharacterPrevListMem } from '@/components/media/sections/characters';
import { StaffPrevListMem } from '@/components/media/sections/staff';
import { FollowingPrevListMem } from '@/components/media/sections/following';
import { RecListMem } from '@/components/media/sections/recoms';
import { AnimeTrailer } from '@/components/media/sections/trailer';
import MediaLinks from '@/components/media/sections/links';
import { MuSearchDialog, ReleasesDialog } from '@/components/media/dialogs';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { getReleaseTime, getTimeUntil } from '@/utils';
import ReviewsSection from '@/components/media/sections/reviews';
import { StatSection } from '@/components/media/sections/stats';
import ScreenshotImages from '@/components/media/sections/screenshots';
import { ExternalLinkType, MediaType } from '@/api/anilist/__genereated__/gql';
import { useMatchStore } from '@/store/matchStore';
import { AnimeFull } from '@/api/jikan/models';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';

const MediaScreen = () => {
	const { media } = useLocalSearchParams<{ media: [string, string] }>(); // /anime/1234
	const aniID: number | null = media ? parseInt(media[1]) : null;
	const type: MediaType | null = media
		? media[0].toLowerCase() === 'anime'
			? MediaType.Anime
			: MediaType.Manga
		: null;

	const { addMangaUpdatesID, mangaUpdates: muDB } = useMatchStore();
	const { mediaLanguage, scoreColors, allowSensorMotion } = useSettingsStore();
	const { userID } = useAuthStore().anilist;
	// const {
	// 	aniData,
	// 	malData,
	// 	mangaUpdates,
	// 	mangaReleases,
	// 	estimatedChapterTime,
	// 	refetchMUContent,
	// 	refetchAniData,
	// 	isAniLoading,
	// 	isMalLoading,
	// 	isMuLoading,
	// } = useMedia(aniID, type, muDB['data'][aniID ?? 0]);
	const { anilist, jikan, muReleases, muSeries } = useMedia(aniID, type);

	const [showReleaseDialog, setShowReleaseDialog] = useState(false);
	const [showMuDialog, setShowMuDialog] = useState(false);

	const toggleMuDialog = useCallback(() => setShowMuDialog((prev) => !prev), []);

	const onConfirmMuDialog = useCallback((muId: number) => {
		addMangaUpdatesID(aniID, muId);
		refetchMUContent(muId);
		toggleMuDialog();
	}, []);

	const openEdit = useCallback(() => {
		openWebBrowser(`https://anilist.co/edit/${type}/${aniID}`);
	}, []);

	const getRelease = () => {
		return getReleaseTime(
			type,
			anilist?.data?.Media?.status,
			anilist?.data?.Media?.nextAiringEpisode,
			estimatedChapterTime,
			anilist?.data?.Media?.chapters,
			anilist?.data?.Media?.episodes,
			anilist?.data?.Media?.volumes,
		);
	};

	if (!media || !aniID) return null;

	return (
		<View>
			{(anilist.isLoading ||
				jikan.isLoading ||
				muSeries.isLoading ||
				muReleases.isLoading) && (
				<MediaLoading
					aniLoading={anilist.isLoading}
					mangaUpdatesLoading={
						type === MediaType.Manga ? muSeries.isLoading || muReleases.isLoading : null
					}
					aniError={anilist?.error}
					malLoading={jikan.isLoading}
					// malUnitialized={jikan.isUninitialized}
				/>
			)}

			{!anilist.isLoading &&
				!jikan.isLoading &&
				!muSeries.isLoading &&
				!muReleases.isLoading && (
					<Animated.View entering={FadeIn.duration(500).easing(Easing.ease)}>
						<FadeHeaderProvider
							// onBack={() => {
							// 	dispatch(api.util.invalidateTags([{ id: aniID, type: 'AniMedia' }]));
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
									url={
										anilist?.data?.Media?.bannerImage ??
										anilist?.data?.Media?.coverImage?.extraLarge
									}
									additionalUrls={
										anilist?.data?.Media?.relations?.edges?.length > 0
											? anilist?.data?.Media?.relations?.edges?.map(
													(edge) => edge.node.bannerImage,
												)
											: undefined
									}
									allowMotion={allowSensorMotion}
								/>
							)}
							isMediaScreen
							streamingLinks={anilist?.data?.Media?.externalLinks?.filter(
								(link) => link.type === ExternalLinkType.Streaming,
							)}
						>
							<BodyContainer>
								<FrontCoverMem
									data={anilist?.data?.Media}
									defaultTitle={mediaLanguage}
								/>
								<TransYUpViewMem animation={true} delay={550}>
									<TagView
										genres={anilist?.data?.Media?.genres}
										tags={anilist?.data?.Media?.tags}
									/>
									<ScoreCircles
										avgScore={anilist?.data?.Media?.averageScore}
										meanScore={anilist?.data?.Media?.meanScore}
										malScore={jikan?.data?.data?.data?.score}
										userScore={anilist?.data?.Media?.mediaListEntry?.score}
										scoreColors={scoreColors}
									/>
									{userID && (
										<ListEntryViewMem
											id={aniID}
											type={anilist?.data?.Media?.type}
											status={anilist?.data?.Media?.status}
											releaseMessage={getRelease()}
											onShowReleases={() => setShowReleaseDialog(true)}
											data={anilist?.data?.Media?.mediaListEntry}
											customLists={
												type === MediaType.Anime
													? anilist?.data?.User?.mediaListOptions
															?.animeList?.customLists ?? []
													: anilist?.data?.User?.mediaListOptions
															?.mangaList?.customLists ?? []
											}
											scoreFormat={
												anilist?.data?.User?.mediaListOptions?.scoreFormat
											}
											isFav={anilist?.data?.Media?.isFavourite}
											// refreshData={refetchanilist}
										/>
									)}
									<DescriptionMem
										aniDescription={anilist?.data?.Media?.description}
										malDescription={jikan?.data?.data?.data?.synopsis}
									/>

									<MetaData
										data={anilist?.data?.Media}
										malData={jikan?.data?.data?.data}
									/>
									{(anilist?.data?.Media?.rankings?.length > 0 ||
										anilist?.data?.Media?.stats?.scoreDistribution?.length >
											0 ||
										anilist?.data?.Media?.stats?.statusDistribution?.length >
											0) && (
										<StatSection
											rankData={anilist?.data?.Media?.rankings}
											statData={anilist?.data?.Media?.stats}
										/>
									)}
									{muSeries && anilist?.data?.Media?.type !== MediaType.Anime && (
										<MUData
											data={muSeries?.data?.data}
											openMuDialog={toggleMuDialog}
										/>
									)}
									<RelationsMem data={anilist?.data?.Media?.relations} />
									<CharacterPrevListMem
										data={anilist?.data?.Media?.characters}
										openMore={() =>
											router.push(
												`/characters/${anilist?.data?.Media?.type}/${anilist?.data?.Media?.id}`,
											)
										}
									/>
									<StaffPrevListMem
										data={anilist?.data?.Media?.staff}
										openMore={() =>
											router.push(`/staff/${anilist?.data?.Media?.id}`)
										}
									/>
									<ReviewsSection
										data={anilist?.data?.Media?.reviews}
										openMore={() =>
											router.push(`/reviews/${anilist?.data?.Media?.id}`)
										}
									/>
									{userID && (
										<FollowingPrevListMem
											data={anilist?.data?.Page?.mediaList}
										/>
									)}
									<RecListMem data={anilist?.data?.Media?.recommendations} />
									{/* <MalImages
                                    data={
                                        type === MediaType.Anime
                                            ? animeImages.data
                                            : mangaImages.data
                                    }
                                /> */}
									{type === MediaType.Anime && (
										<AnimeTrailer video={anilist?.data?.Media?.trailer?.id} />
									)}
									{type === MediaType.Anime && (
										<ScreenshotImages
											data={anilist?.data?.Media?.streamingEpisodes}
										/>
									)}
									{/* {type === MediaType.Anime && (
                                    <StreamingLinks
                                        streamLinks={(malData?.data?.data as AnimeFull)?.streaming}
                                    />
                                )} */}
									<MediaLinks
										links={anilist?.data?.Media?.externalLinks}
										aniLink={anilist?.data?.Media?.siteUrl}
										malLink={
											anilist?.data?.Media?.idMal
												? `https://myanimelist.net/${anilist?.data?.Media?.type.toLowerCase()}/${
														anilist?.data?.Media?.idMal
													}`
												: null
										}
										muLink={muSeries?.data?.data?.url}
									/>
								</TransYUpViewMem>
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
									currentMuID={muDB['data'][aniID]}
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
										type === MediaType.Manga
											? muReleases?.data?.results
											: undefined
									}
									animeReleases={
										anilist?.data?.Media?.airingSchedule?.nodes?.length > 0
											? anilist?.data?.Media?.airingSchedule?.nodes
											: undefined
									}
									status={anilist?.data?.Media?.status}
									streamingSites={
										(jikan?.data?.data?.data as AnimeFull)?.streaming
									}
								/>
							)}
						</Portal>
					</Animated.View>
				)}
		</View>
	);
};

export default MediaScreen;
