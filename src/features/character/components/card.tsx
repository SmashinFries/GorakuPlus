import { Image } from 'expo-image';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { CharacterEdge, CharacterListQuery } from '../../../app/services/anilist/generated-anilist';
import { StyleSheet, View } from 'react-native';
import { TransYUpView } from '../../../components/animations';
import { IconButton, MD3DarkTheme, Text } from 'react-native-paper';
import { Selectable } from '../../../components/moti';
import { memo } from 'react';

type CharacterItemProps = {
    item: CharacterListQuery['Media']['characters']['edges'][0];
    index: number;
    subTextColor: string;
    onNavigation: (id: number) => void;
};

export const CharacterItem = ({ item, subTextColor, onNavigation }: CharacterItemProps) => {
    return (
        <TransYUpView style={[styles.container]} animation>
            <Selectable
                animation="opacity"
                onPress={onNavigation ? () => onNavigation(item.node?.id) : null}
            >
                <Image source={{ uri: item.node?.image?.large }} style={[styles.img]} />
                <LinearGradient
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: 12,
                    }}
                    locations={[0.4, 0.95]}
                    colors={['transparent', 'black']}
                />
                <View style={[styles.btmContainer]}>
                    <Text numberOfLines={2} style={[styles.name]}>
                        {item.node?.name?.full}
                    </Text>
                </View>
                {item.node.isFavourite && (
                    <View style={{ position: 'absolute', top: -5, right: -5 }}>
                        <IconButton icon="heart" iconColor="red" />
                    </View>
                )}
            </Selectable>
            <Text variant="labelLarge" style={{ textTransform: 'capitalize', textAlign: 'center' }}>
                {item.role}
            </Text>
            <Text
                variant="labelMedium"
                style={{
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    color: subTextColor ?? 'white',
                }}
            >
                ❤️ {item.node?.favourites}
            </Text>
        </TransYUpView>
    );
};

export const CharacterItemMemo = memo(CharacterItem);

const styles = StyleSheet.create({
    container: {
        width: 180,
        margin: 10,
        borderRadius: 12,
    },
    img: {
        height: 250,
        width: 180,
        borderRadius: 12,
    },
    btmContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 5,
    },
    name: {
        textAlign: 'center',
        color: MD3DarkTheme.colors.onBackground,
    },
});
