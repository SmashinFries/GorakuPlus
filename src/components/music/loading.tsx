import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { ActivityIndicator, IconButton, useTheme } from 'react-native-paper';
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import { LoadingItem } from '../media/loading';
import { ErrorResponse } from '@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes';

type LoadingProps = {
    isLoading: boolean;
    error?: FetchBaseQueryError | SerializedError;
};

export const MusicLoading = ({ isLoading, error }: LoadingProps) => {
    const { dark } = useTheme();
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
            <LoadingItem loading={isLoading} dark={dark} error={error} icon="AT" />
        </Animated.View>
    );
};
