import { UserScreen } from '@/components/user/screen';
import { useLocalSearchParams } from 'expo-router';

const UserPage = () => {
	const { username } = useLocalSearchParams<{
		username: string;
	}>();
	return <UserScreen username={username} />;
};

export default UserPage;
