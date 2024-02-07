import { MediaCard, MediaProgressBar } from '@/components/cards';
import { ThemeSkeleton } from '@/components/more/settings/appearance/skeletons';
import { SetupNavBar } from '@/components/setup/nav';
import { AnilistIcon } from '@/components/svgs';
import dummyData from '@/constants/dummyData';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    GenreTagCollectionQuery,
    useGenreTagCollectionQuery,
} from '@/store/services/anilist/generated-anilist';
import { useAnilistAuth } from '@/store/services/anilist/hooks/authAni';
import { ScoreVisualType, ScoreVisualTypeEnum, setSettings } from '@/store/slices/settingsSlice';
import { ThemeOptions, availableThemes, themeOptions } from '@/store/theme/theme';
import { setTheme } from '@/store/theme/themeSlice';
import { rgbToRgba } from '@/utils';
import { openWebBrowser } from '@/utils/webBrowser';
import { makeRedirectUri } from 'expo-auth-session';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiPressable } from 'moti/interactions';
import { useCallback, useEffect, useState } from 'react';
import {
    ScrollView,
    useWindowDimensions,
    Pressable,
    StyleProp,
    View,
    ViewStyle,
    FlatList,
} from 'react-native';
import {
    Avatar,
    Button,
    Chip,
    Divider,
    IconButton,
    List,
    Searchbar,
    Switch,
    Text,
    useTheme,
} from 'react-native-paper';
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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SETUP_PAGES = 6;

type Page = {
    page: number;
    pageAnim: 'next' | 'prev';
};

type BodyProps = {
    children?: React.ReactNode;
    pageAnim?: Page['pageAnim'];
    style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
};
const Body = ({ children, pageAnim, style }: BodyProps) => {
    const nextAnimation = [SlideInRight, SlideOutLeft];
    const prevAnimation = [SlideInLeft, SlideOutRight];
    return (
        <Animated.View
            entering={pageAnim === 'next' ? nextAnimation[0] : prevAnimation[0]}
            exiting={pageAnim === 'next' ? nextAnimation[1] : prevAnimation[1]}
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
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: top + 50,
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

const IntroPage = ({ pageAnim }: { pageAnim: Page['pageAnim'] }) => {
    return (
        <Body pageAnim={pageAnim}>
            <TitleText
                title={'Welcome to Goraku'}
                description="Take a moment to setup the app for an optimal experience!"
            />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image
                    source={{ uri: 'https://placewaifu.com/image/200' }}
                    contentFit="contain"
                    style={{ width: 200, height: 200 }}
                />
            </View>
        </Body>
    );
};

const Page1 = ({ pageAnim }: { pageAnim: Page['pageAnim'] }) => {
    // const { width, height } = useWindowDimensions();
    const { dark, colors } = useTheme();
    const dispatch = useAppDispatch();
    const { mode, isDark } = useAppSelector((state) => state.persistedTheme);

    const onDarkChange = (darkMode: boolean, py: number, px: number) => {
        switchTheme({
            switchThemeFunction: () => {
                dispatch(setTheme({ isDark: darkMode, mode: mode }));
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
        <Body pageAnim={pageAnim}>
            <TitleText title={'Choose a Theme'} description={"Let's start by choosing a theme!"} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                    }}
                >
                    <Pressable
                        onPress={(e) =>
                            onDarkChange(false, e.nativeEvent.pageY, e.nativeEvent.pageX)
                        }
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
                        onPress={(e) =>
                            onDarkChange(true, e.nativeEvent.pageY, e.nativeEvent.pageX)
                        }
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
                            <View key={idx}>
                                <Pressable
                                    style={{
                                        marginHorizontal: 10,
                                        borderRadius: 12,
                                    }}
                                    onPress={(e) =>
                                        onThemeChange(
                                            theme,
                                            e.nativeEvent.pageY,
                                            e.nativeEvent.pageX,
                                        )
                                    }
                                >
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor:
                                                mode === theme ? colors.primary : 'transparent',
                                            borderRadius: 12,
                                            alignItems: 'center',
                                            paddingHorizontal: 15,
                                            paddingVertical: 10,
                                        }}
                                    >
                                        <ThemeSkeleton
                                            theme={
                                                availableThemes[isDark ? 'dark' : 'light'][theme]
                                            }
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
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Body>
    );
};

const Page2 = ({ pageAnim }: { pageAnim: Page['pageAnim'] }) => {
    const { token, username, avatar } = useAppSelector((state) => state.persistedAniLogin);
    const { request, result, promptAsync } = useAnilistAuth(true);

    return (
        <Body style={{ justifyContent: 'center' }} pageAnim={pageAnim}>
            <AnilistIcon isDark={true} height={100} width={100} />
            <TitleText
                title={'Connect to Anilist'}
                description="Connect your Anilist acount for the full experience."
                containerStyle={{ flex: 0, justifyContent: 'center', paddingBottom: 20 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                {!token && (
                    <Button
                        mode="contained"
                        onPress={() => openWebBrowser('https://anilist.co/signup', true)}
                        style={{ marginRight: 10 }}
                    >
                        {'Create Account'}
                    </Button>
                )}
                {token ? (
                    <View style={{ alignItems: 'center' }}>
                        {avatar && <Avatar.Image source={{ uri: avatar }} />}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text variant="titleMedium" style={{ textAlign: 'center' }}>
                                Welcome {username}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <Button mode="elevated" onPress={() => promptAsync()}>
                        {'Login'}
                    </Button>
                )}
            </View>
        </Body>
    );
};

const Page3 = ({ pageAnim }: { pageAnim: Page['pageAnim'] }) => {
    const dispatch = useAppDispatch();
    const { scoreColors, defaultScore, scoreVisualType, mediaLanguage } = useAppSelector(
        (state) => state.persistedSettings,
    );
    const { mode, isDark } = useAppSelector((state) => state.persistedTheme);
    const { colors } = useTheme();
    const { width, height } = useWindowDimensions();
    const [visualPreset, setVisualPreset] = useState<ScoreVisualType>(scoreVisualType);
    const [titleLang, setTitleLang] = useState<typeof mediaLanguage>(mediaLanguage);

    const onScoreDesignChange = (preset: ScoreVisualType) => {
        dispatch(setSettings({ entryType: 'scoreVisualType', value: preset }));
    };

    const onTitleLanguageChange = (lang: typeof mediaLanguage) => {
        dispatch(setSettings({ entryType: 'mediaLanguage', value: lang }));
    };

    return (
        <Body pageAnim={pageAnim}>
            <TitleText
                title={'Card Customization'}
                description={'Customize the look of media cards that are shown throughout the app.'}
            />
            <View style={{ justifyContent: 'center', paddingVertical: 30 }}>
                <View
                    style={{
                        alignSelf: 'center',
                    }}
                >
                    <MediaCard
                        coverImg={dummyData[mode].coverImage?.extraLarge}
                        titles={dummyData[mode].title}
                        meanScore={dummyData[mode].meanScore}
                        averageScore={dummyData[mode].averageScore}
                        scoreColors={scoreColors}
                        // scoreVisualType={scoreVisualType}
                        scoreDistributions={dummyData[mode].stats?.scoreDistribution}
                        // titleLang={titleLang}
                    />
                    <MediaProgressBar
                        progress={
                            (dummyData[mode].episodes ?? dummyData[mode].mediaListEntry.progress) /
                            2
                        }
                        total={dummyData[mode].episodes ?? dummyData[mode].chapters}
                        mediaStatus={dummyData[mode].status}
                        mediaListEntry={dummyData[mode].mediaListEntry}
                        showListStatus={true}
                    />
                </View>
                <List.Subheader>Score Design</List.Subheader>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ maxHeight: 50, paddingHorizontal: 10 }}
                >
                    {Object.keys(ScoreVisualTypeEnum).map((visual, idx) => (
                        <Chip
                            key={idx}
                            mode="outlined"
                            selected={visualPreset === ScoreVisualTypeEnum[visual]}
                            onPress={() => onScoreDesignChange(ScoreVisualTypeEnum[visual])}
                            textStyle={{
                                color:
                                    visualPreset === ScoreVisualTypeEnum[visual]
                                        ? colors.primary
                                        : colors.onBackground,
                            }}
                            selectedColor={colors.primary}
                            style={{
                                marginHorizontal: 5,
                                justifyContent: 'center',
                                // borderColor:
                                //     visualPreset === ScoreVisualTypeEnum[visual]
                                //         ? colors.primary
                                //         : undefined,
                            }}
                        >
                            {visual}
                        </Chip>
                    ))}
                </ScrollView>
                <List.Subheader>Title Language</List.Subheader>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ maxHeight: 50, paddingHorizontal: 10 }}
                >
                    {['english', 'romaji', 'native'].map((lang, idx) => (
                        <Chip
                            key={idx}
                            mode="outlined"
                            selected={mediaLanguage === lang}
                            onPress={() =>
                                onTitleLanguageChange(lang as 'english' | 'romaji' | 'native')
                            }
                            style={{ marginHorizontal: 5, justifyContent: 'center' }}
                            textStyle={{
                                textTransform: 'capitalize',
                                color:
                                    mediaLanguage === lang ? colors.primary : colors.onBackground,
                            }}
                            selectedColor={colors.primary}
                        >
                            {lang}
                        </Chip>
                    ))}
                </ScrollView>
            </View>
        </Body>
    );
};

const Page4 = ({ pageAnim }: { pageAnim: Page['pageAnim'] }) => {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const { tagBlacklist } = useAppSelector((state) => state.persistedSettings);
    const [tags, setTags] = useState<string[]>(tagBlacklist ?? []);
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<
        GenreTagCollectionQuery['MediaTagCollection']
    >([]);

    const dispatch = useAppDispatch();

    const { data, isFetching, isError } = useGenreTagCollectionQuery(undefined);

    const TagChip = useCallback(
        ({ name, onPress, icon }) => (
            <Chip
                style={{ margin: 8, borderColor: colors.primary }}
                icon={icon ?? undefined}
                mode="outlined"
                // selectedColor={isSelected(name) ? colors.primary : undefined}
                onPress={() => onPress(name)}
            >
                {name}
            </Chip>
        ),
        [tags],
    );

    const onAdd = (tag: string) => {
        dispatch(setSettings({ entryType: 'tagBlacklist', value: [...tagBlacklist, tag] }));
    };

    const onRemove = (tag: string) => {
        dispatch(
            setSettings({
                entryType: 'tagBlacklist',
                value: tagBlacklist.filter((t) => t !== tag),
            }),
        );
    };

    useEffect(() => {
        if (data) {
            setSearchResults(data.MediaTagCollection);
        }
    }, [data]);

    useEffect(() => {
        if (data && tagBlacklist) {
            setSearchResults(
                data.MediaTagCollection?.filter((t) => !tagBlacklist.includes(t.name)),
            );
        }
    }, [data, tagBlacklist]);

    useEffect(() => {
        if (data && search.length > 0) {
            setSearchResults(
                data.MediaTagCollection?.filter((t) =>
                    t.name.toLowerCase().includes(search.toLowerCase()),
                ),
            );
        }
    }, [search, data]);

    return (
        <Body pageAnim={pageAnim}>
            <TitleText
                title={'Blacklist Tags'}
                description="Select tags that you want hidden. This will globally exclude content containing any of these tags."
            />
            <ScrollView
                horizontal
                contentContainerStyle={{ alignItems: 'flex-start' }}
                style={{ minHeight: 50, marginVertical: 5 }}
            >
                {tagBlacklist.map((tag, idx) => (
                    <TagChip key={idx} name={tag} onPress={() => onRemove(tag)} icon={'close'} />
                ))}
            </ScrollView>
            <Searchbar
                style={{
                    margin: 10,
                    backgroundColor: colors.background,
                    borderColor: colors.primary,
                }}
                value={search}
                onChangeText={(txt) => setSearch(txt)}
                mode="bar"
            />
            <Divider style={{ width: '100%' }} />
            {/* <ScrollView
                style={{ marginVertical: 10 }}
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
                {searchResults?.map(
                    (tag, idx) =>
                        !tag.isAdult && (
                            <Chip key={idx} mode="outlined" style={{ margin: 5 }}>
                                {tag.name}
                            </Chip>
                        ),
                )}
            </ScrollView> */}
            <FlatList
                data={searchResults}
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingBottom: 50,
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    !item.isAdult && (
                        <Chip
                            mode="outlined"
                            onPress={() => onAdd(item.name)}
                            style={{
                                margin: 5,
                            }}
                        >
                            {item.name}
                        </Chip>
                    )
                }
            />
            <Divider style={{ width: '100%', marginBottom: 10 }} />
        </Body>
    );
};

const Page5 = ({ pageAnim }: { pageAnim: Page['pageAnim'] }) => {
    return (
        <Body pageAnim={pageAnim}>
            <TitleText
                title={'Explore Tabs'}
                description="Select what type of content you want quick access to."
            />
            {/* <List.Item title="Anime" right={(props) } /> */}
            <List.Item title="Anime" />
            <List.Item title="Anime" />
            <List.Item title="Anime" />
            <List.Item title="Anime" />
        </Body>
    );
};

const RenderPage = ({ page, pageAnim }: Page) => {
    switch (page) {
        case 0:
            return <IntroPage pageAnim={pageAnim} />;
        case 1:
            return <Page1 pageAnim={pageAnim} />;
        case 2:
            return <Page2 pageAnim={pageAnim} />;
        case 3:
            return <Page3 pageAnim={pageAnim} />;
        case 4:
            return <Page4 pageAnim={pageAnim} />;
        case 5:
            return <Page5 pageAnim={pageAnim} />;
        default:
            return <View />;
    }
};

const SetupModal = () => {
    const [page, setPage] = useState<Page>({ page: 0, pageAnim: 'next' });
    const { colors } = useTheme();

    const onPageChange = (navType: 'next' | 'prev') => {
        if (navType === 'next') {
            setPage((prevPage) => ({ page: prevPage.page + 1, pageAnim: 'next' }));
        } else if (navType === 'prev' && page.page > 0) {
            setPage((prevPage) => ({ page: prevPage.page - 1, pageAnim: 'prev' }));
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* [colors.background, rgbToRgba(colors.primary, 0.4)] */}
            <LinearGradient
                colors={[rgbToRgba(colors.primary, 0.4), colors.background]}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                }}
            />
            <RenderPage page={page.page} pageAnim={page.pageAnim} />
            {page.page + 1 < SETUP_PAGES ? (
                <Button
                    onPress={() => onPageChange('next')}
                    mode="contained"
                    style={{ marginBottom: 30, marginHorizontal: 20 }}
                >
                    Next
                </Button>
            ) : (
                <Button mode="contained" style={{ marginBottom: 30, marginHorizontal: 20 }}>
                    Complete
                </Button>
            )}
            <View
                style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}
            >
                <SetupNavBar page={page.page} numPages={SETUP_PAGES} onPageChange={onPageChange} />
            </View>
        </View>
    );
};

export default SetupModal;
