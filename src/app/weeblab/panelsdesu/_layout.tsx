import { PaperHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { openWebBrowser } from '@/utils/webBrowser';
import { Stack } from 'expo-router';

const PanelsDesuLayout = () => {
	return (
		<AnimatedStack>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: 'PanelsDesu',
					header: (props) => (
						<PaperHeader
							{...props}
							mode="center-aligned"
							elevated
							actions={[
								{
									title: 'Open Website',
									icon: 'information-outline',
									onPress: () => openWebBrowser('https://panelsdesu.com/'),
								},
							]}
						/>
					),
				}}
			/>
			<Stack.Screen name="[panelId]" options={{ title: 'Panel Info' }} />
		</AnimatedStack>
	);
};

export default PanelsDesuLayout;
