import { MotiView } from 'moti';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

type GeneralStatBlockProps = {
	icon: string;
	title: string;
	value: number | string;
};
export const GeneralStatBlock = ({ icon, title, value }: GeneralStatBlockProps) => {
	const { colors } = useTheme();
	return (
		<MotiView style={{ alignItems: 'flex-start', width: '50%', padding: 15 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<IconButton
					style={
						{
							// transform: [{ rotate: title === 'Standard Deviation' ? '-45deg' : '0deg' }],
						}
					}
					icon={icon}
				/>
				<View style={{ alignItems: 'flex-start' }}>
					<Text style={{ color: colors.primary }} variant="titleLarge">
						{value}
					</Text>
					<Text>{title}</Text>
				</View>
			</View>
		</MotiView>
	);
};
