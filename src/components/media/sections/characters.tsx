import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { ListHeading } from '../../text';
import { View } from 'react-native';
import { CharacterCard } from '../../cards';
import { AniMediaQuery } from '@/api/anilist/__genereated__/gql';

// router.push(`/characters/info/${item.node.id}`)

type CharacterPrevListProps = {
	data: AniMediaQuery['Media']['characters'];
	openMore: () => void;
};
export const CharacterPrevList = ({ data, openMore }: CharacterPrevListProps) => {
	const keyExtractor = useCallback((item, index) => index.toString(), []);
	const renderItem = useCallback(
		({ item }: { item: AniMediaQuery['Media']['characters']['edges'][0] }) => (
			// <CharacterPrevItem
			//     {...props}
			//     onPress={() =>
			//         nav.navigate('characterStack', {
			//             screen: 'character',
			//             params: { id: props.item.node.id },
			//         })
			//     }
			// />
			<View style={{ paddingRight: 6 }}>
				<CharacterCard {...item.node} role={item?.role} />
			</View>
		),
		[],
	);

	if (data?.edges?.length < 1) {
		return null;
	}

	return (
		<View>
			<ListHeading title="Characters" icon={'arrow-right'} onIconPress={openMore} />
			<FlashList
				data={data?.edges}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				horizontal
				removeClippedSubviews
				estimatedItemSize={120}
				contentContainerStyle={{ padding: 15 }}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};
