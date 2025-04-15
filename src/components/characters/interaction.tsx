import { useWindowDimensions } from 'react-native';
import { Share, View } from 'react-native';
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
						label="Edit"
						isLoading={false}
						icon={'file-document-edit-outline'}
						onPress={() => openWebBrowser(edit_url)}
					/>
				</View>
				<View
					style={{
						width: containerWidth,
						borderRadius: 12,
						alignItems: 'center',
					}}
				>
					<ActionIcon
						label={'Share'}
						isLoading={false}
						icon={'share-variant-outline'}
						onPress={() => Share.share({ url: share_url, message: share_url })}
					/>
				</View>
				<View style={{ width: containerWidth, borderRadius: 12, alignItems: 'center' }}>
					<ActionIcon
						icon={isFavorite ? 'heart' : 'heart-outline'}
						iconColor={isFavorite ? colors.primary : undefined}
						disabled={userID ? false : true}
						isLoading={isPending}
						onPress={onFavoriteToggle}
						label={isFavorite ? 'Favorited' : 'Favorite'}
						labelStyle={{
							color: isFavorite ? colors.primary : colors.onSurfaceVariant,
						}}
					/>
				</View>
			</View>
		</View>
	);
};
