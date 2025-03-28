import { UserSearchMetaFragment, useToggleFollowMutation } from '@/api/anilist/__genereated__/gql';
import AniListMarkdownViewer from '@/components/markdown/renderer';
import { BottomSheetAccordion, GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { copyToClipboard, getTimeUntil } from '@/utils';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { ScrollView, Share, View } from 'react-native';
import { ActivityIndicator, Avatar, Divider, Icon, List, Text } from 'react-native-paper';

const UserQuickActionSheet = () => {
	const { params: paramsRaw } = useLocalSearchParams<{ params: string }>();
	const params = JSON.parse(paramsRaw) as UserSearchMetaFragment;
	const sheet = useRef<TrueSheet>(null);
	const scrollRef = useRef<ScrollView>(null);
	const [isFollowingState, setIsFollowingState] = useState(params?.isFollowing);
	const { mutateAsync, isPending } = useToggleFollowMutation();

	const onToggleFollow = async () => {
		const res = await mutateAsync({ userId: params?.id });
		setIsFollowingState(res.ToggleFollow?.isFollowing);
	};

	const viewUser = () => {
		router.back();
		router.navigate(`/user/${params.name}`);
	};

	const shareLink = async () => {
		params?.siteUrl && (await Share.share({ url: params.siteUrl, message: params.siteUrl }));
		sheet.current?.dismiss();
	};

	return (
		<GlobalBottomSheetParent
			sizes={['auto', 'large']}
			name="UserQuickActionSheet"
			scrollRef={scrollRef}
			scrollable
		>
			<View>
				<List.Item
					title={isFollowingState ? 'Unfollow' : 'Follow'}
					onPress={onToggleFollow}
					left={(props) => (
						<List.Icon
							{...props}
							icon={
								isPending
									? () => <ActivityIndicator />
									: isFollowingState
										? 'account-minus-outline'
										: 'account-plus-outline'
							}
						/>
					)}
				/>
				<List.Item
					title={`View User`}
					titleStyle={{ textTransform: 'capitalize' }}
					onPress={viewUser}
					left={(props) => <List.Icon {...props} icon={'account-outline'} />}
				/>
				<List.Item
					title={'Share'}
					left={(props) => <List.Icon {...props} icon="share-variant-outline" />}
					onPress={shareLink}
				/>
			</View>
			<BottomSheetAccordion title="Preview">
				<Divider />
				<View
					style={{
						flexDirection: 'row',
						paddingTop: 12,
						paddingLeft: 12,
						alignItems: 'flex-start',
					}}
				>
					<Avatar.Image
						source={{
							uri: params?.avatar?.large ?? undefined,
						}}
						size={100}
					/>
					<View style={{ flex: 1, paddingHorizontal: 12 }}>
						<Text
							variant="titleLarge"
							onLongPress={() => copyToClipboard(params?.name)}
						>
							{params?.name}
						</Text>
						<View style={{ gap: 6 }}>
							{params?.isFollower ? (
								<Text>
									<Icon source={'account-eye-outline'} size={16} />
									{' Follows you'}
								</Text>
							) : null}
							{params?.createdAt ? (
								<Text>
									<Icon source={'calendar'} size={16} />
									{` Created ${getTimeUntil(params.createdAt, 'createdAt')}`}
								</Text>
							) : null}
						</View>
					</View>
				</View>
				{params?.aboutHTML ? (
					<View style={{ paddingTop: 18, paddingHorizontal: 10 }}>
						<AniListMarkdownViewer body={params?.aboutHTML} />
					</View>
				) : null}
			</BottomSheetAccordion>
		</GlobalBottomSheetParent>
	);
};

export default UserQuickActionSheet;
