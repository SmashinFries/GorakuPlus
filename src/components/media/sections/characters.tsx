import { FlashList } from '@shopify/flash-list';
import { AniMediaQuery } from '@/store/services/anilist/generated-anilist';
import { memo, useCallback } from 'react';
import { ListHeading } from '../../text';
import { View } from 'react-native';
import { CharacterCard } from '../../cards';
import { router } from 'expo-router';

type CharacterPrevListProps = {
    data: AniMediaQuery['Media']['characters'];
};
export const CharacterPrevList = ({ data }: CharacterPrevListProps) => {
    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const renderItem = useCallback(
        ({ item }: { item: AniMediaQuery['Media']['characters']['edges'][0] }) => (
            // <CharacterPrevItem
            //     {...props}
            //     onPress={() =>
            //         nav.navigate('characterStack', {
            //             screen: 'character',
            //             params: { id: props.item.node.id },
            //         })
            //     }
            // />
            <CharacterCard
                onPress={() => router.push(`/characters/info/${item.node.id}`)}
                imgUrl={item.node.image?.large}
                name={item.node?.name?.full}
                nativeName={item.node?.name?.native}
                isFavourite={item?.node?.isFavourite}
                role={item?.role}
            />
        ),
        [],
    );

    if (data?.edges?.length < 1) {
        return null;
    }

    return (
        <View>
            <ListHeading title="Characters" />
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
        </View>
    );
};

export const CharacterPrevListMem = memo(CharacterPrevList);
