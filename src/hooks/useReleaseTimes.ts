import { AiringSchedule, MediaStatus, MediaType } from '@/api/anilist/__genereated__/gql';
import { ReleaseSearchResponseV1ResultsItem } from '@/api/mangaupdates/models';
import { getChapterFrequency, getTimeUntil } from '@/utils';
import { useEffect, useState } from 'react';

type ReleaseTimesProps = {
	type: MediaType;
	status: MediaStatus | null | undefined;
	nextEpisode?: AiringSchedule | null | undefined;
	releases?: ReleaseSearchResponseV1ResultsItem[] | null | undefined;
	episodes?: number | null | undefined;
	chapters?: number | null | undefined;
	volumes?: number | null | undefined;
};
export const useReleaseTimes = ({
	type,
	status,
	releases,
	nextEpisode,
	chapters,
	episodes,
	volumes,
}: ReleaseTimesProps) => {
	const [text, setText] = useState('');

	useEffect(() => {
		if (episodes ?? chapters ?? volumes) {
			setText(
				`${episodes ?? chapters ?? volumes} ${episodes ? 'episodes' : chapters ? 'chapters' : 'volumes'}`,
			);
		}
	}, [episodes, chapters, volumes]);

	useEffect(() => {
		if (nextEpisode) {
			setText(
				`${getTimeUntil(nextEpisode.airingAt, 'days')}${'\n'}EP ${nextEpisode.episode}`,
			);
		} else if (status === MediaStatus.NotYetReleased && !nextEpisode) {
			setText('Unreleased');
		}
	}, [nextEpisode, status]);

	useEffect(() => {
		if (releases && releases.length > 1) {
			setText(
				`${getChapterFrequency(releases.map((release) => release?.record?.release_date).filter((date): date is string => !!date))} days`,
			);
		}
	}, [releases]);

	return text;
};
