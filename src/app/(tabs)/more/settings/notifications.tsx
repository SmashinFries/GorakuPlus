import { GetNotificationsQuery } from '@/api/anilist/__genereated__/gql';
import { FetchIntervalDialog } from '@/components/more/settings/notifications/dialog';
import { MaterialSwitchListItem } from '@/components/switch';
import { ListSubheader } from '@/components/titles';
import { useNotificationStore } from '@/store/notifications/notificationStore';
import { NotifTypes } from '@/store/notifications/types';
import { registerBGFetch, unregisterBGFetch } from '@/utils/notifications/backgroundFetch';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { Divider, List, Portal, Text } from 'react-native-paper';

type NotifOption = {
	type: GetNotificationsQuery['Page']['notifications'][0]['__typename'];
	title: string;
};

const notifMedia: NotifOption[] = [
	{
		type: 'AiringNotification',
		title: 'Airing',
	},
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
		title: 'Activity Likes',
	},
	{
		type: 'ActivityMentionNotification',
		title: 'Activity Mentions',
	},
	{
		type: 'ActivityMessageNotification',
		title: 'Activity Messages',
	},
	{
		type: 'ActivityReplyNotification',
		title: 'Activity Replies',
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
		console.log(add);
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
					fluid
					title={type.title}
					selected={enabled?.includes(type.type)}
					onPress={() => updateEnabled(type.type, !enabled?.includes(type.type))}
					disabled={!isRegistered}
				/>
				// <List.Item
				// 	key={idx}
				// 	title={type.title}
				// 	right={() => (
				// 		<GorakuSwitch
				// 			value={enabled?.includes(type.type)}
				// 			onValueChange={(value) => updateEnabled(type.type, value)}
				// 			disabled={!isRegistered}
				// 		/>
				// 	)}
				// />
			);
		},
		[enabled, isRegistered],
	);

	return (
		<ScrollView>
			<MaterialSwitchListItem
				title="Allow Notifications"
				fluid
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
			<Divider />
			<List.Section>
				<ListSubheader title={'Follows'} />
				{notifFollow.map(NotifSwitch)}
				<ListSubheader title={'Media'} />
				{notifMedia.map(NotifSwitch)}
				<ListSubheader title={'Activity'} />
				{notifActivity.map(NotifSwitch)}
			</List.Section>
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
