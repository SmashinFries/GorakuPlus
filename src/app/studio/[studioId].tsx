import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useCallback } from 'react';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import useStudioList from '@/hooks/studio/useStudio';
import { MediaCard, MediaProgressBar } from '@/components/cards';
import { StudioListQuery } from '@/store/services/anilist/generated-anilist';
import { useAppSelector } from '@/store/hooks';
import { useColumns } from '@/utils';
import { StudioHeader } from '@/components/headers';

const StudioMediaListScreen = () => {
    const { studioId } = useLocalSearchParams<{ studioId: string }>();
    const { loadMore, studioData } = useStudioList(Number(studioId));
    const { columns, listKey } = useColumns(150);
    const { height } = useWindowDimensions();
    const { colors } = useTheme();
    const { scoreColors } = useAppSelector((state) => state.persistedSettings);

    const RenderItem = useCallback(
        (props: { item: StudioListQuery['Studio']['media']['nodes'][0] }) => (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginVertical: 10,
                    marginHorizontal: 5,
                }}
            >
                <MediaCard
                    coverImg={props.item.coverImage.extraLarge}
                    titles={props.item.title}
                    navigate={() =>
                        router.push(`/${props.item.type.toLowerCase()}/${props.item.id}`)
                    }
                    scoreColors={scoreColors}
                    averageScore={props.item.averageScore}
                    meanScore={props.item.meanScore}
                    bannerText={props.item.nextAiringEpisode?.timeUntilAiring as unknown as string}
                    imgBgColor={props.item.coverImage?.color}
                    showBanner={props.item.nextAiringEpisode ? true : false}
                    scoreDistributions={props.item.stats?.scoreDistribution}
                    fitToParent
                    isFavorite={props.item.isFavourite}
                />
                <MediaProgressBar
                    progress={props.item.mediaListEntry?.progress}
                    mediaListEntry={props.item.mediaListEntry}
                    mediaStatus={props.item?.status}
                    total={props.item.episodes ?? 0}
                />
            </View>
        ),
        [],
    );

    if (studioData.isUninitialized) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `${studioData.data?.Studio.name}`,
                    header: (props) => (
                        <StudioHeader
                            {...props}
                            isFav={studioData.data?.Studio?.isFavourite}
                            id={Number(studioId)}
                        />
                    ),
                }}
            />
            <FlashList
                key={3}
                numColumns={3}
                data={studioData.data?.Studio.media?.nodes}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={RenderItem}
                contentContainerStyle={{ paddingTop: 20 }}
                estimatedItemSize={241}
                centerContent
                drawDistance={height / 2}
                onEndReached={() => loadMore()}
            />
        </View>
    );
};

export default StudioMediaListScreen;
