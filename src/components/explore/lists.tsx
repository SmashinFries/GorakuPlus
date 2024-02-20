import { Platform, RefreshControl, ScrollView, View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { ExploreMediaQuery, Media, MediaType } from '@/store/services/anilist/generated-anilist';
import { FlashList } from '@shopify/flash-list';
import React, { memo, useCallback, useMemo } from 'react';
import { Image } from 'expo-image';
import { useAppSelector } from '@/store/hooks';
import { MediaCard, MediaProgressBar } from '../cards';
import { router } from 'expo-router';
import { BackgroundArt } from './bg';

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

    const { scoreColors } = useAppSelector((state) => state.persistedSettings);

    const navigate = (aniID: number, type: MediaType) => {
        router.push(`/${type.toLowerCase()}/${aniID}`);
    };

    const RenderItem = useCallback(
        (props: { item: ExploreMediaQuery['Page']['media'][0] }) => (
            <View
                style={{
                    flex:1,
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: 12,
                }}
            >
                <MediaCard
                    coverImg={props.item.coverImage.extraLarge}
                    titles={props.item.title}
                    navigate={() => navigate(props.item.id, props.item.type)}
                    scoreColors={scoreColors}
                    averageScore={props.item.averageScore}
                    meanScore={props.item.meanScore}
                    bannerText={props.item.nextAiringEpisode?.timeUntilAiring as unknown as string}
                    imgBgColor={props.item.coverImage?.color}
                    showBanner={props.item.nextAiringEpisode ? true : false}
                    scoreDistributions={props.item.stats?.scoreDistribution}
                    height={220}
                    isFavorite={props.item.isFavourite}
                />
                <MediaProgressBar
                    progress={props.item.mediaListEntry?.progress}
                    mediaListEntry={props.item.mediaListEntry}
                    mediaStatus={props.item?.status}
                    total={props.item.episodes ?? props.item.chapters ?? props.item.volumes ?? 0}
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
                        //     fetchMore();
                        // }}
                        // drawDistance={width * 2}
                    />
                ) : (
                    <View
                        style={{
                            justifyContent: 'center',
                            width: '100%',
                            height: 280,
                            alignItems: 'center',
                        }}
                    >
                        {/* <Image
                            source={require('../../../assets/load.gif')}
                            style={{ alignSelf: 'center', height: 240, width: 230 }}
                            contentFit="contain"
                        /> */}
                        <ActivityIndicator size={'large'} />
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
