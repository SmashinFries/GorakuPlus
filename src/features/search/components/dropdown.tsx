import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TextInput, Menu } from 'react-native-paper';
import { UpdateFilter } from '../types/types';
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
import { MediaSearchSelection } from '../types';
import { ANIME_FORMATS, MANGA_FORMATS, NOVEL_FORMATS, animeSort, mangaNovelSort, mediaStatusOptions } from '../constants/mediaConsts';
import { arrayRange } from '../../../utils/numbers';

type DropdownProps = {
    label: string;
    value: string;
    options?: string[];
    left?: React.ReactNode;
    onMenuPressAction: (option: string) => void;
};
export const Dropdown = ({
    label,
    value,
    options = ['test1', 'test2', 'test3', 'test4'],
    left,
    onMenuPressAction,
}: DropdownProps) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const onMenuPress = (option: string) => {
        closeMenu();
        onMenuPressAction(option);
        // if (enableSortMode) {
        //     updateFilter('sort', sortMode === 'ASC' ? option : option + '_DESC');
        // } else {
        //     updateFilter(label, option);
        // }
    };

    return (
        <View style={{ flex: 1 }}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchorPosition="bottom"
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
                        right={<TextInput.Icon icon="menu-down" onPress={openMenu} />}
                        left={left ?? null}
                    />
                }
            >
                {options.map((option, idx) => (
                    <Menu.Item
                        key={idx}
                        disabled={value?.includes(option)}
                        onPress={() => onMenuPress(option)}
                        titleStyle={{ textTransform: 'capitalize' }}
                        title={option.replaceAll('_', ' ')}
                    />
                ))}
            </Menu>
        </View>
    );
};

type SortDropdownProps = {
    mediaType: MediaSearchSelection;
    updateFilter: UpdateFilter;
    sortValue: string;
};
export const SortDropdown = ({ mediaType, sortValue, updateFilter }: SortDropdownProps) => {
    const [sortMode, setSortMode] = useState<'DESC' | 'ASC'>('DESC');

    const toggleSortMode = () => {
        setSortMode(sortMode === 'DESC' ? 'ASC' : 'DESC');
    };

    const switchModeValue = (mode: string) => {
        if (sortMode === 'DESC' && !mode.includes('_DESC')) {
            return mode + '_DESC';
        } else {
            return mode.replace('_DESC', '');
        }
    };

    useEffect(() => {
        if (sortMode === 'DESC' && !sortValue.includes('_DESC')) {
            console.log(sortValue + '_DESC');
            updateFilter('sort', sortValue + '_DESC');
        } else if (sortMode === 'ASC' && sortValue.includes('_DESC')) {
            updateFilter('sort', sortValue.replace('_DESC', ''));
            console.log(sortValue.replace('_DESC', ''));
        }
    }, [sortMode]);

    return (
        <Dropdown
            label={'Sort'}
            value={sortValue.replaceAll('_', ' ').replace('DESC', '')}
            onMenuPressAction={(opt) => updateFilter('sort', switchModeValue(opt))}
            options={mediaType === MediaType.Anime ? animeSort : mangaNovelSort}
            left={
                <TextInput.Icon
                    icon={sortMode === 'DESC' ? 'sort-descending' : 'sort-ascending'}
                    onPress={toggleSortMode}
                />
            }
        />
    );
};

type StatusDropdownProps = {
    updateFilter: UpdateFilter;
    statusValue: string;
};
export const StatusDropdown = ({ statusValue, updateFilter }: StatusDropdownProps) => {
    return (
        <Dropdown
            label="Status"
            value={statusValue}
            options={mediaStatusOptions}
            onMenuPressAction={(opt) => updateFilter('status', opt === 'ANY' ? undefined : opt)}
        />
    );
};

type FormatDropdownProps = {
    mediaType: MediaSearchSelection;
    updateFilter: UpdateFilter;
    formatValue: MediaFormat;
};
export const FormatDropdown = ({ mediaType, formatValue, updateFilter }: FormatDropdownProps) => {

    const options = mediaType === MediaType.Anime ? ANIME_FORMATS : mediaType === 'NOVEL' ? NOVEL_FORMATS : MANGA_FORMATS;

    return (
        <Dropdown
            label="Format"
            value={formatValue}
            options={options}
            onMenuPressAction={(opt) => updateFilter('format', opt)}
        />
    );
};

type SeasonDropdownProps = {
    updateFilter: UpdateFilter;
    seasonValue: string;
};
export const SeasonDropdown = ({ seasonValue, updateFilter }: SeasonDropdownProps) => {
    return (
        <Dropdown
            label="Season"
            value={seasonValue}
            options={Object.values(MediaSeason)}
            onMenuPressAction={(opt) => updateFilter('season', opt)}
        />
    );
};

type YearDropdownProps = {
    updateFilter: UpdateFilter;
    yearValue: ExploreMediaQueryVariables['seasonYear'];
};
export const YearDropdown = ({ yearValue, updateFilter }: YearDropdownProps) => {
    return (
        <Dropdown
            label="Year"
            value={yearValue?.toString() ?? undefined}
            options={['ANY'].concat(arrayRange(1970, new Date().getFullYear(), 1, true).reverse())}
            onMenuPressAction={(opt) =>
                updateFilter('seasonYear', opt === 'ANY' ? undefined : Number(opt))
            }
        />
    );
};
