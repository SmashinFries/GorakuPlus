import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import { ScoreVisualType } from './settings/types';
import { create } from 'zustand';

const storage = new MMKV({ id: 'card-visual-storage' });
const CardVisualStorage = getZustandStorage(storage);

export type ListStatusMode = 'bar' | 'dot';
type CardVisualState = {
	listStatusMode?: ListStatusMode;
	scoreVisualType?: ScoreVisualType;
	defaultScore?: 'average' | 'mean';
};

type CardVisualAction = {
	setCardVisual: (entries: CardVisualState) => void;
};

export const useCardVisualStore = create<CardVisualState & CardVisualAction>()(
	persist(
		(set, _get) => ({
			scoreVisualType: 'healthbar-full',
			listStatusMode: 'dot',
			defaultScore: 'average',
			setCardVisual(entries) {
				set((state) => ({ ...state, ...entries }));
			},
		}),
		{
			name: 'card-visual-storage',
			storage: createJSONStorage(() => CardVisualStorage),
		},
	),
);
