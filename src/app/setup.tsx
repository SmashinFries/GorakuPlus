import {
	GenreTagCollectionQuery,
	useGenreTagCollectionQuery,
} from '@/api/anilist/__genereated__/gql';
import { useAnilistAuth } from '@/api/anilist/useAnilistAuth';
import { MediaCard, MediaProgressBar } from '@/components/cards';
import { ThemeSkeleton } from '@/components/more/settings/appearance/skeletons';
import { SetupNavBar } from '@/components/setup/nav';
import { AnilistIcon } from '@/components/svgs';
import dummyData from '@/constants/dummyData';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { ScoreVisualType, ScoreVisualTypeEnum } from '@/store/settings/types';
import { availableThemes, themeOptions, useAppTheme } from '@/store/theme/themes';
import { useThemeStore } from '@/store/theme/themeStore';
import { ExploreTabsProps } from '@/types/navigation';
import { rgbToRgba, useColumns } from '@/utils';
import { openWebBrowser } from '@/utils/webBrowser';
import { BlurView } from 'expo-blur';
import { Image, ImageStyle } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	useWindowDimensions,
	Pressable,
	StyleProp,
	View,
	ViewStyle,
	FlatList,
	DimensionValue,
} from 'react-native';
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
	Switch,
	Text,
	useTheme,
} from 'react-native-paper';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SETUP_PAGES = 7;

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
	const { colors, dark } = useAppTheme();
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
	return (
		<Body style={{ flex: 1, justifyContent: 'center' }}>
			{/* <Image source={require('../../assets/iconsv2/icon-trans.png')} style={{width:'70%', aspectRatio:1/1}} /> */}
			<TitleText
				title={'Welcome to Goraku!'}
				description="Take a moment to setup the app for an optimal experience"
				containerStyle={{ flex: 0, justifyContent: 'center', paddingTop: 0 }}
				showLogo
			/>
		</Body>
	);
};

const ThemeSetup = () => {
	const { colors } = useAppTheme();
	const { isDark, mode, setTheme } = useThemeStore();

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
						onPress={(e) => setTheme({ isDark: false })}
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
						onPress={(e) => setTheme({ isDark: true })}
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
									onPress={() => setTheme({ mode: theme })}
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
	const { request, result, promptAsync } = useAnilistAuth(true);
	const { token, avatar, username } = useAuthStore().anilist;
	const { dark } = useTheme();

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

const CardSetup = () => {
	const { scoreColors, scoreVisualType, mediaLanguage, setSettings } = useSettingsStore();
	const { mode } = useThemeStore();
	const { colors } = useTheme();

	const onScoreDesignChange = (preset: ScoreVisualType) => {
		setSettings({ scoreVisualType: preset });
	};

	const onTitleLanguageChange = (lang: typeof mediaLanguage) => {
		setSettings({ mediaLanguage: lang });
	};

	return (
		<Body>
			<TitleText
				title={'Card Customization'}
				description={'Customize the look of media cards that are shown throughout the app.'}
				containerStyle={{ paddingTop: 20 }}
			/>

			<View style={{ justifyContent: 'center', paddingVertical: 30 }}>
				<View style={{ width: '35%', alignSelf: 'center' }}>
					<MediaCard
						coverImg={dummyData[mode].coverImage?.extraLarge}
						titles={dummyData[mode].title}
						meanScore={dummyData[mode].meanScore}
						averageScore={dummyData[mode].averageScore}
						scoreColors={scoreColors}
						// scoreVisualType={scoreVisualType}
						scoreDistributions={dummyData[mode].stats?.scoreDistribution}
						// height={210}
						fitToParent
					/>
					<View>
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
					</View>
				</View>
				<ScrollView style={{ flex: 1 }}>
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
								onPress={() => onScoreDesignChange(ScoreVisualTypeEnum[visual])}
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
									onTitleLanguageChange(lang as 'english' | 'romaji' | 'native')
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
				</ScrollView>
			</View>
		</Body>
	);
};

const TagBLSetup = () => {
	const { colors } = useTheme();
	const { width } = useWindowDimensions();
	const { tagBlacklist, setSettings } = useSettingsStore();
	const [tags, setTags] = useState<string[]>(tagBlacklist ?? []);
	const [search, setSearch] = useState<string>('');
	const [searchResults, setSearchResults] = useState<
		GenreTagCollectionQuery['MediaTagCollection']
	>([]);

	const { data, isFetching, isError } = useGenreTagCollectionQuery();

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
		setSettings({ tagBlacklist: [tag, ...tagBlacklist] });
	};

	const onRemove = (tag: string) => {
		setSettings({ tagBlacklist: tagBlacklist.filter((t) => t !== tag) });
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
		<Body>
			<TitleText
				title={'Blacklist Tags'}
				description="Select tags that you want hidden. This will globally exclude content containing any of these tags."
				containerStyle={{ paddingTop: 10 }}
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
			<FlatList
				key={searchResults?.length ?? 2}
				numColumns={searchResults?.length > 0 ? searchResults.length : 2}
				data={searchResults}
				contentContainerStyle={{
					paddingBottom: 50,
				}}
				columnWrapperStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
				keyExtractor={(item, idx) => idx.toString()}
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
		<Body>
			<TitleText
				title="Setup Complete!"
				description={
					'For further customization, advanced settings can be found in the "More" tab. This setup can also be restarted from there.'
				}
				showLogo
			/>
			<Text style={{ alignSelf: 'flex-start', paddingLeft: 20 }}>
				{'\n'}Additional Settings:
			</Text>
			<Text style={{ alignSelf: 'flex-start', paddingLeft: 20 }}>
				{'\n'}- 3D effects
				{'\n'}- Text-to-speech
				{'\n'}- Score color customization
				{'\n'}- and much more
			</Text>
		</Body>
	);
};

const SetupModal = () => {
	const pagerRef = useRef<PagerView>(null);
	const [page, setPage] = useState<number>(0);
	const { colors } = useAppTheme();
	const { isFirstLaunch, setSettings } = useSettingsStore();

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
