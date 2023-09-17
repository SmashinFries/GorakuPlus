import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { TransYUpView, TransYUpViewMem } from './animations';
import { MotiView } from 'moti';

type ScoreContainerProps = {
    title?: string;
    score: number;
    opacity?: number;
    color?: string;
    isMal?: boolean;
    animate?: boolean;
    delay?: number;
};
export const ScoreContainer = ({
    title,
    color,
    opacity,
    score,
    delay,
    animate = true,
    isMal = false,
}: ScoreContainerProps) => {
    const height = 85;
    const fillHeight = score ? ((isMal ? score * 10 : score) / 100) * height : 0;
    const width = 85;
    const { colors } = useTheme();
    return (
        <View>
            <View
                style={{
                    height: height,
                    width: width,
                    borderRadius: height / 2,
                    opacity: opacity,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                <MotiView
                    from={{ height: 0 }}
                    animate={{ height: fillHeight }}
                    style={{
                        position: 'absolute',
                        // height: fillHeight,
                        width: width,
                        backgroundColor: color,
                    }}
                />
            </View>
            <View
                style={{
                    position: 'absolute',
                    height: height,
                    width: width,
                    borderRadius: height / 2,
                    borderWidth: 1,
                    borderColor: score ? color : colors.outline,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>{score ?? '?'}</Text>
                {title ? <Text>{title}</Text> : null}
            </View>
        </View>
    );
};
