import { useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { Text } from 'react-native-paper';
import { useColumns } from '../../../utils/size';

type SearchListProps = {
    data: any[];
};
const SearchList = ({ data }: SearchListProps) => {
    const { columns, listKey } = useColumns(200);
    const { width, height } = useWindowDimensions();

    return (
        <View style={{ flex: 1, height: height, width: width }}>
            <FlashList
                key={listKey}
                data={data ?? []}
                renderItem={({ index, item }) => (
                    <View style={{ backgroundColor: 'red', height: 40, width: 40 }} />
                )}
                keyExtractor={(item, index) => item + index}
                numColumns={columns}
                estimatedItemSize={37}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
        </View>
    );
};

export default SearchList;
