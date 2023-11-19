import PaperHeader from '@/components/headers';
import { Stack } from 'expo-router';

const StatisticsLayout = () => {
    return (
        <Stack
            screenOptions={{ title: 'Statistics', header: (props) => <PaperHeader {...props} /> }}
        />
    );
};

export default StatisticsLayout;
