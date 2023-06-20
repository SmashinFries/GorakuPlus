import { MotiProps, MotiView, motify } from 'moti';
import { AnimateProp, MotiPressable, MotiPressableProps } from 'moti/interactions';
import React, { useMemo } from 'react';
import { ViewProps } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

type MotiViewProps = typeof MotiView & AnimateProp;
const MotiButton = ({ ...buttonProps }: ButtonProps, { ...motiViewProps }: MotiViewProps) => {
    return (
        <MotiView {...motiViewProps}>
            <Button {...buttonProps} />
        </MotiView>
    );
};

const Selectable = (props: MotiPressableProps) => {
    return (
        <MotiPressable
            {...props}
            animate={useMemo(
                () =>
                    ({ hovered, pressed }) => {
                        'worklet';
                        return {
                            scale: hovered || pressed ? 0.8 : 1,
                        };
                    },
                [],
            )}
        />
    );
};

export { MotiButton, Selectable };
