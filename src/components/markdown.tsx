import { useAppTheme } from '@/store/theme/theme';
import { openWebBrowser } from '@/utils/webBrowser';
import { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Markdown, { ASTNode, MarkdownIt, RenderRules } from 'react-native-markdown-display';
import { Text } from 'react-native-paper';

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

export const MarkdownViewer = ({ markdown }: { markdown: string }) => {
	const { colors } = useAppTheme();
	const rules: RenderRules = {
		html_block: (node, children, parent, styles) => {
			// we check that the parent array contans a td because <br> in paragraph setting will create a html_inlinde surrounded by a soft break, try removing the clause to see what happens (double spacing on the <br> between 'top one' and 'bottom one')
			if (node.content.trim() === '<br>') {
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

	const markdownit: MarkdownIt = new MarkdownIt({ typographer: true, html: true });

	const onLinkPress = (url: string) => {
		if (url) {
			openWebBrowser(url);
			return false;
		}

		// return true to open with `Linking.openURL
		// return false to handle it yourself
		return true;
	};

	return (
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
			{markdown}
		</Markdown>
	);
};
