import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import {
	Appbar,
	AppbarProps,
	Badge,
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
	Easing,
	FadeIn,
	FadeOut,
	SlideInUp,
	SlideOutDown,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { ParticleBackground, useHeaderAnim } from './animations';
import { useNavigation } from '@react-navigation/native';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { openWebBrowser } from '@/utils/webBrowser';
import { getStreamingSiteEmoji } from '@/utils/emoji';
import { AniMediaQuery, MediaType, useToggleFavMutation } from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useListFilterStore } from '@/store/listStore';
import { useAppTheme } from '@/store/theme/themes';
import { useFavoritesFilterStore } from '@/store/favoritesStore';
import { useSearchStore } from '@/store/search/searchStore';
import { SheetManager } from 'react-native-actions-sheet';
import { useShallow } from 'zustand/react/shallow';
import { PostImage } from './art/image';

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
}: NativeStackHeaderProps & { showScanner: () => void }) => {
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
};
export const SearchHeader = ({
	navigation,
	openFilter,
	searchbarRef,
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
					autoFocus
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
						searchType === MediaType.Anime || searchType === MediaType.Manga
							? 'image-search-outline'
							: undefined
					}
					onTraileringIconPress={
						searchType === MediaType.Anime || searchType === MediaType.Manga
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
							SheetManager.show('DisplayConfigSheet', {
								payload: {
									type: 'search',
								},
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

export const MoreHeader = (_props: NativeStackHeaderProps) => {
	const { width } = useWindowDimensions();
	const { top } = useSafeAreaInsets();
	return (
		<Appbar.Header style={{ height: 150 + top, justifyContent: 'center' }}>
			<ParticleBackground mascotOnly />
			<AnimatedImage
				source={require('../../assets/iconsv3/banner.png')}
				style={{
					width: width - 100,
					height: 150,
					overflow: 'visible',
					alignSelf: 'center',
					position: 'absolute',
					// top: -25,
					bottom: 0,
				}}
				// contentFit="contain"
				contentFit="contain"
			/>
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
	const { colors } = useAppTheme();
	const { width } = useWindowDimensions();
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
	shareLink: string;
	streamingLinks?: AniMediaQuery['Media']['externalLinks'];
	onBack: () => void;
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
	onBack,
	onEdit,
	onAniCard,
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
							onBack ? onBack() : null;
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
				{streamingLinks?.length > 0 && (
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
							{streamingLinks.map(
								(link, idx) =>
									link && (
										<Menu.Item
											key={idx}
											leadingIcon={
												link.language
													? (props) => (
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
				{onEdit !== undefined && (!shareLink || streamingLinks?.length < 1) && (
					<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
						<Appbar.Action icon="file-document-edit-outline" onPress={onEdit} />
					</Animated.View>
				)}
				{shareLink && (onEdit === undefined || streamingLinks?.length < 1) && (
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
				{shareLink && onEdit && (streamingLinks?.length > 0 || onAniCard) && (
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

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(1.5);

type FadeHeaderProps = {
	children: React.ReactNode;
	title: string;
	shareLink?: string;
	favorite?: boolean;
	streamingLinks?: AniMediaQuery['Media']['externalLinks'];
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
	BgImage?: ({ style }: { style?: any }) => React.JSX.Element;
	onBack?: () => void;
	onAniCard?: () => void;
};
export const FadeHeaderProvider = ({
	children,
	title,
	shareLink,
	streamingLinks,
	favorite,
	onFavorite,
	onEdit,
	loading,
	addFriendIcon,
	isFriend,
	onAddFriend,
	notificationIcon,
	newNotifs,
	onNotificationIcon,
	RefreshControl,
	disableBack = false,
	animationRange = [40, 110],
	isMediaScreen = false,
	BgImage,
	onBack,
	onAniCard,
}: FadeHeaderProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<any>>();
	const { colors } = useAppTheme();
	const { headerStyle, headerTitleStyle, bgImageStyle, headerActionStyle, scrollHandler } =
		useHeaderAnim(animationRange[0], animationRange[1]);
	const { userID } = useAuthStore().anilist;
	const { navAnimation } = useSettingsStore();

	const notifRotation = useSharedValue(0);

	const animatedNotifStyle = useAnimatedStyle(() => ({
		transform: [{ rotateZ: `${notifRotation.value}deg` }],
	}));

	const handleNotifPress = () => {
		notifRotation.value = 0;
		onNotificationIcon();
	};

	useEffect(() => {
		if (newNotifs && notificationIcon) {
			notifRotation.value = withRepeat(
				withSequence(
					// deviate left to start from -ANGLE
					withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
					// wobble between -ANGLE and ANGLE 7 times
					withRepeat(
						withTiming(ANGLE, {
							duration: TIME,
							easing: EASING,
						}),
						7,
						true,
					),
					// go back to 0 at the end
					withTiming(0, { duration: TIME / 2, easing: EASING }),
				),
				-1,
			);
		}
	}, [newNotifs, notificationIcon]);

	const Header = () => {
		return (
			<Animated.View style={[headerStyle]}>
				<Appbar.Header style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
					{navigation.canGoBack && !disableBack && (
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
									onBack ? onBack() : null;
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
					{shareLink && (
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
							<Animated.View style={[animatedNotifStyle]}>
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
		return <BgImage style={bgImageStyle} />;
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
	imageUrl: string;
	aspectRatio: number;
	titleHeight?: number;
	children: ReactNode;
}) => {
	const { width } = useWindowDimensions();
	const [imageHeight, setImageHeight] = useState<number>(0);
	return (
		<FadeHeaderProvider
			animationRange={[width / aspectRatio, width / aspectRatio + titleHeight]}
			title={title}
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
			<Appbar.Action icon={render_switch_icon} onPress={onRenderSwitch} />
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
}: {
	title?: string;
	isViewer?: boolean;
	openFilter?: () => void;
	onRefresh: () => void;
}) => {
	const { query, updateListFilter } = useListFilterStore();
	const { colors } = useAppTheme();
	const [isOpen, setIsOpen] = useState(false);

	useFocusEffect(() => {
		const backAction = () => {
			setIsOpen((prev) => {
				if (prev === false) {
					router.back();
				} else {
					return false;
				}
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
						value={query}
						onChangeText={(txt) => {
							updateListFilter({ query: txt });
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
					SheetManager.show('DisplayConfigSheet', { payload: { type: 'list' } })
				}
			/>
			{/* {!!openFilter && <Appbar.Action icon="filter-variant" onPress={openFilter} />} */}
			{/* <Appbar.Action icon="filter-outline" onPress={openFilter} /> */}
		</Appbar.Header>
	);
};

export const FavoritesHeader = ({ navigation, options, route }: NativeStackHeaderProps) => {
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
					SheetManager.show('DisplayConfigSheet', { payload: { type: 'list' } })
				}
			/>
		</Appbar.Header>
	);
};

type StudioHeaderProps = NativeStackHeaderProps & {
	isFav: boolean;
	id: number;
};
export const StudioHeader = ({
	navigation,
	options,
	route,
	back,
	isFav,
	id,
}: StudioHeaderProps) => {
	const shareLink = 'https://anilist.co/studio/' + id;
	const title = getHeaderTitle(options, route.name);
	const { mutateAsync } = useToggleFavMutation();
	// const [fav, setFav] = useState(isFav);

	const onFavToggle = async () => {
		const res = await mutateAsync({ studioId: id });
		// setFav(
		// 	res.ToggleFavourite.studios?.edges.find((s) => s?.node?.id === id)?.node?.isFavourite ??
		// 		false,
		// );
	};

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
					SheetManager.show('DisplayConfigSheet', { payload: { type: 'list' } })
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
	ratings,
	onRatingSelect,
}: NativeStackHeaderProps & {
	ratings: string[];
	onRatingSelect: (newRatings: string[]) => void;
}) => {
	const title = getHeaderTitle(options, route.name);

	return (
		<Appbar.Header mode="center-aligned" elevated>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} titleStyle={{ textTransform: 'capitalize' }} />
			<Appbar.Action
				icon={'filter-outline'}
				onPress={() =>
					SheetManager.show('NekosApiSheet', {
						payload: { ratings: ratings, onRatingSelect },
					})
				}
			/>
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
