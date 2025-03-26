import { useWindowDimensions } from 'react-native';
import { Share, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { ActionIcon } from '../media/sections/entry';
import { openWebBrowser } from '@/utils/webBrowser';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { useState } from 'react';
import { useToggleFavInvalidateMutation } from '@/api/anilist/extended';
import { FavMediaType, ToggleFavMetaData } from '@/api/anilist/queryUpdates';

type CharStaffInteractionBarProps = {
	id: number;
	isFav: boolean;
	share_url: string;
	edit_url: string;
	type: FavMediaType;
};
export const CharStaffInteractionBar = ({
	id,
	isFav,
	edit_url,
	share_url,
	type,
}: CharStaffInteractionBarProps) => {
	const { userID } = useAuthStore().anilist;
	const { colors } = useAppTheme();
	const { width } = useWindowDimensions();
	const [isFavorite, setIsFavorite] = useState(isFav);
	const { isPending, mutateAsync: toggleFav } = useToggleFavInvalidateMutation({
		meta: {
			id: id,
			type: type,
		} as ToggleFavMetaData,
	});
	const containerWidth = width / 3;

	const onFavoriteToggle = async () => {
		const isStaff = share_url.includes('/staff/');
		await toggleFav(isStaff ? { staffId: id } : { characterId: id });
		setIsFavorite((prev) => !prev);
	};

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
					<ActionIcon onPress={onFavoriteToggle}>
						<IconButton
							icon={isFavorite ? 'heart' : 'heart-outline'}
							iconColor={isFavorite ? colors.primary : undefined}
							disabled={userID ? false : true}
							size={24}
							loading={isPending}
						/>
						<Text
							style={{
								textTransform: 'capitalize',
								color: isFavorite ? colors.primary : colors.onSurfaceVariant,
							}}
							variant="labelMedium"
						>
							{isFavorite ? 'Favorited' : 'Favorite'}
						</Text>
					</ActionIcon>
				</View>
			</View>
		</View>
	);
};
