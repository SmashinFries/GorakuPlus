import { IconButton, Text, useTheme } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { memo, useCallback } from 'react';
import { View } from 'react-native';
import { AniMediaQuery, MediaFormat, MediaType } from '@/store/services/anilist/generated-anilist';
import { MediaCard } from '@/components/cards';
import { router } from 'expo-router';
import { ListHeading } from '@/components/text';

type RecProps = {
    data: AniMediaQuery['Media']['recommendations'];
};
const RecList = ({ data }: RecProps) => {
    const { colors } = useTheme();
    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const renderItem = ({
        item,
    }: {
        item: AniMediaQuery['Media']['recommendations']['edges'][0];
    }) => {
        return (
            <View style={{ marginHorizontal: 10, maxHeight: 260 }}>
                <MediaCard
                    coverImg={item.node.mediaRecommendation.coverImage.extraLarge}
                    titles={item.node.mediaRecommendation.title}
                    averageScore={item.node.mediaRecommendation.averageScore}
                    meanScore={item.node.mediaRecommendation.meanScore}
                    imgBgColor={item.node.mediaRecommendation.coverImage.color}
                    navigate={() =>
                        router.push(
                            `/${item.node?.mediaRecommendation?.type?.toLowerCase()}/${
                                item.node?.mediaRecommendation?.id
                            }`,
                        )
                    }
                    scoreDistributions={item.node.mediaRecommendation?.stats?.scoreDistribution}
                    isFavorite={item.node.mediaRecommendation.isFavourite}
                />
                <Text
                    variant="labelLarge"
                    style={{ textTransform: 'capitalize', textAlign: 'center' }}
                >
                    {item.node?.rating > 0
                        ? '+' + item.node?.rating
                        : item.node?.rating < 0
                        ? item.node?.rating
                        : item.node?.rating}
                </Text>
                <Text
                    variant="labelMedium"
                    style={{
                        textTransform: 'capitalize',
                        textAlign: 'center',
                        color: colors.onSurfaceVariant,
                    }}
                >
                    {item.node?.mediaRecommendation?.format === MediaFormat.Tv
                        ? 'Anime'
                        : item.node?.mediaRecommendation?.isLicensed
                        ? item.node?.mediaRecommendation?.format
                        : 'Doujin'}{' '}
                    · {item.node?.mediaRecommendation?.status?.replaceAll('_', ' ') ?? '??'}
                </Text>
            </View>
        );
    };

    if (data?.edges?.length < 1) {
        return null;
    }

    return (
        <View>
            <ListHeading title="Recommendations" />
            <FlashList
                data={data?.edges}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                estimatedItemSize={250}
                removeClippedSubviews
                horizontal
                contentContainerStyle={{ padding: 15 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export const RecListMem = memo(RecList);
export default RecList;
