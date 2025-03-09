import { Accordion } from '@/components/animations';
import { MediaTileCustomizer } from '@/components/more/settings/appearance/dialogs';
import { ThemeSkeleton } from '@/components/more/settings/appearance/skeletons';
import { MaterialSwitchListItem } from '@/components/switch';
import { ListSubheader } from '@/components/titles';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { availableThemes, themeOptions, ThemeOptions, useAppTheme } from '@/store/theme/themes';
import { ThemeState, useThemeStore } from '@/store/theme/themeStore';
import React from 'react';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Platform, ScrollView, View } from 'react-native';
import { Chip, List, Portal, Text } from 'react-native-paper';
import { StackAnimationTypes } from 'react-native-screens';
import { useShallow } from 'zustand/react/shallow';

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
	const { mode, isDark, isAMOLED, setTheme } = useThemeStore(
		useShallow((state) => ({
			mode: state.mode,
			isDark: state.isDark,
			isAMOLED: state.isAMOLED,
			setTheme: state.setTheme,
		})),
	);
	const {
		btmTabLabels,
		btmTabShifting,
		navAnimation,
		interaction3D,
		autoRotation,
		allowSensorMotion,
		allowBgParticles,
		setSettings,
	} = useSettingsStore(
		useShallow((state) => ({
			btmTabLabels: state.btmTabLabels,
			btmTabShifting: state.btmTabShifting,
			navAnimation: state.navAnimation,
			interaction3D: state.interaction3D,
			autoRotation: state.autoRotation,
			allowSensorMotion: state.allowSensorMotion,
			allowBgParticles: state.allowBgParticles,
			setSettings: state.setSettings,
		})),
	);

	const { colors } = useAppTheme();

	const [showMTCustomizer, setShowMTCustomizer] = useState(false);

	const STACK_ANIMS = Platform.OS === 'android' ? STACK_ANIMS_ANDROID : STACK_ANIMS_IOS;

	const onThemeSwitch = (themeProps: ThemeState) => {
		setTheme(themeProps);
	};

	const onDarkChange = () => {
		onThemeSwitch({ isDark: !isDark } as ThemeState);
	};

	const onAmoledChange = () => {
		onThemeSwitch({ isAMOLED: !isAMOLED } as ThemeState);
	};

	const onThemeChange = (theme: ThemeOptions) => {
		onThemeSwitch({ mode: theme } as ThemeState);
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

	return (
		<>
			<ScrollView>
				<List.Section>
					<ListSubheader title="Theme" />
					<MaterialSwitchListItem
						title={'Dark Mode'}
						selected={!!isDark}
						onPress={onDarkChange}
						fluid
					/>
					<MaterialSwitchListItem
						title={'AMOLED Pure Black'}
						selected={!!isAMOLED}
						onPress={onAmoledChange}
						disabled={!isDark}
						fluid
					/>
					<Accordion
						title="Themes"
						description={mode?.replaceAll('_', ' ')}
						descriptionStyle={{ textTransform: 'capitalize' }}
						// initialExpand={true}
						// onPress={() => setExpandThemes((prev) => !prev)}
					>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							fadingEdgeLength={6}
						>
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
						selected={!!btmTabLabels}
						fluid
					/>
				</List.Section>
				<List.Section>
					<ListSubheader title="Animations" />
					<MaterialSwitchListItem
						title={'Bottom Tab Shifting'}
						description={'Enable labels to see the effect'}
						onPress={onBtmTabShiftingChange}
						selected={!!btmTabShifting}
						fluid
					/>
					<MaterialSwitchListItem
						title={'Background Particles'}
						description={'Goraku particles float in the background!'}
						onPress={() => setSettings({ allowBgParticles: !allowBgParticles })}
						selected={!!allowBgParticles}
						fluid
					/>
					<Accordion
						title={'Screen Transition'}
						description={navAnimation?.replaceAll('_', ' ')}
						descriptionStyle={{ textTransform: 'capitalize' }}
					>
						<View
							style={{
								paddingHorizontal: 5,
								flexDirection: 'row',
								flexWrap: 'wrap',
								gap: 6,
								alignItems: 'center',
							}}
						>
							{STACK_ANIMS.map((anim, index) => (
								<Chip
									key={index}
									selected={anim === navAnimation}
									compact
									mode="outlined"
									textStyle={{ textTransform: 'capitalize' }}
									onPress={() => setSettings({ navAnimation: anim })}
								>
									{anim.replaceAll('_', ' ')}
								</Chip>
								// <Button
								// 	key={index}
								// 	mode="outlined"
								// 	compact
								// 	labelStyle={{ textTransform: 'capitalize' }}
								// 	style={{ paddingHorizontal: 5, marginHorizontal: 5 }}
								// 	onPress={() => setSettings({ navAnimation: anim })}
								// 	buttonColor={anim === navAnimation ? colors.primary : undefined}
								// 	textColor={anim === navAnimation ? colors.onPrimary : undefined}
								// >
								// 	{anim.replaceAll('_', ' ')}
								// </Button>
							))}
						</View>
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
						selected={!!interaction3D}
						fluid
					/>
					<MaterialSwitchListItem
						title={'Auto Rotation'}
						description={'3D Interactions must be enabled for this to take effect.'}
						onPress={onAutoRotationChange}
						selected={interaction3D ? !!autoRotation : false}
						disabled={!interaction3D}
						fluid
					/>
					<MaterialSwitchListItem
						title={'Sensor Motion'}
						description={
							'Enables a parallax motion effect for the media banner image using the device rotation'
						}
						onPress={onAllowSensorMotionChange}
						selected={!!allowSensorMotion}
						fluid
					/>
				</List.Section>
			</ScrollView>
			<Portal>
				<MediaTileCustomizer
					themeMode={mode as ThemeOptions}
					visible={showMTCustomizer}
					onDismiss={() => setShowMTCustomizer(false)}
				/>
			</Portal>
		</>
	);
};

export default AppearancePage;
