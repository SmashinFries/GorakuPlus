import { MotiView } from 'moti';
import {
    AniMediaQuery,
    MediaFormat,
    MediaType,
} from '../../../app/services/anilist/generated-anilist';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { TransYUpViewMem } from '../../../components/animations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackProps } from '../../../navigation/types';
import { MediaItem, MediaItemMem } from '../../explore/components/media';
import { memo, useCallback } from 'react';
import { ListHeading } from '../../../components/text';
import { View } from 'react-native';
import { MediaCard } from '../../../components/cards';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

type RelationItemProps = {
    textColor: string;
    colors?: MD3Colors;
    onPress?: () => void;
    scoreColors?: {
        red: number;
        yellow: number;
    };
    navigate: (aniId: number, malId: number, type: MediaType) => void;
    item: AniMediaQuery['Media']['relations']['edges'][0];
    index: number;
};

type RelationsProps = {
    data: AniMediaQuery['Media']['relations'];
    scoreColors: RelationItemProps['scoreColors'];
};
const Relations = ({ data, scoreColors }: RelationsProps) => {
    const { colors } = useTheme();
    const nav = useNavigation<NativeStackNavigationProp<RootStackProps, 'media'>>();

    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const renderItem = useCallback(
        ({ item }: { item: AniMediaQuery['Media']['relations']['edges'][0] }) => (
            <View style={{ marginHorizontal: 10, maxHeight: 260 }}>
                <MediaCard
                    coverImg={item.node.coverImage.extraLarge}
                    titles={item.node.title}
                    averageScore={item.node.averageScore}
                    meanScore={item.node.meanScore}
                    imgBgColor={item.node.coverImage.color}
                    showHealthBar
                    navigate={() =>
                        nav.push('media', {
                            aniID: item.node.id,
                            malID: item.node.idMal,
                            type: item.node.type,
                        })
                    }
                />
                <Text
                    variant="labelLarge"
                    style={{ textTransform: 'capitalize', textAlign: 'center' }}
                >
                    {item.relationType?.replaceAll('_', ' ') ?? '??'}
                </Text>
                <Text
                    variant="labelMedium"
                    style={{
                        textTransform: 'capitalize',
                        textAlign: 'center',
                        color: colors.onSurfaceVariant,
                    }}
                >
                    {item.node?.format === MediaFormat.Tv
                        ? 'Anime'
                        : item.node?.isLicensed
                        ? item.node?.format
                        : 'Doujin'}{' '}
                    · {item.node?.status?.replaceAll('_', ' ') ?? '??'}
                </Text>
                {item.node?.isFavourite && (
                    <IconButton
                        icon="heart"
                        iconColor="red"
                        mode="contained"
                        size={18}
                        style={{ position: 'absolute', top: -15, left: -5 }}
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
        <View style={{ overflow: 'visible' }}>
            <ListHeading title="Relations" />
            <FlashList
                data={data?.edges}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                estimatedItemSize={250}
                horizontal
                removeClippedSubviews
                contentContainerStyle={{ padding: 15 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export const RelationsMem = memo(Relations);
export default Relations;
