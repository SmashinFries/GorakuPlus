import { View, StyleSheet } from 'react-native';
import { Button, List, Portal, Text } from 'react-native-paper';
import { Accordion, AnimViewMem, ExpandableDescription } from '@/components/animations';
import { useCallback, useReducer, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { convertDate } from '@/utils';
import { HTMLText, ListHeading } from '@/components/text';
import { DanbooruImageCard, MediaCard, StaffCard } from '@/components/cards';
import { FlashList } from '@shopify/flash-list';
import { useCharDetail } from '@/hooks/characters/useCharDetails';
import { CharacterLoading } from '@/components/characters/loading';
import { CharacterFront } from '@/components/characters/front';
import { SaveImageDialog } from '@/utils/images';
import { TagSearchDialog } from '@/components/characters/dialogs';
import { router, useLocalSearchParams } from 'expo-router';
import { MediaBanner } from '@/components/media/banner';
import { GorakuActivityIndicator } from '@/components/loading';
import {
	CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge,
	CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge_voiceActorRoles_StaffRoleType,
	MediaEdge,
	MediaFormat,
} from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAuthStore } from '@/store/authStore';
import { DanPost } from '@/api/danbooru/types';
import { useAppTheme } from '@/store/theme/themes';
import { useMatchStore } from '@/store/matchStore';
import { useShallow } from 'zustand/react/shallow';
import { GorakuRefreshControl } from '@/components/explore/lists';
import { AnimPaperHeader, FadeHeaderScrollView } from '@/components/headers';

const CharacterScreen = () => {
	const { charId } = useLocalSearchParams<{ charId: string }>();
	const { charData, art, tagOptions, onTagChange, currentArtTag, isReady } = useCharDetail(
		Number(charId),
	);
	const { width } = useWindowDimensions();

	const [selectedImg, setSelectedImg] = useState('');
	// const [uniqueVAs, setUniqueVAs] = useState<
	// 	CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge_voiceActorRoles_StaffRoleType[]
	// >([]);
	const [showTagSearch, toggleShowTagSearch] = useReducer((open) => !open, false);
	// const [fav, setFav] = useState(charData.data?.Character?.isFavourite);

	const { mediaLanguage } = useSettingsStore();
	const isBooruEnabled = useMatchStore(useShallow((state) => state.isBooruEnabled));
	const { userID } = useAuthStore(useShallow((state) => state.anilist));

	const primaryName =
		mediaLanguage === 'native'
			? charData.data?.Character?.name?.native
			: charData.data?.Character?.name?.full;
	// const secondaryName =
	// 	mediaLanguage === 'english' || mediaLanguage === 'romaji'
	// 		? charData.data?.Character?.name?.native
	// 		: charData.data?.Character?.name?.full;

	const { colors } = useAppTheme();

	const keyExtractor = useCallback(
		(
			item:
				| CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge_voiceActorRoles_StaffRoleType
				| CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge
				| DanPost,
			index: number,
		) => index.toString(),
		[],
	);

	const MediaRenderItem = useCallback(
		({
			item,
		}: {
			item: CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge;
		}) => {
			if (!item.node?.id) return null;
			return (
				<View>
					<MediaCard {...item.node} />
					<Text
						variant="labelLarge"
						style={{ textTransform: 'capitalize', textAlign: 'center' }}
					>
						{item.node?.format === MediaFormat.Tv
							? 'Anime'
							: item.node?.isLicensed
								? item.node?.format
								: 'Doujin'}
					</Text>
					<Text
						variant="labelMedium"
						style={{
							textTransform: 'capitalize',
							textAlign: 'center',
							color: colors.onSurfaceVariant,
						}}
					>
						{item.node?.status?.replaceAll('_', ' ')}
					</Text>
				</View>
			);
		},
		[],
	);

	const VARenderItem = useCallback(
		({
			item,
		}: {
			item: CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge_voiceActorRoles_StaffRoleType;
		}) => {
			if (!item.voiceActor?.id) return null;
			return (
				<View style={{ marginRight: 8 }}>
					<StaffCard {...item.voiceActor} isStaff isLangShown disableFav />
				</View>
			);
		},
		[],
	);

	const ArtRenderItem = ({ item }: { item: DanPost }) => {
		return (
			<View style={{ margin: 8 }}>
				<DanbooruImageCard
					item={item}
					onNavigate={() =>
						// @ts-ignore
						// navigation.navigate('danbooruStack', {
						//     screen: 'danbooruDetail',
						//     params: { id: item.id },
						// })
						router.push(`/art/post/${item.id}`)
					}
					disableAR
				/>
			</View>
		);
	};

	const EmptyArt = useCallback(() => {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Button onPress={toggleShowTagSearch}>No Art Found. Try manually searching?</Button>
			</View>
		);
	}, []);

	// useEffect(() => {
	// 	setFav(charData.data?.Character?.isFavourite);
	// }, [charData.data?.Character?.isFavourite]);

	// useEffect(() => {
	// 	if (charData.data?.Character?.media?.edges && uniqueVAs.length === 0) {
	// 		const va: CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge_voiceActorRoles_StaffRoleType[] =
	// 			[];
	// 		for (const media of charData.data.Character.media.edges) {
	// 			if (media?.voiceActorRoles && (media?.voiceActorRoles?.length ?? 0) > 0) {
	// 				for (const role of media.voiceActorRoles) {
	// 					role && va.push(role);
	// 				}
	// 			}
	// 		}

	// 		const unique = [
	// 			...va
	// 				.reduce((uniq, curr) => {
	// 					if (!uniq.has(curr['voiceActor']?.['id'])) {
	// 						uniq.set(curr['voiceActor']?.['id'], curr);
	// 					}
	// 					return uniq;
	// 				}, new Map())
	// 				.values(),
	// 		];

	// 		setUniqueVAs(unique);
	// 	}
	// }, [charData.data]);

	return (
		<View>
			{!isReady && (
				<CharacterLoading
					key="loading"
					aniLoading={charData?.isFetching}
					aniError={charData?.error}
					artLoading={art?.isFetching}
					artError={art?.error}
				/>
			)}
			{isReady && (
				<AnimViewMem>
					<FadeHeaderScrollView
						isLoading={charData.isLoading}
						animationRange={[280, 340]}
						Header={(props) => (
							<AnimPaperHeader
								{...props}
								options={{ ...props.options, title: primaryName ?? '' }}
							/>
						)}
						BgImage={({ style }) =>
							(charData?.data?.Character?.media?.edges?.length ?? 0) > 0 ? (
								<MediaBanner
									urls={[
										charData?.data?.Character?.media?.edges?.[0]?.node
											?.bannerImage ??
											charData?.data?.Character?.media?.edges?.[0]?.node
												?.coverImage?.extraLarge,
										...(charData?.data?.Character?.media?.edges
											?.filter(
												(edge): edge is NonNullable<typeof edge> =>
													edge !== null &&
													edge.node !== null &&
													edge.node !== undefined,
											)
											.map((edge) => edge.node?.bannerImage) ?? []),
									].filter(
										(val): val is string => val !== null && val !== undefined,
									)}
									style={style}
								/>
							) : undefined
						}
						refreshControl={
							<GorakuRefreshControl
								refreshing={charData?.isRefetching}
								onRefresh={charData?.refetch}
							/>
						}
					>
						<View style={[styles.bodyContainer, { backgroundColor: 'transparent' }]}>
							<CharacterFront
								id={Number(charId)}
								favorites={charData?.data?.Character?.favourites ?? 0}
								image_url={charData?.data?.Character?.image?.large ?? undefined}
								names={charData?.data?.Character?.name ?? undefined}
								mediaEdges={charData?.data?.Character?.media?.edges as MediaEdge[]}
								isFavorite={charData?.data?.Character?.isFavourite}
								userID={userID ?? undefined}
							/>
							{/* Description */}
							{charData?.data?.Character?.description ? (
								<ExpandableDescription initialHeight={90}>
									<HTMLText html={charData?.data?.Character?.description} />
									{/* <MarkdownViewer
											markdown={charData?.data?.Character?.description}
										/> */}
								</ExpandableDescription>
							) : null}
							{/* Info */}
							<View
								style={{
									marginVertical: 20,
									marginTop: 30,
									overflow: 'visible',
								}}
							>
								<Accordion title="Information" initialExpand>
									<List.Item
										title="Gender"
										left={(props) => (
											<List.Icon
												{...props}
												icon={
													charData?.data?.Character?.gender === 'Female'
														? 'gender-female'
														: charData?.data?.Character?.gender ===
															  'Male'
															? 'gender-male'
															: 'gender-transgender'
												}
											/>
										)}
										right={(props) => (
											<Text {...props}>
												{charData?.data?.Character?.gender ?? 'N/A'}
											</Text>
										)}
									/>
									<List.Item
										title="Age"
										left={(props) => (
											<List.Icon {...props} icon="clock-time-five-outline" />
										)}
										right={(props) => (
											<Text {...props}>
												{charData?.data?.Character?.age ?? 'N/A'}
											</Text>
										)}
									/>
									<List.Item
										title="Birthday"
										left={(props) => (
											<List.Icon {...props} icon="cake-variant-outline" />
										)}
										right={(props) => (
											<Text {...props}>
												{convertDate(
													charData?.data?.Character?.dateOfBirth,
													true,
												) ?? 'N/A'}
											</Text>
										)}
									/>
									<List.Item
										title="Blood Type"
										left={(props) => <List.Icon {...props} icon="blood-bag" />}
										right={(props) => (
											<Text {...props}>
												{charData?.data?.Character?.bloodType ?? 'N/A'}
											</Text>
										)}
									/>
								</Accordion>
							</View>
							<Accordion title="Media">
								<FlashList
									data={
										charData?.data?.Character?.media?.edges?.filter(
											(edge): edge is NonNullable<typeof edge> =>
												edge !== null,
										) ?? []
									}
									renderItem={MediaRenderItem}
									keyExtractor={keyExtractor}
									estimatedItemSize={250}
									estimatedListSize={{ height: 320, width: width }}
									removeClippedSubviews
									horizontal
									fadingEdgeLength={6}
									contentContainerStyle={{ padding: 15 }}
									showsHorizontalScrollIndicator={false}
								/>
							</Accordion>
							{(charData.data?.Character?.media?.edges?.length ?? 0) > 0 && (
								<Accordion title="Voice Actors">
									{/* <ListHeading title="Voice Actors" /> */}
									<FlashList
										data={
											[
												...new Set(
													charData.data?.Character?.media?.edges
														?.flatMap(
															(media) => media?.voiceActorRoles ?? [],
														)
														.filter(Boolean),
												),
											]
												.filter(
													(role, index, self) =>
														self.findIndex(
															(r) =>
																r?.voiceActor?.id ===
																role?.voiceActor?.id,
														) === index,
												)
												.filter(
													(role): role is NonNullable<typeof role> =>
														role !== null,
												) ?? []
										}
										renderItem={VARenderItem}
										keyExtractor={keyExtractor}
										horizontal
										fadingEdgeLength={6}
										estimatedItemSize={130}
										estimatedListSize={{ height: 130, width: width }}
										contentContainerStyle={{ padding: 15 }}
										showsHorizontalScrollIndicator={false}
									/>
								</Accordion>
							)}

							{isBooruEnabled && (
								<View style={{ overflow: 'visible', marginBottom: 20 }}>
									<ListHeading
										title="Fan Art"
										subtitle={currentArtTag?.replaceAll('_', ' ') ?? undefined}
										subtitleStyle={{
											color: colors.primary,
											textDecorationLine: 'underline',
										}}
										subtitlePress={toggleShowTagSearch}
										icon="chevron-right"
										onIconPress={() =>
											// @ts-ignore
											router.push(`/art/${currentArtTag}`)
										}
									/>
									{!art?.isFetching ? (
										<FlashList
											data={art?.data?.pages[0]}
											ListEmptyComponent={EmptyArt}
											renderItem={ArtRenderItem}
											keyExtractor={keyExtractor}
											horizontal
											fadingEdgeLength={6}
											estimatedItemSize={213}
											contentContainerStyle={{
												padding: 15,
											}}
											showsHorizontalScrollIndicator={false}
										/>
									) : (
										<View
											style={{
												height: 300,
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<GorakuActivityIndicator />
										</View>
									)}
								</View>
							)}
						</View>
					</FadeHeaderScrollView>
					<Portal>
						<SaveImageDialog
							img_url={selectedImg}
							prefix={currentArtTag}
							onDismiss={() => setSelectedImg('')}
						/>
						<TagSearchDialog
							visible={showTagSearch}
							onDismiss={toggleShowTagSearch}
							initialQuery={currentArtTag}
							initialTags={tagOptions?.data ?? []}
							tagsLoading={tagOptions?.isFetching}
							onTagChange={onTagChange}
							charId={parseInt(charId)}
							// saveTag={(tag) =>
							// 	dispatch(
							// 		updateCharArtDB({
							// 			aniId: Number(charId),
							// 			booruTag: tag,
							// 		}),
							// 	)
							// }
						/>
					</Portal>
				</AnimViewMem>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		borderRadius: 12,
	},
	bodyContainer: {
		// flex: 1,
		overflow: 'visible',
		paddingTop: 100,
	},
	button: {
		alignSelf: 'center',
		position: 'absolute',
		zIndex: 1,
		overflow: 'hidden',
	},
	avatar: {
		height: 280,
		width: 200,
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

export default CharacterScreen;
