import PaperHeader from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const UserLayout = () => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);
    const { username } = useAppSelector((state) => state.persistedAniLogin);

    return (
        <Stack
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
        >
            <Stack.Screen
                name="index"
                options={{ title: username ?? 'User', headerShown: false }}
            />
        </Stack>
    );
};

export default UserLayout;
