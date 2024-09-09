import { View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { openWebBrowser } from '@/utils/webBrowser';
import { GetAnimeNewsQueryResult, GetMangaNewsQueryResult } from '@/api/jikan/jikan';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@/store/theme/themes';

type NewsItemProps = {
	news: GetAnimeNewsQueryResult['data']['data'][0] | GetMangaNewsQueryResult['data']['data'][0];
};

export const NewsVItem = ({ news }: NewsItemProps) => {
	return (
		<View style={{ margin: 10 }}>
			<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
				<Image
					source={{ uri: news.images?.jpg?.image_url }}
					style={{
						width: 100,
						height: undefined,
						aspectRatio: 3 / 4,
						borderRadius: 6,
					}}
					contentFit="cover"
				/>
				<View style={{ flex: 1, paddingHorizontal: 10 }}>
					<Text variant="titleMedium" style={{ paddingHorizontal: 4 }}>
						{news.title}
					</Text>
					<Divider />
					<Text variant="bodySmall" style={{ paddingVertical: 10, paddingHorizontal: 4 }}>
						{news.excerpt}
					</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
						<Button onPress={() => openWebBrowser(news?.forum_url)}>Forum</Button>
						<Button mode="elevated" onPress={() => openWebBrowser(news?.url)}>
							Article
						</Button>
					</View>
				</View>
			</View>
		</View>
	);
};

// was playing around with different layouts. realized that it just can't look good cause of image quality when horizontal
export const NewsHItem = ({ news }: NewsItemProps) => {
	const { colors } = useAppTheme();
	return (
		<View style={{ margin: 12, backgroundColor: colors.surface }}>
			<View>
				<Image
					source={{ uri: news.images?.jpg?.image_url }}
					style={{
						width: '100%',
						height: 100,
						borderTopRightRadius: 12,
						borderTopLeftRadius: 12,
					}}
					contentFit="cover"
				/>
				<LinearGradient
					colors={['transparent', colors.background]}
					style={{ position: 'absolute', width: '100%', height: '100%' }}
				/>
			</View>
			<Text variant="titleMedium" style={{ paddingHorizontal: 4 }}>
				{news.title}
			</Text>
			<Divider />
			<Text variant="bodySmall" style={{ paddingVertical: 10, paddingHorizontal: 4 }}>
				{news.excerpt}
			</Text>
			<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
				<Button onPress={() => openWebBrowser(news?.forum_url)}>Forum</Button>
				<Button mode="elevated" onPress={() => openWebBrowser(news?.url)}>
					Article
				</Button>
			</View>
		</View>
	);
};
