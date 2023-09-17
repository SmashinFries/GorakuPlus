import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { Image } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CharacterStackProps } from '../../navigation/types';
import { useColumns } from '../../utils';
import { CharacterItem, CharacterItemMemo } from './components/card';
import { useCharacterListQuery } from '../../app/services/anilist/enhanced';
import { useCallback, useEffect, useState } from 'react';
import { CharacterSort } from '../../app/services/anilist/generated-anilist';
import { useCharactersList } from './hooks/useCharacters';

const CharListScreen = ({
    navigation,
    route,
}: NativeStackScreenProps<CharacterStackProps, 'characterList'>) => {
    const { mediaId } = route.params;
    const { charData, loadMore } = useCharactersList(mediaId);
    const { colors } = useTheme();
    const { height } = useWindowDimensions();

    const { columns, listKey } = useColumns(180);

    const RenderItem = useCallback(
        (props) => (
            <CharacterItemMemo
                {...props}
                subTextColor={colors.onSurfaceVariant}
                onNavigation={(id) => navigation.navigate('character', { id: id })}
            />
        ),
        [],
    );

    if (charData.isUninitialized) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ height: '100%', width: '100%' }}>
            {/* <Button onPress={() => data?.Media?.characters?.edges.length}>Print Length</Button> */}
            <FlashList
                numColumns={columns}
                key={listKey}
                data={charData.data?.Media?.characters?.edges}
                keyExtractor={(item) => item?.node?.id.toString()}
                renderItem={RenderItem}
                contentContainerStyle={{ padding: 10 }}
                ListFooterComponent={() =>
                    charData.isFetching && (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" />
                        </View>
                    )
                }
                drawDistance={height / 2}
                estimatedItemSize={241}
                onEndReached={() => loadMore()}
            />
        </View>
    );
};

export default CharListScreen;
