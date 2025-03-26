import {
	MediaSearchQuery_Page_Page_media_Media,
	MediaSort,
	MediaType,
	useInfiniteMediaSearchQuery,
} from '@/api/anilist/__genereated__/gql';
import { MediaCard, MediaCardRow } from '@/components/cards';
import { GorakuActivityIndicator } from '@/components/loading';
import { GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { useColumns } from '@/hooks/useColumns';
import { copyToClipboard } from '@/utils';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Divider, IconButton, Text } from 'react-native-paper';

export type MediaSearchProps = {
	type: MediaType;
	search: string;
	isbn?: string;
	// onRescan?: () => void;
};
const MediaSearchSheet = () => {
	const { ...params } = useLocalSearchParams<MediaSearchProps>();
	const scrollRef = useRef<FlatList>(null);
	const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteMediaSearchQuery(
		{ search: params?.search, type: params?.type, sort: MediaSort.SearchMatch, page: 1 },
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage?.Page?.pageInfo?.hasNextPage) {
					return {
						page: (lastPage?.Page?.pageInfo?.currentPage ?? 0) + 1,
					};
				}
			},
			enabled: !!(params?.search && params?.type),
		},
	);

	const { columns, itemWidth, displayMode } = useColumns('search');

	const flatData = data?.pages?.flatMap((chars) => chars?.Page?.media) ?? [];

	const MediaRenderItem = ({ item }: { item: MediaSearchQuery_Page_Page_media_Media }) => {
		return displayMode === 'COMPACT' ? (
			<View
				style={{
					alignItems: 'center',
					width: itemWidth,
				}}
			>
				<View
					style={{
						// flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-start',
						marginVertical: 10,
						marginHorizontal: 5,
					}}
				>
					<MediaCard {...item} fitToParent />
				</View>
			</View>
		) : (
			<MediaCardRow {...item} />
		);
	};

	return (
		<GlobalBottomSheetParent scrollRef={scrollRef}>
			{isFetching ? (
				<View
					style={{
						minHeight: 100,
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			) : (
				<FlatList
					ref={scrollRef}
					key={columns}
					data={flatData}
					keyExtractor={(_item, idx) => idx.toString()}
					numColumns={columns}
					centerContent
					ListHeaderComponent={() => (
						<View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
							<Text variant="headlineMedium" style={{ textTransform: 'capitalize' }}>
								{params?.type} Search
							</Text>
							{params?.isbn && (
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Text>ISBN: </Text>
										<Button
											icon={'content-copy'}
											onPress={() => copyToClipboard(params?.isbn)}
										>
											{params?.isbn}
										</Button>
									</View>
									<IconButton
										icon={'view-module'}
										onPress={() =>
											router.navigate({
												pathname: '/(sheets)/displayConfig',
												params: { type: 'search' },
											})
										}
									/>
								</View>
							)}

							<Divider />
						</View>
					)}
					nestedScrollEnabled
					renderItem={(props) => <MediaRenderItem {...props} />}
					onEndReached={() => hasNextPage && fetchNextPage()}
				/>
			)}
		</GlobalBottomSheetParent>
	);
};

export default MediaSearchSheet;
