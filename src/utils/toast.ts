import * as Burnt from 'burnt';
import { Platform } from 'react-native';

export const sendErrorMessage = (title: string, message?: string) =>
	Burnt.toast({
		title: title,
		message: message ?? title,
		duration: 6000,
		preset: 'error',
		from: 'bottom',
		haptic: 'error',
	});

export const sendToast = (title: string, message?: string) =>
	title &&
	Burnt.toast({
		title: title,
		message: Platform.OS === 'android' ? title : message,
		duration: 5000,
	});
