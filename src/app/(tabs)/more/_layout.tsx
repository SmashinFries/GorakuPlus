import PaperHeader, { MoreHeader } from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const MoreLayout = () => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);
    return (
        <Stack
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: 'More',
                    header: (props) => <MoreHeader {...props} />,
                }}
            />
            <Stack.Screen name="accounts" options={{ title: 'Accounts' }} />
            <Stack.Screen name="settings" options={{ title: 'Settings', headerShown: false }} />
            <Stack.Screen name="about" options={{ title: 'About' }} />
        </Stack>
    );
};

export default MoreLayout;
