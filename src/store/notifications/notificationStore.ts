import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from '../helpers/mmkv-storage';
import { NotifTypes } from './types';

const storage = new MMKV({ id: 'notification-storage' });
const NotificationStorage = getZustandStorage(storage);

type NotificationState = {
	isRegistered?: boolean;
	enabled?: NotifTypes[];
	fetchInterval?: number;
};
type NotificationAction = {
	addEnabledNotif: (type: NotifTypes) => void;
	removeEnabledNotif: (type: NotifTypes) => void;
	enableAllNotifs: () => void;
	disableAllNotifs: () => void;
	setNotifInterval: (interval: number) => void;
	setRegisteredState: (isRegistered: boolean) => void;
};

const initialEnabled: NotifTypes[] = [
	'AiringNotification',
	'ActivityLikeNotification',
	'ActivityMentionNotification',
	'ActivityMessageNotification',
	'ActivityReplyNotification',
	'FollowingNotification',
	'MediaDataChangeNotification',
	'MediaDeletionNotification',
	'MediaMergeNotification',
	'RelatedMediaAdditionNotification',
];

export const useNotificationStore = create<NotificationState & NotificationAction>()(
	persist(
		(set, get) => ({
			isRegistered: false,
			enabled: initialEnabled,
			fetchInterval: 6,
			addEnabledNotif(type) {
				set((state) => ({ enabled: [...state.enabled, type] }));
			},
			disableAllNotifs() {
				set({ enabled: [] });
			},
			enableAllNotifs() {
				set({ enabled: initialEnabled });
			},
			removeEnabledNotif(type) {
				set((state) => {
					const newEnabled = state.enabled.splice(state.enabled.indexOf(type), 1);
					return { enabled: newEnabled };
				});
			},
			setNotifInterval(interval) {
				set({ fetchInterval: interval });
			},
			setRegisteredState(isRegistered) {
				set({ isRegistered: isRegistered });
			},
		}),
		{
			name: 'notification-storage',
			storage: createJSONStorage(() => NotificationStorage),
		},
	),
);
