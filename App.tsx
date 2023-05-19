import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { AppProvider } from './src/provider';
import DesktopNavigation from './src/navigation/root/desktop';
import MobileNavigation from './src/navigation/root/mobile';

export default function App() {
  const {width, height} = useWindowDimensions();
  return (
    <AppProvider>
      {width > height ? <DesktopNavigation /> : <MobileNavigation />}
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
