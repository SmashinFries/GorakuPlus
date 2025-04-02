import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import {
	Appbar,
	AppbarProps,
	Badge,
	Chip,
	Icon,
	IconButton,
	Menu,
	Searchbar,
	Text,
	TextInput as TextInputPaper,
} from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	BackHandler,
	Keyboard,
	RefreshControlProps,
	Share,
	StyleSheet,
	View,
	TextInput,
	useWindowDimensions,
	Pressable,
} from 'react-native';
import { Image, ImageProps } from 'expo-image';
import Animated, {
	cancelAnimation,
	FadeIn,
	FadeOut,
	runOnJS,
	SlideInUp,
	SlideOutDown,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { useHeaderAnim } from './animations';
import { useNavigation } from '@react-navigation/native';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { openWebBrowser } from '@/utils/webBrowser';
import { getStreamingSiteEmoji } from '@/utils/emoji';
import { AniMediaQuery, MediaType } from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useListFilterStore } from '@/store/listStore';
import { useAppTheme } from '@/store/theme/themes';
import { useFavoritesFilterStore } from '@/store/favoritesStore';
import { useSearchStore } from '@/store/search/searchStore';
import { useShallow } from 'zustand/react/shallow';
import { PostImage } from './art/image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import ParticleBackground from './particles';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

const PaperHeader = ({
	navigation,
	options,
	route,
	back,
	mode,
	dark,
	elevated,
	actions,
}: NativeStackHeaderProps & {
	mode?: AppbarProps['mode'];
	dark?: boolean;
	elevated?: boolean;
	actions?: { icon: string; onPress: () => void }[];
	showBack?: boolean;
}) => {
	const title = getHeaderTitle(options, route.name);
	return (
		<Appbar.Header mode={mode} dark={dark} elevated={elevated}>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content
				title={title}
				titleStyle={{ textTransform: 'capitalize' }}
				// mode={mode}
			/>
			{actions?.map((action, idx) => <Appbar.Action key={idx} {...action} />)}
		</Appbar.Header>
	);
};

export const ExploreHeader = ({
	navigation,
	options,
	route,
	showScanner,
	// toggleDrawer,
}: NativeStackHeaderProps & { toggleDrawer: () => void; showScanner: () => void }) => {
	const title = getHeaderTitle(options, route.name);

	return (
		<Appbar.Header mode="small">
			{/* {mode === 'punpun' && (
				<MotiView
					from={{ translateX: width }}
					animate={{ translateX: -width }}
					transition={{
						type: 'timing',
						duration: 25000,
						loop: true,
						repeatReverse: false,
						delay: 500,
					}}
					exit={{
						opacity: 0,
					}}
					style={{ position: 'absolute', height: 60, width: 30 }}
				>
					<MotiImage
						from={{ translateY: -5 }}
						animate={{ translateY: 5 }}
						transition={{
							type: 'timing',
							duration: 1000,
							loop: true,
							repeatReverse: true,
						}}
						source={require('../../assets/punpun.png')}
						style={{ height: 50, width: 30 }}
						resizeMode="contain"
					/>
				</MotiView>
			)} */}

			{/* @ts-ignore */}
			<Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />

			<Appbar.Content title={title} />
			<Appbar.Action icon="barcode-scan" onPress={showScanner} />
			<Appbar.Action icon="magnify" onPress={() => navigation.navigate('search')} />
			{/* <Portal>
				<BarcodeScanDialog
					visible={showBCDialog}
					onDismiss={() => setShowBCDialog(false)}
				/>
			</Portal> */}
		</Appbar.Header>
	);
};

type SearchHeaderProps = NativeStackHeaderProps & {
	openFilter: () => void;
	searchbarRef: React.RefObject<TextInput>;
	toggleIsFocused: (value: boolean) => void;
	openImageSearch: () => void;
	openWaifuSearch: () => void;
	onFocus: () => void;
	autoFocus?: boolean;
};
export const SearchHeader = ({
	navigation,
	openFilter,
	searchbarRef,
	autoFocus = true,
	toggleIsFocused,
	openImageSearch,
	// openWaifuSearch,
	onFocus,
}: SearchHeaderProps) => {
	const { colors } = useAppTheme();
	const { right, left } = useSafeAreaInsets();
	const { query, searchType, updateQuery } = useSearchStore(
		useShallow((state) => ({
			searchType: state.searchType,
			query: state.query,
			updateQuery: state.updateQuery,
		})),
	);

	const [tempQuery, setTempQuery] = useState(query);

	// temp solution to input lag
	useEffect(() => {
		updateQuery(tempQuery);
	}, [tempQuery]);

	useEffect(() => {
		setTempQuery(query);
	}, [query]);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			toggleIsFocused(true);
		});
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			toggleIsFocused(false);
		});

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return (
		<Appbar.Header>
			<Animated.View
				entering={SlideInUp.duration(500)}
				exiting={SlideOutDown}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingHorizontal: Math.max(left, right),
					zIndex: 5,
				}}
			>
				<Searchbar
					ref={searchbarRef}
					value={tempQuery}
					// onChangeText={setSearchTerm}
					onChangeText={(txt) => setTempQuery(txt)}
					// onSubmitEditing={searchContent}
					scrollEnabled
					returnKeyType="search"
					autoFocus={autoFocus}
					onFocus={() => {
						// searchbarRef?.current?.focus();
						toggleIsFocused(true);
						onFocus();
					}}
					onBlur={() => {
						toggleIsFocused(false);
					}}
					placeholder="Search sauce..."
					mode="bar"
					onIconPress={() => navigation.goBack()}
					selectionColor={colors.primaryContainer}
					icon={'arrow-left'}
					traileringIcon={
						searchType === MediaType.Anime ||
						searchType === MediaType.Manga ||
						searchType === 'CHARACTER'
							? 'image-search-outline'
							: undefined
					}
					onTraileringIconPress={
						searchType === MediaType.Anime ||
						searchType === MediaType.Manga ||
						searchType === 'CHARACTER'
							? openImageSearch
							: undefined
					}
					style={{ flex: 1, backgroundColor: 'transparent' }}
					inputStyle={{ justifyContent: 'center', textAlignVertical: 'center' }}
					onClearIconPress={() => {
						setTempQuery('');
					}}
				/>
				{/* <IconButton
                    icon={'filter-variant'} //filter-variant
                    onPress={openFilter}
                    // onPress={() => setIsFilterOpen((prev) => !prev)}
                    disabled={
                        ![MediaType.Anime, MediaType.Manga, 'imageSearch'].includes(currentType)
                    }
                /> */}
				{searchType !== 'STUDIO' && (
					<IconButton
						icon={'view-module'}
						onPress={() =>
							router.push({
								pathname: '/(sheets)/displayConfig',
								params: { type: 'search' },
							})
						}
						// onPress={() => setIsFilterOpen((prev) => !prev)}
						// disabled={
						// 	![MediaType.Anime, MediaType.Manga, 'imageSearch'].includes(currentType)
						// }
					/>
				)}
				<IconButton
					icon={'filter-outline'}
					onPress={openFilter}
					// onPress={() => setIsFilterOpen((prev) => !prev)}
					// disabled={
					// 	![MediaType.Anime, MediaType.Manga, 'imageSearch'].includes(currentType)
					// }
				/>
			</Animated.View>
		</Appbar.Header>
	);
};

const AnimatedImage = Animated.createAnimatedComponent<ImageProps>(Image);

const MoveableBanner = () => {
	const { width } = useWindowDimensions();
	const pressed = useSharedValue<boolean>(false);
	const offsetX = useSharedValue<number>(0);
	const offsetY = useSharedValue<number>(0);
	const pulseScale = useSharedValue<number>(1);

	const playVoice = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require('../../assets/audio/goraku-voice.mp3'),
		);
		await sound.playAsync();
	};

	// const startIdleAnimation = () => {
	// 	pulseScale.value = withRepeat(
	// 		withTiming(0.8, {
	// 			duration: 1500,
	// 		}),
	// 		-1,
	// 		true,
	// 	);
	// };

	const pan = Gesture.Pan()
		.onStart(() => {
			cancelAnimation(pulseScale);
			pulseScale.value = 1;
		})
		.onBegin(() => {
			pressed.value = true;
		})
		.onChange((event) => {
			offsetX.value = event.translationX;
			offsetY.value = event.translationY;
		})
		.onFinalize(() => {
			offsetX.value = withSpring(0);
			offsetY.value = withSpring(0);
			pressed.value = false;
			// runOnJS(startIdleAnimation)();
		});

	const longPress = Gesture.LongPress().onStart((_e) => {
		// console.log(e.state);
		runOnJS(playVoice)();
	});

	const gestures = Gesture.Race(pan, longPress);

	const animatedGestureStyle = useAnimatedStyle<any>(() => ({
		transform: [
			{ translateX: offsetX.value },
			{ translateY: offsetY.value },
			{ scale: withTiming(pressed.value ? 0.8 : 1) },
		],
	}));

	const animatedIdleStyle = useAnimatedStyle(() => ({
		transform: [{ scale: pulseScale.value }],
	}));

	// useEffect(() => {
	// 	startIdleAnimation();
	// });

	return (
		<GestureDetector gesture={gestures}>
			<AnimatedImage
				source={require('../../assets/iconsv3/banner.png')}
				style={[
					animatedGestureStyle,
					animatedIdleStyle,
					{
						width: width - 100,
						height: 150,
						overflow: 'visible',
						alignSelf: 'center',
						position: 'absolute',
						// top: -25,
						bottom: 0,
					},
				]}
				// contentFit="contain"
				contentFit="contain"
			/>
		</GestureDetector>
	);
};

export const MoreHeader = (_props: NativeStackHeaderProps) => {
	const { top } = useSafeAreaInsets();

	return (
		<Appbar.Header style={{ height: 150 + top, justifyContent: 'center' }}>
			<ParticleBackground mascotOnly />
			<MoveableBanner />
		</Appbar.Header>
	);
};

export const BanTagHeader = ({
	navigation,
	options,
	route,
	back,
	iconColor,
	onSave,
}: NativeStackHeaderProps & { onSave: () => void; iconColor: string }) => {
	const title = getHeaderTitle(options, route.name);
	return (
		<Appbar.Header>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} />
			<Appbar.Action icon="check" iconColor={iconColor ?? undefined} onPress={onSave} />
		</Appbar.Header>
	);
};

type MediaHeaderProps = {
	navigation: NativeStackNavigationProp<any>;
	title: string;
	headerTitleStyle?: any;
	headerActionStyle?: any;
	headerStyle?: any;
	shareLink?: string;
	streamingLinks?: NonNullable<AniMediaQuery['Media']>['externalLinks'];
	onBack?: () => void;
	onEdit: () => void;
	onAniCard?: () => void;
};
export const MediaHeader = ({
	navigation,
	title,
	shareLink,
	headerActionStyle,
	headerStyle,
	headerTitleStyle,
	streamingLinks,
	onBack = () => null,
	onEdit,
	onAniCard = () => null,
}: MediaHeaderProps) => {
	const [streamVisible, setStreamVisible] = useState(false);
	const [moreVisible, setMoreVisible] = useState(false);

	const openStreamMenu = () => setStreamVisible(true);
	const closeStreamMenu = () => setStreamVisible(false);

	const openMoreMenu = () => setMoreVisible(true);
	const closeMoreMenu = () => setMoreVisible(false);

	return (
		<Animated.View style={[headerStyle]}>
			<Appbar.Header style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
				<Animated.View
					style={[
						{
							borderRadius: 100,
							height: 42,
							width: 42,
							marginLeft: 5,
							justifyContent: 'center',
							alignItems: 'center',
						},
						headerActionStyle,
					]}
				>
					<Appbar.BackAction
						onPress={() => {
							navigation.goBack();
							onBack();
						}}
					/>
				</Animated.View>
				<Animated.View
					style={[
						headerTitleStyle,
						{
							flex: 1,
							height: '50%',
							justifyContent: 'center',
						},
					]}
				>
					<Appbar.Content
						title={title ?? ''}
						titleStyle={{ textTransform: 'capitalize' }}
					/>
				</Animated.View>
				{(streamingLinks?.length ?? 0) > 0 && (
					<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
						<Menu
							visible={streamVisible}
							onDismiss={closeStreamMenu}
							anchorPosition="bottom"
							anchor={
								<Appbar.Action
									icon={
										shareLink?.includes('anime')
											? 'play-box-multiple-outline'
											: 'book-open-page-variant-outline'
									}
									onPress={() => openStreamMenu()}
								/>
							}
						>
							{streamingLinks?.map(
								(link, idx) =>
									link && (
										<Menu.Item
											key={idx}
											leadingIcon={
												link.language
													? (props) =>
															link?.language && (
																<Text {...props}>
																	{getStreamingSiteEmoji(
																		link?.language,
																	)}
																</Text>
															)
													: undefined
											}
											trailingIcon={
												link.icon
													? (props) => (
															<Icon
																{...props}
																source={{ uri: link.icon }}
																color={link?.color ?? props.color}
															/>
														)
													: undefined
											}
											onPress={() => openWebBrowser(link.url, true)}
											title={link.site}
										/>
									),
							)}
						</Menu>
					</Animated.View>
				)}
				{onEdit !== undefined && (!shareLink || (streamingLinks?.length ?? 0) < 1) && (
					<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
						<Appbar.Action icon="file-document-edit-outline" onPress={onEdit} />
					</Animated.View>
				)}
				{!!shareLink && (onEdit === undefined || (streamingLinks?.length ?? 0) < 1) && (
					<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
						<Appbar.Action
							icon="share-variant-outline"
							onPress={() =>
								Share.share({
									url: shareLink,
									title: shareLink,
									message: shareLink,
								})
							}
							disabled={!shareLink}
						/>
					</Animated.View>
				)}
				{!!shareLink && onEdit && (streamingLinks?.length ?? 0) > 0 && (
					<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
						<Menu
							visible={moreVisible}
							onDismiss={closeMoreMenu}
							anchorPosition="bottom"
							anchor={<Appbar.Action icon="dots-vertical" onPress={openMoreMenu} />}
						>
							<Menu.Item
								leadingIcon={'file-document-edit-outline'}
								onPress={onEdit}
								title={'Edit Data'}
							/>
							<Menu.Item
								leadingIcon={'share-variant-outline'}
								onPress={() =>
									Share.share({
										url: shareLink,
										title: shareLink,
										message: shareLink,
									})
								}
								title={'Share'}
							/>
							<Menu.Item
								leadingIcon={'card-text-outline'}
								onPress={() => {
									closeMoreMenu();
									onAniCard();
								}}
								title={'AniCard'}
							/>
						</Menu>
					</Animated.View>
				)}
			</Appbar.Header>
		</Animated.View>
	);
};

type FadeHeaderProps = {
	children: React.ReactNode;
	title: string;
	shareLink?: string;
	favorite?: boolean;
	streamingLinks?: NonNullable<AniMediaQuery['Media']>['externalLinks'];
	onFavorite?: () => void;
	onEdit?: () => void;
	loading?: boolean;
	disableBack?: boolean;
	addFriendIcon?: boolean;
	isFriend?: boolean;
	onAddFriend?: () => void;
	notificationIcon?: boolean;
	newNotifs?: number;
	onNotificationIcon?: () => void;
	keepTitle?: boolean;
	RefreshControl?: React.ReactElement<
		RefreshControlProps,
		string | React.JSXElementConstructor<any>
	>;
	animationRange?: number[];
	isMediaScreen?: boolean;
	BgImage?: ({ style }: { style?: any }) => React.JSX.Element | undefined;
	onBack?: () => void;
	onAniCard?: () => void;
};
export const FadeHeaderProvider = ({
	children,
	title,
	shareLink,
	streamingLinks,
	favorite,
	onFavorite = () => null,
	onEdit = () => null,
	loading,
	addFriendIcon,
	isFriend,
	onAddFriend = () => null,
	notificationIcon,
	newNotifs,
	onNotificationIcon = () => null,
	RefreshControl,
	disableBack = false,
	animationRange = [40, 110],
	isMediaScreen = false,
	BgImage,
	onBack = () => null,
	onAniCard = () => null,
}: FadeHeaderProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<any>>();
	const { colors } = useAppTheme();
	const { headerStyle, headerTitleStyle, bgImageStyle, headerActionStyle, scrollHandler } =
		useHeaderAnim(animationRange[0], animationRange[1]);
	const { userID } = useAuthStore().anilist;
	const { navAnimation } = useSettingsStore();

	const handleNotifPress = () => {
		onNotificationIcon();
	};

	const Header = () => {
		const canGoBack = navigation.canGoBack();
		return (
			<Animated.View style={[headerStyle]}>
				<Appbar.Header style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
					{canGoBack && !disableBack && (
						<Animated.View
							style={[
								{
									borderRadius: 100,
									height: 42,
									width: 42,
									marginLeft: 5,
									justifyContent: 'center',
									alignItems: 'center',
								},
								headerActionStyle,
							]}
						>
							<Appbar.BackAction
								onPress={() => {
									navigation.goBack();
									onBack();
								}}
							/>
						</Animated.View>
					)}
					<Animated.View
						style={[
							headerTitleStyle,
							{
								flex: 1,
								height: '50%',
								justifyContent: 'center',
								paddingLeft: disableBack ? 20 : 0,
							},
						]}
					>
						<Appbar.Content
							title={title ?? ''}
							titleStyle={{ textTransform: 'capitalize' }}
						/>
					</Animated.View>
					{onEdit !== undefined && (
						<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
							<Appbar.Action icon="file-document-edit-outline" onPress={onEdit} />
						</Animated.View>
					)}
					{!!shareLink && (
						<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
							<Appbar.Action
								icon="share-variant-outline"
								onPress={() =>
									Share.share({
										url: shareLink,
										title: shareLink,
										message: shareLink,
									})
								}
								disabled={!shareLink}
							/>
						</Animated.View>
					)}
					{favorite !== undefined && userID && (
						<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
							<Appbar.Action
								icon={favorite ? 'heart' : 'heart-outline'}
								onPress={onFavorite}
								color="red"
							/>
						</Animated.View>
					)}
					{userID && addFriendIcon && (
						<Animated.View
							style={[
								{
									borderRadius: 100,
									height: 42,
									width: 42,
									marginRight: 10,
									justifyContent: 'center',
									alignItems: 'center',
								},
								headerActionStyle,
							]}
						>
							<Appbar.Action
								icon={isFriend ? 'account-minus-outline' : 'account-plus-outline'}
								onPress={onAddFriend}
							/>
						</Animated.View>
					)}
					{userID && notificationIcon && (
						<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
							<Animated.View>
								<Appbar.Action icon={'bell-outline'} onPress={handleNotifPress} />
							</Animated.View>
							{newNotifs ? (
								<Badge
									style={{
										position: 'absolute',
										right: -5,
										top: -5,
										color: colors.onPrimary,
										backgroundColor: colors.primary,
									}}
								>
									{newNotifs}
								</Badge>
							) : null}
						</Animated.View>
					)}
				</Appbar.Header>
			</Animated.View>
		);
	};

	const BackgroundImage = useCallback(() => {
		return BgImage ? <BgImage style={bgImageStyle} /> : null;
	}, []);

	useEffect(() => {
		navigation.setOptions({
			title: title,
			headerTransparent: true,
			headerShown: loading ? false : true,
			header: (props) =>
				isMediaScreen ? (
					<MediaHeader
						navigation={props.navigation}
						onBack={onBack}
						onEdit={onEdit}
						shareLink={shareLink}
						title={title}
						headerActionStyle={headerActionStyle}
						headerStyle={headerStyle}
						headerTitleStyle={headerTitleStyle}
						streamingLinks={streamingLinks}
						onAniCard={onAniCard}
					/>
				) : (
					<Header />
				),
			animation: navAnimation,
		});
	}, [loading]);

	return (
		<View>
			{BgImage && <BackgroundImage />}
			<Animated.ScrollView
				refreshControl={RefreshControl ?? undefined}
				showsVerticalScrollIndicator={false}
				scrollEventThrottle={16}
				onScroll={scrollHandler}
			>
				{children}
			</Animated.ScrollView>
		</View>
	);
};

export const ArtHeaderProvider = ({
	aspectRatio,
	title,
	imageUrl,
	titleHeight = 0,
	children,
}: {
	title?: string;
	imageUrl?: string;
	aspectRatio: number;
	titleHeight?: number;
	children: ReactNode;
}) => {
	const { width } = useWindowDimensions();
	const [imageHeight, setImageHeight] = useState<number>(0);
	return (
		<FadeHeaderProvider
			animationRange={[width / aspectRatio, width / aspectRatio + titleHeight]}
			title={title ?? ''}
			BgImage={({ style }) => (
				<PostImage
					aspectRatio={aspectRatio}
					style={style}
					img_url={imageUrl}
					blurAmount={0}
					setImageHeight={(ht) => setImageHeight(ht)}
				/>
			)}
		>
			<Pressable
				// onPress={toggleBlur}
				style={{
					// height: aspectRatio ? width / aspectRatio : 0,
					height: imageHeight + 20,
					width: width,
				}}
			/>
			{children}
		</FadeHeaderProvider>
	);
};

export const CharStaffHeader = ({ navigation, back }: NativeStackHeaderProps) => {
	return (
		<Appbar.Header style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
		</Appbar.Header>
	);
};

type ReviewHeaderProps = NativeStackHeaderProps & {
	onRenderSwitch?: () => void;
	shareLink?: string;
	render_switch_icon?: string;
};
export const ReviewHeader = ({
	navigation,
	options,
	route,
	back,
	shareLink,
	render_switch_icon,
	onRenderSwitch,
}: ReviewHeaderProps) => {
	const title = getHeaderTitle(options, route.name);
	return (
		<Appbar.Header>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} />
			<Appbar.Action icon={render_switch_icon as IconSource} onPress={onRenderSwitch} />
			<Appbar.Action
				icon={'earth'}
				onPress={() => {
					openWebBrowser(shareLink);
				}}
				// onPress={() =>
				//     Share.share({
				//         url: shareLink,
				//         title: shareLink,
				//         message: shareLink,
				//     })
				// }
			/>
		</Appbar.Header>
	);
};

const HeaderStyles = StyleSheet.create({
	icon: {
		borderRadius: 100,
		height: 42,
		width: 42,
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export const ListHeader = ({
	title = 'List',
	isViewer = true,
	currentType,
	openFilter = () => null,
}: {
	title?: string;
	isViewer?: boolean;
	currentType: MediaType;
	openFilter?: () => void;
}) => {
	const { updateListFilter, ...listParams } = useListFilterStore();
	const { colors } = useAppTheme();
	const [isOpen, setIsOpen] = useState(false);

	const total_filters = useMemo(
		() =>
			listParams?.tags_include.length +
			listParams?.tags_exclude.length +
			listParams?.genre_include.length +
			listParams?.genre_exclude.length +
			listParams?.[currentType === MediaType.Anime ? 'anime_format_in' : 'manga_format_in']
				.length +
			listParams?.[
				currentType === MediaType.Anime ? 'anime_format_not_in' : 'manga_format_not_in'
			].length +
			(listParams?.countryOfOrigin ? 1 : 0),
		[
			listParams?.tags_include,
			listParams?.tags_exclude,
			listParams?.genre_include,
			listParams?.genre_exclude,
			listParams?.anime_format_in,
			listParams?.anime_format_not_in,
			listParams?.manga_format_in,
			listParams?.manga_format_not_in,
			listParams?.countryOfOrigin,
			currentType,
		],
	);

	useFocusEffect(() => {
		const backAction = () => {
			setIsOpen((prev) => {
				if (prev === false) {
					router.back();
				}
				return false;
			});
			return true;
		};

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => {
			backHandler.remove();
		};
	});

	const { right, left } = useSafeAreaInsets();

	return (
		<Appbar.Header>
			{!isViewer && !isOpen && <Appbar.BackAction onPress={() => router.back()} />}
			{isOpen ? (
				<Animated.View
					entering={FadeIn}
					exiting={FadeOut}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: Math.max(left, right),
						flexShrink: 1,
					}}
				>
					{/* <Appbar.BackAction onPress={() => setIsOpen(false)} /> */}
					<Searchbar
						value={listParams?.query ?? ''}
						onChangeText={(txt) => {
							updateListFilter?.({ query: txt });
						}}
						icon={'arrow-left'}
						onIconPress={() => setIsOpen(false)}
						style={{ backgroundColor: colors.surface }}
						mode="bar"
						autoFocus
					/>
				</Animated.View>
			) : (
				<Appbar.Content title={title} />
			)}
			{!isOpen && (
				<Animated.View exiting={FadeOut}>
					<Appbar.Action icon="magnify" onPress={() => setIsOpen(true)} />
				</Animated.View>
			)}
			{/* <Appbar.Action icon="refresh" onPress={onRefresh} /> */}
			<Appbar.Action
				icon={'view-module'}
				onPress={() =>
					router.push({
						pathname: '/(sheets)/displayConfig',
						params: { type: 'list' },
					})
				}
			/>
			{!!openFilter && (
				<>
					<Badge
						visible={total_filters > 0}
						size={18}
						style={{ position: 'absolute', top: 8, right: 6 }}
					>
						{total_filters}
					</Badge>
					<Appbar.Action icon="filter-variant" onPress={openFilter} />
				</>
			)}
			{/* <Appbar.Action icon="filter-outline" onPress={openFilter} /> */}
		</Appbar.Header>
	);
};

export const FavoritesHeader = ({
	navigation,
	options,
	route,
	isMediaRoute,
	onFilterOpen,
}: NativeStackHeaderProps & { isMediaRoute: boolean; onFilterOpen: () => void }) => {
	const { query, updateFilter } = useFavoritesFilterStore();
	const [isOpen, setIsOpen] = useState(false);
	const title = getHeaderTitle(options, route.name);

	useEffect(() => {
		const backAction = () => {
			if (isOpen) {
				setIsOpen(false);
			} else {
				navigation.goBack();
			}
			return true;
		};

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => backHandler.remove();
	}, [isOpen]);

	const { right, left } = useSafeAreaInsets();

	return (
		<Appbar.Header>
			<Appbar.BackAction onPress={isOpen ? () => setIsOpen(false) : navigation.goBack} />
			{isOpen ? (
				<Animated.View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: Math.max(left, right),
						flexShrink: 1,
					}}
				>
					{/* <Appbar.BackAction onPress={() => setIsOpen(false)} /> */}
					<TextInputPaper
						autoFocus
						value={query}
						onChangeText={(txt) => {
							updateFilter({ query: txt });
						}}
						style={{ width: '100%', backgroundColor: 'transparent' }}
						placeholder={'Search favorites...'}
						underlineColor="transparent"
						underlineColorAndroid={'transparent'}
						activeUnderlineColor="transparent"
						// mode="flat"
					/>
				</Animated.View>
			) : (
				<Appbar.Content title={title} />
			)}
			{!isOpen && <Appbar.Action icon="magnify" onPress={() => setIsOpen(true)} />}
			<Appbar.Action
				icon={'view-module'}
				onPress={() =>
					router.push({
						pathname: '/(sheets)/displayConfig',
						params: { type: 'list' },
					})
				}
			/>
			{isMediaRoute && <Appbar.Action icon="filter-variant" onPress={onFilterOpen} />}
		</Appbar.Header>
	);
};

type StudioHeaderProps = NativeStackHeaderProps & {
	isFav: boolean;
	id: number;
};
export const StudioHeader = ({ navigation, options, route, back, id }: StudioHeaderProps) => {
	const shareLink = 'https://anilist.co/studio/' + id;
	const title = getHeaderTitle(options, route.name);
	// const { mutateAsync } = useToggleFavMutation();
	// const [fav, setFav] = useState(isFav);

	// const onFavToggle = async () => {
	// 	const res = await mutateAsync({ studioId: id });
	// 	// setFav(
	// 	// 	res.ToggleFavourite.studios?.edges.find((s) => s?.node?.id === id)?.node?.isFavourite ??
	// 	// 		false,
	// 	// );
	// };

	return (
		<Appbar.Header>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} titleStyle={{ textTransform: 'capitalize' }} />
			{/* <Appbar.Action
                icon={fav ? 'heart' : 'heart-outline'}
                color={fav ? colors.primary : undefined}
                onPress={onFavToggle}
            /> */}
			<Appbar.Action
				icon={'view-module'}
				onPress={() =>
					router.push({
						pathname: '/(sheets)/displayConfig',
						params: { type: 'search' },
					})
				}
			/>
			<Appbar.Action
				icon={'share-variant-outline'}
				onPress={() =>
					Share.share({
						url: shareLink,
						title: shareLink,
						message: shareLink,
					})
				}
			/>
		</Appbar.Header>
	);
};

export const AniCardHeader = ({
	navigation,
	options,
	route,
	back,
	onSave,
}: NativeStackHeaderProps & { onSave: () => void }) => {
	const title = getHeaderTitle(options, route.name);

	return (
		<Appbar.Header>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} titleStyle={{ textTransform: 'capitalize' }} />
			<Appbar.Action icon={'download-outline'} onPress={onSave} />
		</Appbar.Header>
	);
};

export const NekosAPIHeader = ({
	navigation,
	options,
	route,
	back,
	onOpenFilter,
}: NativeStackHeaderProps & {
	onOpenFilter: () => void;
}) => {
	const title = getHeaderTitle(options, route.name);

	return (
		<Appbar.Header mode="center-aligned" elevated>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} titleStyle={{ textTransform: 'capitalize' }} />
			<Appbar.Action icon={'filter-outline'} onPress={onOpenFilter} />
			<Appbar.Action
				icon={'information-outline'}
				onPress={() => openWebBrowser('https://nekosapi.com/')}
			/>
		</Appbar.Header>
	);
};

export const WaifuItHeader = ({
	navigation,
	options,
	route,
	back,
	onAuthOpen,
}: NativeStackHeaderProps & { onAuthOpen: () => void }) => {
	const title = getHeaderTitle(options, route.name);

	return (
		<Appbar.Header mode="center-aligned" elevated>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} titleStyle={{ textTransform: 'capitalize' }} />
			<Appbar.Action icon="key" onPress={onAuthOpen} />
			<Appbar.Action
				icon={'information-outline'}
				onPress={() => openWebBrowser('https://waifu.it/')}
			/>
		</Appbar.Header>
	);
};

export const AccountsHeader = ({
	options,
	route,
	mode,
	dark,
	elevated,
}: NativeStackHeaderProps & {
	mode?: AppbarProps['mode'];
	dark?: boolean;
	elevated?: boolean;
	actions?: { icon: string; onPress: () => void }[];
	showBack?: boolean;
}) => {
	const title = getHeaderTitle(options, route.name);
	return (
		<Appbar.Header mode={mode} dark={dark} elevated={elevated}>
			<Appbar.BackAction onPress={() => router.navigate('/(tabs)/more')} />
			<Appbar.Content
				title={title}
				titleStyle={{ textTransform: 'capitalize' }}
				// mode={mode}
			/>
		</Appbar.Header>
	);
};

export default PaperHeader;
