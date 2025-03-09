import { ListHeading } from '@/components/text';
import { useState } from 'react';
import { AppState, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

type AnimeTrailerProps = {
	video: string;
};
export const AnimeTrailer = ({ video }: AnimeTrailerProps) => {
	if (AppState.currentState !== 'active') {
		return null;
	}

	return (
		<View style={{ marginVertical: 10 }}>
			<ListHeading title="Trailer" />
			<YoutubePlayer height={270} webViewStyle={{ opacity: 0.99 }} videoId={video} />
		</View>
	);
};
