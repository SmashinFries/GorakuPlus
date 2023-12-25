import {
    ActivityIndicator,
    Avatar,
    Button,
    IconButton,
    Portal,
    Text,
    useTheme,
} from 'react-native-paper';
import { ListHeading } from '../text';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { UserFavoritesOverviewQuery } from '@/store/services/anilist/generated-anilist';
import Animated, {
    AnimationCallback,
    Easing,
    cancelAnimation,
    runOnJS,
    useAnimatedProps,
    useAnimatedReaction,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { useCallback, useEffect, useState } from 'react';
import { ImageProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
// UserFavoritesOverviewQuery['User']['favourites']['characters']

type FavoriteItemProps = {
    images: string[]; // URLS
    title: string;
    onPress: () => void;
    size?: number;
    delay?: number;
};
const FavoriteItem = ({ images, title, size, delay, onPress }: FavoriteItemProps) => {
    const { colors } = useTheme();
    const total_images = images.length;
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // determines which image is shown
    const front_opacity = useSharedValue(1);
    const derivedOpacity = useDerivedValue(() => {
        return front_opacity.value;
    });

    const frontStyle = useAnimatedStyle(() => {
        return {
            opacity: front_opacity.value,
        };
    });

    const updateCurrentIndex = () => {
        setCurrentImageIndex((prev) => (prev + 1) % total_images);
    };

    // const nextImage = () => {
    //     front_opacity.value = withDelay(
    //         3000,
    //         withTiming(derivedOpacity.value === 1 ? 0 : 1, { duration: 1000 }, (finished) => {
    //             console.log('opac:', derivedOpacity.value);
    //             if (finished) {
    //                 runOnJS(updateCurrentIndex)();
    //             }
    //         }),
    //     );
    // };

    // useAnimatedReaction(
    //     () => {
    //         return derivedOpacity.value;
    //     },
    //     (currentValue, previousValue) => {
    //         if (currentValue === 0 && previousValue !== 0) {
    //             // console.log('Showing Back Image!');
    //             front_opacity.value = withDelay(
    //                 3000 + (delay ?? 0),
    //                 withTiming(
    //                     front_opacity.value === 1 ? 0 : 1,
    //                     { duration: 1000 },
    //                     (finished, current) => {
    //                         // console.log('opac:', front_opacity.value);
    //                         if (finished) {
    //                             runOnJS(updateCurrentIndex)();
    //                         }
    //                     },
    //                 ),
    //             );
    //         } else if (currentValue === 1 && previousValue !== 1) {
    //             // console.log('Showing Front Image!');
    //             front_opacity.value = withDelay(
    //                 3000 + (delay ?? 0),
    //                 withTiming(
    //                     front_opacity.value === 1 ? 0 : 1,
    //                     { duration: 1000 },
    //                     (finished, current) => {
    //                         // console.log('opac:', front_opacity.value);
    //                         if (finished) {
    //                             runOnJS(updateCurrentIndex)();
    //                         }
    //                     },
    //                 ),
    //             );
    //         }
    //     },
    // );

    // useEffect(() => {
    //     console.log(
    //         'Back Image Index:',
    //         currentImageIndex % 2 === 0 ? currentImageIndex + 1 : currentImageIndex,
    //     );
    //     console.log(
    //         'Front Image Index:',
    //         currentImageIndex % 2 === 1 ? currentImageIndex + 1 : currentImageIndex,
    //     );
    // }, [currentImageIndex]);

    useEffect(() => {
        cancelAnimation(front_opacity);
        setCurrentImageIndex(0);
    }, []);

    if (!images) return null;

    return (
        <Pressable onPress={onPress}>
            <Animated.View
                style={{ alignItems: 'center', width: size + 20, height: size, borderRadius: 12 }}
            >
                {/* Back Image | odds */}
                <Animated.Image
                    key={`${currentImageIndex - 1}`}
                    source={{
                        uri: images[
                            currentImageIndex % 2 === 0 ? currentImageIndex + 1 : currentImageIndex
                        ],
                    }}
                    style={[
                        {
                            height: size,
                            width: size,
                            borderRadius: 12,
                        },
                    ]}
                />

                {/* Front Image || evens */}
                <Animated.Image
                    key={`${currentImageIndex + 1}`}
                    source={{
                        uri: images[
                            currentImageIndex % 2 === 1 ? currentImageIndex + 1 : currentImageIndex
                        ],
                    }}
                    style={[
                        {
                            position: 'absolute',
                            height: size,
                            width: size,
                            borderRadius: 12,
                        },
                        frontStyle,
                    ]}
                />
                <LinearGradient
                    style={{
                        position: 'absolute',
                        borderRadius: 12,
                        width: size,
                        height: size,
                        alignSelf: 'center',
                    }}
                    colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
                    locations={[0, 0.5, 1]}
                />
                <View
                    style={{
                        position: 'absolute',
                        height: size,
                        width: size,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontWeight: '900' }} variant="titleMedium">
                        {title}
                    </Text>
                </View>
            </Animated.View>
        </Pressable>
    );
};

type FavoritesOverviewProps = {
    data: UserFavoritesOverviewQuery['User']['favourites'];
};
const FavoritesOverview = ({ data }: FavoritesOverviewProps) => {
    const { width } = useWindowDimensions();
    const anime_images = data?.anime?.nodes?.map((anime) => anime?.coverImage?.extraLarge);
    const manga_images = data?.manga?.nodes?.map((manga) => manga?.coverImage?.extraLarge);
    const character_images = data?.characters?.nodes?.map((character) => character?.image?.large);
    const staff_images = data?.staff?.nodes?.map((staff) => staff?.image?.large);
    return (
        <View style={{ width: width, overflow: 'visible' }}>
            <ListHeading title="Favorites" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <FavoriteItem
                    images={character_images}
                    title="Waifus"
                    onPress={() => router.push('/favorites/characters')}
                    size={160}
                />
                <FavoriteItem
                    images={anime_images}
                    title="Anime"
                    onPress={() => router.push('/favorites/anime')}
                    size={160}
                    delay={500}
                />
                <FavoriteItem
                    images={manga_images}
                    title="Manga"
                    onPress={() => router.push('/favorites/manga')}
                    size={160}
                    delay={1000}
                />
                <FavoriteItem
                    images={staff_images}
                    title="Staff"
                    onPress={() => router.push('/favorites/staff')}
                    size={160}
                    delay={1500}
                />
                {/* <FavoriteItem items={data.characters} /> */}
                {/* <FlashList
                    // @ts-ignore - not sure how to handle this type :/
                    data={data}
                    renderItem={({ item }) => <ActivityItem item={item} onTrash={onTrash} />}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    estimatedItemSize={185}
                    showsHorizontalScrollIndicator={false}
                /> */}
            </ScrollView>
            {/* <Portal>
            </Portal> */}
        </View>
    );
};

export default FavoritesOverview;
