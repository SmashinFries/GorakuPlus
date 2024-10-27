import { useAppTheme } from '@/store/theme/themes';
import { openWebBrowser } from '@/utils/webBrowser';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { StyleProp, TextStyle } from 'react-native';
import { Icon, IconButton, Text, useTheme } from 'react-native-paper';
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
	const { colors } = useAppTheme();
	return (
		<View
			style={[
				{
					paddingRight: 24,
					paddingVertical: 8,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '100%',
				},
				style,
			]}
		>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					marginVertical: 6,
					justifyContent: 'center',
					flexDirection: 'row',
				}}
			>
				<View style={[{ flex: 1, paddingLeft: 16, justifyContent: 'center' }]}>
					<Text variant="titleMedium">{title}</Text>
					{subtitle ? (
						<Text onPress={subtitlePress} style={subtitleStyle ?? undefined}>
							{subtitle}
						</Text>
					) : null}
				</View>
			</View>
			<Pressable onPress={onIconPress} style={{ marginVertical: 6 }}>
				{icon && <Icon size={24} color={colors.onSurfaceVariant} source={icon} />}
			</Pressable>
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
	const { colors } = useAppTheme();

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
					type === 'anime' ||
						(type === 'manga' &&
							router.push(`/${type?.toLowerCase()}/${parseInt(id)}`));
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
