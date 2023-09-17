import {
    DefaultSectionT,
    Platform,
    RefreshControl,
    ScrollView,
    SectionList,
    SectionListData,
    View,
    useWindowDimensions,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import {
    ExploreMediaQuery,
    Media,
    MediaType,
} from '../../../app/services/anilist/generated-anilist';
import { MediaItemTest, RenderMediaItem } from './media';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { MediaListsPH } from './skeletons';
import { BackgroundArt } from './bg';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { LoadMoreButton } from '../../../components/buttons';
import { useNavigation } from '@react-navigation/native';
import { ExploreStackProps } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { useAppSelector } from '../../../app/hooks';
import { getScoreColor, rgbToRgba } from '../../../utils';
import { MediaCard, MediaProgressBar } from '../../../components/cards';
import { transformMediaDates } from '../../../app/services/anilist/utils/transformQuery';

type RefreshableScrollProps = {
    children: React.ReactNode;
    onRefresh: () => void;
    refreshing: boolean;
};
export const RefreshableScroll = ({ children, refreshing, onRefresh }: RefreshableScrollProps) => {
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    colors={['#FFF']}
                    progressBackgroundColor={'#000'}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {children}
        </ScrollView>
    );
};

type SectionScrollProps = {
    category_title: string;
    data: ExploreMediaQuery;
    isLoading: boolean;
    fetchMore?: () => void;
};

export const SectionScroll = ({
    category_title,
    data,
    fetchMore,
    isLoading,
}: SectionScrollProps) => {
    // const playSelectSound = useSound('selection');
    const initialBG =
        data?.Page?.media[0]?.bannerImage ?? data?.Page?.media[0]?.coverImage?.extraLarge ?? '';

    const { width, height } = useWindowDimensions();
    const { colors } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<ExploreStackProps, 'explore'>>();

    const { scoreColors, showItemListStatus } = useAppSelector((state) => state.persistedSettings);

    const scorebgColor = useMemo(
        () => rgbToRgba(colors.primaryContainer, 0.75),
        [colors.primaryContainer],
    );

    const navigate = useCallback(
        (aniID: number, malID: number, type: MediaType) => {
            // @ts-ignore
            navigation.navigate('media', {
                aniID,
                malID,
                type,
            });
        },
        [navigation],
    );

    const RenderItem = useCallback(
        (props: { item: Media }) => (
            // <MediaItemTest
            //     {...props}
            //     height={height}
            //     width={width}
            //     scoreColor={scoreColor}
            //     itemScore={itemScore}
            //     mediaLanguage={mediaLanguage}
            //     scoreGlow={scoreGlow}
            //     navigate={navigate}
            // />
            // <RenderMediaItem {...props} navigate={navigate} />
            <View
                style={{
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: 12,
                }}
            >
                <MediaCard
                    coverImg={props.item.coverImage.extraLarge}
                    titles={props.item.title}
                    navigate={() => navigate(props.item.id, props.item.idMal, props.item.type)}
                    scoreColors={scoreColors}
                    scorebgColor={scorebgColor}
                    showHealthBar={props.item.averageScore || props.item.meanScore ? true : false}
                    averageScore={props.item.averageScore}
                    meanScore={props.item.meanScore}
                    // @ts-ignore timeUntilAiring is transformed to string via RTK Query
                    bannerText={props.item.nextAiringEpisode?.timeUntilAiring}
                    imgBgColor={props.item.coverImage.color}
                    showBanner={props.item.nextAiringEpisode ? true : false}
                />
                <MediaProgressBar
                    progress={props.item.mediaListEntry?.progress}
                    mediaListEntry={props.item.mediaListEntry}
                    mediaStatus={props.item.status}
                    total={props.item.episodes ?? props.item.chapters ?? props.item.volumes ?? 0}
                    showListStatus={showItemListStatus}
                />
            </View>
        ),
        [],
    );

    // useEffect(() => {
    //     // Prefetch images in the list
    //     data?.Page?.media.forEach((media) => {
    //         const image = media?.bannerImage ?? media?.coverImage?.extraLarge ?? '';
    //         Image.prefetch(image);
    //     });
    // }, [data]);

    // if (isLoading) return <AnimatedLoading />;

    return (
        <View
            style={{
                flex: 1,
                width: width,
                justifyContent: 'center',
                marginVertical: 0,
                minHeight: 230,
            }}
        >
            <Text
                onPress={() =>
                    console.log(transformMediaDates(data).Page?.media[4]?.nextAiringEpisode)
                }
                variant="headlineLarge"
                style={{
                    fontWeight: 'bold',
                    margin: 30,
                    marginVertical: 10,
                    textTransform: 'capitalize',
                }}
            >
                {category_title.toLowerCase()}
            </Text>
            <View
                style={{
                    flex: 1,
                    width: width,
                    maxHeight: 280,
                    minHeight: 230,
                }}
            >
                {!isLoading && data ? (
                    <FlashList
                        data={data?.Page?.media ?? []}
                        keyExtractor={(item) => item.id.toString() + category_title}
                        renderItem={RenderItem}
                        horizontal={true}
                        estimatedItemSize={170}
                        removeClippedSubviews
                        contentContainerStyle={{
                            // paddingVertical: Platform.OS === 'web' ? 40 : 0,
                            paddingHorizontal: 10,
                        }}
                        showsHorizontalScrollIndicator={false}
                        estimatedListSize={{ height: 280, width: width }}
                        // onEndReached={() => {
                        //     console.log('Fetching more');
                        //     fetchMore();
                        // }}
                        // drawDistance={width * 2}
                    />
                ) : (
                    <View
                        style={{
                            justifyContent: 'center',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('../../../../assets/load.gif')}
                            style={{ alignSelf: 'center', height: 240, width: 230 }}
                            contentFit="contain"
                        />
                    </View>
                )}
            </View>
            {data && Platform.OS === 'web' ? (
                // setting height to minHeight of parent causes artifacts at top of each section (LinearGradient)
                <BackgroundArt data={data} currentBG={initialBG} width={width} height={440} />
            ) : null}
        </View>
    );
};

export const SectionScrollMem = memo(SectionScroll);
