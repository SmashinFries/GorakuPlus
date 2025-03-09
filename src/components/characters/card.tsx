import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';
import { IconButton, MD3DarkTheme, Text } from 'react-native-paper';
import { memo } from 'react';
import { CharacterListQuery } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';

type CharacterItemProps = {
	item: NonNullable<
		NonNullable<NonNullable<CharacterListQuery['Media']>['characters']>['edges']
	>[0];
	index: number;
	subTextColor: string;
	onNavigation: (id: number) => void;
};

const BORDER_RADIUS = 12;

export const CharacterItem = ({ item, onNavigation }: CharacterItemProps) => {
	const { colors } = useAppTheme();
	return (
		<Pressable
			style={[styles.container]}
			android_ripple={{ color: colors.primary, foreground: true }}
			onPress={onNavigation ? () => item?.node?.id && onNavigation(item?.node?.id) : null}
		>
			<Image source={{ uri: item?.node?.image?.large }} style={[styles.img]} />
			<LinearGradient
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					borderRadius: BORDER_RADIUS,
					overflow: 'hidden',
				}}
				locations={[0.4, 0.95]}
				colors={['transparent', 'black']}
			/>
			<View style={[styles.btmContainer]}>
				<Text variant="labelMedium" numberOfLines={2} style={[styles.name]}>
					{item?.node?.name?.full}
				</Text>
			</View>
			{item?.node?.isFavourite && (
				<View style={{ position: 'absolute', top: -5, right: -5 }}>
					<IconButton icon="heart" iconColor="red" />
				</View>
			)}
		</Pressable>
	);
};

export const CharacterLabel = ({
	role,
	favourites,
	fontColor,
}: {
	role: string;
	favourites: number;
	fontColor?: string;
}) => {
	return (
		<View>
			<Text variant="labelSmall" style={{ textTransform: 'capitalize', textAlign: 'center' }}>
				{role}
			</Text>
			<Text
				variant="labelSmall"
				style={{
					textTransform: 'capitalize',
					textAlign: 'center',
					color: fontColor ?? 'white',
				}}
			>
				❤️ {favourites}
			</Text>
		</View>
	);
};

export const CharacterItemMemo = memo(CharacterItem);

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: undefined,
		overflow: 'hidden',
		aspectRatio: 2 / 3,
		borderRadius: BORDER_RADIUS,
	},
	img: {
		height: '100%',
		width: '100%',
		// borderRadius: 12,
		borderRadius: BORDER_RADIUS,
	},
	btmContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		paddingVertical: 5,
	},
	name: {
		textAlign: 'center',
		color: MD3DarkTheme.colors.onBackground,
	},
});
