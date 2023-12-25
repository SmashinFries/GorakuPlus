import PaperHeader, { ExploreHeader, FavoritesHeader } from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Slot, Stack } from 'expo-router';

const FavoritesLayout = () => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);
    return (
        <Stack
            screenOptions={{
                animation: navAnimation,
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="[tab]"
                options={{ title: 'Favorites', header: (props) => <FavoritesHeader {...props} /> }}
            />
        </Stack>
    );
};

export default FavoritesLayout;
