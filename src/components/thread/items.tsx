import {
	LikeableType,
	ThreadCategory,
	ThreadComment,
	ThreadDetailQuery,
	ThreadsOverviewQuery,
	useToggleLikeMutation,
	useToggleThreadSubscriptionMutation,
} from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { getTimeUntil } from '@/utils';
import { router } from 'expo-router';
import { Pressable, View, ViewStyle } from 'react-native';
import { Avatar, Button, Chip, Divider, Icon, IconButton, Surface, Text } from 'react-native-paper';
import { useAuthStore } from '@/store/authStore';
import AniListMarkdownViewer from '../markdown/renderer';
import ViewShot from 'react-native-view-shot';
import { useScreenshot } from '@/hooks/useScreenshot';
import { SheetManager } from 'react-native-actions-sheet';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDeleteActivityItemInvalidateMutation } from '@/api/anilist/extended';
import { sendErrorMessage, sendToast } from '@/utils/toast';

type ThreadItemHeaderProps = {
	createdAt: number;
	user: ThreadDetailQuery['Thread']['user'] | ThreadComment['user'];
};
export const ThreadItemHeader = ({ user, createdAt }: ThreadItemHeaderProps) => {
	const { colors } = useAppTheme();

	const onUserPress = () => {
		router.navigate(`/user/${user?.id}`);
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				paddingVertical: 8,
			}}
		>
			<View
				style={{
					borderRadius: 12,
					overflow: 'hidden',
				}}
			>
				<Pressable
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						gap: 12,
						padding: 4,
					}}
					onPress={onUserPress}
					android_ripple={{
						color: colors.primary,
						foreground: true,
						borderless: true,
					}}
				>
					<Avatar.Image size={42} source={{ uri: user?.avatar?.large }} />
					<Text>{user?.name}</Text>
				</Pressable>
			</View>
			<View>
				<Text>{getTimeUntil(createdAt, 'createdAt')}</Text>
			</View>
		</View>
	);
};

export const ThreadItemFooter = ({
	id,
	categories,
	viewCount,
	likeCount,
	isLiked,
	isSubscribed,
	isReply,
	replyCount,
	isMain,
	isViewerActivity,
}: {
	id: number;
	categories?: ThreadCategory[];
	viewCount?: number;
	likeCount?: number;
	isSubscribed?: boolean;
	isLiked?: boolean;
	isReply: boolean;
	replyCount?: number;
	isMain?: boolean;
	isViewerActivity?: boolean;
}) => {
	const { colors } = useAppTheme();
	const userId = useAuthStore(useShallow((state) => state.anilist.userID));
	const toggleLikeMutation = useToggleLikeMutation();
	const toggleSubscribeMutation = useToggleThreadSubscriptionMutation();
	const { mutateAsync: deleteActivity } = useDeleteActivityItemInvalidateMutation();
	const [isLikedMutated, setIsLikedMutated] = useState<{ isLiked: boolean; likeCount: number }>({
		isLiked,
		likeCount,
	});
	const [isSubscribedMutated, setIsSubscribedMutated] = useState(isSubscribed);

	const onSubscribePress = () => {
		toggleSubscribeMutation?.mutate(
			{ subscribe: !isSubscribedMutated, threadId: id },
			{
				onSuccess(data) {
					setIsSubscribedMutated(data?.ToggleThreadSubscription?.isSubscribed);
				},
			},
		);
	};

	const onLikePress = () => {
		toggleLikeMutation?.mutate(
			{
				id: id,
				type: isReply ? LikeableType.ThreadComment : LikeableType.Thread,
			},
			{
				onSuccess(data) {
					setIsLikedMutated({
						likeCount: data?.ToggleLikeV2?.likeCount,
						isLiked: data?.ToggleLikeV2?.isLiked,
					});
				},
			},
		);
	};

	const onActivityDelete = async () => {
		try {
			await deleteActivity({ id: id });
			sendToast('Activity Deleted!');
		} catch {
			sendErrorMessage('Failed to delete');
		}
	};

	return (
		<View>
			{categories && (
				<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingTop: 12 }}>
					{categories?.map((cat, idx) => <Chip key={idx}>{cat.name}</Chip>)}
				</View>
			)}
			<View
				style={{
					flexDirection: 'row',
					justifyContent: viewCount ? 'space-between' : 'flex-end',
					alignItems: 'center',
					paddingTop: 6,
					paddingHorizontal: 6,
				}}
			>
				{isViewerActivity && (
					<View style={{ alignItems: 'flex-start', flex: 1, width: '100%' }}>
						<IconButton icon={'trash-can-outline'} onPress={onActivityDelete} />
					</View>
				)}
				{viewCount ? (
					<View style={{ justifyContent: 'center' }}>
						<Text>
							<Icon source={'eye-outline'} size={14} />
							{` ${viewCount}`}
						</Text>
					</View>
				) : replyCount && !isMain ? (
					<View style={{ justifyContent: 'center' }}>
						<Button
							onPress={() => router.navigate(`/thread/comment/${id}`)}
						>{`${replyCount} ${replyCount > 1 ? 'replies' : 'reply'}`}</Button>
						{/* <Text>{`${replyCount} ${replyCount > 1 ? 'replies' : 'reply'}`}</Text> */}
					</View>
				) : null}
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					{/* <View>
						<IconButton
							icon={'download-outline'}
							rippleColor={'transparent'}
							onPress={async () => {
								setIsScreenshotting(true);
								await onScreenshot();
								setIsScreenshotting(false);
							}}
							style={{ display: isScreenshotting ? 'none' : undefined }}
							disabled={!onScreenshot}
						/>
					</View> */}
					{!isReply && (
						<Button
							compact
							icon={isSubscribedMutated && 'check'}
							onPress={onSubscribePress}
							disabled={!userId}
						>
							{isSubscribedMutated ? 'Subscribed' : 'Subscribe'}
						</Button>
					)}
					<View>
						<IconButton
							icon={isLikedMutated.isLiked ? 'heart' : 'heart-outline'}
							onPress={onLikePress}
							selected={isLikedMutated.isLiked}
							disabled={!userId || toggleLikeMutation.isPending}
						/>
						{isLikedMutated.likeCount ? (
							<View
								style={{
									position: 'absolute',
									top: 0,
									right: 0,
									backgroundColor: colors.secondaryContainer,
									paddingHorizontal: 4,
									borderRadius: 8,
								}}
							>
								<Text
									variant="labelSmall"
									style={{ color: colors.onSecondaryContainer }}
								>
									{isLikedMutated.likeCount}
								</Text>
							</View>
						) : null}
					</View>
					{/* {!isReply && <IconButton icon={'comment-outline'} />} */}
				</View>
			</View>
		</View>
	);
};

type ThreadItemBodyProps = {
	isHtml?: boolean;
	body: string;
	coverImage?: string;
	onImagePress?: () => void;
};
export const ThreadItemBody = ({
	body,
	coverImage,
	onImagePress,
	isHtml = true,
}: ThreadItemBodyProps) => {
	const { colors } = useAppTheme();
	return (
		<Surface
			mode="elevated"
			style={{ backgroundColor: colors.elevation.level1, padding: 8, borderRadius: 8 }}
		>
			{coverImage ? (
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<Pressable onPress={onImagePress}>
						<Image
							source={{ uri: coverImage }}
							style={{ width: 80, aspectRatio: 2 / 3, borderRadius: 6 }}
						/>
					</Pressable>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ paddingHorizontal: 6 }}>{body}</Text>
					</View>
				</View>
			) : (
				<View>{isHtml ? <AniListMarkdownViewer body={body} /> : <Text>{body}</Text>}</View>
			)}
		</Surface>
	);
};

export const ThreadItem = ({
	id,
	user,
	body,
	likeCount,
	categories,
	viewCount,
	createdAt,
	isLiked,
	isSubscribed,
	isReply,
	replyCount,
	isMain,
	coverImage,
	onImagePress,
	isHtml = true,
	isViewerActivity = false,
}: {
	id: number;
	body: string;
	isHtml?: boolean;
	categories?: ThreadCategory[];
	likeCount: number;
	viewCount?: number;
	user?: ThreadDetailQuery['Thread']['user'] | ThreadComment['user'];
	createdAt: number;
	isSubscribed?: boolean;
	isLiked?: boolean;
	isReply: boolean;
	replyCount?: number;
	isMain?: boolean;
	coverImage?: string;
	isViewerActivity?: boolean;
	onImagePress?: () => void;
}) => {
	const { viewshotRef } = useScreenshot();
	const { colors } = useAppTheme();

	return (
		<ViewShot
			ref={viewshotRef}
			style={{ backgroundColor: colors.background, paddingHorizontal: 12 }}
			options={{ fileName: `${user?.name}-${id}`, quality: 1 }}
		>
			<ThreadItemHeader user={user} createdAt={createdAt} />
			<ThreadItemBody
				body={body}
				isHtml={isHtml}
				coverImage={coverImage}
				onImagePress={onImagePress}
			/>
			<ThreadItemFooter
				id={id}
				categories={categories}
				likeCount={likeCount}
				viewCount={viewCount}
				isLiked={isLiked}
				isSubscribed={isSubscribed}
				isReply={isReply}
				replyCount={replyCount}
				isViewerActivity={isViewerActivity}
				isMain={isMain}
			/>
			{isReply && <Divider style={{ width: '95%', alignSelf: 'center' }} />}
		</ViewShot>
	);
};

export const ThreadOverviewItem = ({
	item,
	containerStyle,
	onSelect,
}: {
	item: ThreadsOverviewQuery['Page']['threads'][0];
	onSelect: () => void;
	containerStyle?: ViewStyle;
}) => {
	const { colors } = useAppTheme();
	return (
		<Surface
			mode="elevated"
			style={[
				{ borderRadius: 8, marginRight: 8, width: 320, height: 140, overflow: 'hidden' },
				containerStyle,
			]}
		>
			<Pressable
				style={{ flex: 1, padding: 8 }}
				android_ripple={{ foreground: true, borderless: false, color: colors.primary }}
				onPress={onSelect}
				onLongPress={() =>
					SheetManager.show('ThreadOverviewSheet', { payload: { data: item } })
				}
			>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'flex-end',
						paddingBottom: 6,
					}}
				>
					<View
						style={{
							height: 24,
							justifyContent: 'center',
							padding: 4,
							paddingHorizontal: 6,
							borderRadius: 12,
							backgroundColor: colors.surfaceVariant,
						}}
					>
						<Text variant="labelSmall">{item.categories[0]?.name}</Text>
					</View>
				</View>
				<View style={{ flexDirection: 'row' }}>
					{/* <Avatar.Image size={42} source={{ uri: item.user.avatar?.large }} /> */}
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							flexWrap: 'wrap',
							paddingHorizontal: 6,
							paddingLeft: 8,
						}}
					>
						<Text>{item.title}</Text>
					</View>
				</View>

				<View
					style={{
						justifyContent: 'flex-end',
						paddingTop: 6,
						flex: 1,
					}}
				>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Avatar.Image source={{ uri: item.user?.avatar?.large }} size={24} />
							<Text variant="labelMedium" style={{ paddingLeft: 4 }}>
								By {item.user?.name}
							</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text variant="labelSmall" style={{ marginRight: 6 }}>
								<Icon source={'eye'} size={undefined} />
								{` ${item.viewCount.toLocaleString()}`}
							</Text>
							<Text variant="labelSmall">
								<Icon source={'comment'} size={undefined} />
								{` ${item.replyCount.toLocaleString()}`}
							</Text>
						</View>
					</View>
				</View>
			</Pressable>
		</Surface>
	);
};
