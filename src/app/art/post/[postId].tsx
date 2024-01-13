import { Pressable, View, useWindowDimensions } from 'react-native';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';
import {
    useGetArtistCommentaryQuery,
    useGetPostQuery,
} from '@/store/services/danbooru/danbooruApi';
import { useEffect, useState } from 'react';
import { TagSection } from '@/components/art/danTag';
import { FadeHeaderProvider } from '@/components/headers';
import { Accordion } from '@/components/animations';
import { ArtistBar } from '@/components/art/artist';
import { InteractionBar } from '@/components/art/interactions';
import { StatisticsBar } from '@/components/art/stats';
import { FileDetails } from '@/components/art/fileDetails';
import { Commentary } from '@/components/art/commentary';
import { PostImage } from '@/components/art/image';
import { useNsfwBlur } from '@/hooks/useNSFWBlur';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DanbooruPostPage = () => {
    const { postId } = useLocalSearchParams<{ postId: string }>();
    const id = parseInt(postId);
    const { colors } = useTheme();
    const { width, height } = useWindowDimensions();
    const { data, isLoading, isFetching } = useGetPostQuery(id, { skip: !id });
    const commentary = useGetArtistCommentaryQuery({ 'search[post_id]': id }, { skip: !id });
    const [aspectRatio, setAspectRatio] = useState<number>(1);
    const [titleHeight, setTitleHeight] = useState<number>(0);

    const { bottom } = useSafeAreaInsets();

    // const { blurAmount, toggleBlur } = useNsfwBlur(data?.rating);

    const getTitle = (titles: string) => {
        const splitTitles = titles?.split(' ');
        if (splitTitles?.length > 2) {
            return `${splitTitles[0].replaceAll('_', ' ')}, ${splitTitles[1].replaceAll(
                '_',
                ' ',
            )}, and ${splitTitles?.length - 2} more`;
        } else {
            return splitTitles?.join(', ')?.replaceAll('_', ' ');
        }
    };

    useEffect(() => {
        if (data?.image_height && data?.image_width) {
            setAspectRatio(data?.image_width / data?.image_height);
        }
    }, [data?.image_height]);

    if (isLoading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <View>
            {/* <PostImage aspectRatio={aspectRatio} img_url={data?.file_url} blurAmount={blurAmount} /> */}
            <FadeHeaderProvider
                animationRange={[width / aspectRatio, width / aspectRatio + titleHeight]}
                title={data?.tag_string_character?.split(' ')[0].replaceAll('_', ' ')}
                BgImage={({ style }) => (
                    <PostImage
                        aspectRatio={aspectRatio}
                        style={style}
                        img_url={data?.file_url}
                        blurAmount={0}
                    />
                )}
            >
                <Pressable
                    // onPress={toggleBlur}
                    style={{
                        height: aspectRatio ? width / aspectRatio : 0,
                        width: width,
                    }}
                />
                <View
                    style={{
                        paddingBottom: bottom,
                        backgroundColor: colors.background,
                    }}
                >
                    <View
                        onLayout={(e) => setTitleHeight(e.nativeEvent.layout.height)}
                        style={{ alignItems: 'center' }}
                    >
                        <View style={{ marginHorizontal: 5, alignItems: 'center' }}>
                            <Text variant="headlineSmall" style={{ textTransform: 'capitalize' }}>
                                {getTitle(data?.tag_string_character)}
                            </Text>
                            <Text variant="titleSmall" style={{ color: colors.onSurfaceVariant }}>
                                {getTitle(data?.tag_string_copyright)}
                            </Text>
                        </View>
                    </View>

                    <InteractionBar
                        url={data?.file_url}
                        name={data?.tag_string_character?.split(' ')[0] + `_${data?.id}`}
                        share_url={
                            data?.pixiv_id
                                ? `https://www.pixiv.net/en/artworks/${data?.pixiv_id}`
                                : `https://danbooru.donmai.us/posts/${data?.id}`
                        }
                    />
                    <StatisticsBar
                        favorites={data?.fav_count}
                        up_score={data?.up_score}
                        down_score={data?.down_score}
                    />
                    <ArtistBar
                        artist_name={data?.tag_string_artist?.split(' ')[0]}
                        pixiv_id={data?.pixiv_id}
                        source={data?.source}
                    />
                    {commentary?.data && <Commentary data={commentary?.data} />}
                    <Accordion title="File Details" initialExpand>
                        <FileDetails
                            size={data?.file_size}
                            format={data?.file_ext}
                            height={data?.image_height}
                            width={data?.image_width}
                            rating={data?.rating}
                        />
                    </Accordion>
                    <Accordion title="Tags">
                        <TagSection
                            title="Artist"
                            tags={data?.tag_string_artist}
                            color="red"
                            disableWiki
                        />
                        <TagSection
                            title="Copyright"
                            tags={data?.tag_string_copyright}
                            color="purple"
                        />
                        <TagSection
                            title="Character"
                            tags={data?.tag_string_character}
                            color="green"
                        />
                        <TagSection title="General" tags={data?.tag_string_general} color="blue" />
                        <TagSection title="Meta" tags={data?.tag_string_meta} color="orange" />
                    </Accordion>
                </View>
            </FadeHeaderProvider>
        </View>
    );
};

export default DanbooruPostPage;
