import React, { useCallback, useEffect, useState } from 'react';
import { Appbar, Badge, IconButton, Portal, Searchbar, useTheme } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    BackHandler,
    Keyboard,
    RefreshControlProps,
    Share,
    StyleSheet,
    TextInput,
    View,
    useWindowDimensions,
} from 'react-native';
import { RootState } from '@/store/store';
import { MotiImage, MotiScrollView, MotiView } from 'moti';
import { Image } from 'expo-image';
import Animated, {
    Easing,
    SlideInDown,
    SlideInLeft,
    SlideInRight,
    SlideInUp,
    SlideOutDown,
    SlideOutRight,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { useHeaderAnim } from './animations';
import { useNavigation } from '@react-navigation/native';
import { MediaType } from '@/store/services/anilist/generated-anilist';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { BarcodeScanDialog } from './dialogs';
import { router, useFocusEffect } from 'expo-router';
import { updateListFilter } from '@/store/slices/listSLice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { updateFavSearch } from '@/store/slices/favoritesSlice';
import { SearchType } from '@/types/search';

const PaperHeader = ({ navigation, options, route, back }: NativeStackHeaderProps) => {
    const title = getHeaderTitle(options, route.name);
    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            <Appbar.Content title={title} titleStyle={{ textTransform: 'capitalize' }} />
        </Appbar.Header>
    );
};

export const ExploreHeader = ({ navigation, options, route, back }: NativeStackHeaderProps) => {
    const title = getHeaderTitle(options, route.name);
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const { mode } = useAppSelector((state) => state.persistedTheme);

    const [showBCDialog, setShowBCDialog] = useState(false);

    return (
        <Appbar.Header mode="small">
            {mode === 'punpun' && (
                <MotiView
                    from={{ translateX: width }}
                    animate={{ translateX: -width }}
                    transition={{
                        type: 'timing',
                        duration: 25000,
                        loop: true,
                        repeatReverse: false,
                        delay: 500,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    style={{ position: 'absolute', height: 60, width: 30 }}
                >
                    <MotiImage
                        from={{ translateY: -5 }}
                        animate={{ translateY: 5 }}
                        transition={{
                            type: 'timing',
                            duration: 1000,
                            loop: true,
                            repeatReverse: true,
                        }}
                        source={require('../../assets/punpun.png')}
                        style={{ height: 50, width: 30 }}
                        resizeMode="contain"
                    />
                </MotiView>
            )}
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            <Appbar.Content title={title} />
            <Appbar.Action icon="barcode-scan" onPress={() => setShowBCDialog(true)} />
            <Appbar.Action icon="magnify" onPress={() => navigation.navigate('search')} />
            <Portal>
                <BarcodeScanDialog
                    visible={showBCDialog}
                    onDismiss={() => setShowBCDialog(false)}
                    onNav={(aniId: number, malId: number, type: MediaType) =>
                        router.push(`/${type}/${aniId}`)
                    }
                />
            </Portal>
        </Appbar.Header>
    );
};

type SearchHeaderProps = NativeStackHeaderProps & {
    searchContent: (query: string) => void;
    openFilter: () => void;
    currentType: SearchType;
    searchbarRef: React.RefObject<TextInput>;
    historySelected: string | null;
    onHistorySelected: () => void;
    toggleIsFocused: (value: boolean) => void;
    setFilterSearch: (query: string) => void;
    openImageSearch: () => void;
    openWaifuSearch: () => void;
    onFocus: () => void;
    isFocused: boolean;
};
export const SearchHeader = ({
    navigation,
    options,
    route,
    back,
    openFilter,
    searchContent,
    historySelected,
    onHistorySelected,
    currentType,
    searchbarRef,
    isFocused,
    toggleIsFocused,
    setFilterSearch,
    openImageSearch,
    openWaifuSearch,
    onFocus,
}: SearchHeaderProps) => {
    const [query, setQuery] = useState('');
    const { colors } = useTheme();

    const { right, left } = useSafeAreaInsets();

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
            toggleIsFocused(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
            toggleIsFocused(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        if (historySelected) {
            setQuery(historySelected);
            onHistorySelected();
        }
    }, [historySelected]);

    return (
        <Appbar.Header>
            <Animated.View
                entering={SlideInUp.duration(500)}
                exiting={SlideOutDown}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: Math.max(left, right),
                    zIndex: 5,
                }}
            >
                <Searchbar
                    ref={searchbarRef}
                    value={query}
                    onChangeText={(txt) => {
                        setQuery(txt);
                        setFilterSearch(txt);
                    }}
                    onSubmitEditing={(e) => {
                        searchContent(e.nativeEvent.text);
                    }}
                    returnKeyType="search"
                    autoFocus
                    onFocus={() => {
                        searchbarRef?.current?.focus();
                        toggleIsFocused(true);
                        onFocus();
                    }}
                    onBlur={() => {
                        toggleIsFocused(false);
                    }}
                    placeholder="Search sauce..."
                    mode="bar"
                    onIconPress={() => navigation.goBack()}
                    selectionColor={colors.primaryContainer}
                    icon={'arrow-left'}
                    traileringIcon={
                        currentType === MediaType.Anime || currentType === 'imageSearch'
                            ? 'image-search-outline'
                            : currentType === 'characters' || currentType === 'waifuSearch'
                            ? 'account-search-outline'
                            : undefined
                    }
                    onTraileringIconPress={
                        currentType === 'characters' || currentType === 'waifuSearch'
                            ? openWaifuSearch
                            : openImageSearch
                    }
                    style={{ flex: 1, backgroundColor: 'transparent' }}
                    inputStyle={{ justifyContent: 'center', textAlignVertical: 'center' }}
                    onClearIconPress={() => {
                        setQuery('');
                    }}
                />
                <IconButton
                    icon={'filter-outline'}
                    onPress={openFilter}
                    // onPress={() => setIsFilterOpen((prev) => !prev)}
                    disabled={
                        ![MediaType.Anime, MediaType.Manga, 'imageSearch'].includes(currentType)
                    }
                />
            </Animated.View>
        </Appbar.Header>
    );
};

export const MoreHeader = ({ navigation, options, route, back }: NativeStackHeaderProps) => {
    const { mode } = useAppSelector((state: RootState) => state.persistedTheme);
    const title = getHeaderTitle(options, route.name);
    const { width } = useWindowDimensions();
    return (
        <Appbar.Header style={{ height: 200 }}>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            {/* <Appbar.Content title={title} /> */}
            <Image
                source={
                    mode === 'punpun'
                        ? require('../../assets/punpunRotate.gif')
                        : require('../../assets/icon3-trans.png')
                }
                style={{
                    width: width,
                    height: 225,
                    overflow: 'visible',
                    alignSelf: 'center',
                    position: 'absolute',
                    // top: -25,
                    bottom: 0,
                }}
                // contentFit="contain"
                contentFit="contain"
            />
        </Appbar.Header>
    );
};

export const BanTagHeader = ({
    navigation,
    options,
    route,
    back,
    iconColor,
    onSave,
}: NativeStackHeaderProps & { onSave: () => void; iconColor: string }) => {
    const title = getHeaderTitle(options, route.name);
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            <Appbar.Content title={title} />
            <Appbar.Action icon="check" iconColor={iconColor ?? undefined} onPress={onSave} />
        </Appbar.Header>
    );
};

type MediaHeaderProps = NativeStackHeaderProps;
export const MediaHeader = ({ navigation, options, route, back }: MediaHeaderProps) => {
    const title = getHeaderTitle(options, route.name);

    return (
        <Appbar.Header style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            <Appbar.Content title={title ?? ''} subtitle={'Test'} />
        </Appbar.Header>
    );
};

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(1.5);

type FadeHeaderProps = {
    children: React.ReactNode;
    title: string;
    shareLink?: string;
    favorite?: boolean;
    onFavorite?: () => void;
    onEdit?: () => void;
    loading?: boolean;
    disableBack?: boolean;
    addFriendIcon?: boolean;
    onAddFriend?: () => void;
    notificationIcon?: boolean;
    newNotifs?: number;
    onNotificationIcon?: () => void;
    keepTitle?: boolean;
    RefreshControl?: React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
    >;
    animationRange?: number[];
    BgImage?: ({ style }: { style?: any }) => React.JSX.Element;
    onBack?: () => void;
};
export const FadeHeaderProvider = ({
    children,
    title,
    shareLink,
    favorite,
    onFavorite,
    onEdit,
    loading,
    addFriendIcon,
    onAddFriend,
    notificationIcon,
    newNotifs,
    onNotificationIcon,
    RefreshControl,
    disableBack = false,
    animationRange = [40, 110],
    BgImage,
    onBack,
}: FadeHeaderProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { colors } = useTheme();
    const { headerStyle, headerTitleStyle, bgImageStyle, headerActionStyle, scrollHandler } =
        useHeaderAnim(animationRange[0], animationRange[1]);
    const { width, height } = useWindowDimensions();
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);

    const notifRotation = useSharedValue(0);

    const animatedNotifStyle = useAnimatedStyle(() => ({
        transform: [{ rotateZ: `${notifRotation.value}deg` }],
    }));

    const handleNotifPress = () => {
        notifRotation.value = 0;
        onNotificationIcon();
    };

    useEffect(() => {
        if (newNotifs && notificationIcon) {
            notifRotation.value = withRepeat(
                withSequence(
                    // deviate left to start from -ANGLE
                    withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
                    // wobble between -ANGLE and ANGLE 7 times
                    withRepeat(
                        withTiming(ANGLE, {
                            duration: TIME,
                            easing: EASING,
                        }),
                        7,
                        true,
                    ),
                    // go back to 0 at the end
                    withTiming(0, { duration: TIME / 2, easing: EASING }),
                ),
                -1,
            );
        }
    }, [newNotifs, notificationIcon]);

    const Header = () => {
        return (
            <Animated.View style={[headerStyle]}>
                <Appbar.Header style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                    {navigation.canGoBack && !disableBack && (
                        <Animated.View
                            style={[
                                {
                                    borderRadius: 100,
                                    height: 42,
                                    width: 42,
                                    marginLeft: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                headerActionStyle,
                            ]}
                        >
                            <Appbar.BackAction
                                onPress={() => {
                                    navigation.goBack();
                                    onBack ? onBack() : null;
                                }}
                            />
                        </Animated.View>
                    )}
                    <Animated.View
                        style={[
                            headerTitleStyle,
                            {
                                flex: 1,
                                height: '50%',
                                justifyContent: 'center',
                                paddingLeft: disableBack ? 20 : 0,
                            },
                        ]}
                    >
                        <Appbar.Content
                            title={title ?? ''}
                            titleStyle={{ textTransform: 'capitalize' }}
                        />
                    </Animated.View>
                    {onEdit !== undefined && (
                        <Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
                            <Appbar.Action icon="file-document-edit-outline" onPress={onEdit} />
                        </Animated.View>
                    )}
                    {shareLink && (
                        <Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
                            <Appbar.Action
                                icon="share-variant-outline"
                                onPress={() =>
                                    Share.share({
                                        url: shareLink,
                                        title: shareLink,
                                        message: shareLink,
                                    })
                                }
                                disabled={!shareLink}
                            />
                        </Animated.View>
                    )}
                    {favorite !== undefined && userID && (
                        <Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
                            <Appbar.Action
                                icon={favorite ? 'heart' : 'heart-outline'}
                                onPress={onFavorite}
                                color="red"
                            />
                        </Animated.View>
                    )}
                    {userID && addFriendIcon && (
                        <Animated.View
                            style={[
                                {
                                    borderRadius: 100,
                                    height: 42,
                                    width: 42,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                headerActionStyle,
                            ]}
                        >
                            <Appbar.Action icon={'account-plus-outline'} onPress={onAddFriend} />
                        </Animated.View>
                    )}
                    {userID && notificationIcon && (
                        <Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
                            <Animated.View style={[animatedNotifStyle]}>
                                <Appbar.Action icon={'bell-outline'} onPress={handleNotifPress} />
                            </Animated.View>
                            {newNotifs ? (
                                <Badge
                                    style={{
                                        position: 'absolute',
                                        right: -5,
                                        top: -5,
                                        color: colors.onPrimary,
                                        backgroundColor: colors.primary,
                                    }}
                                >
                                    {newNotifs}
                                </Badge>
                            ) : null}
                        </Animated.View>
                    )}
                </Appbar.Header>
            </Animated.View>
        );
    };

    const BackgroundImage = useCallback(() => {
        return <BgImage style={bgImageStyle} />;
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title: title,
            headerTransparent: true,
            headerShown: loading ? false : true,
            header: (props) => <Header />,
            animation: navAnimation,
        });
    }, [loading]);

    return (
        <View>
            {BgImage && <BackgroundImage />}
            <Animated.ScrollView
                refreshControl={RefreshControl ?? undefined}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
            >
                {children}
            </Animated.ScrollView>
        </View>
    );
};

export const CharStaffHeader = ({ navigation, options, route, back }: NativeStackHeaderProps) => {
    return (
        <Appbar.Header style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
        </Appbar.Header>
    );
};

const HeaderStyles = StyleSheet.create({
    icon: {
        borderRadius: 100,
        height: 42,
        width: 42,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const ListHeader = ({ openFilter }: { openFilter: () => void }) => {
    const { query } = useAppSelector((state) => state.listFilter);
    const dispatch = useAppDispatch();
    // const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useFocusEffect(() => {
        const backAction = () => {
            console.log('back triggered!');
            setIsOpen(false);
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
            backHandler.remove();
        };
    });

    const { right, left } = useSafeAreaInsets();

    return (
        <Appbar.Header>
            {isOpen ? (
                <Animated.View
                    entering={SlideInRight}
                    exiting={SlideOutRight}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: Math.max(left, right),
                        flexShrink: 1,
                    }}
                >
                    {/* <Appbar.BackAction onPress={() => setIsOpen(false)} /> */}
                    <Searchbar
                        value={query}
                        onChangeText={(txt) => {
                            dispatch(updateListFilter({ entryType: 'query', value: txt }));
                        }}
                        icon={'arrow-left'}
                        onIconPress={() => setIsOpen(false)}
                        mode="bar"
                    />
                </Animated.View>
            ) : (
                <Appbar.Content title={'List'} />
            )}
            {!isOpen && <Appbar.Action icon="magnify" onPress={() => setIsOpen(true)} />}
            {/* <Appbar.Action icon="filter-outline" onPress={openFilter} /> */}
        </Appbar.Header>
    );
};

export const FavoritesHeader = ({ navigation, options, route, back }: NativeStackHeaderProps) => {
    const { query } = useAppSelector((state) => state.favSearch);
    const dispatch = useAppDispatch();
    // const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const backAction = () => {
            if (isOpen) {
                setIsOpen(false);
            } else {
                navigation.goBack();
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [isOpen]);

    const { right, left } = useSafeAreaInsets();

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={isOpen ? () => setIsOpen(false) : navigation.goBack} />
            {isOpen ? (
                <Animated.View
                    entering={SlideInRight}
                    exiting={SlideOutRight}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: Math.max(left, right),
                        flexShrink: 1,
                    }}
                >
                    {/* <Appbar.BackAction onPress={() => setIsOpen(false)} /> */}
                    <Searchbar
                        value={query}
                        onChangeText={(txt) => {
                            dispatch(updateFavSearch(txt));
                        }}
                        placeholder={'Search favorites...'}
                        mode="bar"
                    />
                </Animated.View>
            ) : (
                <Appbar.Content title={'Favorites'} />
            )}
            {!isOpen && <Appbar.Action icon="magnify" onPress={() => setIsOpen(true)} />}
        </Appbar.Header>
    );
};

export default PaperHeader;
