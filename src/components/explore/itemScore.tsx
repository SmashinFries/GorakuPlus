import { Text } from 'react-native-paper';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ScoreHealthBarProps = {
    score: number;
    scoreColors: { red: number; yellow: number };
    heartColor?: string;
    showScore?: boolean;
    textColor?: string;
};
type ScoreIconProps = ScoreHealthBarProps & { textColor: string; showScore?: boolean };

export const ScoreIconText = ({ score, scoreColors, textColor, showScore }: ScoreIconProps) => {
    if (!score) return null;
    return (
        <>
            <MCIcons
                size={16}
                color={'red'}
                name={
                    score > scoreColors.yellow
                        ? 'heart'
                        : score < scoreColors.yellow && score > scoreColors.red
                        ? 'heart-half-full'
                        : 'heart-outline'
                }
            />
            {showScore ? <Text style={{ color: textColor }}>{score}</Text> : null}
        </>
    );
};

export const ScoreHealthBar = ({
    score,
    scoreColors,
    textColor,
    heartColor = 'red',
    showScore = false,
}: ScoreHealthBarProps) => {
    const leftHeart = 'heart';
    const middleHeart = score > scoreColors.red ? 'heart' : 'heart-outline';
    const rightHeart = score > scoreColors.yellow ? 'heart' : 'heart-outline';
    // const leftHeart = score > scoreColors.red;
    // const middleHeart = score > scoreColors.red;
    // const rightHeart = score > scoreColors.yellow;

    return (
        <>
            <MCIcons size={16} color={heartColor} name={leftHeart} />
            <MCIcons size={16} color={heartColor} name={middleHeart} />
            <MCIcons size={16} color={heartColor} name={rightHeart} />
            {showScore ? <Text style={{ color: textColor }}> {score}</Text> : null}
            {/* {leftHeart && <MCIcons name={'heart'} size={16} color={'red'} />}
            {middleHeart && <MCIcons name={'heart'} size={16} color={'red'} />}
            {rightHeart && <MCIcons name={'heart'} size={16} color={'red'} />} */}
        </>
    );
};
