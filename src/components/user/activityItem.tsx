import {
    ActivityIndicator,
    Avatar,
    Button,
    IconButton,
    Portal,
    Text,
    useTheme,
} from 'react-native-paper';
import {
    ListActivity,
    MediaFormat,
    UserActivityQuery,
} from '@/store/services/anilist/generated-anilist';
import { useCallback, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ListHeading } from '../text';
import { FlashList } from '@shopify/flash-list';
import { MediaCard } from '../cards';
import { getTimeUntil } from '@/utils';
import { ConfirmActDelDialog } from './dialogs';
import { router } from 'expo-router';
import { useAppSelector } from '@/store/hooks';

type ActivityItemProps = {
    item: ListActivity;
    onTrash: (id: number) => void;
};

export const ActivityItem = ({ item, onTrash }: ActivityItemProps) => {
    const { colors } = useTheme();
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    return (
        <View style={{ marginHorizontal: 8, overflow: 'visible', paddingVertical: 10 }}>
            <MediaCard
                titles={item.media?.title}
                coverImg={item.media?.coverImage?.extraLarge}
                imgBgColor={item.media?.coverImage?.color}
                navigate={
                    () => router.push(`/${item.media?.type}/${item.media?.id}`)
                    // nav.navigate('media', {
                    //     aniID: item.media?.id,
                    //     malID: item.media?.idMal,
                    //     type: item.media.type,
                    // })
                }
            />
            <Text
                variant="labelLarge"
                numberOfLines={2}
                style={{ textTransform: 'capitalize', maxWidth: 200, textAlign: 'center' }}
            >
                {`${item.status}${item.progress ? ` ${item.progress}` : ''}`}
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
            {item.user?.id === userID && (
                <IconButton
                    icon={'trash-can'}
                    iconColor={colors.onPrimaryContainer}
                    style={{
                        position: 'absolute',
                        top: -5,
                        right: -15,
                        backgroundColor: colors.primaryContainer,
                    }}
                    onPress={() => onTrash(item.id)}
                />
            )}
            {item.user?.id !== userID && (
                <Avatar.Image
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    source={{ uri: item.user?.avatar?.large }}
                    size={32}
                />
            )}
        </View>
    );
};

export const ActivityOverview = ({ data }: { data: UserActivityQuery['Page']['activities'] }) => {
    const { width } = useWindowDimensions();

    const [showActDelConfirm, setShowActDelConfirm] = useState(false);
    const [actDelID, setActDelID] = useState<number | null>(null);
    const { userID } = useAppSelector((state) => state.persistedAniLogin);

    const onTrash = (id: number) => {
        setActDelID(id);
        setShowActDelConfirm(true);
    };

    const RenderItem = ({ item }: { item: ListActivity }) => {
        return <ActivityItem item={item} onTrash={onTrash} />;
    };

    return (
        <View style={{ width: width, overflow: 'visible' }}>
            <ListHeading
                title="Activity"
                icon="chevron-right"
                onIconPress={() => router.push('/activity/user')}
            />
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
            <Portal>
                <ConfirmActDelDialog
                    visible={showActDelConfirm}
                    id={actDelID}
                    onDismiss={() => {
                        setActDelID(null);
                        setShowActDelConfirm(false);
                    }}
                />
            </Portal>
        </View>
    );
};
