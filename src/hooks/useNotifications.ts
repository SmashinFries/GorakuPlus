import { useNotificationStore } from '@/store/notifications/notificationStore';
import { useEffect, useState } from 'react';
import notifee from '@notifee/react-native';
import { GetNotificationsQuery } from '@/api/anilist/__genereated__/gql';
import { NotificationPressActionIds } from '@/utils/notifications/backgroundFetch';
import { router } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';

const useNotifications = () => {
	const [loading, setLoading] = useState(true);

	const { enabled, isRegistered } = useNotificationStore(
		useShallow((state) => ({
			enabled: state.enabled,
			isRegistered: state.isRegistered,
		})),
	);

	// Bootstrap sequence function
	const bootstrap = async () => {
		const initialNotification = await notifee.getInitialNotification();
		if (initialNotification) {
			const data = initialNotification?.notification
				?.data as GetNotificationsQuery['Page']['notifications'][0];
			switch (initialNotification.pressAction.id as NotificationPressActionIds) {
				case 'activity-route':
					// @ts-ignore
					router.navigate(
						// @ts-ignore
						`/activity/${(data as GetNotificationsQuery['Page']['notifications'][0])?.activityId}`,
					);
					break;
				case 'media-route':
					// @ts-ignore
					router.navigate(`/${data.media?.type.toLowercase()}/${data.media?.id}`);
					break;
				case 'user-route':
					// @ts-ignore
					router.navigate(`/user/${data.user?.id}/${data.user?.name}`);
				default:
					break;
			}
		}
	};

	useEffect(() => {
		if (enabled && isRegistered) {
			bootstrap()
				.then(() => setLoading(false))
				.catch(console.error);
		} else {
			setLoading(false);
		}
		// return notifee.onForegroundEvent(({ type, detail }) => {
		//     console.log('Found Notif Interaction!', type);
		//     switch (type) {
		//         case EventType.DISMISSED:
		//             // console.log('User dismissed notification', detail.notification);

		//             break;
		//         case EventType.PRESS:
		//             console.log('User pressed notification', detail.notification);
		//             link('/user');
		//             break;
		//         case EventType.DELIVERED:
		//             // console.log('User pressed an action on the notification', detail.notification);
		//             break;
		//     }
		// });
	}, [enabled, isRegistered]);

	// useEffect(() => {
	//     createNotifChannels();
	//     // if (enabled?.length > 0 && !isRegistered) {
	//     //     registerBackgroundFetchAsync();
	//     //     dispatch(setRegisteredState(true));
	//     // }
	// }, []);

	return { loading };
};

export default useNotifications;
