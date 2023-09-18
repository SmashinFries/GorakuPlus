import { FlashList } from '@shopify/flash-list';
import { AnimatePresence, MotiView } from 'moti';
import { Image } from 'expo-image';
import { Avatar, IconButton, Text, useTheme } from 'react-native-paper';
import { AniMediaQuery } from '../../../app/services/anilist/generated-anilist';
import { TransYUpView, TransYUpViewMem } from '../../../components/animations';
import { useNavigation } from '@react-navigation/native';
import { RootStackProps } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MotiPressable } from 'moti/interactions';
import { memo, useCallback, useMemo } from 'react';
import { ListHeading } from '../../../components/text';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from '../../../app/hooks';
import { CharacterCard, UserCard } from '../../../components/cards';

type FollowingPrevItemProps = {
    onPress: () => void;
    item: AniMediaQuery['Page']['mediaList'][0];
    index: number;
    userID: number;
};
const FollowingPrevItem = ({ onPress, item }: FollowingPrevItemProps) => {
    const { colors } = useTheme();

    return (
        <Pressable onPress={onPress} style={{ marginHorizontal: 5, alignItems: 'center' }}>
            <Avatar.Image source={{ uri: item.user?.avatar?.large }} size={110} />
            <Text numberOfLines={2} style={{ textAlign: 'center' }}>
                {item.user?.name}
            </Text>
            <Text
                numberOfLines={1}
                variant="labelMedium"
                style={{
                    textTransform: 'capitalize',
                    width: 110 + 10,
                    textAlign: 'center',
                    color: colors.onSurfaceVariant,
                    paddingBottom: 10,
                }}
            >
                {item.status}
            </Text>
        </Pressable>
    );
};

type FollowingPrevListProps = {
    data: AniMediaQuery['Page']['mediaList'];
};
export const FollowingPrevList = ({ data }: FollowingPrevListProps) => {
    // const nav = useNavigation<NativeStackNavigationProp<RootStackProps, 'media'>>();

    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const renderItem = useCallback(
        ({ item }: { item: AniMediaQuery['Page']['mediaList'][0] }) => (
            // <FollowingPrevItem
            //     {...item}
            //     onPress={
            //         () => null
            //         // nav.navigate('characterStack', {
            //         //     screen: 'character',
            //         //     params: { id: props.item.node.id },
            //         // })
            //     }
            // />
            <UserCard
                avatarImg={item.user?.avatar?.large}
                username={item.user?.name}
                status={item.status}
            />
        ),
        [],
    );

    if (data?.length < 1) {
        return null;
    }

    return (
        <View>
            <ListHeading title="Following" />
            <FlashList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal
                removeClippedSubviews
                estimatedItemSize={120}
                contentContainerStyle={{ padding: 15 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export const FollowingPrevListMem = memo(FollowingPrevList);
