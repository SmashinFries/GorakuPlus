import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Switch, Text, useTheme } from 'react-native-paper';
import { Platform, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MoreStackProps } from '../../../../navigation/types';
import { ThemeOptions, availableThemes } from '../../../../theme/theme';
import { RootState } from '../../../../app/store';
import { setTheme } from '../../../../theme/themeSlice';
import { setSettings } from '../settingsSlice';
import { ThemeSkeleton } from './components/skeletons';
import { MotiPressable } from 'moti/interactions';
import { StackAnimationTypes } from 'react-native-screens';
import { MotiButton } from '../../../../components/moti';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import { useWindowDimensions } from 'react-native';
import { ListSubheader } from '../../../../components/titles';
import { ScoreColorDialog } from './components/dialogs';

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

const AppearanceScreen = ({}: NativeStackScreenProps<MoreStackProps, 'settings'>) => {
    const THEME_SELECTION: ThemeOptions[] = ['default', 'kawaii', 'punpun', 'sonozaki_mion'];
    const { mode, isDark } = useSelector((state: RootState) => state.persistedTheme);
    const { btmTabLabels, navAnimation, scoreColors } = useSelector(
        (state: RootState) => state.persistedSettings,
    );
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const { width, height } = useWindowDimensions();

    const [showScoreColorDialog, setShowScoreColorDialog] = React.useState(false);

    const STACK_ANIMS = Platform.OS === 'android' ? STACK_ANIMS_ANDROID : STACK_ANIMS_IOS;

    const onDarkChange = () => {
        dispatch(setTheme({ isDark: !isDark, mode: mode }));
    };

    const onBtmTabLabelChange = () => {
        dispatch(setSettings({ btmTabLabels: !btmTabLabels }));
    };

    return (
        <>
            <ScrollView>
                <List.Section>
                    <ListSubheader title="Theme" />
                    <List.Item
                        title={'Dark Mode'}
                        onPress={() => {
                            dispatch(setTheme({ isDark: !isDark, mode: mode }));
                        }}
                        right={(props) => (
                            <Switch
                                value={isDark}
                                {...props}
                                thumbColor={isDark ? colors.primary : undefined}
                                onValueChange={onDarkChange}
                            />
                        )}
                    />
                    <List.Accordion
                        title="Themes"
                        description={mode.replaceAll('_', ' ')}
                        descriptionStyle={{ textTransform: 'capitalize' }}
                        rippleColor={'transparent'}
                    >
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row' }}>
                                {THEME_SELECTION.map((theme, index) => (
                                    <MotiPressable
                                        key={index}
                                        animate={({ hovered, pressed }) => {
                                            'worklet';

                                            return {
                                                scale: pressed ? 0.8 : 1,
                                            };
                                        }}
                                        style={{
                                            borderWidth: mode === theme ? 1 : 0,
                                            borderColor:
                                                mode === theme ? colors.primary : undefined,
                                            borderRadius: 12,
                                            marginHorizontal: 10,
                                            marginVertical: 10,
                                            alignItems: 'center',
                                            paddingHorizontal: 15,
                                            paddingVertical: 10,
                                        }}
                                        onPress={() =>
                                            dispatch(setTheme({ mode: theme, isDark: isDark }))
                                        }
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
                                    </MotiPressable>
                                ))}
                            </View>
                        </ScrollView>
                    </List.Accordion>
                </List.Section>
                <List.Section>
                    <ListSubheader title="UI" />
                    <List.Item
                        title={'Bottom tab labels'}
                        onPress={() => {
                            dispatch(setTheme({ isDark: !isDark, mode: mode }));
                        }}
                        right={(props) => (
                            <Switch
                                value={btmTabLabels}
                                {...props}
                                thumbColor={btmTabLabels ? colors.primary : undefined}
                                onValueChange={onBtmTabLabelChange}
                            />
                        )}
                    />
                    <List.Item
                        title={'Score Colors'}
                        onPress={() => setShowScoreColorDialog(true)}
                    />
                </List.Section>
                <List.Section>
                    <ListSubheader title="Animations" />
                    <List.Accordion
                        title={'Navigation between screens'}
                        description={navAnimation.replaceAll('_', ' ')}
                        descriptionStyle={{ textTransform: 'capitalize' }}
                        rippleColor={'transparent'}
                    >
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {STACK_ANIMS.map((anim, index) => (
                                <MotiButton
                                    key={index}
                                    mode="outlined"
                                    compact
                                    labelStyle={{ textTransform: 'capitalize' }}
                                    style={{ paddingHorizontal: 5, marginHorizontal: 5 }}
                                    onPress={() => dispatch(setSettings({ navAnimation: anim }))}
                                    buttonColor={anim === navAnimation ? colors.primary : undefined}
                                    textColor={anim === navAnimation ? colors.onPrimary : undefined}
                                >
                                    {anim.replaceAll('_', ' ')}
                                </MotiButton>
                            ))}
                        </ScrollView>
                    </List.Accordion>
                </List.Section>
            </ScrollView>
            <ScoreColorDialog
                visible={showScoreColorDialog}
                onDismiss={() => setShowScoreColorDialog(false)}
                red={scoreColors.red}
                yellow={scoreColors.yellow}
                updateScoreColor={(red: number, yellow: number) =>
                    dispatch(setSettings({ scoreColors: { red: red, yellow: yellow } }))
                }
            />
        </>
    );
};

export default AppearanceScreen;
