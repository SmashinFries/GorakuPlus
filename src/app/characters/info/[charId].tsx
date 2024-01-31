import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text as RNText, StyleSheet, Pressable } from 'react-native';
import {
    ActivityIndicator,
    Button,
    IconButton,
    List,
    Portal,
    Text,
    useTheme,
} from 'react-native-paper';
import { FadeHeaderProvider } from '@/components/headers';
import { Accordion, ExpandableDescription, TransYUpViewMem } from '@/components/animations';
import { openWebBrowser } from '@/utils/webBrowser';
import RenderHTML from 'react-native-render-html';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useWindowDimensions } from 'react-native';
import { convertDate } from '@/utils';
import { CharacterDetailsQuery, MediaFormat } from '@/store/services/anilist/generated-anilist';
import { HTMLText, ListHeading } from '@/components/text';
import { DanbooruImageCard, MediaCard, StaffCard } from '@/components/cards';
import { FlashList } from '@shopify/flash-list';
import { DanPost } from '@/store/services/danbooru/types';
import { useCharDetail } from '@/hooks/characters/useCharDetails';
import { CharacterLoading } from '@/components/characters/loading';
import { CharacterFront } from '@/components/characters/front';
import { SaveImageDialog } from '@/utils/images';
import { updateCharArtDB } from '@/store/slices/charArtSlice';
import { TagSearchDialog } from '@/components/characters/dialogs';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';

const CharacterScreen = () => {
    const { charId } = useLocalSearchParams<{ charId: string }>();
    const { charData, art, tagOptions, onTagChange, currentArtTag, toggleFav, isLoading } =
        useCharDetail(Number(charId));
    const dispatch = useAppDispatch();
    const { width } = useWindowDimensions();

    const [selectedImg, setSelectedImg] = useState('');
    const [uniqueVAs, setUniqueVAs] = useState<
        CharacterDetailsQuery['Character']['media']['edges'][0]['voiceActorRoles']
    >([]);
    const [showTagSearch, toggleShowTagSearch] = useReducer((open) => !open, false);
    const [expanded, setExpanded] = useState(false);
    const [fav, setFav] = useState(charData.data?.Character?.isFavourite);

    const { mediaLanguage } = useAppSelector((state) => state.persistedSettings);
    const { userID } = useAppSelector((state) => state.persistedAniLogin);

    const primaryName =
        mediaLanguage === 'native'
            ? charData.data?.Character?.name?.native
            : charData.data?.Character?.name?.full;
    const secondaryName =
        mediaLanguage === 'english' || mediaLanguage === 'romaji'
            ? charData.data?.Character?.name?.native
            : charData.data?.Character?.name?.full;

    const { colors } = useTheme();

    const keyExtractor = useCallback((item, index: number) => index.toString(), []);

    const MediaRenderItem = useCallback(
        ({ item }: { item: CharacterDetailsQuery['Character']['media']['edges'][0] }) => {
            return (
                <View>
                    <MediaCard
                        titles={item.node.title}
                        coverImg={item.node.coverImage.extraLarge}
                        averageScore={item.node.averageScore}
                        meanScore={item.node.meanScore}
                        imgBgColor={item.node.coverImage.color}
                        navigate={() => router.push(`/(media)/${item.node.type}/${item.node.id}`)}
                        scoreDistributions={item.node.stats?.scoreDistribution}
                    />
                    <Text
                        variant="labelLarge"
                        style={{ textTransform: 'capitalize', textAlign: 'center' }}
                    >
                        {item.node?.format === MediaFormat.Tv
                            ? 'Anime'
                            : item.node?.isLicensed
                            ? item.node?.format
                            : 'Doujin'}
                    </Text>
                    <Text
                        variant="labelMedium"
                        style={{
                            textTransform: 'capitalize',
                            textAlign: 'center',
                            color: colors.onSurfaceVariant,
                        }}
                    >
                        {item.node?.status.replaceAll('_', ' ')}
                    </Text>
                    {item.node?.isFavourite && (
                        <IconButton
                            icon="heart"
                            iconColor="red"
                            mode="contained"
                            size={18}
                            style={{ position: 'absolute', top: -15, left: -5 }}
                        />
                    )}
                </View>
            );
        },
        [],
    );

    const VARenderItem = useCallback(
        ({
            item,
        }: {
            item: CharacterDetailsQuery['Character']['media']['edges'][0]['voiceActorRoles'][0];
        }) => {
            return (
                <StaffCard
                    imgUrl={item.voiceActor?.image?.large}
                    name={item.voiceActor?.name?.full}
                    nativeName={item.voiceActor?.name?.native}
                    role={item.voiceActor?.language ?? ''}
                    onPress={() => router.push(`/staff/info/${item.voiceActor?.id}`)}
                    isFavourite={false}
                />
            );
        },
        [],
    );

    const ArtRenderItem = useCallback(({ item }: { item: DanPost }) => {
        return (
            <View style={{ margin: 8 }}>
                <DanbooruImageCard
                    item={item}
                    disableAR
                    onNavigate={() =>
                        // @ts-ignore
                        // navigation.navigate('danbooruStack', {
                        //     screen: 'danbooruDetail',
                        //     params: { id: item.id },
                        // })
                        router.push(`/art/post/${item.id}`)
                    }
                />
            </View>
        );
    }, []);

    const EmptyArt = useCallback(() => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={toggleShowTagSearch}>No Art Found. Try manually searching?</Button>
            </View>
        );
    }, []);

    const onToggleFavorite = () => {
        toggleFav({ characterId: parseInt(charId) });
    };

    useEffect(() => {
        setFav(charData.data?.Character?.isFavourite);
    }, [charData.data?.Character?.isFavourite]);

    useEffect(() => {
        if (charData.data?.Character?.media?.edges && uniqueVAs.length === 0) {
            const va: CharacterDetailsQuery['Character']['media']['edges'][0]['voiceActorRoles'] =
                [];
            for (const media of charData.data?.Character?.media?.edges) {
                if (media.voiceActorRoles.length > 0) {
                    for (const role of media.voiceActorRoles) {
                        va.push(role);
                    }
                }
            }

            const unique = [
                ...va
                    .reduce((uniq, curr) => {
                        if (!uniq.has(curr['voiceActor']['id'])) {
                            uniq.set(curr['voiceActor']['id'], curr);
                        }
                        return uniq;
                    }, new Map())
                    .values(),
            ];

            setUniqueVAs(unique);
        }
    }, [charData.data]);

    return (
        <View>
            {isLoading && (
                <CharacterLoading
                    key="loading"
                    aniLoading={charData?.isFetching}
                    aniError={charData?.error}
                    artLoading={art?.isFetching}
                    artError={art?.error}
                />
            )}
            {!isLoading && (
                <Animated.View entering={FadeIn.duration(500).easing(Easing.ease)}>
                    <FadeHeaderProvider
                        title={primaryName}
                        loading={charData.isLoading}
                        shareLink={charData.data?.Character?.siteUrl}
                        onEdit={() => openWebBrowser(`https://anilist.co/edit/character/${charId}`)}
                    >
                        <View style={[styles.bodyContainer, { backgroundColor: 'transparent' }]}>
                            <TransYUpViewMem animation={true} delay={550}>
                                <CharacterFront
                                    id={Number(charId)}
                                    favorites={charData?.data?.Character?.favourites}
                                    image_url={charData?.data?.Character?.image?.large}
                                    primaryName={primaryName}
                                    secondaryName={secondaryName}
                                    alternativeNames={charData?.data?.Character?.name?.alternative}
                                    isFavorite={charData?.data?.Character?.isFavourite}
                                    onToggleFavorite={onToggleFavorite}
                                    userID={userID}
                                />
                                {/* Description */}
                                {charData?.data?.Character?.description ? (
                                    <ExpandableDescription initialHeight={90}>
                                        <HTMLText html={charData?.data?.Character?.description} />
                                    </ExpandableDescription>
                                ) : null}
                                {/* Info */}
                                <View
                                    style={{
                                        marginVertical: 20,
                                        marginTop: 30,
                                        overflow: 'visible',
                                    }}
                                >
                                    <Accordion title="Information" initialExpand>
                                        <List.Item
                                            title="Gender"
                                            left={(props) => (
                                                <List.Icon
                                                    {...props}
                                                    icon={
                                                        charData?.data?.Character?.gender ===
                                                        'Female'
                                                            ? 'gender-female'
                                                            : charData?.data?.Character?.gender ===
                                                              'Male'
                                                            ? 'gender-male'
                                                            : 'gender-transgender'
                                                    }
                                                />
                                            )}
                                            right={(props) => (
                                                <Text {...props}>
                                                    {charData?.data?.Character?.gender ?? 'N/A'}
                                                </Text>
                                            )}
                                        />
                                        <List.Item
                                            title="Age"
                                            left={(props) => (
                                                <List.Icon
                                                    {...props}
                                                    icon="clock-time-five-outline"
                                                />
                                            )}
                                            right={(props) => (
                                                <Text {...props}>
                                                    {charData?.data?.Character?.age ?? 'N/A'}
                                                </Text>
                                            )}
                                        />
                                        <List.Item
                                            title="Birthday"
                                            left={(props) => (
                                                <List.Icon {...props} icon="cake-variant-outline" />
                                            )}
                                            right={(props) => (
                                                <Text {...props}>
                                                    {convertDate(
                                                        charData?.data?.Character?.dateOfBirth,
                                                        true,
                                                    ) ?? 'N/A'}
                                                </Text>
                                            )}
                                        />
                                        <List.Item
                                            title="Blood Type"
                                            left={(props) => (
                                                <List.Icon {...props} icon="blood-bag" />
                                            )}
                                            right={(props) => (
                                                <Text {...props}>
                                                    {charData?.data?.Character?.bloodType ?? 'N/A'}
                                                </Text>
                                            )}
                                        />
                                    </Accordion>
                                </View>
                                <ListHeading title="Media" />
                                <View style={{ overflow: 'visible' }}>
                                    <FlashList
                                        data={charData?.data?.Character?.media?.edges ?? []}
                                        renderItem={MediaRenderItem}
                                        keyExtractor={keyExtractor}
                                        estimatedItemSize={250}
                                        estimatedListSize={{ height: 320, width: width }}
                                        removeClippedSubviews
                                        horizontal
                                        contentContainerStyle={{ padding: 15 }}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                                {uniqueVAs.length > 0 && (
                                    <View style={{ overflow: 'visible' }}>
                                        <ListHeading title="Voice Actors" />
                                        <FlashList
                                            data={uniqueVAs ?? []}
                                            renderItem={VARenderItem}
                                            keyExtractor={keyExtractor}
                                            horizontal
                                            estimatedItemSize={130}
                                            estimatedListSize={{ height: 130, width: width }}
                                            contentContainerStyle={{ padding: 15 }}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </View>
                                )}

                                <View style={{ overflow: 'visible', marginBottom: 20 }}>
                                    <ListHeading
                                        title="Fan Art"
                                        subtitle={currentArtTag?.replaceAll('_', ' ') ?? undefined}
                                        subtitleStyle={{
                                            color: colors.primary,
                                            textDecorationLine: 'underline',
                                        }}
                                        subtitlePress={toggleShowTagSearch}
                                        icon="chevron-right"
                                        onIconPress={() =>
                                            // @ts-ignore
                                            router.push(`/art/${currentArtTag}`)
                                        }
                                    />
                                    {!art?.isFetching ? (
                                        <FlashList
                                            data={art?.data}
                                            ListEmptyComponent={EmptyArt}
                                            renderItem={ArtRenderItem}
                                            keyExtractor={keyExtractor}
                                            horizontal
                                            estimatedItemSize={213}
                                            contentContainerStyle={{
                                                padding: 15,
                                            }}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    ) : (
                                        <View
                                            style={{
                                                height: 300,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <ActivityIndicator size={'large'} />
                                        </View>
                                    )}
                                </View>
                            </TransYUpViewMem>
                        </View>
                    </FadeHeaderProvider>
                    <Portal>
                        <SaveImageDialog
                            img_url={selectedImg}
                            prefix={currentArtTag}
                            onDismiss={() => setSelectedImg('')}
                        />
                        <TagSearchDialog
                            visible={showTagSearch}
                            onDismiss={toggleShowTagSearch}
                            initialQuery={currentArtTag}
                            initialTags={tagOptions?.data}
                            tagsLoading={tagOptions?.isFetching}
                            onTagChange={onTagChange}
                            saveTag={(tag) =>
                                dispatch(
                                    updateCharArtDB({
                                        aniId: Number(charId),
                                        booruTag: tag,
                                    }),
                                )
                            }
                        />
                    </Portal>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 12,
    },
    bodyContainer: {
        // flex: 1,
        overflow: 'visible',
        paddingTop: 100,
    },
    button: {
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 1,
        overflow: 'hidden',
    },
    avatar: {
        height: 280,
        width: 200,
        borderRadius: 12,
    },
    avatarFavsContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        alignItems: 'center',
        padding: 10,
        paddingVertical: 5,
        borderRadius: 12,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
    },
    staffName: {
        marginTop: 10,
        marginBottom: 3,
        textAlign: 'center',
    },
    staffAltName: {
        textAlign: 'center',
    },
    desc: {
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    descBtn: {
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 1,
        overflow: 'hidden',
    },
    favs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});

export default CharacterScreen;
