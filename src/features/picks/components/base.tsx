import { MotiView } from 'moti';
import { RecommendationsQuery } from '../../../app/services/anilist/generated-anilist';
import { BaseRecItem, TargetRecItem } from './rec';
import { IconButton } from 'react-native-paper';

type PicViewProps = {
    picks: RecommendationsQuery['Page']['recommendations'][0];
};
export const PicView = ({ picks }: PicViewProps) => {
    return (
        <MotiView>
            <BaseRecItem data={picks?.media} />
            <MotiView>
                <IconButton icon="" />
            </MotiView>
            <TargetRecItem data={picks?.mediaRecommendation} />
        </MotiView>
    );
};
