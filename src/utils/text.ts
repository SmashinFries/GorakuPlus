import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

export const captilize = (txt: string) => txt.charAt(0).toUpperCase() + txt.slice(1);

export const copyToClipboard = async (txt: string) => {
    await Clipboard.setStringAsync(txt);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const countryFlags = {
    JP: '🇯🇵',
    KR: '🇰🇷',
    CN: '🇨🇳',
    TW: '🇹🇼',
};
