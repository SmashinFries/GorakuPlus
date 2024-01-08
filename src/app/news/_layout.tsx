import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';

const NewsLayout = () => {
    return (
        <AnimatedStack
            screenOptions={{
                header: (props) => <PaperHeader {...props} />,
                title: 'News',
            }}
        />
    );
};

export default NewsLayout;
