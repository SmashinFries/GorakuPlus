import { ExpoConfig } from 'expo/config';
import { withSentry } from '@sentry/react-native/expo';

import dotenv from 'dotenv';
const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_STORE = process.env.APP_VARIANT === 'store';
dotenv.config();

const appName = IS_DEV ? 'Goraku Dev' : 'Goraku';

const config: ExpoConfig = {
	owner: 'kuzulabz',
	slug: 'GorakuPlus',
	name: appName,
	version: '1.4.6',
	orientation: 'portrait',
	icon: './assets/iconsv3/icon.png',
	userInterfaceStyle: 'automatic',
	jsEngine: 'hermes',
	newArchEnabled: false, // screen transitions and accordian anims dont work :/
	experiments: {
		tsconfigPaths: true,
		typedRoutes: true,
	},
	updates: {
		url: 'https://u.expo.dev/3a04cf40-e4fd-4885-ae1c-17d23d6df96b',
		checkAutomatically: 'ON_LOAD',
	},
	runtimeVersion: 'appVersion',
	plugins: [
		'expo-localization',
		'expo-router',
		'expo-font',
		'expo-video',
		'expo-audio',
		'react-native-bottom-tabs',
		[
			'expo-build-properties',
			{
				ios: {
					deploymentTarget: '17.0',
					extraPods: [
						{ name: 'SDWebImage', modular_headers: true },
						{ name: 'SDWebImageSVGCoder', modular_headers: true },
					],
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
		[
			'expo-quick-actions',
			{
				androidIcons: {
					magnify: {
						foregroundImage: './assets/quick-actions/adaptive-magnify.png',
						backgroundColor: '#F5F5F5',
					},
					calendar: {
						foregroundImage: './assets/quick-actions/adaptive-calendar.png',
						backgroundColor: '#F5F5F5',
					},
					bookshelf: {
						foregroundImage: './assets/quick-actions/adaptive-bookshelf.png',
						backgroundColor: '#F5F5F5',
					},
					campfire: {
						foregroundImage: './assets/quick-actions/adaptive-campfire.png',
						backgroundColor: '#F5F5F5',
					},
				},
			},
		],
		[
			'expo-splash-screen',
			{
				backgroundColor: '#000000',
				image: './assets/iconsv3/splash-icon.png',
				dark: {
					backgroundColor: '#000000',
				},
				imageWidth: 200,
			},
		],
		[
			'react-native-edge-to-edge',
			{
				android: {
					parentTheme: 'Material3',
				},
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
		newArchEnabled: false,
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
		permissions: ['android.permission.REQUEST_INSTALL_PACKAGES'],
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
		ANI_SECRET: process.env.ANI_SECRET,
		ANI_DEV_ID: process.env.ANI_DEV_ID,
		ANI_DEV_SECRET: process.env.ANI_DEV_SECRET,
		ANI_ID_SETUP: process.env.ANI_ID_SETUP,
		ANI_WEB_ID: process.env.ANI_WEB_ID,
		ANI_EXPO_GO: process.env.ANI_EXPO_GO,
		ANI_EXPO_GO_IOS: process.env.ANI_EXPO_GO_IOS,
		AUTH_ENCRYPTION_KEY: process.env.AUTH_ENCRYPTION_KEY,
		isStore: IS_STORE,
	},
	scheme: IS_DEV ? 'gorakuplusDev' : 'gorakuplus',
};

export default withSentry(config, {
	organization: 'kuzulabz',
	project: 'goraku',
});
