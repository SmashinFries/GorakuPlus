import { useEffect, useMemo, useState } from 'react';
import {
	CharacterSort,
	MediaFormat,
	MediaType,
	useAniMediaQuery,
} from '@/api/anilist/__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useMatchStore } from '@/store/matchStore';
import { useMangaUpdatesQuery, useMuReleasesQuery } from '@/api/mangaupdates/extended';
import { useMalQuery } from '@/api/jikan/extended';
import { useShallow } from 'zustand/react/shallow';

export const useMedia = (aniId: number | null, type: MediaType) => {
	// const { data } = useAnilistMalQuery(id, type);
	const [isReady, setIsReady] = useState(false);
	const userID = useAuthStore(useShallow((state) => state.anilist.userID));
	const malDB = useMatchStore(useShallow((state) => state.mal));
	const muDB = useMatchStore(useShallow((state) => state.mangaUpdates));
	const { isMalEnabled, isMangaUpdatesEnabled } = useMatchStore(
		useShallow((state) => ({
			isMalEnabled: state.isMalEnabled,
			isMangaUpdatesEnabled: state.isMangaUpdatesEnabled,
		})),
	);
	const addMalID = useMatchStore(useShallow((state) => state.addMalID));

	const anilist = useAniMediaQuery({
		id: aniId,
		skipUser: !userID,
		userId: userID ?? undefined,
		perPage_c: 25,
		perPage_rec: 25,
		sort_c: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
	});

	const jikan = useMalQuery(aniId ? malDB[aniId] : undefined, type);
	const muSeries = useMangaUpdatesQuery(
		type === MediaType.Manga ? aniId : null,
		muDB[aniId as number],
		anilist.data?.Media?.type === MediaType.Manga
			? (anilist.data?.Media?.countryOfOrigin === 'KR'
					? (anilist.data?.Media?.title?.english ??
						anilist.data?.Media?.title?.romaji ??
						'')
					: (anilist.data?.Media?.title?.native ?? '')
				)
					?.replace('[', '')
					.replace(']', '')
			: (anilist.data?.Media?.title?.romaji ?? ''),
		anilist.data?.Media?.format === MediaFormat.Novel,
	);
	const muReleases = useMuReleasesQuery(type === MediaType.Manga && aniId ? muDB[aniId] : null);

	const dependencies = useMemo(
		() => ({
			type,
			malDB,
			anilistFetched: anilist?.isFetched,
			jikanFetched: jikan?.isFetched,
			muSeriesFetched: muSeries?.isFetched,
			muReleasesFetched: muReleases?.isFetched,
			muReleasesError: muReleases?.isError,
			muSeriesError: muSeries?.isError,
			anilistData: anilist?.data,
			aniId,
			isMalEnabled,
			muDB,
			isMangaUpdatesEnabled,
			addMalID,
		}),
		[
			type,
			malDB,
			anilist?.isFetched,
			jikan?.isFetched,
			muSeries?.isFetched,
			muReleases?.isFetched,
			muReleases?.isError,
			muSeries?.isError,
			anilist?.data,
			aniId,
			isMalEnabled,
			muDB,
			isMangaUpdatesEnabled,
			addMalID,
		],
	);

	useEffect(() => {
		if (!anilist?.isFetched || !anilist?.data) return;

		const isAnime = type === MediaType.Anime;
		const hasMalData = malDB && aniId && malDB[aniId];
		const hasMuData = aniId && muDB[aniId];

		// Handle MAL ID mapping
		if (aniId && anilist?.data?.Media?.idMal && !malDB[aniId]) {
			addMalID(aniId, anilist.data.Media.idMal);
		}

		// Check if MAL data is ready
		const isMalReady = !isMalEnabled || jikan?.isFetched;

		// Check if MangaUpdates data is ready
		const isMuReady =
			!isMangaUpdatesEnabled ||
			((muSeries?.isFetched || muSeries?.isError) &&
				(muReleases?.isFetched || muReleases?.isError));

		// For Anime, we only need MAL data
		if (isAnime) {
			if (!hasMalData || isMalReady) {
				setIsReady(true);
			}
			return;
		}

		// For Manga, we need both MAL and MangaUpdates data
		const shouldSetReady =
			(!hasMalData && isMuReady) || // No MAL data, only need MU
			(hasMalData &&
				isMalReady &&
				(!hasMuData || // No MU data needed
					isMuReady || // MU data is ready
					muSeries?.isError || // MU errors are acceptable
					!muSeries?.data?.data)); // No MU data available

		if (shouldSetReady) {
			setIsReady(true);
		}
	}, [dependencies]);

	return { anilist, jikan, muSeries, muReleases, isReady };
};
