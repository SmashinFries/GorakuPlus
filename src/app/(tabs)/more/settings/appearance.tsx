import { Accordion } from '@/components/animations';
import { ThemeSkeleton } from '@/components/more/settings/appearance/skeletons';
import { MotiButton } from '@/components/moti';
import { ListSubheader } from '@/components/titles';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSettings } from '@/store/slices/settingsSlice';
import { ThemeOptions, availableThemes, themeOptions } from '@/store/theme/theme';
import { setTheme } from '@/store/theme/themeSlice';
import { MotiPressable } from 'moti/interactions';
import { Pressable } from 'react-native';
import { Platform, ScrollView, View } from 'react-native';
import { List, Switch, Text, useTheme } from 'react-native-paper';
import { StackAnimationTypes } from 'react-native-screens';
import switchTheme from 'react-native-theme-switch-animation';

const STACK_ANIMS_ANDROID: StackAnimationTypes[] = [
    'none',
    'default',
    'fade',
    'fade_from_bottom',
    'slide_from_bottom',
    'slide_from_left',
    'slide_from_right',
];

const STACK_ANIMS_IOS: StackAnimationTypes[] = [
    'none',
    'default',
    'fade',
    'fade_from_bottom',
    'flip',
    'simple_push',
    'slide_from_bottom',
];

const AppearancePage = () => {
    const { mode, isDark } = useAppSelector((state) => state.persistedTheme);
    const { btmTabLabels, btmTabShifting, navAnimation, allowSensorMotion } = useAppSelector(
        (state) => state.persistedSettings,
    );

    const dispatch = useAppDispatch();
    const { colors } = useTheme();

    const STACK_ANIMS = Platform.OS === 'android' ? STACK_ANIMS_ANDROID : STACK_ANIMS_IOS;

    const onDarkChange = () => {
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
            //         cx: 0,
            //         cy: 0,
            //     },
            // },
        });
        // dispatch(setTheme({ isDark: !isDark, mode: mode }));
    };

    const onThemeChange = (theme: ThemeOptions, py: number, px: number) => {
        switchTheme({
            switchThemeFunction: () => {
                dispatch(setTheme({ mode: theme, isDark: isDark }));
            },
            animationConfig: {
                // type: 'fade',
                // duration: 900,
                type: 'circular',
                duration: 900,
                startingPoint: {
                    cy: py,
                    cx: px,
                },
            },
        });
    };

    const onBtmTabLabelChange = () => {
        dispatch(setSettings({ entryType: 'btmTabLabels', value: !btmTabLabels }));
    };

    const onBtmTabShiftingChange = () => {
        dispatch(setSettings({ entryType: 'btmTabShifting', value: !btmTabShifting }));
    };

    const onAllowSensorMotionChange = () => {
        dispatch(setSettings({ entryType: 'allowSensorMotion', value: !allowSensorMotion }));
    };

    return (
        <>
            <ScrollView>
                <List.Section>
                    <ListSubheader title="Theme" />
                    <List.Item
                        title={'Dark Mode'}
                        onPress={onDarkChange}
                        right={(props) => (
                            <Switch
                                value={isDark}
                                {...props}
                                thumbColor={isDark ? colors.primary : undefined}
                                onValueChange={onDarkChange}
                            />
                        )}
                    />
                    <Accordion
                        title="Themes"
                        description={mode.replaceAll('_', ' ')}
                        descriptionStyle={{ textTransform: 'capitalize' }}
                        initialExpand={true}
                        titleFontSize={16}
                        // onPress={() => setExpandThemes((prev) => !prev)}
                    >
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {themeOptions.map((theme, index) => (
                                <View key={index} style={{ marginVertical: 10 }}>
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
                                                    availableThemes[isDark ? 'dark' : 'light'][
                                                        theme
                                                    ]
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
                    </Accordion>
                </List.Section>
                <List.Section>
                    <ListSubheader title="Media Card" />
                    <List.Item
                        title={'Layout'}
                        description={'Customize the look of media tiles'}
                        // onPress={() => setShowMTCustomizer(true)}
                    />
                </List.Section>
                <List.Section>
                    <ListSubheader title="Navigation" />
                    <List.Item
                        title={'Bottom Tab Labels'}
                        description={'Show labels on bottom tab bar'}
                        // onPress={() => {
                        //     dispatch(setTheme({ isDark: !isDark, mode: mode }));
                        // }}
                        right={(props) => (
                            <Switch
                                value={btmTabLabels}
                                {...props}
                                thumbColor={btmTabLabels ? colors.primary : undefined}
                                onValueChange={onBtmTabLabelChange}
                            />
                        )}
                    />
                </List.Section>
                <List.Section>
                    <ListSubheader title="Animations" />
                    <List.Item
                        title={'Bottom Tab Shifting'}
                        // onPress={() => {
                        //     dispatch(setTheme({ isDark: !isDark, mode: mode }));
                        // }}
                        description={'Enable labels to see the effect'}
                        right={(props) => (
                            <Switch
                                value={btmTabShifting}
                                {...props}
                                thumbColor={btmTabShifting ? colors.primary : undefined}
                                onValueChange={onBtmTabShiftingChange}
                            />
                        )}
                    />
                    <List.Item
                        title={'Sensor Motion (experimental)'}
                        // onPress={() => {
                        //     dispatch(setTheme({ isDark: !isDark, mode: mode }));
                        // }}
                        description={'Will probably drain your battery...'}
                        right={(props) => (
                            <Switch
                                value={allowSensorMotion}
                                {...props}
                                thumbColor={allowSensorMotion ? colors.primary : undefined}
                                onValueChange={onAllowSensorMotionChange}
                            />
                        )}
                    />
                    <Accordion
                        title={'Screen Transition'}
                        titleFontSize={16}
                        description={navAnimation.replaceAll('_', ' ')}
                        descriptionStyle={{ textTransform: 'capitalize' }}
                    >
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {STACK_ANIMS.map((anim, index) => (
                                <MotiButton
                                    key={index}
                                    mode="outlined"
                                    compact
                                    labelStyle={{ textTransform: 'capitalize' }}
                                    style={{ paddingHorizontal: 5, marginHorizontal: 5 }}
                                    onPress={() =>
                                        dispatch(
                                            setSettings({ entryType: 'navAnimation', value: anim }),
                                        )
                                    }
                                    buttonColor={anim === navAnimation ? colors.primary : undefined}
                                    textColor={anim === navAnimation ? colors.onPrimary : undefined}
                                >
                                    {anim.replaceAll('_', ' ')}
                                </MotiButton>
                            ))}
                        </ScrollView>
                    </Accordion>
                </List.Section>
            </ScrollView>
        </>
    );
};

export default AppearancePage;
