import { MotiView } from 'moti';
import { AniMediaQuery } from '../../../app/services/anilist/generated-anilist';
import { Image } from 'expo-image';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { QuickSelector } from '../components/quickSelect';
import { TransXInView, TransYUpView } from '../../../components/animations';
import { useState } from 'react';
import { StatusIcon } from '../components/icons';
import { MediaTitleView } from '../components/text';
import { useNavigation } from '@react-navigation/native';
import { RootStackProps } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import {
    GetAnimeFullByIdApiResponse,
    GetAnimeVideosApiResponse,
} from '../../../app/services/mal/malApi';

type FrontCoverProps = {
    data: AniMediaQuery['Media'];
    music: GetAnimeVideosApiResponse['data']['music_videos'];
    defaultTitle: 'romaji' | 'english' | 'native';
    toggleEP?: () => void;
};
export const FrontCover = ({ data, music, defaultTitle }: FrontCoverProps) => {
    const { width, height } = useWindowDimensions();
    const nav = useNavigation<NativeStackNavigationProp<RootStackProps, 'media'>>();

    return (
        <MotiView style={[styles.container, { width: width }]}>
            <MotiView
                style={{
                    flex: 1,
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                }}
            >
                {/* <ScoreText score={data?.averageScore} svg="ani" /> */}
                <TransXInView
                    direction="left"
                    style={{ justifyContent: 'space-evenly', width: '100%' }}
                >
                    <QuickSelector
                        onPress={() => nav.navigate('music', { animeID: data?.idMal })}
                        // onPress={() => console.log(music)}
                        disabled={music?.length < 1}
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

                    <QuickSelector icon="newspaper" />
                </TransXInView>
                <TransYUpView>
                    <Image
                        style={[styles.coverImg]}
                        contentFit="cover"
                        source={{ uri: data?.coverImage?.extraLarge }}
                    />
                    <StatusIcon status={data?.status} />
                </TransYUpView>
                <TransXInView
                    direction="right"
                    style={{ justifyContent: 'space-evenly', width: '100%' }}
                >
                    <QuickSelector icon={'badge-account-outline'} />
                    <QuickSelector icon={'account-group-outline'} />
                </TransXInView>
            </MotiView>
            <MediaTitleView data={data} defaultTitle={defaultTitle} />
        </MotiView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
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
