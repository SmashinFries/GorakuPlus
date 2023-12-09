import { StyleSheet, View } from 'react-native';
import { Button, Portal, Text } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import { MediaType } from '@/store/services/anilist/generated-anilist';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { router, useLocalSearchParams } from 'expo-router';
import { useMedia } from '@/hooks/media/mediaHook';
import { updateDB } from '@/store/slices/muSlice';
import { openWebBrowser } from '@/utils/webBrowser';
import { MediaLoadingMem } from '@/components/media/loading';
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
import MalImages from '@/components/media/sections/images';
import MediaLinks from '@/components/media/sections/links';
import { MuSearchDialog } from '@/components/media/dialogs';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { api } from '@/store/services/anilist/enhanced';

const MediaScreen = () => {
    const { params } = useLocalSearchParams<{ params: [string, string] }>(); // /anime/1234
    // const params2 = useGlobalSearchParams();

    const aniID = Number(params[1]);
    const type = params[0].toLowerCase() === 'anime' ? MediaType.Anime : MediaType.Manga;
    const muDB = useAppSelector((state) => state.peresistedMuDB);
    const { aniData, malData, videoData, mangaUpdates, isAniLoading, isMalLoading, isMuLoading } =
        useMedia(aniID, type, muDB['data'][aniID]);

    const [showEpDialog, setShowEpDialog] = useState(false);
    const [showMuDialog, setShowMuDialog] = useState(false);

    const { mediaLanguage, scoreColors, allowSensorMotion } = useAppSelector(
        (state) => state.persistedSettings,
    );

    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const dispatch = useAppDispatch();

    const toggleEPDialog = useCallback(() => setShowEpDialog(true), []);
    const toggleMuDialog = useCallback(() => setShowMuDialog((prev) => !prev), []);

    const onConfirmMuDialog = useCallback((muId: number) => {
        dispatch(updateDB({ aniId: aniID, muId: muId }));
        toggleMuDialog();
    }, []);

    const openEdit = useCallback(() => {
        openWebBrowser(`https://anilist.co/edit/${params[0]}/${aniID}`);
    }, []);

    if (!params) return null;

    return (
        <View>
            {(isAniLoading || isMalLoading || isMuLoading) && (
                <MediaLoadingMem
                    aniLoading={isAniLoading}
                    mangaUpdatesLoading={type !== MediaType.Anime ? isMuLoading : null}
                    aniError={aniData?.error}
                    malLoading={isMalLoading}
                    malUnitialized={malData?.isUninitialized}
                />
            )}

            {!isAniLoading && !isMalLoading && !isMuLoading && (
                <Animated.View entering={FadeIn.duration(500).easing(Easing.ease)}>
                    <FadeHeaderProvider
                        onBack={() => {
                            dispatch(api.util.invalidateTags([{ id: aniID, type: 'AniMedia' }]));
                        }}
                        title={
                            aniData?.data?.Media?.title[mediaLanguage] ??
                            aniData?.data?.Media?.title?.romaji
                        }
                        shareLink={aniData?.data?.Media?.siteUrl}
                        onEdit={openEdit}
                        loading={false}
                        BgImage={({ style }) => (
                            <MediaBanner
                                style={style}
                                url={
                                    aniData?.data?.Media?.bannerImage ??
                                    aniData?.data?.Media?.coverImage?.extraLarge
                                }
                                allowMotion={allowSensorMotion}
                            />
                        )}
                    >
                        <BodyContainer>
                            <FrontCoverMem
                                data={aniData?.data?.Media}
                                music={videoData?.data?.data?.music_videos}
                                toggleEP={toggleEPDialog}
                                defaultTitle={mediaLanguage}
                            />
                            <TransYUpViewMem animation={true} delay={550}>
                                <TagView
                                    genres={aniData?.data?.Media?.genres}
                                    tags={aniData?.data?.Media?.tags}
                                />
                                <ScoreCircles
                                    avgScore={aniData?.data?.Media?.averageScore}
                                    meanScore={aniData?.data?.Media?.meanScore}
                                    malScore={malData?.data?.data?.score}
                                    userScore={aniData?.data?.Media?.mediaListEntry?.score}
                                    scoreColors={scoreColors}
                                />
                                {userID && (
                                    <ListEntryViewMem
                                        id={aniID}
                                        type={aniData?.data?.Media?.type}
                                        data={aniData?.data?.Media?.mediaListEntry}
                                        scoreFormat={
                                            aniData?.data?.User?.mediaListOptions?.scoreFormat
                                        }
                                        isFav={aniData?.data?.Media?.isFavourite}
                                    />
                                )}
                                <DescriptionMem
                                    aniDescription={aniData?.data?.Media?.description}
                                    malDescription={malData?.data?.data?.synopsis}
                                />
                                <MetaData data={aniData?.data?.Media} />
                                {mangaUpdates && aniData?.data?.Media?.type !== MediaType.Anime && (
                                    <MUData
                                        data={mangaUpdates?.data}
                                        openMuDialog={toggleMuDialog}
                                    />
                                )}
                                <RelationsMem data={aniData?.data?.Media?.relations} />
                                <CharacterPrevListMem
                                    data={aniData?.data?.Media?.characters}
                                    openMore={() =>
                                        router.push(
                                            `/characters/${aniData?.data?.Media?.type}/${aniData?.data?.Media?.id}`,
                                        )
                                    }
                                />
                                <StaffPrevListMem
                                    data={aniData?.data?.Media?.staff}
                                    openMore={() =>
                                        router.push(`/staff/${aniData?.data?.Media?.id}`)
                                    }
                                />
                                {userID && (
                                    <FollowingPrevListMem data={aniData?.data?.Page?.mediaList} />
                                )}
                                <RecListMem data={aniData?.data?.Media?.recommendations} />
                                {/* <MalImages
                                    data={
                                        type === MediaType.Anime
                                            ? animeImages.data
                                            : mangaImages.data
                                    }
                                /> */}
                                {type === MediaType.Anime && (
                                    <AnimeTrailer video={aniData?.data?.Media?.trailer?.id} />
                                )}
                                <MediaLinks
                                    links={aniData?.data?.Media?.externalLinks}
                                    aniLink={aniData?.data?.Media?.siteUrl}
                                    malLink={
                                        aniData?.data?.Media?.idMal
                                            ? `https://myanimelist.net/${aniData?.data?.Media?.type.toLowerCase()}/${
                                                  aniData?.data?.Media?.idMal
                                              }`
                                            : null
                                    }
                                    muLink={mangaUpdates?.data?.url}
                                />
                            </TransYUpViewMem>
                        </BodyContainer>
                        <Portal>
                            {type === MediaType.Manga && (
                                <MuSearchDialog
                                    title={aniData?.data?.Media?.title?.romaji}
                                    currentMuID={muDB['data'][aniID]}
                                    visible={showMuDialog}
                                    onDismiss={toggleMuDialog}
                                    onConfirm={onConfirmMuDialog}
                                />
                            )}
                        </Portal>
                    </FadeHeaderProvider>
                </Animated.View>
            )}
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export default MediaScreen;
