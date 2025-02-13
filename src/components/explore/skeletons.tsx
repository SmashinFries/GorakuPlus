import { useAppTheme } from '@/store/theme/themes';
import { FlashList } from '@shopify/flash-list';
import { Platform, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export const MediaListsPHs = () => {
	const placeHolders = new Array(12).fill('');

	const { colors, dark } = useAppTheme();
	return (
		<View style={{ flexDirection: 'row' }}>
			{placeHolders.map((item, index) => (
				<View key={index}>
					{/* <Spacer /> */}
					{/* <Skeleton
                        show={true}
                        height={Platform.OS === 'web' ? 400 : 230}
                        width={Platform.OS === 'web' ? 300 : 150}
                        // colors={[colors.secondaryContainer, colors.secondary]}
                        colorMode={dark ? 'dark' : 'light'}
                    /> */}
					{/* <Spacer /> */}
				</View>
			))}
		</View>
	);
};

export const MediaListsPH = () => {
	const placeHolders = new Array(12).fill('');
	const { colors, dark } = useAppTheme();
	return (
		// <FlashList
		//     data={placeHolders}
		//     keyExtractor={(item, index) => index.toString()}
		//     renderItem={({ item, index }) => (
		//         <Skeleton
		//             show={true}
		//             height={Platform.OS === 'web' ? 400 : 230}
		//             width={Platform.OS === 'web' ? 300 : 150}
		//             // colors={[colors.secondaryContainer, colors.secondary]}
		//             colorMode={dark ? 'dark' : 'light'}
		//         />
		//     )}
		//     horizontal={true}
		//     estimatedItemSize={300}
		//     contentContainerStyle={{ padding: 20, paddingVertical: 40 }}
		//     ItemSeparatorComponent={() => <MotiView style={{ width: 20 }} />}
		//     showsHorizontalScrollIndicator={false}
		//     style={{ minHeight: 450 }}
		// />
		<View
			style={{
				height: Platform.OS === 'web' ? 400 : 230,
				width: Platform.OS === 'web' ? 300 : 150,
			}}
		/>
	);
};
