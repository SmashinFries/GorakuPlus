import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

const AuthPage = () => {
	useEffect(() => {
		router.back();
	}, []);

	return <View />;
};

export default AuthPage;
