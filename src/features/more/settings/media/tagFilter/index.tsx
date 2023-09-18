import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    Chip,
    IconButton,
    List,
    RadioButton,
    Searchbar,
    Switch,
    Text,
    useTheme,
} from 'react-native-paper';
import { FlatList, ScrollView, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BannedTagsStackProps, MediaSettingsStackProps } from '../../../../../navigation/types';
import {
    GenreTagCollectionQuery,
    useGenreTagCollectionQuery,
} from '../../../../../app/services/anilist/generated-anilist';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { ListSubheader } from '../../../../../components/titles';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { BanTagHeader } from '../../../../../components/headers';
import { setSettings } from '../../settingsSlice';

type TagChipProps = {
    name: string;
    onPress: (tag: string) => void;
    icon?: string;
};

const TagFilterScreen = ({ navigation }: NativeStackScreenProps<BannedTagsStackProps, 'btags'>) => {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const { globalTagExclude, showNSFW } = useAppSelector((state) => state.persistedSettings);
    const dispatch = useAppDispatch();

    const [tags, setTags] = useState<string[]>(globalTagExclude ?? []);
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<
        GenreTagCollectionQuery['MediaTagCollection']
    >([]);

    const { data, isFetching, isError } = useGenreTagCollectionQuery();

    const onNewTagPress = useCallback((tag: string) => setTags((prev) => [...prev, tag]), []);
    const onBanTagPress = useCallback(
        (tag: string) => setTags((prev) => prev.filter((t) => t !== tag)),
        [],
    );

    const onTagPress = useCallback(
        (tag: string) => {
            if (tags.includes(tag)) {
                onBanTagPress(tag);
            } else {
                onNewTagPress(tag);
            }
        },
        [tags],
    );

    const isSelected = useCallback((tag: string) => tags?.includes(tag), [tags]);

    const TagChip = useCallback(
        ({ name, onPress, icon }: TagChipProps) => (
            <Chip
                style={{ margin: 8, borderColor: isSelected(name) ? colors.primary : undefined }}
                icon={icon ?? undefined}
                mode="outlined"
                // selectedColor={isSelected(name) ? colors.primary : undefined}
                onPress={() => onPress(name)}
            >
                {name}
            </Chip>
        ),
        [tags, isSelected],
    );

    const RenderETagItem = useCallback(({ item }: { item: string }) => {
        return <TagChip name={item} onPress={() => onBanTagPress(item)} />;
    }, []);

    const RenderNTagItem = useCallback(
        ({ item }: { item: GenreTagCollectionQuery['MediaTagCollection'][0] }) => {
            return item.isAdult && !showNSFW ? null : (
                <TagChip
                    name={item.name}
                    icon={item.isAdult ? 'emoticon-devil' : null}
                    onPress={() => onTagPress(item.name)}
                />
            );
        },
        [tags],
    );

    const keyExtractor = useCallback((item, index: number) => index.toString(), []);

    const EmptyList = useCallback(() => {
        return <Text style={{ marginLeft: 8 }}>No tags added yet!</Text>;
    }, []);

    const onSave = () => {
        dispatch(setSettings({ entryType: 'globalTagExclude', value: tags }));
        navigation.goBack();
    };

    useEffect(() => {
        if (data && search.length > 0) {
            setSearchResults(
                data.MediaTagCollection?.filter((t) =>
                    t.name.toLowerCase().includes(search.toLowerCase()),
                ),
            );
        }
    }, [search, data]);

    useEffect(() => {
        navigation.setOptions({
            header: (props) => (
                <BanTagHeader {...props} iconColor={colors.primary} onSave={onSave} />
            ),
        });
    }, [onSave, globalTagExclude, tags]);

    return (
        <ScrollView nestedScrollEnabled style={{ flex: 1 }}>
            <List.Section>
                <ListSubheader title={'Banned Tags'} />
                <FlatList
                    horizontal
                    data={tags ?? []}
                    showsHorizontalScrollIndicator={false}
                    renderItem={RenderETagItem}
                    keyExtractor={keyExtractor}
                    ListEmptyComponent={EmptyList}
                    contentContainerStyle={{
                        padding: 10,
                        paddingTop: 0,
                        paddingVertical: 20,
                    }}
                />
            </List.Section>
            <List.Section>
                <ListSubheader title={'Available Tags'} />
                <Searchbar
                    style={{ margin: 10 }}
                    value={search}
                    onChangeText={(txt) => setSearch(txt)}
                />
                {!isFetching ? (
                    <FlatList
                        scrollEnabled={false}
                        data={search.length > 0 ? searchResults : data?.MediaTagCollection ?? []}
                        renderItem={RenderNTagItem}
                        numColumns={3}
                        keyExtractor={keyExtractor}
                        nestedScrollEnabled
                        columnWrapperStyle={[{ flex: 1, flexWrap: 'wrap' }]}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            padding: 10,
                            paddingTop: 0,
                            paddingVertical: 20,
                        }}
                    />
                ) : (
                    <ActivityIndicator />
                )}
            </List.Section>
        </ScrollView>
    );
};

export default TagFilterScreen;
