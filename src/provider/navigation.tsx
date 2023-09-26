import { Provider as PaperProvider, Portal } from 'react-native-paper';
import { availableThemes } from '../theme/theme';
import { LinkingOptions, NavigationContainer, useLinkTo } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import { RootStackProps } from '../navigation/types';
import useNotif from './hooks/useNotificationSetup';
import * as Updates from 'expo-updates';
import { UpdateDialog } from '../components/updates';

const prefix = Linking.createURL('/');

const config: LinkingOptions<RootStackProps>['config'] = {
    screens: {
        root: {
            screens: {
                exploreStack: {
                    path: 'explore',
                },
                userStack: {
                    path: 'user',
                },
                moreStack: {
                    path: 'more',
                    initialRouteName: 'more',
                    exact: true,
                    screens: {
                        settings: {
                            path: 'more/settings',
                            initialRouteName: 'settingsHome',
                            screens: {
                                mediaSettings: 'more/settings/media',
                            },
                        },
                        accounts: {
                            path: 'more/accounts',
                        },
                    },
                },
            },
        },
        media: {
            path: 'media/:type/:aniID',
            parse: {
                type: (type) => type.toUpperCase(),
                aniID: (aniID) => `${aniID}`,
            },
            exact: true,
        },
        // explore: {
        //     screens: {
        //         path: '',
        //         exploreMain: {
        //             screens: {
        //                 anime: 'explore/anime',
        //                 manga: 'explore/manga',
        //                 novels: 'explore/novels',
        //             },
        //         },
        //         exploreMedia: 'explore/media/:id',
        //     },
        // },
        // searchStack: {
        //     screens: {
        //         search: 'search',
        //     },
        // },
        // userStack: 'user',
        // more: {
        //     path: 'more',
        //     screens: {
        //         settings: 'more/settings',
        //         accounts: 'more/accounts',
        //     },
        // },
    },
};

const linking: LinkingOptions<RootStackProps> = {
    prefixes: [
        prefix,
        'https://goraku.kuzutech.com',
        'gorakuplus://',
        'https://localhost:19006',
        'https://anilist.co',
    ],
    config,
};

const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const { isDark, mode } = useAppSelector((state) => state.persistedTheme);
    const { loading } = useNotif();

    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const updatesListener = (e: Updates.UpdateEvent) => {
        console.log(e);
        if (e.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
            setShowUpdateDialog(true);
        }
    };

    Updates.useUpdateEvents(updatesListener);

    return (
        <PaperProvider
            theme={isDark ? availableThemes['dark'][mode] : availableThemes['light'][mode]}
        >
            <NavigationContainer
                theme={isDark ? availableThemes['dark'][mode] : availableThemes['light'][mode]}
                linking={linking}
            >
                <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
            </NavigationContainer>
            <Portal>
                <UpdateDialog
                    visible={showUpdateDialog}
                    onDismiss={() => setShowUpdateDialog(false)}
                />
            </Portal>
            <StatusBar translucent style={isDark ? 'light' : 'dark'} />
        </PaperProvider>
    );
};

export default NavigationProvider;
