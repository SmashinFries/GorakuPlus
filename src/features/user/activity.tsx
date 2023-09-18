import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { ListActivity, UserActivityQuery } from '../../app/services/anilist/generated-anilist';
import { ListHeading } from '../../components/text';
import { FlashList } from '@shopify/flash-list';
import ActivityItem from './components/activityItem';

const Item = ({ item }: { item: ListActivity }) => {
    return (
        <View style={{ height: 100, width: 200, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{item.media.title.userPreferred ?? 'Test'}</Text>
        </View>
    );
};

type ActivityOverviewProps = {
    data: UserActivityQuery['Page']['activities'] | ListActivity[];
};
export const ActivityOverview = ({ data }: ActivityOverviewProps) => {
    return (
        <View>
            <ListHeading title="Activity" />
            {data && (
                <FlashList
                    data={data}
                    renderItem={ActivityItem}
                    keyExtractor={(item, idx) => idx.toString()}
                    horizontal
                    estimatedItemSize={100}
                    showsHorizontalScrollIndicator={false}
                />
            )}
            {!data ? <Text>No data</Text> : null}
        </View>
    );
};
