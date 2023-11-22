import PaperHeader from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const ArtLayout = () => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);

    return (
        <Stack
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
        >
            <Stack.Screen name="[tag]" options={{ title: 'Fan Art' }} />
            <Stack.Screen name="post" options={{ title: 'Art Post' }} />
        </Stack>
    );
};

export default ArtLayout;
