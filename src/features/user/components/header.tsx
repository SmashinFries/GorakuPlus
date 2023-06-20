import { MotiView } from 'moti';
import { Avatar, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

type UserHeaderProps = {
    avatar: string;
    name: string;
};
export const UserHeader = ({ avatar, name }: UserHeaderProps) => {
    return (
        <MotiView style={{ flexDirection: 'row', marginTop: 140 / 2, alignItems: 'center' }}>
            <MotiView style={{ marginLeft: 20 }}>
                <Avatar.Image source={{ uri: avatar }} size={100} />
            </MotiView>
            <Text variant="titleLarge" style={{ paddingLeft: 20 }}>
                {name}
            </Text>
        </MotiView>
    );
};
