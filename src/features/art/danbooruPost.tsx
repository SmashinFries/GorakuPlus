import { Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useTheme, Text, IconButton, Button, ActivityIndicator } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DanbooruStackProps } from '../../navigation/types';
import {
    useGetArtistCommentaryQuery,
    useGetPostQuery,
} from '../../app/services/danbooru/danbooruApi';
import { useCallback, useEffect, useState } from 'react';
import { ListHeading } from '../../components/text';
import { TagSection } from './components/danTag';
import { FadeHeaderProvider } from '../../components/headers';
import { Accordian } from '../../components/animations';
import { ArtistBar } from './components/artist';
import { InteractionBar } from './components/interactions';
import { StatisticsBar } from './components/stats';
import { FileDetails } from './components/fileDetails';
import Animated from 'react-native-reanimated';
import { Commentary } from './components/commentary';
import { PostImage } from './components/image';
import { useNsfwBlur } from '../../hooks/useNSFWBlur';

export const DanbooruPost = ({
    navigation,
    route,
}: NativeStackScreenProps<DanbooruStackProps, 'danbooruDetail'>) => {
    const { id } = route.params;
    const { colors } = useTheme();
    const { width, height } = useWindowDimensions();
    const { data, isLoading, isFetching } = useGetPostQuery(id, { skip: !id });
    const commentary = useGetArtistCommentaryQuery({ 'search[post_id]': id }, { skip: !id });
    const [aspectRatio, setAspectRatio] = useState<number>(1);
    const [titleHeight, setTitleHeight] = useState<number>(0);

    const { blurAmount, toggleBlur } = useNsfwBlur(data?.rating);

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
                        blurAmount={blurAmount}
                    />
                )}
            >
                <Pressable
                    onPress={toggleBlur}
                    style={{
                        height: aspectRatio ? width / aspectRatio : 0,
                        width: width,
                    }}
                />
                <View
                    style={{
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
                    <Accordian title="File Details" initialExpand>
                        <FileDetails
                            size={data?.file_size}
                            format={data?.file_ext}
                            height={data?.image_height}
                            width={data?.image_width}
                            rating={data?.rating}
                        />
                    </Accordian>
                    <Accordian title="Tags">
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
                    </Accordian>
                </View>
            </FadeHeaderProvider>
        </View>
    );
};
