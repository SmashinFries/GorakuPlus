import { ListHeading } from '@/components/text';
import { useState } from 'react';
import { AppState } from 'react-native';
import Animated from 'react-native-reanimated';
// import YoutubePlayer from 'react-native-youtube-iframe';

type AnimeTrailerProps = {
	video: string;
};
export const AnimeTrailer = ({ video }: AnimeTrailerProps) => {
	const [playing, setPlaying] = useState(false);

	if (AppState.currentState !== 'active') {
		return null;
	}

	return (
		<Animated.View style={{ marginVertical: 10 }}>
			<ListHeading title="Trailer" />
			{/* <YoutubePlayer
                height={270}
                webViewStyle={{ opacity: 0.99 }}
                play={playing}
                videoId={video}
            /> */}
		</Animated.View>
	);
};
