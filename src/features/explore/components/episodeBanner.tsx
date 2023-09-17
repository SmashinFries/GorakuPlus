import { MotiView } from 'moti';
import { useTheme } from 'react-native-paper';
import { getTimeUntil, useTimeUntil } from '../../../utils';
import { StyleSheet, Text } from 'react-native';
import {
    AiringSchedule,
    FuzzyDate,
    MediaFormat,
} from '../../../app/services/anilist/generated-anilist';
import { memo, useCallback, useMemo } from 'react';

type AiringBannerProps = {
    containerColor: string;
    textColor: string;
    text: string;
};
export const AiringBanner = ({ containerColor, textColor, text }: AiringBannerProps) => {
    // const timeTill = useMemo(() => {
    //     return getTimeUntil(nextEpisode?.airingAt);
    // }, [nextEpisode?.airingAt]);

    // if (!nextEpisode && !startDate) return null;

    return (
        <MotiView style={[Styles.container, { backgroundColor: containerColor }]}>
            {/* {startDate && !nextEpisode ? (
                <Text numberOfLines={1} style={[Styles.txt, { color: textColor }]}>{`${
                    startDate.month ?? '??'
                }/${startDate.day ?? '??'}/${startDate.year ?? '????'}`}</Text>
            ) : ( */}
            <Text numberOfLines={1} style={[Styles.txt, { color: textColor }]}>
                {/* {format === MediaFormat.Movie ? 'Movie:' : 'EP'}{' '}
                    {format !== MediaFormat.Movie && nextEpisode?.episode + ': '}
                    {timeTill} */}
                {text}
            </Text>
            {/* )} */}
        </MotiView>
    );
};

export const AiringBannerMemo = memo(AiringBanner);

const Styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        width: '100%',
        height: '12%',
        overflow: 'visible',
    },
    txt: {
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 5,
        fontSize: 12,
    },
});
