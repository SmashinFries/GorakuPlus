import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const MusicLayout = () => {
    return (
        <AnimatedStack
            screenOptions={{
                title: 'Music',
                header: (props) => <PaperHeader {...props} />,
            }}
        />
    );
};

export default MusicLayout;
