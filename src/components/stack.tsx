import { useSettingsStore } from '@/store/settings/settingsStore';
import { Stack } from 'expo-router';
import { useAppTheme } from '@/store/theme/themes';
import { useShallow } from 'zustand/react/shallow';
import { PaperHeader } from './headers';
import { ComponentProps } from 'react';

type StackProps = ComponentProps<typeof Stack>;

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
				statusBarTranslucent: true,
				statusBarAnimation: 'fade',
				statusBarBackgroundColor: 'transparent',
				...props?.screenOptions,
			}}
		>
			{props?.children}
		</Stack>
	);
};

export default AnimatedStack;
