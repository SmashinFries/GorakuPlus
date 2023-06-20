import { View, useWindowDimensions } from 'react-native';
import { Button, ProgressBar, Text, useTheme } from 'react-native-paper';
import { AnilistIcon, MalIcon } from '../../../components/svgs';
import React from 'react';
import { getScoreColor } from '../../../utils';
import { ScoreContainer } from '../../../components/score';

// const ScoreRow = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <View
//             style={{
//                 flexDirection: 'row',
//                 alignItems: 'flex-end',
//                 justifyContent: 'center',
//                 marginVertical: 5,
//             }}
//         >
//             {children}
//         </View>
//     );
// };

// type ScoreProgressProps = {
//     score: number;
//     divider: number;
//     color: string;
//     title: string;
//     icon: 'ani' | 'mal';
// };
// const ScoreProgress = ({ score, divider, color, title, icon }: ScoreProgressProps) => {
//     const { width } = useWindowDimensions();
//     const progressbarWidth = width / 1.5;
//     const { dark } = useTheme();

//     return (
//         <View style={{ paddingHorizontal: 10 }}>
//             <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
//                 {icon === 'ani' ? (
//                     <AnilistIcon width={24} height={24} isDark={dark} />
//                 ) : (
//                     <MalIcon width={24} height={24} />
//                 )}
//                 <Text style={{ marginHorizontal: 10 }}>{title}</Text>
//             </View>
//             <ProgressBar
//                 style={{ width: progressbarWidth }}
//                 progress={score / divider}
//                 color={color}
//             />
//         </View>
//     );
// };

type ScoreViewProps = {
    meanScore: number;
    avgScore: number;
    malScore: number;
    userScore: number;
};

// const ScoreView = ({ avgScore, malScore, meanScore }: ScoreViewProps) => {
//     const { dark } = useTheme();

//     return (
//         <View>
//             {meanScore ? (
//                 <ScoreRow>
//                     <ScoreProgress
//                         title="Mean Score"
//                         score={meanScore}
//                         divider={100}
//                         color={getScoreColor(meanScore)}
//                         icon="ani"
//                     />
//                     <Text>{meanScore}</Text>
//                 </ScoreRow>
//             ) : null}
//             {avgScore ? (
//                 <ScoreRow>
//                     <ScoreProgress
//                         title="Average Score"
//                         score={avgScore}
//                         divider={100}
//                         color={getScoreColor(avgScore)}
//                         icon="ani"
//                     />
//                     <Text>{avgScore}</Text>
//                 </ScoreRow>
//             ) : null}
//             {malScore ? (
//                 <ScoreRow>
//                     <ScoreProgress
//                         title="MAL Score"
//                         score={malScore}
//                         divider={10}
//                         color={getScoreColor(malScore, true)}
//                         icon="mal"
//                     />
//                     <Text>{malScore?.toFixed(1)}</Text>
//                 </ScoreRow>
//             ) : null}
//         </View>
//     );
// };

export const ScoreCircles = ({
    avgScore,
    malScore,
    meanScore,
    userScore,
    scoreColors,
}: ScoreViewProps & { scoreColors: { red: number; yellow: number } }) => {
    const { width, height } = useWindowDimensions();
    const { colors } = useTheme();

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <ScoreContainer
                title={'Mean'}
                score={meanScore}
                opacity={0.35}
                color={getScoreColor(meanScore, scoreColors)}
            />
            <ScoreContainer
                title={'Average'}
                score={avgScore}
                opacity={0.35}
                color={getScoreColor(avgScore, scoreColors)}
            />
            <ScoreContainer
                title={'MAL'}
                score={malScore}
                opacity={0.35}
                color={getScoreColor(malScore, scoreColors, true)}
                isMal
            />
            {userScore && (
                <ScoreContainer
                    title={'Yours'}
                    score={userScore}
                    opacity={0.35}
                    color={getScoreColor(userScore, scoreColors)}
                />
            )}
        </View>
    );
};

export default ScoreCircles;
