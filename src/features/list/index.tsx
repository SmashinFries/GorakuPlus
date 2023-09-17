import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MotiView } from 'moti';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ListStackProps, ListTabsProps, RootNavPaths } from '../../navigation/types';
import { TouchableOpacity, View, useWindowDimensions } from 'react-native';
import {
    Media,
    MediaListCollection,
    MediaListSort,
    MediaListStatus,
    MediaType,
    UserListCollectionQuery,
    useUserListCollectionQuery,
} from '../../app/services/anilist/generated-anilist';
import { useAppSelector } from '../../app/hooks';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { arrayRange, rgbToRgba, useColumns } from '../../utils';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { Image } from 'expo-image';
import { MediaItem, MediaItemMem } from '../explore/components/media';
import { MediaCard } from '../../components/cards';

const ListScreen = ({ navigation, route }: NativeStackScreenProps<ListTabsProps>) => {
    const { listName, mediaType } = route.params;
    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const { mediaLanguage, scoreColors, scoreGlow, scoreNumber, scoreHealthBar, defaultScore } =
        useAppSelector((state) => state.persistedSettings);

    const [isRefreshing, setIsRefreshing] = useState(false);

    const { columns, listKey } = useColumns(150);
    const { colors } = useTheme();
    // const isFetching = false;
    // const data = undefined;
    const { data, isFetching, isError, error, refetch } = useUserListCollectionQuery({
        type: mediaType,
        userId: userID,
        status: listName,
        sort: MediaListSort.UpdatedTimeDesc,
    });
    const { width, height } = useWindowDimensions();

    const scorebgColor = useMemo(
        () => rgbToRgba(colors.primaryContainer, 0.75),
        [colors.primaryContainer],
    );

    const navigate = useCallback(
        (aniID: number, malID: number, type: MediaType) => {
            navigation.navigate('media', {
                aniID,
                malID,
                type,
            });
        },
        [navigation],
    );

    const refreshList = () => {
        setIsRefreshing(true);
        refetch().then(() => setIsRefreshing(false));
    };

    const RenderItem = useCallback(({ item }: { item: any }) => {
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
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginVertical: 12,
                    // marginHorizontal: width / 150 / 3,
                    // flex: 1,
                }}
            >
                <MediaCard
                    coverImg={item.media.coverImage.extraLarge}
                    titles={item.media.title}
                    navigate={() => navigate(item.media.id, item.media.idMal, item.media.type)}
                    scoreColors={scoreColors}
                    scorebgColor={scorebgColor}
                    showHealthBar={item.media.averageScore || item.media.meanScore ? true : false}
                    averageScore={item.media.averageScore}
                    meanScore={item.media.meanScore}
                    // @ts-ignore timeUntilAiring is transformed to string via RTK Query
                    bannerText={item.media.nextAiringEpisode?.timeUntilAiring}
                    imgBgColor={item.media.coverImage.color}
                    showBanner={item.media.nextAiringEpisode ? true : false}
                    scoreNumber={true}
                />
            </View>
        );
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title:
                listName +
                (data?.MediaListCollection?.lists[0]?.entries
                    ? ` (${data?.MediaListCollection?.lists[0]?.entries.length})`
                    : ''),
        });
    }, [data?.MediaListCollection?.lists[0]?.entries]);

    // useEffect(() => {
    //     if (data?.MediaListCollection?.lists[0]?.entries) {
    //         Image.prefetch(
    //             data?.MediaListCollection?.lists[0]?.entries.map(
    //                 (item) => item?.media?.coverImage?.large,
    //             ),
    //         );
    //     }
    // }, [data?.MediaListCollection]);

    return (
        <View style={{ flex: 1, height: '100%', width: '100%' }}>
            {/* <Button onPress={() => console.log(MediaListStatus[listName])}>Print</Button> */}
            {!isFetching ? (
                <FlashList
                    key={listKey}
                    data={data?.MediaListCollection?.lists[0]?.entries}
                    // drawDistance={height * 2}
                    renderItem={RenderItem}
                    keyExtractor={(item, idx) => item?.media?.id.toString() ?? idx.toString()}
                    estimatedItemSize={238}
                    numColumns={columns}
                    onRefresh={refreshList}
                    refreshing={isRefreshing}
                    // terrible performance without
                    drawDistance={0}
                    contentContainerStyle={{
                        padding: 10,
                        paddingLeft: 150 / columns / 3,
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

export default ListScreen;
