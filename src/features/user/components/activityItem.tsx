import { MotiView } from 'moti';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { Image } from 'expo-image';
import {
    ListActivity,
    MediaFormat,
    UserActivityQuery,
} from '../../../app/services/anilist/generated-anilist';
import { memo, useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ListHeading } from '../../../components/text';
import { FlashList } from '@shopify/flash-list';
import { MediaCard } from '../../../components/cards';
import { getTimeUntil } from '../../../utils';
import { NavigationProp } from '@react-navigation/native';
import { RootStackProps } from '../../../navigation/types';

type ActivityItemProps = {
    item: ListActivity;
};
const ActivityItem = ({ item }: ActivityItemProps) => {};

// const ActivityItemMem = memo(ActivityItem);

export const ActivityOverview = ({
    data,
    nav,
}: {
    data: UserActivityQuery['Page']['activities'];
    nav: NavigationProp<RootStackProps>;
}) => {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();

    const RenderItem = ({ item }: ActivityItemProps) => {
        return (
            <View style={{ marginHorizontal: 8 }}>
                <MediaCard
                    titles={item.media?.title}
                    coverImg={item.media?.coverImage?.extraLarge}
                    imgBgColor={item.media?.coverImage?.color}
                    navigate={() =>
                        nav.navigate('media', {
                            aniID: item.media?.id,
                            malID: item.media?.idMal,
                            type: item.media.type,
                        })
                    }
                />
                <Text
                    variant="labelLarge"
                    numberOfLines={2}
                    style={{ textTransform: 'capitalize', maxWidth: 200, textAlign: 'center' }}
                >
                    {item.status ?? '???'}
                </Text>
                <Text
                    variant="labelMedium"
                    style={{
                        textTransform: 'capitalize',
                        textAlign: 'center',
                        color: colors.onSurfaceVariant,
                    }}
                >
                    {item.media?.format === MediaFormat.Tv
                        ? 'Anime'
                        : item.media?.isLicensed
                        ? item.media?.format
                        : 'Doujin'}{' '}
                    · {item.media?.status?.replaceAll('_', ' ') ?? '??'}
                </Text>
                <Text
                    variant="labelMedium"
                    style={{
                        textTransform: 'capitalize',
                        textAlign: 'center',
                        color: colors.onSurfaceVariant,
                    }}
                >
                    {getTimeUntil(item.createdAt, 'createdAt')}
                </Text>
            </View>
        );
    };

    return (
        <View style={{ width: width, height: 300 }}>
            {data ? (
                <FlashList
                    // @ts-ignore - not sure how to handle this type :/
                    data={data}
                    renderItem={RenderItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    estimatedItemSize={185}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View>
            )}
        </View>
    );
};

export default ActivityItem;
