import notifee, { EventType } from '@notifee/react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { setRegisteredState } from '../store/slices/notifSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const useNotif = () => {
    const [loading, setLoading] = useState(true);

    const { enabled, isRegistered, fetchInterval } = useAppSelector(
        (state) => state.persistedNotifs,
    );
    const dispatch = useAppDispatch();

    // Bootstrap sequence function
    const bootstrap = async () => {
        const initialNotification = await notifee.getInitialNotification();

        if (initialNotification) {
            Linking.openURL('gorakuplus://user');
            // console.log(
            //     'Notification caused application to open',
            //     initialNotification.notification,
            // );
        }
    };

    const createNotifChannels = async () => {
        await notifee.requestPermission();
        await notifee.createChannelGroup({
            id: 'anilist-notifs-group',
            name: 'Anilist Group Notifications',
        });

        // Create a channel (required for Android)
        await notifee.createChannel({
            id: 'anilist-notifs',
            name: 'Anilist Notifications',
            vibration: true,
        });
    };

    const registerBackgroundFetchAsync = async () => {
        return BackgroundFetch.registerTaskAsync('Notifs', {
            minimumInterval: 3600 * fetchInterval,
            stopOnTerminate: false, // android only,
            startOnBoot: true, // android only
        });
    };

    // useEffect(() => {
    //     // bootstrap()
    //     //     .then(() => setLoading(false))
    //     //     .catch(console.error);

    //     return notifee.onForegroundEvent(({ type, detail }) => {
    //         console.log('Found Notif Interaction!', type);
    //         switch (type) {
    //             case EventType.DISMISSED:
    //                 // console.log('User dismissed notification', detail.notification);

    //                 break;
    //             case EventType.PRESS:
    //                 console.log('User pressed notification', detail.notification);
    //                 link('/user');
    //                 break;
    //             case EventType.DELIVERED:
    //                 // console.log('User pressed an action on the notification', detail.notification);
    //                 break;
    //         }
    //     });
    // }, []);

    // useEffect(() => {
    //     createNotifChannels();
    //     // if (enabled?.length > 0 && !isRegistered) {
    //     //     registerBackgroundFetchAsync();
    //     //     dispatch(setRegisteredState(true));
    //     // }
    // }, []);

    return { loading };
};

export default useNotif;
