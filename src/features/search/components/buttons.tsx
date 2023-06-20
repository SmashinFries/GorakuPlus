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
    filterOptions: ExploreMediaQueryVariables;
    updateFilter: UpdateFilter;
};

export const OnListSelector = ({ filterOptions, updateFilter }: DButtonProps) => {
    const [listSelect, setListSelect] = useState<number>(
        filterOptions.onList === true ? 0 : filterOptions.onList === false ? 3 : 1,
    );
    const listOptions: ListOptions[] = [
        {
            label: 'List Only',
            value: true,
            status: 'checked',
        },
        {
            label: 'All + List',
            value: false,
            status: 'unchecked',
        },
        {
            label: 'Exclude List',
            value: undefined,
            status: 'indeterminate',
        },
    ];

    useEffect(() => {
        console.log('listSelect: ', listSelect);
        updateFilter('onList', listOptions[listSelect].value);
    }, [listSelect]);

    return (
        <View>
            <Checkbox.Item
                label={listOptions[listSelect].label}
                status={listOptions[listSelect].status}
                position="leading"
                // uncheckedColor={'blue'}
                color={'green'}
                onPress={() => setListSelect((listSelect + 1) % 3)}
            />
        </View>
    );
};

export const NSFWSelector = ({ filterOptions, updateFilter }: DButtonProps) => {
    const [nsfwSelect, setNsfwSelect] = useState<boolean>(filterOptions.isAdult ?? false);
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
        updateFilter('isAdult', nsfwSelect);
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
