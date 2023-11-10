import { FlashList } from '@shopify/flash-list';
import { AniMediaQuery } from '../../../app/services/anilist/generated-anilist';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackProps } from '../../../navigation/types';
import { memo, useCallback } from 'react';
import { ListHeading } from '../../../components/text';
import { View } from 'react-native';
import { StaffCard } from '../../../components/cards';

type StaffPrevListProps = {
    data: AniMediaQuery['Media']['staff'];
};
export const StaffPrevList = ({ data }: StaffPrevListProps) => {
    const nav = useNavigation<NativeStackNavigationProp<RootStackProps, 'media'>>();

    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const renderItem = useCallback(
        ({ item }: { item: AniMediaQuery['Media']['staff']['edges'][0] }) => (
            <StaffCard
                imgUrl={item.node.image?.large}
                name={item.node.name.full}
                nativeName={item.node.name.native}
                role={item.role}
                isFavourite={item.node.isFavourite}
                onPress={() =>
                    nav.push('staffStack', {
                        screen: 'staff',
                        params: { id: item.node.id },
                    })
                }
            />
        ),
        [],
    );

    if (data?.edges?.length < 1) {
        return null;
    }

    return (
        <View>
            <ListHeading title="Staff" />
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
