import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const ReviewsLayout = () => {
    return (
        <AnimatedStack
            screenOptions={{
                header: (props) => <PaperHeader {...props} />,
                headerTransparent: false,
            }}
        >
            <Stack.Screen
                name="[mediaId]"
                options={{ title: 'Reviews' }}
                getId={(params) => params.params?.mediaId}
            />
            <Stack.Screen name="full" options={{ title: '', headerShown: false }} />
        </AnimatedStack>
    );
};

export default ReviewsLayout;
