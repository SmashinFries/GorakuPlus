import { useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import {
    NavigationState,
    SceneRendererProps,
    TabBar,
    TabBarIndicator,
} from 'react-native-tab-view';

export const RenderTabBar = (
    props: SceneRendererProps & {
        navigationState: NavigationState<any>;
    },
) => {
    const { colors } = useTheme();
    const [titleWidth, setTitleWidth] = useState<number>(20);
    return (
        <TabBar
            {...props}
            tabStyle={{ paddingTop: 10 }}
            indicatorStyle={{
                backgroundColor: colors.primary,
                borderRadius: 12,
                height: 4,
                width: titleWidth,
            }}
            style={{
                backgroundColor: colors.surface,
                borderBottomColor: colors.elevation.level3,
                borderBottomWidth: 0.5,
            }}
            labelStyle={{ textTransform: 'capitalize', color: colors.onSurface }}
            renderLabel={({ route, focused }) => (
                <Text
                    style={{
                        textTransform: 'capitalize',
                        color: focused ? colors.primary : colors.onBackground,
                    }}
                    onLayout={(e) => setTitleWidth(e.nativeEvent.layout.width)}
                >
                    {route.title}
                </Text>
            )}
            renderIndicator={(indicatorProps) => {
                const width =
                    indicatorProps.getTabWidth(props.navigationState.index) - titleWidth - 15;
                return (
                    <TabBarIndicator
                        {...indicatorProps}
                        style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: colors.primary,
                            borderRadius: 12,
                            height: 4,
                            width: titleWidth + 15,
                            left: width / 2,
                        }}
                    />
                );
            }}
            scrollEnabled={props.navigationState.routes.length > 3 ? true : false}
            android_ripple={{ color: colors.primary, borderless: true }}
        />
    );
};
