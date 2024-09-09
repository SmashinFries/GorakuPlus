import { useSettingsStore } from '@/store/settings/settingsStore';
import { Stack } from 'expo-router';
import PaperHeader from './headers';

type StackProps = (typeof Stack)['defaultProps'];

const AnimatedStack = (props: StackProps) => {
	const navAnimation = useSettingsStore((state) => state.navAnimation);
	return (
		<Stack
			{...props}
			screenOptions={{
				animation: navAnimation,
				header: (props) => <PaperHeader {...props} />,
				...props.screenOptions,
			}}
		>
			{props.children}
		</Stack>
	);
};

export default AnimatedStack;
