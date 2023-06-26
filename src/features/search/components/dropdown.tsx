import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TextInput, Menu } from 'react-native-paper';
import { SortModes, UpdateFilter } from '../types/types';
import {
    ExploreMediaQueryVariables,
    MediaFormat,
    MediaSeason,
    MediaSort,
    MediaStatus,
    MediaType,
} from '../../../app/services/anilist/generated-anilist';
// import { TextInputLabelProp } from 'react-native-paper/lib/typescript/src/components/TextInput/types';
import { captilize } from '../../../utils/text';
import { FilterTypes, MediaSearchSelection, SortCategories } from '../types';
import {
    ANIME_FORMATS,
    MANGA_FORMATS,
    NOVEL_FORMATS,
    animeSort,
    mangaNovelSort,
    mediaStatusOptions,
} from '../constants/mediaConsts';
import { arrayRange } from '../../../utils/numbers';
import { FilterState, changeSort } from '../filterSlice';
import { useFilter } from '../hooks/filter';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';

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
    return (
        <View style={{ flex: 1 }}>
            <Menu
                visible={visible}
                onDismiss={onClose}
                anchorPosition={anchorPosition}
                anchor={
                    <TextInput
                        label={captilize(label).replaceAll('_', ' ')}
                        mode="outlined"
                        value={value}
                        contentStyle={{ textTransform: 'capitalize' }}
                        onPressIn={() => console.log('TEST')}
                        onFocus={() => console.log('TEST_FOCUS')}
                        style={{
                            flex: 1,
                            maxWidth: 200,
                            marginHorizontal: 6,
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

type SortDropdownProps = {
    current: FilterTypes;
    updateSort: (
        mode: FilterState['sort']['mode'],
        category: FilterState['sort']['category'],
    ) => void;
    sortData: FilterState['sort'];
};
export const SortDropdown = ({ current, sortData, updateSort }: SortDropdownProps) => {
    const categories = current === 'anime' ? animeSort : mangaNovelSort;
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const toggleSortMode = () => {
        updateSort(sortData.mode === 'desc' ? 'asc' : 'desc', sortData.category);
    };

    return (
        <Dropdown
            visible={visible}
            onOpen={openMenu}
            onClose={closeMenu}
            label={'Sort'}
            value={sortData.category}
            // onMenuPressAction={(opt: MediaSort) => updateFilter('sort', switchModeValue(opt))}
            left={
                <TextInput.Icon
                    icon={sortData.mode === 'desc' ? 'sort-descending' : 'sort-ascending'}
                    onPress={toggleSortMode}
                />
            }
        >
            {categories.map((category: SortCategories, idx: number) => (
                <Menu.Item
                    key={idx}
                    disabled={sortData.category === category}
                    onPress={() => {
                        closeMenu();
                        updateSort(sortData.mode, category);
                    }}
                    titleStyle={{ textTransform: 'capitalize' }}
                    title={category}
                />
            ))}
        </Dropdown>
    );
};

type StatusDropdownProps = {
    current: FilterTypes;
    updateStatus: (status: MediaStatus | undefined) => void;
    statusValue: MediaStatus;
};
export const StatusDropdown = ({ current, statusValue, updateStatus }: StatusDropdownProps) => {
    const categories = ['ANY', ...mediaStatusOptions];

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Dropdown
            label="Status"
            visible={visible}
            onOpen={openMenu}
            onClose={closeMenu}
            value={statusValue?.toLowerCase() ?? 'ANY'.toLowerCase()}
            // onMenuPressAction={(opt: MediaStatus | 'ANY') =>
            //     updateStatus(current, opt === 'ANY' ? { status: undefined } : { status: opt })
            // }
        >
            {categories.map((category: MediaStatus | 'ANY', idx) => (
                <Menu.Item
                    key={idx}
                    disabled={
                        (category === 'ANY' && statusValue === undefined) ||
                        category === statusValue
                    }
                    onPress={() => {
                        closeMenu();
                        updateStatus(category !== 'ANY' ? category : undefined);
                    }}
                    titleStyle={{ textTransform: 'capitalize' }}
                    title={category.replaceAll('_', ' ')}
                />
            ))}
        </Dropdown>
    );
};

type FormatDropdownProps = {
    current: FilterTypes;
    updateFormat: (format: MediaFormat | undefined) => void;
    formatValue: MediaFormat;
};
export const FormatDropdown = ({ current, formatValue, updateFormat }: FormatDropdownProps) => {
    const categories = current === 'anime' ? ['ANY', ...ANIME_FORMATS] : ['ANY', ...MANGA_FORMATS];

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    if (current === 'novel') {
        return null;
    }

    return (
        <Dropdown
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
                        updateFormat(category !== 'ANY' ? category : undefined);
                    }}
                    titleStyle={{ textTransform: 'capitalize' }}
                    title={category.replaceAll('_', ' ')}
                />
            ))}
        </Dropdown>
    );
};

type SeasonDropdownProps = {
    updateSeason: (season: MediaSeason | undefined) => void;
    seasonValue: string;
};
export const SeasonDropdown = ({ seasonValue, updateSeason }: SeasonDropdownProps) => {
    const seasons = ['ANY', ...Object.values(MediaSeason)];
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Dropdown
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
        </Dropdown>
    );
};

type YearDropdownProps = {
    updateSeasonYear: (year: number | undefined) => void;
    yearValue: ExploreMediaQueryVariables['seasonYear'];
};
export const YearDropdown = ({ yearValue, updateSeasonYear }: YearDropdownProps) => {
    const range = arrayRange(1970, new Date().getFullYear(), 1).reverse();
    const years = ['ANY'].concat(range);

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Dropdown
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
        </Dropdown>
    );
};
