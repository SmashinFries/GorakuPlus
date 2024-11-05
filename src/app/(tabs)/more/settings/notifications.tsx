import { FetchIntervalDialog } from '@/components/more/settings/notifications/dialog';
import { MaterialSwitchListItem } from '@/components/switch';
import { useNotificationStore } from '@/store/notifications/notificationStore';
import { registerBGFetch, unregisterBGFetch } from '@/utils/notifications/backgroundFetch';
import { useCallback, useState } from 'react';
import { Linking, ScrollView } from 'react-native';
import { List, Portal, Text } from 'react-native-paper';
import Constants from 'expo-constants';

const NotificationsPage = () => {
	const [intervalVis, setIntervalVis] = useState(false);

	const { fetchInterval, isRegistered, setRegisteredState, setNotifInterval, toggleNotifs } =
		useNotificationStore();

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
		toggleNotifs();
	}, [fetchInterval, isRegistered]);

	const updateFetchInterval = useCallback((hour: number) => {
		setNotifInterval(hour);
		registerBGFetch(hour);
	}, []);

	const openIntervalDialog = useCallback(() => setIntervalVis(true), []);
	const dismissIntervalDialog = useCallback(() => setIntervalVis(false), []);

	return (
		<ScrollView>
			<MaterialSwitchListItem
				title="Allow Notifications"
				selected={isRegistered}
				onPress={toggleNotifications}
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
				onPress={async () =>
					Linking.sendIntent('android.settings.APP_NOTIFICATION_SETTINGS', [
						{
							key: 'android.provider.extra.APP_PACKAGE',
							value: Constants.expoConfig.android?.package,
						},
					])
				}
			/>
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
