import {
	Dialog,
	Button,
	Chip,
	Text,
	useTheme,
	TextInput,
	IconButton,
	Searchbar,
	Tooltip,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Pressable, View, ScrollView } from 'react-native';
import { useCallback, useRef, useState } from 'react';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { BasicDialogProps } from '@/types';
import { NumberPicker } from '../picker';
import { GenreTagCollectionQuery, MediaTag } from '@/store/services/anilist/generated-anilist';
import { useAppTheme } from '@/store/theme/theme';
import { useAppSelector } from '@/store/hooks';
import { FlashList } from '@shopify/flash-list';
import { FilterTag } from './tags';
import { useFilter } from '@/hooks/search/useFilter';

export const PresetDialog = ({ visible, onDismiss }: BasicDialogProps) => {
	const { tagPresets } = useSelector((state: RootState) => state.persistedPresets);
	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>Tag Presets</Dialog.Title>
			<Dialog.Content>
				<Dialog.ScrollArea>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
						{tagPresets.map((preset, idx) => (
							<Chip key={idx} style={{ margin: 8 }}>
								{preset.title}
							</Chip>
						))}
					</View>
				</Dialog.ScrollArea>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Done</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

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
	minValue = 0,
	maxValue = 100,
}: ScoreDialogProps) => {
	const { colors } = useTheme();
	const [value, setValue] = useState(0);
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

type ImageSearchDialogProps = BasicDialogProps & {
	searchImage: (imageType: 'camera' | 'upload') => void;
	searchUrl: (url: string) => void;
};
export const ImageSearchDialog = ({
	visible,
	onDismiss,
	searchImage,
	searchUrl,
}: ImageSearchDialogProps) => {
	const [imageUrl, setImageUrl] = useState('');
	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>Image Search</Dialog.Title>
			<Dialog.Content>
				<View>
					<Searchbar
						value={imageUrl}
						mode="view"
						onChangeText={(txt) => setImageUrl(txt)}
						onSubmitEditing={(e) => {
							searchUrl(e.nativeEvent.text);
							onDismiss();
						}}
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
							onPress={() => {
								searchImage('camera');
								onDismiss();
							}}
							style={{ alignItems: 'center', justifyContent: 'center' }}
						>
							<IconButton icon="camera" />
							<Text style={{ textAlign: 'center' }}>Take a photo</Text>
						</Pressable>
						<Pressable
							onPress={() => {
								searchImage('upload');
								onDismiss();
							}}
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

export const FilterTagDialog = ({
	data,
	visible,
	onDismiss,
	// toggleTag,
}: BasicDialogProps & {
	data: GenreTagCollectionQuery['MediaTagCollection'];
	toggleTag: (name: string) => void;
}) => {
	const listRef = useRef<FlashList<any>>(null);
	const { colors } = useAppTheme();
	const [query, setQuery] = useState('');
	const { isTagBlacklist } = useAppSelector((state) => state.filter);
	const { tagBlacklist } = useAppSelector((state) => state.persistedSettings);
	const { filter, updateTag } = useFilter();

	const [scrollVertOffset, setScrollVertOffset] = useState(0);

	const getTagState = useCallback(
		(name: string) => {
			if (filter.tag_in?.includes(name)) {
				return 'in';
			} else if (filter.tag_not_in?.includes(name)) {
				return 'not_in';
			} else {
				return undefined;
			}
		},
		[filter.tag_in, filter.tag_not_in],
	);

	const TagItem = useCallback(
		({ item }: { item: MediaTag }) => {
			return !filter.isAdult && item.isAdult ? null : (
				<FilterTag
					name={item.name}
					description={item.description}
					state={getTagState(item.name)}
					onToggle={() => updateTag(item.name)}
					disabled={isTagBlacklist ? tagBlacklist?.includes(item.name) : false}
				/>
			);
		},
		[filter.isAdult, filter.tag_in, filter.tag_not_in, isTagBlacklist],
	);

	return (
		<Dialog style={{ height: '90%' }} visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>Tags</Dialog.Title>
			<Dialog.Content style={{ paddingBottom: 0 }}>
				<View>
					<Searchbar
						value={query}
						onChangeText={(txt) => setQuery(txt)}
						mode="view"
						placeholder="Search tags"
					/>
					<View style={{ justifyContent: 'center' }}>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{ paddingVertical: 10 }}
						>
							{[...new Set(data?.map((tag) => tag.name[0]))].map((letter, idx) => (
								<Button
									key={idx}
									onPress={() =>
										listRef.current?.scrollToIndex({
											animated: true,
											index: data?.findIndex((tag) =>
												tag.name[0].includes(letter),
											),
										})
									}
									labelStyle={{ fontWeight: '900' }}
								>
									{letter}
								</Button>
							))}
						</ScrollView>
					</View>
				</View>
			</Dialog.Content>
			<Dialog.ScrollArea>
				<FlashList
					ref={listRef}
					key={'test'}
					data={data?.filter((tag) =>
						query.length > 0
							? tag.name.toLowerCase().includes(query.toLowerCase())
							: true,
					)}
					renderItem={TagItem}
					keyExtractor={(item, idx) => idx.toString()}
					numColumns={1}
					estimatedItemSize={44}
					showsVerticalScrollIndicator={false}
					onScroll={(e) => setScrollVertOffset(e.nativeEvent.contentOffset.y)}
					// columnWrapperStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
				/>
				{scrollVertOffset > 200 && (
					<IconButton
						icon={'chevron-up'}
						onPress={() => {
							listRef.current?.scrollToOffset({ offset: 0, animated: true });
						}}
						style={{
							position: 'absolute',
							top: 0,
							alignSelf: 'center',
							backgroundColor: colors.surfaceVariant,
						}}
					/>
				)}
			</Dialog.ScrollArea>
			<Dialog.Actions style={{ flexGrow: 0 }}>
				<Button onPress={onDismiss}>Done</Button>
			</Dialog.Actions>
		</Dialog>
	);
};
