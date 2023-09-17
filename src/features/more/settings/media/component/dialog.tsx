import { Dialog, Text, RadioButton, Button, Chip, Checkbox, IconButton } from 'react-native-paper';
import { useCallback, useState } from 'react';
import { setSettings } from '../../settingsSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { BasicDialogProps } from '../../../../../types';
import { ExploreTabsProps } from '../../../../../navigation/types';
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from 'react-native-draggable-flatlist';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type DefaultDescDialogProps = BasicDialogProps & {
    defaultValue: 'ani' | 'mal';
};
export const DefaultDescDialog = ({ defaultValue, visible, onDismiss }: DefaultDescDialogProps) => {
    const [value, setValue] = useState<'ani' | 'mal'>(defaultValue);
    const dispatch = useAppDispatch();

    const onDone = useCallback(() => {
        dispatch(setSettings({ entryType: 'defaultDescription', value: value }));
        onDismiss();
    }, [value]);

    const onCancel = useCallback(() => {
        onDismiss();
        setValue(defaultValue);
    }, []);

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Default Description</Dialog.Title>
            <Dialog.Content>
                <RadioButton.Group
                    value={value}
                    onValueChange={(val: 'ani' | 'mal') => setValue(val)}
                >
                    <RadioButton.Item label="AniList" value="ani" />
                    <RadioButton.Item label="MyAnimeList" value="mal" />
                </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onCancel}>Cancel</Button>
                <Button onPress={onDone}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

type ExploreTabsDialogProps = {
    vis: boolean;
    toggleVis: (isVis: boolean) => void;
};
export const ExploreTabsDialog = ({ vis, toggleVis }: ExploreTabsDialogProps) => {
    const dispatch = useAppDispatch();
    const { exploreTabs, exploreTabOrder } = useAppSelector((state) => state.persistedSettings);

    const [tabOrder, setTabOrder] = useState<(keyof ExploreTabsProps)[]>(exploreTabOrder);
    const [validTabs, setValidTabs] = useState<(keyof ExploreTabsProps)[]>(exploreTabs);

    const hideDialog = () => toggleVis(false);

    const onDone = () => {
        updateTabOrder(tabOrder);
        editExploreTabs(validTabs);
        hideDialog();
    };

    const editExploreTabs = (tabs: string[]) => {
        dispatch(setSettings({ entryType: 'exploreTabs', value: tabs }));
    };

    const updateTabOrder = (tabs: string[]) => {
        dispatch(setSettings({ entryType: 'exploreTabOrder', value: tabs }));
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
    );
};

// const styles = StyleSheet.create({
//     rowItem: {
//         height: 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     text: {
//         color: 'white',
//         fontSize: 24,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
// });
