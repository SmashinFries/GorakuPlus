import { Badge, Chip, IconButton, Text } from 'react-native-paper';
import { MotiView } from 'moti';
import {
    ExploreMediaQueryVariables,
    GenreTagCollectionQuery,
} from '../../../app/services/anilist/generated-anilist';
import { View } from 'react-native';
import { memo, useCallback, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { FilterActions } from '../reducers';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setSettings } from '../../more/settings/settingsSlice';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { TagBanSwitch } from './buttons';

type TagProps = {
    name: string;
    state?: 'in' | 'not_in' | undefined;
    disabled?: boolean;
    onToggle: (mode: 'in' | 'not_in' | 'remove') => void;
};
const Tag = ({ name, state, onToggle, disabled }: TagProps) => {
    return (
        <Chip
            style={{
                margin: 5,
                shadowColor: state === 'in' ? 'green' : state === 'not_in' ? 'red' : undefined,
                borderColor: state === 'in' ? 'green' : state === 'not_in' ? 'red' : undefined,
                shadowOpacity: 1,
                elevation: 12,
            }}
            selected={state === 'in' || state === 'not_in'}
            onPress={() => {
                onToggle(state === 'in' ? 'not_in' : state === 'not_in' ? 'remove' : 'in');
            }}
            selectedColor={state === 'in' ? 'green' : state === 'not_in' ? 'red' : undefined}
            elevated
            disabled={disabled}
            mode={'outlined'}
        >
            {name}
        </Chip>
    );
};

const TagMem = memo(Tag);

type TagSelectionProps = {
    data: GenreTagCollectionQuery['MediaTagCollection'];
    tags_in: ExploreMediaQueryVariables['tag_in'];
    tags_not_in: ExploreMediaQueryVariables['tag_not_in'];
    isAdult: boolean;
    tagBanEnabled: boolean;
    toggleGenreTag: (props: FilterActions) => void;
};

type GenreSelectionProps = {
    data: GenreTagCollectionQuery['GenreCollection'];
    genre_in: ExploreMediaQueryVariables['genre_in'];
    genre_not_in: ExploreMediaQueryVariables['genre_not_in'];
    isAdult: boolean;
    toggleGenreTag: (props: FilterActions) => void;
};

const TagSelection = ({
    data,
    tags_in,
    tags_not_in,
    isAdult,
    tagBanEnabled,
    toggleGenreTag,
}: TagSelectionProps) => {
    const { defaultTagLayout, tagBlacklist } = useAppSelector((state) => state.persistedSettings);
    const [tagMode, setTagMode] = useState(defaultTagLayout);
    const settingsDispatch = useAppDispatch();

    const changeLayout = useCallback(() => {
        setTagMode((prev) => (prev === 'list' ? 'row' : 'list'));
        settingsDispatch(
            setSettings({
                entryType: 'defaultTagLayout',
                value: tagMode === 'list' ? 'row' : 'list',
            }),
        );
    }, []);

    const getTagState = useCallback(
        (name: string) => {
            if (tags_in?.includes(name)) {
                return 'in';
            } else if (tags_not_in?.includes(name)) {
                return 'not_in';
            } else {
                return undefined;
            }
        },
        [tags_in, tags_not_in],
    );

    const resetTag = useCallback(() => {
        toggleGenreTag({ type: 'RESET_TAGS_GENRES', payload: 'tag' });
    }, []);

    const TagItem = useCallback(
        ({ item }) => {
            return !isAdult && item.isAdult ? null : (
                <Tag
                    name={item.name}
                    state={getTagState(item.name)}
                    onToggle={(mode: 'in' | 'not_in' | 'remove') =>
                        toggleGenreTag({
                            type: mode === 'remove' ? 'REMOVE_TAG' : 'TOGGLE_TAG',
                            key: mode === 'in' ? 'tag_in' : 'tag_not_in',
                            payload: item.name,
                        })
                    }
                    disabled={tagBanEnabled ? tagBlacklist?.includes(item.name) : false}
                />
            );
        },
        [isAdult, tags_in, tags_not_in, tagBanEnabled],
    );

    if (!data) {
        return null;
    }

    return (
        <BottomSheetView style={{ flex: 1, marginTop: 20 }}>
            <BottomSheetView style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ paddingHorizontal: 10 }} variant="titleLarge">
                    Tags
                </Text>
                <View>
                    <IconButton icon={'filter-off-outline'} onPress={() => resetTag()} />
                    {tags_in?.length > 0 || tags_not_in?.length > 0 ? (
                        <Badge style={{ position: 'absolute', right: -8, top: 0 }}>
                            {(tags_in?.length ?? 0) + (tags_not_in?.length ?? 0)}
                        </Badge>
                    ) : null}
                </View>
                <TagBanSwitch
                    initialState={tagBanEnabled}
                    totalBanned={tagBlacklist?.length}
                    onPress={(value) => toggleGenreTag({ type: 'ENABLE_TAGBAN', payload: value })}
                />
            </BottomSheetView>

            <FlatList
                key={tagMode + '1'}
                style={{ flex: 1 }}
                scrollEnabled={tagMode === 'row'}
                data={data}
                renderItem={TagItem}
                numColumns={tagMode === 'list' ? 3 : null}
                keyExtractor={(item, index) => item.id.toString() + index.toString()}
                horizontal={tagMode === 'row'}
                nestedScrollEnabled
                columnWrapperStyle={tagMode === 'list' && [{ flexWrap: 'wrap' }]}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 10,
                    paddingTop: 0,
                    paddingVertical: 20,
                }}
            />
            {/* {tagMode === 'row' ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {data.map((item, idx) => (
                        <TagItem key={idx} item={item} />
                    ))}
                </ScrollView>
            ) : (
                data.map((item, idx) => <TagItem key={idx} item={item} />)
            )} */}
        </BottomSheetView>
    );
};

const GenreSelection = ({
    data,
    genre_in,
    genre_not_in,
    isAdult,
    toggleGenreTag,
}: GenreSelectionProps) => {
    const { defaultGenreLayout } = useAppSelector((state) => state.persistedSettings);
    const [genreMode, setGenreMode] = useState(defaultGenreLayout);
    const settingsDispatch = useAppDispatch();

    const changeLayout = useCallback(() => {
        setGenreMode((prev) => (prev === 'list' ? 'row' : 'list'));
        settingsDispatch(
            setSettings({
                entryType: 'defaultGenreLayout',
                value: genreMode === 'list' ? 'row' : 'list',
            }),
        );
    }, []);

    const getGenreState = useCallback(
        (name: string) => {
            if (genre_in?.includes(name)) {
                return 'in';
            } else if (genre_not_in?.includes(name)) {
                return 'not_in';
            } else {
                return undefined;
            }
        },
        [genre_in, genre_not_in],
    );

    const resetGenre = useCallback(() => {
        toggleGenreTag({ type: 'RESET_TAGS_GENRES', payload: 'genre' });
    }, []);

    if (!data) {
        return null;
    }

    return (
        <BottomSheetView>
            <MotiView style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ paddingHorizontal: 10 }} variant="titleLarge">
                    Genres
                </Text>
                <IconButton
                    icon={
                        genreMode === 'list' ? 'arrow-expand-vertical' : 'arrow-expand-horizontal'
                    }
                    style={{ marginLeft: 10 }}
                    onPress={() => changeLayout()}
                />
                <View>
                    <IconButton icon={'filter-off-outline'} onPress={() => resetGenre()} />
                    {genre_in?.length > 0 || genre_not_in?.length > 0 ? (
                        <Badge style={{ position: 'absolute', right: -8, top: 0 }}>
                            {(genre_in?.length ?? 0) + (genre_not_in?.length ?? 0)}
                        </Badge>
                    ) : null}
                </View>
            </MotiView>
            <FlatList
                key={genreMode}
                scrollEnabled={genreMode === 'row'}
                data={data}
                renderItem={({ item }) =>
                    !isAdult && item === 'Hentai' ? null : (
                        <TagMem
                            name={item}
                            state={getGenreState(item)}
                            onToggle={(mode: 'in' | 'not_in' | 'remove') =>
                                toggleGenreTag({
                                    type: mode === 'remove' ? 'REMOVE_GENRE' : 'TOGGLE_TAG',
                                    key: mode === 'in' ? 'genre_in' : 'genre_not_in',
                                    payload: item,
                                })
                            }
                        />
                    )
                }
                numColumns={genreMode === 'list' ? 3 : null}
                keyExtractor={(item, index) => item}
                horizontal={genreMode === 'row'}
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ padding: 10, paddingTop: 0, paddingVertical: 20 }}
            />
        </BottomSheetView>
    );
};

export const TagSelectionMem = memo(TagSelection);
export const GenreSelectionMem = memo(GenreSelection);
