import { Stack } from 'expo-router';

const StaffInfoLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'[staffId]'} getId={(params) => params?.params?.staffId} />
        </Stack>
    );
};

export default StaffInfoLayout;
