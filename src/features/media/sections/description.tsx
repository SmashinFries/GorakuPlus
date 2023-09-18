import { useTheme, Text } from 'react-native-paper';
import React from 'react';
import { ExpandableDescription } from '../../../components/animations';
import { StyleSheet, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useAppSelector } from '../../../app/hooks';

type DescriptionProps = {
    aniDescription: string;
    malDescription: string;
};
export const Description = ({ aniDescription, malDescription }: DescriptionProps) => {
    const [show, toggle] = React.useReducer((open) => !open, false);
    const { width } = useWindowDimensions();
    const { colors } = useTheme();
    const { defaultDescription } = useAppSelector((state) => state.persistedSettings);
    const [descriptionHeight, setDescriptionHeight] = React.useState(90);

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
        <ExpandableDescription initialHeight={90}>
            <DescView />
        </ExpandableDescription>
    );
};

export const DescriptionMem = React.memo(Description);

const styles = StyleSheet.create({
    container: {},
    button: {
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 1,
        overflow: 'hidden',
    },
});
