import { List, Text } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { View } from 'react-native';
import { MediaCard } from '@/components/cards';
import { router } from 'expo-router';
import { ListHeading } from '@/components/text';
import { AniMediaQuery, MediaFormat } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { SheetManager } from 'react-native-actions-sheet';

type RelationsProps = {
	data: AniMediaQuery['Media']['relations'];
};
const Relations = ({ data }: RelationsProps) => {
	const { colors } = useAppTheme();

	const keyExtractor = useCallback((item, index) => index.toString(), []);
	const renderItem = useCallback(
		({ item }: { item: AniMediaQuery['Media']['relations']['edges'][0] }) => (
			<View style={{ marginHorizontal: 10, maxHeight: 260 }}>
				<MediaCard {...item.node} />
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
		),
		[],
	);

	if (data?.edges?.length < 1) {
		return null;
	}

	return (
		<View style={{ overflow: 'visible' }}>
			<ListHeading title="Relations" />
			<FlashList
				data={data?.edges}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				estimatedItemSize={250}
				horizontal
				removeClippedSubviews
				contentContainerStyle={{ padding: 15 }}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default Relations;
