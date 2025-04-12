import { useEffect } from "react";
import { Keyboard } from "react-native";

export const useTextInputKeyboardUnfocus = () => {
	useEffect(() => {
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			Keyboard.dismiss();
		});
		return () => {
			hideSubscription.remove();
		};
	}, []);
};