import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';

export const openWebBrowser = async (link: string, openInBrowser?: boolean) => {
	if (!link || !link?.includes('http')) return;

	if (openInBrowser) {
		await Linking.openURL(link);
	} else {
		await WebBrowser.openBrowserAsync(link);
	}
};
