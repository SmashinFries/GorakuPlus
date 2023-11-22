import { Image } from 'expo-image';
import { MotiView } from 'moti';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text as RNText } from 'react-native';
import { IconButton, MD3DarkTheme, Text, useTheme } from 'react-native-paper';
import { copyToClipboard } from '../../utils';

type CharacterFrontProps = {
    id: number;
    favorites: number;
    isFavorite: boolean;
    image_url: string;
    userID?: number;
    primaryName: string;
    secondaryName: string;
    alternativeNames: string[];
    onToggleFavorite: (id: number) => void;
};
export const CharacterFront = ({
    id,
    favorites,
    isFavorite,
    image_url,
    userID,
    primaryName,
    secondaryName,
    alternativeNames,
    onToggleFavorite,
}: CharacterFrontProps) => {
    const { colors } = useTheme();
    const [fav, setFav] = useState(isFavorite);

    return (
        <View>
            <MotiView style={[styles.container]}>
                <MotiView style={{ width: 200 }}>
                    <Image source={{ uri: image_url }} style={styles.avatar} contentFit="cover" />
                    <MotiView style={[styles.avatarFavsContainer]}>
                        <RNText
                            style={{
                                fontWeight: 'bold',
                                color: MD3DarkTheme.colors.onBackground,
                            }}
                        >
                            {favorites} ❤
                        </RNText>
                    </MotiView>
                </MotiView>
                {userID && (
                    <IconButton
                        icon={fav ? 'heart' : 'heart-outline'}
                        iconColor={colors.primary}
                        style={{ width: styles.avatar.width }}
                        mode={'outlined'}
                        onPress={() => {
                            setFav((prev) => !prev);
                            onToggleFavorite(id);
                        }}
                    />
                )}
            </MotiView>
            <Text
                onLongPress={() => copyToClipboard(primaryName)}
                style={[styles.staffName]}
                variant="titleLarge"
            >
                {primaryName}
            </Text>
            <Text
                onLongPress={() => copyToClipboard(secondaryName)}
                variant="titleMedium"
                style={[styles.staffAltName, { color: colors.onSurfaceVariant }]}
            >
                {secondaryName}
            </Text>
            <Text
                selectable
                variant="titleSmall"
                style={[
                    styles.staffAltName,
                    { color: colors.onSurfaceVariant, paddingHorizontal: 5 },
                ]}
            >
                {alternativeNames?.join(', ')}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 12,
    },
    button: {
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 1,
        overflow: 'hidden',
    },
    avatar: {
        height: 280,
        width: 200,
        borderRadius: 12,
    },
    avatarFavsContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        alignItems: 'center',
        padding: 10,
        paddingVertical: 5,
        borderRadius: 12,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
    },
    staffName: {
        marginTop: 10,
        marginBottom: 3,
        textAlign: 'center',
    },
    staffAltName: {
        textAlign: 'center',
    },
    desc: {
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    descBtn: {
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 1,
        overflow: 'hidden',
    },
    favs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});
