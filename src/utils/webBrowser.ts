import * as WebBrowser from 'expo-web-browser';

export const openWebBrowser = async (link: string) => {
    await WebBrowser.openBrowserAsync(link);
};
