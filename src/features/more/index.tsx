import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { Divider, List, useTheme } from 'react-native-paper';
import { MoreStackProps } from '../../navigation/types';
import { useCallback } from 'react';

const MoreScreen = ({ navigation }: NativeStackScreenProps<MoreStackProps, 'more'>) => {
    const { colors } = useTheme();

    const goToAccounts = useCallback(() => navigation.navigate('accounts'), []);
    const goToSettings = useCallback(() => navigation.navigate('settings'), []);
    const goToAbout = useCallback(() => navigation.navigate('about'), []);

    return (
        <View>
            <Divider />
            <List.Item
                title="Accounts"
                onPress={goToAccounts}
                // description="Manage accounts"
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="account-outline" />
                )}
            />
            <List.Item
                title="Settings"
                // description="Customize your UI"
                onPress={goToSettings}
                left={(props) => <List.Icon {...props} color={colors.primary} icon="cog-outline" />}
            />
            <List.Item
                title="About"
                onPress={goToAbout}
                left={(props) => (
                    <List.Icon {...props} color={colors.primary} icon="information-outline" />
                )}
            />
        </View>
    );
};

export default MoreScreen;
