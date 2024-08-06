import { AnimatePresence, MotiImage, MotiView } from 'moti';
import { useTheme } from 'react-native-paper';
import { AnimeExploreQuery, ExploreMediaQuery } from '@/store/services/anilist/generated-anilist';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import useBackground from '@/hooks/explore/background';

type BackgroundArtProps = {
	data: AnimeExploreQuery['trending']['media'];
	currentBG: string;
	width: number;
	height: number;
};
export const BackgroundArt = ({ data, width, height }: BackgroundArtProps) => {
	// const [bg, setBg] = useState({ id: 0, bg: getBG(data.Page.media[0]) });
	const { colors } = useTheme();
	const { bg, key, visible, updateBG } = useBackground(data);

	return (
		<MotiView
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
			<AnimatePresence
				// exitBeforeEnter
				onExitComplete={() => {
					updateBG();
				}}
			>
				{visible && (
					<MotiImage
						source={{
							uri: bg,
						}}
						from={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						exitTransition={{ type: 'timing', duration: 2500 }}
						transition={{ type: 'timing', duration: 2500 }}
						// key={bg}
						// source={{ uri: currentBG }}
						style={{ height: height, width: width }}
						resizeMode="cover"
					/>
				)}
			</AnimatePresence>

			<BlurView
				intensity={25}
				style={{ position: 'absolute', width: '100%', height: '100%' }}
			/>
			<LinearGradient
				colors={[colors.background, 'transparent', colors.background]}
				locations={[0, 0.6, 1]}
				style={{ position: 'absolute', width: '100%', height: '100%' }}
			/>
		</MotiView>
	);
};
