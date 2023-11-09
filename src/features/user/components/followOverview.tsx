import { AnimatePresence, MotiView } from 'moti';
import { ActivityIndicator, Avatar, Text } from 'react-native-paper';
import {
    User,
    UserFollowersQuery,
    useUserFollowersQuery,
    useUserFollowingQuery,
} from '../../../app/services/anilist/generated-anilist';
import { MotiPressable } from 'moti/interactions';
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { Selectable } from '../../../components/moti';
import { ListHeading } from '../../../components/text';

type FollowUserItemProps = {
    user: User;
};
const FollowUserItem = ({ user }: FollowUserItemProps) => {
    return (
        <AnimatePresence>
            <Selectable
                from={{ scale: 0 }}
                animate={{ scale: 1 }}
                onPress={() => ToastAndroid.show('User screen coming soon!', ToastAndroid.LONG)}
                style={{ margin: 12, alignItems: 'center' }}
            >
                <MotiView>
                    <Avatar.Image size={80} source={{ uri: user?.avatar?.large }} />
                </MotiView>
                <Text style={{ textAlign: 'center' }}>{user.name}</Text>
            </Selectable>
        </AnimatePresence>
    );
};

type FollowRowProps = {
    data: User[];
    isLoading: boolean;
};
export const FollowRow = ({ data, isLoading }: FollowRowProps) => {
    if (!data) {
        return null;
    }
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {!isLoading ? (
                data?.map((user, idx) => <FollowUserItem key={idx} user={user} />)
            ) : (
                <ActivityIndicator />
            )}
        </ScrollView>
    );
};
