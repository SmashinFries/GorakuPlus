import { View } from 'react-native';
import { AnilistIcon, MalIcon } from '../svgs';
import { Text } from 'react-native-paper';
import { getScoreColor } from '@/utils';

export const InstagramCardScore = ({
	type,
	score,
}: {
	type: 'anilist' | 'mal';
	score: number | null | undefined;
}) => {
	if (!score) return null;
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#1c1b1c',
				borderRadius: 18,
				paddingHorizontal: 6,
				height: 45,
				justifyContent: 'center',
				overflow: 'hidden',
				alignItems: 'center',
				marginRight: 12,
			}}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				{type === 'anilist' ? (
					<AnilistIcon isDark width={30} height={30} />
				) : (
					<MalIcon width={28} height={28} />
				)}
				<Text style={{ paddingHorizontal: 4, color: '#FFF' }}>
					{score}
					{type === 'anilist' ? '%' : ''}
				</Text>
			</View>
			<View
				style={{
					position: 'absolute',
					bottom: 0,
					alignSelf: 'center',
					width: '100%',
					height: 2,
					backgroundColor: getScoreColor(score, type === 'mal'),
					borderRadius: 18,
				}}
			/>
		</View>
	);
};
