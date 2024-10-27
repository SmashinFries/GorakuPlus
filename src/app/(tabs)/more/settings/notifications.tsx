import { GetNotificationsQuery } from '@/api/anilist/__genereated__/gql';
import { FetchIntervalDialog } from '@/components/more/settings/notifications/dialog';
import { MaterialSwitchListItem } from '@/components/switch';
import { ListSubheader } from '@/components/titles';
import { useNotificationStore } from '@/store/notifications/notificationStore';
import { NotifTypes } from '@/store/notifications/types';
import { registerBGFetch, unregisterBGFetch } from '@/utils/notifications/backgroundFetch';
import { ActivityAction, startActivityAsync } from 'expo-intent-launcher';
import { useCallback, useState } from 'react';
import { Linking, ScrollView } from 'react-native';
import { Divider, List, Portal, Text } from 'react-native-paper';
import Constants from 'expo-constants';

type NotifOption = {
	type: GetNotificationsQuery['Page']['notifications'][0]['__typename'];
	title: string;
};

const notifMedia: NotifOption[] = [
	{
		type: 'MediaDataChangeNotification',
		title: 'Media Data Changes',
	},
	{
		type: 'MediaDeletionNotification',
		title: 'Media Deletions',
	},
	{
		type: 'MediaMergeNotification',
		title: 'Media Merges',
	},
	{
		type: 'RelatedMediaAdditionNotification',
		title: 'Related Media Additions',
	},
];

const notifActivity: NotifOption[] = [
	{
		type: 'ActivityLikeNotification',
		title: 'Likes',
	},
	{
		type: 'ActivityMentionNotification',
		title: 'Mentions',
	},
	{
		type: 'ActivityMessageNotification',
		title: 'Messages',
	},
	{
		type: 'ActivityReplyNotification',
		title: 'Replies',
	},
	{
		type: 'ActivityReplyLikeNotification',
		title: 'Reply Likes',
	},
	{
		type: 'ActivityReplySubscribedNotification',
		title: 'Reply Subscribed',
	},
];
const notifFollow: NotifOption[] = [
	{
		type: 'FollowingNotification',
		title: 'Follows',
	},
];

const NotificationsPage = () => {
	const [intervalVis, setIntervalVis] = useState(false);

	const {
		enabled,
		fetchInterval,
		isRegistered,
		setRegisteredState,
		setNotifInterval,
		addEnabledNotif,
		removeEnabledNotif,
		disableAllNotifs,
		enableAllNotifs,
	} = useNotificationStore();

	const toggleNotifications = useCallback(() => {
		const value = !isRegistered;
		if (value) {
			setRegisteredState(true);
			registerBGFetch(fetchInterval);
		} else {
			unregisterBGFetch();
			// dispatch(disableAllNotifs());
			setRegisteredState(false);
		}
	}, [fetchInterval, isRegistered]);

	const updateFetchInterval = useCallback((hour: number) => {
		setNotifInterval(hour);
		registerBGFetch(hour);
	}, []);

	const updateEnabled = useCallback((type: NotifTypes, add: boolean) => {
		if (add) {
			addEnabledNotif(type);
		} else {
			removeEnabledNotif(type);
		}
	}, []);

	const openIntervalDialog = useCallback(() => setIntervalVis(true), []);
	const dismissIntervalDialog = useCallback(() => setIntervalVis(false), []);

	const NotifSwitch = useCallback(
		(type: NotifOption, idx: number) => {
			return (
				<MaterialSwitchListItem
					key={idx}
					title={type.title}
					selected={enabled?.includes(type.type)}
					onPress={() => updateEnabled(type.type, !enabled?.includes(type.type))}
					disabled={!isRegistered}
				/>
			);
		},
		[enabled, isRegistered],
	);

	return (
		<ScrollView>
			<MaterialSwitchListItem
				title="Allow Notifications"
				selected={isRegistered}
				onPress={toggleNotifications}
			/>
			<List.Item
				title="Toggle All Notifications"
				onPress={() => (enabled.length > 0 ? disableAllNotifs() : enableAllNotifs())}
				// descriptionStyle={{ textTransform: 'capitalize' }}
			/>
			<List.Item
				title="Check Frequency"
				description={'# of hours before checking notifications again'}
				right={() => <Text>{fetchInterval}</Text>}
				onPress={openIntervalDialog}
				// descriptionStyle={{ textTransform: 'capitalize' }}
			/>
			<List.Item
				title={'Open Settings'}
				right={(props) => <List.Icon icon={'launch'} {...props} />}
				onPress={
					async () =>
						Linking.sendIntent('android.settings.APP_NOTIFICATION_SETTINGS', [
							{
								key: 'android.provider.extra.APP_PACKAGE',
								value: Constants.expoConfig.android?.package,
							},
						])
					// await startActivityAsync(ActivityAction.APP_NOTIFICATION_SETTINGS, {
					// 	packageName: 'com.kuzutech.goraku',
					// 	flags: 268435456,
					// })
				}
				// onPress={() => console.log(Constants.expoConfig.android?.package)}
			/>
			{/* <Divider />
			<List.Section>
				<ListSubheader title={'Follows'} />
				{notifFollow.map(NotifSwitch)}
				<ListSubheader title={'Media'} />
				{notifMedia.map(NotifSwitch)}
				<ListSubheader title={'Activity'} />
				{notifActivity.map(NotifSwitch)}
			</List.Section> */}
			<Portal>
				<FetchIntervalDialog
					visible={intervalVis}
					onDismiss={dismissIntervalDialog}
					initialInterval={fetchInterval}
					updateInterval={updateFetchInterval}
				/>
			</Portal>
		</ScrollView>
	);
};

export default NotificationsPage;
