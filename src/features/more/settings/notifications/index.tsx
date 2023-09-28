import { ScrollView, View } from 'react-native';
import { Button, Divider, List, Portal, Switch, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as BackgroundFetch from 'expo-background-fetch';
import notifee from '@notifee/react-native';
import {
    NotifTypes,
    addEnabledNotif,
    disableAllNotifs,
    enableAllNotifs,
    removeEnabledNotif,
    setNotifInterval,
    setRegisteredState,
} from './notifSlice';
import {
    displayNotification,
    registerBGFetch,
    testAnilistFetchNotif,
    unregisterBGFetch,
} from './backgroundFetch';
import * as Linking from 'expo-linking';
import { useLinkTo } from '@react-navigation/native';
import { GetNotificationsQuery } from '../../../../app/services/anilist/generated-anilist';
import { ListSubheader } from '../../../../components/titles';
import { useCallback, useEffect, useState } from 'react';
import { FetchIntervalDialog } from './components/dialog';

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

const NotifScreen = () => {
    const [intervalVis, setIntervalVis] = useState(false);

    const { enabled, fetchInterval, isRegistered } = useAppSelector(
        (state) => state.persistedNotifs,
    );
    const dispatch = useAppDispatch();

    const toggleNotifications = useCallback(
        (value: boolean) => {
            if (value) {
                // dispatch(enableAllNotifs());
                dispatch(setRegisteredState(true));
                registerBGFetch(fetchInterval);
            } else {
                unregisterBGFetch();
                // dispatch(disableAllNotifs());
                dispatch(setRegisteredState(false));
            }
        },
        [fetchInterval],
    );

    const updateFetchInterval = useCallback((hour: number) => {
        dispatch(setNotifInterval(hour));
        registerBGFetch(hour);
    }, []);

    const updateEnabled = useCallback((type: NotifTypes, add: boolean) => {
        if (add) {
            dispatch(addEnabledNotif(type));
        } else {
            dispatch(removeEnabledNotif(type));
        }
    }, []);

    const openIntervalDialog = useCallback(() => setIntervalVis(true), []);
    const dismissIntervalDialog = useCallback(() => setIntervalVis(false), []);

    const NotifSwitch = useCallback(
        (type: NotifOption, idx: number) => {
            return (
                <List.Item
                    key={idx}
                    title={type.title}
                    right={() => (
                        <Switch
                            value={enabled?.includes(type.type)}
                            onValueChange={(value) => updateEnabled(type.type, value)}
                            disabled={!isRegistered}
                        />
                    )}
                />
            );
        },
        [enabled, isRegistered],
    );

    // const registerBackgroundFetchAsync = async () => {
    //     await notifee.requestPermission();
    //     dispatch(setRegisteredState(true));
    //     return BackgroundFetch.registerTaskAsync('Notifs', {
    //         minimumInterval: 60 * 1, // 2 minutes
    //         stopOnTerminate: false, // android only
    //         startOnBoot: true, // android only
    //     });
    // };

    // const unregisterBackgroundFetchAsync = async () => {
    //     dispatch(setRegisteredState(false));
    //     return BackgroundFetch.unregisterTaskAsync('Notifs');
    // };

    // const testNotif = async () => {
    //     await notifee.requestPermission();
    //     testAnilistFetchNotif();
    // };

    return (
        <ScrollView>
            <List.Item
                title="Allow Notifications"
                right={() => <Switch value={isRegistered} onValueChange={toggleNotifications} />}
                // descriptionStyle={{ textTransform: 'capitalize' }}
            />
            <List.Item
                title="Toggle All Notifications"
                onPress={() =>
                    enabled.length > 0 ? dispatch(disableAllNotifs()) : dispatch(enableAllNotifs())
                }
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

export default NotifScreen;
