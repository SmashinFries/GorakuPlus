import { View, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavPaths, RootStackProps } from '../../navigation/types';
import { useEffect, useState } from 'react';
import {
    GetNotificationsQuery,
    useGetNotificationsQuery,
} from '../../app/services/anilist/generated-anilist';
import { FlashList } from '@shopify/flash-list';
import { NotifItem } from './components/item';

const NotificationScreen = ({
    navigation,
    route,
}: NativeStackScreenProps<RootStackProps, 'notifications'>) => {
    const params = route.params;
    const [page, setPage] = useState(1);
    const { width, height } = useWindowDimensions();
    const { data, isFetching, isLoading, isUninitialized } = useGetNotificationsQuery({
        amount: 50,
        page: page,
        reset: true,
    });

    const RenderItem = ({ item }: { item: GetNotificationsQuery['Page']['notifications'][0] }) => {
        return (
            <NotifItem
                item={item}
                onNav={() =>
                    navigation.push('media', {
                        aniID: item.media.id,
                        malID: item.media.idMal,
                        type: item.media.type,
                    })
                }
            />
        );
    };

    return (
        <View style={{ width: width, height: height }}>
            {/* <Button onPress={() => console.log(params)}>{'Unread'}</Button> */}
            {data?.Page && (
                <FlashList
                    data={data.Page.notifications}
                    renderItem={RenderItem}
                    keyExtractor={(item, idx) => item.id.toString()}
                    estimatedItemSize={20}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    onEndReached={() => {
                        // console.log('end:', page);
                        // !isFetching && setPage((prev) => prev + 1);
                    }}
                />
            )}
        </View>
    );
};

export default NotificationScreen;
