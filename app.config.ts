import { ExpoConfig, ConfigContext } from 'expo/config';
import dotenv from 'dotenv';
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'GorakuPlus',
  name: 'Goraku',
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  plugins: [
    "@react-native-firebase/app",
    "@react-native-firebase/crashlytics",
    // [
    //     "expo-build-properties",
    //     {
    //         "ios": {
    //         "useFrameworks": "static"
    //         }
    //     }
    // ]
  ],
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    googleServicesFile: "",
    supportsTablet: true
  },
  android: {
    googleServicesFile: "",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    }
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    eas: {
        projectId: "3a04cf40-e4fd-4885-ae1c-17d23d6df96b"
    },
    ANI_ID: process.env.ANI_ID,
    ANI_WEB_ID: process.env.ANI_WEB_ID,
    ANI_EXPO_GO: process.env.ANI_EXPO_GO,
  },
  scheme: "gorakuplus"
});