import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { useCharactersList } from '@/hooks/characters/useCharacters';
import { useLocalSearchParams } from 'expo-router';
import { GorakuActivityIndicator } from '@/components/loading';
import { CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge } from '@/api/anilist/__genereated__/gql';
import { CharacterCard, CharacterRowCard } from '@/components/cards';
import { useColumns } from '@/hooks/useColumns';

const CharacterListPage = () => {
	const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
	const id = parseInt(mediaId);
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useCharactersList(id);
	const { height } = useWindowDimensions();
	const { columns, displayMode, itemWidth } = useColumns('search');

	const RenderItem = (props: {
		item: CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge;
		index: number;
	}) =>
		props.item.node?.id ? (
			displayMode === 'COMPACT' ? (
				<View
					style={{
						alignItems: 'center',
						width: itemWidth,
					}}
				>
					<CharacterCard {...props.item.node} role={props.item.role ?? undefined} />
				</View>
			) : (
				<CharacterRowCard {...props.item.node} role={props.item.role ?? undefined} />
			)
		) : null;

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
			<FlashList
				numColumns={columns}
				key={columns}
				data={data?.filter(
					(
						item,
					): item is CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge =>
						item != null,
				)}
				keyExtractor={(item, idx) => idx.toString()}
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
