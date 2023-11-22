import PaperHeader from '@/components/headers';
import { Slot, Stack } from 'expo-router';

const ListLayout = () => {
    return (
        <Stack screenOptions={{ title: 'List', header: (props) => <PaperHeader {...props} /> }} />
    );
};

export default ListLayout;
