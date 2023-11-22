import PaperHeader from '@/components/headers';
import { useAppSelector } from '@/store/hooks';
import { Slot } from 'expo-router';

const NewsLayout = () => {
    const { navAnimation } = useAppSelector((state) => state.persistedSettings);
    return (
        <Slot
            screenOptions={{
                animation: navAnimation,
                header: (props) => <PaperHeader {...props} />,
            }}
        />
    );
};

export default NewsLayout;
