import { GetSearchSearchMedia200PanelsItem } from '@/api/panelsdesu/models';
import {
	useGetSearchSearchMedia,
	useGetSearchSearchMediaInfinite,
} from '@/api/panelsdesu/panelsdesu';
import { useStickyHeader } from '@/hooks/animations/useStickyHeader';
import useDebounce from '@/hooks/useDebounce';
import { useAppTheme } from '@/store/theme/themes';
import { FlashList, MasonryFlashList, MasonryListRenderItemInfo } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { Button, Searchbar, Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';

const AnimatedMasonryFlashList = Animated.createAnimatedComponent(MasonryFlashList);

const data = {
	panels: [
		{
			id: '8fd236ef-4490-4571-ab2c-77328e47589a',
			page_id: '75e476c6-4bb8-4dc6-8090-9909dc3fa102',
			manga_id: 'bcc86a36-b0f7-49af-b5f3-28c6a1af3ac9',
			x: 38,
			y: 291,
			width: 381,
			height: 294,
			created_at: '2024-08-05T23:48:50.648000Z',
			image_url:
				'https://cdn.panelsdesu.com/media/panel/d211e2e0-d0a8-4483-9801-ca885d48dbfc.jpg',
			ocr_text: 'ori\nize; yi\n\nOnt ea)\n2 A\n\n',
			description:
				'Yuzu Tachibana rushing through a hallway, while Kenta asks "What\'s with the rush? Yuzu" with an annoyed expression, in Yokohama Kaidashi Kikou.',
			phash: 'f29e58ada72c1b42',
		},
		{
			id: '0c126a68-8b21-4dd1-98a5-dcc2b4ab3bce',
			page_id: '46f00e9d-1cb0-4ede-8fae-8fcc11c9fade',
			manga_id: '38db13ad-42d8-4ca4-958a-0c71e7fe1f34',
			x: 0,
			y: 793,
			width: 663,
			height: 195,
			created_at: '2024-08-12T16:57:13.702000Z',
			image_url:
				'https://cdn.panelsdesu.com/media/panel/4b45e65b-965f-400e-8777-a6fe29ff3c68.jpg',
			ocr_text: '',
			description: 'Marin Kitagawa is holding a crumpled piece of paper.',
			phash: 'c948b74cb62996b6',
		},
		{
			id: 'bd0b5a33-03d7-4071-9cd6-6fd032c9986f',
			page_id: '9faff167-cb32-4739-9988-2f2fed107656',
			manga_id: '8ff207ee-38db-448b-b88f-c93340eb2523',
			x: 0,
			y: 83,
			width: 322,
			height: 250,
			created_at: '2024-08-12T16:41:13.030000Z',
			image_url:
				'https://cdn.panelsdesu.com/media/panel/182979e5-c9d9-433f-a184-d993aa36face.jpg',
			ocr_text: '',
			description:
				'Close-up of a person\'s feet wearing traditional wooden sandals (geta), with diagonal motion lines in the background and a speech bubble with an ellipsis ("....") indicating silence or hesitation.',
			phash: 'e5a4493264b973e6',
		},
		{
			id: 'fab59c03-54ed-48d4-86ff-b8e06b217c21',
			page_id: 'a4f0308d-1309-4c4e-a8b1-3a6d1e879529',
			manga_id: 'b726c2e4-3716-4240-82f7-70cc7bbe9e5e',
			x: 441,
			y: 367,
			width: 237,
			height: 256,
			created_at: '2024-08-10T01:37:57.639000Z',
			image_url:
				'https://cdn.panelsdesu.com/media/panel/50b25b4a-e317-4269-87b4-4697a12ca9ea.jpg',
			ocr_text: '0 KITAN are\nX CUR TOUS MYSTERY\nSTORIES\n',
			description: '"Kitan are curious mystery stories. Kagutsuchi is the god of fire."',
			phash: 'a149b7389fc4703e',
		},
		{
			id: '61d8b732-9e62-477e-b8ce-a23ff60d04db',
			page_id: '0a82ae04-e6ab-46ec-acd2-18ca49b1e0b0',
			manga_id: '4b5ca44f-be14-47d3-afce-f2d7e3168152',
			x: 34,
			y: 22,
			width: 743,
			height: 419,
			created_at: '2024-08-12T16:36:23.758000Z',
			image_url:
				'https://cdn.panelsdesu.com/media/panel/a9e2e5a7-06dc-4638-b150-6ecfd22d18a9.jpg',
			ocr_text: "FROM NOW ON,\nWE'RE GONG\nTO BENG THE {\nPREPARATION |\n\nFOR HATSL,\n\n",
			description:
				'Hunter x Hunter, city street, people walking, text: "From now on, we\'re going to being the preparation for Hatsu.", Hatsu training, chapter title "N°060 Réussite", tall building in the background.',
			phash: '8783e038ca5f35dc',
		},
		{
			id: 'da94825e-60f0-4ca2-bc16-2a2b50897134',
			page_id: 'e31fdd0c-5b6d-487b-a8a2-e4be20937183',
			manga_id: 'bcc86a36-b0f7-49af-b5f3-28c6a1af3ac9',
			x: 36,
			y: 419,
			width: 624,
			height: 153,
			created_at: '2024-08-05T23:59:02.243000Z',
			image_url:
				'https://cdn.panelsdesu.com/media/panel/862678e7-42db-4ba1-bb8c-9e25c8c06d75.jpg',
			ocr_text: '',
			description:
				'Rukia from the manga "Bleach" is shown in this panel, looking to the side with a serious expression. A cityscape with buildings is in the background. The text reads, "...That\'s the gist of it."',
			phash: 'ec66627c0cc7169b',
		},
		{
			id: '95bb4408-727e-41b2-a7dc-4245de7348aa',
			page_id: '36a32ee9-3d71-4ea5-8477-53f0492d2260',
			manga_id: 'bcc86a36-b0f7-49af-b5f3-28c6a1af3ac9',
			x: 39,
			y: 290,
			width: 631,
			height: 156,
			created_at: '2024-08-05T23:55:33.193000Z',
			image_url:
				'https://cdn.panelsdesu.com/media/panel/7f85f9f7-d6e0-4518-80df-fc5ac0ee86f0.jpg',
			ocr_text: '',
			description: 'Signboard with Japanese text "クロサキ医院" (Kurosaki Clinic).',
			phash: 'ca026d9235db355b',
		},
		{
			id: '31ba31a9-5b1d-495e-878f-c454885dba88',
			page_id: 'e3e1ac8a-cca6-4606-a6d8-0f06a4af7f10',
			manga_id: 'de9b7874-d868-4b03-aee6-9e3f5b68d474',
			x: 0,
			y: 638,
			width: 354,
			height: 534,
			created_at: '2024-08-06T01:13:15.324000Z',
			image_url:
				'https://cdn.panelsdesu.com/media/panel/711536d3-e442-4a68-bcc4-fb0b10921e9d.jpg',
			ocr_text: 'AUTHOR: HERO.\nARTIST: HAGIWARA DAISUKE\n\n',
			description:
				'close-up of apron, hand holding plaid cloth or towel, text "AUTHOR: HERO" "ARTIST: HAGIWARA DAISUKE", text cut-off "page."',
			phash: 'c2ff85aaaa2a0477',
		},
		{
			id: 'fcc5e8b7-ec6a-4fa2-83e2-c6890436f56d',
			page_id: '03c59fe9-4834-45b5-b52f-eca091531fa4',
			manga_id: 'ae0be8ff-72b3-4848-b78e-bd76dd45d59e',
			x: 62,
			y: 0,
			width: 738,
			height: 650,
			created_at: '2024-08-12T06:14:02.009000Z',
			image_url:
				'https://cdn.panelsdesu.com/media/panel/aafe198d-2fee-45dd-bdfa-95f0cf860eb2.jpg',
			ocr_text: '',
			description:
				'In this panel, characters Yakou and Baku Madarame from Usogui are shown in a motion sequence as Baku reacts to an attack from Yakou. The background is patterned with a checkerboard design, and the panel emphasizes dynamic movement and intense action. Yakou is delivering swift, powerful strikes.',
			phash: 'a6ead11489b66ea5',
		},
		{
			id: '4897ac03-6681-415a-ba6a-0b51d901781a',
			page_id: '8ab152e9-5774-4bdb-af0c-ff1fa893698a',
			manga_id: '9026bab2-66b1-45ed-ad88-9923e0e3831d',
			x: 0,
			y: 406,
			width: 1060,
			height: 492,
			created_at: '2024-08-10T03:49:13.482000Z',
			image_url:
				'https://cdn.panelsdesu.com/media/panel/8d107b1c-b78a-4594-bfc9-918cecfc0684.jpg',
			ocr_text: '',
			description:
				'urana kei, chapter 35 "happy times", two characters walking in an alleyway, a cat-eared child with a bag and a girl wearing a dress, graffiti design by andou hideyoshi, dilapidated buildings in the background, a flower growing near a wall.',
			phash: 'd7ebc60618f01b47',
		},
	],
};

const PanelItem = ({ item }: { item: GetSearchSearchMedia200PanelsItem }) => {
	return (
		<Pressable
			onPress={() => router.navigate(`/(tabs)/more/weeblab/panelsdesu/${item.id}`)}
			style={{
				flex: 1,
				aspectRatio: item?.width / item?.height,
				minHeight: 80,
			}}
		>
			<Image
				transition={800}
				source={{ uri: item.image_url, width: item.width, height: item.height }}
				contentFit="contain"
				recyclingKey={item.image_url}
				style={{
					// width: '100%',
					// height: '100%',
					aspectRatio: item?.width / item?.height,
				}}
			/>
		</Pressable>
	);
};

const PanelsDesuPage = () => {
	const { colors } = useAppTheme();
	const [query, setQuery] = useState('');
	const [searchbarHeight, setSearchbarHeight] = useState(0);
	const queryDebounced = useDebounce(query, 700);
	const { width } = useWindowDimensions();
	const { data, error, isFetching } = useGetSearchSearchMedia(
		{ q: queryDebounced, limit: '100' },
		{ query: { enabled: !!queryDebounced } },
	);

	const { scrollHandler, stickyHeaderStyle } = useStickyHeader(searchbarHeight);

	const renderItem = useCallback(
		(props: MasonryListRenderItemInfo<GetSearchSearchMedia200PanelsItem>) => {
			return <PanelItem {...props} />;
		},
		[],
	);
	// const data = { data: null };

	// useEffect(() => {
	// 	if (data) {
	// 		console.log('Panels:', data?.data?.panels?.length);
	// 	}
	// }, [data]);

	return (
		<View style={{ flex: 1, width: '100%' }}>
			<Animated.View style={[stickyHeaderStyle]}>
				<Searchbar
					mode="view"
					value={query}
					elevation={0}
					onChangeText={(txt) => setQuery(txt)}
					style={[{ backgroundColor: colors.elevation.level2 }]}
					icon={'arrow-left'}
					onClearIconPress={() => setQuery('')}
					onIconPress={() => router.back()}
					loading={isFetching}
					onLayout={(e) => setSearchbarHeight(e.nativeEvent.layout.height)}
				/>
			</Animated.View>
			<AnimatedMasonryFlashList
				data={data?.data?.panels}
				ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
				contentContainerStyle={{ paddingHorizontal: 8 }}
				renderItem={renderItem}
				onScroll={scrollHandler}
				estimatedItemSize={268}
				numColumns={2}
				keyboardDismissMode={'on-drag'}
				// ListHeaderComponent={() => (

				// )}
			/>
		</View>
	);
};

export default PanelsDesuPage;
