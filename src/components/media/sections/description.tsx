import { useTheme, Text } from 'react-native-paper';
import React from 'react';
import { ExpandableDescription } from '../../animations';
import { StyleSheet, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useAppSelector } from '@/store/hooks';

type DescriptionProps = {
    aniDescription: string;
    malDescription: string;
};
export const Description = ({ aniDescription, malDescription }: DescriptionProps) => {
    const { width } = useWindowDimensions();
    const { colors } = useTheme();
    const { defaultDescription } = useAppSelector((state) => state.persistedSettings);

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
