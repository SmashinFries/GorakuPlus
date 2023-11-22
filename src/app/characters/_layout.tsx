import PaperHeader from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const CharacterLayout = () => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);

    return (
        <Stack
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
        >
            <Stack.Screen
                name="[...params]"
                options={{ title: 'Characters' }}
                getId={(params) => params.params?.params}
            />
            <Stack.Screen name="info" options={{ title: '', headerShown: false }} />
        </Stack>
        // <CharStackNav.Navigator
        //     screenOptions={{
        //         animation: navAnimation,
        //         header: (props) => <PaperHeader {...props} />,
        //     }}
        //     initialRouteName="characterList"
        // >
        //     <CharStackNav.Screen
        //         name="characterList"
        //         component={CharListScreen}
        //         options={{
        //             title: 'Characters',
        //         }}
        //     />
        //     <CharStackNav.Screen
        //         name="character"
        //         component={CharacterScreen}
        //         options={{
        //             title: '',
        //         }}
        //     />
        // </CharStackNav.Navigator>
    );
};

export default CharacterLayout;
