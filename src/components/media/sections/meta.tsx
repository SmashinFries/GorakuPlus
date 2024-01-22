import { Button, List, Text, useTheme } from 'react-native-paper';
import { AniMediaQuery, MediaFormat, MediaType } from '@/store/services/anilist/generated-anilist';
import { convertDate } from '@/utils';
import { View } from 'react-native';
import { RetrieveSeriesApiResponse } from '@/store/services/mangaupdates/mangaUpdatesApi';
import { useEffect, useMemo } from 'react';
import { Accordion, TransYUpViewMem } from '@/components/animations';
import { COUNTRY_OPTIONS } from '@/constants/anilist';
import { AnimeFull, MangaFull } from '@/store/services/mal/malApi';
import { router } from 'expo-router';

type MetaDataProps = {
    data: AniMediaQuery['Media'];
    malData?: AnimeFull | MangaFull;
};
export const MetaData = ({ data, malData }: MetaDataProps) => {
    const startDate = convertDate(data.startDate, true);
    const endDate = convertDate(data.endDate, true);

    // delay={960}

    return (
        <TransYUpViewMem style={{ marginVertical: 15 }} delay={945}>
            <Accordion title="Details">
                <List.Item
                    title={'Source'}
                    right={(props) => (
                        <Text style={{ textTransform: 'capitalize' }}>
                            {data.source?.replaceAll('_', ' ') ?? '??'}
                        </Text>
                    )}
                />
                <List.Item
                    title={
                        data.type === 'ANIME'
                            ? 'Episodes'
                            : data.format === MediaFormat.Novel
                            ? 'Volumes'
                            : 'Chapters'
                    }
                    right={(props) => (
                        <Text>{data.chapters ?? data.volumes ?? data.episodes ?? 'N/A'}</Text>
                    )}
                />
                <List.Item
                    title="Origin"
                    right={(props) => (
                        <Text>
                            {data.countryOfOrigin
                                ? COUNTRY_OPTIONS[data.countryOfOrigin]['name']
                                : 'N/A'}
                        </Text>
                    )}
                />
                {data.type === MediaType.Anime && (
                    <List.Item
                        title="Duration"
                        right={(props) => <Text>{data.duration ?? 'N/A'}</Text>}
                    />
                )}
                {data.season && (
                    <List.Item
                        title="Season"
                        right={(props) => (
                            <Text style={{ textTransform: 'capitalize' }}>
                                {`${data.season} ${data.seasonYear}` ?? 'N/A'}
                            </Text>
                        )}
                    />
                )}
                <List.Item
                    title="Start Date"
                    right={(props) => <Text>{startDate ?? 'N/A'}</Text>}
                />
                <List.Item title="End Date" right={(props) => <Text>{endDate ?? 'N/A'}</Text>} />
                <List.Item
                    title="Maturity Rating"
                    right={(props) => (
                        <Text selectable style={{ width: '50%', textAlign: 'right' }}>
                            {(malData as AnimeFull)?.rating ?? 'N/A'}
                        </Text>
                    )}
                />
                <List.Item
                    title="Favorites"
                    right={(props) => <Text>{data.favourites?.toLocaleString() ?? 'N/A'}</Text>}
                />
                <List.Item title="Format" right={(props) => <Text>{data.format ?? 'N/A'}</Text>} />
                <List.Item
                    title="Trending Rank"
                    right={(props) => <Text>{data.trending?.toLocaleString() ?? 'N/A'}</Text>}
                />
                <List.Item
                    title="Popularity Rank"
                    right={(props) => <Text>{data.popularity?.toLocaleString() ?? 'N/A'}</Text>}
                />
                <List.Item
                    title="HashTag"
                    right={(props) => <Text selectable>{data.hashtag ?? 'N/A'}</Text>}
                />
                <List.Item
                    title="Synonyms"
                    // description={
                    //     data.synonyms.length > 0
                    //         ? data.synonyms.map((name, idx) => name).join(', ')
                    //         : 'N/A'
                    // }
                    // descriptionNumberOfLines={10}
                    right={(props) => (
                        <Text selectable style={{ width: '50%', textAlign: 'right' }}>
                            {data.synonyms.length > 0
                                ? data.synonyms.map((name, idx) => name).join(', ')
                                : 'N/A'}
                        </Text>
                    )}
                />
                {data?.type !== MediaType.Manga && (
                    <List.Item
                        title="Studios"
                        right={(props) => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'flex-end',
                                    maxWidth: '65%',
                                }}
                            >
                                {data.studios.edges.map(
                                    (studio, idx) =>
                                        studio.isMain && (
                                            <Button
                                                key={idx}
                                                mode="elevated"
                                                icon={'star'}
                                                style={{ margin: 5 }}
                                                onPress={() =>
                                                    router.push(`/studio/${studio.node.id}`)
                                                }
                                            >
                                                {studio.node?.name}
                                            </Button>
                                        ),
                                )}
                            </View>
                        )}
                    />
                )}
                {data?.type !== MediaType.Manga && (
                    <List.Item
                        title="Producers"
                        right={(props) => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'flex-end',
                                    maxWidth: '65%',
                                }}
                            >
                                {data.studios.edges.map(
                                    (studio, idx) =>
                                        !studio.isMain && (
                                            <Button
                                                key={idx}
                                                mode="elevated"
                                                style={{ margin: 5 }}
                                                onPress={() =>
                                                    router.push(`/studio/${studio.node.id}`)
                                                }
                                            >
                                                {studio.node?.name}
                                            </Button>
                                        ),
                                )}
                            </View>
                        )}
                    />
                )}
            </Accordion>
        </TransYUpViewMem>
    );
};

export const MUData = ({
    data,
    openMuDialog,
}: {
    data: RetrieveSeriesApiResponse;
    openMuDialog: () => void;
}) => {
    const { colors } = useTheme();
    const isEnglishTrans = useMemo(
        () => data?.publishers?.some((pub) => pub.type === 'English') ?? false,
        [data?.publishers],
    );

    if (!data) return null;

    return (
        <View style={{ marginVertical: 15 }}>
            <Accordion containerKey={data?.series_id} title="Manga Updates">
                <List.Item
                    title="Title"
                    description="Wrong series?"
                    descriptionStyle={{ textDecorationLine: 'underline', color: colors.primary }}
                    right={(props) => (
                        <Text style={{ maxWidth: '50%' }}>{data?.title ?? 'N/A'}</Text>
                    )}
                    onPress={openMuDialog}
                />
                <List.Item
                    title="Licensed (English)"
                    right={(props) => (
                        <List.Icon {...props} icon={isEnglishTrans ? 'check' : 'close'} />
                    )}
                />
                <List.Item
                    title="Latest Chapter"
                    right={(props) => <Text selectable>{data?.latest_chapter ?? 'N/A'}</Text>}
                />
                <List.Item
                    title="Last Updated"
                    right={(props) => (
                        <Text selectable>{data?.last_updated.as_string ?? 'N/A'}</Text>
                    )}
                />
                {data?.anime?.start ? (
                    <List.Item
                        title="Anime Start"
                        right={(props) => (
                            <Text style={{ width: '50%', textAlign: 'right' }} selectable>
                                {data?.anime?.start ?? 'N/A'}
                            </Text>
                        )}
                    />
                ) : null}
                {data?.anime?.end ? (
                    <List.Item
                        title="Anime End"
                        right={(props) => (
                            <Text style={{ width: '50%', textAlign: 'right' }} selectable>
                                {data?.anime?.end ?? 'N/A'}
                            </Text>
                        )}
                    />
                ) : null}
            </Accordion>
        </View>
    );
};
