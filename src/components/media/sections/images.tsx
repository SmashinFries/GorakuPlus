import { Portal } from 'react-native-paper';
import { Image } from 'expo-image';
import { ListHeading } from '@/components/text';
import { SaveImageDialog } from '@/utils/images';
import { useCallback, useState } from 'react';
import Animated from 'react-native-reanimated';
import { Pressable, View } from 'react-native';
import { GetAnimePicturesQueryResult } from '@/api/jikan/jikan';
import { PicturesVariantsDataItem } from '@/api/jikan/models';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';

type MalImageItemProps = {
	item: PicturesVariantsDataItem;
	index: number;
};
const MalImageItem = ({
	item,
	onDownload,
}: MalImageItemProps & { onDownload: (img: string | null | undefined) => void }) => {
	return (
		<Pressable
			onLongPress={() => {
				onDownload(item.images?.jpg?.image_url);
			}}
			style={{ marginHorizontal: 5 }}
		>
			<Image
				// @ts-ignore jikan openapi is behind
				source={{ uri: item.jpg?.large_image_url }}
				style={{ width: 225, height: 250 }}
				contentFit="scale-down"
			/>
		</Pressable>
	);
};

type MalImagesProps = {
	data: GetAnimePicturesQueryResult['data'];
};
const MalImages = ({ data }: MalImagesProps) => {
	const [selectedImg, setSelectedImg] = useState('');

	const onDismiss = useCallback(() => setSelectedImg(''), []);

	const onDownload = useCallback((img_url: string | null | undefined) => {
		img_url && setSelectedImg(img_url);
	}, []);

	const RenderItem = useCallback((props: LegendListRenderItemProps<PicturesVariantsDataItem>) => {
		return <MalImageItem {...props} onDownload={onDownload} />;
	}, []);

	if (!data?.data) {
		return null;
	}

	return (
		<Animated.View style={{ overflow: 'visible' }}>
			<ListHeading title="Images" />
			<View style={{ width: '100%', height: 260 }}>
				<LegendList
					data={data?.data}
					renderItem={RenderItem}
					keyExtractor={(item, index) => index.toString()}
					estimatedItemSize={250}
					recycleItems
					horizontal
					contentContainerStyle={{ padding: 15 }}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
			<Portal>
				<SaveImageDialog img_url={selectedImg} onDismiss={onDismiss} />
			</Portal>
		</Animated.View>
	);
};

export default MalImages;
