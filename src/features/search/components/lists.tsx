import { FlashList } from '@shopify/flash-list';
import { Keyboard, View, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { rgbToRgba, useColumns } from '../../../utils';
import { useCallback, useMemo, useState } from 'react';
import {
    CharacterCard,
    MediaCard,
    MediaProgressBar,
    StaffCard,
    StudioCard,
    UserCard,
} from '../../../components/cards';
import { SearchFooter } from './footers';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useLazyExploreMediaQuery } from '../../../app/services/anilist/enhanced';
import { cleanFilter } from '../helpers/cleanFilter';
import {
    CharacterSearchQuery,
    ExploreMediaQuery,
    MediaType,
    StaffSearchQuery,
    StudioSearchQuery,
    UserSearchQuery,
} from '../../../app/services/anilist/generated-anilist';
import { updateFilterHistory } from '../historySlice';
import { EmptyLoadView } from './loading';
import { FilterState } from '../reducers';
import { openWebBrowser } from '../../../utils/webBrowser';

type AniMangListProps = {
    filter: FilterState;
    results: ExploreMediaQuery;
    searchStatus: any;
    sheetRef: any;
    isLoading: boolean;
    nextPage: (currentPage: number, filter: FilterState) => Promise<void>;
    onItemPress: (aniID: any, malID: any, type: any) => void;
};
export const AniMangList = (props: AniMangListProps) => {
    const { width, height } = useWindowDimensions();
    const { dark, colors } = useTheme();
    const { columns, listKey } = useColumns(150);

    const allowAdult = useAppSelector((state) => state.persistedSettings.showNSFW);

    const scorebgColor = useMemo(
        () => rgbToRgba(colors.primaryContainer, 0.75),
        [colors.primaryContainer],
    );

    const keyExtract = useCallback((item, index) => item.id.toString() + index.toString(), []);

    const RenderItem = useCallback(
        (itemProps) => (
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <MediaCard
                    coverImg={itemProps.item.coverImage.extraLarge}
                    titles={itemProps.item.title}
                    navigate={() =>
                        props.onItemPress(
                            itemProps.item.id,
                            itemProps.item.idMal,
                            itemProps.item.type,
                        )
                    }
                    scorebgColor={scorebgColor}
                    imgBgColor={itemProps.item.coverImage.color}
                    showHealthBar={
                        itemProps.item.averageScore || itemProps.item.meanScore ? true : false
                    }
                    bannerText={itemProps.item.nextAiringEpisode?.timeUntilAiring}
                    showBanner={itemProps.item.nextAiringEpisode ? true : false}
                    averageScore={itemProps.item.averageScore}
                    meanScore={itemProps.item.meanScore}
                />
                <MediaProgressBar
                    progress={itemProps.item.mediaListEntry?.progress}
                    mediaListEntry={itemProps.item.mediaListEntry}
                    mediaStatus={itemProps.item.status}
                    total={
                        itemProps.item.episodes ??
                        itemProps.item.chapters ??
                        itemProps.item.volumes ??
                        0
                    }
                    showListStatus={true}
                />
            </View>
        ),
        [],
    );

    const ListFooter = useCallback(() => {
        return (
            <SearchFooter
                hasMore={props.results?.Page?.pageInfo?.hasNextPage}
                nextPage={() =>
                    props.nextPage(props.results?.Page?.pageInfo?.currentPage, props.filter)
                }
                isUnitialized={props.searchStatus.isUninitialized}
            />
        );
    }, [
        props.results?.Page?.pageInfo?.hasNextPage,
        props.results?.Page?.pageInfo?.currentPage,
        allowAdult,
        props.searchStatus.isUninitialized,
        props.filter.filter,
    ]);

    // if (props.isLoading) return <EmptyLoadView isLoading={true} />;

    return (
        <View style={{ flex: 1, height: '100%', width }}>
            <FlashList
                key={listKey}
                data={props.results?.Page?.media}
                nestedScrollEnabled
                renderItem={RenderItem}
                keyExtractor={keyExtract}
                keyboardShouldPersistTaps="never"
                keyboardDismissMode="interactive"
                numColumns={columns}
                estimatedItemSize={240}
                removeClippedSubviews
                centerContent
                contentContainerStyle={{
                    padding: 10,
                    paddingLeft: props.results?.Page?.media ? 150 / columns / 3 : undefined,
                }}
                onEndReachedThreshold={0.4}
                onEndReached={() => {
                    props.results?.Page &&
                        props.results?.Page?.media?.length > 0 &&
                        props.nextPage(props.results?.Page?.pageInfo?.currentPage, props.filter);
                }}
                // ListFooterComponent={
                //     !props.isLoading && props.results?.Page?.pageInfo?.hasNextPage && ListFooter
                // }
                // ListFooterComponentStyle={{ alignItems: 'center' }}
            />
        </View>
    );
};

type CharacterListProps = {
    results: CharacterSearchQuery;
    searchStatus: any;
    isLoading: boolean;
    onNavigate: (id: number) => void;
    nextPage?: () => Promise<void>;
};
export const CharacterList = (props: CharacterListProps) => {
    const { width, height } = useWindowDimensions();
    // const { dark, colors } = useTheme();
    const { columns, listKey } = useColumns(110);

    const keyExtract = useCallback(
        (item, index: number) => item.id.toString() + index.toString(),
        [],
    );

    const RenderItem = useCallback(
        ({ item }: { item: CharacterSearchQuery['Page']['characters'][0] }) => {
            return (
                <View style={{ alignItems: 'center', marginVertical: 15 }}>
                    <CharacterCard
                        onPress={() => props.onNavigate(item.id)}
                        imgUrl={item.image?.large}
                        name={item.name?.full}
                        nativeName={item.name?.native}
                        isFavourite={item.isFavourite}
                    />
                </View>
            );
        },
        [],
    );

    const ListFooter = useCallback(() => {
        return (
            <SearchFooter
                hasMore={props.results?.Page?.pageInfo?.hasNextPage}
                nextPage={props.nextPage}
                isUnitialized={props.searchStatus.isUninitialized}
            />
        );
    }, [
        props.results?.Page?.pageInfo?.hasNextPage,
        props.results?.Page?.pageInfo?.currentPage,
        props.searchStatus.isUninitialized,
    ]);

    if (props.isLoading) return <EmptyLoadView isLoading={true} />;

    return (
        <View style={{ flex: 1, height: '100%', width }}>
            <FlashList
                key={listKey}
                data={props.results?.Page?.characters}
                nestedScrollEnabled
                renderItem={RenderItem}
                keyExtractor={keyExtract}
                numColumns={columns}
                estimatedItemSize={240}
                removeClippedSubviews
                centerContent
                contentContainerStyle={{
                    padding: 10,
                    paddingLeft: props.results?.Page?.characters ? 110 / columns / 3 : undefined,
                }}
                ListFooterComponent={
                    !props.isLoading && props.results?.Page?.pageInfo?.hasNextPage && ListFooter
                }
                ListFooterComponentStyle={{ alignItems: 'center' }}
            />
        </View>
    );
};

type StaffListProps = {
    results: StaffSearchQuery;
    searchStatus: any;
    isLoading: boolean;
    onNavigate: (id: number) => void;
    nextPage?: () => Promise<void>;
};
export const StaffList = (props: StaffListProps) => {
    const { width, height } = useWindowDimensions();
    // const { dark, colors } = useTheme();
    const { columns, listKey } = useColumns(110);

    const keyExtract = useCallback(
        (item, index: number) => item.id.toString() + index.toString(),
        [],
    );

    const RenderItem = useCallback(
        ({ item }: { item: CharacterSearchQuery['Page']['characters'][0] }) => {
            return (
                <View style={{ alignItems: 'center', marginVertical: 15 }}>
                    <StaffCard
                        onPress={() => props.onNavigate(item.id)}
                        imgUrl={item.image?.large}
                        name={item.name?.full}
                        nativeName={item.name?.native}
                        isFavourite={item.isFavourite}
                    />
                </View>
            );
        },
        [],
    );

    const ListFooter = useCallback(() => {
        return (
            <SearchFooter
                hasMore={props.results?.Page?.pageInfo?.hasNextPage}
                nextPage={props.nextPage}
                isUnitialized={props.searchStatus.isUninitialized}
            />
        );
    }, [
        props.results?.Page?.pageInfo?.hasNextPage,
        props.results?.Page?.pageInfo?.currentPage,
        props.searchStatus.isUninitialized,
    ]);

    if (props.isLoading) return <EmptyLoadView isLoading={true} />;

    return (
        <View style={{ flex: 1, height: '100%', width }}>
            <FlashList
                key={listKey}
                data={props.results?.Page?.staff}
                nestedScrollEnabled
                renderItem={RenderItem}
                keyExtractor={keyExtract}
                numColumns={columns}
                estimatedItemSize={240}
                removeClippedSubviews
                centerContent
                contentContainerStyle={{
                    padding: 10,
                    paddingLeft: props.results?.Page?.staff ? 110 / columns / 3 : undefined,
                }}
                ListFooterComponent={
                    !props.isLoading && props.results?.Page?.pageInfo?.hasNextPage && ListFooter
                }
                ListFooterComponentStyle={{ alignItems: 'center' }}
            />
        </View>
    );
};

type StudioListProps = {
    results: StudioSearchQuery;
    searchStatus: any;
    isLoading: boolean;
    onNavigate: (id: number) => void;
    nextPage?: () => Promise<void>;
};
export const StudioList = (props: StudioListProps) => {
    const { width, height } = useWindowDimensions();
    // const { dark, colors } = useTheme();
    const { columns, listKey } = useColumns(110);

    const keyExtract = useCallback(
        (item, index: number) => item.id.toString() + index.toString(),
        [],
    );

    const RenderItem = useCallback(
        ({ item }: { item: StudioSearchQuery['Page']['studios'][0] }) => {
            return (
                <View style={{ flex: 1, width: '100%', alignItems: 'center', marginVertical: 15 }}>
                    <StudioCard
                        // onPress={() => props.onNavigate(item.id)}
                        onPress={() => openWebBrowser(item.siteUrl)}
                        name={item.name}
                        isFavourite={item.isFavourite}
                    />
                </View>
            );
        },
        [],
    );

    const ListFooter = useCallback(() => {
        return (
            <SearchFooter
                hasMore={props.results?.Page?.pageInfo?.hasNextPage}
                nextPage={props.nextPage}
                isUnitialized={props.searchStatus.isUninitialized}
            />
        );
    }, [
        props.results?.Page?.pageInfo?.hasNextPage,
        props.results?.Page?.pageInfo?.currentPage,
        props.searchStatus.isUninitialized,
    ]);

    if (props.isLoading) return <EmptyLoadView isLoading={true} />;

    return (
        <View style={{ flex: 1, height: '100%', width }}>
            <FlashList
                key={1}
                data={props.results?.Page?.studios}
                nestedScrollEnabled
                renderItem={RenderItem}
                keyExtractor={keyExtract}
                numColumns={1}
                estimatedItemSize={240}
                removeClippedSubviews
                centerContent
                contentContainerStyle={{
                    padding: 10,
                    paddingLeft: props.results?.Page?.studios ? 110 / columns / 3 : undefined,
                }}
                ListFooterComponent={
                    !props.isLoading && props.results?.Page?.pageInfo?.hasNextPage && ListFooter
                }
                ListFooterComponentStyle={{ alignItems: 'center' }}
            />
        </View>
    );
};
