import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { Divider, List, useTheme } from 'react-native-paper';
import { MoreStackProps } from '../../navigation/types';

const MoreScreen = ({ navigation }: NativeStackScreenProps<MoreStackProps, 'more'>) => {
    const { colors } = useTheme();
    return (
        <View>
            <Divider />
            <List.Item
                title="Accounts"
                onPress={() => navigation.navigate('accounts')}
                // description="Manage accounts"
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="account-outline" />
                )}
            />
            <List.Item
                title="Settings"
                // description="Customize your UI"
                onPress={() => navigation.navigate('settings')}
                left={(props) => <List.Icon {...props} color={colors.primary} icon="cog-outline" />}
            />
            <List.Item
                title="About"
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="information-outline" />
                )}
            />
        </View>
    );
};

export default MoreScreen;
