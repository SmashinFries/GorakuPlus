import { ListEntrySheetProps } from "@/app/(sheets)/listEntrySheet";
import { useAuthStore } from "@/store/authStore";
import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { AniMediaQuery_Query, AnimeExploreQuery_nextSeason_Page_media_Media, AnimeExploreQuery_Query, CharacterDetailsQuery_Query, CharacterListQuery_Query, CharacterSort, DeleteMediaListItemMutation_Mutation, MainMetaFragment, MangaExploreQuery_newReleases_Page_media_Media, MangaExploreQuery_Query, ManhuaExploreQuery_Query, ManhwaExploreQuery_Query, MediaSearchQuery_Query, MediaType, NovelExploreQuery_Query, SaveMediaListItemMutation_Mutation, SearchAllQuery_Query, StaffDetailsQuery_Query, StaffListQuery_Query, useAniMediaQuery, useAnimeExploreQuery, useCharacterDetailsQuery, useInfiniteCharacterListQuery, useInfiniteMediaSearchQuery, useInfiniteStaffListQuery, useInfiniteUserAnimeFavoritesQuery, useInfiniteUserMangaFavoritesQuery, useInfiniteUserStaffFavoritesQuery, useInfiniteUserStudiosFavoritesQuery, useInfiniteUserWaifuFavoritesQuery, useMangaExploreQuery, useManhuaExploreQuery, useManhwaExploreQuery, useNovelExploreQuery, UserAnimeFavoritesQuery_Query, UserAnimeListCollectionQuery_Query, UserMangaFavoritesQuery_Query, UserMangaListCollectionQuery_Query, UserStaffFavoritesQuery_Query, UserStudiosFavoritesQuery_Query, UserWaifuFavoritesQuery_Query, useSearchAllQuery, useStaffDetailsQuery, useUserAnimeFavoritesQuery, useUserAnimeListCollectionQuery, useUserMangaFavoritesQuery, useUserMangaListCollectionQuery } from "./__genereated__/gql";

// ENTRY SAVE
const updateExploreCache = (queryClient: QueryClient, result: SaveMediaListItemMutation_Mutation, userId: number) => {
	const keyConfig = { includeViewer: !!userId };
	const queryKey =
		result.SaveMediaListEntry?.media?.type === MediaType.Anime
			? useAnimeExploreQuery.getKey({ includeViewer: !!userId })
			: result.SaveMediaListEntry?.media?.countryOfOrigin === 'JP'
				? useMangaExploreQuery.getKey(keyConfig)
				: result.SaveMediaListEntry?.media?.countryOfOrigin === 'KR'
					? useManhwaExploreQuery.getKey(keyConfig)
					: result.SaveMediaListEntry?.media?.countryOfOrigin === 'CN'
						? useManhuaExploreQuery.getKey(keyConfig)
						: useNovelExploreQuery.getKey(keyConfig);
	queryClient.setQueriesData({ queryKey: queryKey }, (oldData: any) => {
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
const updateAniMediaCache = (queryClient: QueryClient, result: SaveMediaListItemMutation_Mutation, userId: number) => {
	queryClient.setQueriesData({
		queryKey: useAniMediaQuery.getKey({
			id: result.SaveMediaListEntry?.media?.id,
			skipUser: !userId,
		})
	},
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
};
const updateAniMediaRelatRecCache = (queryClient: QueryClient, parentMediaId: number, result: SaveMediaListItemMutation_Mutation, userId: number) => {
	console.log('ParentID:', parentMediaId)
	queryClient.setQueriesData({
		queryKey: useAniMediaQuery.getKey({
			id: parentMediaId,
			skipUser: !userId,
		})
	},
		(oldData: AniMediaQuery_Query) =>
			oldData
				? ({
					...oldData,
					Media: {
						...oldData.Media,
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
								} else {
									return item;
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
								} else {
									return item;
								}
							})
						}
					},
				} as AniMediaQuery_Query)
				: oldData,
	);
};
const updateMediaSearchCache = (queryClient: QueryClient, result: SaveMediaListItemMutation_Mutation) => {
	queryClient.setQueriesData({
		queryKey: useInfiniteMediaSearchQuery.getKey(),
	}, (oldData: InfiniteData<MediaSearchQuery_Query, unknown>) =>
		oldData
			? ({
				...oldData,
				pages: oldData.pages.map((page) => {
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
};
const updateSearchAllCache = (queryClient: QueryClient, result: SaveMediaListItemMutation_Mutation) => {
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
const updateListCache = (queryClient: QueryClient, result: SaveMediaListItemMutation_Mutation, userId: number) => {
	if (result?.SaveMediaListEntry?.media?.type === MediaType.Anime) {
		queryClient.setQueriesData({
			queryKey: useUserAnimeListCollectionQuery.getKey({ userId }),
		},
			(oldData: UserAnimeListCollectionQuery_Query) => oldData ? ({
				...oldData,
				MediaListCollection: {
					...oldData.MediaListCollection,
					lists: oldData.MediaListCollection?.lists?.map((list) => ({
						...list,
						entries: list?.entries?.map((entry) => result.SaveMediaListEntry?.mediaId === (entry?.mediaId ?? entry?.media?.id) ? ({
							...entry,
							...result,
						}) : entry)
					})),
				}
			} as UserAnimeListCollectionQuery_Query) : oldData
		)
	} else {
		queryClient.setQueriesData({
			queryKey: useUserMangaListCollectionQuery.getKey({ userId }),
		},
			(oldData: UserMangaListCollectionQuery_Query) => oldData ? ({
				...oldData,
				MediaListCollection: {
					...oldData.MediaListCollection,
					lists: oldData.MediaListCollection?.lists?.map((list) => ({
						...list,
						entries: list?.entries?.map((entry) => result.SaveMediaListEntry?.mediaId === entry?.mediaId ? ({
							...entry,
							...result,
						}) : entry)
					})),
				}
			} as UserMangaListCollectionQuery_Query) : oldData
		)
	}

};

export const updateEntrySaveCache = (queryClient: QueryClient, result: SaveMediaListItemMutation_Mutation, parentMediaId?: number) => {
	const userId = useAuthStore.getState().anilist.userID;
	if (userId) {
		updateExploreCache(queryClient, result, userId);
		updateAniMediaCache(queryClient, result, userId);
		parentMediaId && updateAniMediaRelatRecCache(queryClient, parentMediaId, result, userId);
		updateMediaSearchCache(queryClient, result);
		updateSearchAllCache(queryClient, result);
		userId && updateListCache(queryClient, result, userId);
	}

};

// ENTRY DELETION
const updateListDeletionCache = (queryClient: QueryClient, type: MediaType, entryId: number, userId: number) => {
	console.log('DELETING LIST ITEM:', type, entryId, userId)
	if (type === MediaType.Anime) {
		queryClient.setQueriesData({
			queryKey: useUserAnimeListCollectionQuery.getKey({ userId }),
		},
			(oldData: UserAnimeListCollectionQuery_Query) => oldData ? ({
				...oldData,
				MediaListCollection: {
					...oldData.MediaListCollection,
					lists: oldData.MediaListCollection?.lists?.map((list) => ({
						...list,
						entries: list?.entries?.filter((entry) => entryId !== entry?.id)
					})),
				}
			} as UserAnimeListCollectionQuery_Query) : oldData
		)
	} else if (type === MediaType.Manga) {
		queryClient.setQueriesData({
			queryKey: useUserMangaListCollectionQuery.getKey({ userId }),
		},
			(oldData: UserMangaListCollectionQuery_Query) => oldData ? ({
				...oldData,
				MediaListCollection: {
					...oldData.MediaListCollection,
					lists: oldData.MediaListCollection?.lists?.map((list) => ({
						...list,
						entries: list?.entries?.filter((entry) => entryId !== entry?.id)
					})),
				}
			} as UserMangaListCollectionQuery_Query) : oldData
		)
	}
};
const updateSearchAllDeletionCache = (queryClient: QueryClient, type: MediaType, entryId: number) => {
	queryClient.setQueriesData({
		queryKey: useSearchAllQuery.getKey(),
	},

		(oldData: SearchAllQuery_Query) =>
			oldData
				? ({
					...oldData,
					Anime: type === MediaType.Anime ? {
						...oldData.Anime,
						media: oldData.Anime?.media?.map((item) => {
							if (item?.mediaListEntry?.id === entryId) {
								return null;
							}
							return item;
						})
					} : oldData.Anime,
					Manga: type === MediaType.Manga ? {
						...oldData.Manga,
						media: oldData.Manga?.media?.map((item) => {
							if (item?.mediaListEntry?.id === entryId) {
								return null;
							}
							return item;
						})
					} : oldData.Manga,
				} as SearchAllQuery_Query)
				: oldData,
	);
};
const updateMediaSearchDeletionCache = (queryClient: QueryClient, entryId: number) => {
	queryClient.setQueriesData({
		queryKey: useInfiniteMediaSearchQuery.getKey(),
	}, (oldData: InfiniteData<MediaSearchQuery_Query, unknown>) =>
		oldData
			? ({
				...oldData,
				pages: oldData.pages.map((page) => {
					return {
						...page,
						Page: {
							...page.Page,
							media: page.Page?.media?.map((item) => {
								if (item?.mediaListEntry?.id === entryId) {
									return null;
								}
								return item;
							})
						}
					}
				})
			} as InfiniteData<MediaSearchQuery_Query, unknown>)
			: oldData,);
};
const updateAniMediaDeletionCache = (queryClient: QueryClient, mediaId: number, userId: number) => {
	queryClient.setQueriesData(
		{
			queryKey: useAniMediaQuery.getKey({
				id: mediaId,
				skipUser: !userId,
			})
		},
		(oldData: AniMediaQuery_Query) =>
			oldData
				? ({
					...oldData,
					Media: {
						...oldData.Media,
						mediaListEntry: null,
					},
				} as AniMediaQuery_Query)
				: oldData,
	);
};
const updateAniMediaRelatRecDeletionCache = (queryClient: QueryClient, parentMediaId: number, mediaId: number, userId: number) => {
	queryClient.setQueriesData({
		queryKey: useAniMediaQuery.getKey({
			id: parentMediaId,
			skipUser: !userId,
		})
	},
		(oldData: AniMediaQuery_Query) =>
			oldData
				? ({
					...oldData,
					Media: {
						...oldData.Media,
						recommendations: {
							...oldData.Media?.recommendations,
							edges: oldData.Media?.recommendations?.edges?.map((item) => {
								if (item?.node?.mediaRecommendation?.id === mediaId) {
									return {
										...item,
										node: {
											...item?.node,
											mediaRecommendation: {
												...item?.node?.mediaRecommendation,
												mediaListEntry: null
											}
										}
									};
								}
							})
						},
						relations: {
							...oldData.Media?.relations,
							edges: oldData.Media?.relations?.edges?.map((item) => {
								if (item?.node?.id === mediaId) {
									return {
										...item,
										node: {
											...item?.node,
											mediaListEntry: null
										}
									};
								} else {
									return item;
								}
							})
						}
					},
				} as AniMediaQuery_Query)
				: oldData,
	);
};
const updateExploreDeletionCache = (queryClient: QueryClient, type: MediaType, countryOfOrigin: string, entryId: number, userId: number) => {
	const keyConfig = { includeViewer: !!userId };
	const queryKey =
		type === MediaType.Anime
			? useAnimeExploreQuery.getKey({ includeViewer: !!userId })
			: countryOfOrigin === 'JP'
				? useMangaExploreQuery.getKey(keyConfig)
				: countryOfOrigin === 'KR'
					? useManhwaExploreQuery.getKey(keyConfig)
					: countryOfOrigin === 'CN'
						? useManhuaExploreQuery.getKey(keyConfig)
						: useNovelExploreQuery.getKey(keyConfig);
	queryClient.setQueriesData({ queryKey: queryKey }, (oldData: any) => {
		if (!oldData) return oldData;

		const updateMedia = (
			data:
				| AnimeExploreQuery_nextSeason_Page_media_Media[]
				| MangaExploreQuery_newReleases_Page_media_Media[],
		) => data.map((item) => {
			if (item.mediaListEntry?.id === entryId) {
				return {
					...item,
					mediaListEntry: null,
				};
			}
			return item;
		})

		if (type === MediaType.Anime) {
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
		} else if (countryOfOrigin === 'JP') {
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
		} else if (countryOfOrigin === 'KR') {
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
		} else if (countryOfOrigin === 'CN') {
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

export const updateDeletionEntryCache = (queryClient: QueryClient, data: { type: MediaType, mediaId: number, entryId: number, isDeleted: boolean, countryOfOrigin?: string, parentMediaId?: number }) => {
	const userId = useAuthStore.getState().anilist.userID;
	if (!data.isDeleted) return null;
	if (userId) {
		updateListDeletionCache(queryClient, data.type, data.entryId, userId);
		updateSearchAllDeletionCache(queryClient, data.type, data.entryId);
		updateMediaSearchDeletionCache(queryClient, data.entryId);
		updateAniMediaDeletionCache(queryClient, data.mediaId, userId);
		data.parentMediaId && updateAniMediaRelatRecDeletionCache(queryClient, data.parentMediaId, data.mediaId, userId);
		data.countryOfOrigin && updateExploreDeletionCache(queryClient, data.type, data.countryOfOrigin, data.entryId, userId);
	}

};

export type FavMediaType = MediaType | 'characters' | 'staff' | 'studios';
// Fav Toggle Cache
const updateAniMediaFavCache = (queryClient: QueryClient, mediaId: number, userId: number) => {
	queryClient.setQueriesData(
		{
			queryKey: useAniMediaQuery.getKey({
				id: mediaId,
				skipUser: !userId,
			})
		},
		(oldData: AniMediaQuery_Query) =>
			oldData
				? ({
					...oldData,
					Media: {
						...oldData.Media,
						isFavourite: !oldData.Media?.isFavourite,
					},
				} as AniMediaQuery_Query)
				: oldData,
	);
};
const updateExploreFavCache = (queryClient: QueryClient, type: FavMediaType, mediaId: number, userId: number, countryOfOrigin?: string,) => {
	const keyConfig = { includeViewer: !!userId };
	const queryKey =
		type === MediaType.Anime
			? useAnimeExploreQuery.getKey({ includeViewer: !!userId })
			: countryOfOrigin === 'JP'
				? useMangaExploreQuery.getKey(keyConfig)
				: countryOfOrigin === 'KR'
					? useManhwaExploreQuery.getKey(keyConfig)
					: countryOfOrigin === 'CN'
						? useManhuaExploreQuery.getKey(keyConfig)
						: useNovelExploreQuery.getKey(keyConfig);
	queryClient.setQueriesData({ queryKey: queryKey }, (oldData: any) => {
		if (!oldData) return oldData;

		const updateMedia = (
			data:
				| AnimeExploreQuery_nextSeason_Page_media_Media[]
				| MangaExploreQuery_newReleases_Page_media_Media[],
		) => data.map((item) => {
			if (item.id === mediaId) {
				return {
					...item,
					isFavourite: !item.isFavourite,
				};
			}
			return item;
		})

		if (type === MediaType.Anime) {
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
		} else if (countryOfOrigin === 'JP') {
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
		} else if (countryOfOrigin === 'KR') {
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
		} else if (countryOfOrigin === 'CN') {
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
const updateAniMediaRelatRecCharStaffFavCache = (queryClient: QueryClient, type: FavMediaType, parentMediaId: number, id: number, userId: number) => {
	queryClient.setQueriesData({
		queryKey: useAniMediaQuery.getKey({
			id: parentMediaId,
			skipUser: !userId,
		})
	},
		(oldData: AniMediaQuery_Query) =>
			oldData
				? ({
					...oldData,
					Media: {
						...oldData.Media,
						recommendations: (type === MediaType.Anime || type === MediaType.Manga) ? {
							...oldData.Media?.recommendations,
							edges: oldData.Media?.recommendations?.edges?.map((item) => {
								if (item?.node?.mediaRecommendation?.id === id) {
									return {
										...item,
										node: {
											...item?.node,
											mediaRecommendation: {
												...item?.node?.mediaRecommendation,
												isFavourite: !item?.node?.mediaRecommendation?.isFavourite
											}
										}
									};
								} else {
									return item;
								}
							})
						} : oldData.Media?.recommendations,
						relations: (type === MediaType.Anime || type === MediaType.Manga) ? {
							...oldData.Media?.relations,
							edges: oldData.Media?.relations?.edges?.map((item) => {
								if (item?.node?.id === id) {
									return {
										...item,
										node: {
											...item?.node,
											isFavourite: !item?.node?.isFavourite
										}
									};
								} else {
									return item;
								}
							})
						} : oldData.Media?.relations,
						characters: type === 'characters' ? ({ ...oldData.Media?.characters, edges: oldData.Media?.characters?.edges?.map((edge) => edge?.node?.id === id ? ({ ...edge, node: { ...edge.node, isFavourite: !edge.node?.isFavourite } }) : edge) }) : oldData.Media?.characters,
						staff: type === 'staff' ? ({
							...oldData.Media?.staff,
							edges: oldData.Media?.staff?.edges?.map((edge) => edge?.node?.id === id ? ({
								...edge,
								node: {
									...edge?.node,
									isFavourite: !edge?.node?.isFavourite,
								}
							}) : edge)
						}) : oldData.Media?.staff,
					},
				} as AniMediaQuery_Query)
				: oldData,
	);
};
const updateMediaSearchFavCache = (queryClient: QueryClient, id: number) => {
	queryClient.setQueriesData({
		queryKey: useInfiniteMediaSearchQuery.getKey(),
	}, (oldData: InfiniteData<MediaSearchQuery_Query, unknown>) =>
		oldData
			? ({
				...oldData,
				pages: oldData.pages.map((page) => {
					return {
						...page,
						Page: {
							...page.Page,
							media: page.Page?.media?.map((item) => {
								if (item?.id === id) {
									return {
										...item,
										isFavourite: !item?.isFavourite
									};
								}
								return item;
							})
						}
					}
				})
			} as InfiniteData<MediaSearchQuery_Query, unknown>)
			: oldData,);
};
const updateSearchAllFavCache = (queryClient: QueryClient, type: FavMediaType, id: number) => {
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
						media: type === MediaType.Anime ? oldData.Anime?.media?.map((item) => {
							if (item?.id === id) {
								return {
									...item,
									isFavourite: !item.isFavourite
								};
							}
							return item;
						}) : oldData.Anime?.media
					},
					Manga: {
						...oldData.Manga,
						media: type === MediaType.Manga ? oldData.Manga?.media?.map((item) => {
							if (item?.id === id) {
								return {
									...item,
									isFavourite: !item.isFavourite
								};
							}
							return item;
						}) : oldData.Manga?.media
					},
					Characters: {
						...oldData.Characters,
						characters: type === 'characters' ? oldData.Characters?.characters?.map((item) => {
							if (item?.id === id) {
								return {
									...item,
									isFavourite: !item.isFavourite,
								}
							}
							return item;
						}) : oldData.Characters?.characters
					},
					Staff: {
						...oldData.Staff,
						staff: type === 'staff' ? oldData.Staff?.staff?.map((item) => {
							if (item?.id === id) {
								return {
									...item,
									isFavourite: !item.isFavourite,
								}
							}
							return item;
						}) : oldData.Staff?.staff
					},
					Studios: {
						...oldData.Studios,
						staff: type === 'studios' ? oldData.Studios?.studios?.map((item) => {
							if (item?.id === id) {
								return {
									...item,
									isFavourite: !item.isFavourite,
								}
							}
							return item;
						}) : oldData.Studios?.studios
					}
				} as SearchAllQuery_Query)
				: oldData,
	);
};
const updateListFavCache = (queryClient: QueryClient, type: FavMediaType, mediaId: number, userId: number) => {
	if (type === MediaType.Anime) {
		queryClient.setQueriesData({
			queryKey: useUserAnimeListCollectionQuery.getKey({ userId }),
		},
			(oldData: UserAnimeListCollectionQuery_Query) => oldData ? ({
				...oldData,
				MediaListCollection: {
					...oldData.MediaListCollection,
					lists: oldData.MediaListCollection?.lists?.map((list) => ({
						...list,
						entries: list?.entries?.map((entry) => mediaId === (entry?.mediaId ?? entry?.media?.id) ? ({
							...entry,
							media: {
								...entry?.media,
								isFavourite: !entry?.media?.isFavourite
							}
						}) : entry)
					})),
				}
			} as UserAnimeListCollectionQuery_Query) : oldData
		)
	} else {
		queryClient.setQueriesData({
			queryKey: useUserMangaListCollectionQuery.getKey({ userId }),
		},
			(oldData: UserMangaListCollectionQuery_Query) => oldData ? ({
				...oldData,
				MediaListCollection: {
					...oldData.MediaListCollection,
					lists: oldData.MediaListCollection?.lists?.map((list) => ({
						...list,
						entries: list?.entries?.map((entry) => mediaId === entry?.mediaId ? ({
							...entry,
							media: {
								...entry?.media,
								isFavourite: !entry?.media?.isFavourite
							}
						}) : entry)
					})),
				}
			} as UserMangaListCollectionQuery_Query) : oldData
		)
	}

};
const updateFavoritesFavCache = (queryClient: QueryClient, type: FavMediaType, id: number, userId: number) => {
	switch (type) {
		case MediaType.Anime:
			queryClient.setQueriesData({
				queryKey: useInfiniteUserAnimeFavoritesQuery.getKey({ userID: userId })
			}, (oldData) => (oldData: InfiniteData<UserAnimeFavoritesQuery_Query, unknown>) => oldData ? ({
				...oldData,
				pages: oldData.pages?.map((page) => ({
					...page,
					User: {
						...page.User,
						favourites: {
							...page.User?.favourites,
							anime: {
								...page.User?.favourites?.anime,
								nodes: page.User?.favourites?.anime?.nodes?.map((node) => node?.id === id ? ({
									...node,
									isFavourite: !node?.isFavourite
								}) : node)
							}
						}
					}
				}))
			} as InfiniteData<UserAnimeFavoritesQuery_Query, unknown>) : oldData)
			break;
		case MediaType.Manga:
			queryClient.setQueriesData({
				queryKey: useInfiniteUserMangaFavoritesQuery.getKey({ userID: userId })
			}, (oldData) => (oldData: InfiniteData<UserMangaFavoritesQuery_Query, unknown>) => oldData ? ({
				...oldData,
				pages: oldData.pages?.map((page) => ({
					...page,
					User: {
						...page.User,
						favourites: {
							...page.User?.favourites,
							manga: {
								...page.User?.favourites?.manga,
								nodes: page.User?.favourites?.manga?.nodes?.map((node) => node?.id === id ? ({
									...node,
									isFavourite: !node?.isFavourite
								}) : node)
							}
						}
					}
				}))
			} as InfiniteData<UserMangaFavoritesQuery_Query, unknown>) : oldData)
			break;
		case 'characters':
			queryClient.setQueriesData({
				queryKey: useInfiniteUserWaifuFavoritesQuery.getKey({ userID: userId })
			}, (oldData) => (oldData: InfiniteData<UserWaifuFavoritesQuery_Query, unknown>) => oldData ? ({
				...oldData,
				pages: oldData.pages?.map((page) => ({
					...page,
					User: {
						...page.User,
						favourites: {
							...page.User?.favourites,
							characters: {
								...page.User?.favourites?.characters,
								nodes: page.User?.favourites?.characters?.nodes?.map((node) => node?.id === id ? ({
									...node,
									isFavourite: !node?.isFavourite
								}) : node)
							}
						}
					}
				}))
			} as InfiniteData<UserWaifuFavoritesQuery_Query, unknown>) : oldData)
			break;
		case 'staff':
			queryClient.setQueriesData({
				queryKey: useInfiniteUserStaffFavoritesQuery.getKey({ userID: userId })
			}, (oldData) => (oldData: InfiniteData<UserStaffFavoritesQuery_Query, unknown>) => oldData ? ({
				...oldData,
				pages: oldData.pages?.map((page) => ({
					...page,
					User: {
						...page.User,
						favourites: {
							...page.User?.favourites,
							staff: {
								...page.User?.favourites?.staff,
								nodes: page.User?.favourites?.staff?.nodes?.map((node) => node?.id === id ? ({
									...node,
									isFavourite: !node?.isFavourite
								}) : node)
							}
						}
					}
				}))
			} as InfiniteData<UserStaffFavoritesQuery_Query, unknown>) : oldData)
			break;
		case 'studios':
			queryClient.setQueriesData({
				queryKey: useInfiniteUserStudiosFavoritesQuery.getKey({ userID: userId })
			}, (oldData) => (oldData: InfiniteData<UserStudiosFavoritesQuery_Query, unknown>) => oldData ? ({
				...oldData,
				pages: oldData.pages?.map((page) => ({
					...page,
					User: {
						...page.User,
						favourites: {
							...page.User?.favourites,
							studios: {
								...page.User?.favourites?.studios,
								nodes: page.User?.favourites?.studios?.nodes?.map((node) => node?.id === id ? ({
									...node,
									isFavourite: !node?.isFavourite
								}) : node)
							}
						}
					}
				}))
			} as InfiniteData<UserStudiosFavoritesQuery_Query, unknown>) : oldData)
			break;
		default:
			break;
	}

}
const updateCharStaffDetailsFavCache = (queryClient: QueryClient, type: FavMediaType, id: number) => {
	if (type === 'characters') {
		queryClient.setQueriesData({
			queryKey: useCharacterDetailsQuery.getKey({ id }),
		}, (oldData: CharacterDetailsQuery_Query) => oldData ? ({
			...oldData,
			Character: {
				...oldData.Character,
				isFavourite: !oldData.Character?.isFavourite
			}
		} as CharacterDetailsQuery_Query) : oldData)
	} else if (type === 'staff') {
		queryClient.setQueriesData({
			queryKey: useStaffDetailsQuery({ id }),
		}, (oldData: StaffDetailsQuery_Query) => oldData ? ({
			...oldData,
			Staff: {
				...oldData.Staff,
				isFavourite: !oldData.Staff?.isFavourite
			}
		} as StaffDetailsQuery_Query) : oldData)
	}

}
const updateCharStaffListFavCache = (queryClient: QueryClient, type: FavMediaType, mediaId: number, id: number) => {
	if (type === 'characters') {
		queryClient.setQueriesData({
			queryKey: useInfiniteCharacterListQuery.getKey({ id: mediaId }),
		}, (oldData: InfiniteData<CharacterListQuery_Query, unknown>) => oldData ? ({
			...oldData,
			pages: oldData.pages?.map((page) => ({
				...page,
				Media: {
					...page.Media,
					characters: {
						...page.Media?.characters,
						edges: page.Media?.characters?.edges?.map((edge) => edge?.node?.id === id ? ({
							...edge,
							node: {
								...edge.node,
								isFavourite: !edge.node.isFavourite,
							}
						}) : edge)
					}
				}
			}))
		} as InfiniteData<CharacterListQuery_Query, unknown>) : oldData)
	} else if (type === 'staff') {
		queryClient.setQueriesData({
			queryKey: useInfiniteStaffListQuery.getKey({ id: mediaId }),
		}, (oldData: InfiniteData<StaffListQuery_Query, unknown>) => oldData ? ({
			...oldData,
			pages: oldData.pages?.map((page) => ({
				...page,
				Media: {
					...page.Media,
					staff: {
						...page.Media?.staff,
						edges: page.Media?.staff?.edges?.map((edge) => edge?.node?.id === id ? ({
							...edge,
							node: {
								...edge.node,
								isFavourite: !edge.node.isFavourite,
							}
						}) : edge)
					}
				}
			}))
		} as InfiniteData<CharacterListQuery_Query, unknown>) : oldData)
	}
};

export type ToggleFavMetaData = { type: FavMediaType, id: number, parentMediaId?: number, countryOfOrigin?: string };
export const updateFavToggleCache = (queryClient: QueryClient, data: ToggleFavMetaData) => {
	const userId = useAuthStore.getState().anilist.userID;
	if (userId) {
		updateExploreFavCache(queryClient, data.type, data.id, userId, data.countryOfOrigin,)
		updateAniMediaFavCache(queryClient, data.id, userId);
		updateFavoritesFavCache(queryClient, data.type, data.id, userId);
		data.parentMediaId && updateAniMediaRelatRecCharStaffFavCache(queryClient, data.type, data.parentMediaId, data.id, userId);
		updateMediaSearchFavCache(queryClient, data.id);
		updateSearchAllFavCache(queryClient, data.type, data.id);
		updateListFavCache(queryClient, data.type, data.id, userId);
		if (data.type === 'characters' || data.type === 'staff') {
			updateCharStaffDetailsFavCache(queryClient, data.type, data.id);
			data.parentMediaId && updateCharStaffListFavCache(queryClient, data.type, data.parentMediaId, data.id)
		}
	}
};