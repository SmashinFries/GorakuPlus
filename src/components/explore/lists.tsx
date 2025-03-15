import { RefreshControl, View, useWindowDimensions } from 'react-native';
import React, { memo } from 'react';
import { MediaCard } from '../cards';
import { GorakuActivityIndicator } from '../loading';
import {
	AnimeExploreQuery,
	AnimeExploreQuery_trending_Page_media_Media,
	MangaExploreQuery,
	MangaExploreQuery_trending_Page_media_Media,
	ScoreFormat,
} from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { FlatList } from 'react-native-gesture-handler';
import { ListHeading } from '../text';

export const GorakuRefreshControl = ({
	refreshing,
	onRefresh,
	...props
}: {
	refreshing: boolean;
	onRefresh: () => void;
}) => {
	const { colors } = useAppTheme();
	return (
		<RefreshControl
			colors={[colors?.primary]}
			progressBackgroundColor={colors.elevation.level2}
			refreshing={refreshing}
			onRefresh={onRefresh}
			{...props}
		/>
	);
};

type SectionScrollProps = {
	category_title: string;
	data:
		| NonNullable<AnimeExploreQuery['trending']>['media']
		| NonNullable<MangaExploreQuery['trending']>['media'];
	viewer: AnimeExploreQuery['Viewer'];
	isLoading: boolean;
	onMore?: () => void;
};

const RenderItem = (props: {
	item: (
		| AnimeExploreQuery_trending_Page_media_Media
		| MangaExploreQuery_trending_Page_media_Media
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

export const SectionScroll = ({
	category_title,
	data,
	viewer,
	isLoading,
	onMore,
}: SectionScrollProps) => {
	const { width } = useWindowDimensions();

	const renderMediaItem = ({
		item,
	}: {
		item:
			| NonNullable<NonNullable<AnimeExploreQuery['trending']>['media']>[0]
			| NonNullable<NonNullable<MangaExploreQuery['trending']>['media']>[0];
	}) => <RenderItem item={{ ...item, scoreFormat: viewer?.mediaListOptions?.scoreFormat }} />;

	return (
		<View
			style={{
				flex: 1,
				width: width,
			}}
		>
			<ListHeading
				title={category_title}
				titleStyle={{ fontWeight: 'bold' }}
				icon={'arrow-right'}
				titleVariant="headlineMedium"
				onIconPress={onMore}
			/>
			<View
				style={{
					flex: 1,
					// maxHeight: 280,
				}}
			>
				{!isLoading ? (
					<FlatList
						data={data ?? []}
						keyExtractor={(item) => item?.id.toString() + category_title}
						renderItem={renderMediaItem}
						horizontal={true}
						// estimatedItemSize={210}
						removeClippedSubviews
						centerContent
						contentContainerStyle={{
							// paddingVertical: Platform.OS === 'web' ? 40 : 0,
							paddingHorizontal: 10,
						}}
						showsHorizontalScrollIndicator={false}
						// estimatedListSize={{ height: 210, width: width }}
						fadingEdgeLength={20}
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
