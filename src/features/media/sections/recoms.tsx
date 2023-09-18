import { AnimatePresence, MotiView } from 'moti';
import {
    AniMediaQuery,
    MediaFormat,
    MediaStatus,
    MediaType,
} from '../../../app/services/anilist/generated-anilist';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { TransYUpViewMem } from '../../../components/animations';
import { MediaItem } from '../../explore/components/media';
import { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackProps } from '../../../navigation/types';
import { ListHeading } from '../../../components/text';
import { MediaCard } from '../../../components/cards';
import { View } from 'react-native';

type RecItemProps = {
    textColor?: string;
    navigate: (aniID: number, malID: number, type: MediaType) => void;
    item: AniMediaQuery['Media']['recommendations']['edges'][0];
    index: number;
};

type RecProps = {
    data: AniMediaQuery['Media']['recommendations'];
    // scoreColors: RecItemProps['scoreColors'];
};
const RecList = ({ data }: RecProps) => {
    const { colors } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackProps, 'media'>>();
    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const renderItem = useCallback(
        ({ item }) => (
            <View style={{ marginHorizontal: 10, maxHeight: 260 }}>
                <MediaCard
                    coverImg={item.node.mediaRecommendation.coverImage.extraLarge}
                    titles={item.node.mediaRecommendation.title}
                    averageScore={item.node.mediaRecommendation.averageScore}
                    meanScore={item.node.mediaRecommendation.meanScore}
                    imgBgColor={item.node.mediaRecommendation.coverImage.color}
                    navigate={() =>
                        navigation.push('media', {
                            aniID: item.node.mediaRecommendation.id,
                            malID: item.node.mediaRecommendation.idMal,
                            type: item.node.mediaRecommendation.type,
                        })
                    }
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
                {item.node?.isFavourite && (
                    <IconButton
                        icon="heart"
                        iconColor="red"
                        mode="contained"
                        size={18}
                        style={{ position: 'absolute', top: -10, left: -5 }}
                    />
                )}
            </View>
        ),
        [],
    );

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
