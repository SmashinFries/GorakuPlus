import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { AppProvider } from './src/provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootStackNavigation from './src/navigation/root';
// import * as Localization from 'expo-localization';
// import { I18n } from 'i18n-js';
// import en from './languages/english.json';
// import ja from './languages/japanese.json';

if (typeof window !== 'undefined') {
    // @ts-ignore
    window._frameTimestamp = null;
}

// const translations = {
//     en: { ...en },
//     ja: { ...ja },
// };
// const i18n = new I18n(translations);

const App = () => {
    const { width, height } = useWindowDimensions();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AppProvider>
                <RootStackNavigation />
            </AppProvider>
        </GestureHandlerRootView>
    );
};

export default App;
