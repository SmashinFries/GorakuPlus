import { openWebBrowser } from '@/utils/webBrowser';
import { router } from 'expo-router';
import { View } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { StyleProp, TextStyle } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import RenderHTML, {
	CustomTagRendererRecord,
	CustomTextualRenderer,
	RenderersProps,
} from 'react-native-render-html';

type ListHeadingProps = {
	title: string;
	subtitle?: string;
	subtitleStyle?: StyleProp<TextStyle>;
	subtitlePress?: () => void;
	style?: StyleProp<TextStyle>;
	icon?: string;
	onIconPress?: () => void;
};
export const ListHeading = ({
	title,
	subtitle,
	subtitlePress,
	subtitleStyle,
	style,
	icon,
	onIconPress,
}: ListHeadingProps) => {
	return (
		<View
			style={[
				{
					padding: 15,
					paddingBottom: 8,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '100%',
				},
				style,
			]}
		>
			<View>
				<Text variant="titleLarge">{title}</Text>
				{subtitle ? (
					<Text
						variant="labelLarge"
						onPress={subtitlePress}
						style={subtitleStyle ?? undefined}
					>
						{subtitle}
					</Text>
				) : null}
			</View>
			{icon && (
				<View
					style={{
						alignSelf: 'flex-end',
						alignItems: 'flex-end',
						justifyContent: 'flex-end',
					}}
				>
					<IconButton icon={icon} onPress={onIconPress} />
				</View>
			)}
		</View>
	);
};

const UwuTextRenderer: CustomTextualRenderer = ({ TDefaultRenderer, ...props }) => {
	return <TDefaultRenderer {...props} />;
};

type HTMLTextProps = {
	html: string;
};
export const HTMLText = ({ html }: HTMLTextProps) => {
	const { width } = useWindowDimensions();
	const { colors } = useTheme();

	const renderers: CustomTagRendererRecord = {
		p: UwuTextRenderer,
	};

	const renderersProps: Partial<RenderersProps> = {
		a: {
			onPress(event, url, htmlAttribs, target) {
				if (url.includes('https://anilist.co/character/')) {
					const id = url.split('/').at(-2);
					router.push(`https://anilist.co/characters/info/${id}`);
				} else if (
					url.includes('https://anilist.co/manga/') ||
					url.includes('https://anilist.co/anime/')
				) {
					const type = url.split('/')[3];
					const id = url.split('/')[4];
					router.push(`/${type}/${id}`);
				} else {
					openWebBrowser(url);
				}
			},
		},
	};

	return (
		<RenderHTML
			source={{ html: html }}
			contentWidth={width}
			baseStyle={{ color: colors.onBackground }}
			renderersProps={renderersProps}
			renderers={renderers}
			defaultTextProps={{ selectable: true, selectionColor: colors.inversePrimary }}
		/>
	);
};
