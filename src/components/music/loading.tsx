import { useTheme } from 'react-native-paper';
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import { LoadingItem } from '../media/loading';
import { useAppTheme } from '@/store/theme/themes';

type LoadingProps = {
	isLoading: boolean;
	error?: any;
};

export const MusicLoading = ({ isLoading, error }: LoadingProps) => {
	const { dark } = useAppTheme();
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
