import { MediaCard, MediaProgressBar } from '@/components/cards';
import { ListHeader } from '@/components/headers';
import {
    ListFilterSheet,
    ListSortOptions,
    ListSortOptionsType,
} from '@/components/list/filtersheet';
import { RenderTabBar, TabBarWithChip } from '@/components/tab';
import { useList } from '@/hooks/list/useList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    MediaList,
    MediaListSort,
    MediaListStatus,
    MediaType,
    UserAnimeListCollectionQuery,
    UserMangaListCollectionQuery,
} from '@/store/services/anilist/generated-anilist';
import { updateListFilter } from '@/store/slices/listSlice';
import { rgbToRgba, useColumns } from '@/utils';
import { compareArrays } from '@/utils/compare';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { FlashList } from '@shopify/flash-list';
import { Stack, router } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import { ActivityIndicator, IconButton, Text, useTheme } from 'react-native-paper';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

// EntrySort.UPDATED => (a, b) {
//     final comparison = a.updatedAt!.compareTo(b.updatedAt!);
//     if (comparison != 0) return comparison;
//     return a.titles[0].toUpperCase().compareTo(b.titles[0].toUpperCase());
//   },

const sortLists = (
    data: UserAnimeListCollectionQuery['MediaListCollection']['lists'][0]['entries'],
    sort: ListSortOptionsType,
) => {
    if (!data) {
        return [];
    }
    const data_copy: UserAnimeListCollectionQuery['MediaListCollection']['lists'][0]['entries'] = [
        ...data,
    ];
    switch (sort) {
        case ListSortOptions.AddedTimeDesc:
            return data_copy.sort((a, b) => b.createdAt - a.createdAt);
        case ListSortOptions.AddedTime:
            return data_copy.sort((a, b) => a.createdAt - b.createdAt);

        case ListSortOptions.ProgressDesc:
            return data_copy.sort((a, b) => b.progress - a.progress);
        case ListSortOptions.Progress:
            return data_copy.sort((a, b) => a.progress - b.progress);

        case ListSortOptions.UpdatedTimeDesc:
            return data_copy.sort((a, b) =>
                b.updatedAt - a.updatedAt === 0
                    ? a.media.title.romaji.toUpperCase() < b.media.title.romaji.toUpperCase()
                        ? -1
                        : 1
                    : b.updatedAt - a.updatedAt,
            );
        case ListSortOptions.UpdatedTime:
            return data_copy.sort((a, b) =>
                a.updatedAt - b.updatedAt === 0
                    ? a.media.title.romaji.toUpperCase() < b.media.title.romaji.toUpperCase()
                        ? -1
                        : 1
                    : a.updatedAt - b.updatedAt,
            );

        case ListSortOptions.MediaTitleRomajiDesc:
            return data_copy.sort((a, b) =>
                a.media.title.romaji.toUpperCase() < b.media.title.romaji.toUpperCase() ? -1 : 1,
            );
        case ListSortOptions.MediaTitleRomaji:
            return data_copy.sort((a, b) =>
                a.media.title.romaji.toUpperCase() < b.media.title.romaji.toUpperCase() ? 1 : -1,
            );

        case ListSortOptions.MediaTitleEnglishDesc:
            return data_copy.sort((a, b) => {
                if (!a.media.title.english) {
                    return 1;
                }
                if (!b.media.title.english) {
                    return -1;
                }
                return a.media.title.english?.toUpperCase() < b.media.title.english?.toUpperCase()
                    ? -1
                    : 1;
            });
        case ListSortOptions.MediaTitleEnglish:
            return data_copy.sort((a, b) => {
                if (!a.media.title.english) {
                    return -1;
                }
                if (!b.media.title.english) {
                    return 1;
                }
                return a.media.title.english?.toUpperCase() < b.media.title.english?.toUpperCase()
                    ? -1
                    : 1;
            });

        case ListSortOptions.AverageScoreDesc:
            return data_copy.sort((a, b) => {
                if (!a.media.averageScore) {
                    return 1;
                }
                if (!b.media.averageScore) {
                    return -1;
                }
                if (a.media.averageScore === b.media.averageScore) {
                    return 0;
                }
                return b.media.meanScore - a.media.meanScore;
            });
        case ListSortOptions.AverageScore:
            return data_copy.sort((a, b) => {
                if (!a.media.averageScore) {
                    return -1;
                }
                if (!b.media.averageScore) {
                    return 1;
                }
                if (a.media.averageScore === b.media.averageScore) {
                    return 0;
                }
                return a.media.meanScore - b.media.meanScore;
            });

        case ListSortOptions.MeanScoreDesc:
            return data_copy.sort((a, b) => {
                if (!a.media.meanScore) {
                    return 1;
                }
                if (!b.media.meanScore) {
                    return -1;
                }
                if (a.media.meanScore === b.media.meanScore) {
                    return 0;
                }
                return b.media.meanScore - a.media.meanScore;
            });
        case ListSortOptions.MeanScore:
            return data_copy.sort((a, b) => {
                if (!a.media.meanScore) {
                    return -1;
                }
                if (!b.media.meanScore) {
                    return 1;
                }
                if (a.media.meanScore === b.media.meanScore) {
                    return 0;
                }
                return a.media.meanScore - b.media.meanScore;
            });
        // case MediaListSort.StartedOnDesc:
        //     return data_copy.sort((a, b) => () - a.startedAt);
    }
};

type ListParams = {
    data:
        | UserAnimeListCollectionQuery['MediaListCollection']['lists'][0]
        | UserMangaListCollectionQuery['MediaListCollection']['lists'][0];
    updateTitle?: (dataLength: number) => void;
    type?: MediaType;
};

const ListScreen = ({ data, updateTitle }: ListParams) => {
    const [entries, setEntries] = useState(data?.entries);
    const { colors } = useTheme();
    const { query } = useAppSelector((state) => state.listFilter);
    const { sort } = useAppSelector((state) => state.listFilter);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const { columns, listKey } = useColumns(150);

    const scorebgColor = useMemo(
        () => rgbToRgba(colors.primaryContainer, 0.75),
        [colors.primaryContainer],
    );

    const refreshList = () => {
        setIsRefreshing(true);
        // refetch().then(() => setIsRefreshing(false));
    };

    const sortedItems = useMemo(() => {
        return sortLists(entries, sort);
    }, [sort]);

    const filterList = (search: string) => {
        if (search.length > 0) {
            return sortedItems.filter(
                (item) =>
                    item.media.title.romaji?.toLowerCase()?.includes(search?.toLowerCase()) ||
                    item.media.title.english?.toLowerCase()?.includes(search?.toLowerCase()) ||
                    item.media.title.native?.includes(search) ||
                    item.media.synonyms?.some((value, index) =>
                        value.toLowerCase()?.includes(search?.toLowerCase()),
                    ),
            );
        } else {
            return sortedItems;
        }
    };

    const filteredItems = useMemo(() => {
        return filterList(query);
    }, [query, sort]);

    const RenderItem = useCallback(
        ({
            item,
        }: {
            item:
                | UserAnimeListCollectionQuery['MediaListCollection']['lists'][0]['entries'][0]
                | UserMangaListCollectionQuery['MediaListCollection']['lists'][0]['entries'][0];
        }) => {
            return (
                // <View style={{ width: '100%', alignItems: 'center', marginVertical: 12 }}>
                //     <MediaItemMem item={item.media} navigate={navigate} />
                // </View>
                // <TouchableOpacity
                //     onPress={() => navigate(item.media.id, item.media.idMal, item.media.type)}
                //     style={{
                //         flex: 1,
                //         alignItems: 'center',
                //         marginVertical: 12,
                //         marginHorizontal: width / 150 / 3,
                //     }}
                // >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginVertical: 10,
                        marginHorizontal: 5,
                    }}
                >
                    <MediaCard
                        coverImg={item.media.coverImage.extraLarge}
                        titles={item.media.title}
                        navigate={() =>
                            router.push(`/${item.media.type.toLowerCase()}/${item.media.id}`)
                        }
                        scorebgColor={scorebgColor}
                        averageScore={item.media.averageScore}
                        meanScore={item.media.meanScore}
                        // @ts-ignore timeUntilAiring is transformed to string via RTK Query
                        bannerText={item.media.nextAiringEpisode?.timeUntilAiring}
                        imgBgColor={item.media.coverImage.color}
                        showBanner={item.media.nextAiringEpisode ? true : false}
                        scoreDistributions={item.media.stats?.scoreDistribution}
                        fitToParent
                        isFavorite={item.media.isFavourite}
                    />
                    {[
                        MediaListStatus.Current,
                        MediaListStatus.Repeating,
                        MediaListStatus.Paused,
                    ].includes(item.status) && (
                        <MediaProgressBar
                            progress={item.progress}
                            mediaListEntry={item as MediaList}
                            mediaStatus={item.media.status}
                            total={
                                item.media.episodes ??
                                item.media.chapters ??
                                item.media.volumes ??
                                0
                            }
                            showListStatus={false}
                        />
                    )}
                </View>
            );
        },
        [],
    );

    // useEffect(() => {
    //     setEntries((prev) => sortLists(prev, sort));
    // }, [sort]);

    useEffect(() => {
        if (query.length > 0) {
            updateTitle(filterList(query).length);
        } else {
            updateTitle(filteredItems.length);
        }
    }, [query]);

    return (
        <View style={{ flex: 1, height: '100%', width: '100%' }}>
            <FlashList
                key={3}
                // data={query.length > 0 ? filterList(query) : entries}
                data={filteredItems}
                // extraData={sort}
                // drawDistance={height * 2}
                renderItem={RenderItem}
                keyExtractor={(item, idx) => item?.media?.id.toString()}
                estimatedItemSize={238}
                numColumns={3}
                // onRefresh={refreshList}
                // refreshing={isRefreshing}
                // terrible performance without
                drawDistance={0}
                contentContainerStyle={{
                    padding: 10,
                }}
                // onViewableItemsChanged={(test) => test.}
                centerContent
                removeClippedSubviews
            />
        </View>
    );
};

const ListTabs = ({
    type,
    data,
    routes,
    loading,
}: {
    type: MediaType;
    loading: boolean;
    routes: { key: string; title: string }[];
    data:
        | UserAnimeListCollectionQuery['MediaListCollection']
        | UserMangaListCollectionQuery['MediaListCollection'];
}) => {
    const { animeTabOrder, mangaTabOrder } = useAppSelector((state) => state.listFilter);
    const { colors } = useTheme();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [tabRoutes, setTabRoutes] = useState<{ key: string; title: string }[]>(routes);

    // const reorderedRoutes = useMemo(() => {
    //     if (!routes) return [];
    //     const orderedRouteNames =
    //         type === MediaType.Anime
    //             ? animeTabOrder.map((routeName) => routeName)
    //             : mangaTabOrder.map((routeName) => routeName);
    //     const newRoutes =
    //         type === MediaType.Anime
    //             ? animeTabOrder.map((routeName) => ({ key: routeName, title: routeName }))
    //             : mangaTabOrder.map((routeName) => ({ key: routeName, title: routeName }));
    //     for (const route of routes) {
    //         if (!orderedRouteNames.includes(route.key)) {
    //             console.log('adding', route.key);
    //             newRoutes.push(route);
    //         }
    //     }
    //     console.log('newRoutes:', newRoutes);
    //     return newRoutes;
    // }, [animeTabOrder, mangaTabOrder, routes]);

    const updateTitleCount = (key: string, total: number) => {
        console.log('updating title:', key, total);
        setTabRoutes((prevRoutes) =>
            prevRoutes.map((route) =>
                route.key === key ? { ...route, title: `${route.title} (${total})` } : route,
            ),
        );
    };

    // const updateTabOrder = () => {
    //     setTabRoutes((prevRoutes) =>
    //         prevRoutes.map((route) => (route.key === key ? { ...route, title: `${route.title} (${total})` } : route)),
    //     );
    // };

    const renderScene = ({ route }) => {
        return (
            <ListScreen
                data={data?.lists.find((list) => list.name === route.key)}
                updateTitle={(dataLength: number) => updateTitleCount(route.key, dataLength)}
            />
        );
    };

    // useEffect(() => {
    //     if (data) {
    //         console.log('lists:', data?.MediaListCollection?.lists.length)
    //         setRoutes(data?.MediaListCollection?.lists.map((list) => ({ key: list.name, title: list.name })));
    //     }
    //     // setRoutes(
    //     //     type === MediaType.Anime
    //     //         ? listATabOrder.map((category) => {
    //     //               return { key: category, title: category };
    //     //           })
    //     //         : listMTabOrder.map((category) => {
    //     //               return { key: category, title: category };
    //     //           }),
    //     // );
    // }, [data, listATabOrder, listMTabOrder]);

    useEffect(() => {
        if (routes && data) {
            const orderedRouteNames =
                type === MediaType.Anime
                    ? animeTabOrder.map((routeName) => routeName)
                    : mangaTabOrder.map((routeName) => routeName);
            const newRoutes =
                type === MediaType.Anime
                    ? animeTabOrder.map((routeName) => ({
                          key: routeName,
                          title: `${routeName} (${data.lists.find((val) => val.name === routeName).entries.length})`,
                      }))
                    : mangaTabOrder.map((routeName) => ({
                          key: routeName,
                          title: `${routeName} (${data.lists.find((val) => val.name === routeName).entries.length})`,
                      }));
            for (const route of routes) {
                if (!orderedRouteNames.includes(route.key)) {
                    console.log('adding', route.key);
                    newRoutes.push(route);
                }
            }
            setTabRoutes((prevRoutes) =>
                compareArrays(
                    prevRoutes.map((route) => route.key),
                    orderedRouteNames,
                )
                    ? prevRoutes
                    : newRoutes,
            );
            console.log('set new route order!');
        }
    }, [data, animeTabOrder, mangaTabOrder]);

    return tabRoutes.length > 0 ? (
        <TabView
            navigationState={{ index, routes: tabRoutes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={TabBarWithChip}
            swipeEnabled={true}
        />
    ) : null;
};

const ListPage = () => {
    const layout = useWindowDimensions();
    const { colors } = useTheme();
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const [index, setIndex] = useState(0);

    const { animeList, mangaList, rootRoutes, animeRoutes, mangaRoutes, tags, genres, loading } =
        useList(userID);

    const filterSheetRef = useRef<BottomSheetModalMethods>(null);

    const [routes, setRoutes] = useState(rootRoutes);

    // const renderTabBar = (props) => (
    //     <TabBar
    //         {...props}
    //         tabStyle={{ paddingTop: 10 }}
    //         indicatorStyle={{ backgroundColor: colors.primary }}
    //         style={{ backgroundColor: colors.surface }}
    //         labelStyle={{ textTransform: 'capitalize', color: colors.onSurface }}
    //         scrollEnabled={false}
    //         android_ripple={{ color: colors.primary, borderless: true }}
    //     />
    // );

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'anime':
                return (
                    <ListTabs
                        type={MediaType.Anime}
                        data={animeList?.data?.MediaListCollection}
                        routes={animeRoutes}
                        loading={loading}
                    />
                );
            case 'manga':
                return (
                    <ListTabs
                        type={MediaType.Manga}
                        data={mangaList?.data?.MediaListCollection}
                        routes={mangaRoutes}
                        loading={loading}
                    />
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        console.log('root routes:', rootRoutes);
        if (rootRoutes.length > 0) {
            console.log('setting routes:', rootRoutes);
            setRoutes(rootRoutes);
        }
    }, [rootRoutes]);

    return (
        <>
            <ListHeader openFilter={() => filterSheetRef.current?.present()} />
            {!loading && routes.length > 0 ? (
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={TabBarWithChip}
                    swipeEnabled={false}
                />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator animating={true} size={'large'} color={colors.primary} />
                    <Text variant="labelMedium">Fetching lists</Text>
                </View>
            )}
            <ListFilterSheet
                ref={filterSheetRef}
                mediaType={index === 0 ? MediaType.Anime : MediaType.Manga}
                tags={tags}
                genres={genres}
                // sortList={sortLists}
            />
        </>
    );
};

export default ListPage;
