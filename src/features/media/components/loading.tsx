import { AnimatePresence, MotiView, useDynamicAnimation } from 'moti';
import { ActivityIndicator, IconButton, Text, useTheme } from 'react-native-paper';
import { AnilistIcon, MalIcon, MangaUpdatesIcon } from '../../../components/svgs';
import { MotiPressable } from 'moti/interactions';
import { memo, useEffect, useState } from 'react';
import { ErrorResponse } from '@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes';
import { SerializedError } from '@reduxjs/toolkit';

const LoadingIcon = ({ icon, dark }: { icon: 'ANI' | 'MAL' | 'MU'; dark: boolean }) => {
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
                delay: icon === 'ANI' ? 100 : icon === 'MAL' ? 400 : 700,
            }}
        >
            {icon === 'ANI' ? (
                <AnilistIcon isDark={dark} />
            ) : icon === 'MAL' ? (
                <MalIcon />
            ) : (
                <MangaUpdatesIcon />
            )}
        </MotiView>
    );
};

const LoadingIconMem = memo(LoadingIcon);

type LoadingItemProps = {
    loading: boolean;
    dark: boolean;
    error?: ErrorResponse | SerializedError;
    icon: 'ANI' | 'MAL' | 'MU';
};
const LoadingItem = ({ loading, dark, icon, error }: LoadingItemProps) => {
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
            <LoadingIconMem icon={icon} dark={dark} />
            {loading ? (
                <ActivityIndicator style={{ paddingTop: 10 }} />
            ) : (
                <IconButton icon={loadIcon} iconColor={loadIcon === 'check' ? 'green' : 'red'} />
            )}
        </MotiView>
    );
};

const LoadingItemMem = memo(LoadingItem);

type LoadingProps = {
    aniLoading: boolean;
    aniError?: ErrorResponse | SerializedError;
    malLoading?: boolean;
    malError?: ErrorResponse | SerializedError;
    malUnitialized?: boolean;
    mangaUpdatesLoading?: boolean;
    mangaUpdatesError?: ErrorResponse | SerializedError;
};

export const MediaLoading = ({
    aniLoading,
    malLoading,
    mangaUpdatesLoading,
    aniError,
    malError,
    mangaUpdatesError,
    malUnitialized,
}: LoadingProps) => {
    const { dark } = useTheme();
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
                duration: 500,
            }}
        >
            <LoadingItemMem loading={aniLoading} dark={dark} error={aniError} icon="ANI" />
            <LoadingItemMem
                loading={malLoading || malUnitialized}
                dark={dark}
                error={malError}
                icon="MAL"
            />
            {mangaUpdatesLoading !== null && (
                <LoadingItemMem
                    loading={mangaUpdatesLoading}
                    dark={dark}
                    error={mangaUpdatesError}
                    icon="MU"
                />
            )}
        </MotiView>
    );
};

export const MediaLoadingMem = memo(MediaLoading);
