import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RootNavPaths } from "../types";
import { View } from "react-native";
import { Button } from "react-native-paper";
import SettingsScreen from "../../features/more/settings";
import { SettingsStack } from "../stacks/more";
import Constants from "expo-constants";


const RTBottomTabs = createMaterialBottomTabNavigator<RootNavPaths>();

const Test = () => <View style={{flex:1, justifyContent:'center'}}><Button onPress={() => console.log(Constants.expoConfig?.extra?.ANI_ID)}>Print</Button></View>;

const MobileNavigation = () => {
    return (
        <RTBottomTabs.Navigator>
            <RTBottomTabs.Screen
                name="explore"
                component={Test}
                options={{
                    title: 'Home',
                    tabBarIcon: 'campfire',
                }}
            />
            <RTBottomTabs.Screen
                name="searchStack"
                component={Test}
                options={{ title: 'Search', tabBarIcon: 'magnify' }}
            />
            <RTBottomTabs.Screen
                name="listStack"
                component={Test}
                options={{ title: 'List', tabBarIcon: 'bookshelf' }}
            />
            <RTBottomTabs.Screen
                name="userStack"
                component={Test}
                options={{ title: 'User', tabBarIcon: 'account' }}
            />
            <RTBottomTabs.Screen
                name="moreStack"
                component={SettingsStack}
                options={{
                    title: 'More',
                    tabBarIcon: 'dots-horizontal',
                }}
            />
        </RTBottomTabs.Navigator>
    );
};

export default MobileNavigation;