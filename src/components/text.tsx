import { openWebBrowser } from '@/utils/webBrowser';
import { View } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { StyleProp, TextStyle } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';

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
                        variant="titleSmall"
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

type HTMLTextProps = {
    html: string;
};
export const HTMLText = ({ html }: HTMLTextProps) => {
    const { width } = useWindowDimensions();
    const { colors } = useTheme();

    const renderersProps = {
        a: {
            onPress(event, url, htmlAttribs, target) {
                // console.log(url, target);
                openWebBrowser(url);
            },
        },
    };

    return (
        <RenderHTML
            source={{ html: html }}
            contentWidth={width}
            baseStyle={{ color: colors.onBackground }}
            renderersProps={renderersProps}
        />
    );
};
