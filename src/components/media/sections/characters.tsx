import { useCallback } from 'react';
import { ListHeading } from '../../text';
import { View } from 'react-native';
import { CharacterCard } from '../../cards';
import {
	AniMediaQuery_Media_Media_characters_CharacterConnection,
	AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge,
} from '@/api/anilist/__genereated__/gql';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';

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
	}: LegendListRenderItemProps<AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge | null>) => (
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
			<LegendList
				style={{ height: 150 }}
				data={data?.edges ?? []}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				horizontal
				recycleItems
				// removeClippedSubviews
				// estimatedItemSize={120}
				contentContainerStyle={{ padding: 15 }}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};
