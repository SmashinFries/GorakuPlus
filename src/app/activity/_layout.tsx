import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const ActivityListLayout = () => {
    // const { navAnimation } = useAppSelector((state) => state.persistedSettings);
    return (
        <AnimatedStack
            screenOptions={{
                header: (props) => <PaperHeader {...props} />,
                title: 'Activity',
            }}
        />
    );
};

export default ActivityListLayout;
