import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

export const ExploreHeader = ({
	navigation,
	options,
	route,
	showScanner,
	// toggleDrawer,
}: NativeStackHeaderProps & { toggleDrawer: () => void; showScanner: () => void }) => {
	const title = getHeaderTitle(options, route.name);

	return (
		<Appbar.Header mode="small">
			{/* {mode === 'punpun' && (
				<MotiView
					from={{ translateX: width }}
					animate={{ translateX: -width }}
					transition={{
						type: 'timing',
						duration: 25000,
						loop: true,
						repeatReverse: false,
						delay: 500,
					}}
					exit={{
						opacity: 0,
					}}
					style={{ position: 'absolute', height: 60, width: 30 }}
				>
					<MotiImage
						from={{ translateY: -5 }}
						animate={{ translateY: 5 }}
						transition={{
							type: 'timing',
							duration: 1000,
							loop: true,
							repeatReverse: true,
						}}
						source={require('../../assets/punpun.png')}
						style={{ height: 50, width: 30 }}
						resizeMode="contain"
					/>
				</MotiView>
			)} */}
			{/* @ts-ignore */}
			<Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />

			<Appbar.Content title={title} />
			<Appbar.Action icon="barcode-scan" onPress={showScanner} />
			<Appbar.Action icon="magnify" onPress={() => navigation.navigate('search')} />
		</Appbar.Header>
	);
};
