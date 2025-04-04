import { Image } from 'expo-image';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Text as RNText } from 'react-native';
import { Chip, MD3DarkTheme } from 'react-native-paper';
import { copyToClipboard } from '../../utils';
import use3dPan from '@/hooks/animations/use3dPan';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { NameViewer } from '../nameSwitch';
import useTTS from '@/hooks/useTTS';
import { CharStaffInteractionBar } from './interaction';
import { CharacterName, MediaEdge } from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useTTSStore } from '@/store/tts/ttsStore';

type CharacterFrontProps = {
	id: number;
	favorites?: number;
	isFavorite?: boolean;
	image_url?: string;
	userID?: number;
	names?: CharacterName;
	mediaEdges?: MediaEdge[];
};
export const CharacterFront = ({
	id,
	favorites,
	isFavorite,
	image_url,
	names,
	mediaEdges,
}: CharacterFrontProps) => {
	const { mediaLanguage } = useSettingsStore();
	const { enabled, english } = useTTSStore();
	// 3D panning causing crash after amount of time!
	const { animatedStyle, panGesture } = use3dPan({
		xLimit: [-25, 25],
		yLimit: [-25, 25],
		disableAutoRotation: true,
	});
	const { speak } = useTTS();

	return (
		<View>
			<View style={[styles.container]}>
				<GestureDetector gesture={panGesture}>
					<Animated.View style={[animatedStyle, { height: 240, aspectRatio: 2 / 3 }]}>
						<Image
							source={{ uri: image_url }}
							style={[styles.avatar]}
							contentFit={'cover'}
						/>
						<View style={[styles.avatarFavsContainer]}>
							<RNText
								style={{
									fontWeight: 'bold',
									color: MD3DarkTheme.colors.onBackground,
								}}
							>
								{favorites} ❤
							</RNText>
						</View>
					</Animated.View>
				</GestureDetector>
			</View>
			{names && (
				<NameViewer
					names={names}
					nativeLang={mediaEdges?.[0]?.node?.countryOfOrigin} // kinda hacky ngl
					defaultTitle={
						['english', 'romaji'].includes(mediaLanguage ?? '') ? 'full' : 'native'
					}
				/>
			)}
			{names?.alternative && (
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{names.alternative?.map(
						(name, idx) =>
							name && (
								<Chip
									key={idx}
									style={{ margin: 5 }}
									onPress={() => copyToClipboard(name)}
									onLongPress={() => (enabled ? speak(name, english) : null)}
								>
									{name}
								</Chip>
							),
					)}
				</ScrollView>
			)}
			<CharStaffInteractionBar
				id={id}
				isFav={!!isFavorite}
				share_url={`https://anilist.co/character/${id}`}
				edit_url={`https://anilist.co/edit/character/${id}`}
				type={'characters'}
			/>
			{/* {userID && (
				<IconButton
					icon={fav ? 'heart' : 'heart-outline'}
					iconColor={colors.primary}
					style={{ width: '50%', marginTop: 30 }}
					mode={'outlined'}
					onPress={() => {
						setFav((prev) => !prev);
						onToggleFavorite(id);
					}}
				/>
			)} */}
			{/* <Text
				onLongPress={() => copyToClipboard(primaryName)}
				style={[styles.staffName]}
				variant="titleLarge"
			>
				{primaryName}
			</Text>
			<Text
				onLongPress={() => copyToClipboard(secondaryName)}
				variant="titleMedium"
				style={[styles.staffAltName, { color: colors.onSurfaceVariant }]}
			>
				{secondaryName}
			</Text>
			<Text
				selectable
				variant="titleSmall"
				style={[
					styles.staffAltName,
					{ color: colors.onSurfaceVariant, paddingHorizontal: 5 },
				]}
			>
				{alternativeNames?.join(', ')}
			</Text> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		borderRadius: 12,
	},
	button: {
		alignSelf: 'center',
		position: 'absolute',
		zIndex: 1,
		overflow: 'hidden',
	},
	avatar: {
		height: '100%',
		width: '100%',
		borderRadius: 12,
	},
	avatarFavsContainer: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		alignItems: 'center',
		padding: 10,
		paddingVertical: 5,
		borderRadius: 12,
		borderBottomLeftRadius: 0,
		borderTopRightRadius: 0,
		backgroundColor: 'rgba(0,0,0,0.5)',
		flexDirection: 'row',
	},
	staffName: {
		marginTop: 10,
		marginBottom: 3,
		textAlign: 'center',
	},
	staffAltName: {
		textAlign: 'center',
	},
	desc: {
		paddingHorizontal: 10,
		marginVertical: 10,
	},
	descBtn: {
		alignSelf: 'center',
		position: 'absolute',
		zIndex: 1,
		overflow: 'hidden',
	},
	favs: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
});
