import { MD3DarkTheme, Text } from 'react-native-paper';
import { ListHeading } from '../text';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { UserFavoritesOverviewQuery } from '@/store/services/anilist/generated-anilist';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import useImageRotation from '@/hooks/useImageRotation';

type FavoriteItemProps = {
	images: string[]; // URLS
	title: string;
	onPress: () => void;
	size?: number;
};
const FavoriteItem = ({ images, title, size, onPress }: FavoriteItemProps) => {
	const img_src = useImageRotation(images?.length > 0 ? images[0] : null, images);

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
};
const FavoritesOverview = ({ data }: FavoritesOverviewProps) => {
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
							onPress={() => router.push('/favorites/characters')}
							size={160}
						/>
					)}
					{anime_images?.length > 0 && (
						<FavoriteItem
							images={anime_images ?? []}
							title="Anime"
							onPress={() => router.push('/favorites/anime')}
							size={160}
						/>
					)}
					{manga_images?.length > 0 && (
						<FavoriteItem
							images={manga_images ?? []}
							title="Manga"
							onPress={() => router.push('/favorites/manga')}
							size={160}
						/>
					)}
					{staff_images?.length > 0 && (
						<FavoriteItem
							images={staff_images ?? []}
							title="Staff"
							onPress={() => router.push('/favorites/staff')}
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
