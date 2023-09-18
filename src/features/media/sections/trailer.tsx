import { useCallback, useRef, useState } from 'react';
import { AppState, View } from 'react-native';
import { Text } from 'react-native-paper';
import YoutubePlayer, { YoutubeIframeProps } from 'react-native-youtube-iframe';
import { TransYUpView } from '../../../components/animations';
import { ListHeading } from '../../../components/text';

type AnimeTrailerProps = {
    video: string;
};
export const AnimeTrailer = ({ video }: AnimeTrailerProps) => {
    const [playing, setPlaying] = useState(false);

    if (AppState.currentState !== 'active') {
        return null;
    }

    return (
        <TransYUpView style={{ marginVertical: 10 }}>
            <ListHeading title="Trailer" />
            <YoutubePlayer
                height={270}
                webViewStyle={{ opacity: 0.99 }}
                play={playing}
                videoId={video}
            />
        </TransYUpView>
    );
};
