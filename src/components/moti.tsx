import { MotiProps, MotiView } from 'moti';
import { AnimateProp, MotiPressable, MotiPressableProps } from 'moti/interactions';
import React, { useMemo } from 'react';
import { Button, ButtonProps } from 'react-native-paper';

type MotiViewProps = typeof MotiView & AnimateProp;
const MotiButton = ({ ...buttonProps }: ButtonProps, { ...motiViewProps }: MotiViewProps) => {
	return (
		<MotiView {...motiViewProps}>
			<Button {...buttonProps} />
		</MotiView>
	);
};

interface SelectableProps extends MotiPressableProps {
	animation?: 'bounce' | 'opacity';
}

const Selectable = (props: SelectableProps = { animation: 'bounce' }) => {
	return (
		<MotiPressable
			{...props}
			animate={useMemo(
				() =>
					({ hovered, pressed }) => {
						'worklet';
						return {
							scale:
								props.animation === 'bounce' ? (hovered || pressed ? 0.8 : 1) : 1,
							opacity:
								props.animation === 'opacity'
									? pressed
										? 0.5
										: hovered
											? 0.75
											: 1
									: 1,
						};
					},
				[],
			)}
		/>
	);
};

export { MotiButton, Selectable };
