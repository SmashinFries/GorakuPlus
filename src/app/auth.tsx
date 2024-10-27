import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { maybeCompleteAuthSession } from 'expo-web-browser';

maybeCompleteAuthSession();

const AuthPage = () => {
	useEffect(() => {
		router.back();
	}, []);

	return <View />;
};

export default AuthPage;
