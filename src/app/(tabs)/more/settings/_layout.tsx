import PaperHeader, { MoreHeader } from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

export const unstable_settings = {
    // Used for `(foo)`
    initialRouteName: 'index',
};

const SettingsLayout = () => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);
    return (
        <Stack
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Settings' }} />
            <Stack.Screen name="appearance" options={{ title: 'Appearance' }} />
            <Stack.Screen name="language" options={{ title: 'Language' }} />
            <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
            <Stack.Screen name="media" options={{ title: 'Media', headerShown: false }} />
        </Stack>
    );
};

export default SettingsLayout;
