import {
	AiringSchedule,
	FuzzyDate,
	MediaStatus,
	MediaType,
} from '@/api/anilist/__genereated__/gql';
import { ReleaseSearchResponseV1ResultsItem } from '@/api/mangaupdates/models';
import { convertDate, getChapterFrequency, getTimeUntil } from '@/utils';
import { useMemo } from 'react';

type ReleaseTimesProps = {
	type: MediaType;
	status: MediaStatus | null | undefined;
	nextEpisode?: AiringSchedule | null | undefined;
	releases?: ReleaseSearchResponseV1ResultsItem[] | null | undefined;
	episodes?: number | null | undefined;
	chapters?: number | null | undefined;
	volumes?: number | null | undefined;
	startDate?: FuzzyDate;
};
export const useReleaseTimes = ({
	type,
	status,
	releases,
	nextEpisode,
	chapters,
	episodes,
	volumes,
	startDate,
}: ReleaseTimesProps) => {
	const message = useMemo(() => {
		switch (status) {
			case MediaStatus.Finished:
				if (episodes || chapters || volumes) {
					return `${episodes ?? chapters ?? volumes} ${episodes ? 'episodes' : chapters ? 'chapters' : 'volumes'}`;
				}
				return '';
			case MediaStatus.NotYetReleased:
			case MediaStatus.Releasing:
				if (type === MediaType.Manga && releases) {
					return `${getChapterFrequency(releases.map((release) => release?.record?.release_date).filter((date): date is string => !!date))} days`;
				}
				if (nextEpisode) {
					return `${getTimeUntil(nextEpisode.airingAt, 'days')}${'\n'}EP ${nextEpisode.episode}`;
				}
				if (status === MediaStatus.NotYetReleased) {
					return startDate ? convertDate(startDate, true, true) : 'Unreleased';
				}
				return '';
			default:
				return '';
		}
	}, [episodes, chapters, volumes, status, nextEpisode, releases, startDate]);

	return message;
};
