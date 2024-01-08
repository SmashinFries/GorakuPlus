import PaperHeader, { ExploreHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { useAppSelector } from '@/store/hooks';
import { Slot, Stack } from 'expo-router';

const ExploreLayout = () => {
    return (
        <AnimatedStack
            screenOptions={{
                header: (props) => <PaperHeader {...props} />,
            }}
        >
            <Stack.Screen
                name="index"
                options={{ title: 'Explore', header: (props) => <ExploreHeader {...props} /> }}
            />
            <Stack.Screen name="search" options={{ title: 'Search' }} />
        </AnimatedStack>
    );
};

export default ExploreLayout;
