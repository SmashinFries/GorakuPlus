import PaperHeader from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const StaffLayout = () => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);
    return (
        <Stack
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
                headerTransparent: false,
            }}
        >
            <Stack.Screen
                name="[mediaId]"
                options={{ title: 'Staff' }}
                getId={(params) => params.params?.mediaId}
            />
            <Stack.Screen name="info" options={{ title: '', headerShown: false }} />
        </Stack>
    );
};

export default StaffLayout;
