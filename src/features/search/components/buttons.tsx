import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Checkbox, Text } from 'react-native-paper';
import { UpdateFilter } from '../types/types';
import { ExploreMediaQueryVariables } from '../../../app/services/anilist/generated-anilist';

type ListOptions = {
    label: string;
    value: boolean | null;
    status: 'checked' | 'unchecked' | 'indeterminate';
};

type DButtonProps = {
    onList: boolean | undefined;
    updateOnList: (onList: boolean | undefined) => void;
};

const listOptions: ListOptions[] = [
    {
        label: 'List Only',
        value: true,
        status: 'checked',
    },
    {
        label: 'All + List',
        value: undefined,
        status: 'unchecked',
    },
    {
        label: 'Exclude List',
        value: false,
        status: 'indeterminate',
    },
];

export const OnListSelector = ({ onList, updateOnList }: DButtonProps) => {
    const [listSelect, setListSelect] = useState<number>(
        onList === true ? 0 : onList === false ? 3 : 1,
    );

    useEffect(() => {
        updateOnList(listOptions[listSelect].value);
    }, [listSelect]);

    return (
        <View>
            <Checkbox.Item
                label={listOptions[listSelect]?.label}
                status={listOptions[listSelect]?.status}
                position="leading"
                // uncheckedColor={'blue'}
                color={'green'}
                onPress={() => setListSelect((listSelect + 1) % 3)}
            />
        </View>
    );
};

type NSFWSelectorProps = {
    isAdult: boolean | undefined;
    updateIsAdult: (isAdult: boolean | undefined) => void;
};
export const NSFWSelector = ({ isAdult, updateIsAdult }: NSFWSelectorProps) => {
    const [nsfwSelect, setNsfwSelect] = useState<boolean>(isAdult ?? false);
    const options = {
        0: {
            label: 'NSFW',
            color: 'red',
            icon: 'emoticon-devil',
        },
        1: {
            label: 'SFW',
            color: 'green',
            icon: 'cross',
        },
    };

    useEffect(() => {
        updateIsAdult(nsfwSelect);
    }, [nsfwSelect]);

    return (
        <View style={{ justifyContent: 'center' }}>
            <Button
                onPress={() => setNsfwSelect((prev) => !prev)}
                // textColor={options[nsfwSelect ? 1 : 0].color}
                icon={options[nsfwSelect ? 1 : 0].icon}
                // mode={'contained'}

                style={{ justifyContent: 'center', alignItems: 'center' }}
            >
                {options[nsfwSelect ? 1 : 0].label}
            </Button>
        </View>
    );
};

type PresetButtonProps = {
    onPress: () => void;
};
export const PresetButton = ({ onPress }: PresetButtonProps) => {
    const [icon, setIcon] = useState('bookmark-multiple-outline');
    return (
        <IconButton
            icon={icon}
            onPressIn={() => setIcon('bookmark-multiple')}
            onPressOut={() => setIcon('bookmark-multiple-outline')}
            onPress={() => onPress()}
        />
    );
};
