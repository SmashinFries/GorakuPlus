import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { useCallback } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import useStudioList from '@/hooks/studio/useStudio';
import { MediaCard, MediaCardRow } from '@/components/cards';
import { StudioHeader } from '@/components/headers';
import { GorakuActivityIndicator } from '@/components/loading';
import { StudioListQuery } from '@/api/anilist/__genereated__/gql';
import { useColumns } from '@/hooks/useColumns';

const StudioMediaListScreen = () => {
	const { studioId } = useLocalSearchParams<{ studioId: string }>();
	const { loadMore, studioData } = useStudioList(Number(studioId));
	const { height } = useWindowDimensions();
	const { itemWidth, columns, displayMode } = useColumns('search');

	const RenderItem = useCallback(
		(props: { item: StudioListQuery['Studio']['media']['nodes'][0] }) =>
			displayMode === 'COMPACT' ? (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-start',
						marginVertical: 10,
						marginHorizontal: 5,
						width: itemWidth,
					}}
				>
					<MediaCard {...props.item} fitToParent />
				</View>
			) : (
				<MediaCardRow {...props.item} />
			),
		[displayMode, itemWidth],
	);

	if (studioData.isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return (
		<View style={{ height: '100%', width: '100%' }}>
			<Stack.Screen
				options={{
					headerShown: true,
					title: `${studioData.data?.Studio.name}`,
					header: (props) => (
						<StudioHeader
							{...props}
							isFav={studioData.data?.Studio?.isFavourite}
							id={Number(studioId)}
						/>
					),
				}}
			/>
			<FlashList
				key={columns}
				numColumns={columns}
				data={studioData.data?.Studio.media?.nodes}
				keyExtractor={(item, idx) => idx.toString()}
				renderItem={RenderItem}
				contentContainerStyle={{ paddingTop: 20 }}
				estimatedItemSize={241}
				centerContent
				drawDistance={height / 2}
				onEndReached={() => loadMore()}
			/>
		</View>
	);
};

export default StudioMediaListScreen;
