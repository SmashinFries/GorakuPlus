import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { TextInput, Menu, Text, useTheme } from 'react-native-paper';
import {
    ExploreMediaQueryVariables,
    MediaFormat,
    MediaSeason,
    MediaSort,
    MediaStatus,
    MediaType,
} from '@/store/services/anilist/generated-anilist';
// import { TextInputLabelProp } from 'react-native-paper/lib/typescript/src/components/TextInput/types';
import {
    ANIME_FORMATS,
    COUNTRY_OPTIONS,
    MANGA_FORMATS,
    animeSort,
    mangaNovelSort,
    mediaStatusOptions,
    sortMap,
} from '@/constants/mediaConsts';
import { arrayRange } from '@/utils/numbers';
import { SortCategories } from '@/constants/anilist';

type DropdownProps = {
    visible: boolean;
    onOpen: () => void;
    onClose: () => void;
    label: string;
    value: string;
    children: React.ReactNode;
    left?: React.ReactNode;
    anchorPosition?: 'top' | 'bottom';
};
export const Dropdown = ({
    visible,
    onClose,
    onOpen,
    label,
    value,
    left,
    children,
    anchorPosition = 'bottom',
}: DropdownProps) => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, marginVertical: 5 }}>
            <Menu
                visible={visible}
                onDismiss={onClose}
                anchorPosition={anchorPosition}
                anchor={
                    <TextInput
                        label={
                            <Text
                                style={{
                                    textTransform: 'capitalize',
                                    // backgroundColor: colors.secondaryContainer,
                                }}
                            >
                                {label.replaceAll('_', ' ')}
                            </Text>
                        }
                        mode="outlined"
                        value={value.replaceAll('_', ' ').replaceAll('DESC', '')}
                        contentStyle={{
                            textTransform: 'capitalize',
                            textAlign: 'center',
                            color: colors.onSurface,
                        }}
                        outlineColor={colors.secondary}
                        style={{
                            flex: 1,
                            marginHorizontal: 6,
                            backgroundColor: colors.elevation.level5,
                        }}
                        outlineStyle={{ borderRadius: 16 }}
                        editable={false}
                        right={<TextInput.Icon icon="menu-down" onPress={onOpen} />}
                        left={left ?? null}
                    />
                }
            >
                {children}
            </Menu>
        </View>
    );
};

const DropdownMem = React.memo(Dropdown);

type SortDropdownProps = {
    current: MediaType;
    updateSort: (sort: MediaSort) => void;
    sort: MediaSort[];
};
export const SortDropdown = ({ current, sort, updateSort }: SortDropdownProps) => {
    // const categories = current === 'anime' ? animeSort : mangaNovelSort;
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState<'desc' | 'asc'>(sort[0].includes('DESC') ? 'desc' : 'asc');

    const openMenu = useCallback(() => setVisible(true), []);
    const closeMenu = useCallback(() => setVisible(false), []);

    const toggleSortMode = useCallback(() => {
        setMode((prev) => (prev === 'desc' ? 'asc' : 'desc'));
        const newSort = flipSort();
        updateSort(newSort);
    }, []);

    const flipSort = useCallback(() => {
        const temp = [...sort];
        temp.forEach((s, idx) => {
            if (s.includes('_DESC')) {
                temp[idx] = s.replace('_DESC', '');
            } else {
                temp[idx] = s + '_DESC';
            }
        });
        return temp;
    }, []);

    return (
        <DropdownMem
            visible={visible}
            onOpen={openMenu}
            onClose={closeMenu}
            label={'Sort'}
            value={sort[0].includes('ID') ? sort[1] : sort[0]}
            // onMenuPressAction={(opt: MediaSort) => updateFilter('sort', switchModeValue(opt))}
            left={
                <TextInput.Icon
                    icon={mode === 'desc' ? 'sort-descending' : 'sort-ascending'}
                    // disabled={sort === MediaSort.SearchMatch}
                    onPress={toggleSortMode}
                />
            }
        >
            {Object.keys(sortMap[current]).map((category: SortCategories, idx) => (
                <Menu.Item
                    key={idx}
                    disabled={
                        category === 'Start Date' || category === 'End Date'
                            ? sortMap[current][category][mode][1] === sort[1]
                            : sortMap[current][category][mode][0] === sort[0]
                    }
                    onPress={() => {
                        closeMenu();
                        updateSort(sortMap[current][category][mode]);
                    }}
                    titleStyle={{ textTransform: 'capitalize' }}
                    title={category}
                />
            ))}
        </DropdownMem>
    );
};

export const SortDropdownMem = React.memo(SortDropdown);

type StatusDropdownProps = {
    updateStatus: (status: MediaStatus | null) => void;
    removeStatus: () => void;
    status: MediaStatus;
};
export const StatusDropdown = ({ status, updateStatus, removeStatus }: StatusDropdownProps) => {
    const categories = ['ANY', ...mediaStatusOptions];

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <DropdownMem
            label="Status"
            visible={visible}
            onOpen={openMenu}
            onClose={closeMenu}
            value={status?.toLowerCase() ?? 'ANY'.toLowerCase()}
            // onMenuPressAction={(opt: MediaStatus | 'ANY') =>
            //     updateStatus(current, opt === 'ANY' ? { status: undefined } : { status: opt })
            // }
        >
            {categories.map((category: MediaStatus | 'ANY', idx) => (
                <Menu.Item
                    key={idx}
                    disabled={(category === 'ANY' && status === null) || category === status}
                    onPress={() => {
                        closeMenu();
                        if (category === 'ANY') {
                            removeStatus();
                        } else {
                            updateStatus(category);
                        }
                    }}
                    titleStyle={{ textTransform: 'capitalize' }}
                    title={category.replaceAll('_', ' ')}
                />
            ))}
        </DropdownMem>
    );
};

export const StatusDropdownMem = React.memo(StatusDropdown);

type FormatDropdownProps = {
    current: MediaType;
    updateFormat: (format: MediaFormat | undefined) => void;
    removeFormat: () => void;
    formatValue: MediaFormat;
};
export const FormatDropdown = ({
    current,
    formatValue,
    removeFormat,
    updateFormat,
}: FormatDropdownProps) => {
    const categories = useMemo(
        () => (current === MediaType.Anime ? ['ANY', ...ANIME_FORMATS] : ['ANY', ...MANGA_FORMATS]),
        [current],
    );

    const [visible, setVisible] = useState(false);

    const openMenu = useCallback(() => setVisible(true), []);
    const closeMenu = useCallback(() => setVisible(false), []);

    useEffect(() => {
        if (!categories.includes(formatValue)) {
            updateFormat(undefined);
        }
    }, [categories]);

    return (
        <DropdownMem
            visible={visible}
            label="Format"
            value={formatValue ?? 'ANY'.toLowerCase()}
            onOpen={openMenu}
            onClose={closeMenu}
            // onMenuPressAction={(opt: MediaFormat) => updateFormat(mediaType, { format: opt })}
        >
            {categories.map((category: MediaFormat | 'ANY', idx) => (
                <Menu.Item
                    key={idx}
                    disabled={
                        (category === 'ANY' && formatValue === undefined) ||
                        category === formatValue
                    }
                    onPress={() => {
                        closeMenu();
                        if (category === 'ANY') {
                            removeFormat();
                        } else {
                            updateFormat(category);
                        }
                    }}
                    titleStyle={{ textTransform: 'capitalize' }}
                    title={category.replaceAll('_', ' ')}
                />
            ))}
        </DropdownMem>
    );
};

export const FormatDropdownMem = React.memo(FormatDropdown);

type SeasonDropdownProps = {
    updateSeason: (season: MediaSeason | undefined) => void;
    seasonValue: string;
};
export const SeasonDropdown = ({ seasonValue, updateSeason }: SeasonDropdownProps) => {
    const seasons = ['ANY', ...Object.values(MediaSeason)];
    const [visible, setVisible] = useState(false);

    const openMenu = useCallback(() => setVisible(true), []);
    const closeMenu = useCallback(() => setVisible(false), []);

    return (
        <DropdownMem
            visible={visible}
            label="Season"
            value={seasonValue ?? 'ANY'.toLowerCase()}
            onOpen={openMenu}
            onClose={closeMenu}
            // options={Object.values(MediaSeason)}
            // onMenuPressAction={(opt: MediaSeason) => updateSeason('anime', { season: opt })}
        >
            {seasons.map((season: MediaSeason | 'ANY', idx) => (
                <Menu.Item
                    key={idx}
                    disabled={
                        (season === 'ANY' && seasonValue === undefined) || season === seasonValue
                    }
                    onPress={() => {
                        closeMenu();
                        updateSeason(season !== 'ANY' ? season : undefined);
                    }}
                    titleStyle={{ textTransform: 'capitalize' }}
                    title={season.replaceAll('_', ' ')}
                />
            ))}
        </DropdownMem>
    );
};

export const SeasonDropdownMem = React.memo(SeasonDropdown);

type YearDropdownProps = {
    updateSeasonYear: (year: number | undefined) => void;
    yearValue: ExploreMediaQueryVariables['seasonYear'];
};
export const YearDropdown = ({ yearValue, updateSeasonYear }: YearDropdownProps) => {
    const range = arrayRange(1970, new Date().getFullYear() + 1, 1).reverse();
    const years = ['ANY'].concat(range);

    const [visible, setVisible] = useState(false);

    const openMenu = useCallback(() => setVisible(true), []);
    const closeMenu = useCallback(() => setVisible(false), []);

    return (
        <DropdownMem
            visible={visible}
            label="Year"
            value={yearValue?.toString() ?? 'ANY'}
            onOpen={openMenu}
            onClose={closeMenu}
        >
            {years.map((year: string, idx) => (
                <Menu.Item
                    key={idx}
                    disabled={
                        (year === 'ANY' && yearValue === undefined) || Number(year) === yearValue
                    }
                    onPress={() => {
                        closeMenu();
                        updateSeasonYear(year !== 'ANY' ? Number(year) : undefined);
                    }}
                    titleStyle={{ textTransform: 'capitalize' }}
                    title={year}
                />
            ))}
        </DropdownMem>
    );
};

export const YearDropdownMem = React.memo(YearDropdown);

type CountryDropdownProps = {
    updateCountry: (c_code: string) => void;
    removeCountry: () => void;
    countryValue: string;
};
export const CountryDropdown = ({
    countryValue,
    removeCountry,
    updateCountry,
}: CountryDropdownProps) => {
    const categories = useMemo(() => Object.keys(COUNTRY_OPTIONS), []);
    const [visible, setVisible] = useState(false);
    const [cValue, setCValue] = useState<string | undefined>(countryValue ?? 'ANY');

    const openMenu = useCallback(() => setVisible(true), []);
    const closeMenu = useCallback(() => setVisible(false), []);

    useEffect(() => {
        if (!categories.includes(countryValue)) {
            removeCountry();
        }
    }, [categories]);

    return (
        <DropdownMem
            visible={visible}
            label="Country"
            value={COUNTRY_OPTIONS[cValue]['name']}
            onOpen={openMenu}
            onClose={closeMenu}
            // onMenuPressAction={(opt: MediaFormat) => updateFormat(mediaType, { format: opt })}
        >
            {categories.map((c_code: string, idx) => (
                <Menu.Item
                    key={idx}
                    disabled={(c_code === 'ANY' && cValue === undefined) || c_code === cValue}
                    onPress={() => {
                        closeMenu();
                        if (c_code === 'ANY') {
                            setCValue('ANY');
                            removeCountry();
                        } else {
                            setCValue(c_code);
                            updateCountry(c_code);
                        }
                    }}
                    titleStyle={{ textTransform: 'capitalize' }}
                    title={COUNTRY_OPTIONS[c_code]['name']}
                />
            ))}
        </DropdownMem>
    );
};

export const CountryDropdownMem = React.memo(CountryDropdown);
