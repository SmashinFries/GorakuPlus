import { MotiView } from 'moti';
import { useTheme, Text, Button, IconButton } from 'react-native-paper';
import React from 'react';
import { AnimateHeight, TransYUpView } from '../../../components/animations';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import RenderHTML from 'react-native-render-html';

type DescriptionProps = {
    aniDescription: string;
    malDescription: string;
};
export const Description = ({ aniDescription, malDescription }: DescriptionProps) => {
    const [show, toggle] = React.useReducer((open) => !open, false);
    const { width } = useWindowDimensions();
    const { colors } = useTheme();
    const { defaultDescription } = useSelector((state: RootState) => state.persistedSettings);

    const AniDesc = () => (
        <RenderHTML
            contentWidth={width}
            baseStyle={{ color: colors.onBackground }}
            source={{ html: aniDescription }}
        />
    );
    const MalDesc = () => <Text>{malDescription}</Text>;

    const DescView = () => {
        if (!aniDescription && !malDescription) {
            return null;
        } else if (defaultDescription === 'mal' && malDescription) {
            return <MalDesc />;
        } else if (defaultDescription === 'ani' && aniDescription) {
            return <AniDesc />;
        } else if (defaultDescription === 'ani' && !aniDescription && malDescription) {
            return <MalDesc />;
        } else if (defaultDescription === 'mal' && !malDescription && aniDescription) {
            return <AniDesc />;
        } else {
            return null;
        }
    };

    if (!aniDescription && !malDescription) {
        return null;
    }

    return (
        <TransYUpView>
            <AnimateHeight initialHeight={50} enterFrom="bottom" hide={!show}>
                <MotiView
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        paddingBottom: 20,
                        backgroundColor: colors.background,
                    }}
                >
                    <DescView />
                </MotiView>
            </AnimateHeight>
            <MotiView style={[styles.button, { bottom: -15 }]}>
                <IconButton icon={!show ? 'chevron-up' : 'chevron-down'} onPress={() => toggle()} />
            </MotiView>
        </TransYUpView>
    );
};

const styles = StyleSheet.create({
    container: {},
    button: {
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 1,
        overflow: 'hidden',
    },
});
