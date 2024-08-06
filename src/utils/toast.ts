import * as Burnt from 'burnt';
import { Platform } from 'react-native';

export const sendErrorMessage = (title: string, message: string) =>
	Burnt.toast({
		title: title,
		message: message,
		duration: 3000,
		preset: 'error',
		from: 'bottom',
		haptic: 'error',
	});

export const sendToast = (title: string, message: string) =>
	Burnt.toast({
		title: Platform.OS === 'android' ? message : title,
		message: Platform.OS === 'android' ? undefined : message,
		duration: 5000,
	});
