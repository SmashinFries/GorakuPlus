import { Dialog, Portal, Checkbox, Text, Button, IconButton } from 'react-native-paper';
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from 'react-native-draggable-flatlist';
import { ExploreTabsProps } from '../../../../../navigation/types';
import { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../app/store';
import { setSettings } from '../../settingsSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type ExploreTabsDialogProps = {
    vis: boolean;
    toggleVis: (isVis: boolean) => void;
};
export const ExploreTabsDialog = ({ vis, toggleVis }: ExploreTabsDialogProps) => {
    const dispatch = useDispatch();
    const { exploreTabs, exploreTabOrder } = useSelector(
        (state: RootState) => state.persistedSettings,
    );

    const [tabOrder, setTabOrder] = useState<(keyof ExploreTabsProps)[]>(exploreTabOrder);
    const [validTabs, setValidTabs] = useState<(keyof ExploreTabsProps)[]>(exploreTabs);

    const hideDialog = () => toggleVis(false);

    const onDone = () => {
        updateTabOrder(tabOrder);
        editExploreTabs(validTabs);
        hideDialog();
    };

    const editExploreTabs = (tabs: string[]) => {
        dispatch(setSettings({ exploreTabs: tabs }));
    };

    const updateTabOrder = (tabs: string[]) => {
        dispatch(setSettings({ exploreTabOrder: tabs }));
    };

    const renderItem = ({ item, drag, isActive }: RenderItemParams<keyof ExploreTabsProps>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                    onPress={() =>
                        setValidTabs(
                            validTabs.includes(item)
                                ? validTabs.filter((tab) => tab !== item)
                                : [...validTabs, item],
                        )
                    }
                    activeOpacity={1}
                    disabled={isActive}
                >
                    {/* <Checkbox.Item
                        label={item}
                        disabled={isActive}
                        status={exploreTabs.includes(item) ? 'checked' : 'unchecked'}
                    /> */}
                    <Text style={{ textTransform: 'capitalize', paddingLeft: 15 }}>{item}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            // disabled={isActive}
                            status={validTabs.includes(item) ? 'checked' : 'unchecked'}
                        />
                        <IconButton icon="drag-vertical" onLongPress={drag} />
                    </View>
                    {/* <Text>{item}</Text> */}
                </TouchableOpacity>
            </ScaleDecorator>
            // <ScaleDecorator>
            //     <TouchableOpacity
            //         activeOpacity={1}
            //         onLongPress={drag}
            //         disabled={isActive}
            //         style={[styles.rowItem, { backgroundColor: isActive ? 'red' : 'blue' }]}
            //     >
            //         <Text style={styles.text}>{item}</Text>
            //     </TouchableOpacity>
            // </ScaleDecorator>
        );
    };

    return (
        <Portal>
            <Dialog visible={vis} onDismiss={hideDialog}>
                <Dialog.Title>Edit Explore Tabs</Dialog.Title>
                <Dialog.Content style={{ overflow: 'hidden' }}>
                    <GestureHandlerRootView>
                        <DraggableFlatList
                            data={tabOrder}
                            renderItem={renderItem}
                            keyExtractor={(item, idx) => idx.toString()}
                            onDragEnd={({ data }) => {
                                console.log('Drag Ended!');
                                setTabOrder(data);
                            }}
                        />
                    </GestureHandlerRootView>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={onDone}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    rowItem: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
