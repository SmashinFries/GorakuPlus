import { useCallback } from 'react';
import { ListHeading } from '../../text';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { CharacterCard } from '../../cards';
import {
	AniMediaQuery_Media_Media_characters_CharacterConnection,
	AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge,
} from '@/api/anilist/__genereated__/gql';

// router.push(`/characters/info/${item.node.id}`)

type CharacterPrevListProps = {
	mediaId: number;
	data: AniMediaQuery_Media_Media_characters_CharacterConnection;
	openMore: () => void;
};
export const CharacterPrevList = ({ mediaId, data, openMore }: CharacterPrevListProps) => {
	const keyExtractor = useCallback(
		(
			item: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge | null,
			index: number,
		) => index.toString(),
		[],
	);
	const renderItem = ({
		item,
	}: ListRenderItemInfo<AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge | null>) => (
		<View style={{ paddingRight: 6 }}>
			<CharacterCard {...item?.node} role={item?.role ?? undefined} parentMediaId={mediaId} />
		</View>
	);

	if ((data?.edges?.length ?? 0) < 1) {
		return null;
	}

	return (
		<View>
			<ListHeading title="Characters" icon={'arrow-right'} onIconPress={openMore} />
			<FlatList
				data={data?.edges}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				horizontal
				removeClippedSubviews
				// estimatedItemSize={120}
				contentContainerStyle={{ padding: 15 }}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};
