import { useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { Text } from 'react-native-paper';
import { useColumns } from '../../../utils/size';
import { RenderMediaItem } from '../../explore/components/media';
import { RenderSearchItem } from './media';
import { AnimatePresence } from 'moti';

type SearchListProps = {
    data: any[];
};
const SearchList = ({ data }: SearchListProps) => {
    const { columns, listKey } = useColumns(200);
    const { width, height } = useWindowDimensions();

    return (
        // <View style={{ flex: 1, width: width, height: '100%' }}>
        //     <AnimatePresence exitBeforeEnter>
        <FlashList
            style={{}}
            key={listKey}
            data={data ?? []}
            renderItem={RenderSearchItem}
            keyExtractor={(item, index) => item + index}
            numColumns={columns}
            estimatedItemSize={37}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            contentContainerStyle={{ padding: 10 }}
        />
        //     {/* </AnimatePresence>
        // </View> */}
    );
};

export default SearchList;
