import { MotiView, View } from 'moti';
import { ExploreMediaQuery, Media, MediaType } from '@/store/services/anilist/generated-anilist';
import { MediaItem, MediaItemMem, RenderMediaItem } from '../explore/media';
import { memo, useRef } from 'react';
import { Anilist, Result } from '@/store/services/tracemoe/traceMoeApi';
import { ResizeMode, Video } from 'expo-av';
import { Card, Chip, Text, useTheme } from 'react-native-paper';
import { Pressable, useWindowDimensions } from 'react-native';
import { useAppSelector } from '@/store/hooks';
import { router } from 'expo-router';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';

type ImageSearchItemProps = {
	item: Result;
};
export const ImageSearchItem = ({ item }: ImageSearchItemProps) => {
	const { roundness } = useTheme();
	const { dismissAll } = useBottomSheetModal();
	const { mediaLanguage, showNSFW } = useAppSelector((state) => state.persistedSettings);
	const { width } = useWindowDimensions();
	const anilist = item.anilist as Anilist;
	const similarity = item.similarity * 100;

	if (!showNSFW && anilist.isAdult) return null;

	return (
		<View
			style={{
				flex: 1,
				width: '100%',
				alignItems: 'center',
				marginVertical: 15,
				borderRadius: 12,
			}}
		>
			{/* <Image source={{ uri: item.image }} style={[{ height: 200, width: width }]} /> */}
			<Card mode="elevated" style={{ width: width - 20 }}>
				{/* <Card.Cover source={{ uri: item.image }} /> */}
				<Pressable
					style={{ height: 195, overflow: 'hidden', borderRadius: roundness * 3 }}
					onPress={() => {
						dismissAll();
						router.push(`/${MediaType.Anime}/${anilist.id}`);
					}}
				>
					<Video
						style={{
							flex: 1,
							height: undefined,
							width: undefined,
							padding: 16,
							justifyContent: 'flex-end',
							borderRadius: roundness * 3,
						}}
						source={{
							uri: item.video,
						}}
						resizeMode={ResizeMode.COVER}
						isMuted={true}
						isLooping
						shouldPlay
					/>
				</Pressable>
				<Card.Title title={anilist.title[mediaLanguage] ?? anilist.title.romaji} />
				<Card.Content>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text>Episode: {item.episode ?? 'N/A'}</Text>
						<View style={{ alignItems: 'flex-end' }}>
							<Chip
								style={{
									borderColor:
										similarity >= 95
											? 'green'
											: similarity < 95 && similarity >= 90
												? 'yellow'
												: 'red',
									borderWidth: 1,
								}}
							>
								~{similarity.toFixed(2)} %
							</Chip>
						</View>
					</View>
				</Card.Content>
			</Card>
		</View>
	);
};
