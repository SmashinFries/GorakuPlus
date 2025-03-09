import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { TagSection } from '@/components/art/danTag';
import { ArtHeaderProvider } from '@/components/headers';
import { Accordion } from '@/components/animations';
import { ArtistBar } from '@/components/art/artist';
import { InteractionBar } from '@/components/art/interactions';
import { StatisticsBar } from '@/components/art/stats';
import { FileDetails } from '@/components/art/fileDetails';
import { Commentary } from '@/components/art/commentary';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GorakuActivityIndicator } from '@/components/loading';
import { useArtistCommentaryQuery, usePostQuery } from '@/api/danbooru/danbooru';
import { useAppTheme } from '@/store/theme/themes';

const DanbooruPostPage = () => {
	const { postId } = useLocalSearchParams<{ postId: string }>();
	const id = parseInt(postId);
	const { colors } = useAppTheme();
	const { data, isLoading } = usePostQuery(id);
	const commentary = useArtistCommentaryQuery({ 'search[post_id]': id });
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
				<GorakuActivityIndicator />
			</View>
		);
	}

	return (
		<View>
			{/* <PostImage aspectRatio={aspectRatio} img_url={data?.file_url} blurAmount={blurAmount} /> */}
			<ArtHeaderProvider
				aspectRatio={aspectRatio}
				imageUrl={data?.file_url}
				titleHeight={titleHeight}
				title={data?.tag_string_character?.split(' ')[0].replaceAll('_', ' ')}
			>
				<View
					style={{
						paddingBottom: bottom + 100,
						backgroundColor: colors.background,
					}}
				>
					<View
						onLayout={(e) => setTitleHeight(e.nativeEvent.layout.height)}
						style={{ alignItems: 'center' }}
					>
						<View style={{ marginHorizontal: 5, alignItems: 'center' }}>
							<Text variant="headlineSmall" style={{ textTransform: 'capitalize' }}>
								{data?.tag_string_character && getTitle(data?.tag_string_character)}
							</Text>
							<Text variant="titleSmall" style={{ color: colors.onSurfaceVariant }}>
								{data?.tag_string_copyright && getTitle(data?.tag_string_copyright)}
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
						favorites={data?.fav_count ?? 0}
						up_score={data?.up_score}
						down_score={data?.down_score}
					/>
					<ArtistBar
						artist_name={data?.tag_string_artist?.split(' ')[0]}
						pixiv_id={data?.pixiv_id ?? undefined}
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
			</ArtHeaderProvider>
		</View>
	);
};

export default DanbooruPostPage;
