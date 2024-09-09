import i18n, { Module, Newable, NewableModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import resources from '../locales';
import { MMKV } from 'react-native-mmkv';

const deviceLanguage = getLocales()[0].languageCode;
const STORE_LANGUAGE_KEY = 'appLanguage';
const i18nStorage = new MMKV({ id: 'i18n-storage' });

const languageDetectorPlugin: Module | NewableModule<Module> | Newable<Module> = {
	type: 'languageDetector',
	async: false,
	init: () => null,
	detect: function (callback: (lang: string) => void) {
		try {
			const language = i18nStorage.getString(STORE_LANGUAGE_KEY);
			return callback(language ?? deviceLanguage);
		} catch (error) {
			console.log('Error reading language', error);
		}
	},
	cacheUserLanguage: function (language: string) {
		try {
			i18nStorage.set(STORE_LANGUAGE_KEY, language);
		} catch (error) {
			console.log('Error saving language', error);
		}
	},
};

i18n.use(languageDetectorPlugin)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		fallbackLng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option
		compatibilityJSON: 'v3',
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
		returnEmptyString: false,
	});

export default i18n;
