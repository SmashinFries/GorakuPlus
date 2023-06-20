import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView, useWindowDimensions, Keyboard } from 'react-native';
import { ExploreStackProps } from '../../navigation/types';
import { SearchHeader } from '../../components/headers';
import { MediaSelector } from './components/mediaSelector';
import {
    ExploreMediaQueryVariables,
    MediaFormat,
    MediaType,
} from '../../app/services/anilist/generated-anilist';
import {
    ExploreAnimeVars,
    ExploreMangaVars,
    ExploreNovelVars,
    FilterOptions,
    MediaSearchSelection,
} from './types';
import SearchList from './components/lists';
import { FilterSheet } from './components/filtersheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useFilter } from './hooks/filter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SearchScreen = ({ navigation }: NativeStackScreenProps<ExploreStackProps, 'search'>) => {
    const { filterOptions, updateFilter, switchType } = useFilter();
    const [mediaSelection, setMediaSelection] = useState<MediaSearchSelection>(MediaType.Anime);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const sheetRef = useRef<BottomSheetModalMethods>(null);

    const { width, height } = useWindowDimensions();

    const onMediaSelect = (type: MediaSearchSelection) => setMediaSelection(type);

    useEffect(() => {
        if (isFilterOpen) {
            sheetRef.current?.present();
        } else {
            sheetRef.current?.dismiss();
        }
    }, [isFilterOpen]);

    const handleSheetChange = useCallback((index) => {
        console.log('handleSheetChange', index);
        if (index === -1) {
            setIsFilterOpen(false);
        }
    }, []);

    // useEffect(() => {
    //     if (mediaSelection === MediaType.Anime) {
    //         setFilter((prev) => {
    //             return { ...prev, type: MediaType.Anime };
    //         });
    //     } else if (mediaSelection === MediaType.Manga) {
    //         setFilter((prev) => {
    //             return {
    //                 ...prev,
    //                 type: MediaType.Manga,
    //                 season: undefined,
    //                 seasonYear: undefined,
    //                 format_not_in: [MediaFormat.Novel],
    //             };
    //         });
    //     } else {
    //         setFilter((prev) => {
    //             return {
    //                 ...prev,
    //                 type: MediaType.Manga,
    //                 season: undefined,
    //                 seasonYear: undefined,
    //                 format_in: [MediaFormat.Novel],
    //             };
    //         });
    //     }
    // }, [mediaSelection]);

    useEffect(() => {
        navigation.setOptions({
            header: (props) => (
                <SearchHeader
                    {...props}
                    onSearch={() => null}
                    openFilter={() => {
                        Keyboard.dismiss();
                        setIsFilterOpen((prev) => !prev);
                    }}
                />
            ),
        });
    }, []);

    return (
        <ScrollView
            stickyHeaderHiddenOnScroll
            stickyHeaderIndices={[0]}
            style={{ flex: 1, height: '100%' }}
        >
            <MediaSelector
                selection={
                    filterOptions.format_in?.includes(MediaFormat.Novel)
                        ? 'NOVEL'
                        : filterOptions.type
                }
                onSelect={switchType}
            />
            <SearchList data={[]} />
            <FilterSheet
                sheetRef={sheetRef}
                handleSheetChange={handleSheetChange}
                filterOptions={filterOptions}
                // @ts-ignore
                updateFilter={updateFilter}
            />
        </ScrollView>
    );
};

export default SearchScreen;
