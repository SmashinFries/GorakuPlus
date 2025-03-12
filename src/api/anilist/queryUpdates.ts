import { ListEntrySheetProps } from "@/app/(sheets)/listEntrySheet";
import { useAuthStore } from "@/store/authStore";
import { QueryClient } from "@tanstack/react-query";
import { AniMediaQuery_Query, AnimeExploreQuery_nextSeason_Page_media_Media, AnimeExploreQuery_Query, CharacterSort, MainMetaFragment, MangaExploreQuery_newReleases_Page_media_Media, MangaExploreQuery_Query, ManhuaExploreQuery_Query, ManhwaExploreQuery_Query, MediaType, NovelExploreQuery_Query, SaveMediaListItemMutation_Mutation, useAniMediaQuery, useAnimeExploreQuery, useMangaExploreQuery, useManhuaExploreQuery, useManhwaExploreQuery, useNovelExploreQuery } from "./__genereated__/gql";

export const updateExploreCache = (queryClient: QueryClient, result: SaveMediaListItemMutation_Mutation) => {
	const userID = useAuthStore.getState().anilist.userID;
	const keyConfig = { includeViewer: !!userID };
	const queryKey =
		result.SaveMediaListEntry?.media?.type === MediaType.Anime
			? useAnimeExploreQuery.getKey({ includeViewer: !!userID })
			: result.SaveMediaListEntry?.media?.countryOfOrigin === 'JP'
				? useMangaExploreQuery.getKey(keyConfig)
				: result.SaveMediaListEntry?.media?.countryOfOrigin === 'KR'
					? useManhwaExploreQuery.getKey(keyConfig)
					: result.SaveMediaListEntry?.media?.countryOfOrigin === 'CN'
						? useManhuaExploreQuery.getKey(keyConfig)
						: useNovelExploreQuery.getKey(keyConfig);
	queryClient.setQueryData(queryKey, (oldData: any) => {
		if (!oldData) return oldData;

		const updateMedia = (
			data:
				| AnimeExploreQuery_nextSeason_Page_media_Media[]
				| MangaExploreQuery_newReleases_Page_media_Media[],
		) => data.map((item) => {
			if (item.id === result.SaveMediaListEntry?.media?.id) {
				return {
					...item,
					mediaListEntry: {
						...item.mediaListEntry,
						...result.SaveMediaListEntry,
					},
				};
			}
			return item;
		})

		if (result.SaveMediaListEntry?.media?.type === MediaType.Anime) {
			return {
				...oldData,
				thisSeason: {
					...oldData.thisSeason,
					media: updateMedia(oldData.thisSeason?.media || [])
				},
				nextSeason: {
					...oldData.nextSeason,
					media: updateMedia(oldData.nextSeason?.media || [])
				},
				trending: {
					...oldData.trending,
					media: updateMedia(oldData.trending?.media || []),
				},
				popular: {
					...oldData.popular,
					media: updateMedia(oldData.popular?.media || []),
				},
			} as AnimeExploreQuery_Query;
		} else if (result.SaveMediaListEntry?.media?.countryOfOrigin === 'JP') {
			return {
				...oldData,
				newReleases: {
					...oldData.newReleases,
					media: updateMedia(oldData.newReleases?.media || []),
				},
				trending: {
					...oldData.trending,
					media: updateMedia(oldData.trending?.media || []),
				},
				popular: {
					...oldData.popular,
					media: updateMedia(oldData.popular?.media || []),
				},
			} as MangaExploreQuery_Query;
		} else if (result.SaveMediaListEntry?.media?.countryOfOrigin === 'KR') {
			return {
				...oldData,
				newReleases: {
					...oldData.newReleases,
					media: updateMedia(oldData.newReleases?.media || []),
				},
				trending: {
					...oldData.trending,
					media: updateMedia(oldData.trending?.media || []),
				},
				popular: {
					...oldData.popular,
					media: updateMedia(oldData.popular?.media || []),
				},
			} as ManhwaExploreQuery_Query;
		} else if (result.SaveMediaListEntry?.media?.countryOfOrigin === 'CN') {
			return {
				...oldData,
				newReleases: {
					...oldData.newReleases,
					media: updateMedia(oldData.newReleases?.media || []),
				},
				trending: {
					...oldData.trending,
					media: updateMedia(oldData.trending?.media || []),
				},
				popular: {
					...oldData.popular,
					media: updateMedia(oldData.popular?.media || []),
				},
			} as ManhuaExploreQuery_Query;
		} else {
			return {
				...oldData,
				newReleases: {
					...oldData.newReleases,
					media: updateMedia(oldData.newReleases?.media || []),
				},
				trending: {
					...oldData.trending,
					media: updateMedia(oldData.trending?.media || []),
				},
				popular: {
					...oldData.popular,
					media: updateMedia(oldData.popular?.media || []),
				},
			} as NovelExploreQuery_Query;
		}
	});
};

export const updateAniMediaCache = (queryClient: QueryClient, result: SaveMediaListItemMutation_Mutation) => {
	const userID = useAuthStore.getState().anilist.userID;
	queryClient.setQueryData(
		useAniMediaQuery.getKey({
			id: result.SaveMediaListEntry?.id,
			skipUser: !userID,
			userId: userID ?? undefined,
			perPage_c: 25,
			perPage_rec: 25,
			sort_c: [CharacterSort.Role, CharacterSort.Relevance, CharacterSort.Id],
		}),
		(oldData: AniMediaQuery_Query) =>
			oldData
				? ({
					...oldData,
					Media: {
						...oldData.Media,
						mediaListEntry: {
							...oldData.Media?.mediaListEntry,
							...result.SaveMediaListEntry,
						},
					},
				} as AniMediaQuery_Query)
				: oldData,
	);
} 