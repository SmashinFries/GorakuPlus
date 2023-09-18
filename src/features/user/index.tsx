import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import AuthUserScreen from './authedUser';
import { Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavPaths } from '../../navigation/types';
import { useEffect } from 'react';
import * as Linking from 'expo-linking';

const UserScreen = ({ navigation }: NativeStackScreenProps<RootNavPaths, 'userStack'>) => {
    const { userID } = useSelector((state: RootState) => state.persistedAniLogin);

    if (userID) {
        return <AuthUserScreen userID={userID} />;
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                mode="outlined"
                onPress={() => {
                    navigation.navigate('moreStack', { screen: 'accounts', initial: false });
                }}
            >
                Login for the full experience!
            </Button>
        </View>
    );
};

export default UserScreen;
