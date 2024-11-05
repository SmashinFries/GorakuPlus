import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from '../helpers/mmkv-storage';
import { NotifTypes } from './types';
import { create } from 'zustand';

const storage = new MMKV({ id: 'notification-storage' });
const NotificationStorage = getZustandStorage(storage);

type NotificationState = {
	isRegistered?: boolean;
	enabled?: boolean;
	fetchInterval?: number;
};
type NotificationAction = {
	toggleNotifs: () => void;
	setNotifInterval: (interval: number) => void;
	setRegisteredState: (isRegistered: boolean) => void;
};

export const useNotificationStore = create<NotificationState & NotificationAction>()(
	persist(
		(set, _get) => ({
			isRegistered: false,
			enabled: false,
			fetchInterval: 6,
			toggleNotifs() {
				set((state) => ({ enabled: !state.enabled }));
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
