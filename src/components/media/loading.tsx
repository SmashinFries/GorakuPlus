import { ActivityIndicator, Button, IconButton, Text, useTheme } from 'react-native-paper';
import { AnilistIcon, MalIcon, MangaUpdatesIcon } from '../svgs';
import { memo, useEffect, useState } from 'react';
import { ErrorResponse } from '@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes';
import { SerializedError } from '@reduxjs/toolkit';
import Animated, {
    Easing,
    FadeIn,
    FadeOut,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const LoadingIcon = ({ icon, dark }: { icon: 'ANI' | 'MAL' | 'MU'; dark: boolean }) => {
    const iconAnimValue = useSharedValue({ transY: 0, rotateZ: '0deg' });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: iconAnimValue.value.transY },
                { rotateZ: iconAnimValue.value.rotateZ },
            ],
        };
    });

    useEffect(() => {
        iconAnimValue.value = {
            transY: withRepeat(withTiming(-15, { duration: 1500 })),
            rotateZ: withRepeat(withTiming('360deg', { duration: 1500 }), -1),
        };
    }, []);

    return (
        <Animated.View
        // style={[animatedStyle]}
        // animate={{
        //     translateY: -15,
        //     rotateZ: '360deg',
        // }}
        // transition={{
        //     loop: true,
        //     type: 'timing',
        //     duration: 1500,
        //     delay: icon === 'ANI' ? 100 : icon === 'MAL' ? 400 : 700,
        // }}
        >
            {icon === 'ANI' ? (
                <AnilistIcon isDark={dark} />
            ) : icon === 'MAL' ? (
                <MalIcon />
            ) : (
                <MangaUpdatesIcon />
            )}
        </Animated.View>
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
        } else if (error?.status === 'FETCH_ERROR') {
            setLoadIcon('network-off-outline');
        } else if (loading === false && !error) {
            setLoadIcon('check');
        }
    }, []);
    return (
        <Animated.View style={{ padding: 20 }}>
            <LoadingIconMem icon={icon} dark={dark} />
            {loading ? (
                <ActivityIndicator style={{ paddingTop: 10 }} />
            ) : (
                <IconButton icon={loadIcon} iconColor={loadIcon === 'check' ? 'green' : 'red'} />
            )}
        </Animated.View>
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
}: LoadingProps) => {
    const { dark } = useTheme();

    // const opacity = useSharedValue(1);

    // const animatedStyle = useAnimatedStyle(() => {
    //     return {
    //         opacity: opacity.value,
    //     }
    // });

    return (
        <Animated.View
            style={[
                {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                },
            ]}
            entering={FadeIn.duration(500).easing(Easing.ease)}
            exiting={FadeOut.duration(500).easing(Easing.ease)}
        >
            <LoadingItemMem loading={aniLoading} dark={dark} error={aniError} icon="ANI" />
            <LoadingItemMem loading={malLoading} dark={dark} error={malError} icon="MAL" />
            {mangaUpdatesLoading !== null && (
                <LoadingItemMem
                    loading={mangaUpdatesLoading}
                    dark={dark}
                    error={mangaUpdatesError}
                    icon="MU"
                />
            )}
        </Animated.View>
    );
};

export const MediaLoadingMem = memo(MediaLoading);
