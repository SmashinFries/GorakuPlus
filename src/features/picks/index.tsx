import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MotiView } from 'moti';
import { StyleSheet } from 'react-native';
import { RootNavPaths, RootStackProps } from '../../navigation/types';
import {
    RecommendationSort,
    useRecommendationsQuery,
} from '../../app/services/anilist/generated-anilist';
import { useState } from 'react';
import { Image } from 'expo-image';
import { BaseRecItem, TargetRecItem } from './components/rec';
import { IconButton } from 'react-native-paper';
import { PicView } from './components/base';

const PickScreen = ({ navigation }: NativeStackScreenProps<RootNavPaths, 'recommendStack'>) => {
    const [page, setPage] = useState(1);
    const recommendations = useRecommendationsQuery({ page: 1, sort: RecommendationSort.IdDesc });
    return (
        <MotiView
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <PicView picks={recommendations?.data?.Page?.recommendations[0]} />
            {/* <Image
                source={{
                    uri: recommendations?.data?.Page?.recommendations[0]?.media?.coverImage
                        ?.extraLarge,
                }}
                style={{ height: 250, width: 170 }}
            />
            <Image
                source={{
                    uri: recommendations?.data?.Page?.recommendations[0]?.mediaRecommendation
                        ?.coverImage?.extraLarge,
                }}
                style={{ height: 250, width: 170 }}
            /> */}
        </MotiView>
    );
};

export default PickScreen;
