import { useSettingsStore } from '@/store/settings/settingsStore';
import { Stack } from 'expo-router';
import PaperHeader from './headers';
import { useAppTheme } from '@/store/theme/themes';
import { useShallow } from 'zustand/react/shallow';

type StackProps = (typeof Stack)['defaultProps'];

const AnimatedStack = (props: StackProps) => {
	const { colors } = useAppTheme();
	const navAnimation = useSettingsStore(useShallow((state) => state.navAnimation));
	return (
		<Stack
			{...props}
			screenOptions={{
				contentStyle: { backgroundColor: colors.background },
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
