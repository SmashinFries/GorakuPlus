import { Platform, RefreshControl, ScrollView, View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import React, { memo, useCallback, useMemo } from 'react';
import { MediaCard, MediaProgressBar } from '../cards';
import { router } from 'expo-router';
import { GorakuActivityIndicator } from '../loading';
import {
	AnimeExploreQuery,
	MangaExploreQuery,
	Media,
	MediaList,
	MediaType,
	NovelExploreQuery,
} from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { QuickActionProps } from '../bottomsheets';

type RefreshableScrollProps = {
	children: React.ReactNode;
	onRefresh: () => void;
	refreshing: boolean;
};
export const RefreshableScroll = ({ children, refreshing, onRefresh }: RefreshableScrollProps) => {
	return (
		<ScrollView
			refreshControl={
				<RefreshControl
					colors={['#FFF']}
					progressBackgroundColor={'#000'}
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			}
		>
			{children}
		</ScrollView>
	);
};

type SectionScrollProps = {
	category_title: string;
	data: AnimeExploreQuery['trending']['media'] | MangaExploreQuery['trending']['media'];
	isLoading: boolean;
	onLongSelect: (props: QuickActionProps) => void;
};

const RenderItem = (props: {
	item: AnimeExploreQuery['trending']['media'][0] | MangaExploreQuery['trending']['media'][0];
	onLongPress: (params: QuickActionProps) => void;
}) => (
	<View
		style={{
			// flex: 1,
			alignItems: 'center',
			// backgroundColor: 'red',
		}}
	>
		<MediaCard
			coverImg={props.item.coverImage.extraLarge}
			titles={props.item.title}
			navigate={() => router.navigate(`/${props.item.type.toLowerCase()}/${props.item.id}`)}
			averageScore={props.item.averageScore}
			meanScore={props.item.meanScore}
			bannerText={
				(props.item as AnimeExploreQuery['trending']['media'][0])?.nextAiringEpisode
					?.airingAt as unknown as string
			}
			imgBgColor={props.item.coverImage?.color}
			showBanner={
				(props.item as AnimeExploreQuery['trending']['media'][0])?.nextAiringEpisode
					? true
					: false
			}
			scoreDistributions={props.item.stats?.scoreDistribution}
			height={210}
			isFavorite={props.item.isFavourite}
			onLongPress={() =>
				props.onLongPress({
					...props.item,
				})
			}
			mediaListEntry={props.item.mediaListEntry}
			contentAmount={
				(props.item as AnimeExploreQuery['trending']['media'][0]).episodes ??
				(props.item as MangaExploreQuery['trending']['media'][0]).chapters ??
				(props.item as NovelExploreQuery['trending']['media'][0]).volumes ??
				0
			}
		/>
	</View>
);

export const SectionScroll = ({
	category_title,
	data,
	isLoading,
	onLongSelect,
}: SectionScrollProps) => {
	const { width } = useWindowDimensions();

	const renderMediaItem = ({
		item,
	}: {
		item: AnimeExploreQuery['trending']['media'][0] | MangaExploreQuery['trending']['media'][0];
	}) => <RenderItem item={item} onLongPress={onLongSelect} />;

	return (
		<View
			style={{
				flex: 1,
				width: width,
				justifyContent: 'center',
				marginVertical: 0,
				minHeight: 230,
			}}
		>
			<Text
				variant="headlineMedium"
				style={{
					fontWeight: 'bold',
					// margin: 30,
					marginLeft: 12,
					// marginVertical: 10,
					textTransform: 'capitalize',
				}}
			>
				{category_title.toLowerCase()}
			</Text>
			<View
				style={{
					flex: 1,
					width: width,
					maxHeight: 280,
				}}
			>
				{!isLoading ? (
					<FlashList
						data={data ?? []}
						keyExtractor={(item) => item.id.toString() + category_title}
						renderItem={renderMediaItem}
						horizontal={true}
						estimatedItemSize={170}
						removeClippedSubviews
						contentContainerStyle={{
							// paddingVertical: Platform.OS === 'web' ? 40 : 0,
							paddingHorizontal: 10,
						}}
						showsHorizontalScrollIndicator={false}
						estimatedListSize={{ height: 280, width: width }}
						// onEndReached={() => {
						//     fetchMore();
						// }}
						drawDistance={width * 2}
					/>
				) : (
					<View
						style={{
							justifyContent: 'center',
							width: '100%',
							height: 280,
							alignItems: 'center',
						}}
					>
						<GorakuActivityIndicator />
					</View>
				)}
			</View>
		</View>
	);
};

export const SectionScrollMem = memo(SectionScroll);
