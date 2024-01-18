import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const ReviewInfoLayout = () => {
    return (
        <AnimatedStack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'[reviewId]'} getId={(params) => params?.params?.reviewId} />
        </AnimatedStack>
    );
};

export default ReviewInfoLayout;
