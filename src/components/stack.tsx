import { useSettingsStore } from '@/store/settings/settingsStore';
import { Stack } from 'expo-router';

type StackProps = (typeof Stack)['defaultProps'];

const AnimatedStack = (props: StackProps) => {
	const { navAnimation } = useSettingsStore();
	return (
		<Stack
			{...props}
			screenOptions={{
				animation: navAnimation,
				...props.screenOptions,
			}}
		>
			{props.children}
		</Stack>
	);
};

export default AnimatedStack;
