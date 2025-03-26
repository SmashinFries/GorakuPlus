import { Text } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { View } from 'react-native';
import { MediaCard } from '@/components/cards';
import {
	AniMediaQuery_Media_Media_relations_MediaConnection,
	AniMediaQuery_Media_Media_relations_MediaConnection_edges_MediaEdge,
	MediaFormat,
} from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { AccordionMemo } from '@/components/animations';

type RelationsProps = {
	parentMediaId: number;
	data: AniMediaQuery_Media_Media_relations_MediaConnection;
};
const Relations = ({ parentMediaId, data }: RelationsProps) => {
	const { colors } = useAppTheme();

	const keyExtractor = useCallback(
		(
			item: AniMediaQuery_Media_Media_relations_MediaConnection_edges_MediaEdge,
			index: number,
		) => index.toString(),
		[],
	);
	const renderItem = ({
		item,
	}: {
		item: AniMediaQuery_Media_Media_relations_MediaConnection_edges_MediaEdge;
	}) =>
		item.node?.id ? (
			<View style={{ marginHorizontal: 10, maxHeight: 260 }}>
				<MediaCard {...item?.node} parentMediaId={parentMediaId} />
				<Text
					variant="labelLarge"
					style={{ textTransform: 'capitalize', textAlign: 'center' }}
				>
					{item.relationType?.replaceAll('_', ' ') ?? '??'}
				</Text>
				<Text
					variant="labelMedium"
					style={{
						textTransform: 'capitalize',
						textAlign: 'center',
						color: colors.onSurfaceVariant,
					}}
				>
					{item.node?.format === MediaFormat.Tv
						? 'Anime'
						: item.node?.isLicensed
							? item.node?.format
							: 'Doujin'}{' '}
					· {item.node?.status?.replaceAll('_', ' ') ?? '??'}
				</Text>
			</View>
		) : null;

	if ((data?.edges?.length ?? 0) < 1) {
		return null;
	}

	return (
		<AccordionMemo title="Relations">
			{/* <ListHeading title="Relations" /> */}
			<FlashList
				data={data?.edges?.filter(
					(
						edge,
					): edge is AniMediaQuery_Media_Media_relations_MediaConnection_edges_MediaEdge =>
						edge !== null,
				)}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				estimatedItemSize={250}
				horizontal
				removeClippedSubviews
				contentContainerStyle={{ padding: 15 }}
				showsHorizontalScrollIndicator={false}
			/>
		</AccordionMemo>
	);
};

export default Relations;
