import {
    Button,
    Dialog,
    IconButton,
    List,
    Portal,
    Searchbar,
    Text,
    TextInput,
    useTheme,
} from 'react-native-paper';
import {
    AniMediaQuery,
    FuzzyDate,
    MediaList,
    MediaListStatus,
    MediaStatus,
    MediaTag,
    SaveMediaListItemMutationVariables,
    ScoreFormat,
} from '@/store/services/anilist/generated-anilist';
import { FlatList, ScrollView, View } from 'react-native';
import { ReactNode, useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { DatePopup, ProgressDropDown, StatusDropDown } from './entryActions';
import {
    SearchReleasesPostApiResponse,
    SeriesSearchResponseV1,
    useSearchSeriesPostMutation,
} from '@/store/services/mangaupdates/mangaUpdatesApi';
import { MotiPressable } from 'moti/interactions';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { BasicDialogProps } from '@/types';
import { AnimeFull } from '@/store/services/mal/malApi';
import { openWebBrowser } from '@/utils/webBrowser';

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
                    <Section icon="format-list-numbered">{tag?.rank}%</Section>
                    <Section icon="folder-outline">{tag?.category}</Section>
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
    episodes: AniMediaQuery['Media']['streamingEpisodes'];
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
    currentMuID: number;
    onConfirm: (id: number) => void;
} & BasicDialogProps;

export const MuSearchDialog = ({
    title,
    currentMuID,
    visible,
    onDismiss,
    onConfirm,
}: MuSearchProps) => {
    const [query, setQuery] = useState(title?.replace('[', '').replace(']', ''));
    const [selected, setSelected] = useState(currentMuID);
    const [results, setResults] = useState<SeriesSearchResponseV1>();
    const [search] = useSearchSeriesPostMutation();

    const { colors } = useTheme();

    const searchManga = async (qry: string) => {
        const response = await search({
            seriesSearchRequestV1: { search: qry, stype: 'title' },
        }).unwrap();
        if (response) {
            setResults(response);
        }
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
                <Button mode="outlined" onPress={() => searchManga(query)}>
                    Search
                </Button>
            </Dialog.Content>
            <Dialog.ScrollArea>
                <FlatList
                    data={results?.results ?? []}
                    renderItem={({ item }) => (
                        <MotiPressable
                            animate={({ hovered, pressed }) => {
                                'worklet';

                                return {
                                    scale: hovered || pressed ? 0.9 : 1,
                                };
                            }}
                            onPress={() => setSelected(item?.record?.series_id)}
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
                                source={{ uri: item?.record?.image?.url.original }}
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
                        </MotiPressable>
                    )}
                    keyExtractor={(item, idx) => idx.toString()}
                />
            </Dialog.ScrollArea>
            <Dialog.Actions>
                <Button onPress={onDismiss}>Cancel</Button>
                <Button onPress={() => onConfirm(selected)}>Confirm</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

type ReleasesDialogProps = {
    releases: SearchReleasesPostApiResponse['results'] | undefined;
    animeReleases: AniMediaQuery['Media']['airingSchedule']['nodes'] | undefined;
    streamingSites: AnimeFull['streaming'];
} & BasicDialogProps;

export const ReleasesDialog = ({
    releases,
    animeReleases,
    streamingSites,
    visible,
    onDismiss,
}: ReleasesDialogProps) => {
    return (
        <Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '70%' }}>
            <Dialog.Title>Estimated Release</Dialog.Title>
            <Dialog.Content>
                <Text>
                    {releases
                        ? 'The estimated chapter release is based on the releases recorded on MangaUpdates.\n'
                        : 'The episode release time is a direct reflection of the data provided by AniList.\n'}
                </Text>
                {streamingSites && (
                    <ScrollView horizontal>
                        {streamingSites?.map((site, idx) => (
                            <Button
                                key={idx}
                                mode={'outlined'}
                                onPress={() => openWebBrowser(site.url)}
                            >
                                {site.name}
                            </Button>
                        ))}
                    </ScrollView>
                )}
                <Text variant="titleLarge">{releases ? 'Chapters' : 'Episodes'}</Text>
            </Dialog.Content>
            <Dialog.ScrollArea>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {releases
                        ? releases?.map((release, idx) => (
                              <List.Item
                                  key={idx}
                                  title={release.record.chapter}
                                  description={release.record?.groups[0]?.name}
                                  right={(props) => (
                                      <Text style={[props.style]}>
                                          {release.record?.release_date}
                                      </Text>
                                  )}
                              />
                          ))
                        : animeReleases?.map((episode, idx) => (
                              <List.Item
                                  key={idx}
                                  title={`EP ${episode.episode}`}
                                  right={(props) => (
                                      <Text style={[props.style]}>
                                          {new Date(episode.airingAt * 1000).toLocaleString()}
                                      </Text>
                                  )}
                              />
                          ))}
                </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
                <Button onPress={onDismiss}>Cool</Button>
            </Dialog.Actions>
        </Dialog>
    );
};
