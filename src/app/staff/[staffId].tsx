import {
	FlatList,
	ListRenderItemInfo,
	Text as RNText,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { Chip, List, MD3DarkTheme, Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { Accordion, AnimViewMem, ExpandableDescription } from '@/components/animations';
import { FadeHeaderProvider } from '@/components/headers';
import { convertDate, copyToClipboard } from '@/utils';
import { StaffMediaCard } from '@/components/staff/media';
import { useLocalSearchParams } from 'expo-router';
import { HTMLText } from '@/components/text';
import { MediaBanner } from '@/components/media/banner';
import Animated from 'react-native-reanimated';
import use3dPan from '@/hooks/animations/use3dPan';
import { GestureDetector } from 'react-native-gesture-handler';
import { GorakuActivityIndicator } from '@/components/loading';
import { NameViewer } from '@/components/nameSwitch';
import useTTS from '@/hooks/useTTS';
import { CharStaffInteractionBar } from '@/components/characters/interaction';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useTTSStore } from '@/store/tts/ttsStore';
import {
	StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_edges_CharacterEdge,
	StaffDetailsQuery_Staff_Staff_staffMedia_MediaConnection_edges_MediaEdge,
	useStaffDetailsQuery,
} from '@/api/anilist/__genereated__/gql';
import { CharacterCard } from '@/components/cards';

const StafPage = () => {
	const { staffId } = useLocalSearchParams<{ staffId: string }>();
	const id = Number(staffId);

	const { mediaLanguage } = useSettingsStore();
	const { enabled, english } = useTTSStore();
	const { speak } = useTTS();
	const { animatedStyle, panGesture } = use3dPan({
		xLimit: [-25, 25],
		yLimit: [-25, 25],
		disableAutoRotation: true,
	});
	const { data, isLoading } = useStaffDetailsQuery(
		{
			id: id,
			char_page: 1,
			char_perPage: 25,
			staff_media_page: 1,
			staff_media_perPage: 25,
		},
		{ enabled: !!staffId, refetchOnMount: true },
	);

	const StaffMediaRenderItem = ({
		item,
	}: {
		item: StaffDetailsQuery_Staff_Staff_staffMedia_MediaConnection_edges_MediaEdge;
	}) => {
		return <StaffMediaCard item={item} />;
	};

	const CharacterRenderItem = ({
		item,
	}: ListRenderItemInfo<StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_edges_CharacterEdge>) => {
		return item.node?.id ? (
			<View style={{ paddingHorizontal: 6 }}>
				<CharacterCard {...item.node} role={item.role ?? undefined} />
			</View>
		) : null;
	};

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GorakuActivityIndicator />
			</View>
		);
	}

	return (
		<FadeHeaderProvider
			title={
				mediaLanguage === 'english' || mediaLanguage === 'romaji'
					? (data?.Staff?.name?.full as string)
					: (data?.Staff?.name?.native ?? '')
			}
			loading={isLoading}
			// shareLink={data?.Staff?.siteUrl}
			// onEdit={() => openWebBrowser(`https://anilist.co/edit/staff/${id}`)}
			BgImage={({ style }) =>
				(data?.Staff?.staffMedia?.edges?.length ?? 0) > 0 ? (
					<MediaBanner
						urls={[
							data?.Staff?.staffMedia?.edges?.[0]?.node?.bannerImage ??
								data?.Staff?.staffMedia?.edges?.[0]?.node?.coverImage?.extraLarge,
							...(data?.Staff?.staffMedia?.edges?.map(
								(edge) => edge?.node?.bannerImage,
							) ?? []),
						].filter((val): val is string => val !== null && val !== undefined)}
						style={style}
					/>
				) : undefined
			}
			// favorite={data?.Staff?.isFavourite}
		>
			<AnimViewMem style={{ paddingTop: 100 }}>
				<View style={[styles.container]}>
					<GestureDetector gesture={panGesture}>
						<Animated.View style={[animatedStyle, { height: 240, aspectRatio: 2 / 3 }]}>
							<Image
								source={{ uri: data?.Staff?.image?.large }}
								style={styles.avatar}
								contentFit="cover"
							/>
							<View style={[styles.avatarFavsContainer]}>
								<RNText
									style={{
										fontWeight: 'bold',
										color: MD3DarkTheme.colors.onBackground,
									}}
								>
									{data?.Staff?.favourites} ❤
								</RNText>
							</View>
						</Animated.View>
					</GestureDetector>
					{/* {userID && (
						<IconButton
							icon={fav ? 'heart' : 'heart-outline'}
							iconColor={colors.primary}
							style={{ width: '50%', marginTop: 30 }}
							mode={'outlined'}
							onPress={onToggleFavorite}
						/>
					)} */}
				</View>
				{data?.Staff?.name && (
					<NameViewer
						names={data?.Staff?.name}
						nativeLang={
							data?.Staff?.languageV2 === 'Japanese'
								? 'JP'
								: data?.Staff?.languageV2 === 'Korean'
									? 'KR'
									: data?.Staff?.languageV2 === 'Chinese'
										? 'CN'
										: null
						}
						defaultTitle={
							mediaLanguage && ['english', 'romaji'].includes(mediaLanguage)
								? 'full'
								: 'native'
						}
					/>
				)}
				{data?.Staff?.name?.alternative && (
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						fadingEdgeLength={6}
					>
						{data?.Staff?.name.alternative?.map((name, idx) => (
							<Chip
								key={idx}
								style={{ margin: 5 }}
								onPress={() => copyToClipboard(name)}
								onLongPress={
									enabled ? () => name && speak(name, english) : undefined
								}
							>
								{name}
							</Chip>
						))}
					</ScrollView>
				)}
				<CharStaffInteractionBar
					id={id}
					isFav={!!data?.Staff?.isFavourite}
					share_url={`https://anilist.co/staff/${id}`}
					edit_url={`https://anilist.co/edit/staff/${id}`}
				/>
				{data?.Staff?.description ? (
					<ExpandableDescription initialHeight={90}>
						<HTMLText html={data?.Staff?.description} />
						{/* <MarkdownViewer markdown={data?.Staff?.description} /> */}
					</ExpandableDescription>
				) : null}

				<View style={{ paddingVertical: 20, paddingTop: 30 }}>
					<Accordion title="Information" initialExpand>
						<List.Item
							title="Language"
							left={(props) => <List.Icon {...props} icon="translate" />}
							right={(props) => <Text {...props}>{data?.Staff?.languageV2}</Text>}
						/>
						<List.Item
							title="Gender"
							left={(props) => (
								<List.Icon
									{...props}
									icon={
										data?.Staff?.gender === 'Female'
											? 'gender-female'
											: 'gender-male'
									}
								/>
							)}
							right={(props) => (
								<Text {...props}>{data?.Staff?.gender ?? 'N/A'}</Text>
							)}
						/>
						<List.Item
							title="Age"
							left={(props) => (
								<List.Icon {...props} icon="clock-time-five-outline" />
							)}
							right={(props) => <Text {...props}>{data?.Staff?.age ?? 'N/A'}</Text>}
						/>
						<List.Item
							title="Birthday"
							left={(props) => <List.Icon {...props} icon="cake-variant-outline" />}
							right={(props) => (
								<Text {...props}>
									{convertDate(data?.Staff?.dateOfBirth, true) ?? 'N/A'}
								</Text>
							)}
						/>
						{data?.Staff?.dateOfDeath?.month && (
							<List.Item
								title="Death"
								left={(props) => (
									<List.Icon {...props} icon="skull-crossbones-outline" />
								)}
								right={(props) => (
									<Text {...props}>
										{convertDate(data?.Staff?.dateOfDeath, true) ?? 'N/A'}
									</Text>
								)}
							/>
						)}
						<List.Item
							title="Hometown"
							left={(props) => <List.Icon {...props} icon="home-city-outline" />}
							right={() => (
								<Text
									numberOfLines={2}
									style={{ maxWidth: '50%', textAlign: 'right' }}
								>
									{data?.Staff?.homeTown}
								</Text>
							)}
						/>
						<List.Item
							title="Occupations"
							left={(props) => (
								<List.Icon {...props} icon="office-building-outline" />
							)}
							right={(props) => (
								<Text numberOfLines={2} {...props}>
									{data?.Staff?.primaryOccupations?.join(', ') ?? 'N/A'}
								</Text>
							)}
						/>
						<List.Item
							title="Years Active"
							left={(props) => <List.Icon {...props} icon="timer-outline" />}
							right={(props) => (
								<Text {...props}>
									{(data?.Staff?.yearsActive?.length ?? 0) > 1
										? data?.Staff?.yearsActive?.join(' - ')
										: (data?.Staff?.yearsActive?.length ?? 0) === 1
											? `${data?.Staff?.yearsActive?.[0]} - Present`
											: 'N/A'}
								</Text>
							)}
						/>
						<List.Item
							title="Blood Type"
							left={(props) => <List.Icon {...props} icon="blood-bag" />}
							right={(props) => (
								<Text {...props}>{data?.Staff?.bloodType ?? 'N/A'}</Text>
							)}
						/>
					</Accordion>
					{(data?.Staff?.staffMedia?.edges?.length ?? 0) > 0 && (
						<Accordion title="Media" initialExpand>
							<FlatList
								data={data?.Staff?.staffMedia?.edges?.filter(
									(
										edge,
									): edge is StaffDetailsQuery_Staff_Staff_staffMedia_MediaConnection_edges_MediaEdge =>
										edge !== null,
								)}
								renderItem={StaffMediaRenderItem}
								keyExtractor={(item, idx) => idx.toString()}
								// estimatedItemSize={250}
								horizontal
								removeClippedSubviews
								// contentContainerStyle={{ padding: 15 }}
								showsHorizontalScrollIndicator={false}
								// onEndReached={() => {
								// 	data?.Staff?.staffMedia?.pageInfo?.hasNextPage &&
								// 		setSmPage((prev) => prev + 1);
								// }}
							/>
						</Accordion>
					)}
					{(data?.Staff?.characters?.edges?.length ?? 0) > 0 && (
						<Accordion title="Characters">
							{/* <Text style={{ textAlign: 'center', marginTop: 15 }}>
								Characters coming soon!
							</Text> */}
							<FlatList
								data={data?.Staff?.characters?.edges?.filter(
									(edge) => edge !== null,
								)}
								renderItem={CharacterRenderItem}
								keyExtractor={(item, idx) => idx.toString()}
								// estimatedItemSize={250}
								horizontal
								removeClippedSubviews
								// contentContainerStyle={{ padding: 15 }}
								showsHorizontalScrollIndicator={false}
								// onEndReached={() => {
								// 	data?.Staff?.staffMedia?.pageInfo?.hasNextPage &&
								// 		setSmPage((prev) => prev + 1);
								// }}
							/>
						</Accordion>
					)}
					<View>{/* <CharacterPrevList data={data?.Staff?.characters} /> */}</View>
				</View>
			</AnimViewMem>
		</FadeHeaderProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		borderRadius: 12,
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

export default StafPage;
