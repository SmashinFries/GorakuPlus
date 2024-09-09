import { Dialog, Text, RadioButton, Button, Chip, Checkbox, IconButton } from 'react-native-paper';
import { useCallback, useState } from 'react';
import DraggableFlatList, {
	ScaleDecorator,
	RenderItemParams,
} from 'react-native-draggable-flatlist';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BasicDialogProps } from '@/types';
import { ExploreTabsProps } from '@/types/navigation';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useListFilterStore } from '@/store/listStore';
import { MediaType } from '@/api/anilist/__genereated__/gql';
import { DanbooruRating } from '@/api/danbooru/types';

type DefaultDescDialogProps = BasicDialogProps & {
	defaultValue: 'ani' | 'mal';
};
export const DefaultDescDialog = ({ defaultValue, visible, onDismiss }: DefaultDescDialogProps) => {
	const [value, setValue] = useState<'ani' | 'mal'>(defaultValue);
	const { setSettings } = useSettingsStore();

	const onDone = useCallback(() => {
		setSettings({ defaultDescription: value });
		onDismiss();
	}, [value]);

	const onCancel = useCallback(() => {
		onDismiss();
		setValue(defaultValue);
	}, []);

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>Default Description</Dialog.Title>
			<Dialog.Content>
				<RadioButton.Group
					value={value}
					onValueChange={(val: 'ani' | 'mal') => setValue(val)}
				>
					<RadioButton.Item label={'MyAnimeList'} value="mal" />
					<RadioButton.Item label={'AniList'} value="ani" />
				</RadioButton.Group>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onCancel}>Cancel</Button>
				<Button onPress={onDone}>Done</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

export const ExploreTabsDialog = ({ visible, onDismiss }: BasicDialogProps) => {
	const { exploreTabs, exploreTabOrder, setSettings } = useSettingsStore();

	const [tabOrder, setTabOrder] = useState<(keyof ExploreTabsProps)[]>(exploreTabOrder);
	const [validTabs, setValidTabs] = useState<(keyof ExploreTabsProps)[]>(exploreTabs);

	const onDone = () => {
		updateTabOrder(tabOrder);
		editExploreTabs(validTabs);
		onDismiss();
	};

	const editExploreTabs = (tabs: (keyof ExploreTabsProps)[]) => {
		setSettings({ exploreTabs: tabs });
	};

	const updateTabOrder = (tabs: (keyof ExploreTabsProps)[]) => {
		setSettings({ exploreTabOrder: tabs });
	};

	const renderItem = ({ item, drag, isActive }: RenderItemParams<keyof ExploreTabsProps>) => {
		return (
			<ScaleDecorator>
				<TouchableOpacity
					style={{
						width: '100%',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
					onPress={() =>
						setValidTabs(
							validTabs.includes(item)
								? validTabs.filter((tab) => tab !== item)
								: [...validTabs, item],
						)
					}
					activeOpacity={1}
					disabled={isActive}
				>
					{/* <Checkbox.Item
                        label={item}
                        disabled={isActive}
                        status={exploreTabs.includes(item) ? 'checked' : 'unchecked'}
                    /> */}
					<Text style={{ textTransform: 'capitalize', paddingLeft: 15 }}>{item}</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Checkbox
							// disabled={isActive}
							status={validTabs.includes(item) ? 'checked' : 'unchecked'}
						/>
						<IconButton icon="drag-vertical" onPressIn={drag} />
					</View>
					{/* <Text>{item}</Text> */}
				</TouchableOpacity>
			</ScaleDecorator>
			// <ScaleDecorator>
			//     <TouchableOpacity
			//         activeOpacity={1}
			//         onLongPress={drag}
			//         disabled={isActive}
			//         style={[styles.rowItem, { backgroundColor: isActive ? 'red' : 'blue' }]}
			//     >
			//         <Text style={styles.text}>{item}</Text>
			//     </TouchableOpacity>
			// </ScaleDecorator>
		);
	};

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>Edit Explore Tabs</Dialog.Title>
			<Dialog.Content style={{ overflow: 'hidden' }}>
				<GestureHandlerRootView>
					<DraggableFlatList
						data={tabOrder}
						renderItem={renderItem}
						keyExtractor={(item, idx) => idx.toString()}
						onDragEnd={({ data }) => {
							setTabOrder(data);
						}}
					/>
				</GestureHandlerRootView>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				<Button onPress={onDone}>Done</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

export const ListTabsDialog = ({
	visible,
	type,
	onDismiss,
}: BasicDialogProps & { type: MediaType }) => {
	const { animeTabOrder, mangaTabOrder, updateListFilter } = useListFilterStore();
	const [tabOrder, setTabOrder] = useState<string[]>(
		type === MediaType.Anime ? animeTabOrder : mangaTabOrder,
	);
	// const [validTabs, setValidTabs] = useState<(keyof ExploreTabsProps)[]>(exploreTabs);

	const onDone = () => {
		updateTabOrder(tabOrder);
		onDismiss();
	};

	const updateTabOrder = (tabs: string[]) => {
		updateListFilter({
			[type === MediaType.Anime ? 'animeTabOrder' : 'mangaTabOrder']: tabs,
		});
	};

	const renderItem = ({ item, drag, isActive }: RenderItemParams<string>) => {
		if (!item) return null;
		return (
			<ScaleDecorator>
				<TouchableOpacity
					style={{
						width: '100%',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
					// onPress={() =>
					//     setValidTabs(
					//         validTabs.includes(item)
					//             ? validTabs.filter((tab) => tab !== item)
					//             : [...validTabs, item],
					//     )
					// }
					activeOpacity={1}
					disabled={isActive}
				>
					{/* <Checkbox.Item
                        label={item}
                        disabled={isActive}
                        status={exploreTabs.includes(item) ? 'checked' : 'unchecked'}
                    /> */}
					<Text style={{ textTransform: 'capitalize', paddingLeft: 15 }}>{item}</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						{/* <Checkbox
                            // disabled={isActive}
                            status={validTabs.includes(item) ? 'checked' : 'unchecked'}
                        /> */}
						<IconButton icon="drag-vertical" onPressIn={drag} />
					</View>
					{/* <Text>{item}</Text> */}
				</TouchableOpacity>
			</ScaleDecorator>
			// <ScaleDecorator>
			//     <TouchableOpacity
			//         activeOpacity={1}
			//         onLongPress={drag}
			//         disabled={isActive}
			//         style={[styles.rowItem, { backgroundColor: isActive ? 'red' : 'blue' }]}
			//     >
			//         <Text style={styles.text}>{item}</Text>
			//     </TouchableOpacity>
			// </ScaleDecorator>
		);
	};

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>Edit Explore Tabs</Dialog.Title>
			<Dialog.Content style={{ overflow: 'hidden' }}>
				<GestureHandlerRootView>
					<DraggableFlatList
						data={tabOrder}
						renderItem={renderItem}
						keyExtractor={(item, idx) => idx.toString()}
						onDragEnd={({ data }) => {
							setTabOrder(data);
						}}
					/>
				</GestureHandlerRootView>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				<Button onPress={onDone}>Done</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

export const NSFWLevelDialog = ({ onDismiss, visible }: BasicDialogProps) => {
	const { blurNSFWLevel, setSettings } = useSettingsStore();

	const [newLevel, setNewLevel] = useState<DanbooruRating>(blurNSFWLevel);

	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>NSFW Blur Level</Dialog.Title>
			<Dialog.Content>
				<RadioButton.Group
					value={newLevel}
					onValueChange={(val: DanbooruRating) => setNewLevel(val)}
				>
					{Object.keys(DanbooruRating).map((rating, index) => (
						<RadioButton.Item
							key={index}
							label={rating}
							value={DanbooruRating[rating]}
						/>
					))}
				</RadioButton.Group>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				<Button
					onPress={() => {
						setSettings({ blurNSFWLevel: newLevel });
						onDismiss();
					}}
				>
					Confirm
				</Button>
			</Dialog.Actions>
		</Dialog>
	);
};
