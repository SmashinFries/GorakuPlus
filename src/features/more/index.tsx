import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Divider, List } from "react-native-paper";
import { MoreStackProps } from "../../navigation/types";

const MoreScreen = ({navigation}:NativeStackScreenProps<MoreStackProps, 'more'>) => {
    return(
        <View>
            <Divider />
            <List.Item
                title="Accounts"
                onPress={() => navigation.navigate('accounts')}
                // description="Manage accounts"
                left={props => <List.Icon {...props} icon="account-outline" />}
            />
            <List.Item
                title="Statistics"
                // description="Customize your UI"
                left={props => <List.Icon {...props} icon="chart-line" />}
            />
            <List.Item
                title="Settings"
                // description="Customize your UI"
                onPress={() => navigation.navigate('settings')}
                left={props => <List.Icon {...props} icon="cog-outline" />}
            />
            
        </View>
    );
};

export default MoreScreen;