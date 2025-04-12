import Animated from 'react-native-reanimated';
import { HeaderActionsProps } from './components/actions';
import { Appbar } from 'react-native-paper';

// export type MediaHeaderProps = {
// 	navigation: NativeStackNavigationProp<any>;
// 	title: string;
// 	headerTitleStyle?: any;
// 	headerActionStyle?: any;
// 	headerStyle?: any;
// 	// shareLink?: string;
// 	// streamingLinks?: NonNullable<AniMediaQuery['Media']>['externalLinks'];
// 	actions?: HeaderActionsProps['actions'];
// 	onBack?: () => void;
// 	// onEdit: () => void;
// 	// onAniCard?: () => void;
// };
// export const MediaHeader = ({
// 	navigation,
// 	title,
// 	// shareLink,
// 	headerActionStyle,
// 	headerStyle,
// 	headerTitleStyle,
// 	actions,
// 	// streamingLinks,
// 	onBack = () => null,
// 	// onEdit,
// 	// onAniCard = () => null,
// }: MediaHeaderProps) => {
// 	return (
// 		<Animated.View style={[headerStyle]}>
// 			<Appbar.Header style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
// 				<Animated.View
// 					style={[
// 						{
// 							borderRadius: 100,
// 							height: 42,
// 							width: 42,
// 							marginLeft: 5,
// 							justifyContent: 'center',
// 							alignItems: 'center',
// 						},
// 						headerActionStyle,
// 					]}
// 				>
// 					<Appbar.BackAction
// 						onPress={() => {
// 							navigation.goBack();
// 							onBack();
// 						}}
// 					/>
// 				</Animated.View>
// 				<Animated.View
// 					style={[
// 						headerTitleStyle,
// 						{
// 							flex: 1,
// 							height: '50%',
// 							justifyContent: 'center',
// 						},
// 					]}
// 				>
// 					<Appbar.Content
// 						title={title ?? ''}
// 						titleStyle={{ textTransform: 'capitalize' }}
// 					/>
// 				</Animated.View>
// 				{actions && (
// 					<HeaderActions actions={actions} headerActionStyle={headerActionStyle} />
// 				)}
// 				{/* {actions?.map((action, idx) => (
// 					<Animated.View key={idx} style={[HeaderStyles.icon, headerActionStyle]}>
// 						{(action.menuItems?.length ?? 0) > 0 ? (
// 							<Menu
// 								visible={idx === 0 ? menu1Vis : menu2Vis}
// 								onDismiss={() => {
// 									if (idx === 0) {
// 										setMenu1Vis(false);
// 									} else {
// 										setMenu2Vis(false);
// 									}
// 								}}
// 								anchor={
// 									<Appbar.Action
// 										icon={action.icon}
// 										onPress={() => {
// 											action.onPress?.();
// 											if (idx === 0) {
// 												setMenu1Vis(true);
// 											} else {
// 												setMenu2Vis(true);
// 											}
// 										}}
// 									/>
// 								}
// 							>
// 								{action.menuItems?.map((item, idx) => (
// 									<Menu.Item key={idx} {...item} />
// 								))}
// 							</Menu>
// 						) : (
// 							// <Menu
// 							// 	visible={streamVisible}
// 							// 	onDismiss={closeStreamMenu}
// 							// 	anchorPosition="bottom"
// 							// 	anchor={
// 							// 		<Appbar.Action
// 							// 			icon={
// 							// 				shareLink?.includes('anime')
// 							// 					? 'play-box-multiple-outline'
// 							// 					: 'book-open-page-variant-outline'
// 							// 			}
// 							// 			onPress={() => openStreamMenu()}
// 							// 		/>
// 							// 	}
// 							// >
// 							// 	{action.menuItems?.map(
// 							// 		(link, idx) =>
// 							// 			link && (
// 							// 				<Menu.Item
// 							// 					key={idx}
// 							// 					leadingIcon={
// 							// 						link.language
// 							// 							? (props) =>
// 							// 									link?.language && (
// 							// 										<Text {...props}>
// 							// 											{getStreamingSiteEmoji(
// 							// 												link?.language,
// 							// 											)}
// 							// 										</Text>
// 							// 									)
// 							// 							: undefined
// 							// 					}
// 							// 					trailingIcon={
// 							// 						link.icon
// 							// 							? (props) => (
// 							// 									<Icon
// 							// 										{...props}
// 							// 										source={{ uri: link.icon }}
// 							// 										color={
// 							// 											link?.color ?? props.color
// 							// 										}
// 							// 									/>
// 							// 								)
// 							// 							: undefined
// 							// 					}
// 							// 					onPress={() => openWebBrowser(link.url, true)}
// 							// 					title={link.site}
// 							// 				/>
// 							// 			),
// 							// 	)}
// 							// </Menu>
// 							<Appbar.Action icon={action.icon} onPress={action.onPress} />
// 						)}
// 					</Animated.View>
// 				))}
// 				{moreActions && (
// 					<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
// 						<Menu
// 							visible={moreVisible}
// 							onDismiss={closeMoreMenu}
// 							anchor={<Appbar.Action icon="dots-vertical" onPress={openMoreMenu} />}
// 						>
// 							{moreActions.map((item, idx) => (
// 								<MenuItem key={idx} {...item} />
// 							))}
// 						</Menu>
// 					</Animated.View>
// 				)} */}

// 				{/* {(streamingLinks?.length ?? 0) > 0 && (
// 					<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>

// 					</Animated.View>
// 				)} */}
// 				{/* {onEdit !== undefined && (!shareLink || (streamingLinks?.length ?? 0) < 1) && (
// 					<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
// 						<Appbar.Action icon="file-document-edit-outline" onPress={onEdit} />
// 					</Animated.View>
// 				)} */}
// 				{/* {!!shareLink && (onEdit === undefined || (streamingLinks?.length ?? 0) < 1) && (
// 					<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
// 						<Appbar.Action
// 							icon="share-variant-outline"
// 							onPress={() =>
// 								Share.share({
// 									url: shareLink,
// 									title: shareLink,
// 									message: shareLink,
// 								})
// 							}
// 							disabled={!shareLink}
// 						/>
// 					</Animated.View>
// 				)} */}
// 				{/* {!!shareLink && onEdit && (streamingLinks?.length ?? 0) > 0 && (
// 					<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
// 						<Menu
// 							visible={moreVisible}
// 							onDismiss={closeMoreMenu}
// 							anchorPosition="bottom"
// 							anchor={<Appbar.Action icon="dots-vertical" onPress={openMoreMenu} />}
// 						>
// 							<Menu.Item
// 								leadingIcon={'file-document-edit-outline'}
// 								onPress={onEdit}
// 								title={'Edit Data'}
// 							/>
// 							<Menu.Item
// 								leadingIcon={'share-variant-outline'}
// 								onPress={() =>
// 									Share.share({
// 										url: shareLink,
// 										title: shareLink,
// 										message: shareLink,
// 									})
// 								}
// 								title={'Share'}
// 							/>
// 							<Menu.Item
// 								leadingIcon={'card-text-outline'}
// 								onPress={() => {
// 									closeMoreMenu();
// 									onAniCard();
// 								}}
// 								title={'AniCard'}
// 							/>
// 						</Menu>
// 					</Animated.View>
// 				)} */}
// 			</Appbar.Header>
// 		</Animated.View>
// 	);
// };
