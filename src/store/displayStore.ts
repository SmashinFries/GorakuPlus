import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import { create } from 'zustand';

const storage = new MMKV({
	id: 'display-storage',
});
const DisplayStorage = getZustandStorage(storage);

// EXPAND AT SOME POINT!
export type DisplayMode = 'COMPACT' | 'LIST';
export type DisplayState = {
	calendar: {
		list_only?: boolean;
		mode?: DisplayMode;
		grid_size?: number;
	};
	list: {
		mode?: DisplayMode;
		grid_size?: number;
	};
	search: {
		mode?: DisplayMode;
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
		grid_size: 3,
		mode: 'COMPACT',
	},
	list: {
		grid_size: 3,
		mode: 'COMPACT',
	},
	search: {
		grid_size: 3,
		mode: 'COMPACT',
	},
};

export const useDisplayStore = create<DisplayState & DisplayActions>()(
	persist(
		(set, _get) => ({
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
