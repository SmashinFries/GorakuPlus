import { ListEntrySheetProps } from "@/app/(sheets)/listEntrySheet";
import { useAuthStore } from "@/store/authStore";
import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { AniMediaQuery_Query, AnimeExploreQuery_nextSeason_Page_media_Media, AnimeExploreQuery_Query, CharacterSort, MainMetaFragment, MangaExploreQuery_newReleases_Page_media_Media, MangaExploreQuery_Query, ManhuaExploreQuery_Query, ManhwaExploreQuery_Query, MediaSearchQuery_Query, MediaType, NovelExploreQuery_Query, SaveMediaListItemMutation_Mutation, SearchAllQuery_Query, useAniMediaQuery, useAnimeExploreQuery, useInfiniteMediaSearchQuery, useMangaExploreQuery, useManhuaExploreQuery, useManhwaExploreQuery, useNovelExploreQuery, useSearchAllQuery } from "./__genereated__/gql";

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
						recommendations: {
							...oldData.Media?.recommendations,
							edges: oldData.Media?.recommendations?.edges?.map((item) => {
								if (item?.node?.mediaRecommendation?.id === result.SaveMediaListEntry?.media?.id) {
									return {
										...item,
										node: {
											...item?.node,
											mediaRecommendation: {
												...item?.node?.mediaRecommendation,
												mediaListEntry: {
													...item?.node?.mediaRecommendation?.mediaListEntry,
													...result.SaveMediaListEntry
												}
											}
										}
									};
								}
							})
						},
						relations: {
							...oldData.Media?.relations,
							edges: oldData.Media?.relations?.edges?.map((item) => {
								if (item?.node?.id === result.SaveMediaListEntry?.media?.id) {
									return {
										...item,
										node: {
											...item?.node,
											mediaListEntry: {
												...item?.node?.mediaListEntry,
												...result.SaveMediaListEntry
											}
										}
									};
								}
							})
						}
					},
				} as AniMediaQuery_Query)
				: oldData,
	);
}

export const updateMediaSearchCache = (queryClient: QueryClient, result: SaveMediaListItemMutation_Mutation) => {
	queryClient.setQueriesData({
		queryKey: useInfiniteMediaSearchQuery.getKey(),
	}, (oldData: InfiniteData<MediaSearchQuery_Query, unknown>) =>
		oldData
			? ({
				...oldData,
				pages: oldData.pages.map((page) => {
					console.log(page);
					return {
						...page,
						Page: {
							...page.Page,
							media: page.Page?.media?.map((item) => {
								if (item?.id === result.SaveMediaListEntry?.media?.id) {
									return {
										...item,
										mediaListEntry: {
											...item?.mediaListEntry,
											...result.SaveMediaListEntry,
										},
									};
								}
								return item;
							})
						}
					}
				})
			} as InfiniteData<MediaSearchQuery_Query, unknown>)
			: oldData,);
}

export const updateSearchAllCache = (queryClient: QueryClient, result: SaveMediaListItemMutation_Mutation) => {
	// useSearchAllQuery
	queryClient.setQueriesData({
		queryKey: useSearchAllQuery.getKey(),
	},

		(oldData: SearchAllQuery_Query) =>
			oldData
				? ({
					...oldData,
					Anime: {
						...oldData.Anime,
						media: oldData.Anime?.media?.map((item) => {
							if (item?.id === result.SaveMediaListEntry?.media?.id) {
								return {
									...item,
									mediaListEntry: {
										...item?.mediaListEntry,
										...result.SaveMediaListEntry,
									},
								};
							}
							return item;
						})
					},
					Manga: {
						...oldData.Manga,
						media: oldData.Manga?.media?.map((item) => {
							if (item?.id === result.SaveMediaListEntry?.media?.id) {
								return {
									...item,
									mediaListEntry: {
										...item?.mediaListEntry,
										...result.SaveMediaListEntry,
									},
								};
							}
							return item;
						})
					}
				} as SearchAllQuery_Query)
				: oldData,
	);
};