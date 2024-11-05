import { Dialog, Button, Text, IconButton, Searchbar } from 'react-native-paper';
import {
	Pressable,
	View,
	NativeSyntheticEvent,
	TextInputSubmitEditingEventData,
} from 'react-native';
import { useState } from 'react';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { BasicDialogProps } from '@/types';
import { NumberPicker } from '../picker';
import { MediaType } from '@/api/anilist/__genereated__/gql';
import { useSearchStore } from '@/store/search/searchStore';
import { SheetManager } from 'react-native-actions-sheet';
import { selectImage } from '@/utils/images';
import { ImagePickerAsset } from 'expo-image-picker';
import { useShallow } from 'zustand/react/shallow';

// export const PresetDialog = ({ visible, onDismiss }: BasicDialogProps) => {
// 	return (
// 		<Dialog visible={visible} onDismiss={onDismiss}>
// 			<Dialog.Title>Tag Presets</Dialog.Title>
// 			<Dialog.Content>
// 				<Dialog.ScrollArea>
// 					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
// 						{tagPresets.map((preset, idx) => (
// 							<Chip key={idx} style={{ margin: 8 }}>
// 								{preset.title}
// 							</Chip>
// 						))}
// 					</View>
// 				</Dialog.ScrollArea>
// 			</Dialog.Content>
// 			<Dialog.Actions>
// 				<Button onPress={onDismiss}>Done</Button>
// 			</Dialog.Actions>
// 		</Dialog>
// 	);
// };

type ScoreDialogProps = BasicDialogProps & {
	updateScore: (score: number) => void;
	initialScore?: number;
	minValue?: number;
	maxValue?: number;
};
export const ScoreDialog = ({
	visible,
	onDismiss,
	initialScore,
	updateScore,
}: ScoreDialogProps) => {
	return (
		<NativeViewGestureHandler disallowInterruption={true}>
			<Dialog visible={visible} onDismiss={onDismiss}>
				<Dialog.Title>Notification Frequency (hours)</Dialog.Title>
				<Dialog.Content>
					<NumberPicker
						defaultValue={initialScore}
						mode="hours"
						onChange={(number) => updateScore(number)}
					/>
				</Dialog.Content>
				{/* <Dialog.Actions>
					<Button onPress={onCancel}>Cancel</Button>
                    <Button onPress={onConfirm}>Confirm</Button>
				</Dialog.Actions> */}
			</Dialog>
		</NativeViewGestureHandler>
	);
};

type ImageSearchDialogProps = BasicDialogProps;
export const ImageSearchDialog = ({ visible, onDismiss }: ImageSearchDialogProps) => {
	const searchType = useSearchStore(useShallow((state) => state.searchType));
	const [imageUrl, setImageUrl] = useState('');

	const onUrlSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
		switch (searchType) {
			case MediaType.Anime:
				SheetManager.show('TraceMoeSheet', {
					payload: { url: e.nativeEvent?.text },
				});
				break;
			case MediaType.Manga:
				SheetManager.show('SauceNaoSheet', {
					payload: {
						file: e.nativeEvent.text,
					},
				});
				break;
			case 'CHARACTER':
				break;
			default:
				break;
		}
		onDismiss();
	};

	const onImageSelect = async (camera?: boolean) => {
		const asset = (await selectImage(camera, true)) as ImagePickerAsset;
		switch (searchType) {
			case MediaType.Anime:
				SheetManager.show('TraceMoeSheet', {
					payload: {
						image: {
							uri: asset.uri,
							type: asset.mimeType,
							name: asset.fileName ?? 'image',
						},
					},
				});
				break;
			case MediaType.Manga:
				SheetManager.show('SauceNaoSheet', {
					payload: {
						file: {
							uri: asset.uri,
							type: asset.mimeType,
							name: asset.fileName ?? 'image',
						},
					},
				});
				break;
			case 'CHARACTER':
			// CANT GET GRADIO API TO WORK

			// const response = await fetch(asset.uri);
			// const imageBlob = await response.blob();
			// const test = await fetchPredictWaifu({
			// 	data: [
			// 		{ path: `data:image/jpeg;base64,${asset.base64}` },
			// 		'SmilingWolf/wd-swinv2-tagger-v3',
			// 		1,
			// 		false,
			// 		0.85,
			// 		true,
			// 	],
			// });
			// SheetManager.show('CharacterSearchSheet', {
			// 	payload: {
			// 		image: `data:${asset.mimeType};base64,${asset.base64}`,
			// 	},
			// });
			default:
				break;
		}
		onDismiss();
	};

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title style={{ textTransform: 'capitalize' }}>
				{searchType} Image Search
			</Dialog.Title>
			<Dialog.Content>
				<View>
					<Searchbar
						value={imageUrl}
						mode="bar"
						elevation={1}
						onChangeText={(txt) => setImageUrl(txt)}
						onSubmitEditing={onUrlSubmit}
					/>
					<Text style={{ textAlign: 'center', paddingVertical: 12 }}>- Or -</Text>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'space-evenly',
							flexDirection: 'row',
						}}
					>
						<Pressable
							onPress={() => onImageSelect(true)}
							style={{ alignItems: 'center', justifyContent: 'center' }}
						>
							<IconButton icon="camera" />
							<Text style={{ textAlign: 'center' }}>Take a photo</Text>
						</Pressable>
						<Pressable
							onPress={() => onImageSelect()}
							style={{ alignItems: 'center', justifyContent: 'center' }}
						>
							<IconButton icon="image-outline" />
							<Text style={{ textAlign: 'center' }}>Upload Image</Text>
						</Pressable>
					</View>
				</View>
				{/* <Dialog.ScrollArea>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {tagPresets.map((preset, idx) => (
                            <Chip key={idx} style={{ margin: 8 }}>
                                {preset.title}
                            </Chip>
                        ))}
                    </View>
                </Dialog.ScrollArea> */}
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				{/* <Button onPress={onDismiss}>Search</Button> */}
			</Dialog.Actions>
		</Dialog>
	);
};

// export const FilterTagDialog = ({
// 	data,
// 	visible,
// 	onDismiss,
// 	// toggleTag,
// }: BasicDialogProps & {
// 	data: TagCollectionQuery['MediaTagCollection'];
// 	toggleTag: (name: string) => void;
// }) => {
// 	const listRef = useRef<FlashList<any>>(null);
// 	const { colors } = useAppTheme();
// 	const [query, setQuery] = useState('');
// 	const [showAdultTags, setShowAdultTags] = useState(false);
// 	const { scrollHandler, shouldShowScrollToTop } = useScrollHandler();

// 	const { filter, isTagBlacklistEnabled, updateTags } = useSearchStore();
// 	const { tagBlacklist, showNSFW } = useSettingsStore();

// 	const nsfwTags = useMemo(() => data?.filter((tag) => tag.isAdult), [data]);
// 	const tagmap = useMemo(() => [...new Set(data?.map((tag) => tag.name[0]))], [data]);
// 	const tagmapNSFW = useMemo(() => [...new Set(nsfwTags?.map((tag) => tag.name[0]))], [data]);

// 	const getTagState = useCallback(
// 		(name: string) => {
// 			if (filter.tag_in?.includes(name)) {
// 				return 'in';
// 			} else if (filter.tag_not_in?.includes(name)) {
// 				return 'not_in';
// 			} else {
// 				return undefined;
// 			}
// 		},
// 		[filter.tag_in, filter.tag_not_in],
// 	);

// 	const TagItem = useCallback(
// 		({ item }: { item: MediaTag }) => {
// 			return filter.isAdult === false && item.isAdult ? null : (
// 				<FilterTag
// 					name={item.name}
// 					description={item.description}
// 					state={getTagState(item.name)}
// 					onToggle={() => updateTags(item.name)}
// 					disabled={isTagBlacklistEnabled ? tagBlacklist?.includes(item.name) : false}
// 					isAdult={item.isAdult}
// 				/>
// 			);
// 		},
// 		[filter.isAdult, filter.tag_in, filter.tag_not_in, isTagBlacklistEnabled],
// 	);

// 	return (
// 		<Dialog style={{ height: '90%' }} visible={visible} onDismiss={onDismiss}>
// 			<Dialog.Title>Tags</Dialog.Title>
// 			<Dialog.Content style={{ paddingBottom: 0 }}>
// 				<View>
// 					<Searchbar
// 						value={query}
// 						onChangeText={(txt) => setQuery(txt)}
// 						mode="view"
// 						placeholder="Search tags"
// 					/>
// 					<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
// 						{showNSFW && filter.isAdult && (
// 							<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
// 								<View style={{ justifyContent: 'center' }}>
// 									<IconButton
// 										icon={showAdultTags ? 'emoticon-devil' : 'cross'}
// 										iconColor={showAdultTags ? '#FF69B4' : undefined}
// 										onPress={() => setShowAdultTags((prev) => !prev)}
// 									/>
// 								</View>
// 								<View
// 									style={{
// 										borderRightWidth: 0.8,
// 										borderRightColor: 'black',
// 										marginVertical: 20,
// 									}}
// 								/>
// 							</View>
// 						)}
// 						<ScrollView
// 							horizontal
// 							showsHorizontalScrollIndicator={false}
// 							contentContainerStyle={{ paddingVertical: 10 }}
// 						>
// 							{showAdultTags
// 								? tagmapNSFW.map((letter, idx) => (
// 										<Button
// 											key={idx}
// 											onPress={() =>
// 												listRef.current?.scrollToIndex({
// 													animated: true,
// 													index: nsfwTags?.findIndex((tag) =>
// 														tag.name[0].includes(letter),
// 													),
// 												})
// 											}
// 											labelStyle={{ fontWeight: '900' }}
// 										>
// 											{letter}
// 										</Button>
// 									))
// 								: tagmap.map((letter, idx) => (
// 										<Button
// 											key={idx}
// 											onPress={() =>
// 												listRef.current?.scrollToIndex({
// 													animated: true,
// 													index: data?.findIndex((tag) =>
// 														tag.name[0].includes(letter),
// 													),
// 												})
// 											}
// 											labelStyle={{ fontWeight: '900' }}
// 										>
// 											{letter}
// 										</Button>
// 									))}
// 						</ScrollView>
// 					</View>
// 				</View>
// 			</Dialog.Content>
// 			<Dialog.ScrollArea>
// 				<AnimatedFlashList
// 					ref={listRef}
// 					key={'test'}
// 					data={data
// 						?.filter((tag) =>
// 							query.length > 0
// 								? tag.name.toLowerCase().includes(query.toLowerCase())
// 								: true,
// 						)
// 						.filter((tag) => (showAdultTags ? tag.isAdult : true))}
// 					renderItem={TagItem}
// 					keyExtractor={(item, idx) => idx.toString()}
// 					numColumns={1}
// 					estimatedItemSize={44}
// 					showsVerticalScrollIndicator={false}
// 					onScroll={scrollHandler}
// 					// columnWrapperStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
// 				/>
// 				{shouldShowScrollToTop && (
// 					<ScrollToTopButton
// 						onPress={() => listRef.current?.scrollToIndex({ index: 0, animated: true })}
// 					/>
// 				)}
// 			</Dialog.ScrollArea>
// 			<Dialog.Actions style={{ flexGrow: 0 }}>
// 				<Button onPress={onDismiss}>Done</Button>
// 			</Dialog.Actions>
// 		</Dialog>
// 	);
// };
