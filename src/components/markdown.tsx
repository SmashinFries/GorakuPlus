import { useAppTheme } from '@/store/theme/themes';
import { openWebBrowser } from '@/utils/webBrowser';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useState } from 'react';
import { View, useWindowDimensions, Image as RNImage } from 'react-native';
import Markdown, { ASTNode, MarkdownIt, RenderRules } from 'react-native-markdown-display';
import { Text } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

const MarkdownVideo = ({ url }: { url: string }) => {
	const player = useVideoPlayer(url, (player) => {
		player.loop = true;
		player.muted = true;
		player.play();
	});

	// useNativeControls
	// 						shouldPlay
	// 						isMuted
	// 						isLooping
	return (
		<VideoView
			player={player}
			nativeControls
			contentFit="contain"
			style={{ height: 270, width: '100%' }}
		/>
	);
};

const Spoiler = (props: {
	node: ASTNode;
	children: React.ReactNode[];
	styles: any;
	textColor?: string;
	bgColor?: string;
}) => {
	const [show, setShow] = useState(false);

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

export const MarkdownViewer = ({ markdown }: { markdown: string }) => {
	const { colors } = useAppTheme();
	const { width } = useWindowDimensions();

	const markdownit: MarkdownIt = new MarkdownIt({ typographer: true, html: true });
	const [markdownWidth, _setMarkdownWidth] = useState(0);

	const onLinkPress = (url: string) => {
		if (url) {
			openWebBrowser(url);
			return false;
		}

		// return true to open with `Linking.openURL
		// return false to handle it yourself
		return true;
	};

	const rules: RenderRules = {
		html_block: (node, children) => {
			// we check that the parent array contans a td because <br> in paragraph setting will create a html_inlinde surrounded by a soft break, try removing the clause to see what happens (double spacing on the <br> between 'top one' and 'bottom one')
			if (node.content.trim() === '<br>') {
				return (
					<Text key={node.key} style={{ flex: 1 }}>
						{'\n'}
					</Text>
				);
			} else if (node.content.match(/<h5.*?>/gm)) {
				return (
					<View key={node.key} style={{ alignItems: 'center' }}>
						{children}
					</View>
				);
			} else {
				return <View key={node.key}>{children}</View>;
			}
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
		fence: (node, children, parent, styles) => {
			return (
				<Spoiler
					key={node.key}
					node={node}
					styles={styles}
					textColor={colors.primary}
					bgColor={colors.backdrop}
				>
					{children}
				</Spoiler>
			);
		},
		code_inline: (node, children, parent, styles) => {
			return (
				<Spoiler
					key={node.key}
					node={node}
					styles={styles}
					textColor={colors.primary}
					bgColor={colors.backdrop}
				>
					{children}
				</Spoiler>
			);
		},
		image: (node, children, parent, styles, allowedImageHandlers, defaultImageHandler) => {
			const { src, alt } = node.attributes;
			// const targetWidth = parseInt((alt as string).replace('img', ''));
			// we check that the source starts with at least one of the elements in allowedImageHandlers
			const show =
				allowedImageHandlers.filter((value) => {
					return src.toLowerCase().startsWith(value.toLowerCase());
				}).length > 0;

			if (show === false && defaultImageHandler === null) {
				return null;
			}

			if (alt === 'youtube') {
				return (
					<View style={{ width: width, paddingVertical: 8 }}>
						<YoutubePlayer
							key={node.key}
							height={270}
							width={markdownWidth} // theres a body padding of 10
							webViewStyle={{ opacity: 0.99 }}
							videoId={(src as string).split('watch?v=').at(-1)}
						/>
					</View>
				);
			}

			if (alt === 'webm') {
				return (
					<View style={{ width: '100%', paddingVertical: 8 }}>
						{/* <Video
							key={node.key}
							source={{ uri: src }}
							style={{ height: 270, width: '100%' }}
							useNativeControls
							shouldPlay
							isMuted
							isLooping
							resizeMode={ResizeMode.CONTAIN}
						/> */}
						<MarkdownVideo url={src as string} />
					</View>
				);
			}

			return (
				<RNImage
					key={node.key}
					// we grab the resource identifier provided by require and convert it back to an int
					source={{ uri: src }}
					style={[
						// styles.image,
						{
							width: '100%',
							height: undefined,
							alignSelf: 'center',
							minHeight: 180,
							marginVertical: 5,
						},
					]}
					resizeMode="contain"
				/>
			);
		},
		text: (node, children, parent, styles, inheritedStyles = {}) => {
			return (
				<Text key={node.key} style={[inheritedStyles, styles.text]}>
					{node.content}
				</Text>
			);
		},
	};

	return (
		<Markdown
			markdownit={markdownit}
			rules={rules}
			style={{
				fence: {
					backgroundColor: 'transparent',
					color: colors.onBackground,
				},
				body: {
					backgroundColor: 'transparent',
					color: colors.onBackground,
				},
				link: {
					color: colors.primary,
				},
				hr: {
					backgroundColor: colors.surfaceVariant,
					height: 4,
					borderRadius: 12,
				},
			}}
			onLinkPress={onLinkPress}
		>
			{markdown
				?.replaceAll('\\/', '/')
				?.replaceAll(
					/<img[^>]*>/g,
					(t) => `![img](${t.split('src="').at(-1)?.split('"')[0]})`,
				)
				.replaceAll('<center>', '')
				.replaceAll('</center>', '')
				.replaceAll(
					/img.*?\%\(.*?\)/g,
					(t) => `![${t.split('(')[0]}](${t.split('(').at(-1)?.split(')')[0]})`,
				)
				.replaceAll(
					/img\d*\(.*?\)/g,
					(t) => `![${t.split('(')[0]}](${t.split('(').at(-1)?.split(')')[0]})`,
				)
				.replaceAll(/youtube\(.*?\)/g, (t) => {
					return `![${t.split('(')[0]}](${t.split('(').at(-1)?.split(')')[0]})`;
				})
				.replaceAll(
					/webm\(.*?\)/g,
					(t) => `![${t.split('(')[0]}](${t.split('(').at(-1)?.split(')')[0]})`,
				)
				.replaceAll('~~~', '')
				.replaceAll('~!', '```\n')
				.replaceAll('!~', '\n```')
				.replaceAll('__\n', '**\n')
				.replaceAll('\n__', '\n**')
				.replaceAll('__', '**')
				.replaceAll('<blockquote>', '> ')
				.replaceAll('</blockquote>', '  \n')}
		</Markdown>
	);
};
