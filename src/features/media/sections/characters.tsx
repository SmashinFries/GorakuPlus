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
import { TouchableOpacity, View } from 'react-native';
import { CharacterCard } from '../../../components/cards';

type CharacterPrevItemProps = {
    onPress: () => void;
    item: AniMediaQuery['Media']['characters']['edges'][0];
    index: number;
};
const CharacterPrevItem = ({ onPress, item, index }: CharacterPrevItemProps) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} style={{ marginHorizontal: 5, alignItems: 'center' }}>
            <Avatar.Image source={{ uri: item.node?.image?.large }} size={110} />
            <Text numberOfLines={2} style={{ textAlign: 'center' }}>
                {item.node.name.full}
            </Text>
            <Text
                numberOfLines={2}
                variant="labelMedium"
                style={{
                    textTransform: 'capitalize',
                    width: 110 + 10,
                    textAlign: 'center',
                    color: colors.onSurfaceVariant,
                    paddingBottom: 10,
                }}
            >
                {item.role}
            </Text>
            {item.node?.isFavourite && (
                <IconButton
                    icon="heart"
                    iconColor="red"
                    mode="contained"
                    size={18}
                    style={{ position: 'absolute', top: -10, right: -5 }}
                />
            )}
        </TouchableOpacity>
    );
};

type CharacterPrevListProps = {
    data: AniMediaQuery['Media']['characters'];
};
export const CharacterPrevList = ({ data }: CharacterPrevListProps) => {
    const nav = useNavigation<NativeStackNavigationProp<RootStackProps, 'media'>>();

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
                onPress={() =>
                    nav.navigate('characterStack', {
                        screen: 'character',
                        params: { id: item.node.id },
                    })
                }
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
