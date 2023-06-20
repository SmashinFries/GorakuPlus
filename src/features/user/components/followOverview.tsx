import { AnimatePresence, MotiView } from 'moti';
import { ActivityIndicator, Avatar, Text } from 'react-native-paper';
import {
    User,
    UserFollowersQuery,
    useUserFollowersQuery,
    useUserFollowingQuery,
} from '../../../app/services/anilist/generated-anilist';
import { MotiPressable } from 'moti/interactions';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Selectable } from '../../../components/moti';

type FollowUserItemProps = {
    user: User;
};
const FollowUserItem = ({ user }: FollowUserItemProps) => {
    return (
        <AnimatePresence>
            <Selectable
                from={{ scale: 0 }}
                animate={{ scale: 1 }}
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
    title: string;
    data: User[];
    isLoading: boolean;
};
export const FollowRow = ({ title, data, isLoading }: FollowRowProps) => {
    return (
        <MotiView>
            <Text variant="headlineMedium" style={[styles.header]}>
                {title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {!isLoading ? (
                    data?.map((user, idx) => <FollowUserItem key={idx} user={user} />)
                ) : (
                    <ActivityIndicator />
                )}
            </ScrollView>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    container: {},
    header: {
        paddingLeft: 10,
        paddingTop: 10,
    },
});
