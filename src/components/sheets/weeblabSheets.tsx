import { router } from 'expo-router';
import { SheetProps, useSheetRef } from 'react-native-actions-sheet';
import { BottomSheetAccordion, BottomSheetParent } from './bottomsheets';
import { Button, Checkbox, Divider, List } from 'react-native-paper';
import { View } from 'react-native';
import { useState } from 'react';

export type NekosApiSheetProps = {
	ratings: string[];
	onRatingSelect: (newRatings: string[]) => void;
};
export const NekosApiSheet = ({
	payload: { ratings, onRatingSelect },
}: SheetProps<'NekosApiSheet'>) => {
	const ref = useSheetRef();
	const availableRatings = ['safe', 'suggestive', 'borderline', 'explicit'];
	const [selectedRatings, setSelectedRatings] = useState(ratings);

	return (
		<BottomSheetParent
			CustomHeaderComponent={
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
								ref.current?.hide();
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
