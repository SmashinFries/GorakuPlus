import { Stack } from 'expo-router';

const CharacterInfoLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'[charId]'} getId={(params) => params?.params?.charId} />
        </Stack>
    );
};

export default CharacterInfoLayout;
