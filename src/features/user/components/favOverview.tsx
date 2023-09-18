import { useMemo } from 'react';
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { Image } from 'expo-image';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useSlideshow } from '../../../hooks/slideshow';
import { MotiPressable } from 'moti/interactions';
import { Favourites, UserOverviewQuery } from '../../../app/services/anilist/generated-anilist';
import { LinearGradient } from 'expo-linear-gradient';
import { Selectable } from '../../../components/moti';
import { ListHeading } from '../../../components/text';

type FavItemProps = {
    title: string;
    images?: string[];
    onPress?: () => void;
};
export const FavItem = ({ images, onPress, title }: FavItemProps) => {
    const { bg, visible, updateBG } = useSlideshow({ images: images || [] });
    const { colors } = useTheme();
    return (
        <Selectable
            style={styles.container}
            onPress={() => ToastAndroid.show('Favorites coming soon!', ToastAndroid.LONG)}
        >
            <MotiView
                style={[
                    styles.imgContainer,
                    { backgroundColor: colors.secondaryContainer, overflow: 'hidden' },
                ]}
            >
                <AnimatePresence
                    onExitComplete={() => {
                        updateBG();
                    }}
                >
                    {visible && (
                        <MotiImage
                            from={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: 1.3 }}
                            exit={{ opacity: 0 }}
                            exitTransition={{ type: 'timing', duration: 1500 }}
                            transition={{ type: 'timing', duration: 1500 }}
                            source={{ uri: bg }}
                            resizeMode="cover"
                            style={[styles.img]}
                        />
                    )}
                </AnimatePresence>
                <LinearGradient
                    style={[styles.imgGradient]}
                    colors={['rgba(0,0,0,.6)', 'rgba(0,0,0,.6)']}
                />
                <View style={[styles.titleContainer]}>
                    <Text variant="titleLarge" style={[styles.title]}>
                        {title.toUpperCase()}
                    </Text>
                </View>
            </MotiView>
        </Selectable>
    );
};

type FavOverviewProps = {
    favorites: UserOverviewQuery['Viewer']['favourites'];
};
export const FavOverview = ({ favorites }: FavOverviewProps) => {
    const animeImages = useMemo(
        () => favorites?.anime?.nodes?.map((anime) => anime?.coverImage?.extraLarge),
        [],
    );
    const mangaImages = useMemo(
        () => favorites?.manga?.nodes?.map((manga) => manga?.coverImage?.extraLarge),
        [],
    );
    const characterImages = useMemo(
        () => favorites?.characters?.nodes?.map((character) => character?.image?.large),
        [],
    );
    const staffImages = useMemo(
        () => favorites?.staff?.nodes?.map((staff) => staff?.image?.large),
        [],
    );

    return (
        <View>
            <ListHeading title="Favorites" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {animeImages && <FavItem title="Anime" images={animeImages} />}
                {mangaImages && <FavItem title="Manga" images={mangaImages} />}
                {characterImages && <FavItem title="Characters" images={characterImages} />}
                {staffImages && <FavItem title="Staff" images={staffImages} />}
                {favorites.studios && (
                    <FavItem
                        title="Studios"
                        images={[
                            'https://www.spoon-tamago.com/wp-content/uploads/2021/07/studio-mappa-9-2048x1365.jpg',
                        ]}
                    />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    header: {
        paddingLeft: 10,
        paddingTop: 10,
    },
    imgContainer: {
        height: 150,
        width: 150,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    img: {
        height: 150,
        width: 150,
        borderRadius: 12,
    },
    imgGradient: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 12,
    },
    titleContainer: {
        position: 'absolute',
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        color: 'white',
    },
});
