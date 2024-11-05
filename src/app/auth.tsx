import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { useURL } from 'expo-linking';

// maybeCompleteAuthSession();

const AuthPage = () => {
	useEffect(() => {
		router.back();
	}, []);

	return <View />;
};

export default AuthPage;
