import { MediaCard } from '@/components/cards';
import { ListHeader } from '@/components/headers';
import { ListFilterSheet } from '@/components/list/filtersheet';
import { RenderTabBar } from '@/components/tab';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    MediaListSort,
    MediaListStatus,
    MediaType,
    UserListCollectionQuery,
    useUserListCollectionQuery,
} from '@/store/services/anilist/generated-anilist';
import { updateListFilter } from '@/store/slices/listSLice';
import { rgbToRgba, useColumns } from '@/utils';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { FlashList } from '@shopify/flash-list';
import { Stack, router } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import { ActivityIndicator, IconButton, Text, useTheme } from 'react-native-paper';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

type ListParams = {
    type: MediaType;
    updateTitle?: (dataLength: number) => void;
};

const ListScreen = ({ type, listName, updateTitle }: ListParams & { listName: MediaListStatus }) => {
    const { colors } = useTheme();
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const { data, isFetching, isError, error, refetch } = useUserListCollectionQuery({
        type: type,
        userId: userID,
        status: listName,
        sort: MediaListSort.UpdatedTimeDesc,
    });

    const { query } = useAppSelector((state) => state.listFilter);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const { columns, listKey } = useColumns(150);

    const scorebgColor = useMemo(
        () => rgbToRgba(colors.primaryContainer, 0.75),
        [colors.primaryContainer],
    );

    const refreshList = () => {
        setIsRefreshing(true);
        refetch().then(() => setIsRefreshing(false));
    };

    const RenderItem = useCallback(
        ({
            item,
        }: {
            item: UserListCollectionQuery['MediaListCollection']['lists'][0]['entries'][0];
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
                    />
                </View>
            );
        },
        [],
    );

    useEffect(() => {
        if (data) {
            updateTitle(data?.MediaListCollection?.lists[0]?.entries.length ?? 0)
        }
    },[data])

    return (
        <View style={{ flex: 1, height: '100%', width: '100%' }}>
            {!isFetching ? (
                <FlashList
                    key={3}
                    data={data?.MediaListCollection?.lists[0]?.entries.filter(
                        (item) =>
                            item.media.title.romaji
                                ?.toLowerCase()
                                ?.includes(query?.toLowerCase()) ||
                            item.media.title.english
                                ?.toLowerCase()
                                ?.includes(query?.toLowerCase()) ||
                            item.media.title.native?.includes(query) ||
                            item.media.synonyms?.some((value, index) =>
                                value.toLowerCase()?.includes(query?.toLowerCase()),
                            ),
                    )}
                    // drawDistance={height * 2}
                    renderItem={RenderItem}
                    keyExtractor={(item, idx) => item?.media?.id.toString() ?? idx.toString()}
                    estimatedItemSize={238}
                    numColumns={3}
                    onRefresh={refreshList}
                    refreshing={isRefreshing}
                    // terrible performance without
                    drawDistance={0}
                    contentContainerStyle={{
                        padding: 10,
                    }}
                    centerContent
                    removeClippedSubviews
                />
            ) : (
                <ActivityIndicator />
            )}
        </View>
    );
};

const ListTabs = ({ type }: ListParams) => {
    const { listATabOrder, listMTabOrder } = useAppSelector((state) => state.persistedSettings);
    const { colors } = useTheme();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState(
        type === MediaType.Anime
            ? listATabOrder.map((category) => {
                  return { key: category, title: category };
              })
            : listMTabOrder.map((category) => {
                  return { key: category, title: category };
              }),
    );

    const updateTitle = (key:string, newTitle: string) => {
        setRoutes((prevRoutes) =>
            prevRoutes.map((route) => (route.key === key ? { ...route, title: newTitle } : route)),
        );
    };

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            tabStyle={{ paddingTop: 10 }}
            indicatorStyle={{ backgroundColor: colors.primary }}
            style={{ backgroundColor: colors.surface }}
            labelStyle={{ textTransform: 'capitalize', color: colors.onSurface }}
            scrollEnabled={true}
            android_ripple={{ color: colors.primary, borderless: true }}
        />
    );

    useEffect(() => {
        setRoutes(
            type === MediaType.Anime
                ? listATabOrder.map((category) => {
                      return { key: category, title: category };
                  })
                : listMTabOrder.map((category) => {
                      return { key: category, title: category };
                  }),
        );
    }, [listATabOrder, listMTabOrder]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={(props) => (
                <ListScreen type={type} listName={props.route.title as MediaListStatus} updateTitle={(dataLength) => updateTitle(props.route.key, `${props.route.title} (${dataLength})`)} />
            )}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={RenderTabBar}
            swipeEnabled={true}
        />
    );
};

const ListPage = () => {
    const layout = useWindowDimensions();
    const { colors } = useTheme();
    const { listATabOrder } = useAppSelector((state) => state.persistedSettings);
    const [index, setIndex] = useState(0);

    const filterSheetRef = useRef<BottomSheetModalMethods>(null);

    const [routes] = useState([
        { key: 'anime', title: 'Anime' },
        { key: 'manga', title: 'Manga' },
    ]);

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            tabStyle={{ paddingTop: 10 }}
            indicatorStyle={{ backgroundColor: colors.primary }}
            style={{ backgroundColor: colors.surface }}
            labelStyle={{ textTransform: 'capitalize', color: colors.onSurface }}
            scrollEnabled={false}
            android_ripple={{ color: colors.primary, borderless: true }}
        />
    );

    const renderScene = SceneMap({
        anime: () => <ListTabs type={MediaType.Anime} />,
        manga: () => <ListTabs type={MediaType.Manga} />,
    });

    // const renderScene = useCallback(
    //     ({ route }: { route: { key: string; title: string } }) => {
    //         switch (route.key) {
    //             case 'anime':
    //                 return <ListTabs type={MediaType.Anime} />;
    //             case 'manga':
    //                 return <ListTabs type={MediaType.Manga} />;
    //             default:
    //                 return null;
    //         }
    //     },
    //     [listATabOrder],
    // );

    const Tabs = useCallback(() => {
        return (
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => <RenderTabBar {...props} disableAutoWidth />}
                swipeEnabled={true}
            />
        );
    }, [colors]);

    return (
        <>
            <ListHeader openFilter={() => filterSheetRef.current?.present()} />
            <Tabs />
            {/* <ListFilterSheet ref={filterSheetRef} /> */}
        </>
    );
};

export default ListPage;
