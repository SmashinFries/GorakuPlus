import { router, Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Divider, IconButton, List, Text, TextInput } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { useTextInputKeyboardUnfocus } from '@/hooks/useTextInputKeyboardUnfocus';
import { DialogHeader } from '@/components/headers/dialog';
import { useThemeStore } from '@/store/theme/themeStore';
import { selectImage } from '@/utils/images';
import { getImageThemeColor } from '@/utils';
import { createMaterial3Theme, Material3Theme } from '@pchmn/expo-material3-theme';
import Color from 'color';
import { ImageColorsResult } from 'react-native-image-colors';
import { AndroidImageColors } from 'react-native-image-colors/build/types';

const getIsColor = (text?: string) => {
	if (text) {
		const rgbRegex = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*(\d+(?:\.\d+)?))?\)$/;
		const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
		return rgbRegex.test(text) || hexRegex.test(text);
	}
	return false;
};

const CustomThemeDialog = () => {
	const { customColor, isDark, mode, setThemeMode } = useThemeStore();

	const [tempColor, setTempColor] = useState<string | null>(customColor);
	const [tempPallete, setTempPallete] = useState<ImageColorsResult>();
	const [tempTheme, setTempTheme] = useState<Material3Theme | null>(
		mode === 'custom' && customColor ? createMaterial3Theme(customColor) : null,
	);
	const [tempUrl, setTempUrl] = useState<string>('');

	const componentTheme = useMemo(
		() => (tempTheme ? { colors: tempTheme?.[isDark ? 'dark' : 'light'] } : undefined),
		[tempTheme],
	);

	const getColorTheme = async (type: 'camera' | 'galley' | 'url', url?: string) => {
		let newPallete: ImageColorsResult | null = null;
		switch (type) {
			case 'camera':
			case 'galley':
				const asset = await selectImage(type === 'camera', true);
				if (asset && typeof asset !== 'string' && asset.base64) {
					newPallete = await getImageThemeColor(asset.base64, true);
				}
				break;
			case 'url':
				if (!url || url?.length < 1) return;
				if (getIsColor(url)) {
					const convertedColor = Color(url);
					setTempColor(convertedColor.hex());
					setTempTheme(createMaterial3Theme(convertedColor.hex()));
				} else {
					newPallete = await getImageThemeColor(url);
				}
				break;
			default:
				break;
		}
		if (newPallete) {
			setTempPallete(newPallete);
			switch (newPallete.platform) {
				case 'android':
					setTempColor(newPallete.dominant);
					setTempTheme(createMaterial3Theme(newPallete.dominant));
					break;
				default:
					break;
			}
		}
	};

	const onPaste = async () => {
		const text = await Clipboard.getStringAsync();
		await getColorTheme('url', text);
	};

	const onSave = async () => {
		if (tempColor) {
			setThemeMode('custom', tempColor);
			router.back();
		}
	};

	useTextInputKeyboardUnfocus();

	return (
		<ScrollView contentContainerStyle={{ paddingHorizontal: 12 }}>
			<Stack.Screen
				options={{
					header(props) {
						return (
							<DialogHeader
								{...props}
								actions={[{ label: 'Save', onPress: onSave }]}
							/>
						);
					},
				}}
			/>
			<View style={{ gap: 12 }}>
				<TextInput
					theme={componentTheme}
					label={'Image URL / color code'}
					value={tempUrl}
					mode="outlined"
					onChangeText={(txt) => setTempUrl(txt)}
					onSubmitEditing={({ nativeEvent: { text } }) => getColorTheme('url', text)}
					left={
						getIsColor(tempUrl) && (
							<TextInput.Icon icon={'square-rounded'} color={tempUrl} />
						)
					}
					right={
						<TextInput.Icon
							theme={componentTheme}
							icon={tempUrl.length > 0 ? 'close' : 'content-paste'}
							onPress={() => (tempUrl.length > 0 ? setTempUrl('') : onPaste())}
						/>
					}
				/>
				<Text theme={componentTheme} variant="labelSmall">
					* Only hex and rgb(a) supported
				</Text>
				<Text
					theme={
						tempTheme ? { colors: tempTheme?.[isDark ? 'dark' : 'light'] } : undefined
					}
					style={{ textAlign: 'center', paddingVertical: 12 }}
				>
					- Or -
				</Text>
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'space-evenly',
						flexDirection: 'row',
					}}
				>
					<Pressable
						onPress={() => getColorTheme('camera')}
						style={{ alignItems: 'center', justifyContent: 'center' }}
					>
						<IconButton
							icon="camera"
							theme={
								tempTheme
									? { colors: tempTheme?.[isDark ? 'dark' : 'light'] }
									: undefined
							}
						/>
						<Text
							theme={
								tempTheme
									? { colors: tempTheme?.[isDark ? 'dark' : 'light'] }
									: undefined
							}
							style={{ textAlign: 'center' }}
						>
							Take a photo
						</Text>
					</Pressable>
					<Pressable
						onPress={() => getColorTheme('galley')}
						style={{ alignItems: 'center', justifyContent: 'center' }}
					>
						<IconButton
							theme={
								tempTheme
									? { colors: tempTheme?.[isDark ? 'dark' : 'light'] }
									: undefined
							}
							icon="image-outline"
						/>
						<Text
							theme={
								tempTheme
									? { colors: tempTheme?.[isDark ? 'dark' : 'light'] }
									: undefined
							}
							style={{ textAlign: 'center' }}
						>
							Upload Image
						</Text>
					</Pressable>
				</View>
				<Divider
					theme={
						tempTheme ? { colors: tempTheme?.[isDark ? 'dark' : 'light'] } : undefined
					}
				/>
				{tempTheme && (
					<View
						style={{
							flex: 1,
							marginHorizontal: 12,
							borderRadius: 12,
							height: 28,
							justifyContent: 'center',
							backgroundColor:
								tempTheme?.[isDark ? 'dark' : 'light']?.primary ?? 'transparent',
						}}
					>
						<Text
							style={{
								textAlign: 'center',
								color: tempTheme?.[isDark ? 'dark' : 'light']?.onPrimary,
								fontWeight: 'bold',
							}}
						>
							Primary Color
						</Text>
					</View>
				)}
			</View>
			<List.Section title={'Color Pallete (Image)'}>
				{tempPallete ? (
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 18,
						}}
					>
						{tempPallete?.platform === 'android'
							? Object.keys(tempPallete).map((colorType, idx) =>
									tempPallete[colorType as keyof AndroidImageColors] &&
									colorType !== 'platform' ? (
										<Pressable
											key={idx}
											onPress={() => {
												setTempColor(
													tempPallete[
														colorType as keyof AndroidImageColors
													],
												);
												setTempTheme(
													createMaterial3Theme(
														tempPallete[
															colorType as keyof AndroidImageColors
														],
													),
												);
											}}
											style={{
												alignItems: 'center',
												borderColor:
													tempColor ===
														tempPallete[
															colorType as keyof AndroidImageColors
														] && tempColor
														? tempColor
														: undefined,
												borderRadius: 8,
												borderWidth: 1,
												padding: 12,
											}}
										>
											<View
												style={{
													width: 28,
													height: 28,
													borderRadius: 8,
													backgroundColor:
														tempPallete[
															colorType as keyof AndroidImageColors
														],
												}}
											/>
											<Text
												numberOfLines={2}
												style={{ textTransform: 'capitalize' }}
											>
												{colorType}
											</Text>
										</Pressable>
									) : null,
								)
							: null}
					</View>
				) : (
					<Text style={{ textAlign: 'center', padding: 24 }}>
						No colors available yet!
					</Text>
				)}
			</List.Section>
		</ScrollView>
		// <Dialog visible={true} onDismiss={() => router.back()}>
		// 	<Dialog.Title>Custom Theme</Dialog.Title>
		// 	<Dialog.Content>
		// 		<View>
		// 			<Searchbar
		// 				value={tempUrl}
		// 				mode="bar"
		// 				elevation={1}
		// 				onChangeText={(txt) => setTempUrl(txt)}
		// 				onSubmitEditing={({ nativeEvent: { text } }) => getColorTheme('url', text)}
		// 				right={(props) => <TextInput.Icon {...props} icon={'content-paste'} />}
		// 			/>
		// 			<Text style={{ textAlign: 'center', paddingVertical: 12 }}>- Or -</Text>
		// 			<View
		// 				style={{
		// 					alignItems: 'center',
		// 					justifyContent: 'space-evenly',
		// 					flexDirection: 'row',
		// 				}}
		// 			>
		// 				<Pressable
		// 					onPress={() => getColorTheme('camera')}
		// 					style={{ alignItems: 'center', justifyContent: 'center' }}
		// 				>
		// 					<IconButton icon="camera" />
		// 					<Text style={{ textAlign: 'center' }}>Take a photo</Text>
		// 				</Pressable>
		// 				<Pressable
		// 					onPress={() => getColorTheme('galley')}
		// 					style={{ alignItems: 'center', justifyContent: 'center' }}
		// 				>
		// 					<IconButton icon="image-outline" />
		// 					<Text style={{ textAlign: 'center' }}>Upload Image</Text>
		// 				</Pressable>
		// 			</View>
		// 		</View>
		// 	</Dialog.Content>
		// 	<Dialog.Actions>
		// 		<Button onPress={router.back}>Cancel</Button>
		// 		<Button onPress={onSave}>Save</Button>
		// 	</Dialog.Actions>
		// </Dialog>
	);
};

export default CustomThemeDialog;
