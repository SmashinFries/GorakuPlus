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
	version: '1.4',
	orientation: 'portrait',
	icon: './assets/iconsv3/icon.png',
	userInterfaceStyle: 'automatic',
	jsEngine: 'hermes',
	experiments: {
		tsconfigPaths: true,
		typedRoutes: true,
	},
	updates: {
		url: 'https://u.expo.dev/3a04cf40-e4fd-4885-ae1c-17d23d6df96b',
		checkAutomatically: 'ON_LOAD',
	},
	runtimeVersion: 'appVersion',
	splash: {
		image: './assets/iconsv3/splash.png',
		resizeMode: 'cover',
		backgroundColor: '#1E1E1F',
	},
	plugins: [
		'expo-localization',
		'expo-router',
		'expo-font',
		'expo-secure-store',
		[
			'expo-build-properties',
			{
				ios: {
					useFrameworks: 'static',
					deploymentTarget: '17.0',
				},
				android: {
					useLegacyPackaging: true,
					newArchEnabled: false, // screen transitions and accordian anims dont work :/
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
		[
			'@sentry/react-native/expo',
			{
				organization: 'kuzulabz',
				project: 'goraku',
				// If you are using a self-hosted instance, update the value of the url property
				// to point towards your self-hosted instance. For example, https://self-hosted.example.com/.
				// url: 'https://sentry.io/',
			},
		],
	],
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: false,
		bundleIdentifier: IS_DEV ? 'com.kuzulabz.gorakuplus.dev' : 'com.kuzulabz.gorakuplus',
		jsEngine: 'jsc',
	},
	android: {
		package: IS_DEV ? 'com.kuzulabz.gorakuplus.dev' : 'com.kuzulabz.gorakuplus',
		adaptiveIcon: {
			backgroundColor: '#1E1E1F',
			foregroundImage: './assets/iconsv3/adaptive-icon.png',
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
					{
						scheme: 'https',
						host: 'anilist.co',
						pathPattern: '/user/.*',
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
		favicon: './assets/iconsv3/favicon.png',
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
		AUTH_ENCRYPTION_KEY: process.env.AUTH_ENCRYPTION_KEY,
		isStore: IS_STORE,
	},
	scheme: IS_DEV ? 'gorakuplusDev' : 'gorakuplus',
});
