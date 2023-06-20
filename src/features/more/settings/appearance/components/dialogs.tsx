import { Dialog, Portal, Text, Button, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { RangeSlider } from '@sharcoux/slider';
import { useState } from 'react';
import { View } from 'react-native';
import { ScoreContainer } from '../../../../../components/score';

type SliderViewProps = {
    title: string;
    score: number;
    setScore: (value: number) => void;
    trackColor: string;
    lowerLimit?: number;
    upperLimit?: number;
};
const SliderView = ({
    score,
    setScore,
    title,
    lowerLimit,
    upperLimit,
    trackColor,
}: SliderViewProps) => {
    return (
        <View style={{ paddingVertical: 10 }}>
            <Text>{title}</Text>
            <Slider
                value={score}
                onValueChange={(value) => setScore(value)}
                minimumTrackTintColor={trackColor}
                maximumTrackTintColor={trackColor}
                step={1}
                minimumValue={0}
                maximumValue={100}
                thumbTintColor={trackColor}
                lowerLimit={lowerLimit ?? null}
                upperLimit={upperLimit ?? null}
            />
        </View>
    );
};

type DialogProps = {
    visible: boolean;
    onDismiss: () => void;
    red: number;
    yellow: number;
    updateScoreColor: (red: number, yellow: number) => any;
};
export const ScoreColorDialog = ({
    onDismiss,
    visible,
    red,
    yellow,
    updateScoreColor,
}: DialogProps) => {
    const [newRed, setRed] = useState(red);
    const [newYellow, setYellow] = useState(yellow ?? 74);
    const { colors } = useTheme();

    const onCancel = () => {
        setRed(red);
        setYellow(yellow);
        onDismiss();
    };

    const onDone = () => {
        updateScoreColor(newRed, newYellow);
        onDismiss();
    };

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Score Defaults</Dialog.Title>
            <Dialog.Content>
                <SliderView
                    score={newRed}
                    setScore={setRed}
                    title="Max Red Score"
                    upperLimit={newYellow - 1}
                    trackColor={colors.primary}
                />
                <SliderView
                    score={newYellow}
                    setScore={setYellow}
                    title="Max Yellow Score"
                    lowerLimit={newRed + 1}
                    trackColor={colors.primary}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <ScoreContainer score={newRed} color="red" opacity={0.35} animate={false} />
                    <Button
                        onPress={() => {
                            setRed(red);
                            setYellow(yellow ?? 74);
                        }}
                    >
                        Reset
                    </Button>
                    <ScoreContainer
                        score={newYellow}
                        color="yellow"
                        opacity={0.35}
                        animate={false}
                    />
                </View>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onCancel}>Cancel</Button>
                <Button onPress={onDone}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
};
