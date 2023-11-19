import { router } from 'expo-router';
import { View } from 'react-native';
import { Divider, List, useTheme } from 'react-native-paper';

const MorePage = () => {
    const { colors } = useTheme();

    return (
        <View>
            <Divider />
            <List.Item
                title="Accounts"
                onPress={() => router.push('/more/accounts')}
                // description="Manage accounts"
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="account-outline" />
                )}
            />
            <List.Item
                title="Settings"
                // description="Customize your UI"
                onPress={() => router.push('/more/settings')}
                left={(props) => <List.Icon {...props} color={colors.primary} icon="cog-outline" />}
            />
            <List.Item
                title="About"
                onPress={() => router.push('/more/about')}
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="information-outline" />
                )}
            />
        </View>
    );
};

export default MorePage;
