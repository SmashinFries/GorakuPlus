import { ExpoConfig, ConfigContext } from 'expo/config';
import dotenv from 'dotenv';
const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_STORE = process.env.APP_VARIANT === 'store';
dotenv.config();

const appName = IS_DEV ? 'Goraku Dev' : 'Goraku';

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	owner: 'kuzulabz',
	slug: 'GorakuPlus',
	name: appName,
	version: '1.3',
	orientation: 'portrait',
	icon: './assets/iconsv2/icon.png',
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
		image: './assets/iconsv2/splash.png',
		resizeMode: 'cover',
		backgroundColor: '#141414',
	},
	plugins: [
		'@react-native-firebase/app',
		'@react-native-firebase/crashlytics',
		'expo-localization',
		'expo-router',
		'expo-font',
		[
			'expo-build-properties',
			{
				ios: {
					useFrameworks: 'static',
					deploymentTarget: '17.0',
				},
				android: {
					useLegacyPackaging: true,
				},
			},
		],
		[
			'expo-camera',
			{
				cameraPermission: `Allow ${appName} to access camera for book scanning.`,
			},
		],
		[
			'expo-media-library',
			{
				//   "photosPermission": `Allow ${appName} to access your photos. This is for `,
				savePhotosPermission: `Allow ${appName} to save photos.`,
				isAccessMediaLocationEnabled: true,
			},
		],
	],
	assetBundlePatterns: ['**/*'],
	ios: {
		googleServicesFile: IS_DEV
			? './GoogleService-Info-dev.plist'
			: './GoogleService-Info.plist',
		supportsTablet: false,
		bundleIdentifier: IS_DEV ? 'com.kuzulabz.gorakuplus.dev' : 'com.kuzulabz.gorakuplus',
	},
	android: {
		package: IS_DEV ? 'com.kuzutech.gorakuplus.dev' : 'com.kuzutech.gorakuplus',
		googleServicesFile: IS_DEV ? './google-services-dev.json' : './google-services.json',
		adaptiveIcon: {
			foregroundImage: './assets/iconsv2/adaptive-icon.png',
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
		favicon: './assets/iconsv2/favicon.png',
		bundler: 'metro',
		output: 'single',
	},
	extra: {
		eas: {
			projectId: '3a04cf40-e4fd-4885-ae1c-17d23d6df96b',
		},
		router: {
			origin: false,
		},
		ANI_ID: process.env.ANI_ID,
		ANI_ID_SETUP: process.env.ANI_ID_SETUP,
		ANI_WEB_ID: process.env.ANI_WEB_ID,
		ANI_EXPO_GO: process.env.ANI_EXPO_GO,
		ANI_EXPO_GO_IOS: process.env.ANI_EXPO_GO_IOS,
		isStore: IS_STORE,
	},
	scheme: IS_DEV ? 'gorakuplusDev' : 'gorakuplus',
});
