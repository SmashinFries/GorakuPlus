import React, { useCallback, useEffect, useState } from 'react';
import {
    Appbar,
    Avatar,
    Button,
    IconButton,
    Portal,
    Searchbar,
    Text,
    useTheme,
} from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    Keyboard,
    RefreshControlProps,
    Share,
    ToastAndroid,
    View,
    useWindowDimensions,
} from 'react-native';
// import {} from 'react'
import { RootState } from '../app/store';
import { MotiImage, MotiScrollView, MotiView } from 'moti';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';
import { useHeaderAnim } from './animations';
import { useNavigation } from '@react-navigation/native';
import { MediaType } from '../app/services/anilist/generated-anilist';
import { StatusBar } from 'expo-status-bar';
import { useAppSelector } from '../app/hooks';

const PaperHeader = ({ navigation, options, route, back }: NativeStackHeaderProps) => {
    const title = getHeaderTitle(options, route.name);
    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
};

export const ExploreHeader = ({ navigation, options, route, back }: NativeStackHeaderProps) => {
    const title = getHeaderTitle(options, route.name);
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const { mode } = useAppSelector((state) => state.persistedTheme);
    return (
        <Appbar.Header>
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
            <Appbar.Action
                icon="crystal-ball"
                iconColor={colors.surfaceVariant}
                onPress={() => ToastAndroid.show('Randomizer coming soon!', ToastAndroid.LONG)}
            />
            <Appbar.Action
                icon="barcode-scan"
                iconColor={colors.surfaceVariant}
                onPress={() => ToastAndroid.show('Barcode search coming soon!', ToastAndroid.LONG)}
            />
            <Appbar.Action
                icon="image-search-outline"
                iconColor={colors.surfaceVariant}
                onPress={() => ToastAndroid.show('Image search coming soon!', ToastAndroid.LONG)}
            />
            <Appbar.Action icon="magnify" onPress={() => navigation.navigate('search')} />
        </Appbar.Header>
    );
};

type SearchHeaderProps = NativeStackHeaderProps & {
    searchContent: () => void;
    openFilter: () => void;
    search: string;
    currentType: string;
    setSearch: (txt: string) => void;
};
export const SearchHeader = ({
    navigation,
    options,
    route,
    back,
    openFilter,
    searchContent,
    search,
    setSearch,
    currentType,
}: SearchHeaderProps) => {
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Searchbar
                value={search}
                onChangeText={(txt) => setSearch(txt)}
                onSubmitEditing={(e) => {
                    searchContent();
                }}
                returnKeyType="search"
                autoFocus
                placeholder="Search sauce..."
                mode="bar"
                onIconPress={searchContent}
                // traileringIcon={'image-search-outline'}
                // onTraileringIconPress={() => ToastAndroid.show('Image search coming soon!', 1000)}
                icon={null}
                style={{ flex: 1, backgroundColor: 'transparent' }}
                inputStyle={{ justifyContent: 'center', textAlignVertical: 'center' }}
                onClearIconPress={() => {
                    setSearch('');
                }}
            />
            <IconButton
                icon={'filter-outline'}
                onPress={openFilter}
                // onPress={() => setIsFilterOpen((prev) => !prev)}
                disabled={![MediaType.Anime, MediaType.Manga].includes(currentType as MediaType)}
            />
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
            <Appbar.Action icon="dots-vertical" onPress={() => console.log('test')} />
        </Appbar.Header>
    );
};

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
    RefreshControl?: React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
    >;
    animationRange?: number[];
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
    RefreshControl,
    disableBack = false,
    animationRange = [40, 110],
}: FadeHeaderProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { colors } = useTheme();
    const { headerStyle, headerTitleStyle, headerActionStyle, scrollHandler } = useHeaderAnim(
        animationRange[0],
        animationRange[1],
    );
    const { width, height } = useWindowDimensions();
    const { userID } = useAppSelector((state) => state.persistedAniLogin);

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
                            <Appbar.BackAction onPress={navigation.goBack} />
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
                            <Appbar.Action icon="file-document-edit-outline" onPress={onEdit} />
                        </Animated.View>
                    )}
                    {shareLink && (
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
                </Appbar.Header>
            </Animated.View>
        );
    };

    useEffect(() => {
        navigation.setOptions({
            title: title,
            headerTransparent: true,
            headerShown: loading ? false : true,
            header: (props) => <Header />,
        });
    }, [loading]);

    return (
        <View>
            <MotiScrollView
                refreshControl={RefreshControl ?? undefined}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
            >
                {children}
            </MotiScrollView>
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

export default PaperHeader;
