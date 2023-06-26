import React, { useEffect, useState } from 'react';
import { Appbar, Button, IconButton, Portal, Searchbar, Text, useTheme } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { MotiImage, MotiScrollView, MotiView } from 'moti';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';
import { useHeaderAnim } from './animations';
import { useNavigation } from '@react-navigation/native';
import { setSearch } from '../features/search/searchSlice';

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
    const { width } = useWindowDimensions();
    const { mode } = useSelector((state: RootState) => state.persistedTheme);
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
            <Appbar.Action icon="crystal-ball" onPress={() => console.log('RANDOM CONTENT')} />
            <Appbar.Action icon="magnify" onPress={() => navigation.navigate('search')} />
        </Appbar.Header>
    );
};

type SearchHeaderProps = NativeStackHeaderProps & {
    onSearch: (search?: string) => void;
    openFilter: () => void;
};
export const SearchHeader = ({
    navigation,
    options,
    route,
    back,
    openFilter,
    onSearch,
}: SearchHeaderProps) => {
    // const title = getHeaderTitle(options, route.name);
    const { search, history, historyLimit } = useSelector(
        (state: RootState) => state.persistedSearch,
    );
    const [isFilterActive, setIsFilterActive] = useState(false);
    const dispatch = useDispatch();

    const clearSearch = () => dispatch(setSearch(''));

    return (
        <Appbar.Header elevated>
            <Searchbar
                value={search}
                onChangeText={(txt) => dispatch(setSearch(txt))}
                onSubmitEditing={() => onSearch(search)}
                returnKeyType="search"
                autoFocus
                placeholder="Search sauce..."
                mode="bar"
                icon="arrow-left"
                onIconPress={navigation.goBack}
                traileringIcon={'image-search-outline'}
                style={{ flex: 1 }}
            />
            <IconButton icon={isFilterActive ? 'filter' : 'filter-outline'} onPress={openFilter} />
        </Appbar.Header>
    );
};

export const MoreHeader = ({ navigation, options, route, back }: NativeStackHeaderProps) => {
    const { mode } = useSelector((state: RootState) => state.persistedTheme);
    const title = getHeaderTitle(options, route.name);
    return (
        <Appbar.Header style={{ height: 200, justifyContent: 'center' }}>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            {/* <Appbar.Content title={title} /> */}
            <Image
                source={
                    mode === 'punpun'
                        ? require('../../assets/punpunRotate.gif')
                        : {
                              uri: 'http://3.bp.blogspot.com/-EhrA8cHwXnQ/TyCtHjs957I/AAAAAAAAAeg/QJfY0lg1x34/s1600/1019i.gif',
                          }
                }
                style={{ width: 300, height: 200, alignSelf: 'center' }}
                contentFit="contain"
            />
        </Appbar.Header>
    );
};

type MediaHeaderProps = NativeStackHeaderProps;
export const MediaHeader = ({ navigation, options, route, back }: MediaHeaderProps) => {
    const title = getHeaderTitle(options, route.name);

    return (
        <Appbar.Header style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            <Appbar.Content title={title ?? ''} />
            <Appbar.Action icon="dots-vertical" onPress={() => console.log('test')} />
        </Appbar.Header>
    );
};

type FadeHeaderProps = {
    children: React.ReactNode;
    title: string;
    loading?: boolean;
};
export const FadeHeaderProvider = ({ children, title, loading }: FadeHeaderProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { colors } = useTheme();
    const { headerStyle, headerTitleStyle, scrollHandler } = useHeaderAnim();
    const { width, height } = useWindowDimensions();

    const Header = () => {
        return (
            <Animated.View style={[headerStyle]}>
                <Appbar.Header style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                    {navigation.canGoBack && <Appbar.BackAction onPress={navigation.goBack} />}
                    <Animated.View
                        style={[
                            headerTitleStyle,
                            {
                                flex: 1,
                                height: '50%',
                                justifyContent: 'center',
                            },
                        ]}
                    >
                        <Appbar.Content title={title ?? ''} />
                    </Animated.View>
                    <Appbar.Action
                        icon="file-document-edit-outline"
                        onPress={() => console.log('test')}
                    />
                    <Appbar.Action
                        icon="share-variant-outline"
                        onPress={() => console.log('test')}
                    />
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
            <MotiScrollView scrollEventThrottle={16} onScroll={scrollHandler}>
                {children}
            </MotiScrollView>
        </View>
    );
};

export default PaperHeader;
