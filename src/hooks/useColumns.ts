import { DisplayState, useDisplayStore } from '@/store/displayStore';
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export const useColumns = (mode: keyof DisplayState, customGridSize?: number) => {
	const { grid_size: grid_size, mode: displayMode } = useDisplayStore((state) => state[mode]);
	const { width } = useWindowDimensions();
	const columns = useMemo(
		() => (displayMode === 'COMPACT' ? (customGridSize ?? grid_size ?? 3) : 1),
		[displayMode, grid_size, customGridSize],
	);
	const itemWidth = useMemo(() => width / columns, [columns, width]);

	return { columns, itemWidth, displayMode };
};
