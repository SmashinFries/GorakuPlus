import { MotiView } from 'moti';
import { View } from 'react-native';
import {
    Divider,
    SegmentedButtons,
    SegmentedButtonsProps,
    Text,
    useTheme,
} from 'react-native-paper';
import { AniMediaQuery } from '../../../app/services/anilist/generated-anilist';
import { AnilistIcon, MalIcon } from '../../../components/svgs';
import { copyToClipboard, getScoreColor } from '../../../utils';
import { TransXInView, TransYUpView } from '../../../components/animations';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

// type ScoreTextProps = {
//     score: AniMediaQuery['Media']['averageScore'] | AniMediaQuery['Media']['meanScore'];
//     svg: 'ani' | 'mal';
// };
// export const ScoreText = ({ score, svg }: ScoreTextProps) => {
//     const { colors } = useTheme();
//     return (
//         <TransXInView direction={svg === 'ani' ? 'left' : 'right'}>
//             <MotiView
//                 // from={{ opacity: 0, scale: 0 }}
//                 // animate={{ opacity: 1, scale: 1 }}
//                 style={{
//                     flex: 1,
//                     width: '100%',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                 }}
//             >
//                 <Text variant="titleLarge">{score ?? '?'}</Text>
//                 <View
//                     style={{
//                         width: 50,
//                         // height: 1,
//                         marginVertical: 10,
//                         borderRadius: 0.5,
//                         backgroundColor: score
//                             ? getScoreColor(score, svg === 'mal' && true)
//                             : colors.secondaryContainer,
//                     }}
//                 />
//                 {/* <Text>{title}</Text> */}
//                 {svg === 'ani' ? <AnilistIcon /> : <MalIcon />}
//             </MotiView>
//         </TransXInView>
//     );
// };

type MediaTitleView = {
    data: any;
    defaultTitle: 'romaji' | 'english' | 'native';
};
export const MediaTitleView = ({ data, defaultTitle }: MediaTitleView) => {
    const [title, setTitle] = useState<MediaTitleView['defaultTitle']>(
        data?.title[defaultTitle] ? defaultTitle : 'romaji',
    );

    const titleButtons: SegmentedButtonsProps['buttons'] = [
        {
            value: 'romaji',
            label: 'Romaji',
        },
        {
            value: 'native',
            label: 'Native',
        },
    ];

    return (
        <TransYUpView
            style={{
                width: '100%',
                paddingTop: 10,
                paddingHorizontal: 20,
                overflow: 'hidden',
                justifyContent: 'center',
            }}
        >
            <MotiView>
                <Text
                    onLongPress={() => copyToClipboard(data?.title[title])}
                    variant="titleLarge"
                    style={[styles.title]}
                >
                    {data?.title[title]}
                </Text>
            </MotiView>
            <SegmentedButtons
                density="high"
                onValueChange={(value) => setTitle(value)}
                buttons={
                    data?.title?.english
                        ? [{ value: 'english', label: 'English' }, ...titleButtons]
                        : titleButtons
                }
                value={title}
                style={{ paddingVertical: 10 }}
            />
        </TransYUpView>
    );
};

const styles = StyleSheet.create({
    title: {
        flexWrap: 'wrap',
        marginTop: 10,
        textAlign: 'center',
    },
});
