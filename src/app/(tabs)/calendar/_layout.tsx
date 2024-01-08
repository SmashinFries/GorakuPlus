import AnimatedStack from '@/components/stack';
import { Slot, Stack } from 'expo-router';

const CalendarLayout = () => {
    return <AnimatedStack screenOptions={{ headerShown: false }} />;
};

export default CalendarLayout;
