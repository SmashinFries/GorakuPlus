import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';

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
