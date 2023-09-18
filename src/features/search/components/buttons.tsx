import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Checkbox, Text, useTheme, Switch } from 'react-native-paper';
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

export const OnListSelector = ({ onList, updateOnList }: DButtonProps) => {
    const listOptions: ListOptions[] = useMemo(
        () => [
            {
                label: 'List',
                value: true,
                status: 'checked',
            },
            {
                label: 'List',
                value: undefined,
                status: 'unchecked',
            },
            {
                label: 'List',
                value: false,
                status: 'indeterminate',
            },
        ],
        [],
    );

    const [listSelect, setListSelect] = useState<number>(
        onList === true ? 0 : onList === false ? 2 : 1,
    );

    useEffect(() => {
        updateOnList(listOptions[listSelect]?.value);
    }, [listSelect]);

    return (
        <View style={{ maxWidth: '40%' }}>
            <Checkbox.Item
                label={listOptions[listSelect]?.label}
                status={listOptions[listSelect]?.status}
                position="leading"
                onPress={() => setListSelect((listSelect + 1) % 3)}
            />
        </View>
    );
};

type LicensedSelectorProps = {
    isLicensed: boolean | undefined;
    updateOnList: (isLicensed: boolean | undefined) => void;
};

export const LicensedSelector = ({ isLicensed, updateOnList }: LicensedSelectorProps) => {
    const licOptions: ListOptions[] = useMemo(
        () => [
            {
                label: 'Doujin',
                value: true,
                status: 'indeterminate',
            },
            {
                label: 'Doujin',
                value: undefined,
                status: 'unchecked',
            },
            {
                label: 'Doujin',
                value: false,
                status: 'checked',
            },
        ],
        [],
    );

    const [listSelect, setListSelect] = useState<number>(
        isLicensed === false ? 2 : isLicensed === true ? 0 : 1,
    );

    useEffect(() => {
        updateOnList(licOptions[listSelect]?.value);
    }, [listSelect]);

    return (
        <View style={{ maxWidth: '40%' }}>
            <Checkbox.Item
                label={licOptions[listSelect]?.label}
                status={licOptions[listSelect]?.status}
                position="leading"
                onPress={() => setListSelect((listSelect + 1) % 3)}
            />
        </View>
    );
};

type NSFWSelectorProps = {
    isAdult: boolean | undefined;
    updateIsAdult: (allowNSFW: boolean | undefined) => void;
};
export const NSFWSelector = ({ isAdult = false, updateIsAdult }: NSFWSelectorProps) => {
    const { colors } = useTheme();
    const [nsfwSelect, setNsfwSelect] = useState<boolean>(isAdult);
    const options = {
        0: {
            label: 'Adult',
            color: 'red',
            icon: 'emoticon-devil',
        },
        1: {
            label: 'Adult',
            color: 'green',
            icon: 'cross',
        },
    };

    useEffect(() => {
        updateIsAdult(nsfwSelect);
    }, [nsfwSelect]);

    return (
        <View style={{}}>
            <Button
                onPress={() => setNsfwSelect((prev) => !prev)}
                // textColor={options[nsfwSelect ? 1 : 0].color}
                icon={options[nsfwSelect ? 0 : 1].icon}
                // mode={'contained'}
                textColor={colors.onSecondaryContainer}
                style={{ justifyContent: 'center', alignItems: 'center' }}
            >
                {options[nsfwSelect ? 0 : 1].label}
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

type TagBanSwitchProps = {
    initialState: boolean;
    totalBanned: number;
    onPress: (value: boolean) => void;
};
export const TagBanSwitch = ({ onPress, totalBanned, initialState }: TagBanSwitchProps) => {
    const [state, setState] = useState<boolean>(initialState);
    const onSwitch = useCallback((value: boolean) => {
        setState(value);
        onPress(value);
    }, []);
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch value={state} onValueChange={onSwitch} />
            <Text>Blacklist{totalBanned && totalBanned > 0 ? ` (${totalBanned})` : ''}</Text>
        </View>
    );
};
