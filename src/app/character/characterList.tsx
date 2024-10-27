import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CharacterItem, CharacterLabel } from '@/components/characters/card';
import { useCallback } from 'react';
import { useCharactersList } from '@/hooks/characters/useCharacters';
import { router, useLocalSearchParams } from 'expo-router';
import { GorakuActivityIndicator } from '@/components/loading';
import { CharacterListQuery, MediaType } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { CharacterCard } from '@/components/cards';
import { useColumns } from '@/hooks/useColumns';

const CharacterListPage = () => {
	const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
	const id = parseInt(mediaId);
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useCharactersList(id);
	const { height } = useWindowDimensions();
	const { columns, itemWidth } = useColumns('search');

	const RenderItem = useCallback(
		(props: { item: CharacterListQuery['Media']['characters']['edges'][0]; index: number }) => (
			<View
				style={{
					alignItems: 'center',
					width: itemWidth,
				}}
			>
				<CharacterCard {...props.item.node} role={props.item.role} />
			</View>
		),
		[itemWidth],
	);

	if (isLoading) {
		return (
			<View
				style={{
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return (
		<View style={{ height: '100%', width: '100%' }}>
			{/* <Button onPress={() => data?.Media?.characters?.edges.length}>Print Length</Button> */}
			<FlashList
				numColumns={columns}
				key={columns}
				data={data}
				keyExtractor={(item) => item?.node?.id.toString()}
				renderItem={RenderItem}
				ListFooterComponent={() =>
					isFetching && (
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							<GorakuActivityIndicator />
						</View>
					)
				}
				drawDistance={height / 2}
				estimatedItemSize={241}
				onEndReached={() => hasNextPage && fetchNextPage()}
			/>
		</View>
	);
};

export default CharacterListPage;
