import * as WebBrowser from 'expo-web-browser';

export const openWebBrowser = async (link: string) => {
    if (!link || !link?.includes('https')) return;

    await WebBrowser.openBrowserAsync(link);
};
