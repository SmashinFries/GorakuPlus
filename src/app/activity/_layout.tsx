import PaperHeader from '@/components/headers';
import AnimatedStack from '@/components/stack';

const ActivityListLayout = () => {
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
