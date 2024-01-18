import { ScrollView, View, useWindowDimensions } from 'react-native';
import {
    ActivityIndicator,
    Avatar,
    Badge,
    Button,
    Divider,
    MD3DarkTheme,
    Text,
    useTheme,
} from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { ReviewHeader } from '@/components/headers';
import { openWebBrowser } from '@/utils/webBrowser';
import { useReviewsByIdQuery, useToggleFollowMutation } from '@/store/services/anilist/enhanced';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import WebView from 'react-native-webview';
import Markdown, { RenderRules, MarkdownIt, ASTNode } from 'react-native-markdown-display';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Burnt from 'burnt';
import { ReviewRating, useReviewRatingMutation } from '@/store/services/anilist/generated-anilist';

const Spoiler = (props: {
    node: ASTNode;
    children: React.ReactNode[];
    styles: any;
    textColor?: string;
    bgColor?: string;
}) => {
    const { width } = useWindowDimensions();
    const [show, setShow] = useState(false);

    // <View
    //         style={{ width: width - props?.styles?.body?.paddingHorizontal, alignItems: 'center' }}
    //     >
    //         <View
    //             key={props.node.key}
    //             style={[
    //                 {
    //                     backgroundColor: props.bgColor,
    //                     padding: 10,
    //                     borderRadius: 12,
    //                 },
    //             ]}
    //         >
    //             <Text
    //                 style={[
    //                     {
    //                         color: props.textColor,
    //                     },
    //                 ]}
    //                 onPress={() => setShow((prev) => !prev)}
    //             >
    //                 {show ? `\n${props.node.content}\n` : 'Show Spoiler'}
    //             </Text>
    //         </View>
    //     </View>

    return (
        <Text
            style={[
                {
                    color: props.textColor,
                },
            ]}
            onPress={() => setShow((prev) => !prev)}
        >
            {show ? `\n\n${props.node.content}\n\n` : '\n\nShow Spoiler\n\n'}
        </Text>
    );
};

type ScoreProps = {
    reviewId: number;
    score: number;
    scoreColor?: string;
    ratingAmount: number;
    rating: number;
    userRating?: ReviewRating;
};
const Score = ({ reviewId, score, scoreColor, ratingAmount, rating, userRating }: ScoreProps) => {
    const { colors } = useTheme();
    const [rateReview] = useReviewRatingMutation();
    const [userRatingState, setUserRatingState] = useState<ReviewRating>(
        userRating ?? ReviewRating.NoVote,
    );

    const iconSize = 45;
    const ratingPercentage = {
        positive: ((rating / ratingAmount) * 100).toFixed(0),
        negative: (((ratingAmount - rating) / ratingAmount) * 100).toFixed(0),
    };

    const onRatePress = async (rate: ReviewRating) => {
        if (rate === userRatingState) {
            const res = await rateReview({ id: reviewId, rating: ReviewRating.NoVote }).unwrap();
            setUserRatingState(res.RateReview.userRating);
        } else {
            const res = await rateReview({ id: reviewId, rating: rate }).unwrap();
            setUserRatingState(res.RateReview.userRating);
        }
    };

    return (
        <View style={{ marginVertical: 20 }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name={
                            userRatingState === ReviewRating.DownVote
                                ? 'thumb-down'
                                : 'thumb-down-outline'
                        }
                        color={'red'}
                        size={iconSize}
                        onPress={() => onRatePress(ReviewRating.DownVote)}
                    />
                    <Text>{ratingPercentage.negative} %</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: scoreColor,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 12,
                        alignItems: 'center',
                    }}
                >
                    <Text variant="displayLarge" style={{ color: MD3DarkTheme.colors.onSurface }}>
                        {score}
                    </Text>
                    <Text variant="headlineMedium" style={{ color: MD3DarkTheme.colors.onSurface }}>
                        /
                    </Text>
                    <Text variant="labelLarge" style={{ color: MD3DarkTheme.colors.onSurface }}>
                        100
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name={
                            userRatingState === ReviewRating.UpVote
                                ? 'thumb-up'
                                : 'thumb-up-outline'
                        }
                        color={'green'}
                        size={iconSize}
                        onPress={() => onRatePress(ReviewRating.UpVote)}
                    />
                    <Text>{ratingPercentage.positive} %</Text>
                </View>
            </View>
            <Text variant="bodyLarge" style={{ textAlign: 'center', paddingTop: 10 }}>
                {rating} out of {ratingAmount} users liked this review.
            </Text>
        </View>
    );
};

const ReviewPage = () => {
    const { reviewId } = useLocalSearchParams<{ reviewId: string }>();
    const id = Number(reviewId);
    const { width, height } = useWindowDimensions();
    const { colors } = useTheme();
    const { scoreColors } = useAppSelector((state) => state.persistedSettings);

    const [showWebview, setShowWebview] = useState(false);

    const { data, isLoading, isError } = useReviewsByIdQuery(
        {
            reviewId: id,
        },
        { skip: reviewId === undefined },
    );
    const [followUser] = useToggleFollowMutation();

    const [isFollowing, setIsFollowing] = useState(data?.Review?.user?.isFollowing ?? false);

    const onFollowPress = async () => {
        if (data?.Review?.user?.id) {
            const res = await followUser({ userId: data?.Review?.user?.id }).unwrap();
            setIsFollowing(res.ToggleFollow.isFollowing);
        } else {
            Burnt.toast({ title: 'User ID not found 🥲' });
        }
    };

    const rules: RenderRules = {
        html_block: (node, children, parent, styles) => {
            // we check that the parent array contans a td because <br> in paragraph setting will create a html_inlinde surrounded by a soft break, try removing the clause to see what happens (double spacing on the <br> between 'top one' and 'bottom one')
            if (node.content.trim() === '<br>') {
                console.log('true');
                return (
                    <Text key={node.key} style={{ flex: 1 }}>
                        {'\n'}
                    </Text>
                );
            }

            return null;
        },
        html_inline: (node, children, parent, styles) => {
            return (
                <View key={node.key} style={{ flex: 1, alignItems: 'center' }}>
                    {children}
                </View>
            );
        },
        link: (node, children, parent, styles) => {
            return (
                <Text
                    key={node.key}
                    style={[{ flex: 1, color: colors.primary }]}
                    onPress={() => openWebBrowser(node.attributes.href)}
                >
                    {children}
                </Text>
            );
        },
        blockquote: (node, children, parent, styles) => {
            return (
                <View
                    key={node.key}
                    style={[
                        styles._VIEW_SAFE_blockquote,
                        { flex: 1, backgroundColor: colors.backdrop },
                    ]}
                >
                    {children}
                </View>
            );
        },
        code_inline: (node, children, parent, styles) => {
            console.log('NODE:', node.content);
            return (
                <Spoiler
                    key={node.key}
                    children={children}
                    node={node}
                    styles={styles}
                    textColor={colors.primary}
                    bgColor={colors.backdrop}
                />
            );
        },
        // image: (node, children, parent, styles, allowedImageHandlers, defaultImageHandler) => {
        //     const { src, alt } = node.attributes;
        //     // we check that the source starts with at least one of the elements in allowedImageHandlers
        //     const show =
        //         allowedImageHandlers.filter((value) => {
        //             return src.toLowerCase().startsWith(value.toLowerCase());
        //         }).length > 0;

        //     if (show === false && defaultImageHandler === null) {
        //         return null;
        //     }

        //     return (
        //         <View
        //             key={node.key}
        //             style={{
        //                 flex: 1,
        //                 width: '100%',
        //                 alignItems: 'center',
        //                 justifyContent: 'center',
        //             }}
        //         >
        //             <Image
        //                 // we grab the resource identifier provided by require and convert it back to an int
        //                 source={{ uri: src }}
        //                 style={[
        //                     styles.image,
        //                     {
        //                         width: '100%',
        //                     },
        //                 ]}
        //                 contentFit="contain"
        //             />
        //         </View>
        //     );
        // },
        text: (node, children, parent, styles, inheritedStyles = {}) => {
            return (
                <Text key={node.key} style={[inheritedStyles, styles.text]}>
                    {node.content}
                </Text>
            );
        },
    };

    const onLinkPress = (url: string) => {
        if (url) {
            openWebBrowser(url);
            return false;
        }

        // return true to open with `Linking.openURL
        // return false to handle it yourself
        return true;
    };

    const markdownit: MarkdownIt = new MarkdownIt({ typographer: true, html: true });

    const webStyle = `<style type="text/css">
    :root {
        --color-red: 232,93,117;
        --color-peach: 250,122,122;
        --color-orange: 247,154,99;
        --color-yellow: 247,191,99;
        --color-green: 123,213,85;
        --color-white: 255,255,255;
    }
    body {
      color: ${colors.onBackground};
      background: ${colors.background};
    }
    .score[data-v-5ca094da] {
        align-items: center;
        border-radius: 4px;
        color: rgb(var(--color-white));
        display: inline-flex;
        font-size: 4.5rem;
        font-weight: 300;
        height: 100%;
        justify-content: center;
        margin-bottom: -80px;
        margin-top: 35px;
        max-height: 80px;
        max-width: 130px;
        padding: 5px 20px;
        padding-left: 37px;
        width: 100%;
    }
    .score.green[data-v-5ca094da] {
        background: rgb(var(--color-green));
    }
    .score.orange[data-v-5ca094da] {
        background: rgb(var(--color-orange));
    }
    .score.red[data-v-5ca094da] {
        background: rgb(var(--color-red));
    }
    .body[data-v-5ca094da] {
        align-items: center;
        background: rgb(var(--color-foreground));
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        line-height: 1.6;
        padding: 40px;
        position: relative;
        z-index: 20;
    }
    .score .total[data-v-5ca094da] {
        align-self: flex-end;
        font-size: 1.3rem;
        font-style: italic;
        opacity: .9;
        line-height: 4rem;
        display: inline-block;
        margin-left: -4px;
    }
    .rating[data-v-5ca094da] {
        background: rgb(var(--color-foreground));
        border-radius: 4px;
        color: rgb(var(--color-text-lighter));
        margin: 100px auto;
        max-width: 300px;
        padding: 20px;
        text-align: center;
        font-size: 1.5rem;
    }
    .actions[data-v-5ca094da] {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
    }
    .actions .icon[data-v-5ca094da] {
        background: rgb(var(--color-green));
        border-radius: 3px;
        color: rgb(var(--color-white));
        cursor: pointer;
        margin: 0 10px;
        padding: 10px;
        transition: .2s;
    }
    .actions .icon[data-v-5ca094da]:first-of-type {
        background: rgb(var(--color-red));
    }
  </style>`;

    const webScore = `<div data-v-5ca094da class="body"><div data-v-5ca094da="" class="score ${
        data?.Review?.score <= scoreColors.red
            ? 'red'
            : data?.Review?.score <= scoreColors.yellow && data?.Review?.score >= scoreColors.red
            ? 'orange'
            : 'green'
    }">
    ${data?.Review?.score}
    <span data-v-5ca094da="" class="total">/100</span></div></div>
    <div data-v-5ca094da="" class="rating"><div data-v-5ca094da="" class="actions"></div>
			25 out of 32 users liked this review
		</div>
    `;

    useEffect(() => {
        if (data?.Review?.user) {
            setIsFollowing(data?.Review?.user?.isFollowing);
        }
    }, [data]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    title: 'Review (beta)',
                    headerShown: true,
                    header: (props) => (
                        <ReviewHeader
                            {...props}
                            shareLink={data?.Review?.siteUrl}
                            onRenderSwitch={() => setShowWebview((prev) => !prev)}
                            render_switch_icon={
                                showWebview ? 'language-html5' : 'language-markdown-outline'
                            }
                        />
                    ),
                }}
            />
            {!showWebview ? (
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ marginVertical: 20 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Avatar.Image
                                size={100}
                                source={{ uri: data?.Review?.user?.avatar?.large }}
                            />
                            <Text variant={'titleLarge'}>{data?.Review?.user?.name}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                paddingVertical: 20,
                            }}
                        >
                            <Button
                                icon="account"
                                mode="elevated"
                                onPress={() => openWebBrowser(data?.Review?.user?.siteUrl)}
                            >
                                View Profile
                            </Button>
                            <Button
                                onPress={onFollowPress}
                                icon={isFollowing ? 'minus' : 'plus'}
                                mode="elevated"
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </Button>
                        </View>
                    </View>
                    <Divider style={{ marginHorizontal: 20 }} />
                    <Markdown
                        markdownit={markdownit}
                        rules={rules}
                        style={{
                            fence: {
                                backgroundColor: colors.background,
                                color: colors.onBackground,
                            },
                            body: {
                                backgroundColor: colors.background,
                                color: colors.onBackground,
                                paddingHorizontal: 10,
                            },
                        }}
                        onLinkPress={onLinkPress}
                    >
                        {data?.Review?.body}
                    </Markdown>
                    <Score
                        reviewId={id}
                        score={data?.Review?.score}
                        scoreColor={
                            data?.Review?.score <= scoreColors.red
                                ? 'red'
                                : data?.Review?.score <= scoreColors.yellow &&
                                  data?.Review?.score >= scoreColors.red
                                ? 'orange'
                                : 'green'
                        }
                        ratingAmount={data?.Review?.ratingAmount}
                        rating={data?.Review?.rating}
                    />
                </ScrollView>
            ) : (
                <WebView
                    source={{
                        html:
                            data?.Review?.htmlBody +
                            webScore +
                            '<meta name="viewport" content="initial-scale=1.0" />' +
                            webStyle,
                    }}
                    overScrollMode="never"
                    style={{
                        flex: 1,
                        backgroundColor: colors.background,
                    }}
                />
            )}
        </View>
    );
};

export default ReviewPage;
