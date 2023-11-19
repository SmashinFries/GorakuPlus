import PaperHeader, { ExploreHeader } from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Slot, Stack } from 'expo-router';

const ExploreLayout = () => {
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
                options={{ title: 'Explore', header: (props) => <ExploreHeader {...props} /> }}
            />
            <Stack.Screen name="search" options={{ title: 'Search' }} />
        </Stack>
    );
};

export default ExploreLayout;
