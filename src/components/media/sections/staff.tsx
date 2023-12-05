import { FlashList } from '@shopify/flash-list';
import { memo, useCallback } from 'react';
import { View } from 'react-native';
import { AniMediaQuery } from '@/store/services/anilist/generated-anilist';
import { router } from 'expo-router';
import { ListHeading } from '@/components/text';
import { StaffCard } from '@/components/cards';

type StaffPrevListProps = {
    data: AniMediaQuery['Media']['staff'];
    openMore: () => void;
};
export const StaffPrevList = ({ data, openMore }: StaffPrevListProps) => {
    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const renderItem = useCallback(
        ({ item }: { item: AniMediaQuery['Media']['staff']['edges'][0] }) => (
            <StaffCard
                imgUrl={item.node.image?.large}
                name={item.node.name.full}
                nativeName={item.node.name.native}
                role={item.role}
                isFavourite={item.node.isFavourite}
                onPress={() => router.push(`/staff/info/${item.node.id}`)}
            />
        ),
        [],
    );

    if (data?.edges?.length < 1) {
        return null;
    }

    return (
        <View>
            <ListHeading
                title="Staff"
                icon={data.pageInfo.hasNextPage ? 'arrow-right' : undefined}
                onIconPress={openMore}
            />
            <FlashList
                data={data.edges}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal
                removeClippedSubviews
                estimatedItemSize={120}
                contentContainerStyle={{ padding: 15 }}
                showsHorizontalScrollIndicator={false}
            />
            {/* <FlashList
                data={data.edges}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal
                estimatedItemSize={120}
                contentContainerStyle={{ padding: 15 }}
                showsHorizontalScrollIndicator={false}
            /> */}
        </View>
    );
};

export const StaffPrevListMem = memo(StaffPrevList);
