import {
	CharacterMetaDataFragment,
	StaffMetaDataFragment,
	useCharacterDetailsQuery,
	useStaffDetailsQuery,
	useToggleFavMutation,
} from '@/api/anilist/__genereated__/gql';
import AniListMarkdownViewer from '@/components/markdown/renderer';
import { BottomSheetAccordion, GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { useAuthStore } from '@/store/authStore';
import { convertDate, copyToClipboard, getCompactNumberForm } from '@/utils';
import { sendToast } from '@/utils/toast';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Share, View } from 'react-native';
import { ActivityIndicator, Avatar, Divider, Icon, List, Text } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

export type QuickActionCharStaffProps = (StaffMetaDataFragment | CharacterMetaDataFragment) & {
	type: 'character' | 'staff';
	disableFav: boolean;
};

const CharStaffActionSheet = () => {
	const { params } = useLocalSearchParams<{ params: string }>();
	const props = JSON.parse(params) as QuickActionCharStaffProps;
	const favCount = getCompactNumberForm(props?.favourites);
	// const sheet = useRef<TrueSheet>(null);
	const sheet = useRef<TrueSheet>(null);
	const userId = useAuthStore(useShallow((state) => state.anilist.userID));
	const [titleIdx, setTitleIdx] = useState(0);
	const [isFav, setIsFav] = useState(props?.isFavourite);

	const queryClient = useQueryClient();
	const { mutateAsync: toggleFav, isPending } = useToggleFavMutation({
		onSuccess: () => {
			if (props.type === 'staff') {
				queryClient.invalidateQueries({
					queryKey: [...useCharacterDetailsQuery.getKey()],
					exact: false,
				});
				// queryClient.setQueryData(
				// 	useCharacterDetailsQuery.getKey(),
				// 	(oldData: CharacterDetailsQuery_Query): CharacterDetailsQuery_Query => {
				// 		const newEdges = oldData?.Character?.media?.edges?.map((edge) => {
				// 			return {
				// 				...edge,
				// 				voiceActorRoles: edge?.voiceActorRoles?.map((vaRole) =>
				// 					vaRole?.voiceActor?.id === props.id
				// 						? {
				// 								...vaRole,
				// 								voiceActor: {
				// 									...vaRole.voiceActor,
				// 									isFavourite: !vaRole.voiceActor?.isFavourite,
				// 								},
				// 							}
				// 						: { ...vaRole },
				// 				),
				// 			};
				// 		});
				// 		return {
				// 			...oldData,
				// 			Character: newEdges
				// 				? {
				// 						...oldData.Character,
				// 						media: { edges: newEdges },
				// 						isFavourite: !!oldData.Character?.isFavourite,
				// 					}
				// 				: { ...oldData.Character },
				// 		};
				// 	},
				// );
			} else if (props.type === 'character') {
				queryClient.invalidateQueries({
					queryKey: [...useStaffDetailsQuery.getKey()],
					exact: false,
				});
			}
		},
	});

	const onFavorite = async () => {
		if (!props) return;
		try {
			await toggleFav(
				props?.type === 'character' ? { characterId: props?.id } : { staffId: props?.id },
			);
			setIsFav((prev) => !prev);
		} catch (e) {
			sendToast(`${e}`);
		}
	};

	const titlesArray: string[] = !!props?.name
		? [...new Set([props?.name['full'], props?.name['native']])].filter(
				(title): title is string => title !== null && title !== undefined,
			)
		: [];

	const dob = convertDate(props?.dateOfBirth, true);

	const viewCharStaff = () => {
		sheet.current?.dismiss();
		router.navigate(`/${props?.type}/${props?.id}`);
	};

	const shareLink = async () => {
		if (!props?.siteUrl) return null;
		await Share.share({ url: props.siteUrl, message: props.siteUrl });
		sheet.current?.dismiss();
	};

	return (
		<GlobalBottomSheetParent sheetRef={sheet} scrollable sizes={['auto', 'large']}>
			<View>
				{!!userId && (
					<List.Item
						title={
							(isFav ? 'Unfavorite' : 'Favorite') + (favCount ? ` (${favCount})` : '')
						}
						description={props.disableFav ? 'Favoriting is not available.' : undefined}
						descriptionStyle={{ opacity: props.disableFav ? 0.38 : 1 }}
						left={(leftProps) => (
							<List.Icon
								{...leftProps}
								icon={
									isPending
										? () => <ActivityIndicator />
										: !isFav
											? 'heart-outline'
											: 'heart-remove'
								}
								color={isFav ? 'red' : undefined}
								style={[leftProps.style, { opacity: props.disableFav ? 0.38 : 1 }]}
							/>
						)}
						titleStyle={{
							opacity: props.disableFav ? 0.38 : 1,
						}}
						disabled={props.disableFav}
						onPress={onFavorite}
					/>
				)}
				<List.Item
					title={`View ${props?.type}`}
					titleStyle={{ textTransform: 'capitalize' }}
					onPress={viewCharStaff}
					left={(props) => <List.Icon {...props} icon={'account-outline'} />}
				/>
				<List.Item
					title={'Share'}
					left={(props) => <List.Icon {...props} icon="share-variant-outline" />}
					onPress={shareLink}
				/>
			</View>
			<BottomSheetAccordion title="Preview">
				<Divider />

				<View
					style={{
						flexDirection: 'row',
						paddingTop: 12,
						paddingLeft: 12,
						alignItems: 'flex-start',
					}}
				>
					<Avatar.Image
						source={{
							uri: props?.image?.large ?? undefined,
						}}
						size={100}
					/>
					<View style={{ flex: 1, paddingHorizontal: 12 }}>
						<Text
							variant="titleLarge"
							numberOfLines={3}
							onPress={() => setTitleIdx((prev) => (prev + 1) % titlesArray.length)}
							onLongPress={() => copyToClipboard(titlesArray[titleIdx])}
						>
							{titlesArray[titleIdx]}
						</Text>
						{props?.dateOfBirth &&
						(props?.dateOfBirth.day || props?.dateOfBirth.month) ? (
							<Text>
								<Icon source={'cake-variant-outline'} size={undefined} />
								{' ' + dob}
							</Text>
						) : null}
						{props?.gender ? (
							<Text>
								<Icon
									size={undefined}
									source={
										props?.gender.toLowerCase() === 'male'
											? 'gender-male'
											: props?.gender.toLowerCase() === 'female'
												? 'gender-female'
												: 'gender-male-female-variant'
									}
								/>
								{' ' + props?.gender}
							</Text>
						) : null}
					</View>
				</View>
				{props?.descriptionHTML ? (
					<View style={{ paddingTop: 18, paddingHorizontal: 10 }}>
						<AniListMarkdownViewer body={props?.descriptionHTML} />
					</View>
				) : null}
			</BottomSheetAccordion>
		</GlobalBottomSheetParent>
	);
};

export default CharStaffActionSheet;
