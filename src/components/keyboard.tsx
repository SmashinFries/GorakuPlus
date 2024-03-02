import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Keyboard, KeyboardEvent } from 'react-native';

export const KeyboardSpacerView = (props) => {
	const [height, setHeight] = useState<number>(0);

	useEffect(() => {
		// let event1 = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
		const event2 = Keyboard.addListener('keyboardDidShow', keyboardWillShow);
		const event3 = Keyboard.addListener('keyboardWillHide', keyboardWillHide);

		return () => {
			event2.remove();
			event3.remove();
		};
	}, [false]);

	const keyboardWillShow = (event: KeyboardEvent) => {
		setHeight(event.endCoordinates.height + 80);
	};

	const keyboardWillHide = (event: KeyboardEvent) => {
		setHeight(0);
	};

	return (
		<View
			style={[
				styles.container,
				{
					height: height,
				},
			]}
		/>
	);
};

const styles = StyleSheet.create({
	container: {},
});
