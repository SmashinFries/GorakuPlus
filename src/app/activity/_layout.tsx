import PaperHeader from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const ActivityListLayout = () => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);
    return (
        <Stack
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
                title: 'Activity',
            }}
        />
    );
};

export default ActivityListLayout;
