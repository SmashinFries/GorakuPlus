import { RefreshControl, ScrollView, View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import React, { memo } from 'react';
import { MediaCard } from '../cards';
import { GorakuActivityIndicator } from '../loading';
import {
	AnimeExploreQuery,
	MangaExploreQuery,
	ScoreFormat,
} from '@/api/anilist/__genereated__/gql';

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
	viewer: AnimeExploreQuery['Viewer'];
	isLoading: boolean;
};

const RenderItem = (props: {
	item: (
		| AnimeExploreQuery['trending']['media'][0]
		| MangaExploreQuery['trending']['media'][0]
	) & { scoreFormat: ScoreFormat };
}) => (
	<View
		style={{
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		<MediaCard {...props.item} height={210} scoreFormat={props.item.scoreFormat} />
	</View>
);

export const SectionScroll = ({ category_title, data, viewer, isLoading }: SectionScrollProps) => {
	const { width } = useWindowDimensions();

	const renderMediaItem = ({
		item,
	}: {
		item: AnimeExploreQuery['trending']['media'][0] | MangaExploreQuery['trending']['media'][0];
	}) => <RenderItem item={{ ...item, scoreFormat: viewer?.mediaListOptions?.scoreFormat }} />;

	return (
		<View
			style={{
				flex: 1,
				width: width,
				// minHeight: 230,
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
					// maxHeight: 280,
				}}
			>
				{!isLoading ? (
					<FlashList
						data={data ?? []}
						keyExtractor={(item) => item.id.toString() + category_title}
						renderItem={renderMediaItem}
						horizontal={true}
						estimatedItemSize={210}
						removeClippedSubviews
						centerContent
						contentContainerStyle={{
							// paddingVertical: Platform.OS === 'web' ? 40 : 0,
							paddingHorizontal: 10,
						}}
						showsHorizontalScrollIndicator={false}
						estimatedListSize={{ height: 210, width: width }}
						// onEndReached={() => {
						//     fetchMore();
						// }}
						// drawDistance={width * 2}
					/>
				) : (
					<View
						style={{
							justifyContent: 'center',
							width: '100%',
							height: 210,
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
