import { ScoreColors, StatusColors } from '@/constants/colors';
import { useAppSelector } from '@/store/hooks';
import { ScoreDistribution } from '@/store/services/anilist/generated-anilist';
import { ScoreVisualType } from '@/store/slices/settingsSlice';
import { rgbToRgba } from '@/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BORDER_RADIUS = 12;

type ScoreHealthBarProps = {
    score: number;
    scoreColors: { red: number; yellow: number };
    heartColor?: string;
    showScore?: boolean;
    textColor?: string;
};
type ScoreIconProps = ScoreHealthBarProps & { textColor: string; showScore?: boolean };
export const ScoreIconText = ({ score, scoreColors, textColor, showScore }: ScoreIconProps) => {
    const { colors } = useTheme();
    if (!score) return null;
    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                paddingVertical: 2,
                paddingHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderBottomLeftRadius: BORDER_RADIUS,
                borderTopRightRadius: BORDER_RADIUS,
                backgroundColor: rgbToRgba(colors.primaryContainer, 0.75),
                flexDirection: 'row',
            }}
        >
            <Text style={{ color: textColor, fontWeight: '900' }}>{score}</Text>
        </View>
    );
};

export const ScoreHealthBar = ({
    score,
    scoreColors,
    textColor,
    heartColor = 'red',
    showScore = false,
}: ScoreHealthBarProps) => {
    const { colors } = useTheme();
    const leftHeart = 'heart';
    const middleHeart = score > scoreColors.red ? 'heart' : 'heart-outline';
    const rightHeart = score > scoreColors.yellow ? 'heart' : 'heart-outline';

    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '45%',
                padding: 3,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderBottomLeftRadius: BORDER_RADIUS,
                borderTopRightRadius: BORDER_RADIUS,
                backgroundColor: rgbToRgba(colors.primaryContainer, 0.75),
                flexDirection: 'row',
            }}
        >
            <MCIcons size={16} color={heartColor} name={leftHeart} />
            <MCIcons size={16} color={heartColor} name={middleHeart} />
            <MCIcons size={16} color={heartColor} name={rightHeart} />
            {showScore ? <Text style={{ color: textColor }}> {score}</Text> : null}
            {/* {leftHeart && <MCIcons name={'heart'} size={16} color={'red'} />}
            {middleHeart && <MCIcons name={'heart'} size={16} color={'red'} />}
            {rightHeart && <MCIcons name={'heart'} size={16} color={'red'} />} */}
        </View>
    );
};

type ScoreBarProps = {
    scores: ScoreDistribution[];
    isGradient?: boolean;
    isGraph?: boolean;
};
export const ScoreBar = ({ scores, isGradient, isGraph }: ScoreBarProps) => {
    const colors: string[] = scores?.map((stat) => {
        return ScoreColors[stat?.score];
    });
    const total_users = scores?.reduce((acc, curr) => acc + curr.amount, 0);
    const locations = scores?.reduce((acc, stat, index) => {
        const percentage = stat.amount / total_users;
        const previousValue = index > 0 ? acc[index - 1] : 0;
        acc.push(percentage + previousValue);
        return acc;
    }, []);
    const sortedLocations = locations?.sort((a, b) => a - b);

    const highestAmountObject = scores.reduce((prev, current) => {
        return prev.amount > current.amount ? prev : current;
    });
    let highestScore = highestAmountObject.score;

    // Check if all amounts are the same
    if (scores.every((item) => item.amount === highestAmountObject.amount)) {
        highestScore = 0;
    }
    return (
        <View style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
            {isGraph ? (
                <View
                    style={{
                        flexDirection: 'row',
                        height:
                            scores.length > 4
                                ? 230 * 0.4
                                : highestScore === 0 && scores.length === 1
                                ? 230 * 0.05
                                : 230 * 0.15,
                    }}
                >
                    {scores?.map((stat, idx) => (
                        <View
                            key={idx}
                            style={{
                                backgroundColor: ScoreColors[stat?.score].replaceAll('1)', '0.9)'),
                                height: `${(stat.amount / total_users) * 100}%`,
                                width: 150 / scores.length,
                                borderTopLeftRadius: idx === 0 ? 12 : 0,
                                borderTopRightRadius: idx === scores.length - 1 ? 12 : 0,
                            }}
                        />
                    ))}
                </View>
            ) : isGradient ? (
                <LinearGradient
                    colors={colors}
                    start={[0, 1]}
                    end={[1, 0]}
                    locations={sortedLocations}
                    style={{ width: '100%', height: 6, borderRadius: BORDER_RADIUS }}
                />
            ) : (
                <View style={{ flexDirection: 'row' }}>
                    {scores?.map((stat, idx) => (
                        <View
                            key={idx}
                            style={{
                                backgroundColor: ScoreColors[stat?.score],
                                height: 6,
                                width: `${(stat.amount / total_users) * 100}%`,
                                borderTopLeftRadius: idx === 0 ? 12 : 0,
                                borderBottomLeftRadius: idx === 0 ? 12 : 0,
                                borderTopRightRadius: idx === scores.length - 1 ? 12 : 0,
                                borderBottomRightRadius: idx === scores.length - 1 ? 12 : 0,
                            }}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

type ScoreVisualProps = {
    score: number;
    scoreVisualType: ScoreVisualType;
    scoreColors: { red: number; yellow: number };
    scoreDistributions: ScoreDistribution[];
};
export const ScoreVisual = ({
    score,
    scoreDistributions,
    scoreColors,
    scoreVisualType,
}: ScoreVisualProps) => {
    const { colors } = useTheme();
    const settings = useAppSelector((state) => state.persistedSettings);
    switch (scoreVisualType ?? settings.scoreVisualType) {
        case 'healthbar-full':
            return (
                <ScoreHealthBar
                    score={score}
                    scoreColors={scoreColors}
                    textColor={colors.onPrimaryContainer}
                    heartColor={colors.onPrimaryContainer}
                    showScore
                />
            );
        case 'healthbar':
            return (
                <ScoreHealthBar
                    score={score}
                    scoreColors={scoreColors}
                    textColor={colors.onPrimaryContainer}
                    heartColor={colors.onPrimaryContainer}
                />
            );
        case 'number':
            return (
                <ScoreIconText
                    showScore
                    score={score}
                    scoreColors={scoreColors}
                    textColor={colors.onPrimaryContainer}
                />
            );
        case 'bar':
            return <ScoreBar scores={scoreDistributions} />;
        case 'gradient-bar':
            return <ScoreBar scores={scoreDistributions} isGradient />;
        case 'bar-graph':
            return <ScoreBar scores={scoreDistributions} isGraph />;
    }
};
