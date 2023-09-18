import { MotiView } from 'moti';
import { Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { ListActivity } from '../../../app/services/anilist/generated-anilist';
import { memo } from 'react';
import { View } from 'react-native';

type ActivityItemProps = {
    item: ListActivity;
};
const ActivityItem = ({ item }: ActivityItemProps) => {
    return (
        <MotiView style={{ marginHorizontal: 8 }}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={{ uri: item?.media?.coverImage?.extraLarge }}
                    style={{ height: 160, width: 95 }}
                    contentFit="cover"
                />
                <Text>
                    {item?.status} {item?.media?.title.userPreferred}
                </Text>
            </View>
        </MotiView>
    );
};

// const ActivityItemMem = memo(ActivityItem);

export default ActivityItem;
