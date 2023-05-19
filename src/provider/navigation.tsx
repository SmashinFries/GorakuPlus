import { Provider as PaperProvider } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { availableThemes } from "../theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from 'expo-linking';
import { StatusBar } from "expo-status-bar";

const prefix = Linking.createURL('/');

const config = {
    screens: {
        explore: {
            screens: {
                exploreMain: {
                    screens: {
                        anime: 'explore/anime',
                        manga: 'explore/manga',
                        novels: 'explore/novels',
                    },
                },
                exploreMedia: 'explore/media/:id',
            },
        },
        searchStack: {
            screens: {
                search: 'search',
            },
        },
        more: {
            screens: {
                settings: 'more/settings',
                accounts: 'more/accounts',
            }
        }
    },
};

const linking = {
    prefixes: [
        prefix,
        'https://goraku.kuzutech.com',
        'gorakuplus://',
        'https://localhost:19006',
    ],
    config,
};

const NavigationProvider = ({children}:{children:React.ReactNode}) => {
    const { isDark, mode } = useSelector((state: RootState) => state.persistedTheme);
    const theme = isDark ? availableThemes['dark'][mode] : availableThemes['light'][mode];

    return(
        <PaperProvider theme={theme}>
            {/* @ts-ignore */}
            <NavigationContainer theme={theme} linking={linking}>
                {children}
            </NavigationContainer>
            <StatusBar style={isDark ? "light" : 'dark'} />
        </PaperProvider>
    );
};

export default NavigationProvider;