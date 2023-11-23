import { AnimatePresence, MotiView } from 'moti';
import { ActivityIndicator, Avatar, Text } from 'react-native-paper';
import { User } from '@/store/services/anilist/generated-anilist';
import { ScrollView, ToastAndroid } from 'react-native';
import { Selectable } from '../moti';
import { openWebBrowser } from '@/utils/webBrowser';

type FollowUserItemProps = {
    user: User;
};
const FollowUserItem = ({ user }: FollowUserItemProps) => {
    return (
        <AnimatePresence>
            <Selectable
                from={{ scale: 0 }}
                animate={{ scale: 1 }}
                onPress={() => openWebBrowser(`https://anilist.co/user/${user.name}`)}
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
