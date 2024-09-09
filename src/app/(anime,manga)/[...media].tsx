import { StyleSheet, View } from 'react-native';
import { Button, Portal, Text } from 'react-native-paper';
import { useCallback, useEffect, useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useMedia } from '@/hooks/media/useMedia';
import { openWebBrowser } from '@/utils/webBrowser';
import { MediaLoading, MediaLoadingMem } from '@/components/media/loading';
import { FadeHeaderProvider } from '@/components/headers';
import { MediaBanner } from '@/components/media/banner';
import { FrontCover, FrontCoverMem } from '@/components/media/sections/frontCover';
import { AnimViewMem } from '@/components/animations';
import BodyContainer from '@/components/media/body';
import TagView from '@/components/media/sections/tags';
import ListEntryView from '@/components/media/sections/entry';
import { Description, DescriptionMem } from '@/components/media/sections/description';
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
import {
	ExternalLinkType,
	MediaType,
	ThreadsOverviewQuery,
	useThreadsOverviewQuery,
} from '@/api/anilist/__genereated__/gql';
import { useMatchStore } from '@/store/matchStore';
import { AnimeFull } from '@/api/jikan/models';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { AniCardPageParams } from '@/types/anicard';
import { MediaScoresView } from '@/components/media/sections/scores';
import { ThreadOverview } from '@/components/media/sections/threads';
import {
	QuickActionBottomSheet,
	QuickActionCharStaffBottomSheet,
	QuickActionUserBottomSheet,
	ThreadOverviewBottomSheet,
} from '@/components/bottomsheets';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQuickActionCS, useQuickActionSheet, useQuickActionUser } from '@/hooks/useQuickAction';

const MediaScreen = () => {
	const { media } = useLocalSearchParams<{ media: [string, string] }>(); // /anime/1234
	const aniID: number | null = media ? parseInt(media[1]) : null;
	const type: MediaType | null = media
		? media[0].toLowerCase() === 'anime'
			? MediaType.Anime
			: MediaType.Manga
		: null;

	const { quickActionRef, selectedMedia, onMediaLongSelect } = useQuickActionSheet();
	const { quickActionCSRef, selectedCS, onCSLongSelect } = useQuickActionCS();
	const { quickActionUserRef, selectedUser, onUserLongSelect } = useQuickActionUser();

	const { mediaLanguage, scoreColors } = useSettingsStore();
	const { userID } = useAuthStore((state) => state.anilist);
	const { anilist, jikan, muReleases, muSeries, isReady } = useMedia(aniID, type);
	const threadsQuery = useThreadsOverviewQuery({ id: aniID, page: 1, perPage: 10 });

	const [showReleaseDialog, setShowReleaseDialog] = useState(false);
	const [showMuDialog, setShowMuDialog] = useState(false);

	const toggleMuDialog = useCallback(() => setShowMuDialog((prev) => !prev), []);

	const onConfirmMuDialog = useCallback(() => {
		muSeries.refetch();
		toggleMuDialog();
	}, []);

	const openEdit = useCallback(() => {
		openWebBrowser(`https://anilist.co/edit/${type}/${aniID}`);
	}, []);

	const getRelease = useCallback(() => {
		return getReleaseTime(
			type,
			anilist?.data?.Media?.status,
			anilist?.data?.Media?.nextAiringEpisode,
			'Chapter Time Test',
			anilist?.data?.Media?.chapters,
			anilist?.data?.Media?.episodes,
			anilist?.data?.Media?.volumes,
		);
	}, [type, anilist?.data]);

	if (!media || !aniID) return null;

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
				/>
			)}

			{isReady && (
				<Animated.View>
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
						streamingLinks={anilist?.data?.Media?.externalLinks?.filter(
							(link) => link.type === ExternalLinkType.Streaming,
						)}
						onAniCard={() => {
							console.log(anilist?.data?.Media?.idMal);
							router.push({
								pathname: '/anicard',
								params: {
									id: `${aniID}`,
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
									id={aniID}
									type={anilist?.data?.Media?.type}
									status={anilist?.data?.Media?.status}
									releaseMessage={getRelease()}
									onShowReleases={() => setShowReleaseDialog(true)}
									data={anilist?.data?.Media?.mediaListEntry}
									customLists={
										type === MediaType.Anime
											? anilist?.data?.User?.mediaListOptions?.animeList
													?.customLists ?? []
											: anilist?.data?.User?.mediaListOptions?.mangaList
													?.customLists ?? []
									}
									scoreFormat={anilist?.data?.User?.mediaListOptions?.scoreFormat}
									isFav={anilist?.data?.Media?.isFavourite}
									refreshData={anilist.refetch}
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
										id={aniID}
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
							</AnimViewMem>
							<AnimViewMem delay={800}>
								<RelationsMem
									data={anilist?.data?.Media?.relations}
									onLongSelect={onMediaLongSelect}
								/>
							</AnimViewMem>
							<AnimViewMem delay={1000}>
								<CharacterPrevListMem
									data={anilist?.data?.Media?.characters}
									openMore={() =>
										router.push({
											// @ts-ignore
											pathname: '/character/characterList',
											params: { mediaId: anilist?.data?.Media?.id },
										})
									}
									onLongSelect={onCSLongSelect}
								/>
							</AnimViewMem>
							<StaffPrevListMem
								data={anilist?.data?.Media?.staff}
								openMore={() =>
									router.push({
										// @ts-ignore router type gen aint workin
										pathname: '/staff/staffList',
										params: { mediaId: anilist?.data?.Media?.id },
									})
								}
								onLongSelect={onCSLongSelect}
							/>
							<ReviewsSection
								data={anilist?.data?.Media?.reviews}
								openMore={() => router.push(`/reviews/${anilist?.data?.Media?.id}`)}
							/>
							<ThreadOverview
								aniId={aniID}
								data={threadsQuery?.data}
								isFetching={threadsQuery?.isFetching}
							/>
							{userID && (
								<FollowingPrevListMem
									data={anilist?.data?.Following?.mediaList}
									onLongSelect={onUserLongSelect}
								/>
							)}
							<RecListMem
								data={anilist?.data?.Media?.recommendations}
								onLongSelect={onMediaLongSelect}
							/>
							{type === MediaType.Anime && (
								<AnimeTrailer video={anilist?.data?.Media?.trailer?.id} />
							)}
							{type === MediaType.Anime && (
								<ScreenshotImages data={anilist?.data?.Media?.streamingEpisodes} />
							)}
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
								muLink={type === MediaType.Manga && muSeries?.data?.data?.url}
							/>
						</BodyContainer>
					</FadeHeaderProvider>
					<QuickActionBottomSheet ref={quickActionRef} {...selectedMedia} />
					<QuickActionCharStaffBottomSheet ref={quickActionCSRef} {...selectedCS} />
					<QuickActionUserBottomSheet ref={quickActionUserRef} {...selectedUser} />
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
								aniId={aniID}
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
