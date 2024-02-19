import { MotiView } from 'moti';
import { StyleSheet, View } from 'react-native';
import { memo } from 'react';
import { Text } from 'react-native-paper';

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
        <View style={[Styles.container, { backgroundColor: containerColor }]}>
            {/* {startDate && !nextEpisode ? (
                <Text numberOfLines={1} style={[Styles.txt, { color: textColor }]}>{`${
                    startDate.month ?? '??'
                }/${startDate.day ?? '??'}/${startDate.year ?? '????'}`}</Text>
            ) : ( */}
            <Text variant='labelSmall' numberOfLines={1} style={[Styles.txt, { color: textColor }]}>
                {/* {format === MediaFormat.Movie ? 'Movie:' : 'EP'}{' '}
                    {format !== MediaFormat.Movie && nextEpisode?.episode + ': '}
                    {timeTill} */}
                {text}
            </Text>
            {/* )} */}
        </View>
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
        overflow: 'visible',
        padding: 3,
        paddingVertical: 1,
        justifyContent:'center',
    },
    txt: {
        textAlign: 'center',
        fontWeight: '900',
    },
});
