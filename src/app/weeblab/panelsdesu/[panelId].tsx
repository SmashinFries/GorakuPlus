import { MediaType } from '@/api/anilist/__genereated__/gql';
import { useGetPanelGetPanel } from '@/api/panelsdesu/panelsdesu';
import { Accordion, AnimViewMem } from '@/components/animations';
import { ImageViewer } from '@/components/imageViewer';
import { GorakuActivityIndicator } from '@/components/loading';
import { ListHeading } from '@/components/text';
import { useAppTheme } from '@/store/theme/themes';
import { copyToClipboard } from '@/utils';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Button, Chip, Divider, Portal, Text } from 'react-native-paper';

const PanelPage = () => {
	const { panelId } = useLocalSearchParams<{ panelId: string }>();
	const { height } = useWindowDimensions();
	const {
		data: panelData,
		isFetching: isPanelFetching,
		isFetched: isPanelFetched,
	} = useGetPanelGetPanel(panelId, {
		query: { enabled: !!panelId, refetchOnMount: false, refetchOnReconnect: false },
	});
	const titles = useMemo(
		() => [...new Set(panelData?.data?.manga?.all_titles)],
		[panelData?.data],
	);
	const { colors } = useAppTheme();
	const [imageIndex, setImageIndex] = useState(0);
	const [isImageViewerVis, setIsImageViewerVis] = useState(false);

	const [titleIndex, setTitleIndex] = useState(0);

	const onImageSelect = (index: number) => {
		setImageIndex(index);
		setIsImageViewerVis(true);
	};

	// const { data: simPanelsData, isFetching: isSimPanelsFetching } = useGetPanelGetSimilarPanels(
	// 	panelId,
	// 	{ limit: '20' },
	// 	{ query: { enabled: !!panelId } },
	// );
	return (
		<ScrollView>
			{isPanelFetching && (
				<AnimViewMem
					style={{
						height: '100%',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</AnimViewMem>
			)}
			{isPanelFetched && (
				<AnimViewMem>
					<PagerView initialPage={0} style={{ height: height * 0.4, width: '100%' }}>
						<View key={0} style={{ height: '100%', width: '100%' }}>
							<Pressable onPress={() => onImageSelect(0)}>
								<Image
									source={{
										uri: panelData?.data?.panel?.image_url,
									}}
									contentFit="contain"
									style={{
										height: '100%',
										width: '100%',
									}}
								/>
							</Pressable>
						</View>
						<View key={1} style={{ height: '100%', width: '100%' }}>
							<Pressable onPress={() => onImageSelect(1)}>
								<Image
									source={{
										uri: panelData?.data?.page?.image_url,
									}}
									contentFit="contain"
									style={{
										height: '100%',
										width: '100%',
									}}
								/>
							</Pressable>
						</View>
					</PagerView>
					<Divider />
					<View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingTop: 16 }}>
						<Pressable
							onPress={
								() =>
									router.push({
										pathname: '/(sheets)/mediaSearchSheet',
										params: {
											type: MediaType.Manga,
											search: panelData?.data?.manga?.title,
										},
									})
								// openMediaSearchSheet({
								// 	type: MediaType.Manga,
								// 	search: panelData?.data?.manga?.title,
								// })
							}
						>
							<Image
								source={{ uri: panelData?.data?.manga?.icon_url }}
								style={{
									height: 80,
									width: undefined,
									aspectRatio: 1,
									borderRadius: 8,
								}}
							/>
						</Pressable>
						<View style={{ flex: 1, paddingHorizontal: 12, alignItems: 'flex-start' }}>
							<Text
								variant="titleLarge"
								onLongPress={() => copyToClipboard(panelData?.data?.manga?.title)}
								onPress={() => setTitleIndex((prev) => (prev + 1) % titles?.length)}
							>
								{titles[titleIndex]}
							</Text>
							<Text variant="labelMedium" style={{ color: colors.onSurfaceVariant }}>
								Chapter {panelData?.data?.page?.chapter_number}・Page{' '}
								{panelData?.data?.page?.number}
							</Text>
						</View>
					</View>
					<View style={{ paddingVertical: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
						{panelData?.data?.manga?.tags?.map((tag, idx) => (
							<Chip
								key={idx}
								compact
								style={{
									paddingHorizontal: 5,
									marginHorizontal: 8,
									marginVertical: 4,
								}}
							>
								{tag}
							</Chip>
						))}
					</View>
					<View>
						<ListHeading
							title={'Panel Description'}
							icon="content-copy"
							onIconPress={() => copyToClipboard(panelData?.data?.panel?.description)}
						/>
						<Text
							selectable
							style={{ paddingHorizontal: 12, color: colors.onSurfaceVariant }}
						>
							{panelData?.data?.panel?.description}
						</Text>
						<Accordion title="OCR Text">
							<Text
								selectable
								style={{
									paddingHorizontal: 12,
									color: colors.onSurfaceVariant,
								}}
							>
								{panelData?.data?.panel?.ocr_text}
							</Text>
						</Accordion>
					</View>
				</AnimViewMem>
			)}
			<Portal>
				<ImageViewer
					urls={[
						panelData?.data?.panel?.image_url ?? '',
						panelData?.data?.page?.image_url ?? '',
					]}
					visible={isImageViewerVis}
					onDismiss={() => setIsImageViewerVis(false)}
					initialIndex={imageIndex}
				/>
			</Portal>
		</ScrollView>
	);
};

export default PanelPage;
