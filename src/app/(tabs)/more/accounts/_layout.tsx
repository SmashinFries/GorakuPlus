import { AccountsHeader } from '@/components/headers/accounts';
import AnimatedStack from '@/components/stack';
import { Stack } from 'expo-router';

const AccountsLayout = () => {
	return (
		<AnimatedStack
			screenOptions={{
				header: (props) => <AccountsHeader {...props} />,
			}}
			initialRouteName="index"
		>
			<Stack.Screen name="index" options={{ title: 'Accounts' }} />
		</AnimatedStack>
	);
};

export default AccountsLayout;
