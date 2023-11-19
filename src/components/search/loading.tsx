import React, { useCallback } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

type EmptyLoadViewProps = {
    isLoading: boolean;
    isUninitialized?: boolean;
};
export const EmptyLoadView = ({ isLoading, isUninitialized = false }: EmptyLoadViewProps) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {isLoading ? (
                <ActivityIndicator size={'large'} />
            ) : (
                <Text>{isUninitialized ? 'Search something!' : 'Nothing found'}</Text>
            )}
        </View>
    );
};
