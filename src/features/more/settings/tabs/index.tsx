import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { ListSubheader } from '../../../../components/titles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { useState } from 'react';
import { ExploreTabsDialog } from './components/dialogs';
import { setSettings } from '../settingsSlice';
import { ExploreTabsProps } from '../../../../navigation/types';

const DataSettingsScreen = () => {
    const dispatch = useDispatch();
    const { exploreTabs, exploreTabOrder } = useSelector(
        (state: RootState) => state.persistedSettings,
    );
    const [expTbsVis, setExpTbsVis] = useState<boolean>(false);

    const toggleExploreTabOptions = (isVis: boolean) => setExpTbsVis(isVis);
    const editExploreTabs = (tabs: (keyof ExploreTabsProps)[]) => {
        dispatch(setSettings({ exploreTabs: tabs }));
    };

    return (
        <ScrollView>
            <List.Section>
                <ListSubheader title="Displays" />
                <List.Item
                    title={'Explore Tabs'}
                    description={exploreTabOrder
                        .filter((item) => exploreTabs.includes(item))
                        .join(', ')}
                    descriptionStyle={{ textTransform: 'capitalize' }}
                    right={(props) => <List.Icon {...props} icon={'adjust'} />}
                    onPress={() => toggleExploreTabOptions(true)}
                />
            </List.Section>
            <ExploreTabsDialog vis={expTbsVis} toggleVis={toggleExploreTabOptions} />
        </ScrollView>
    );
};

export default DataSettingsScreen;
