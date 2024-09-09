import { ScoreDistribution } from '@/api/anilist/__genereated__/gql';
import { ScoreColors, StatusColors } from '@/constants/colors';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { ScoreVisualType } from '@/store/settings/types';
import { useAppTheme } from '@/store/theme/themes';
import { rgbToRgba } from '@/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, useState } from 'react';
import { DimensionValue, View } from 'react-native';
import { Text, useTheme, Icon } from 'react-native-paper';

type ScoreHealthBarProps = {
	score: number;
	scoreColors: { red: number; yellow: number };
	heartColor?: string;
	showScore?: boolean;
	textColor?: string;
	width?: DimensionValue;
	horizontal?: boolean;
	borderRadius?: number;
};
type ScoreIconProps = ScoreHealthBarProps & { textColor: string; showScore?: boolean };
export const ScoreIconText = ({
	score,
	scoreColors,
	textColor,
	showScore,
	borderRadius = 12,
}: ScoreIconProps) => {
	const { colors } = useAppTheme();
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
				borderBottomLeftRadius: borderRadius,
				borderTopRightRadius: borderRadius,
				backgroundColor: rgbToRgba(colors.primaryContainer, 0.75),
				flexDirection: 'row',
			}}
		>
			<Text variant="labelMedium" style={{ color: textColor }}>
				{score}
			</Text>
		</View>
	);
};

export const ScoreHealthBar = ({
	score,
	textColor,
	heartColor = 'red',
	showScore = false,
	scoreColors,
	width = '45%',
	horizontal = false,
	borderRadius = 12,
}: ScoreHealthBarProps) => {
	const { colors } = useAppTheme();
	const leftHeart = 'heart';
	const middleHeart = score > scoreColors.red ? 'heart' : 'heart-outline';
	const rightHeart = score > scoreColors.yellow ? 'heart' : 'heart-outline';

	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				right: 0,
				padding: 3,
				alignItems: 'center',
				justifyContent: 'space-evenly',
				borderBottomLeftRadius: borderRadius,
				borderTopRightRadius: horizontal ? 0 : borderRadius,
				borderTopLeftRadius: horizontal ? borderRadius : 0,
				backgroundColor: rgbToRgba(colors.primaryContainer, 0.85),
				flexDirection: 'row',
			}}
		>
			<Icon size={12} color={heartColor} source={leftHeart} />
			<Icon size={12} color={heartColor} source={middleHeart} />
			<Icon size={12} color={heartColor} source={rightHeart} />
			{showScore ? (
				<Text variant="labelMedium" style={{ color: textColor }}>
					{' '}
					{score}
				</Text>
			) : null}
			{/* {leftHeart && <MCIcons name={'heart'} size={16} color={'red'} />}
            {middleHeart && <MCIcons name={'heart'} size={16} color={'red'} />}
            {rightHeart && <MCIcons name={'heart'} size={16} color={'red'} />} */}
		</View>
	);
};

type ScoreBarProps = {
	height: number;
	scores: ScoreDistribution[];
	isGradient?: boolean;
	isGraph?: boolean;
	borderRadius?: number;
};
export const ScoreBar = ({ scores, isGradient, isGraph, borderRadius = 12 }: ScoreBarProps) => {
	const [card_width, setCardWidth] = useState(0);
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
		<View
			onLayout={(e) => setCardWidth(e.nativeEvent.layout.width)}
			style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
		>
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
								width: card_width / scores.length,
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
					style={{ width: '100%', height: 6, borderRadius: borderRadius }}
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
								borderTopLeftRadius: idx === 0 ? borderRadius : 0,
								borderBottomLeftRadius: idx === 0 ? borderRadius : 0,
								borderTopRightRadius: idx === scores.length - 1 ? borderRadius : 0,
								borderBottomRightRadius:
									idx === scores.length - 1 ? borderRadius : 0,
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
	scoreColors?: { red: number; yellow: number };
	scoreDistributions: ScoreDistribution[];
	height?: number;
	width?: DimensionValue;
	horizontal?: boolean;
	borderRadius?: number;
};
export const ScoreVisual = ({
	score,
	scoreDistributions,
	scoreColors,
	scoreVisualType,
	height,
	width,
	horizontal = false,
	borderRadius = 12,
}: ScoreVisualProps) => {
	const { colors } = useAppTheme();
	const savedScoreVisualType = useSettingsStore((state) => state.scoreVisualType);
	const savedScoreColors = useSettingsStore((state) => state.scoreColors);

	switch (scoreVisualType ?? savedScoreVisualType) {
		case 'healthbar-full':
			return (
				<ScoreHealthBar
					score={score}
					scoreColors={scoreColors ?? savedScoreColors}
					textColor={colors.onPrimaryContainer}
					heartColor={colors.onPrimaryContainer}
					width={width ?? '45%'}
					horizontal={horizontal}
					borderRadius={borderRadius}
					showScore
				/>
			);
		case 'healthbar':
			return (
				<ScoreHealthBar
					score={score}
					scoreColors={scoreColors ?? savedScoreColors}
					textColor={colors.onPrimaryContainer}
					heartColor={colors.onPrimaryContainer}
					width={width ?? '45%'}
					borderRadius={borderRadius}
				/>
			);
		case 'number':
			return (
				<ScoreIconText
					showScore
					score={score}
					scoreColors={scoreColors ?? savedScoreColors}
					textColor={colors.onPrimaryContainer}
					borderRadius={borderRadius}
				/>
			);
		case 'bar':
			return <ScoreBar scores={scoreDistributions} height={height} />;
		case 'gradient-bar':
			return <ScoreBar scores={scoreDistributions} isGradient height={height} />;
		case 'bar-graph':
			return <ScoreBar scores={scoreDistributions} isGraph height={height} />;
	}
};
