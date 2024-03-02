import PaperHeader, { ListHeader } from '@/components/headers';
import AnimatedStack from '@/components/stack';
import { Slot, Stack } from 'expo-router';

const ListLayout = () => {
	return <AnimatedStack screenOptions={{ headerShown: false }} />;
};

export default ListLayout;
