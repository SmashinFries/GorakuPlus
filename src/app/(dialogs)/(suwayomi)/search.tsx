import {
	useSuwayomiChaptersDownloadMutation,
	useSuwayomiGetAllCategoriesQuery,
	useSuwayomiMangaChaptersMutation,
	useSuwayomiMangaSearch,
	useSuwayomiUpdateMangaMutation,
} from '@/api/suwayomi/suwayomi';
import { FetchSourceMangaMangaItem } from '@/api/suwayomi/types';
import { createSuwayomiIconUrl } from '@/api/suwayomi/utils';
import { AnimViewMem } from '@/components/animations';
import { MediaCard } from '@/components/cards';
import { PaperHeader } from '@/components/headers';
import { MaterialSwitchListItem } from '@/components/switch';
import { ListHeading } from '@/components/text';
import useDebounce from '@/hooks/useDebounce';
import { useTextInputKeyboardUnfocus } from '@/hooks/useTextInputKeyboardUnfocus';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { sendErrorMessage, sendToast } from '@/utils/toast';
import { openWebBrowser } from '@/utils/webBrowser';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import { ListRenderItemInfo } from 'react-native';
import {
	ActivityIndicator,
	Button,
	Checkbox,
	Chip,
	Dialog,
	Icon,
	Portal,
	Searchbar,
	Text,
} from 'react-native-paper';

const MediaRenderItem = ({
	item,
	serverUrl,
	onPress,
}: ListRenderItemInfo<FetchSourceMangaMangaItem> & {
	serverUrl: string;
	onPress: (manga: FetchSourceMangaMangaItem) => void;
}) => {
	const { colors } = useAppTheme();
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<MediaCard
				id={item.id}
				title={{ romaji: item.title }}
				coverImage={{ extraLarge: createSuwayomiIconUrl(serverUrl, item.thumbnailUrl) }}
				height={210}
				isFavourite={false}
				navigate={() => {
					onPress(item);
				}}
				onLongPress={() => openWebBrowser(item.realUrl)}
				disableNav
			/>
			{item?.inLibrary && (
				<AnimViewMem
					style={{
						position: 'absolute',
						top: 12,
						right: 12,
						padding: 4,
						backgroundColor: colors.primaryContainer,
						borderRadius: 18 / 2,
					}}
				>
					<Icon source={'bookmark'} size={18} color={colors.onPrimaryContainer} />
				</AnimViewMem>
			)}
			<AnimViewMem
				style={{
					position: 'absolute',
					top: 12,
					left: 12,
					padding: 4,
					backgroundColor: colors.primaryContainer,
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 8,
				}}
			>
				<Text
					variant="labelSmall"
					style={{ color: colors.onPrimaryContainer }}
				>{`${item.chapters.totalCount} Chapters`}</Text>
			</AnimViewMem>
		</View>
	);
};

const SourceList = ({
	sourceId,
	sourceTitle,
	query,
	serverUrl,
	onSelect,
}: {
	sourceId: string;
	sourceTitle: string;
	query: string;
	serverUrl: string;
	onSelect: (manga: FetchSourceMangaMangaItem) => void;
}) => {
	const { width } = useWindowDimensions();
	const search = useDebounce(query, 600);
	const { data, isFetching } = useSuwayomiMangaSearch({
		query: (search ?? '') as string,
		sourceId,
	});
	return (
		<View>
			<ListHeading title={sourceTitle} titleVariant="titleLarge" />
			<View style={{ flex: 1 }}>
				<FlatList
					data={data?.data.fetchSourceManga?.mangas}
					renderItem={(props) => (
						<MediaRenderItem
							{...props}
							serverUrl={serverUrl}
							onPress={(props) => {
								onSelect(props);
							}}
						/>
					)}
					keyExtractor={(_, idx) => idx.toString()}
					horizontal
					ListEmptyComponent={() => {
						if (isFetching) {
							return (
								<View
									style={{
										justifyContent: 'center',
										height: 200,
										width,
										alignItems: 'center',
									}}
								>
									<ActivityIndicator size={'large'} />
								</View>
							);
						} else if (
							!isFetching &&
							(data?.data?.fetchSourceManga?.mangas?.length ?? 0) === 0
						) {
							return (
								<View
									style={{
										justifyContent: 'center',
										height: 100,
										width: width,
										alignItems: 'center',
									}}
								>
									<Text>No results found</Text>
								</View>
							);
						}
					}}
				/>
			</View>
		</View>
	);
};

const SuwayomiSearchDialog = () => {
	const { query, altTitles } = useLocalSearchParams<{ query: string; altTitles: string }>();
	const alts = JSON.parse(altTitles) as string[];

	const [search, setSearch] = useState(query);
	const [selectedCats, setSelectedCats] = useState<number[]>([]);
	const [selectedManga, setSelectedManga] = useState<FetchSourceMangaMangaItem | null>(null);
	const [confirmVis, setConfirmVis] = useState(false);

	const { serverUrl, selectedSources, autoDownload } = useAuthStore((state) => state.suwayomi);
	const updateSettings = useAuthStore((state) => state.setSuwayomi);

	const { data: categoryData } = useSuwayomiGetAllCategoriesQuery();
	const { mutateAsync: getMangaChapters } = useSuwayomiMangaChaptersMutation();
	const { mutateAsync: addChaptersToDownloadQueue } = useSuwayomiChaptersDownloadMutation({
		onSuccess() {
			sendToast('Added all chapter to download queue!');
		},
	});
	const { mutateAsync: updateManga, isPending: isUpdatePending } = useSuwayomiUpdateMangaMutation(
		{
			onSuccess(data) {
				sendToast(
					data?.data?.updateManga?.manga?.inLibrary
						? 'Successfully added to library!'
						: 'Removed from library!',
				);
			},
			onError(error) {
				console.log(error);
				sendErrorMessage('No manga selected!');
			},
		},
	);

	useTextInputKeyboardUnfocus();

	const onAutoDownloadOptionToggle = (isSelected: boolean) => {
		updateSettings({ autoDownload: isSelected });
	};

	const onAutoDownload = async () => {
		if (selectedManga && autoDownload) {
			const chapters = await getMangaChapters({ mangaId: selectedManga.id });
			const ids = chapters?.data?.chapters?.nodes
				?.map((chapter) => (chapter.isDownloaded ? null : chapter.id))
				.filter((id) => id !== null);
			await addChaptersToDownloadQueue({ ids: ids });
		}
	};

	const onConfirm = async () => {
		if (selectedManga) {
			await updateManga({
				id: selectedManga.id,
				inLibrary: !selectedManga?.inLibrary,
				updateCategories: selectedCats?.length > 0,
				addToCategories: selectedCats,
			});
			!selectedManga?.inLibrary && (await onAutoDownload());
			setConfirmVis(false);
			router.back();
		}
	};

	const onCancel = () => {
		setSelectedManga(null);
		setConfirmVis(false);
	};

	useEffect(() => {
		if (selectedSources?.length < 1) {
			router.navigate('/(dialogs)/(suwayomi)/sources');
		}
	}, [selectedSources]);

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Stack.Screen
				options={{
					header(props) {
						return (
							<PaperHeader
								{...props}
								actions={[
									{
										title: 'Open Web',
										icon: 'launch',
										onPress: () =>
											openWebBrowser(
												serverUrl?.split('/api')[0] +
													`/sources/all/search?query=${search}`,
											),
									},
								]}
							/>
						);
					},
					title: 'Suwayomi Search',
					animation: 'fade',
					animationDuration: 1000,
				}}
			/>
			<View
				style={{
					paddingVertical: 6,
					gap: 12,
				}}
			>
				<Searchbar value={search} mode="bar" style={{ marginHorizontal: 12 }} />

				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{[...new Set(alts)]?.map((title, idx) => (
						<Chip
							key={idx}
							selected={search === title}
							onPress={() => setSearch(title)}
							style={{ marginHorizontal: 12 }}
						>
							{title}
						</Chip>
					))}
				</ScrollView>
				{/* <Button icon={'magnify'} mode="contained" style={{ marginHorizontal: 12 }}>
					Search
				</Button> */}
			</View>
			{selectedSources?.map((source, idx) => (
				<SourceList
					key={idx}
					query={search}
					sourceId={source.id}
					sourceTitle={source.name}
					serverUrl={serverUrl ?? ''}
					onSelect={(manga) => {
						setSelectedManga(manga);
						if ((manga?.categories?.nodes?.length ?? 0) > 0) {
							setSelectedCats(manga.categories.nodes.map((node) => node.id));
						}
						setConfirmVis(true);
					}}
				/>
			))}
			<Portal>
				<Dialog
					visible={confirmVis}
					onDismiss={() => setConfirmVis(false)}
					style={{ maxHeight: '85%' }}
				>
					<Dialog.Title>
						{selectedManga?.inLibrary ? 'Remove from Library' : 'Add to Library'}
					</Dialog.Title>
					<Dialog.Content>
						{!selectedManga?.inLibrary && (
							<MaterialSwitchListItem
								title="Auto Download"
								selected={autoDownload}
								onPress={() => onAutoDownloadOptionToggle(!autoDownload)}
							/>
						)}
						<Dialog.ScrollArea>
							<ScrollView>
								{categoryData?.data?.categories?.nodes?.map((category, idx) => (
									<Checkbox.Item
										key={idx}
										label={category.name}
										status={
											selectedCats.includes(category.id)
												? 'checked'
												: 'unchecked'
										}
										onPress={() =>
											selectedCats.includes(category.id)
												? setSelectedCats((prev) =>
														prev.filter((cat) => cat !== category.id),
													)
												: setSelectedCats((prev) => [...prev, category.id])
										}
									/>
								))}
							</ScrollView>
						</Dialog.ScrollArea>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={onCancel}>Cancel</Button>
						<Button onPress={onConfirm} loading={isUpdatePending}>
							Confirm
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</ScrollView>
	);
};

export default SuwayomiSearchDialog;
