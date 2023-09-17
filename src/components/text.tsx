import { View } from 'react-native';
import { StyleProp, TextStyle } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

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
                        flex: 1,
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
