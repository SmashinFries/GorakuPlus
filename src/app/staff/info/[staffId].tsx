import { Text as RNText, StyleSheet, View, useWindowDimensions } from 'react-native';
import {
    ActivityIndicator,
    IconButton,
    List,
    MD3DarkTheme,
    Text,
    useTheme,
} from 'react-native-paper';
import {
    StaffDetailsQuery,
    useStaffDetailsQuery,
} from '@/store/services/anilist/generated-anilist';
import { useCallback, useEffect, useState } from 'react';
import { MotiView } from 'moti';
import { Image } from 'expo-image';
import { Accordion, ExpandableDescription, TransYUpView } from '@/components/animations';
import { useAppSelector } from '@/store/hooks';
import RenderHTML from 'react-native-render-html';
import { FadeHeaderProvider } from '@/components/headers';
import { convertDate } from '@/utils';
import { openWebBrowser } from '@/utils/webBrowser';
import { useToggleFavMutation } from '@/store/services/anilist/enhanced';
import { FlashList } from '@shopify/flash-list';
import { StaffMediaCard } from '@/components/staff/media';
import { router, useLocalSearchParams } from 'expo-router';

const StafPage = () => {
    const { staffId } = useLocalSearchParams<{ staffId: string }>();
    const id = Number(staffId);
    const { width } = useWindowDimensions();
    const [charPage, setCharPage] = useState(1);
    const [smPage, setSmPage] = useState(1);

    const { userID } = useAppSelector((state) => state.persistedAniLogin);
    const { mediaLanguage } = useAppSelector((state) => state.persistedSettings);

    const { colors } = useTheme();
    const { data, isLoading, isError } = useStaffDetailsQuery(
        {
            id: id,
            char_page: charPage,
            char_perPage: 25,
            staff_media_page: smPage,
            staff_media_perPage: 25,
        },
        { skip: staffId === undefined },
    );
    const [toggleFav, toggleFavResults] = useToggleFavMutation();

    const [fav, setFav] = useState(data?.Staff?.isFavourite);

    const onToggleFavorite = useCallback(async () => {
        setFav((prev) => !prev);
        const results = await toggleFav({ staffId: id }).unwrap();
    }, [id]);

    useEffect(() => {
        setFav(data?.Staff?.isFavourite);
    }, [data?.Staff?.isFavourite]);

    const StaffMediaRenderItem = useCallback(
        ({ item }: { item: StaffDetailsQuery['Staff']['staffMedia']['edges'][0] }) => {
            return (
                <StaffMediaCard
                    item={item}
                    onNav={() => router.push(`/${item.node?.type}/${item.node?.id}`)}
                />
            );
        },
        [],
    );

    const renderersProps = {
        a: {
            onPress(event, url, htmlAttribs, target) {
                openWebBrowser(url);
            },
        },
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <FadeHeaderProvider
            title={
                mediaLanguage === 'english' || mediaLanguage === 'romaji'
                    ? data?.Staff?.name?.full
                    : data?.Staff?.name?.native
            }
            loading={isLoading}
            shareLink={data?.Staff?.siteUrl}
            onEdit={() => openWebBrowser(`https://anilist.co/edit/staff/${id}`)}
            // favorite={data?.Staff?.isFavourite}
        >
            <TransYUpView style={{ paddingTop: 100 }}>
                <MotiView style={[styles.container]}>
                    <MotiView style={{ width: 200 }}>
                        <Image
                            source={{ uri: data?.Staff?.image?.large }}
                            style={styles.avatar}
                            contentFit="cover"
                        />

                        <MotiView style={[styles.avatarFavsContainer]}>
                            <RNText
                                style={{
                                    fontWeight: 'bold',
                                    color: MD3DarkTheme.colors.onBackground,
                                }}
                            >
                                {data?.Staff?.favourites} ❤
                            </RNText>
                        </MotiView>
                    </MotiView>
                    {userID && (
                        <IconButton
                            icon={fav ? 'heart' : 'heart-outline'}
                            iconColor={colors.primary}
                            style={{ width: styles.avatar.width }}
                            mode={'outlined'}
                            onPress={onToggleFavorite}
                        />
                    )}
                </MotiView>
                <Text style={[styles.staffName]} variant="titleLarge">
                    {mediaLanguage === 'native'
                        ? data?.Staff?.name?.native
                        : data?.Staff?.name?.full}
                </Text>
                <Text
                    variant="titleMedium"
                    style={[styles.staffAltName, { color: colors.onSurfaceVariant }]}
                >
                    {mediaLanguage === 'english' || mediaLanguage === 'romaji'
                        ? data?.Staff?.name?.native
                        : data?.Staff?.name?.full}
                </Text>
                <ExpandableDescription initialHeight={90}>
                    <RenderHTML
                        source={{ html: data?.Staff?.description }}
                        contentWidth={width}
                        baseStyle={{ color: colors.onBackground }}
                        renderersProps={renderersProps}
                    />
                </ExpandableDescription>
                <MotiView style={{ marginVertical: 20, marginTop: 30 }}>
                    <Accordion title="Information" initialExpand>
                        <List.Item
                            title="Language"
                            left={(props) => <List.Icon {...props} icon="translate" />}
                            right={(props) => <Text {...props}>{data?.Staff?.languageV2}</Text>}
                        />
                        <List.Item
                            title="Gender"
                            left={(props) => (
                                <List.Icon
                                    {...props}
                                    icon={
                                        data?.Staff?.gender === 'Female'
                                            ? 'gender-female'
                                            : 'gender-male'
                                    }
                                />
                            )}
                            right={(props) => (
                                <Text {...props}>{data?.Staff?.gender ?? 'N/A'}</Text>
                            )}
                        />
                        <List.Item
                            title="Age"
                            left={(props) => (
                                <List.Icon {...props} icon="clock-time-five-outline" />
                            )}
                            right={(props) => <Text {...props}>{data?.Staff?.age ?? 'N/A'}</Text>}
                        />
                        <List.Item
                            title="Birthday"
                            left={(props) => <List.Icon {...props} icon="cake-variant-outline" />}
                            right={(props) => (
                                <Text {...props}>
                                    {convertDate(data?.Staff?.dateOfBirth, true) ?? 'N/A'}
                                </Text>
                            )}
                        />
                        {data?.Staff?.dateOfDeath.month && (
                            <List.Item
                                title="Death"
                                left={(props) => (
                                    <List.Icon {...props} icon="skull-crossbones-outline" />
                                )}
                                right={(props) => (
                                    <Text {...props}>
                                        {convertDate(data?.Staff?.dateOfDeath, true) ?? 'N/A'}
                                    </Text>
                                )}
                            />
                        )}
                        <List.Item
                            title="Hometown"
                            left={(props) => <List.Icon {...props} icon="home-city-outline" />}
                            right={(props) => (
                                <Text
                                    numberOfLines={2}
                                    style={{ maxWidth: '50%', textAlign: 'right' }}
                                >
                                    {data?.Staff?.homeTown}
                                </Text>
                            )}
                        />
                        <List.Item
                            title="Occupations"
                            left={(props) => (
                                <List.Icon {...props} icon="office-building-outline" />
                            )}
                            right={(props) => (
                                <Text numberOfLines={2} {...props}>
                                    {data?.Staff?.primaryOccupations.join(', ') ?? 'N/A'}
                                </Text>
                            )}
                        />
                        <List.Item
                            title="Years Active"
                            left={(props) => <List.Icon {...props} icon="timer-outline" />}
                            right={(props) => (
                                <Text {...props}>
                                    {data?.Staff?.yearsActive.length > 1
                                        ? data?.Staff?.yearsActive.join(' - ')
                                        : data?.Staff?.yearsActive.length === 1
                                        ? `${data?.Staff?.yearsActive[0]} - Present`
                                        : 'N/A'}
                                </Text>
                            )}
                        />
                        <List.Item
                            title="Blood Type"
                            left={(props) => <List.Icon {...props} icon="blood-bag" />}
                            right={(props) => (
                                <Text {...props}>{data?.Staff?.bloodType ?? 'N/A'}</Text>
                            )}
                        />
                    </Accordion>
                    {data?.Staff?.staffMedia?.edges?.length > 0 && (
                        <Accordion title="Media">
                            <FlashList
                                data={data?.Staff?.staffMedia?.edges}
                                renderItem={StaffMediaRenderItem}
                                keyExtractor={(item, idx) => idx.toString()}
                                estimatedItemSize={250}
                                horizontal
                                removeClippedSubviews
                                contentContainerStyle={{ padding: 15 }}
                                showsHorizontalScrollIndicator={false}
                                onEndReached={() => {
                                    // data?.Staff?.staffMedia?.pageInfo?.hasNextPage &&
                                    //     console.log('Next Page!');
                                    data?.Staff?.staffMedia?.pageInfo?.hasNextPage &&
                                        setSmPage((prev) => prev + 1);
                                }}
                            />
                        </Accordion>
                    )}
                    {data?.Staff?.characters?.edges?.length > 0 && (
                        <Accordion title="Characters">
                            <Text style={{ textAlign: 'center', marginTop: 15 }}>
                                Characters coming soon!
                            </Text>
                            {/* <FlashList
                                data={data?.Staff?.staffMedia?.edges}
                                renderItem={StaffMediaRenderItem}
                                keyExtractor={(item, idx) => idx.toString()}
                                estimatedItemSize={250}
                                horizontal
                                removeClippedSubviews
                                contentContainerStyle={{ padding: 15 }}
                                showsHorizontalScrollIndicator={false}
                            /> */}
                        </Accordion>
                    )}
                    <View>{/* <CharacterPrevList data={data?.Staff?.characters} /> */}</View>
                </MotiView>
            </TransYUpView>
        </FadeHeaderProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 12,
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

export default StafPage;
