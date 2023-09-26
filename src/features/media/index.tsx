import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, Portal, Text } from 'react-native-paper';
import { RootStackProps } from '../../navigation/types';
import { useCallback, useEffect, useState } from 'react';
import { FadeHeaderProvider } from '../../components/headers';
import { MediaLoadingMem } from './components/loading';
import { useMedia } from './hooks/mediaHook';
import { AnimatePresence } from 'moti';
import { MediaBanner } from './components/banner';
import BodyContainer from './body';
import { FrontCoverMem } from './sections/frontCover';
import { DescriptionMem } from './sections/description';
import { ListEntryViewMem } from './sections/entry';
import TagView from './sections/tags';
import { ScoreCircles } from './sections/scores';
import { CharacterPrevListMem } from './sections/characters';
import { StaffPrevListMem } from './sections/staff';
import MalImages from './sections/images';
import { RelationsMem } from './sections/relations';
import { RecListMem } from './sections/recoms';
import { MediaType } from '../../app/services/anilist/generated-anilist';
import { AnimeTrailer } from './sections/trailer';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MUData, MetaData } from './sections/meta';
import { MuSearchDialog } from './components/dialogs';
import { openWebBrowser } from '../../utils/webBrowser';
import { updateDB } from './muSlice';
import MediaLinks from './sections/links';
import { TransYUpViewMem } from '../../components/animations';
import * as Linking from 'expo-linking';
import { FollowingPrevListMem } from './sections/following';

const cleanName = (query: string) => {
    const splitName = query?.split(' ') ?? null;
    if (splitName) {
        if (splitName?.length === 1) {
            return splitName[0].toLowerCase();
        } else if (splitName?.length > 2) {
            return `${splitName[0].toLowerCase()} ${splitName.at(-1).toLowerCase()}`;
        } else {
            return query.toLowerCase();
        }
    } else {
        return null;
    }
};

const MediaScreen = ({ navigation, route }: NativeStackScreenProps<RootStackProps, 'media'>) => {
    const { aniID, malID, type } = route.params;
    const muDB = useAppSelector((state) => state.peresistedMuDB);
    const { aniData, malData, videoData, mangaUpdates, animeImages, mangaImages } = useMedia(
        aniID,
        type,
        malID,
        muDB['data'][aniID],
    );
    const [loading, setLoading] = useState(true);

    const [showEpDialog, setShowEpDialog] = useState(false);
    const [showMuDialog, setShowMuDialog] = useState(false);

    const { mediaLanguage, scoreColors } = useAppSelector((state) => state.persistedSettings);

    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const dispatch = useAppDispatch();

    const toggleEPDialog = useCallback(() => setShowEpDialog(true), []);
    const toggleMuDialog = useCallback(() => setShowMuDialog((prev) => !prev), []);

    const onConfirmMuDialog = useCallback((muId: number) => {
        dispatch(updateDB({ aniId: aniID, muId: muId }));
        toggleMuDialog();
    }, []);

    const openEdit = useCallback(() => {
        openWebBrowser(
            `https://anilist.co/edit/${type === MediaType.Anime ? 'anime' : 'manga'}/${aniID}`,
        );
    }, []);

    useEffect(() => {
        if (!aniData.isFetching && !malData.isFetching && !mangaUpdates?.isFetching) {
            setLoading(false);
        }
    }, [aniData.isFetching, malData.isFetching, !mangaUpdates?.isFetching]);

    return (
        <AnimatePresence exitBeforeEnter>
            {loading && (
                <MediaLoadingMem
                    key="loading"
                    aniLoading={aniData?.isFetching}
                    mangaUpdatesLoading={mangaUpdates?.isFetching ?? null}
                    aniError={aniData?.error}
                    malLoading={malData?.isFetching ?? null}
                    malUnitialized={malData?.isUninitialized}
                />
            )}

            {!loading && (
                <View key="loaded">
                    <FadeHeaderProvider
                        title={
                            aniData?.data?.Media?.title[mediaLanguage] ??
                            aniData?.data?.Media?.title?.romaji
                        }
                        shareLink={aniData?.data?.Media?.siteUrl}
                        onEdit={openEdit}
                        loading={loading}
                        BgImage={({ style }) => (
                            <MediaBanner
                                style={style}
                                url={
                                    aniData?.data?.Media?.bannerImage ??
                                    aniData?.data?.Media?.coverImage?.extraLarge
                                }
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
                                {mangaUpdates && (
                                    <MUData
                                        data={mangaUpdates?.data}
                                        openMuDialog={toggleMuDialog}
                                    />
                                )}
                                <RelationsMem
                                    data={aniData?.data?.Media?.relations}
                                    scoreColors={scoreColors}
                                />
                                <CharacterPrevListMem data={aniData?.data?.Media?.characters} />
                                <StaffPrevListMem data={aniData?.data?.Media?.staff} />
                                {userID && (
                                    <FollowingPrevListMem data={aniData?.data?.Page?.mediaList} />
                                )}
                                <RecListMem data={aniData?.data?.Media?.recommendations} />
                                <MalImages
                                    data={
                                        type === MediaType.Anime
                                            ? animeImages.data
                                            : mangaImages.data
                                    }
                                />
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
                            {/* {aniData?.data?.Media?.streamingEpisodes && (
                                <EpisodeDialog
                                    visible={showEpDialog}
                                    onDismiss={() => setShowEpDialog(false)}
                                    episodes={aniData?.data?.Media?.streamingEpisodes}
                                />
                            )} */}
                        </Portal>
                    </FadeHeaderProvider>
                </View>
            )}
        </AnimatePresence>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export default MediaScreen;
