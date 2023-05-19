import { NavigatorScreenParams } from "@react-navigation/native";

export type RootNavPaths = {
    explore: undefined;
    searchStack: undefined;
    listStack: undefined;
    userStack: undefined;
    moreStack: NavigatorScreenParams<MoreStackProps>;
};

export type MoreStackProps = {
    more: undefined;
    settings: undefined;
    accounts: undefined;
};