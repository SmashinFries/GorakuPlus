import { useSuwayomiGetSourcesQuery } from '@/api/suwayomi/suwayomi';
import { createSuwayomiIconUrl } from '@/api/suwayomi/utils';
import { AnimViewMem } from '@/components/animations';
import { DialogHeader } from '@/components/headers/dialog';
import { useAuthStore } from '@/store/authStore';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { ActivityIndicator, Button, Checkbox, Dialog, List, TextInput } from 'react-native-paper';
import { FadeIn, FadeOut } from 'react-native-reanimated';

// const SuwayomiSourcesDialog = () => {
// 	const { serverUrl, selectedSources } = useAuthStore((state) => state.suwayomi);
// 	const setSuwayomi = useAuthStore((state) => state.setSuwayomi);
// 	const { data, isFetching } = useSuwayomiGetSourcesQuery({ enabled: !!serverUrl });

// 	const [tempSelection, setTempSelection] = useState(selectedSources ?? []);

// 	const onConfirm = () => {
// 		setSuwayomi({
// 			selectedSources: tempSelection,
// 		});
// 		router.back();
// 	};

// 	return (
// 		<Dialog visible={true} onDismiss={() => router.back()} style={{ maxHeight: '75%' }}>
// 			<Dialog.Title>Suwayomi Sources</Dialog.Title>
// 			<Dialog.ScrollArea>
// 				{isFetching ? (
// 					<View style={{ paddingVertical: 12 }}>
// 						<ActivityIndicator size={'small'} />
// 					</View>
// 				) : (
// 					<DraggableFlatList
// 						data={data?.data?.sources?.nodes ?? []}
// 						keyExtractor={(item, idx) => idx.toString()}
// 						renderItem={({ item, drag, getIndex }) => (
// 							<ScaleDecorator>
// 								<Checkbox.Item
// 									label={item.displayName}
// 									status={
// 										tempSelection?.some((val) => val.id === item.id)
// 											? 'checked'
// 											: 'unchecked'
// 									}
// 									onLongPress={drag}
// 									onPress={() =>
// 										setTempSelection((prev) =>
// 											prev?.some((val) => val.id === item.id)
// 												? prev.filter((val) => val.id !== item.id)
// 												: [
// 														...prev,
// 														{
// 															id: item.id,
// 															name: item.displayName,
// 															order: getIndex() ?? 0,
// 														},
// 													],
// 										)
// 									}
// 								/>
// 							</ScaleDecorator>
// 						)}
// 					/>
// 				)}
// 			</Dialog.ScrollArea>
// 			<Dialog.Actions>
// 				<Button onPress={onConfirm}>Confirm</Button>
// 			</Dialog.Actions>
// 		</Dialog>
// 	);
// };

const SourceListItem = ({
	title,
	iconUrl,
	isActive,
	onPress,
	onLongPress,
}: {
	title: string;
	iconUrl?: string;
	isActive: boolean;
	onPress: () => void;
	onLongPress?: () => void;
}) => {
	return (
		<AnimViewMem entering={FadeIn} exiting={FadeOut}>
			<List.Item
				title={title}
				left={(props) => (
					<>
						{isActive && (
							<List.Icon
								{...props}
								style={[props.style, { width: 16 }]}
								icon={'drag-vertical'}
							/>
						)}
						<List.Image
							{...props}
							source={{
								// uri: createSuwayomiIconUrl(serverUrl ?? undefined, item.iconUrl),
								uri: iconUrl,
							}}
						/>
					</>
				)}
				right={(props) => (
					<List.Icon
						{...props}
						icon={isActive ? 'minus-circle-outline' : 'plus-circle-outline'}
					/>
				)}
				onPress={() =>
					// setTempSelection((prev) => prev.filter((prevItem) => prevItem.id !== item.id))
					onPress()
				}
				onLongPress={() => {
					onLongPress?.();
				}}
			/>
		</AnimViewMem>
	);
};

const SuwayomiSourcesDialog = () => {
	const { serverUrl, selectedSources } = useAuthStore((state) => state.suwayomi);
	const setSuwayomi = useAuthStore((state) => state.setSuwayomi);
	const { data, isFetching } = useSuwayomiGetSourcesQuery({ enabled: !!serverUrl });

	const [tempSelection, setTempSelection] = useState(selectedSources ?? []);

	const onConfirm = () => {
		setSuwayomi({
			selectedSources: tempSelection,
		});
		router.back();
	};

	return (
		<ScrollView nestedScrollEnabled contentContainerStyle={{ paddingHorizontal: 12 }}>
			<Stack.Screen
				options={{
					header(props) {
						return (
							<DialogHeader
								{...props}
								actions={[{ label: 'Save', onPress: onConfirm }]}
							/>
						);
					},
				}}
			/>
			<List.Section title="Active Sources">
				<DraggableFlatList
					data={tempSelection}
					keyExtractor={(_, idx) => idx.toString()}
					onDragEnd={({ data }) => setTempSelection(data)}
					renderItem={({ item, drag }) => (
						<ScaleDecorator>
							<SourceListItem
								title={item.name}
								onPress={() =>
									setTempSelection((prev) =>
										prev.filter((prevItem) => prevItem.id !== item.id),
									)
								}
								onLongPress={() => drag()}
								iconUrl={createSuwayomiIconUrl(
									serverUrl ?? undefined,
									item.iconUrl,
								)}
								isActive
							/>
						</ScaleDecorator>
					)}
					nestedScrollEnabled
				/>
			</List.Section>
			<List.Section title="Available Sources">
				{isFetching ? (
					<ActivityIndicator style={{ marginVertical: 12, alignSelf: 'center' }} />
				) : (
					data?.data?.sources?.nodes
						?.filter((source) => !tempSelection?.some((val) => val.id === source.id))
						?.map((source, idx) => (
							<SourceListItem
								key={idx}
								title={source.displayName}
								onPress={() =>
									setTempSelection((prev) => [
										...prev,
										{
											id: source.id,
											name: source.displayName,
											iconUrl: source.iconUrl,
											order: prev?.length + 1,
										},
									])
								}
								isActive={false}
								iconUrl={createSuwayomiIconUrl(
									serverUrl ?? undefined,
									source.iconUrl,
								)}
							/>
						))
				)}
			</List.Section>
		</ScrollView>
	);
};

export default SuwayomiSourcesDialog;
