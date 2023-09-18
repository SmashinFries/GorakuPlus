import { MotiView } from 'moti';
import { AniMediaQuery, MediaType } from '../../../app/services/anilist/generated-anilist';
import { Image } from 'expo-image';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { QuickSelector } from '../components/quickSelect';
import { TransXInView, TransYUpView, TransYUpViewMem } from '../../../components/animations';
import { memo, useCallback, useEffect, useState } from 'react';
import { StatusIcon, StatusIconMem } from '../components/icons';
import { MediaTitleView } from '../components/text';
import { useNavigation } from '@react-navigation/native';
import { RootStackProps } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import {
    GetAnimeFullByIdApiResponse,
    GetAnimeVideosApiResponse,
} from '../../../app/services/mal/malApi';
import { useTheme } from 'react-native-paper';

type FrontCoverProps = {
    data: AniMediaQuery['Media'];
    music: GetAnimeVideosApiResponse['data']['music_videos'];
    defaultTitle: 'romaji' | 'english' | 'native';
    toggleEP?: () => void;
};
export const FrontCover = ({ data, music, defaultTitle }: FrontCoverProps) => {
    const { width, height } = useWindowDimensions();
    const nav = useNavigation<NativeStackNavigationProp<RootStackProps, 'media'>>();
    const { colors } = useTheme();

    const StatusAnim = useCallback(() => {
        return (
            <StatusIconMem
                status={data?.status}
                release_date={data?.startDate}
                nextEP={data?.nextAiringEpisode}
            />
        );
    }, []);

    return (
        <MotiView style={[styles.container, { width: width }]}>
            <MotiView
                style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                }}
            >
                {/* Left Icons */}
                <TransXInView
                    direction="left"
                    delay={350}
                    style={{
                        justifyContent: 'space-evenly',
                        width: '100%',
                        flex: 1,
                    }}
                >
                    <QuickSelector
                        onPress={() => nav.navigate('music', { animeID: data?.idMal })}
                        // onPress={() => console.log(music)}
                        disabled={data?.type !== MediaType.Anime || music?.length < 1}
                        icon="music-box-multiple-outline"
                    />
                    {/* <QuickSelector
                        icon={
                            data?.streamingEpisodes?.length < 1
                                ? 'movie-open-remove-outline'
                                : 'movie-open-check-outline'
                        }
                        onPress={() => toggleEP()}
                        disabled={data?.streamingEpisodes?.length < 1}
                    /> */}

                    <QuickSelector
                        icon="newspaper"
                        onPress={() =>
                            nav.push('newsStack', {
                                screen: 'newsList',
                                params: { malId: data?.idMal, type: data?.type },
                            })
                        }
                        disabled={!data?.idMal}
                    />
                </TransXInView>

                {/* Cover Image */}
                <TransYUpViewMem>
                    <Image
                        style={[styles.coverImg, { backgroundColor: colors.onSurfaceVariant }]}
                        contentFit="cover"
                        source={{ uri: data?.coverImage?.extraLarge }}
                    />
                    {data?.status && <StatusAnim />}
                </TransYUpViewMem>
                {/* Right Icons */}
                <TransXInView
                    direction="right"
                    delay={350}
                    style={{
                        flex: 1,
                        justifyContent: 'space-evenly',
                        width: '100%',
                    }}
                >
                    <QuickSelector
                        icon={'badge-account-outline'}
                        disabled={data?.staff?.edges?.length < 1}
                        onPress={() =>
                            nav.navigate('staffStack', {
                                screen: 'staffList',
                                params: { mediaId: data?.id },
                                initial: false,
                            })
                        }
                    />
                    <QuickSelector
                        icon={'account-group-outline'}
                        disabled={data?.characters?.edges?.length < 1}
                        onPress={() =>
                            nav.navigate('characterStack', {
                                screen: 'characterList',
                                params: { mediaId: data?.id },
                                initial: false,
                            })
                        }
                    />
                </TransXInView>
            </MotiView>
            <MediaTitleView data={data} defaultTitle={defaultTitle} />
        </MotiView>
    );
};

export const FrontCoverMem = memo(FrontCover);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        zIndex: 10,
        overflow: 'visible',
    },
    coverImg: {
        borderRadius: 12,
        height: 230,
        width: 155,
        alignSelf: 'center',
    },
    title: {
        flexWrap: 'wrap',
        marginTop: 10,
        textAlign: 'center',
    },
});
