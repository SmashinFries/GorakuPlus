import { DisplayState, useDisplayStore } from '@/store/displayStore';
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

export const useColumns = (mode: keyof DisplayState, customGridSize?: number) => {
	const { grid_size, displayMode } = useDisplayStore(
		useShallow((state) => ({
			displayMode: state[mode].mode,
			grid_size: state[mode].grid_size,
		})),
	);
	const { width } = useWindowDimensions();
	const columns = useMemo(
		() => (displayMode === 'COMPACT' ? (customGridSize ?? grid_size) : 1),
		[displayMode, grid_size, customGridSize],
	);
	const itemWidth = useMemo(() => width / columns, [columns, width]);

	return { columns, itemWidth, displayMode };
};
