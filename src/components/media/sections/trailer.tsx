import { ListHeading } from '@/components/text';
import { useState } from 'react';
import { AppState, View } from 'react-native';
import Animated from 'react-native-reanimated';
import YoutubePlayer from 'react-native-youtube-iframe';

type AnimeTrailerProps = {
	video: string;
};
export const AnimeTrailer = ({ video }: AnimeTrailerProps) => {
	const [playing, setPlaying] = useState(false);

	if (AppState.currentState !== 'active') {
		return null;
	}

	// <Accordion title="Trailer">
	// 	<YoutubePlayer
	// 		height={270}
	// 		webViewStyle={{ opacity: 0.99 }}
	// 		play={playing}
	// 		videoId={video}
	// 	/>
	// </Accordion>;

	return (
		<View style={{ marginVertical: 10 }}>
			<ListHeading title="Trailer" />
			<YoutubePlayer
				height={270}
				webViewStyle={{ opacity: 0.99 }}
				play={playing}
				videoId={video}
			/>
		</View>
	);
};
