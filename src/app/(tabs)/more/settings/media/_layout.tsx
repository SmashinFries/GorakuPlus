import PaperHeader from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const MediaSettingsLayout = () => {
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
                    title: 'Media',
                }}
            />
            <Stack.Screen
                name="tagBlacklist"
                options={{ headerShown: false, title: 'Tag Blacklist' }}
            />
        </Stack>
    );
};

export default MediaSettingsLayout;
