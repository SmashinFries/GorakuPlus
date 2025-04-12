import { Accordion } from '@/components/animations';
import { MediaTileCustomizer } from '@/components/more/settings/appearance/dialogs';
import {
	ThemeCustomSkeleton,
	ThemeSkeleton,
} from '@/components/more/settings/appearance/skeletons';
import { MaterialSwitchListItem } from '@/components/switch';
import { ListSubheader } from '@/components/titles';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { availableThemes, themeOptions, ThemeOptions, useAppTheme } from '@/store/theme/themes';
import { useThemeStore } from '@/store/theme/themeStore';
import { router } from 'expo-router';
import React from 'react';
import { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
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
	const { mode, isDark, isAMOLED, setThemeAMOLED, setThemeDark, setThemeMode } = useThemeStore();
	const {
		btmTabLabels,
		btmTabHaptics,
		navAnimation,
		interaction3D,
		autoRotation,
		allowSensorMotion,
		allowBgParticles,
		btmTabShifting,
		setSettings,
		toggle,
	} = useSettingsStore(
		useShallow((state) => ({
			btmTabLabels: state.btmTabLabels,
			btmTabShifting: state.btmTabShifting,
			btmTabHaptics: state.btmTabHaptics,
			navAnimation: state.navAnimation,
			interaction3D: state.interaction3D,
			autoRotation: state.autoRotation,
			allowSensorMotion: state.allowSensorMotion,
			allowBgParticles: state.allowBgParticles,
			setSettings: state.setSettings,
			toggle: state.toggle,
		})),
	);

	const { colors } = useAppTheme();

	const [showMTCustomizer, setShowMTCustomizer] = useState(false);

	const STACK_ANIMS = Platform.OS === 'android' ? STACK_ANIMS_ANDROID : STACK_ANIMS_IOS;

	return (
		<>
			<ScrollView>
				<List.Section>
					<ListSubheader title="Theme" />
					<MaterialSwitchListItem
						title={'Dark Mode'}
						selected={!!isDark}
						onPress={() => setThemeDark(!isDark)}
						fluid
					/>
					<MaterialSwitchListItem
						title={'AMOLED Pure Black'}
						selected={!!isAMOLED}
						onPress={() => setThemeAMOLED(!isAMOLED)}
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
						<FlatList
							data={themeOptions}
							fadingEdgeLength={6}
							showsHorizontalScrollIndicator={false}
							keyExtractor={(item, idx) => idx.toString()}
							horizontal
							renderItem={({ item }) =>
								item !== 'custom' ? (
									<View style={{ marginVertical: 10 }}>
										<Pressable
											style={{
												marginHorizontal: 10,
												borderRadius: 12,
												overflow: 'hidden',
											}}
											onPress={() => {
												setThemeMode(item);
											}}
											android_ripple={{
												foreground: true,
												color: colors.primary,
											}}
										>
											<View
												style={{
													borderWidth: 1,
													borderColor:
														mode === item
															? colors.primary
															: 'transparent',
													borderRadius: 12,
													alignItems: 'center',
													paddingHorizontal: 15,
													paddingVertical: 10,
												}}
											>
												<ThemeSkeleton
													colors={
														availableThemes[isDark ? 'dark' : 'light'][
															item
														].colors
													}
													active={mode === item}
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
													{item.replaceAll('_', ' ')}
												</Text>
											</View>
										</Pressable>
									</View>
								) : (
									<View style={{ marginVertical: 10 }}>
										<Pressable
											style={{
												marginHorizontal: 10,
												borderRadius: 12,
												overflow: 'hidden',
											}}
											onPress={() =>
												router.navigate('/(dialogs)/customThemeDialog')
											}
											android_ripple={{
												foreground: true,
												color: colors.primary,
											}}
										>
											<ThemeCustomSkeleton
												colors={colors}
												active={mode === item}
											/>
											<Text
												style={{
													paddingHorizontal: 10,
													textTransform: 'capitalize',
													alignSelf: 'center',
												}}
												numberOfLines={2}
											>
												{item.replaceAll('_', ' ')}
											</Text>
										</Pressable>
									</View>
								)
							}
						/>
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
					<ListSubheader title="Bottom Tabs" />
					<MaterialSwitchListItem
						title={'Bottom Tab Labels'}
						description={'Show labels on bottom tab bar'}
						onPress={() => toggle('btmTabLabels')}
						selected={!!btmTabLabels}
						fluid
					/>
					<MaterialSwitchListItem
						title={'Bottom Tab Shifting'}
						description={'Only show label of active tab'}
						onPress={() => toggle('btmTabShifting')}
						selected={!!btmTabShifting}
						fluid
					/>
					<MaterialSwitchListItem
						title={'Bottom Tab Haptics'}
						description="Haptic feedback on press"
						onPress={() => toggle('btmTabHaptics')}
						selected={!!btmTabHaptics}
						fluid
					/>
				</List.Section>
				<List.Section>
					<ListSubheader title="Animations" />

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
						onPress={() => toggle('interaction3D')}
						selected={!!interaction3D}
						fluid
					/>
					<MaterialSwitchListItem
						title={'Auto Rotation'}
						description={'3D Interactions must be enabled for this to take effect.'}
						onPress={() => toggle('autoRotation')}
						selected={interaction3D ? !!autoRotation : false}
						disabled={!interaction3D}
						fluid
					/>
					<MaterialSwitchListItem
						title={'Sensor Motion'}
						description={
							'Enables a parallax motion effect for the media banner image using the device rotation'
						}
						onPress={() => toggle('allowSensorMotion')}
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
