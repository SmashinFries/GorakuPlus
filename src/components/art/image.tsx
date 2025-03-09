import { useAppTheme } from '@/store/theme/themes';
import { Image } from 'expo-image';
import { Pressable, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';

const blurhash =
	'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type PostImageProps = {
	aspectRatio?: number;
	img_url?: string;
	blurAmount?: number;
	style?: any;
	setImageHeight: (height: number) => void;
};
export const PostImage = ({
	style,
	blurAmount,
	img_url,
	aspectRatio,
	setImageHeight,
}: PostImageProps) => {
	const { width } = useWindowDimensions();
	const { colors } = useAppTheme();

	if (!img_url) return null;

	return (
		<Animated.View
			style={[
				style,
				{
					position: 'absolute',
					top: 0,
					// height: aspectRatio ? width / aspectRatio : 0,
					width: width,
					aspectRatio: aspectRatio,
				},
			]}
		>
			<Image
				blurRadius={blurAmount}
				placeholder={colors.blurhash}
				placeholderContentFit="contain"
				source={{ uri: img_url }}
				contentFit="contain"
				onLayout={(e) => setImageHeight(e.nativeEvent.layout.height)}
				style={{
					// height: aspectRatio ? width / aspectRatio : 0,
					height: '100%',
					width: '100%',
				}}
			/>
		</Animated.View>
	);
};
