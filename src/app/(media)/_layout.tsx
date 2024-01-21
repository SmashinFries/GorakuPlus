import AnimatedStack from '@/components/stack';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const MediaLayout = () => {
    return (
        <AnimatedStack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'[...params]'} getId={(params) => params?.params?.params} />
        </AnimatedStack>
    );
};

export default MediaLayout;
