import { StyleSheet, useWindowDimensions } from 'react-native';
import { Share, View } from 'react-native';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';
import { ActionIcon } from '../media/sections/entry';
import { openWebBrowser } from '@/utils/webBrowser';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';

type CharStaffInteractionBarProps = {
	isFav: boolean;
	favLoading: boolean;
	toggleFav: () => void;
	share_url: string;
	edit_url: string;
};
export const CharStaffInteractionBar = ({
	isFav,
	favLoading,
	edit_url,
	share_url,
	toggleFav,
}: CharStaffInteractionBarProps) => {
	const { userID } = useAuthStore().anilist;
	const { colors } = useAppTheme();
	const { width } = useWindowDimensions();
	const containerWidth = width / 3;

	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					marginTop: 15,
					alignItems: 'flex-start',
				}}
			>
				<View
					style={{
						width: containerWidth,
						borderRadius: 12,
						alignItems: 'center',
					}}
				>
					<ActionIcon
						icon={'file-document-edit-outline'}
						onPress={() => openWebBrowser(edit_url)}
					>
						<Text
							style={{
								textTransform: 'capitalize',
								color: colors.onSurfaceVariant,
								textAlign: 'center',
							}}
							variant="labelMedium"
						>
							{'Edit'}
						</Text>
					</ActionIcon>
				</View>
				<View
					style={{
						width: containerWidth,
						borderRadius: 12,
						alignItems: 'center',
					}}
				>
					<ActionIcon
						icon={'share-variant-outline'}
						onPress={() => Share.share({ url: share_url, message: share_url })}
					>
						<Text
							style={{
								textTransform: 'capitalize',
								color: colors.onSurfaceVariant,
								textAlign: 'center',
							}}
							variant="labelMedium"
						>
							{'Share'}
						</Text>
					</ActionIcon>
				</View>
				<View style={{ width: containerWidth, borderRadius: 12, alignItems: 'center' }}>
					{favLoading ? (
						<ActivityIndicator
							animating
							size={'small'}
							style={{ transform: [{ scale: 0.9 }] }}
						/>
					) : (
						<ActionIcon onPress={() => toggleFav()}>
							<IconButton
								icon={isFav ? 'heart' : 'heart-outline'}
								iconColor={isFav ? colors.primary : null}
								disabled={userID ? false : true}
								size={24}
							/>
							<Text
								style={{
									textTransform: 'capitalize',
									color: isFav ? colors.primary : colors.onSurfaceVariant,
								}}
								variant="labelMedium"
							>
								{isFav ? 'Favorited' : 'Favorite'}
							</Text>
						</ActionIcon>
					)}
				</View>
			</View>
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
