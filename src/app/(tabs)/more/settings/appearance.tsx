import { Accordion } from '@/components/animations';
import { MediaTileCustomizer } from '@/components/more/settings/appearance/dialogs';
import { ThemeSkeleton } from '@/components/more/settings/appearance/skeletons';
import { MotiButton } from '@/components/moti';
import { MaterialSwitchListItem } from '@/components/switch';
import { ListSubheader } from '@/components/titles';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { ScoreVisualType } from '@/store/settings/types';
import { availableThemes, themeOptions, ThemeOptions, useAppTheme } from '@/store/theme/themes';
import { useThemeStore } from '@/store/theme/themeStore';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Platform, ScrollView, View } from 'react-native';
import { List, Portal, Switch, Text, useTheme } from 'react-native-paper';
import { StackAnimationTypes } from 'react-native-screens';

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
	const { mode, isDark, setTheme } = useThemeStore();
	const {
		btmTabLabels,
		btmTabShifting,
		navAnimation,
		interaction3D,
		autoRotation,
		allowSensorMotion,
		scoreVisualType,
		showItemListStatus,
		mediaLanguage,
		scoreColors,
		setSettings,
	} = useSettingsStore();

	const { colors } = useAppTheme();

	const [showMTCustomizer, setShowMTCustomizer] = useState(false);

	const STACK_ANIMS = Platform.OS === 'android' ? STACK_ANIMS_ANDROID : STACK_ANIMS_IOS;

	const onDarkChange = () => {
		setTheme({ isDark: !isDark });
	};

	const onThemeChange = (theme: ThemeOptions) => {
		setTheme({ mode: theme });
	};

	const onBtmTabLabelChange = () => {
		setSettings({ btmTabLabels: !btmTabLabels });
	};

	const onBtmTabShiftingChange = () => {
		setSettings({ btmTabShifting: !btmTabShifting });
	};

	const onEnableInteraction3DChange = () => {
		setSettings({ interaction3D: !interaction3D });
	};

	const onAutoRotationChange = () => {
		setSettings({ autoRotation: !autoRotation });
	};

	const onAllowSensorMotionChange = () => {
		setSettings({ allowSensorMotion: !allowSensorMotion });
	};

	const onMediaCardChange = (scoreVisualType: ScoreVisualType, showItemListStatus: boolean) => {
		setSettings({ scoreVisualType, showItemListStatus });
	};

	return (
		<>
			<ScrollView>
				<List.Section>
					<ListSubheader title="Theme" />
					<MaterialSwitchListItem
						title={'Dark Mode'}
						selected={isDark}
						onPress={onDarkChange}
						fluid
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
										onPress={() => onThemeChange(theme)}
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
						onPress={() => setShowMTCustomizer(true)}
					/>
				</List.Section>
				<List.Section>
					<ListSubheader title="Navigation" />
					<MaterialSwitchListItem
						title={'Bottom Tab Labels'}
						description={'Show labels on bottom tab bar'}
						onPress={onBtmTabLabelChange}
						selected={btmTabLabels}
						fluid
					/>
				</List.Section>
				<List.Section>
					<ListSubheader title="Animations" />
					<MaterialSwitchListItem
						title={'Bottom Tab Shifting'}
						description={'Enable labels to see the effect'}
						onPress={onBtmTabShiftingChange}
						selected={btmTabShifting}
						fluid
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
									onPress={() => setSettings({ navAnimation: anim })}
									buttonColor={anim === navAnimation ? colors.primary : undefined}
									textColor={anim === navAnimation ? colors.onPrimary : undefined}
								>
									{anim.replaceAll('_', ' ')}
								</MotiButton>
							))}
						</ScrollView>
					</Accordion>
				</List.Section>
				<List.Section>
					<ListSubheader title="3D Effects (experimental)" />
					<MaterialSwitchListItem
						title={'3D Interactions'}
						description={
							'Allows 3D interaction for certain things. Pointless but cool.'
						}
						onPress={onEnableInteraction3DChange}
						selected={interaction3D}
						fluid
					/>
					<MaterialSwitchListItem
						title={'Auto Rotation'}
						description={'3D Interactions must be enabled for this to take effect.'}
						onPress={onAutoRotationChange}
						selected={autoRotation}
						fluid
					/>
					<MaterialSwitchListItem
						title={'Sensor Motion'}
						description={
							'Enables a parallax motion effect for the media banner image using the device rotation'
						}
						onPress={onAllowSensorMotionChange}
						selected={allowSensorMotion}
						fluid
					/>
				</List.Section>
			</ScrollView>
			<Portal>
				<MediaTileCustomizer
					themeMode={mode}
					visible={showMTCustomizer}
					scoreVisualType={scoreVisualType}
					showItemListStatus={showItemListStatus}
					onSettingChange={onMediaCardChange}
					mediaLanguage={mediaLanguage}
					scoreColors={scoreColors}
					onDismiss={() => setShowMTCustomizer(false)}
				/>
			</Portal>
		</>
	);
};

export default AppearancePage;
