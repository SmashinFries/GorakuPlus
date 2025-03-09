import { useAppTheme } from '@/store/theme/themes';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { useWindowDimensions, View, Image as RNImage } from 'react-native';
import { Text } from 'react-native-paper';
import RenderHTML, {
	CustomTagRendererRecord,
	HTMLContentModel,
	HTMLElementModel,
	InternalRendererProps,
	RenderHTMLProps,
	TBlock,
	useComputeMaxWidthForTag,
	useContentWidth,
	useInternalRenderer,
	RenderersProps,
	defaultSystemFonts,
} from 'react-native-render-html';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as cheerio from 'cheerio';
import { ResizeMode, Video } from 'expo-av';
import { findOne } from 'domutils';
import { openWebBrowser } from '@/utils/webBrowser';

// (ITS ACTUALLY JUST HTML)

const preprocessHTML = (html: string) => {
	const $ = cheerio.load(`<body>${html}</body>`);
	$('body')
		.find('*')
		.each(function () {
			$(this)
				.contents()
				.filter(function () {
					return this.type === 'text';
				})
				.each(function () {
					const updatedText = $(this)
						.text()
						.replaceAll(/\*\*+(.*?)\*\*+/g, '<strong>$1</strong>')
						.replaceAll(/\_\_(.*?)\_\_/g, '<strong>$1</strong>')
						.replaceAll(/\_{1}(.*?)\_{1}/g, '<em>$1</em>')
						.replaceAll(/\*(.*?)\*/g, '<em>$1</em>');
					// .replaceAll('\n', '<br>');
					$(this).replaceWith(updatedText);
				});
		});

	const processedHtml = $.html();

	if (!html) return null;

	return processedHtml;
};

// IM DYING - HELP

function findSource(tnode: TBlock) {
	if (tnode.attributes.src) {
		return tnode.attributes.src;
	}
	// @ts-ignore NEEDS A REVISIT - works as far as I know
	const sourceElms = findOne((elm) => elm.tagName === 'source', tnode.domNode.children);
	return sourceElms ? sourceElms.attribs.src : '';
}

const CustomImageRenderer = (props: InternalRendererProps<any>) => {
	const { rendererProps } = useInternalRenderer('img', props);
	// const width = parseInt(rendererProps.width as string);
	const { colors } = useAppTheme();
	const [ar, setAr] = useState<number>();

	useEffect(() => {
		rendererProps.source.uri &&
			RNImage.getSize(rendererProps.source.uri, (w, h) => setAr(w / h));
	}, [rendererProps.source.uri]);

	return (
		<View style={{ alignItems: 'center', width: '100%' }}>
			<Image
				{...rendererProps}
				placeholder={{ blurhash: colors.blurhash }}
				style={[
					rendererProps.style,
					{
						width: '100%',
						// height: 200,
						maxHeight: 300,
						aspectRatio: ar,
					},
				]}
				contentFit="contain"
			/>
		</View>
	);
};

const YoutubeRenderer = (props: InternalRendererProps<TBlock>) => {
	const { Renderer, rendererProps } = useInternalRenderer('div', props);
	const src = props.tnode.id
		? props.tnode.id.includes('watch?v=')
			? props.tnode.id.split('watch?v=')?.at(-1)?.split('&')[0]
			: props.tnode.id.split('/').at(-1)?.split('?')[0]
		: '';
	const computeMaxWidth = useComputeMaxWidthForTag('div');
	const contentWidth = useContentWidth();
	const width = computeMaxWidth(contentWidth);
	if (props.tnode.classes && props.tnode.classes?.includes('youtube')) {
		return (
			<View style={{ width: width, paddingVertical: 8, height: 270 }}>
				<YoutubePlayer
					height={270}
					width={width}
					webViewStyle={{ opacity: 0.99 }}
					videoId={(src as string).split('watch?v=').at(-1)}
					mute
				/>
			</View>
		);
	} else {
		return <Renderer {...rendererProps} />;
	}
};

const VideoRenderer = (props: InternalRendererProps<TBlock>) => {
	const computeMaxWidth = useComputeMaxWidthForTag('video');
	const width = computeMaxWidth(useContentWidth());
	return (
		<View style={{ width: '100%', paddingVertical: 8 }}>
			<Video
				source={{ uri: findSource(props.tnode) }}
				style={[{ aspectRatio: 16 / 9 }, props.style, { width }]}
				useNativeControls
				shouldPlay
				isMuted
				isLooping
				resizeMode={ResizeMode.CONTAIN}
			/>
		</View>
	);
};

const SpoilerRenderer = (props: InternalRendererProps<TBlock>) => {
	const { rendererProps } = useInternalRenderer<'span'>('span', props);
	const { colors } = useAppTheme();
	const [visible, setVisible] = useState(false);
	return (
		<Text
			onPress={() => setVisible((prev) => !prev)}
			style={{
				backgroundColor: visible ? colors.elevation.level5 : undefined,
				color: visible ? colors.onSurface : colors.primary,
				padding: 4,
				borderRadius: 6,
			}}
		>
			{visible
				? `\n${rendererProps.tnode.children[0]?.init?.textNode?.data}`
				: `\nShow Spoiler`}
		</Text>
	);
};

const defaultFontSize = 16;

type ViewerProps = {
	body: string | null | undefined;
	parentWidth?: number;
	textColor?: string;
	numLines?: number;
};
const AniListMarkdownViewer = ({ body, parentWidth, textColor, numLines }: ViewerProps) => {
	const { colors, fonts } = useAppTheme();
	const { width } = useWindowDimensions();
	const extraLineHeight = 6;

	const html = body
		? preprocessHTML(
				body
					?.replaceAll(/\[(\<img.*?>).*?]\(.*?\)/gs, '$1') // this fixes a strange image issue in the html - ref: https://anilist.co/review/23899
					.replaceAll(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>'),
			)
		: '';
	const tagsStyles: RenderHTMLProps['tagsStyles'] = {
		blockquote: {
			borderLeftWidth: 10,
			borderStyle: 'solid',
			borderRadius: 8,
			borderLeftColor: colors.primary,
			backgroundColor: colors.primaryContainer,
			color: colors.onPrimaryContainer,
			padding: 12,
			paddingBottom: 0,
			marginTop: 6,
			marginLeft: 6,
			lineHeight: undefined,
		},
		// calculating from default style fixes vertical cutoff
		// https://github.dev/native-html/core/packages/transient-render-engine/src/model/defaultHTMLElementModels.ts
		h1: {
			lineHeight: defaultFontSize * 2 + extraLineHeight,
		},
		h2: {
			lineHeight: defaultFontSize * 1.5 + extraLineHeight,
		},
		h3: {
			lineHeight: defaultFontSize * 1.17 + extraLineHeight,
		},
		h4: {
			// for the sake of consistency
			lineHeight: defaultFontSize * 1 + extraLineHeight,
		},
		h5: {
			marginVertical: 0,
			lineHeight: defaultFontSize * 0.83 + 4 + extraLineHeight,
		},
		h6: {
			lineHeight: defaultFontSize * 0.67 + extraLineHeight,
		},
		hr: {
			height: 4,
			borderRadius: 12,
			backgroundColor: colors.border,
			// marginVertical: 4,
		},
		a: {
			color: colors.primary,
			textDecorationLine: 'none',
		},
		body: {
			color: textColor ?? colors.onBackground,
		},
		p: {
			lineHeight: defaultFontSize + extraLineHeight,
		},
		// center: {
		// 	lineHeight: defaultFontSize + 6,
		// },
	};

	const customHTMLElementModels = {
		center: HTMLElementModel.fromCustomModel({
			tagName: 'center',
			mixedUAStyles: {
				textAlign: 'center',
				textAlignVertical: 'center',
			},
			contentModel: HTMLContentModel.block,
		}),
		video: HTMLElementModel.fromCustomModel({
			contentModel: HTMLContentModel.block,
			tagName: 'video',
			isOpaque: true,
		}),

		// CANT GET INLINE TO WORK WITH CUSTOM RENDERER
		// img: defaultHTMLElementModels.img.extend({
		// 	contentModel: HTMLContentModel.mixed,
		// }),
	};

	const renderers: CustomTagRendererRecord = {
		img: CustomImageRenderer,
		div: YoutubeRenderer,
		video: VideoRenderer,
		span: SpoilerRenderer,
		// em: ItalicRenderer,
	};
	const renderersProps: Partial<RenderersProps> = {
		img: {
			enableExperimentalPercentWidth: true,
		},
		a: {
			onPress(event, url) {
				openWebBrowser(url);
			},
		},
	};

	if (!html) return;

	return (
		<RenderHTML
			contentWidth={parentWidth ?? width}
			source={{
				html: html,
			}}
			renderersProps={renderersProps}
			renderers={renderers}
			enableExperimentalBRCollapsing
			tagsStyles={tagsStyles}
			customHTMLElementModels={customHTMLElementModels}
			systemFonts={[...defaultSystemFonts]}
			baseStyle={{ ...fonts.default }}
			defaultTextProps={{
				selectable: false,
				selectionColor: colors.secondaryContainer,
				numberOfLines: numLines ?? undefined,
			}} // selection gets triggered when scrolling so is disabled for now
		/>
	);
};

export default AniListMarkdownViewer;
