import { AnimatePresence, MotiView, useDynamicAnimation } from 'moti';
import { ActivityIndicator, IconButton, Text, useTheme } from 'react-native-paper';
import { AnilistIcon, MalIcon } from '../../../components/svgs';
import { MotiPressable } from 'moti/interactions';
import { useEffect, useState } from 'react';
import { ErrorResponse } from '@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes';
import { SerializedError } from '@reduxjs/toolkit';

const LoadingIcon = ({ icon }: { icon: 'ANI' | 'MAL' }) => {
    const { dark } = useTheme();
    return (
        <MotiView
            from={{
                translateY: 0,
                rotateZ: '0deg',
            }}
            animate={{
                translateY: -15,
                rotateZ: '360deg',
            }}
            transition={{
                loop: true,
                type: 'timing',
                duration: 1500,
                delay: icon === 'ANI' ? 100 : 400,
            }}
            exit={{
                scale: 2,
                opacity: 0,
            }}
        >
            {icon === 'ANI' ? <AnilistIcon isDark={dark} /> : <MalIcon />}
        </MotiView>
    );
};

type LoadingItemProps = {
    loading: boolean;
    error?: ErrorResponse | SerializedError;
    icon: 'ANI' | 'MAL';
};
const LoadingItem = ({ loading, icon, error }: LoadingItemProps) => {
    const [loadIcon, setLoadIcon] = useState('check');
    useEffect(() => {
        if (loading === null) {
            setLoadIcon('cancel');
            // @ts-ignore
        } else if (error?.status === 'FETCH_ERROR') {
            setLoadIcon('network-off-outline');
        } else if (loading === false && !error) {
            setLoadIcon('check');
        }
    }, []);
    return (
        <MotiView style={{ padding: 20 }}>
            <LoadingIcon icon={icon} />
            {loading ? (
                <ActivityIndicator style={{ paddingTop: 10 }} />
            ) : (
                <IconButton icon={loadIcon} iconColor={loadIcon === 'check' ? 'green' : 'red'} />
            )}
        </MotiView>
    );
};

type LoadingProps = {
    aniLoading: boolean;
    aniError?: ErrorResponse | SerializedError;
    malLoading?: boolean;
    malError?: ErrorResponse | SerializedError;
};

export const MediaLoading = ({ aniLoading, malLoading, aniError, malError }: LoadingProps) => {
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
            <LoadingItem loading={aniLoading} error={aniError} icon="ANI" />
            <LoadingItem loading={malLoading} error={malError} icon="MAL" />
        </MotiView>
    );
};
