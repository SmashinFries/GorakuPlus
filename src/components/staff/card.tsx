import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';
import { IconButton, MD3DarkTheme, Text, useTheme } from 'react-native-paper';
import { StaffListQuery } from '@/store/services/anilist/generated-anilist';

type StaffItemProps = {
    item: StaffListQuery['Media']['staff']['edges'][0];
    index: number;
    subTextColor?: string;
    onNavigation: (id: number) => void;
};

export const StaffItem = ({ item, index, subTextColor, onNavigation }: StaffItemProps) => {
    const { colors } = useTheme();
    return (
        <Pressable style={[styles.container]} onPress={() => onNavigation(item.node?.id)}>
            <Image
                source={{ uri: item.node?.image?.large }}
                style={[styles.img]}
                transition={1000}
            />
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
            <Text
                numberOfLines={2}
                variant="labelLarge"
                style={[styles.name, { color: colors.onSurfaceVariant }]}
            >
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
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 180,
        margin: 10,
        borderRadius: 12,
        marginVertical: 20,
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
        padding: 5,
    },
    name: {
        textAlign: 'center',
        color: MD3DarkTheme.colors.onBackground,
    },
});
