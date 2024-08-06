import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import { MediaListSort, MediaTag } from '@/api/anilist/__genereated__/gql';

const storage = new MMKV({
	id: 'display-storage',
});
const DisplayStorage = getZustandStorage(storage);

// EXPAND AT SOME POINT!
type DisplayState = {
	calendar: {
		list_only?: boolean;
		grid_size?: number;
	};
	list: {
		grid_size?: number;
	};
	search: {
		grid_size?: number;
	};
};

type DisplayActions = {
	updateCalendarDisplay: (options: DisplayState['calendar']) => void;
	updateListDisplay: (options: DisplayState['list']) => void;
	updateSearchDisplay: (options: DisplayState['search']) => void;
};

const initialState: DisplayState = {
	calendar: {
		list_only: false,
		grid_size: 2,
	},
	list: {
		grid_size: 2,
	},
	search: {
		grid_size: 2,
	},
};

export const useDisplayStore = create<DisplayState & DisplayActions>()(
	persist(
		(set, get) => ({
			...initialState,
			updateCalendarDisplay(options) {
				set((state) => ({ calendar: { ...state.calendar, ...options } }));
			},
			updateListDisplay(options) {
				set((state) => ({ list: { ...state.list, ...options } }));
			},
			updateSearchDisplay(options) {
				set((state) => ({ search: { ...state.search, ...options } }));
			},
		}),
		{
			name: 'display-storage',
			storage: createJSONStorage(() => DisplayStorage),
		},
	),
);
