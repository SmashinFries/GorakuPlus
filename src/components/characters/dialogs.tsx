import { Dialog, Button, Text, useTheme, Searchbar, ActivityIndicator } from 'react-native-paper';
import { BasicDialogProps } from '../../types';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { DanTags } from '@/api/danbooru/types';
import { useTagsSearchQuery } from '@/api/danbooru/danbooru';
import useDebounce from '@/hooks/useDebounce';
import { useMatchStore } from '@/store/matchStore';

type TagSearchDialogProps = BasicDialogProps & {
	initialQuery: string;
	initialTags: DanTags[];
	tagsLoading: boolean;
	charId: number;
	onTagChange: (tag: string) => void;
	// saveTag: (tag: string) => void;
};
export const TagSearchDialog = ({
	visible,
	initialQuery,
	initialTags,
	tagsLoading,
	charId,
	onDismiss,
	onTagChange,
	// saveTag,
}: TagSearchDialogProps) => {
	const { colors } = useTheme();
	const { addBooruTag } = useMatchStore();
	const [query, setQuery] = useState(initialQuery);
	const debouncedQuery = useDebounce(query, 600);
	const [selectedTag, setSelectedTag] = useState<string>(initialTags[0]?.value ?? '');
	const [results, setResults] = useState<DanTags[]>(initialTags ?? []);
	const { isFetching } = useTagsSearchQuery({
		'search[query]': debouncedQuery,
		'search[type]': 'tag',
		limit: 15,
	});

	const onConfirm = useCallback(() => {
		addBooruTag(charId, selectedTag);
		// saveTag(selectedTag);
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
				<Searchbar value={query} onChangeText={(txt) => setQuery(txt)} />
				{/* <Button mode="outlined" onPress={() => onSearch(query)}>
					Search
				</Button> */}
			</Dialog.Content>
			<Dialog.ScrollArea>
				{!isFetching ? (
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
