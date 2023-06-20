import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import AuthUserScreen from './authedUser';

const UserScreen = () => {
    const { userID } = useSelector((state: RootState) => state.persistedAniLogin);
    if (userID) {
        return <AuthUserScreen userID={userID} />;
    }
    return <View></View>;
};

export default UserScreen;
