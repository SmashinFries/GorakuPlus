import { ActivityIndicator, Button, IconButton, Text, useTheme } from 'react-native-paper';
import { AnilistIcon, AnimeThemesIcon, MalIcon, MangaUpdatesIcon } from '../svgs';
import { memo, useEffect, useState } from 'react';
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import { useAppTheme } from '@/store/theme/themes';
import { useIsFetching } from '@tanstack/react-query';
import { useMatchStore } from '@/store/matchStore';

export const LoadingIcon = ({
	icon,
	dark,
}: {
	icon: 'ANI' | 'MAL' | 'MU' | 'AT';
	dark: boolean;
}) => {
	const iconAnimValue = useSharedValue({ transY: 0, rotateZ: '0deg' });

	// const animatedStyle = useAnimatedStyle(() => {
	//     return {
	//         transform: [
	//             { translateY: iconAnimValue.value.transY },
	//             { rotateZ: iconAnimValue.value.rotateZ },
	//         ],
	//     };
	// });

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
			) : icon === 'MU' ? (
				<MangaUpdatesIcon />
			) : (
				<AnimeThemesIcon isDark={dark} />
			)}
		</Animated.View>
	);
};

const LoadingIconMem = memo(LoadingIcon);

type LoadingItemProps = {
	loading: boolean;
	dark?: boolean;
	error?: any;
	icon: 'ANI' | 'MAL' | 'MU' | 'AT';
};
export const LoadingItem = ({ loading, dark, icon, error }: LoadingItemProps) => {
	const [loadIcon, setLoadIcon] = useState('check');
	const { colors } = useAppTheme();
	useEffect(() => {
		if (loading === null) {
			setLoadIcon('cancel');
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
				<IconButton
					icon={loadIcon}
					iconColor={loadIcon === 'check' ? colors.primary : colors.error}
				/>
			)}
		</Animated.View>
	);
};

const LoadingItemMem = memo(LoadingItem);

type LoadingProps = {
	aniLoading: boolean;
	aniError?: any;
	malLoading?: boolean;
	malError?: any;
	malUnitialized?: boolean;
	mangaUpdatesLoading?: boolean;
	mangaUpdatesError?: any;
};

export const MediaLoading = ({
	aniLoading,
	malLoading,
	mangaUpdatesLoading,
	aniError,
	malError,
	mangaUpdatesError,
}: LoadingProps) => {
	const { dark } = useAppTheme();
	const { isMalEnabled, isMangaUpdatesEnabled } = useMatchStore((state) => ({
		isMalEnabled: state.isMalEnabled,
		isMangaUpdatesEnabled: state.isMangaDexEnabled,
	}));

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
			{isMalEnabled && (
				<LoadingItemMem loading={malLoading} dark={dark} error={malError} icon="MAL" />
			)}
			{isMangaUpdatesEnabled && mangaUpdatesLoading !== null && (
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
