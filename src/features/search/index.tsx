import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView, useWindowDimensions, Keyboard } from 'react-native';
import { ExploreStackProps } from '../../navigation/types';
import { SearchHeader } from '../../components/headers';
import { MediaSelector } from './components/mediaSelector';
import { FilterSheet } from './components/filtersheet';
import { useFilter } from './hooks/filter';
import useSearch from './hooks/search';
import { FlashList } from '@shopify/flash-list';
import { useColumns } from '../../utils';
import { RenderSearchItem } from './components/media';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import useFilterSheet from './hooks/sheet';

const SearchScreen = ({ navigation }: NativeStackScreenProps<ExploreStackProps, 'search'>) => {
    const sheetRef = useRef<BottomSheetModalMethods>(null);
    const { searchResults, page, searchMedia, searchNextPage } = useSearch();
    const filterData = useFilter();
    const { isFilterOpen, handleSheetChange, setIsFilterOpen } = useFilterSheet(sheetRef);
    const { columns, listKey } = useColumns(200);

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        navigation.setOptions({
            header: (props) => (
                <SearchHeader
                    {...props}
                    onSearch={(search?: string) => searchMedia({ ...filterData.filter, search })}
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
            nestedScrollEnabled
            style={{ height: height, width: width }}
        >
            <MediaSelector selection={filterData.current} onSelect={filterData.switchType} />
            {/* <SearchList data={searchResults?.data?.Page?.media ?? []} /> */}
            <View style={{ minHeight: 3, width: width }}>
                <FlashList
                    key={listKey}
                    data={searchResults?.data?.Page?.media}
                    renderItem={RenderSearchItem}
                    keyExtractor={(item, index) => (item.id + index).toString()}
                    numColumns={columns}
                    estimatedItemSize={238}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    // contentContainerStyle={{ paddingHorizontal: 15 }}
                    contentContainerStyle={{ paddingLeft: 238 / 2 / 3 }}
                />
            </View>

            <FilterSheet
                sheetRef={sheetRef}
                handleSheetChange={handleSheetChange}
                filterData={filterData}
            />
        </ScrollView>
    );
};

export default SearchScreen;
