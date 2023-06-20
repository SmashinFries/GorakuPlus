import { IconButton, Text, useTheme } from 'react-native-paper';
import { MediaStatus } from '../../../app/services/anilist/generated-anilist';
import { MotiPressable } from 'moti/interactions';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MotiView, useAnimationState, useDynamicAnimation } from 'moti';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler } from 'react-native-reanimated';

type StatusIconConfig = {
    icon: string;
    color: string;
};

type StatusIconProps = {
    status: MediaStatus;
    top?: number;
    right?: number;
};
export const StatusIcon = ({ status, right = 10, top = 10 }: StatusIconProps) => {
    const { colors } = useTheme();
    const size = 28;
    const getIcon = (): StatusIconConfig => {
        if (status === MediaStatus.Finished) return { icon: 'check-bold', color: 'green' };
        if (status === MediaStatus.Releasing) return { icon: 'clock', color: 'blue' };
        if (status === MediaStatus.NotYetReleased) return { icon: 'calendar', color: 'blue' };
        if (status === MediaStatus.Cancelled) return { icon: 'close', color: 'red' };
        if (status === MediaStatus.Hiatus) return { icon: 'pause', color: 'red' };
    };
    const config = getIcon();

    // const expand = useAnimationState({
    //     to: {
    //         width: [size, 185, { value: size, delay: 3000, type: 'timing' }],
    //     },
    // });

    const pressAnimState = useDynamicAnimation(() => ({
        width: size,
    }));

    // const textAnimState = useDynamicAnimation(() => ({
    //     opacity: 0,
    // }));

    // const textVis = useAnimationState({
    //     to: {
    //         opacity: [0, 1, { value: 0, delay: 3000, type: 'timing' }],
    //     },
    // });

    const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
        onStart: () => {
            pressAnimState.animateTo({
                width: [size, 185, { value: size, delay: 3000, type: 'timing' }],
            });
            // textAnimState.animateTo({ opacity: [0, 1, { value: 0, delay: 3000, type: 'timing' }] });
        },
    });

    return (
        <TapGestureHandler onGestureEvent={onGestureEvent}>
            <MotiView
                style={{
                    position: 'absolute',
                    bottom: -10,
                    left: -10,
                    height: size,
                    width: size,
                    borderRadius: size / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.primaryContainer,
                    flexDirection: 'row',
                }}
            >
                <MotiView
                    from={{ width: size }}
                    animate={{
                        width: [
                            size,
                            { value: 185, delay: 600, type: 'timing' },
                            { value: size, delay: 3000, type: 'timing' },
                        ],
                    }}
                    state={pressAnimState}
                    style={{
                        position: 'absolute',
                        backgroundColor: colors.primaryContainer,
                        borderRadius: size / 2,
                        height: size,
                        width: size,
                        left: 0,
                        alignItems: 'center',
                        overflow: 'hidden',
                        justifyContent: 'center',
                    }}
                >
                    <Text numberOfLines={1} style={{ textTransform: 'capitalize' }}>
                        {status?.replaceAll('_', ' ')}
                    </Text>
                </MotiView>
                <IconButton icon={config.icon} size={14} containerColor={colors.primaryContainer} />
            </MotiView>
        </TapGestureHandler>
    );
};
