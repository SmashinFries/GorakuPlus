import { NumberPicker, NumberPickerProps } from '@/components/picker';
import { BottomSheetParent, GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { ListEntryParamsState, useListEntryStore } from '@/store/listEntryStore';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export type EntryNumberPickerSheetProps = Omit<NumberPickerProps, 'onChange'> & {
	// sheetRef: MutableRefObject<TrueSheet>;
	title: string;
	type: keyof ListEntryParamsState;
	totalContent: number;
};
const EntryNumberPickerSheet = () => {
	const { params } = useLocalSearchParams<{ params: string }>();
	const payload = JSON.parse(params) as EntryNumberPickerSheetProps;
	const sheetRef = useRef<TrueSheet>(null);
	const { setValue: setListEntryValue, setProgress } = useListEntryStore();
	const [value, setValue] = useState<number>(payload.defaultValue ?? 0);

	return (
		<GlobalBottomSheetParent
			sheetRef={sheetRef}
			grabber={false}
			header={
				<View style={{ width: '100%', padding: 16 }}>
					<Text key={payload?.title ?? ''} variant="titleLarge">
						{payload?.title}
					</Text>
				</View>
			}
			name={'NumberPickerSheet'}
			sizes={['auto']}
			dismissible={false}
		>
			<NumberPicker
				key={`${payload?.title}-${payload?.mode}`}
				defaultValue={payload.defaultValue ?? 0}
				mode={payload?.mode}
				onChange={(value) => setValue(value)}
				options={payload?.options}
			/>
			<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
				<Button
					onPress={() => {
						// onCancel();
						setValue(payload?.defaultValue ?? 0);
						setListEntryValue(payload.type, payload.defaultValue ?? undefined);
						sheetRef.current?.dismiss();
					}}
				>
					Cancel
				</Button>
				<Button
					onPress={() => {
						// payload?.onChange(va);
						if (payload.type === 'progress') {
							setProgress(value, payload.totalContent);
						} else {
							setListEntryValue(payload.type, value);
						}

						sheetRef.current?.dismiss();
					}}
				>
					Confirm
				</Button>
			</View>
		</GlobalBottomSheetParent>
	);
};

export default EntryNumberPickerSheet;
