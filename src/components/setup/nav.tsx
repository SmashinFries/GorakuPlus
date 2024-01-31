import { useEffect } from 'react';
import { View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import Animated, {
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const PAGE_ITEM_SIZE = 10;

type SetupNavButtonProps = {
    icon: string;
    onPress: () => void;
    disabled?: boolean;
};
const SetupNavButton = ({ icon, disabled, onPress }: SetupNavButtonProps) => {
    return <IconButton icon={icon} disabled={disabled} onPress={onPress} />;
};

type PageIndicatorProps = {
    page: number;
    numPages: number;
};
const PageIndicator = ({ page, numPages }: PageIndicatorProps) => {
    const { colors } = useTheme();
    const PageItem = (idx: number) => {
        const pageAnimVal = useSharedValue(1);
        const animatedStyle = useAnimatedStyle(() => {
            return {
                transform:
                    page === idx
                        ? [
                              {
                                  scale: pageAnimVal.value,
                              },
                          ]
                        : undefined,
            };
        });

        useEffect(() => {
            if (page === idx) {
                pageAnimVal.value = withRepeat(
                    withSequence(
                        withTiming(1.2, { duration: 750 }),
                        withTiming(1, { duration: 750 }),
                    ),
                    -1,
                );
            } else {
                pageAnimVal.value = 1;
            }
        }, [page, idx]);

        return (
            <Animated.View
                key={idx}
                style={[
                    animatedStyle,
                    {
                        height: PAGE_ITEM_SIZE,
                        width: PAGE_ITEM_SIZE,
                        borderRadius: 10,
                        backgroundColor: page >= idx ? colors.primary : colors.onBackground,
                        marginHorizontal: 5,
                    },
                ]}
            />
        );
    };

    return Array.from({ length: numPages }, (_, i) => PageItem(i));
};

type SetupNavBarProps = {
    page: number;
    numPages: number;
    onPageChange: (navType: 'next' | 'prev') => void;
};
export const SetupNavBar = ({ page, numPages, onPageChange }: SetupNavBarProps) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SetupNavButton
                icon="arrow-left"
                onPress={() => onPageChange('prev')}
                disabled={page === 0}
            />
            <PageIndicator page={page} numPages={numPages} />
            <SetupNavButton
                icon="arrow-right"
                onPress={() => {
                    onPageChange('next');
                }}
                disabled={page + 1 === numPages} // page is index (from 0) while numPages is actual number of pages (from 1)
            />
        </View>
    );
};
