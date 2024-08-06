import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CharacterItem, CharacterLabel } from '@/components/characters/card';
import { useCallback } from 'react';
import { useCharactersList } from '@/hooks/characters/useCharacters';
import { router, useLocalSearchParams } from 'expo-router';
import { GorakuActivityIndicator } from '@/components/loading';
import { CharacterListQuery, MediaType } from '@/api/anilist/__genereated__/gql';

const CharacterListPage = () => {
	const { characters } = useLocalSearchParams<{ characters: [string, string] }>();
	const type = characters[0] as MediaType;
	const id = parseInt(characters[1]);
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useCharactersList(id, type);
	const { colors } = useTheme();
	const { height } = useWindowDimensions();

	// const { columns, listKey } = useColumns(180);

	const RenderItem = useCallback(
		(props: { item: CharacterListQuery['Media']['characters']['edges'][0]; index: number }) => (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'flex-start',
					marginVertical: 10,
					marginHorizontal: 5,
				}}
			>
				<CharacterItem
					{...props}
					subTextColor={colors.onSurfaceVariant}
					onNavigation={(id) => router.push(`characters/info/${id}`)}
				/>
				<CharacterLabel
					role={props.item.role}
					favourites={props.item.node?.favourites}
					fontColor={colors.onSurfaceVariant}
				/>
			</View>
		),
		[],
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
				numColumns={3}
				key={3}
				data={data}
				keyExtractor={(item) => item?.node?.id.toString()}
				renderItem={RenderItem}
				contentContainerStyle={{ padding: 10 }}
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
