import PaperHeader, { ListHeader } from '@/components/headers';
import { Slot, Stack } from 'expo-router';

const ListLayout = () => {
    return <Stack screenOptions={{ headerShown: false }} />;
};

export default ListLayout;
