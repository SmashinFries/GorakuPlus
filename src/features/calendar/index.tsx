import { View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { getWeekStartEnd } from '../../utils';
import { CalendarTabs } from './components/tabs';
import PaperHeader from '../../components/headers';

const CalendarScreen = ({ navigation, route }) => {
    return (
        <>
            <CalendarTabs />
        </>
    );
};

export default CalendarScreen;
