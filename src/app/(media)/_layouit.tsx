import { Stack } from 'expo-router';

const MediaLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'[...params]'} getId={(params) => params?.params?.params} />
        </Stack>
    );
};

export default MediaLayout;
