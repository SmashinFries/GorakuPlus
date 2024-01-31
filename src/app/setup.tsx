import { ThemeSkeleton } from '@/components/more/settings/appearance/skeletons';
import { SetupNavBar } from '@/components/setup/nav';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ThemeOptions, availableThemes, themeOptions } from '@/store/theme/theme';
import { setTheme } from '@/store/theme/themeSlice';
import { rgbToRgba } from '@/utils';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiPressable } from 'moti/interactions';
import { useEffect, useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { Pressable, ViewStyle } from 'react-native';
import { StyleProp, View } from 'react-native';
import { Button, IconButton, Switch, Text, useTheme } from 'react-native-paper';
import Animated, {
    AnimatedStyle,
    SlideInLeft,
    SlideInRight,
    SlideOutLeft,
    SlideOutRight,
    useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import switchTheme from 'react-native-theme-switch-animation';

const SETUP_PAGES = 3;

type BodyProps = {
    children?: React.ReactNode;
    style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
};
const Body = ({ children, style }: BodyProps) => {
    return (
        <Animated.View
            entering={SlideInRight}
            exiting={SlideOutLeft}
            style={[{ flex: 1, alignItems: 'center' }, style]}
        >
            {children}
        </Animated.View>
    );
};

type TitleTextProps = {
    title: string;
    description?: string;
    containerStyle?: StyleProp<ViewStyle>;
};
const TitleText = ({ title, description, containerStyle }: TitleTextProps) => {
    const { top } = useSafeAreaInsets();
    return (
        <View
            style={[
                {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                containerStyle,
            ]}
        >
            <Text variant="headlineMedium" style={{ fontWeight: '900' }}>
                {title}
            </Text>
            {description ? (
                <Text
                    variant="titleMedium"
                    style={{
                        marginTop: 10,
                        paddingHorizontal: 20,
                    }}
                >
                    {description}
                </Text>
            ) : null}
        </View>
    );
};

const IntroPage = () => {
    return (
        <Body style={{ justifyContent: 'center' }}>
            <TitleText title={'Welcome to Goraku'} containerStyle={{ flex: 0 }} />
            <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                <Button style={{ marginHorizontal: 20 }}>Skip</Button>
                <Button mode="elevated" style={{ marginHorizontal: 20 }}>
                    Continue
                </Button>
            </View>
        </Body>
    );
};

const Page1 = () => {
    // const { width, height } = useWindowDimensions();
    const { dark, colors } = useTheme();
    const dispatch = useAppDispatch();
    const { mode, isDark } = useAppSelector((state) => state.persistedTheme);

    const onDarkChange = (darkMode: boolean, py: number, px: number) => {
        switchTheme({
            switchThemeFunction: () => {
                dispatch(setTheme({ isDark: !isDark, mode: mode }));
            },
            animationConfig: {
                type: 'fade',
                duration: 900,
            },
            // animationConfig: {
            //     type: 'circular',
            //     duration: 900,
            //     startingPoint: {
            //         cy: py,
            //         cx: px,
            //     },
            // },
        });
    };

    const onThemeChange = (theme: ThemeOptions, py: number, px: number) => {
        switchTheme({
            switchThemeFunction: () => dispatch(setTheme({ mode: theme, isDark: isDark })),
            animationConfig: {
                type: 'circular',
                duration: 900,
                startingPoint: {
                    cy: py,
                    cx: px,
                },
            },
        });
    };

    return (
        <Body>
            <TitleText title={'Choose a Theme'} description={"Let's start by choosing a theme!"} />
            {/* <View style={{ flex: 1 }}>
                <Image
                    source={{ uri: 'https://placewaifu.com/image/200' }}
                    contentFit="contain"
                    style={{ width: 200, height: 200 }}
                />
            </View> */}
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                }}
            >
                <Pressable
                    onPress={(e) => onDarkChange(false, e.nativeEvent.pageY, e.nativeEvent.pageX)}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                    }}
                >
                    <IconButton icon={'weather-sunny'} />
                    <Text variant="labelLarge">Light Mode</Text>
                </Pressable>
                <Pressable
                    onPress={(e) => onDarkChange(true, e.nativeEvent.pageY, e.nativeEvent.pageX)}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                    }}
                >
                    <IconButton icon={'weather-night'} />
                    <Text variant="labelLarge">Dark Mode</Text>
                </Pressable>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        marginTop: 20,
                    }}
                >
                    {themeOptions.map((theme, idx) => (
                        // <Pressable
                        //     key={idx}
                        //     style={{
                        //         width: 40,
                        //         height: 40,
                        //         borderRadius: 20,
                        //         marginHorizontal: 5,
                        //         backgroundColor:
                        //             availableThemes[dark ? 'dark' : 'light'][theme].colors.primary,
                        //     }}
                        //     onPress={(e) =>
                        //         onThemeChange(theme, e.nativeEvent.pageY, e.nativeEvent.pageX)
                        //     }
                        // />
                        <Pressable
                            key={idx}
                            // @ts-ignore
                            onPress={(e) =>
                                onThemeChange(theme, e.nativeEvent.pageY, e.nativeEvent.pageX)
                            }
                        >
                            <View
                                style={{
                                    borderWidth: 1,
                                    borderColor: mode === theme ? colors.primary : 'transparent',
                                    borderRadius: 12,
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                    alignItems: 'center',
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                }}
                            >
                                <ThemeSkeleton
                                    theme={availableThemes[isDark ? 'dark' : 'light'][theme]}
                                    active={mode === theme}
                                />
                                <Text
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingTop: 10,
                                        textTransform: 'capitalize',
                                        alignSelf: 'center',
                                    }}
                                    numberOfLines={2}
                                >
                                    {theme.replaceAll('_', ' ')}
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
                <Button mode="outlined" style={{ marginBottom: 30 }}>
                    Continue
                </Button>
            </View>
        </Body>
    );
};

const Page2 = () => {
    return (
        <Body>
            <TitleText title={'Login to Anilist'} />
        </Body>
    );
};

const Page3 = () => {
    return <Body></Body>;
};

const RenderPage = ({ page }: { page: number }) => {
    switch (page) {
        case 0:
            return <IntroPage />;
        case 1:
            return <Page1 />;
        case 2:
            return <Page2 />;
        case 3:
            return <Page3 />;
        default:
            return <View />;
    }
};

const SetupModal = () => {
    const [page, setPage] = useState(0);
    const { colors } = useTheme();

    const onPageChange = (navType: 'next' | 'prev') => {
        if (navType === 'next') {
            setPage((prevPage) => prevPage + 1);
        } else if (navType === 'prev' && page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={[colors.background, rgbToRgba(colors.primary, 0.4)]}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                }}
            />
            <RenderPage page={page} />
            <View
                style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}
            >
                <SetupNavBar page={page} numPages={SETUP_PAGES} onPageChange={onPageChange} />
            </View>
        </View>
    );
};

export default SetupModal;
