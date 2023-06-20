import React from 'react';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../app/store';
import NavigationProvider from './navigation';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<Text>loading...</Text>} persistor={persistor}>
                <NavigationProvider>{children}</NavigationProvider>
            </PersistGate>
        </Provider>
    );
};
