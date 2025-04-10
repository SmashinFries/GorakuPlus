import {
	Button,
	Chip,
	Dialog,
	IconButton,
	List,
	Portal,
	Searchbar,
	Surface,
	Text,
} from 'react-native-paper';
import { FlatList, Pressable, ScrollView, View } from 'react-native';
import { ReactNode, useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { BasicDialogProps } from '@/types';
import {
	AniMediaQuery_Media_Media_airingSchedule_AiringScheduleConnection_nodes_AiringSchedule,
	AniMediaQuery_Media_Media_streamingEpisodes_MediaStreamingEpisode,
	MediaStatus,
	MediaTag,
} from '@/api/anilist/__genereated__/gql';
import {
	SearchReleasesPostMutationResult,
	useSearchSeriesPost,
} from '@/api/mangaupdates/mangaupdates';
import { AnimeFull } from '@/api/jikan/models';
import { useAppTheme } from '@/store/theme/themes';
import { useMatchStore } from '@/store/matchStore';
import { useShallow } from 'zustand/react/shallow';
import { CrunchyRollIcon } from '../svgs';

type TagDialogProps = {
	visible: boolean;
	onDismiss: () => void;
	tag: MediaTag;
};
export const TagDialog = ({ visible, onDismiss, tag }: TagDialogProps) => {
	const Section = ({
		icon,
		children,
	}: {
		icon: IconSource;
		children: ReactNode;
		isUser?: boolean;
	}) => {
		return (
			<View style={{ flexDirection: 'row' }}>
				<IconButton icon={icon} />
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Text>{children}</Text>
				</View>
			</View>
		);
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onDismiss}>
				<Dialog.Title>{tag?.name}</Dialog.Title>
				<Dialog.Content>
					<Section icon="card-text-outline">{tag?.description}</Section>
					{tag?.rank && <Section icon="format-list-numbered">{tag?.rank}%</Section>}
					{tag?.category && <Section icon="folder-outline">{tag?.category}</Section>}
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onDismiss}>Cool</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

type EpisodeDialogProps = {
	visible: boolean;
	onDismiss: () => void;
	episodes: AniMediaQuery_Media_Media_streamingEpisodes_MediaStreamingEpisode[];
};
export const EpisodeDialog = ({ episodes, visible, onDismiss }: EpisodeDialogProps) => {
	// const reversedEpisodes = episodes.reverse();
	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>Episodes</Dialog.Title>
			<Dialog.Content>
				<Dialog.ScrollArea>
					{episodes.map((episode, idx) => (
						<Text key={idx}>{episode.title}</Text>
					))}
				</Dialog.ScrollArea>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Done</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

type RemoveListItemDialogProps = {
	visible: boolean;
	onDismiss: () => void;
	onConfirm: () => void;
};
export const RemoveListItemDialog = ({
	visible,
	onDismiss,
	onConfirm,
}: RemoveListItemDialogProps) => {
	return (
		<Dialog visible={visible} onDismiss={onDismiss}>
			<Dialog.Title>Remove Entry?</Dialog.Title>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				<Button
					onPress={() => {
						onConfirm();
						onDismiss();
					}}
				>
					Confirm
				</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

type MuSearchProps = {
	title: string;
	altTitles?: string[];
	aniId: number;
	onConfirm: (id: number) => void;
} & BasicDialogProps;

export const MuSearchDialog = ({
	title,
	altTitles,
	aniId,
	visible,
	onDismiss,
	onConfirm,
}: MuSearchProps) => {
	const addMangaUpdatesID = useMatchStore(useShallow((state) => state.addMangaUpdatesID));
	const muDB = useMatchStore(useShallow((state) => state.mangaUpdates));
	const [query, setQuery] = useState(title?.replace('[', '').replace(']', ''));
	const [selected, setSelected] = useState(muDB[aniId]);
	const { data: results, mutateAsync: search } = useSearchSeriesPost();

	const { colors } = useAppTheme();

	const searchManga = async (qry: string) => {
		await search({
			data: { search: qry, stype: 'title' },
		});
	};

	useEffect(() => {
		if (visible && title && !results) {
			searchManga(title);
		}
	}, [results, visible, title]);

	return (
		<Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '90%' }}>
			<Dialog.Title>Select Media</Dialog.Title>
			<Dialog.Content>
				<Searchbar
					value={query}
					onChangeText={(txt) => setQuery(txt)}
					onSubmitEditing={({ nativeEvent }) => searchManga(nativeEvent.text)}
				/>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingVertical: 10 }}
				>
					{altTitles?.map(
						(title, idx) =>
							title && (
								<Chip
									key={idx}
									mode="flat"
									style={{ marginHorizontal: 5 }}
									onPress={() => {
										setQuery(title);
										searchManga(title);
									}}
								>
									{title}
								</Chip>
							),
					)}
				</ScrollView>
				<Button mode="outlined" onPress={() => searchManga(query)}>
					Search
				</Button>
			</Dialog.Content>
			<Dialog.ScrollArea>
				<FlatList
					data={results?.data.results ?? []}
					renderItem={({ item }) => (
						<Pressable
							onPress={() =>
								item?.record?.series_id && setSelected(item?.record?.series_id)
							}
							style={{
								flex: 1,
								flexDirection: 'row',
								marginVertical: 8,
								borderRadius: 8,
								backgroundColor:
									selected === item.record?.series_id
										? colors.secondaryContainer
										: 'transparent',
								alignItems: 'center',
							}}
						>
							<Image
								source={{ uri: item?.record?.image?.url?.original ?? undefined }}
								style={{
									height: 140,
									width: 100,
									borderRadius: 8,
								}}
								contentFit="cover"
							/>
							<View style={{ flex: 1 }}>
								<Text
									variant="titleMedium"
									numberOfLines={3}
									style={{ flex: 1, padding: 5, textAlign: 'center' }}
								>
									{item?.record?.title}
								</Text>
								<Text
									variant="titleSmall"
									numberOfLines={3}
									style={{
										flex: 1,
										textAlign: 'center',
										color: colors.onSurfaceVariant,
									}}
								>
									{item?.record?.type}
								</Text>
							</View>
						</Pressable>
					)}
					keyExtractor={(item, idx) => idx.toString()}
				/>
			</Dialog.ScrollArea>
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cancel</Button>
				<Button
					onPress={() => {
						addMangaUpdatesID(aniId, selected);
						onConfirm(selected);
					}}
				>
					Confirm
				</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

type ReleasesDialogProps = {
	releases: SearchReleasesPostMutationResult['data']['results'] | undefined;
	animeReleases:
		| AniMediaQuery_Media_Media_airingSchedule_AiringScheduleConnection_nodes_AiringSchedule[]
		| undefined;
	streamingSites: AnimeFull['streaming'];
	status: MediaStatus;
	streamingEpisodes: AniMediaQuery_Media_Media_streamingEpisodes_MediaStreamingEpisode[];
} & BasicDialogProps;

export const ReleasesDialog = ({
	releases,
	animeReleases,
	streamingEpisodes,
	status,
	visible,
	onDismiss,
}: ReleasesDialogProps) => {
	const { colors } = useAppTheme();
	return (
		<Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '70%' }}>
			<Dialog.Title>Estimated Release</Dialog.Title>
			<Dialog.Content>
				<Text>{`This series is currently ${status
					.toLowerCase()
					.replaceAll('_', ' ')}.\n`}</Text>
				{![MediaStatus.Cancelled, MediaStatus.Hiatus, MediaStatus.Finished].includes(
					status,
				) && (
					<Text>
						{releases
							? 'The estimated chapter release is based on the releases recorded on MangaUpdates.\n'
							: 'The episode release time is a direct reflection of the data provided by AniList.\n'}
					</Text>
				)}
				{/* {streamingSites && (
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ marginBottom: 15 }}
					>
						{streamingSites?.map((site, idx) => (
							<Button
								key={idx}
								mode={'outlined'}
								onPress={() => openWebBrowser(site.url)}
								style={{ marginHorizontal: 5 }}
							>
								{site.name}
							</Button>
						))}
					</ScrollView>
				)} */}
				{(releases || animeReleases) && (
					<Text variant="titleLarge">{releases ? 'Chapters' : 'Episodes'}</Text>
				)}
			</Dialog.Content>
			{(releases || animeReleases) && (
				<Dialog.ScrollArea>
					<ScrollView showsVerticalScrollIndicator={false}>
						{releases
							? releases?.map((release, idx) => (
									<List.Item
										key={idx}
										title={
											(release.record?.chapter?.length ?? 0) > 0
												? release.record?.chapter
												: `v${release.record?.volume}`
										}
										description={release.record?.groups?.[0]?.name}
										right={(props) => (
											<Text style={[props.style]}>
												{release.record?.release_date}
											</Text>
										)}
									/>
								))
							: streamingEpisodes
								? streamingEpisodes?.map((streamEP, idx) => (
										// <List.Item
										// 	key={idx}
										// 	title={`${streamEP.title}`}
										// 	titleNumberOfLines={2}
										// 	description={() => (
										// 		<Image
										// 			source={{ uri: streamEP.thumbnail }}
										// 			contentFit="cover"
										// 			style={{ width: '100%', aspectRatio: 32 / 9 }}
										// 		/>
										// 	)}
										// 	onPress={() => openWebBrowser(streamEP.url, true)}
										// />
										<Surface
											key={idx}
											style={{
												flex: 1,
												borderRadius: 8,
												marginVertical: 6,
												padding: 6,
											}}
										>
											<View
												style={{
													justifyContent: 'space-between',
													flexDirection: 'row',
												}}
											>
												<Text
													variant="titleMedium"
													style={{ flexShrink: 1 }}
												>
													{streamEP.title}
												</Text>
												<CrunchyRollIcon fontColor={colors.onSurface} />
											</View>
											<Image
												source={{ uri: streamEP.thumbnail }}
												contentFit="cover"
												style={{
													width: '100%',
													aspectRatio: 32 / 9,
													borderRadius: 8,
													marginTop: 4,
												}}
											/>
										</Surface>
									))
								: animeReleases?.map((episode, idx) => (
										<List.Item
											key={idx}
											title={`EP ${episode.episode}`}
											right={(props) => (
												<Text style={[props.style]}>
													{new Date(
														episode.airingAt * 1000,
													).toLocaleString()}
												</Text>
											)}
										/>
									))}
					</ScrollView>
				</Dialog.ScrollArea>
			)}
			<Dialog.Actions>
				<Button onPress={onDismiss}>Cool</Button>
			</Dialog.Actions>
		</Dialog>
	);
};
