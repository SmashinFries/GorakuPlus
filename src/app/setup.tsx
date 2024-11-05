import { useTagCollectionQuery } from '@/api/anilist/__genereated__/gql';
import { useAnilistAuth } from '@/api/anilist/useAnilistAuth';
import { MediaCard } from '@/components/cards';
import { ThemeSkeleton } from '@/components/more/settings/appearance/skeletons';
import { SetupNavBar } from '@/components/setup/nav';
import { AnilistIcon } from '@/components/svgs';
import { MaterialSwitchListItem } from '@/components/switch';
import dummyData from '@/constants/dummyData';
import { useAuthStore } from '@/store/authStore';
import { ListStatusMode, useCardVisualStore } from '@/store/cardVisualStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { ScoreVisualTypeEnum } from '@/store/settings/types';
import { availableThemes, ThemeOptions, themeOptions, useAppTheme } from '@/store/theme/themes';
import { useThemeStore } from '@/store/theme/themeStore';
import { ExploreTabsProps } from '@/types/navigation';
import { rgbToRgba } from '@/utils';
import { openWebBrowser } from '@/utils/webBrowser';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowDimensions, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import DraggableFlatList, {
	RenderItemParams,
	ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import {
	Avatar,
	Button,
	Checkbox,
	Chip,
	Divider,
	IconButton,
	List,
	Searchbar,
	Text,
} from 'react-native-paper';
import Animated, { AnimatedStyle, FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShallow } from 'zustand/react/shallow';

const SETUP_PAGES = 7;

maybeCompleteAuthSession();

type Page = {
	page: number;
	pageAnim: 'next' | 'prev';
};

type BodyProps = {
	children?: React.ReactNode;
	pageAnim?: Page['pageAnim'];
	style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
};
const Body = ({ children, style }: BodyProps) => {
	return (
		<Animated.View style={[{ flex: 1, alignItems: 'center' }, style]} collapsable={false}>
			{children}
		</Animated.View>
	);
};

type TitleTextProps = {
	title: string;
	description?: string;
	containerStyle?: StyleProp<ViewStyle>;
	showLogo?: boolean;
	isAnim?: boolean;
};
const TitleText = ({ title, description, containerStyle, showLogo, isAnim }: TitleTextProps) => {
	const { top } = useSafeAreaInsets();
	const { dark } = useAppTheme();
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
			{showLogo && (
				<Image
					source={require('../../assets/iconsv3/banner.png')}
					style={{ width: '90%', aspectRatio: 1592 / 571 }}
					contentFit="contain"
				/>
			)}
			<BlurView
				tint={dark ? 'systemMaterialDark' : 'systemMaterialLight'}
				intensity={isAnim ? 60 : 0}
				style={{
					alignItems: 'center',
					borderRadius: 12,
					overflow: 'hidden',
					paddingVertical: 10,
				}}
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
			</BlurView>
		</View>
	);
};

const IntroPage = () => {
	const { showNSFW, setSettings } = useSettingsStore(
		useShallow((state) => ({
			showNSFW: state.showNSFW,
			setSettings: state.setSettings,
		})),
	);
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			{/* <Image source={require('../../assets/iconsv2/icon-trans.png')} style={{width:'70%', aspectRatio:1/1}} /> */}
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<TitleText
					title={'Welcome to Goraku!'}
					description="Take a moment to setup the app for an optimal experience."
					containerStyle={{ flex: 0, justifyContent: 'center', paddingTop: 0 }}
					showLogo
				/>
			</View>
			<Divider />
			<View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30 }}>
				<Text style={{ alignSelf: 'flex-start', paddingLeft: 15, width: '100%' }}>
					Before continuing, allow adult content?
				</Text>
				<MaterialSwitchListItem
					title="NSFW"
					selected={showNSFW}
					onPress={() => setSettings({ showNSFW: !showNSFW })}
				/>
			</View>
		</View>
	);
};

const ThemeSetup = () => {
	const { colors } = useAppTheme();
	const { isDark, mode, setTheme } = useThemeStore(
		useShallow((state) => ({
			mode: state.mode,
			isDark: state.isDark,
			setTheme: state.setTheme,
		})),
	);

	const [tempConfig, _setTempConfig] = useState({ isDark, mode });

	const onDarkToggle = (toggle: boolean) => {
		setTheme({ isDark: toggle });
		// setTempConfig((prev) => ({ ...prev, isDark: toggle }));
	};
	const onModeChange = (theme: ThemeOptions) => {
		setTheme({ mode: theme });
		// setTempConfig((prev) => ({ ...prev, mode: theme }));
	};

	useEffect(() => {
		// setTheme({ mode: tempConfig.mode, isDark: tempConfig.isDark });
	}, [tempConfig]);

	return (
		<Body>
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
						onPress={() => onDarkToggle(false)}
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							paddingHorizontal: 20,
						}}
					>
						<IconButton icon={'weather-sunny'} selected={!isDark} />
						<Text variant="labelLarge">Light Mode</Text>
					</Pressable>
					<Pressable
						onPress={() => onDarkToggle(true)}
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							paddingHorizontal: 20,
						}}
					>
						<IconButton icon={'weather-night'} selected={isDark} />
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
							<View key={idx}>
								<Pressable
									style={{
										marginHorizontal: 10,
										borderRadius: 12,
									}}
									onPress={() => onModeChange(theme)}
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

const AnilistSetup = () => {
	const { promptAsync } = useAnilistAuth();
	const {
		anilist: { token, avatar, username },
	} = useAuthStore();
	const { dark } = useAppTheme();

	return (
		<Body style={{ justifyContent: 'center' }}>
			<AnilistIcon isDark={dark} height={100} width={100} />
			<TitleText
				title={'Connect to Anilist'}
				description="Connect your Anilist acount for the full experience."
				containerStyle={{ flex: 0, justifyContent: 'center', paddingBottom: 20 }}
			/>
			<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
				{!token && (
					<Button
						mode="contained"
						onPress={() => openWebBrowser('https://anilist.co/signup')}
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
					<Button
						mode="elevated"
						onPress={async () => await promptAsync()}
						// onPress={() => openWebBrowser('gorakuplus://auth', true)}
					>
						{'Login'}
					</Button>
				)}
			</View>
		</Body>
	);
};

const CardSetup = () => {
	const setSettings = useSettingsStore(useShallow((state) => state.setSettings));
	const mediaLanguage = useSettingsStore(useShallow((state) => state.mediaLanguage));
	const { listStatusMode, scoreVisualType, setCardVisual } = useCardVisualStore(
		useShallow((state) => ({
			listStatusMode: state.listStatusMode,
			scoreVisualType: state.scoreVisualType,
			setCardVisual: state.setCardVisual,
		})),
	);
	const mode = useThemeStore(useShallow((state) => state.mode));
	const { colors } = useAppTheme();
	const { width } = useWindowDimensions();

	// const [tempMediaLanguage, setTempMediaLanguage] = useState(mediaLanguage);
	// const [tempCardVisual, setTempCardVisual] = useState({
	// 	defaultScore,
	// 	listStatusMode,
	// 	scoreVisualType,
	// });

	const onTempMediaLangChange = (lang: 'english' | 'romaji' | 'native') => {
		// setTempMediaLanguage(lang);
		setSettings({ mediaLanguage: lang });
	};

	// useEffect(() => {
	// 	setSettings({ scoreVisualType: tempConfig.scoreVisType, mediaLanguage: tempConfig.lang });
	// }, [tempConfig]);

	return (
		<Body>
			<TitleText
				title={'Card Customization'}
				description={'Customize the look of media cards that are shown throughout the app.'}
				containerStyle={{ paddingTop: 20 }}
			/>
			<ScrollView style={{ flex: 1 }}>
				<View style={{ justifyContent: 'center', paddingVertical: 30 }}>
					<View style={{ width: '45%', alignSelf: 'center' }}>
						<MediaCard
							{...dummyData[mode]}
							containerStyle={{ alignItems: 'center' }}
							// fitToParent
							width={width / 2.5}
						/>
						{/* <View>
						<MediaProgressBar
							progress={
								(dummyData[mode].episodes ??
									dummyData[mode].mediaListEntry.progress) / 2
							}
							total={dummyData[mode].episodes ?? dummyData[mode].chapters}
							mediaStatus={dummyData[mode].status}
							mediaListEntry={dummyData[mode].mediaListEntry}
							showListStatus={true}
						/>
					</View> */}
					</View>

					<List.Subheader>Score Design</List.Subheader>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: 10 }}
					>
						{Object.keys(ScoreVisualTypeEnum).map((visual, idx) => (
							<Chip
								key={idx}
								mode="outlined"
								selected={scoreVisualType === ScoreVisualTypeEnum[visual]}
								onPress={() =>
									setCardVisual({ scoreVisualType: ScoreVisualTypeEnum[visual] })
								}
								textStyle={{
									color:
										scoreVisualType === ScoreVisualTypeEnum[visual]
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
					{/* <List.Subheader>List Status Design</List.Subheader>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: 10 }}
					>
						{(['dot', 'bar'] as ListStatusMode[]).map(
							(statusMode: ListStatusMode, idx) => (
								<Chip
									key={idx}
									mode="outlined"
									selected={listStatusMode === statusMode}
									onPress={() => setCardVisual({ listStatusMode: statusMode })}
									textStyle={{
										textTransform: 'capitalize',
										color:
											listStatusMode === statusMode
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
									{statusMode}
								</Chip>
							),
						)}
					</ScrollView> */}
					<List.Subheader>Title Language</List.Subheader>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: 10 }}
					>
						{['english', 'romaji', 'native'].map((lang, idx) => (
							<Chip
								key={idx}
								mode="outlined"
								selected={mediaLanguage === lang}
								onPress={() =>
									onTempMediaLangChange(lang as 'english' | 'romaji' | 'native')
								}
								style={{ marginHorizontal: 5, justifyContent: 'center' }}
								textStyle={{
									textTransform: 'capitalize',
									color:
										mediaLanguage === lang
											? colors.primary
											: colors.onBackground,
								}}
								selectedColor={colors.primary}
							>
								{lang}
							</Chip>
						))}
					</ScrollView>
				</View>
			</ScrollView>
		</Body>
	);
};

// NOT BOYS LOVE! ITS BLACKLIST LOL
export const TagBLSetup = () => {
	const { colors } = useAppTheme();
	const { showNSFW, tagBlacklist, setSettings } = useSettingsStore(
		useShallow((state) => ({
			tagBlacklist: state.tagBlacklist,
			showNSFW: state.showNSFW,
			setSettings: state.setSettings,
		})),
	);
	const [tags, _setTags] = useState<string[]>(tagBlacklist ?? []);
	const [search, setSearch] = useState<string>('');

	const { data } = useTagCollectionQuery({}, { enabled: true });

	const TagChip = useCallback(
		({ name, onPress, icon }) => (
			<Chip
				style={{ margin: 8, borderColor: colors.primary }}
				icon={icon ?? undefined}
				mode="outlined"
				compact
				// selectedColor={isSelected(name) ? colors.primary : undefined}
				onPress={() => onPress(name)}
			>
				{name}
			</Chip>
		),
		[tags],
	);

	const onAdd = (tag: string) => {
		setSettings({ tagBlacklist: [tag, ...tagBlacklist] });
		setSearch('');
	};

	const onRemove = (tag: string) => {
		setSettings({ tagBlacklist: tagBlacklist.filter((t) => t !== tag) });
	};

	return (
		<View>
			<TitleText
				title={'Blacklist Tags'}
				description="Select tags that you want hidden. This will globally exclude content containing any of these tags."
				containerStyle={{ paddingTop: 10 }}
			/>
			<View style={{ width: '100%' }}>
				<View>
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
					<View>
						{search && data && (
							<Animated.View
								entering={FadeIn}
								exiting={FadeOut}
								style={{
									position: 'absolute',
									zIndex: 10,
									width: '98%',
									alignSelf: 'center',
									borderRadius: 12,
									backgroundColor: colors.surface,
								}}
							>
								{data?.MediaTagCollection?.filter((val) => {
									if (!showNSFW && val.isAdult) {
										return false;
									} else {
										return val.name
											.toLowerCase()
											.includes(search.toLowerCase());
									}
								}).map(
									(tag, idx) =>
										idx < 6 && (
											<List.Item
												key={idx}
												title={tag.name}
												onPress={() => onAdd(tag.name)}
											/>
										),
								)}
							</Animated.View>
						)}
					</View>
				</View>
			</View>
			<Divider style={{ width: '100%', marginBottom: 10 }} />
			<View>
				{tagBlacklist.length > 0 && (
					<ScrollView
						style={{
							marginVertical: 5,
						}}
					>
						<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
							{tagBlacklist.map((tag, idx) => (
								<TagChip
									key={idx}
									name={tag}
									onPress={() => onRemove(tag)}
									icon={'close'}
								/>
							))}
						</View>
					</ScrollView>
				)}
			</View>
		</View>
	);
};

const TabSetup = () => {
	const { exploreTabs, exploreTabOrder, setSettings } = useSettingsStore();

	const editExploreTabs = (tabs: (keyof ExploreTabsProps)[]) => {
		setSettings({ exploreTabs: tabs });
	};

	const updateTabOrder = (tabs: (keyof ExploreTabsProps)[]) => {
		setSettings({ exploreTabOrder: tabs });
	};

	const renderItem = ({ item, drag, isActive }: RenderItemParams<keyof ExploreTabsProps>) => {
		return (
			<ScaleDecorator>
				<TouchableOpacity
					style={{
						width: '100%',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
					onPress={() =>
						editExploreTabs(
							exploreTabs.includes(item)
								? exploreTabs.filter((tab) => tab !== item)
								: [...exploreTabs, item],
						)
					}
					activeOpacity={1}
					disabled={isActive}
				>
					<Text
						variant="titleMedium"
						style={{ textTransform: 'capitalize', paddingLeft: 15 }}
					>
						{item}
					</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Checkbox status={exploreTabs.includes(item) ? 'checked' : 'unchecked'} />
						<IconButton icon="drag-vertical" onPressIn={drag} />
					</View>
				</TouchableOpacity>
			</ScaleDecorator>
		);
	};

	return (
		<Body style={{ flex: 1, justifyContent: 'center' }}>
			<TitleText
				title={'Explore Tabs'}
				description="Select what type of content you want quick access to."
				containerStyle={{ paddingBottom: 20 }}
			/>
			<GestureHandlerRootView style={{ flex: 1, justifyContent: 'center' }}>
				<DraggableFlatList
					data={exploreTabOrder}
					renderItem={renderItem}
					keyExtractor={(item, idx) => idx.toString()}
					onDragEnd={({ data }) => {
						updateTabOrder(data);
					}}
				/>
			</GestureHandlerRootView>
		</Body>
	);
};

const OutroPage = () => {
	return (
		<Body style={{ flex: 1 }}>
			<TitleText
				title="Setup Complete!"
				description={
					'For further customization, advanced settings can be found in the "More" tab. This setup can also be restarted from there.'
				}
				showLogo
			/>
			<View style={{ flex: 1, alignItems: 'flex-start', alignSelf: 'flex-start' }}>
				<Text style={{ alignSelf: 'flex-start', paddingLeft: 20 }}>
					{'\n'}Additional Settings:
				</Text>
				<Text
					style={{
						flex: 1,
						alignSelf: 'flex-start',
						paddingLeft: 20,
					}}
				>
					{'\n'}- 3D effects
					{'\n'}- Text-to-speech
					{'\n'}- Score color customization
					{'\n'}- and much more
				</Text>
			</View>
		</Body>
	);
};

const SetupModal = () => {
	const pagerRef = useRef<PagerView>(null);
	const [page, setPage] = useState<number>(0);
	const { colors } = useAppTheme();
	const { setSettings } = useSettingsStore();

	const { top } = useSafeAreaInsets();

	const onPageChange = (pg: number) => {
		pagerRef.current?.setPage(pg);
		// setPage(pg);
	};

	const onSetupComplete = () => {
		setSettings({ isFirstLaunch: false });
	};

	return (
		<View style={{ flex: 1 }}>
			{/* [colors.background, rgbToRgba(colors.primary, 0.4)] */}
			<LinearGradient
				colors={[colors.background, rgbToRgba(colors.primaryContainer, 0.4)]}
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					alignItems: 'center',
				}}
			/>
			{/* <BackgroundAnimation /> */}
			<View
				style={{
					width: '100%',
					paddingTop: top + 10,
					flexDirection: 'row',
					alignItems: 'center',
					padding: 10,
					justifyContent: 'flex-end',
				}}
			>
				{/* <IconButton icon='animation-outline' /> */}
				<Button onPress={onSetupComplete}>Skip Setup</Button>
			</View>
			{/* <RenderPage page={page.page} pageAnim={page.pageAnim} /> */}
			<PagerView
				initialPage={0}
				onPageSelected={(e) => setPage(e.nativeEvent.position)}
				ref={pagerRef}
				style={{ flex: 1 }}
			>
				<IntroPage key={0} />
				<ThemeSetup key={1} />
				<AnilistSetup key={2} />
				<CardSetup key={3} />
				<TagBLSetup key={4} />
				<TabSetup key={5} />
				<OutroPage key={6} />
			</PagerView>
			{page + 1 < SETUP_PAGES ? (
				<Button
					onPress={() => onPageChange(page + 1)}
					mode="contained"
					style={{ marginBottom: 30, marginHorizontal: 20 }}
				>
					Next
				</Button>
			) : (
				<Button
					mode="contained"
					onPress={onSetupComplete}
					style={{ marginBottom: 30, marginHorizontal: 20 }}
				>
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
				<SetupNavBar
					page={page}
					numPages={SETUP_PAGES}
					onPageChange={(pg) => onPageChange(pg)}
				/>
			</View>
		</View>
	);
};

export default SetupModal;
