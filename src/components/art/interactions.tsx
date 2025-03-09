import { Share, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import { saveImage } from '../../utils/images';

type InteractionBarProps = {
	url?: string;
	share_url?: string;
	name?: string;
};
export const InteractionBar = ({ url, name, share_url }: InteractionBarProps) => {
	return (
		<View style={[styles.container]}>
			<Divider />
			<View style={[styles.iconsContainer]}>
				<IconButton
					icon="share-variant-outline"
					onPress={() => share_url && Share.share({ url: share_url, message: share_url })}
					disabled={!share_url}
				/>
				<IconButton
					icon="download-outline"
					onPress={() => url && saveImage(url, name)}
					disabled={!url}
				/>
				{/* <IconButton
                    icon="heart-outline"
                    iconColor={colors.onSurfaceVariant}
                    onPress={() => Burnt.toast({ title: 'Coming Soon!', duration: TOAST.SHORT })}
                /> */}
			</View>
			<Divider />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
	},
	iconsContainer: {
		flexDirection: 'row',
		marginTop: 5,
		justifyContent: 'space-evenly',
	},
});
