import { BottomSheetAccordion, BottomSheetParent } from './bottomsheets';
import { Button, Checkbox, Divider } from 'react-native-paper';
import { View } from 'react-native';
import { MutableRefObject, RefObject, useState } from 'react';
import { TrueSheet } from '@lodev09/react-native-true-sheet';

export type NekosApiSheetProps = {
	sheetRef: RefObject<TrueSheet>;
	ratings: string[];
	onRatingSelect: (newRatings: string[]) => void;
};
export const NekosApiSheet = ({ sheetRef, ratings, onRatingSelect }: NekosApiSheetProps) => {
	const availableRatings = ['safe', 'suggestive', 'borderline', 'explicit'];
	const [selectedRatings, setSelectedRatings] = useState(ratings);

	return (
		<BottomSheetParent
			sheetRef={sheetRef}
			grabber={false}
			header={
				<View style={{ width: '100%' }}>
					<View
						style={{
							padding: 8,
							flexDirection: 'row',
							justifyContent: 'flex-end',
						}}
					>
						<Button
							mode="contained"
							onPress={() => {
								onRatingSelect(selectedRatings);
								sheetRef.current?.dismiss();
							}}
						>
							Filter
						</Button>
					</View>
					<Divider />
				</View>
			}
		>
			<BottomSheetAccordion title="Ratings" initialExpand>
				{availableRatings.map((item, idx) => (
					<Checkbox.Item
						key={idx}
						label={item}
						labelStyle={{ textTransform: 'capitalize' }}
						status={selectedRatings.includes(item) ? 'checked' : 'unchecked'}
						onPress={() =>
							setSelectedRatings((prev) =>
								prev.includes(item)
									? prev.filter((sRating) => sRating !== item)
									: [...prev, item],
							)
						}
						position="leading"
					/>
				))}
			</BottomSheetAccordion>
		</BottomSheetParent>
	);
};
