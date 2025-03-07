import { useInfiniteCharacterSearchQuery } from '@/api/anilist/__genereated__/gql';
import { usePredictWaifu } from '@/api/huggingface/hf';
import { CharacterCard, CharacterRowCard } from '@/components/cards';
import { GorakuActivityIndicator } from '@/components/loading';
import { BottomSheetParent, GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { useColumns } from '@/hooks/useColumns';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

export type CharacterSearchProps = {
	name?: string;
	imageUrl?: string;
};

const CharacterSearchSheet = () => {
	const { ...params } = useLocalSearchParams<CharacterSearchProps>();
	const scrollRef = useRef<FlatList>(null);
	const predictionQuery = usePredictWaifu(params?.imageUrl, {
		enabled: params?.imageUrl ? true : false,
	});
	// (predictionQuery?.data?.data as WdTaggerOutput)[2].;
	const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteCharacterSearchQuery(
		{
			search:
				params?.imageUrl && predictionQuery?.data
					? predictionQuery?.data[1]?.label?.split('(')[0]
					: params?.name
						? params?.name
						: '',
		},
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage?.Page?.pageInfo?.hasNextPage) {
					return {
						page: (lastPage?.Page?.pageInfo?.currentPage ?? 0) + 1,
					};
				}
			},
			enabled: (params?.imageUrl && !!predictionQuery?.data?.[1]?.label) || !!params?.name,
		},
	);

	const { columns, itemWidth, displayMode } = useColumns('search');

	const flatData = data?.pages?.flatMap((chars) => chars?.Page?.characters);

	return (
		<GlobalBottomSheetParent scrollRef={scrollRef}>
			<FlatList
				key={columns}
				ref={scrollRef}
				nestedScrollEnabled
				data={flatData}
				keyExtractor={(item, idx) => idx?.toString()}
				numColumns={columns}
				ListHeaderComponent={() => (
					<View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
						<Text variant="headlineMedium">Character Search</Text>
						<Divider />
						{predictionQuery.isFetching ||
							(isFetching && (
								<View style={{ justifyContent: 'center', alignItems: 'center' }}>
									<GorakuActivityIndicator />
									<Text>
										{predictionQuery && predictionQuery?.isFetching
											? 'Running predictions'
											: 'Searching the character'}
									</Text>
								</View>
							))}
					</View>
				)}
				contentContainerStyle={{ paddingBottom: 22 * 4 }}
				renderItem={({ item }) =>
					displayMode === 'COMPACT' ? (
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'flex-start',
								marginVertical: 10,
								width: itemWidth,
							}}
						>
							<CharacterCard {...item} />
						</View>
					) : (
						<CharacterRowCard {...item} />
					)
				}
				onEndReached={() => hasNextPage && fetchNextPage()}
			/>
		</GlobalBottomSheetParent>
	);
};

export default CharacterSearchSheet;
