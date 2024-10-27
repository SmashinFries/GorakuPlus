import {
	MediaFormat,
	MediaStatus,
	MediaTitle,
	MediaType,
	useMediaAniCardQueryQuery,
} from '@/api/anilist/__genereated__/gql';
import { useMalQuery } from '@/api/jikan/extended';
import { MediaAniCard, MediaAniCardProps } from '@/components/anicard/cards';
import { AniCardPageParams } from '@/types/anicard';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import {
	ActivityIndicator,
	Button,
	Divider,
	IconButton,
	List,
	SegmentedButtons,
	TextInput,
	TextProps,
} from 'react-native-paper';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { sendErrorMessage, sendToast } from '@/utils/toast';
import * as FileSystem from 'expo-file-system';
import { ListSubheader } from '@/components/titles';
import { useAppTheme } from '@/store/theme/themes';
import { MUISlider, Slider } from '@/components/slider';
import { MaterialSwitchListItem } from '@/components/switch';
import { AniCardHeader } from '@/components/headers';
import { rgbToRgba } from '@/utils';
import { useHeaderHeight } from '@react-navigation/elements';
import { useScreenshot } from '@/hooks/useScreenshot';
import { BottomSheetParent } from '@/components/sheets/bottomsheets';
import { ActionSheetRef, ScrollView } from 'react-native-actions-sheet';

const animeParams: MediaAniCardProps = {
	title: 'Make Heroine ga Oosugiru!',
	type: MediaType.Anime,
	format: MediaFormat.Tv,
	coverImg: {
		color: '#0d6be4',
		extraLarge:
			'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171457-Z8tZRk7LhcZk.jpg',
	},
	totalContent: 12,
	startDate: {
		year: 2024,
		month: 7,
		day: 14,
	},
	anilistScore: 80,
	malScore: 8.29,
	tags: ['Comedy', 'Romance', 'Unrequited Love', 'Love Triangle', 'Heterosexual'],
	status: MediaStatus.Releasing,
};

const mangaParams: MediaAniCardProps = {
	title: 'Berserk',
	type: MediaType.Manga,
	format: MediaFormat.Manga,
	coverImg: {
		color: '#e4a143',
		extraLarge:
			'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30002-7EzO7o21jzeF.jpg',
	},
	startDate: {
		year: 1989,
		month: 8,
		day: 25,
	},
	anilistScore: 93,
	malScore: 9.47,
	tags: ['Action', 'Adventure', 'Drama', 'Fantasy', 'Horror', 'Psychological'],
	status: MediaStatus.Releasing,
};

const novelParams: MediaAniCardProps = {
	title: 'Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?',
	titleSize: 'titleLarge',
	titleLines: 3,
	type: MediaType.Manga,
	format: MediaFormat.Novel,
	coverImg: {
		color: '#aebbf1',
		extraLarge:
			'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx87284-Drq2dMfE67cf.jpg',
	},
	startDate: {
		year: 2014,
		month: 11,
		day: 1,
	},
	totalContent: 5,
	anilistScore: 81,
	malScore: 8.52,
	tags: ['Drama', 'Fantasy', 'Romance', 'Slice of Life', 'Supernatural'],
	description:
		'Everyone wants to be remembered... Untold years after the strange Beasts drove humanity to extinction, Willem emerges from his slumber as the sole survivor. A new civilization of various other races has risen on the floating islands, but there\'sno place for a featureless human among them. After aimlessly wandering for a time, Willem grudgingly accepts a job with the military, only to discover that the "weapons" he watches over are in fact young faeries. As he slowly learns more about the children and how they\'re linked to his past, the war with the Beasts grows increasingly desperate. When the girls prepare to fight a hopeless battle, is there anything a lone human can do...?',
	status: MediaStatus.Finished,
};

export type AniCardConfig = {
	titleLang?: keyof MediaTitle;
	titleNumLines?: number | null;
	titleSize?: TextProps<any>['variant'];
	scoreType?: 'averageScore' | 'meanScore';
	enabledDescription?: boolean;
	descriptionType?: 'anilist' | 'mal' | 'custom';
	descriptionNumLines?: number | null;
	tagLimit?: number;
	enableGenre?: boolean;
	enableTag?: boolean;
	enableQr?: boolean;
};

const MediaCardGenerator = ({
	type,
	id,
	idMal,
}: {
	type: MediaType;
	id: number;
	idMal?: number;
}) => {
	const actionsheetRef = useRef<ActionSheetRef>(null);
	const anilist = useMediaAniCardQueryQuery(
		{ id },
		{ enabled: !!id, refetchOnReconnect: false, refetchOnMount: false },
	);
	const jikan = useMalQuery(idMal, type);
	const { viewshotRef: anicardRef, onScreenshot } = useScreenshot();
	const { colors } = useAppTheme();
	const { height } = useWindowDimensions();
	const [cardHeight, setCardHeight] = useState(1);

	const [config, setConfig] = useState<AniCardConfig>({
		titleLang: 'english',
		titleNumLines: null,
		titleSize: 'headlineSmall',
		scoreType: 'averageScore',
		descriptionType: 'mal',
		enabledDescription: true,
		descriptionNumLines: 4,
		tagLimit: 3,
		enableGenre: true,
		enableTag: true,
		enableQr: true,
	});

	const [customDescription, setCustomDescription] = useState('');

	const onError = (error: Error) => {
		sendErrorMessage('Failed to capture AniCard!');
	};

	const onConfigUpdate = (props: AniCardConfig) => {
		setConfig((prev) => ({ ...prev, ...props }));
	};

	useEffect(() => {
		if (anilist?.data && !anilist?.data?.Media?.title?.english) {
			onConfigUpdate({ titleLang: 'romaji' });
		}
	}, [anilist?.data]);

	useEffect(() => {
		if (anilist?.data && jikan?.data?.data) {
			if (!anilist.data.Media?.descriptionHTML && !jikan.data.data.data?.synopsis) {
				onConfigUpdate({ enabledDescription: false, descriptionType: 'custom' });
			}
		}
	}, [anilist?.data, jikan?.data?.data]);

	useEffect(() => {
		// actionsheetRef.current?.hide();
		if (actionsheetRef.current && cardHeight > 1) {
			actionsheetRef.current?.show();
		}
		// height - (width + headerHeight - 20)
	}, [actionsheetRef.current, cardHeight]);

	return (
		<View style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					header: (props) => <AniCardHeader {...props} onSave={onScreenshot} />,
				}}
			/>
			{!anilist.data || (idMal && !jikan.data) ? (
				<ActivityIndicator />
			) : (
				<View style={{ flex: 1 }}>
					<ViewShot
						ref={anicardRef}
						onCaptureFailure={onError}
						// onCapture={() => sendToast('Anicard Saved')}
						options={{
							format: 'png',
							fileName: `goraku-${type}-${id}-anicard`,
							width: 1080,
							height: 1080,
							result: 'tmpfile',
						}}
						onLayout={(e) => setCardHeight(e.nativeEvent.layout.height)}
					>
						<MediaAniCard
							anilistScore={anilist?.data?.Media[config.scoreType]}
							coverImg={anilist?.data?.Media.coverImage}
							format={anilist?.data?.Media?.format}
							type={type}
							description={
								config.enabledDescription
									? config.descriptionType === 'anilist'
										? anilist?.data?.Media?.descriptionHTML
										: config.descriptionType === 'mal'
											? jikan?.data?.data?.data?.synopsis
											: customDescription
									: undefined
							}
							isDescriptionHtml={config.descriptionType === 'anilist'}
							descriptionLines={config.descriptionNumLines}
							malScore={jikan?.data?.data?.data?.score}
							startDate={anilist?.data?.Media?.startDate}
							status={anilist?.data?.Media?.status}
							tags={[
								...(config.enableGenre ? anilist?.data?.Media?.genres : [null]),
								...anilist?.data?.Media?.tags?.map((tag) =>
									config.enableTag ? tag.name : null,
								),
							].filter((tag) => tag !== null)}
							tagLimit={config.tagLimit}
							titleLines={config?.titleNumLines}
							totalContent={
								type === MediaType.Anime
									? anilist?.data?.Media?.episodes
									: anilist?.data?.Media?.format === MediaFormat.Novel
										? anilist?.data?.Media?.volumes
										: anilist?.data?.Media?.chapters
							}
							title={anilist?.data?.Media?.title[config.titleLang]}
							titleSize={config.titleSize}
							id={config.enableQr ? id : undefined}
						/>
					</ViewShot>
					{/* <Divider style={{ marginVertical: 10, height: 2 }} /> */}
					<Divider style={{ height: 3 }} />
					<BottomSheetParent
						sheetRef={actionsheetRef}
						closable={false}
						backgroundInteractionEnabled={true}
						isModal={false}
						snapPoints={[((height - cardHeight - 20) / height) * 100, 100]}
						containerStyle={{ height: height }}
						disableDragBeyondMinimumSnapPoint
					>
						<ScrollView
							contentContainerStyle={{ paddingVertical: 12 }}
							// keyboardDismissMode="on-drag"
							stickyHeaderIndices={[0, 2, 4, 6, 8]}
						>
							<ListSubheader
								title="Title"
								style={{ backgroundColor: colors.elevation.level1 }}
							/>
							<View>
								<SegmentedButtons
									density="medium"
									buttons={[
										{
											value: 'english',
											label: 'English',
											disabled: !anilist?.data?.Media?.title?.english,
										},
										{ value: 'romaji', label: 'Romaji' },
										{ value: 'native', label: 'Native' },
									]}
									value={config.titleLang}
									onValueChange={(val) => onConfigUpdate({ titleLang: val })}
									style={{ marginHorizontal: 10 }}
								/>
								<List.Item title={'Title Size'} />
								<SegmentedButtons
									density="medium"
									value={config.titleSize}
									onValueChange={(val) => onConfigUpdate({ titleSize: val })}
									buttons={[
										{ value: 'titleMedium', label: 'Small' },
										{ value: 'titleLarge', label: 'Medium' },
										{ value: 'headlineSmall', label: 'Large' },
									]}
									style={{ marginHorizontal: 10 }}
								/>
								{/* <MUISlider
									// initialValue={}
									value={config.titleNumLines}
									maxValue={6}
									minValue={0}
									step={1}
									onValueChange={(val) =>
										onConfigUpdate({
											titleNumLines: val[0] === 0 ? null : val[0],
										})
									}
									showMinMax
									thumbBackgroundColor={colors.elevation.level1}
								/> */}
								<View style={{ marginVertical: 12 }}>
									<Slider
										title="Number of Lines"
										initialValue={config.titleNumLines}
										onValueUpdate={(val) =>
											onConfigUpdate({
												titleNumLines: val === 0 ? null : val,
											})
										}
										steps={1}
										maxValue={6}
									/>
								</View>
							</View>
							<ListSubheader
								title="Description"
								style={{ backgroundColor: colors.elevation.level1 }}
							/>
							<View>
								<SegmentedButtons
									style={{ marginHorizontal: 10 }}
									buttons={[
										{
											value: 'anilist',
											label: 'AniList',
											disabled: !anilist?.data?.Media?.descriptionHTML,
										},
										{
											value: 'mal',
											label: 'MAL',
											disabled: !jikan?.data?.data?.data?.synopsis,
										},
										{ value: 'custom', label: 'Custom' },
									]}
									value={config.descriptionType}
									onValueChange={(val) =>
										onConfigUpdate({ descriptionType: val })
									}
									density="medium"
								/>
								<MaterialSwitchListItem
									title="Enable"
									selected={config.enabledDescription}
									onPress={() =>
										onConfigUpdate({
											enabledDescription: !config.enabledDescription,
										})
									}
								/>
								{/* <List.Item title={'Number of Lines'} /> */}
								<Slider
									title="Number of Lines"
									initialValue={config.descriptionNumLines}
									// value={config.descriptionNumLines}
									onValueUpdate={(val) =>
										onConfigUpdate({
											descriptionNumLines: val === 0 ? null : val,
										})
									}
									steps={1}
									maxValue={6}
									minValue={0}
								/>
								{config.descriptionType === 'custom' ? (
									<View>
										<List.Item title="Custom Description" />
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
											<TextInput
												multiline
												value={customDescription}
												clearButtonMode="while-editing"
												onChangeText={(text) => setCustomDescription(text)}
												style={{
													alignSelf: 'stretch',
													marginHorizontal: 12,
													marginBottom: 12,
													padding: 6,
													borderRadius: 12,
													backgroundColor: colors.surface,
													color: colors.onSurface,
													fontSize: 14,
													flexGrow: 1,
												}}
												right={
													<TextInput.Icon
														icon="close"
														onPress={() => setCustomDescription('')}
													/>
												}
											/>
										</View>
									</View>
								) : null}
							</View>
							<ListSubheader
								title="Qr Code"
								style={{ backgroundColor: colors.elevation.level1 }}
							/>
							<View>
								<MaterialSwitchListItem
									title="Enable"
									description={`Allows others to instantly find this ${type === MediaType.Anime ? 'anime' : anilist?.data?.Media?.format === MediaFormat.Novel ? 'novel' : 'manga'}`}
									selected={config.enableQr}
									onPress={() =>
										setConfig((prev) => ({
											...prev,
											enableQr: !prev.enableQr,
										}))
									}
								/>
							</View>
							<ListSubheader
								title="Score"
								style={{ backgroundColor: colors.elevation.level1 }}
							/>
							<View>
								<MaterialSwitchListItem
									title="Average Score"
									description={`If disabled, mean score will be used.`}
									selected={config.scoreType === 'averageScore'}
									onPress={() =>
										setConfig((prev) => ({
											...prev,
											scoreType:
												prev.scoreType === 'averageScore'
													? 'meanScore'
													: 'averageScore',
										}))
									}
								/>
							</View>
							<ListSubheader
								title="Genre / Tag Labels"
								style={{ backgroundColor: colors.elevation.level1 }}
							/>
							<View>
								<MaterialSwitchListItem
									title="Genres"
									selected={config.enabledDescription}
									onPress={() =>
										setConfig((prev) => ({
											...prev,
											enableGenre: !prev.enableGenre,
										}))
									}
								/>
								<MaterialSwitchListItem
									title="Tags"
									selected={config.enabledDescription}
									onPress={() =>
										setConfig((prev) => ({
											...prev,
											enableTag: !prev.enableTag,
										}))
									}
								/>
								<Slider
									title="Limit"
									initialValue={config.tagLimit}
									steps={1}
									maxValue={8}
									minValue={0}
									onValueUpdate={(val) =>
										onConfigUpdate({
											tagLimit: val[0],
										})
									}
								/>
							</View>
						</ScrollView>
					</BottomSheetParent>
					{/* <Button mode="contained" onPress={() => anicardRef.current?.capture()}>
							Save
						</Button> */}
				</View>
			)}
		</View>
	);
};

const CharacterCardGenerator = ({ id }: { id: number }) => {
	return <View></View>;
};

const AniCardGeneratorPage = () => {
	const { cardType, mediaType, id, idMal } = useLocalSearchParams<AniCardPageParams>();

	switch (cardType) {
		case 'media':
			return (
				<MediaCardGenerator id={parseInt(id)} type={mediaType} idMal={parseInt(idMal)} />
			);
		case 'character':
		case 'staff':
			return <CharacterCardGenerator id={parseInt(id)} />;
	}
};

export default AniCardGeneratorPage;
