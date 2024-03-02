import React, { useCallback } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

type EmptyLoadViewProps = {
    isLoading: boolean;
    message?: string;
    isUninitialized?: boolean;
};
export const EmptyLoadView = ({
	isLoading,
	message,
	isUninitialized = false,
}: EmptyLoadViewProps) => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{isLoading ? (
				<View style={{ alignItems: 'center' }}>
					<ActivityIndicator size={'large'} />
					{message ? <Text>{message}</Text> : null}
				</View>
			) : (
				<Text>{isUninitialized ? 'Search something!' : 'Nothing found'}</Text>
			)}
		</View>
	);
};
