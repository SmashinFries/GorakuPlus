import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Portal, Text, useTheme } from 'react-native-paper';
import { RootStackProps } from '../../navigation/types';
import { useEffect, useState } from 'react';
import { FadeHeaderProvider, MediaHeader } from '../../components/headers';
import { MediaLoading } from './components/loading';
import { useMedia } from './hooks/mediaHook';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { AnimatePresence, MotiScrollView } from 'moti';
import { MediaBanner } from './components/banner';
import { Image } from 'expo-image';
import BodyContainer from './body';
import { FrontCover } from './sections/frontCover';
import { Description } from './sections/description';
import ListEntryView from './sections/entry';
import TagView from './sections/tags';
import ScoreView, { ScoreCircles } from './sections/scores';
import { AnimeTrailer } from './sections/trailer';
import { MediaType } from '../../app/services/anilist/generated-anilist';
import { EpisodeDialog } from './components/dialogs';

const MediaScreen = ({ navigation, route }: NativeStackScreenProps<RootStackProps, 'media'>) => {
    const { aniID, malID, type } = route.params;
    const { aniData, malData, videoData } = useMedia(aniID, type, malID);
    const [loading, setLoading] = useState(true);
    const [showEpDialog, setShowEpDialog] = useState(false);
    const { colors } = useTheme();

    const { mediaLanguage, scoreColors } = useSelector(
        (state: RootState) => state.persistedSettings,
    );

    const toggleEPDialog = () => setShowEpDialog(true);

    useEffect(() => {
        if (!aniData.isLoading && !malData.isLoading) {
            setLoading(false);
        }
    }, [aniData.isLoading, malData.isLoading]);

    return (
        <AnimatePresence exitBeforeEnter>
            {loading ? (
                <MediaLoading
                    aniLoading={aniData?.isLoading}
                    aniError={aniData?.error}
                    malLoading={malData?.isLoading ?? null}
                />
            ) : (
                <View>
                    <MediaBanner
                        url={
                            aniData?.data?.Media?.bannerImage ??
                            aniData?.data?.Media?.coverImage?.extraLarge
                        }
                    />
                    <FadeHeaderProvider
                        title={
                            aniData?.data?.Media?.title[mediaLanguage] ??
                            aniData?.data?.Media?.title?.romaji
                        }
                        loading={loading}
                    >
                        <BodyContainer>
                            <FrontCover
                                data={aniData?.data?.Media}
                                music={videoData?.data?.data?.music_videos}
                                toggleEP={toggleEPDialog}
                                defaultTitle={mediaLanguage}
                            />
                            <TagView
                                genres={aniData?.data?.Media?.genres}
                                tags={aniData?.data?.Media?.tags}
                            />
                            {/* <ScoreView
                                avgScore={aniData?.data?.Media?.averageScore}
                                meanScore={aniData?.data?.Media?.meanScore}
                                malScore={malData?.data?.data?.score}
                            /> */}
                            <ScoreCircles
                                avgScore={aniData?.data?.Media?.averageScore}
                                meanScore={aniData?.data?.Media?.meanScore}
                                malScore={malData?.data?.data?.score}
                                userScore={aniData?.data?.Media?.mediaListEntry?.score}
                                scoreColors={scoreColors}
                            />
                            <ListEntryView
                                id={aniID}
                                type={aniData?.data?.Media?.type}
                                data={aniData?.data?.Media?.mediaListEntry}
                                isFav={aniData?.data?.Media?.isFavourite}
                            />
                            <Description
                                aniDescription={aniData?.data?.Media?.description}
                                malDescription={malData?.data?.data?.synopsis}
                            />
                            {type === MediaType.Anime && (
                                <AnimeTrailer video={aniData?.data?.Media?.trailer?.id} />
                            )}
                        </BodyContainer>
                        <Portal>
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
