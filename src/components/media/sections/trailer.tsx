import { TransYUpViewMem } from '@/components/animations';
import { ListHeading } from '@/components/text';
import { useState } from 'react';
import { AppState } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

type AnimeTrailerProps = {
	video: string;
};
export const AnimeTrailer = ({ video }: AnimeTrailerProps) => {
	const [playing, setPlaying] = useState(false);

	if (AppState.currentState !== 'active') {
		return null;
	}

	return (
		<TransYUpViewMem style={{ marginVertical: 10 }}>
			<ListHeading title="Trailer" />
			<YoutubePlayer
				height={270}
				webViewStyle={{ opacity: 0.99 }}
				play={playing}
				videoId={video}
			/>
		</TransYUpViewMem>
	);
};
