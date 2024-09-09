import { MD3DarkTheme, Text } from 'react-native-paper';
import { ListHeading } from '../text';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import useImageRotation from '@/hooks/useImageRotation';
import { UserFavoritesOverviewQuery } from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';

type FavoriteItemProps = {
	images: string[]; // URLS
	title: string;
	onPress: () => void;
	size?: number;
};
const FavoriteItem = ({ images, title, size, onPress }: FavoriteItemProps) => {
	const img_src = useImageRotation(images);

	if (!images) return null;

	return (
		<Pressable onPress={onPress}>
			<View
				style={{ alignItems: 'center', width: size + 20, height: size, borderRadius: 12 }}
			>
				<Image
					source={{
						uri: img_src,
					}}
					transition={2000}
					style={[
						{
							height: size,
							width: size,
							borderRadius: 12,
						},
					]}
				/>
				<LinearGradient
					style={{
						position: 'absolute',
						borderRadius: 12,
						width: size,
						height: size,
						alignSelf: 'center',
					}}
					colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
					locations={[0, 0.5, 1]}
				/>
				<View
					style={{
						position: 'absolute',
						height: size,
						width: size,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text
						style={{ fontWeight: '900', color: MD3DarkTheme.colors.onBackground }}
						variant="titleMedium"
					>
						{title}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

type FavoritesOverviewProps = {
	data: UserFavoritesOverviewQuery['User']['favourites'];
	userId: number;
};
const FavoritesOverview = ({ data, userId }: FavoritesOverviewProps) => {
	const { width } = useWindowDimensions();
	const anime_images = data?.anime?.nodes
		? data?.anime?.nodes?.map((anime) => anime?.coverImage?.extraLarge)?.slice(0, 10)
		: null;
	const manga_images = data?.manga?.nodes
		? data?.manga?.nodes?.map((manga) => manga?.coverImage?.extraLarge)?.slice(0, 10)
		: null;
	const character_images = data?.characters?.nodes
		? data?.characters?.nodes?.map((character) => character?.image?.large)?.slice(0, 10)
		: null;
	const staff_images = data?.staff?.nodes
		? data?.staff?.nodes?.map((staff) => staff?.image?.large)?.slice(0, 10)
		: null;

	const onNav = (type: 'characters' | 'anime' | 'manga' | 'staff') => {
		router.navigate({
			pathname: `/favorites/${type}`,
			params: {
				userId: userId,
			},
		});
	};

	return (
		<View style={{ width: width, overflow: 'visible' }}>
			<ListHeading title="Favorites" />
			{anime_images?.length > 0 ||
			manga_images?.length > 0 ||
			character_images?.length > 0 ||
			staff_images?.length > 0 ? (
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{character_images?.length > 0 && (
						<FavoriteItem
							images={character_images ?? []}
							title="Waifus"
							onPress={() => onNav('characters')}
							size={160}
						/>
					)}
					{anime_images?.length > 0 && (
						<FavoriteItem
							images={anime_images ?? []}
							title="Anime"
							onPress={() => onNav('anime')}
							size={160}
						/>
					)}
					{manga_images?.length > 0 && (
						<FavoriteItem
							images={manga_images ?? []}
							title="Manga"
							onPress={() => onNav('manga')}
							size={160}
						/>
					)}
					{staff_images?.length > 0 && (
						<FavoriteItem
							images={staff_images ?? []}
							title="Staff"
							onPress={() => onNav('staff')}
							size={160}
						/>
					)}
					{/* <FavoriteItem items={data.characters} /> */}
					{/* <FlashList
                    // @ts-ignore - not sure how to handle this type :/
                    data={data}
                    renderItem={({ item }) => <ActivityItem item={item} onTrash={onTrash} />}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    estimatedItemSize={185}
                    showsHorizontalScrollIndicator={false}
                /> */}
				</ScrollView>
			) : (
				<Text style={{ textAlign: 'center' }}>{'No favorites yet :('}</Text>
			)}
			{/* <Portal>
            </Portal> */}
		</View>
	);
};

export default FavoritesOverview;
