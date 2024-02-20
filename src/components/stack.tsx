import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

type StackProps = (typeof Stack)['defaultProps'];

const AnimatedStack = (props: StackProps) => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);
    return (
        <Stack
            {...props}
            screenOptions={{
                ...props.screenOptions,
                animation: navAnimation,
            }}
        >
            {props.children}
        </Stack>
    );
};

export default AnimatedStack;
