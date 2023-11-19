import { ExpoConfig, ConfigContext } from 'expo/config';
import dotenv from 'dotenv';
const IS_DEV = process.env.APP_VARIANT === 'development';
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    owner: 'kuzutech',
    slug: 'GorakuPlus',
    name: IS_DEV ? 'Goraku Dev' : 'Goraku',
    version: '0.6',
    orientation: 'portrait',
    icon: './assets/iconsv1/icon.png',
    userInterfaceStyle: 'automatic',
    experiments: {
        tsconfigPaths: true,
    },
    updates: {
        url: 'https://u.expo.dev/3a04cf40-e4fd-4885-ae1c-17d23d6df96b',
        checkAutomatically: 'ON_LOAD',
    },
    runtimeVersion: 'appVersion',
    splash: {
        image: './assets/iconsv1/splash.png',
        resizeMode: 'cover',
    },
    plugins: [
        '@react-native-firebase/app',
        '@react-native-firebase/crashlytics',
        'expo-localization',
        'expo-router',
    ],
    assetBundlePatterns: ['**/*'],
    ios: {
        googleServicesFile: '',
        supportsTablet: true,
        bundleIdentifier: IS_DEV ? 'com.kuzutech.gorakuplus.dev' : 'com.kuzutech.gorakuplus',
    },
    android: {
        package: IS_DEV ? 'com.kuzutech.gorakuplus.dev' : 'com.kuzutech.gorakuplus',
        googleServicesFile: IS_DEV ? './google-services-dev.json' : './google-services.json',
        adaptiveIcon: {
            foregroundImage: './assets/iconsv1/adaptive-icon.png',
        },
        softwareKeyboardLayoutMode: 'pan',
        intentFilters: [
            {
                action: 'VIEW',
                data: [
                    {
                        scheme: 'https',
                        host: 'anilist.co',
                        pathPattern: '/anime/.*',
                    },
                    {
                        scheme: 'https',
                        host: 'anilist.co',
                        pathPattern: '/manga/.*',
                    },
                    {
                        scheme: 'https',
                        host: 'anilist.co',
                        pathPattern: '/character/.*',
                    },
                    {
                        scheme: 'https',
                        host: 'anilist.co',
                        pathPattern: '/staff/.*',
                    },
                    {
                        scheme: 'https',
                        host: 'anilist.co',
                        pathPattern: '/studio/.*',
                    },
                ],
                category: ['BROWSABLE', 'DEFAULT'],
            },
            {
                action: 'VIEW',
                autoVerify: true,
                data: [
                    {
                        scheme: 'gorakuplus',
                    },
                ],
                category: ['BROWSABLE', 'DEFAULT'],
            },
        ],
    },
    web: {
        favicon: './assets/favicon.png',
    },
    extra: {
        eas: {
            projectId: '3a04cf40-e4fd-4885-ae1c-17d23d6df96b',
        },
        router: {
            origin: false,
        },
        ANI_ID: process.env.ANI_ID,
        ANI_WEB_ID: process.env.ANI_WEB_ID,
        ANI_EXPO_GO: process.env.ANI_EXPO_GO,
        ANI_EXPO_GO_IOS: process.env.ANI_EXPO_GO_IOS,
    },
    scheme: IS_DEV ? 'gorakuplusDev' : 'gorakuplus',
});
