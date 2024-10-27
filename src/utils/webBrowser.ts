import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';

export const openWebBrowser = async (link: string, openInBrowser?: boolean) => {
	if (!link) return;

	if (openInBrowser) {
		await Linking.openURL(link);
	} else {
		const customtabs = await WebBrowser.getCustomTabsSupportingBrowsersAsync();
		await WebBrowser.openBrowserAsync(link, {
			// createTask: false,
			browserPackage: customtabs.servicePackages[0],
		});
	}
};
