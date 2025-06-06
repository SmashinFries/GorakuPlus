import { useEffect, useState } from 'react';
import { ActivityIndicator, IconButton, useTheme } from 'react-native-paper';
import { AnilistIcon, DanbooruIcon } from '../svgs';
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import { View } from 'react-native';
import { useAppTheme } from '@/store/theme/themes';
import { useMatchStore } from '@/store/matchStore';
import { useShallow } from 'zustand/react/shallow';

const LoadingIcon = ({ icon, dark }: { icon: 'ani' | 'danbooru'; dark: boolean }) => {
	return (
		<View
		// from={{
		// 	translateY: 0,
		// 	rotateZ: '0deg',
		// }}
		// animate={{
		// 	translateY: -15,
		// 	rotateZ: '360deg',
		// }}
		// transition={{
		// 	loop: true,
		// 	type: 'timing',
		// 	duration: 1500,
		// 	delay: icon === 'ani' ? 100 : icon === 'danbooru' ? 400 : 700,
		// }}
		>
			{icon === 'ani' ? <AnilistIcon isDark={dark} /> : <DanbooruIcon />}
		</View>
	);
};

type LoadingItemProps = {
	loading: boolean;
	dark: boolean;
	error?: any;
	icon: 'ani' | 'danbooru';
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
	}, [loading, error]);
	return (
		<View style={{ padding: 20 }}>
			<LoadingIcon icon={icon} dark={dark} />
			{loading ? (
				<ActivityIndicator style={{ paddingTop: 10 }} />
			) : (
				<IconButton icon={loadIcon} iconColor={loadIcon === 'check' ? 'green' : 'red'} />
			)}
		</View>
	);
};

type LoadingProps = {
	aniLoading: boolean;
	artLoading: boolean;
	aniError?: any;
	artError?: any;
};

export const CharacterLoading = ({ aniLoading, artLoading, aniError, artError }: LoadingProps) => {
	const { dark } = useAppTheme();
	const { isBooruEnabled } = useMatchStore(
		useShallow((state) => ({
			isBooruEnabled: state.isBooruEnabled,
		})),
	);
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
			<LoadingItem loading={aniLoading} dark={dark} error={aniError} icon="ani" />
			{isBooruEnabled && (
				<LoadingItem loading={artLoading} dark={dark} error={artError} icon="danbooru" />
			)}
		</Animated.View>
	);
};
