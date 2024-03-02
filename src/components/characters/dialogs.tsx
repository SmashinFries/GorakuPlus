import { Dialog, Button, Text, useTheme, Searchbar, ActivityIndicator } from 'react-native-paper';
import { BasicDialogProps } from '../../types';
import { useCallback, useState } from 'react';
import { DanTags } from '@/store/services/danbooru/types';
import { FlatList } from 'react-native';
import { useLazySearchTagsQuery } from '@/store/services/danbooru/danbooruApi';

type TagSearchDialogProps = BasicDialogProps & {
	initialQuery: string;
	initialTags: DanTags[];
	tagsLoading: boolean;
	onTagChange: (tag: string) => void;
	saveTag: (tag: string) => void;
};
export const TagSearchDialog = ({
	visible,
	initialQuery,
	initialTags,
	tagsLoading,
	onDismiss,
	onTagChange,
	saveTag,
}: TagSearchDialogProps) => {
	const { colors } = useTheme();
	const [query, setQuery] = useState(initialQuery);
	const [selectedTag, setSelectedTag] = useState<string>(initialTags[0]?.value ?? '');
	const [results, setResults] = useState<DanTags[]>(initialTags ?? []);
	const [search, searchStatus] = useLazySearchTagsQuery();

	const onSearch = useCallback(async (q: string) => {
		const response = await search({
			'search[query]': q.toLowerCase(),
			'search[type]': 'tag',
			limit: 20,
		}).unwrap();
		setResults(response);
	}, []);

	const onConfirm = useCallback(() => {
		saveTag(selectedTag);
		onTagChange(selectedTag);
		onDismiss();
	}, [selectedTag]);

	const RenderItem = useCallback(
		({ item }: { item: DanTags }) => {
			return (
				<Button
					style={{
						margin: 8,
						borderColor: selectedTag === item.value ? colors.primary : 'transparent',
					}}
					onPress={() => setSelectedTag(item.value)}
					mode="outlined"
					icon={selectedTag === item.value ? 'check' : undefined}
					rippleColor={colors.primary}
				>
					{item.label}
				</Button>
			);
		},
		[selectedTag],
	);

	return (
		<Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '90%' }}>
			<Dialog.Title>Find Character</Dialog.Title>
			<Dialog.Content>
				<Searchbar
					value={query}
					onChangeText={(txt) => setQuery(txt)}
					onSubmitEditing={({ nativeEvent }) => onSearch(nativeEvent.text)}
				/>
				<Button mode="outlined" onPress={() => onSearch(query)}>
					Search
				</Button>
			</Dialog.Content>
			<Dialog.ScrollArea>
				{!searchStatus.isFetching ? (
					<FlatList
						data={results ?? []}
						contentContainerStyle={{ paddingTop: 10 }}
						renderItem={RenderItem}
						keyExtractor={(item, idx) => idx.toString()}
					/>
				) : (
					<ActivityIndicator />
				)}
			</Dialog.ScrollArea>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				<Button onPress={onConfirm}>Save</Button>
			</Dialog.Actions>
		</Dialog>
	);
};
