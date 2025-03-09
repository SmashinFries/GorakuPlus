import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, View } from 'react-native';
import useBackground from '@/hooks/explore/background';
import { AnimeExploreQuery } from '@/api/anilist/__genereated__/gql';
import { Image } from 'expo-image';
import { useAppTheme } from '@/store/theme/themes';

type BackgroundArtProps = {
	data: NonNullable<AnimeExploreQuery['trending']>['media'];
	currentBG: string;
	width: number;
	height: number;
};
export const BackgroundArt = ({ data, width, height }: BackgroundArtProps) => {
	// const [bg, setBg] = useState({ id: 0, bg: getBG(data.Page.media[0]) });
	const { colors } = useAppTheme();
	const { bg, visible } = useBackground(data);

	return (
		<View
			// state={bgOpacity}
			// transition={{ type: 'timing', duration: 350 }}
			// @ts-ignore
			style={{
				position: 'absolute',
				zIndex: -1,
				height: height,
				width: width,
				top: '45%',
				left: '50%',
				transform:
					Platform.OS === 'web'
						? [{ translateX: '-50%' }, { translateY: '-50%' }]
						: undefined,
			}}
		>
			{visible && (
				<Image
					source={{
						uri: bg,
					}}
					// from={{ opacity: 0 }}
					// animate={{ opacity: 1 }}
					// exit={{ opacity: 0 }}
					// exitTransition={{ type: 'timing', duration: 2500 }}
					// transition={{ type: 'timing', duration: 2500 }}
					// key={bg}
					// source={{ uri: currentBG }}
					style={{ height: height, width: width }}
					contentFit="cover"
				/>
			)}

			<BlurView
				intensity={25}
				style={{ position: 'absolute', width: '100%', height: '100%' }}
			/>
			<LinearGradient
				colors={[colors.background, 'transparent', colors.background]}
				locations={[0, 0.6, 1]}
				style={{ position: 'absolute', width: '100%', height: '100%' }}
			/>
		</View>
	);
};
