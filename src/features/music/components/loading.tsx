import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { ActivityIndicator, IconButton } from 'react-native-paper';

type LoadingProps = {
    isLoading: boolean;
    error?: SerializedError | FetchBaseQueryError;
};

const LoadingItem = ({ isLoading, error }: LoadingProps) => {
    const [loadIcon, setLoadIcon] = useState('check');
    useEffect(() => {
        if (isLoading === null) {
            setLoadIcon('cancel');
            // @ts-ignore
        } else if (error?.status === 'FETCH_ERROR') {
            setLoadIcon('network-off-outline');
        } else if (isLoading === false && !error) {
            setLoadIcon('check');
        }
    }, []);
    return (
        <MotiView style={{ padding: 20 }}>
            {/* <LoadingIcon icon={icon} /> */}
            {isLoading ? (
                <ActivityIndicator style={{ paddingTop: 10 }} />
            ) : (
                <IconButton icon={loadIcon} iconColor={loadIcon === 'check' ? 'green' : 'red'} />
            )}
        </MotiView>
    );
};

export const MusicLoading = ({ isLoading, error }: LoadingProps) => {
    return (
        <MotiView
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
            }}
            from={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{
                type: 'timing',
                duration: 2500,
            }}
            exit={{
                opacity: 0,
            }}
            exitTransition={{
                type: 'timing',
                duration: 2500,
            }}
        >
            <LoadingItem isLoading={isLoading} error={error} />
        </MotiView>
    );
};
