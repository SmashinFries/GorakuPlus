import { IconButton, Text, useTheme } from 'react-native-paper';
import {
	ExploreMediaQuery,
	FuzzyDate,
	MediaStatus,
} from '@/store/services/anilist/generated-anilist';
import { useDynamicAnimation } from 'moti';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { convertDate, getTimeUntil } from '@/utils';
import { memo, useMemo, useState } from 'react';
import { View } from 'react-native';

const statusIconConfig = {
	[MediaStatus.Finished]: { icon: 'check-bold', color: 'green' },
	[MediaStatus.Releasing]: { icon: 'clock', color: 'blue' },
	[MediaStatus.NotYetReleased]: { icon: 'calendar', color: 'blue' },
	[MediaStatus.Cancelled]: { icon: 'close', color: 'red' },
	[MediaStatus.Hiatus]: { icon: 'pause', color: 'red' },
};

type StatusIconProps = {
	status: MediaStatus;
	release_date?: FuzzyDate;
	nextEP?: ExploreMediaQuery['Page']['media'][0]['nextAiringEpisode'];
	top?: number;
	right?: number;
};
export const StatusIcon = ({ status, release_date, nextEP }: StatusIconProps) => {
	const { colors } = useTheme();
	const [statusState, setStatusState] = useState<MediaStatus>(status);
	const size = 28;
	const releaseData = convertDate(release_date);

	const title = useMemo(
		() =>
			nextEP && nextEP?.episode
				? (nextEP.episode < 1000 ? 'EP ' : '') +
					nextEP.episode +
					': ' +
					getTimeUntil(nextEP.airingAt)
				: statusState === MediaStatus.NotYetReleased && releaseData
					? releaseData
					: statusState?.replaceAll('_', ' '),
		[nextEP, statusState],
	);

	const pressAnimState = useDynamicAnimation(() => ({
		width: size,
	}));

	const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
		onStart: () => {
			pressAnimState.animateTo({
				width: [size, 185, { value: size, delay: 3000, type: 'timing' }],
			});
		},
	});

	return (
		<TapGestureHandler onGestureEvent={onGestureEvent}>
			<View
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
				<View
					// animate={{
					//     width: [
					//         size,
					//         { value: 185, delay: 600, type: 'timing' },
					//         { value: size, delay: 3000, type: 'timing' },
					//     ],
					// }}
					style={{
						position: 'absolute',
						backgroundColor: colors.primaryContainer,
						borderRadius: size / 2,
						height: size,
						width: size,
						left: 0,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text
						numberOfLines={1}
						variant="labelMedium"
						// adjustsFontSizeToFit
						style={{
							textTransform: nextEP ? undefined : 'capitalize',
							color: colors.onPrimaryContainer,
						}}
					>
						{title}
					</Text>
				</View>
				<IconButton
					icon={statusIconConfig[statusState]?.icon ?? ''}
					iconColor={colors.onPrimaryContainer}
					size={14}
					containerColor={colors.primaryContainer}
				/>
			</View>
		</TapGestureHandler>
	);
};

export const StatusIconMem = memo(StatusIcon);
