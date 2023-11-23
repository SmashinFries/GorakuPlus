import { FlashList } from '@shopify/flash-list';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { AniMediaQuery } from '@/store/services/anilist/generated-anilist';
import { memo, useCallback } from 'react';
import { ListHeading } from '../../text';
import { Pressable, View } from 'react-native';
import { UserCard } from '../../cards';
import { openWebBrowser } from '@/utils/webBrowser';

type FollowingPrevListProps = {
    data: AniMediaQuery['Page']['mediaList'];
};
export const FollowingPrevList = ({ data }: FollowingPrevListProps) => {
    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const renderItem = useCallback(
        ({ item }: { item: AniMediaQuery['Page']['mediaList'][0] }) => (
            <UserCard
                avatarImg={item.user?.avatar?.large}
                username={item.user?.name}
                status={item.status}
                onPress={() => openWebBrowser(`https://anilist.co/user/${item.user?.name}`)}
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
