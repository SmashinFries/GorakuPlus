import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { View, useWindowDimensions } from 'react-native';
import { useAppTheme } from '@/store/theme/themes';

type UserBannerProps = {
	bannerImage: string;
};
export const UserBanner = ({ bannerImage }: UserBannerProps) => {
	const { width } = useWindowDimensions();
	const { colors } = useAppTheme();
	return (
		<View style={{ position: 'absolute', width: width, height: 140 }}>
			{/* <BlurView intensity={80} tint="dark"> */}
			<Image
				source={{ uri: bannerImage }}
				style={{ width: width, height: 140 }}
				contentFit="cover"
			/>
			<LinearGradient
				style={{ position: 'absolute', width: '100%', height: '100%' }}
				colors={['transparent', colors.background]}
			/>
			{/* </BlurView> */}
		</View>
	);
};
