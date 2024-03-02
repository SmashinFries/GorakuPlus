import { FlashList } from '@shopify/flash-list';
import { AnimatePresence } from 'moti';
import { Avatar, Text } from 'react-native-paper';
import { MotiPressable } from 'moti/interactions';
import { View } from 'react-native';
import { StaffDetailsQuery } from '@/store/services/anilist/generated-anilist';
import { router } from 'expo-router';

type CharacterPrevItemProps = {
    onPress: () => void;
    item: StaffDetailsQuery['Staff']['characters']['edges'][0];
    index: number;
};
const CharacterPrevItem = ({ onPress, item, index }: CharacterPrevItemProps) => {
	return (
		<MotiPressable
			// from={{ opacity: 0, scale: 0 }}
			// animate={{
			//     opacity: 1,
			//     scale: 1,
			// }}
			// exit={{ opacity: 0, scale: 0 }}
			onPress={onPress}
			style={{ marginHorizontal: 5, alignItems: 'center' }}
		>
			<Avatar.Image source={{ uri: item.node?.image?.large }} size={110} />
			<Text numberOfLines={2} style={{ textAlign: 'center', width: 110 + 10 }}>
				{item.node.name.full}
			</Text>
		</MotiPressable>
	);
};

type CharacterPrevListProps = {
    data: StaffDetailsQuery['Staff']['characters'];
};
export const CharacterPrevList = ({ data }: CharacterPrevListProps) => {
	if (data?.edges?.length < 1) {
		return null;
	}

	return (
		<View>
			<Text variant="titleLarge" style={{ padding: 15, paddingBottom: 8 }}>
                Characters
			</Text>
			<AnimatePresence>
				<FlashList
					data={data.edges}
					renderItem={(props) => (
						<CharacterPrevItem
							{...props}
							onPress={() => router.push(`/characters/info/${props.item.node.id}`)}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
					horizontal
					estimatedItemSize={120}
					contentContainerStyle={{ padding: 15 }}
					showsHorizontalScrollIndicator={false}
					drawDistance={110 * 25}
				/>
			</AnimatePresence>
		</View>
	);
};
