import { View, useWindowDimensions } from 'react-native';
import React from 'react';
import { ScoreContainer } from '@/components/score';
import { getScoreColor } from '@/utils';

type ScoreViewProps = {
    meanScore: number;
    avgScore: number;
    malScore: number;
    userScore: number;
};
export const ScoreCircles = ({
	avgScore,
	malScore,
	meanScore,
	userScore,
	scoreColors,
}: ScoreViewProps & { scoreColors: { red: number; yellow: number } }) => {
	return (
		<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15 }}>
			<ScoreContainer
				title={'Mean'}
				score={meanScore}
				opacity={0.35}
				color={getScoreColor(meanScore, scoreColors)}
				delay={870}
			/>
			<ScoreContainer
				title={'Average'}
				score={avgScore}
				opacity={0.35}
				color={getScoreColor(avgScore, scoreColors)}
				delay={835}
			/>
			<ScoreContainer
				title={'MAL'}
				score={malScore}
				opacity={0.35}
				color={getScoreColor(malScore, scoreColors, true)}
				delay={800}
				isMal
			/>
			{/* {userScore ? (
                <ScoreContainer
                    title={'Yours'}
                    score={userScore}
                    opacity={0.35}
                    color={getScoreColor(userScore, scoreColors, true)}
                    // color={'red'}
                    delay={780}
                    isMal
                />
            ) : null} */}
		</View>
	);
};

export default ScoreCircles;
