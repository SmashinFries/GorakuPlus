import PaperHeader from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';

const MusicLayout = () => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);
    return (
        <Stack
            screenOptions={{
                animation: navAnimation,
                title: 'Music',
                header: (props) => <PaperHeader {...props} />,
            }}
        />
    );
};

export default MusicLayout;
