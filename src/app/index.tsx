import { Redirect } from 'expo-router';
import React from 'react';

const RootPage = () => {
	return <Redirect href="/(tabs)/explore" />;
};

export default RootPage;
