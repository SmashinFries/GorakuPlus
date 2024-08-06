import * as SecureStore from 'expo-secure-store';

interface ReduxPersistExpoSecureStore {
	getItem(key: string): Promise<string>;

	setItem(key: string, value: string): Promise<void>;

	removeItem(key: string): Promise<void>;
}

export default function createSecureStorage(
	options?: SecureStore.SecureStoreOptions,
): ReduxPersistExpoSecureStore {
	const replaceCharacter = '_';
	const replacer = defaultReplacer;

	return {
		getItem: (key) => SecureStore.getItemAsync(replacer(key, replaceCharacter), options),
		setItem: (key, value) =>
			SecureStore.setItemAsync(replacer(key, replaceCharacter), value, options),
		removeItem: (key) => SecureStore.deleteItemAsync(replacer(key, replaceCharacter), options),
	};
}

function defaultReplacer(key: string, replaceCharacter: string) {
	return key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);
}
