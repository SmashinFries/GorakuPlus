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
    SeriesSearchResponseV1,
    useSearchSeriesPostMutation,
} from '@/store/services/mangaupdates/mangaUpdatesApi';
import { MotiPressable } from 'moti/interactions';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

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

const scoreOptions = {
    [ScoreFormat.Point_10]: {
        maxValue: 10,
        step: 1,
    },
    [ScoreFormat.Point_100]: {
        maxValue: 100,
        step: 1,
    },
    [ScoreFormat.Point_10Decimal]: {
        maxValue: 10.0,
        step: 0.1,
    },
    [ScoreFormat.Point_5]: {
        maxValue: 5,
        step: 1,
    },
    [ScoreFormat.Point_3]: {
        maxValue: 3,
        step: 1,
    },
};

type ListEntryEditDialogProps = {
    visible: boolean;
    entryData: MediaList;
    status: MediaListStatus;
    scoreFormat: ScoreFormat;
    updateEntry: (variables: SaveMediaListItemMutationVariables) => void;
    onDismiss: () => void;
};
export const ListEntryEditDialog = ({
    visible,
    onDismiss,
    updateEntry,
    entryData,
    scoreFormat,
    status,
}: ListEntryEditDialogProps) => {
    const { colors } = useTheme();

    const [tempParams, setTempParams] = useState({
        status: status,
        score: entryData?.score,
        progress: entryData?.progress,
        start: entryData?.startedAt,
        end: entryData?.completedAt,
        repeat: entryData?.repeat,
        notes: entryData?.notes,
    });

    const submitNewEntry = () => {
        updateEntry({
            status: tempParams.status,
            progress: tempParams.progress,
            score: tempParams.score,
            startedAt: tempParams.start,
            completedAt: tempParams.end,
            repeat: tempParams.repeat,
            notes: tempParams.notes,
        });
        onDismiss();
    };

    const updateParams = (
        key: 'status' | 'score' | 'progress' | 'start' | 'end' | 'repeat',
        value: MediaListStatus | number | FuzzyDate,
    ) => {
        setTempParams((prev) => ({ ...prev, [key]: value }));
    };

    if (!entryData) {
        return null;
    }

    return (
        <Dialog visible={visible} style={{ maxHeight: '85%' }} onDismiss={onDismiss}>
            <Dialog.Title>Edit Entry</Dialog.Title>
            <Dialog.ScrollArea>
                <ScrollView>
                    <List.Section title="Status">
                        <StatusDropDown
                            value={tempParams.status}
                            isUnreleased={entryData.media?.status === MediaStatus.NotYetReleased}
                            onSelect={(item) => updateParams('status', item)}
                        />
                    </List.Section>
                    {entryData.media?.status !== MediaStatus.NotYetReleased && (
                        <List.Section title="Progress">
                            <ProgressDropDown
                                total={
                                    entryData?.media?.episodes ??
                                    entryData?.media?.chapters ??
                                    entryData?.media?.volumes
                                }
                                maxValue={
                                    entryData?.media?.nextAiringEpisode?.episode
                                        ? entryData?.media?.nextAiringEpisode?.episode - 1
                                        : undefined
                                }
                                value={tempParams.progress ?? 0}
                                // onSelect={(item) => setProgress(item)}
                                onSelect={(item) => updateParams('progress', item)}
                            />
                        </List.Section>
                    )}
                    {entryData.media?.status !== MediaStatus.NotYetReleased && (
                        <List.Section title="Score">
                            <ProgressDropDown
                                total={scoreOptions[scoreFormat].maxValue}
                                maxValue={scoreOptions[scoreFormat].maxValue}
                                step={scoreOptions[scoreFormat].step}
                                value={tempParams.score ?? 0}
                                // onSelect={(item) => setProgress(item)}
                                onSelect={(item) => updateParams('score', item)}
                            />
                        </List.Section>
                    )}
                    <List.Section title="Start Date">
                        <DatePopup value={tempParams.start} onSelect={(item) => null} />
                    </List.Section>
                    {entryData.media?.status !== MediaStatus.NotYetReleased && (
                        <List.Section title="End Date">
                            <DatePopup value={tempParams.end} onSelect={(item) => null} />
                        </List.Section>
                    )}
                    {entryData.media?.status !== MediaStatus.NotYetReleased && (
                        <List.Section title="Repeats">
                            <ProgressDropDown
                                value={tempParams.repeat}
                                disableSlider
                                disableLimit
                                // onSelect={(item) => setProgress(item)}
                                onSelect={(item) => updateParams('repeat', item)}
                            />
                        </List.Section>
                    )}
                    <List.Section title="Notes">
                        <TextInput multiline />
                    </List.Section>
                </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
                <Button onPress={onDismiss}>Cancel</Button>
                <Button onPress={submitNewEntry}>Confirm</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

type MuSearchProps = {
    title: string;
    currentMuID: number;
    visible: boolean;
    onDismiss: () => void;
    onConfirm: (id: number) => void;
};

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
