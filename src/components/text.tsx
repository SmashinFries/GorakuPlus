import { useAppTheme } from '@/store/theme/themes';
import { openWebBrowser } from '@/utils/webBrowser';
import { router } from 'expo-router';
import { View, ViewStyle } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { StyleProp, TextStyle } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';
import RenderHTML, {
	CustomTagRendererRecord,
	CustomTextualRenderer,
	RenderersProps,
} from 'react-native-render-html';

type ListHeadingProps = {
	title: string;
	titleVariant?: VariantProp<never>;
	titleStyle?: StyleProp<TextStyle>;
	subtitle?: string;
	subtitleStyle?: StyleProp<TextStyle>;
	subtitlePress?: () => void;
	style?: StyleProp<ViewStyle>;
	icon?: string;
	onIconPress?: () => void;
};
export const ListHeading = ({
	title,
	titleVariant,
	titleStyle,
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
					paddingRight: 14,
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
					<Text variant={titleVariant ?? 'titleMedium'} style={[titleStyle]}>
						{title}
					</Text>
					{subtitle ? (
						<Text onPress={subtitlePress} style={subtitleStyle ?? undefined}>
							{subtitle}
						</Text>
					) : null}
				</View>
			</View>
			{icon && <IconButton onPress={onIconPress} icon={icon} size={24} />}
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
			onPress(event, url) {
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
							router.push(
								`/${type?.toLowerCase() as 'anime' | 'manga'}/${parseInt(id)}`,
							));
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
