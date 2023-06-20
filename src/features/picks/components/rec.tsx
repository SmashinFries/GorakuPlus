import { MotiView } from 'moti';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
    Recommendation,
    RecommendationsQuery,
} from '../../../app/services/anilist/generated-anilist';
import { Image } from 'expo-image';
import { Text, useTheme } from 'react-native-paper';
import { View } from 'react-native';

type RecommendedItemsProps = {
    data: RecommendationsQuery['Page']['recommendations'][0]['media'];
};
export const BaseRecItem = ({ data }: RecommendedItemsProps) => {
    const { width, height } = useWindowDimensions();
    const { colors } = useTheme();
    return (
        <MotiView style={[styles.container, { backgroundColor: colors.primaryContainer }]}>
            <Image
                source={{ uri: data?.bannerImage ?? data?.coverImage?.extraLarge }}
                style={[styles.image, { width: width - 50 }]}
            />
            <Text numberOfLines={3} variant={'titleLarge'} style={[styles.title]}>
                {data?.title?.userPreferred}
            </Text>
        </MotiView>
    );
};

type TargetRecItemProps = {
    data: RecommendationsQuery['Page']['recommendations'][0]['mediaRecommendation'];
};
export const TargetRecItem = ({ data }: TargetRecItemProps) => {
    const { width, height } = useWindowDimensions();
    const { colors } = useTheme();
    return (
        <MotiView style={[styles.container, { backgroundColor: colors.primaryContainer }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text numberOfLines={3} variant={'titleLarge'} style={[styles.title]}>
                    {data?.title?.userPreferred}
                </Text>
            </View>
            <Image
                source={{ uri: data?.bannerImage ?? data?.coverImage?.extraLarge }}
                style={[styles.image, { width: width - 50 }]}
            />
        </MotiView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        marginHorizontal: 20,
    },
    image: {
        borderRadius: 12,
        height: 150,
    },
    title: {
        textAlign: 'center',
    },
});
