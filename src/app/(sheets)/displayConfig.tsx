import { GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { Slider } from '@/components/slider';
import { DisplayMode, DisplayState, useDisplayStore } from '@/store/displayStore';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Chip, List } from 'react-native-paper';

const DisplayConfigSheet = () => {
	const { type } = useLocalSearchParams<{ type: keyof DisplayState }>();
	const { updateCalendarDisplay, updateListDisplay, updateSearchDisplay, ...config } =
		useDisplayStore();

	const onModeChange = (mode: DisplayMode) => {
		switch (type) {
			case 'calendar':
				updateCalendarDisplay({ mode });
				break;
			case 'list':
				updateListDisplay({ mode });
				break;
			case 'search':
				updateSearchDisplay({ mode });
				break;
			default:
				break;
		}
	};

	const onGridSizeChange = (grid_size: number | undefined) => {
		if (grid_size) {
			switch (type) {
				case 'calendar':
					updateCalendarDisplay({ grid_size });
					break;
				case 'list':
					updateListDisplay({ grid_size });
					break;
				case 'search':
					updateSearchDisplay({ grid_size });
					break;
				default:
					break;
			}
		}
	};

	return (
		<GlobalBottomSheetParent
			grabber
			sizes={['auto', 'medium']}
			// onDismiss={dismissDisplayConfigSheet}
		>
			<List.Item
				title={'Display Mode'}
				description={() => (
					<View style={{ flexDirection: 'row', gap: 6, paddingTop: 6 }}>
						{(['COMPACT', 'LIST'] as DisplayMode[]).map((displayMode, idx) => (
							<Chip
								mode="outlined"
								selected={
									config[type]?.mode?.toUpperCase() === displayMode.toUpperCase()
								}
								key={idx}
								textStyle={{ textTransform: 'capitalize' }}
								onPress={() => onModeChange(displayMode)}
							>
								{displayMode}
							</Chip>
						))}
					</View>
				)}
			/>
			{config[type]?.mode === 'COMPACT' && (
				<Slider
					title="Grid Size"
					description={`${config[type]?.grid_size} columns`}
					initialValue={config[type]?.grid_size ?? 2}
					steps={1}
					// initialScore={tempFilter.averageScore_greater}
					maxValue={6}
					minValue={2}
					onValueUpdate={(size) => onGridSizeChange(size)}
				/>
			)}
		</GlobalBottomSheetParent>
	);
};

export default DisplayConfigSheet;
