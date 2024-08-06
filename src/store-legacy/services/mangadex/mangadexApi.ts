import { baseMangadex as api } from './baseMangadex';
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getPing: build.query<GetPingApiResponse, GetPingApiArg>({
			query: () => ({ url: `/ping` }),
		}),
		getManga: build.query<GetMangaApiResponse, GetMangaApiArg>({
			query: (queryArg) => ({
				url: `/manga`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					title: queryArg.title,
					authorOrArtist: queryArg.authorOrArtist,
					authors: queryArg.authors,
					artists: queryArg.artists,
					year: queryArg.year,
					includedTags: queryArg.includedTags,
					includedTagsMode: queryArg.includedTagsMode,
					excludedTags: queryArg.excludedTags,
					excludedTagsMode: queryArg.excludedTagsMode,
					status: queryArg.status,
					originalLanguage: queryArg.originalLanguage,
					excludedOriginalLanguage: queryArg.excludedOriginalLanguage,
					availableTranslatedLanguage: queryArg.availableTranslatedLanguage,
					publicationDemographic: queryArg.publicationDemographic,
					ids: queryArg.ids,
					contentRating: queryArg.contentRating,
					createdAtSince: queryArg.createdAtSince,
					updatedAtSince: queryArg.updatedAtSince,
					order: queryArg.order,
					includes: queryArg.includes,
					hasAvailableChapters: queryArg.hasAvailableChapters,
					group: queryArg.group,
				},
			}),
		}),
		postManga: build.mutation<PostMangaApiResponse, PostMangaApiArg>({
			query: (queryArg) => ({
				url: `/manga`,
				method: 'POST',
				body: queryArg.mangaCreate,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getMangaByIdAggregate: build.query<
			GetMangaByIdAggregateApiResponse,
			GetMangaByIdAggregateApiArg
		>({
			query: (queryArg) => ({
				url: `/manga/${queryArg.id}/aggregate`,
				params: {
					translatedLanguage: queryArg.translatedLanguage,
					groups: queryArg.groups,
				},
			}),
		}),
		getMangaById: build.query<GetMangaByIdApiResponse, GetMangaByIdApiArg>({
			query: (queryArg) => ({
				url: `/manga/${queryArg.id}`,
				params: { includes: queryArg.includes },
			}),
		}),
		putMangaById: build.mutation<PutMangaByIdApiResponse, PutMangaByIdApiArg>({
			query: (queryArg) => ({
				url: `/manga/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.body,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		deleteMangaById: build.mutation<DeleteMangaByIdApiResponse, DeleteMangaByIdApiArg>({
			query: (queryArg) => ({ url: `/manga/${queryArg.id}`, method: 'DELETE' }),
		}),
		postAuthLogin: build.mutation<PostAuthLoginApiResponse, PostAuthLoginApiArg>({
			query: (queryArg) => ({
				url: `/auth/login`,
				method: 'POST',
				body: queryArg.login,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getAuthCheck: build.query<GetAuthCheckApiResponse, GetAuthCheckApiArg>({
			query: () => ({ url: `/auth/check` }),
		}),
		postAuthLogout: build.mutation<PostAuthLogoutApiResponse, PostAuthLogoutApiArg>({
			query: () => ({ url: `/auth/logout`, method: 'POST' }),
		}),
		postAuthRefresh: build.mutation<PostAuthRefreshApiResponse, PostAuthRefreshApiArg>({
			query: (queryArg) => ({
				url: `/auth/refresh`,
				method: 'POST',
				body: queryArg.refreshToken,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getClient: build.query<GetClientApiResponse, GetClientApiArg>({
			query: (queryArg) => ({
				url: `/client`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					state: queryArg.state,
					name: queryArg.name,
					includes: queryArg.includes,
					order: queryArg.order,
				},
			}),
		}),
		postClient: build.mutation<PostClientApiResponse, PostClientApiArg>({
			query: (queryArg) => ({
				url: `/client`,
				method: 'POST',
				body: queryArg.apiClientCreate,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getClientById: build.query<GetClientByIdApiResponse, GetClientByIdApiArg>({
			query: (queryArg) => ({
				url: `/client/${queryArg.id}`,
				params: { includes: queryArg.includes },
			}),
		}),
		postClientById: build.mutation<PostClientByIdApiResponse, PostClientByIdApiArg>({
			query: (queryArg) => ({
				url: `/client/${queryArg.id}`,
				method: 'POST',
				body: queryArg.apiClientEdit,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		deleteClientById: build.mutation<DeleteClientByIdApiResponse, DeleteClientByIdApiArg>({
			query: (queryArg) => ({
				url: `/client/${queryArg.id}`,
				method: 'DELETE',
				params: { version: queryArg.version },
			}),
		}),
		getClientByIdSecret: build.query<GetClientByIdSecretApiResponse, GetClientByIdSecretApiArg>(
			{
				query: (queryArg) => ({ url: `/client/${queryArg.id}/secret` }),
			},
		),
		postClientByIdSecret: build.mutation<
			PostClientByIdSecretApiResponse,
			PostClientByIdSecretApiArg
		>({
			query: (queryArg) => ({
				url: `/client/${queryArg.id}/secret`,
				method: 'POST',
				body: queryArg.body,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getGroup: build.query<GetGroupApiResponse, GetGroupApiArg>({
			query: (queryArg) => ({
				url: `/group`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					ids: queryArg.ids,
					name: queryArg.name,
					focusedLanguage: queryArg.focusedLanguage,
					includes: queryArg.includes,
					order: queryArg.order,
				},
			}),
		}),
		postGroup: build.mutation<PostGroupApiResponse, PostGroupApiArg>({
			query: (queryArg) => ({
				url: `/group`,
				method: 'POST',
				body: queryArg.createScanlationGroup,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getGroupById: build.query<GetGroupByIdApiResponse, GetGroupByIdApiArg>({
			query: (queryArg) => ({
				url: `/group/${queryArg.id}`,
				params: { includes: queryArg.includes },
			}),
		}),
		putGroupById: build.mutation<PutGroupByIdApiResponse, PutGroupByIdApiArg>({
			query: (queryArg) => ({
				url: `/group/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.scanlationGroupEdit,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		deleteGroupById: build.mutation<DeleteGroupByIdApiResponse, DeleteGroupByIdApiArg>({
			query: (queryArg) => ({ url: `/group/${queryArg.id}`, method: 'DELETE' }),
		}),
		postGroupByIdFollow: build.mutation<
			PostGroupByIdFollowApiResponse,
			PostGroupByIdFollowApiArg
		>({
			query: (queryArg) => ({ url: `/group/${queryArg.id}/follow`, method: 'POST' }),
		}),
		deleteGroupByIdFollow: build.mutation<
			DeleteGroupByIdFollowApiResponse,
			DeleteGroupByIdFollowApiArg
		>({
			query: (queryArg) => ({ url: `/group/${queryArg.id}/follow`, method: 'DELETE' }),
		}),
		postList: build.mutation<PostListApiResponse, PostListApiArg>({
			query: (queryArg) => ({
				url: `/list`,
				method: 'POST',
				body: queryArg.customListCreate,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getListById: build.query<GetListByIdApiResponse, GetListByIdApiArg>({
			query: (queryArg) => ({ url: `/list/${queryArg.id}` }),
		}),
		putListById: build.mutation<PutListByIdApiResponse, PutListByIdApiArg>({
			query: (queryArg) => ({
				url: `/list/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.customListEdit,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		deleteListById: build.mutation<DeleteListByIdApiResponse, DeleteListByIdApiArg>({
			query: (queryArg) => ({ url: `/list/${queryArg.id}`, method: 'DELETE' }),
		}),
		postListByIdFollow: build.mutation<PostListByIdFollowApiResponse, PostListByIdFollowApiArg>(
			{
				query: (queryArg) => ({
					url: `/list/${queryArg.id}/follow`,
					method: 'POST',
					body: queryArg.body,
					headers: { 'Content-Type': queryArg['Content-Type'] },
				}),
			},
		),
		deleteListByIdFollow: build.mutation<
			DeleteListByIdFollowApiResponse,
			DeleteListByIdFollowApiArg
		>({
			query: (queryArg) => ({
				url: `/list/${queryArg.id}/follow`,
				method: 'DELETE',
				body: queryArg.body,
			}),
		}),
		postMangaByIdListAndListId: build.mutation<
			PostMangaByIdListAndListIdApiResponse,
			PostMangaByIdListAndListIdApiArg
		>({
			query: (queryArg) => ({
				url: `/manga/${queryArg.id}/list/${queryArg.listId}`,
				method: 'POST',
			}),
		}),
		deleteMangaByIdListAndListId: build.mutation<
			DeleteMangaByIdListAndListIdApiResponse,
			DeleteMangaByIdListAndListIdApiArg
		>({
			query: (queryArg) => ({
				url: `/manga/${queryArg.id}/list/${queryArg.listId}`,
				method: 'DELETE',
			}),
		}),
		getUserList: build.query<GetUserListApiResponse, GetUserListApiArg>({
			query: (queryArg) => ({
				url: `/user/list`,
				params: { limit: queryArg.limit, offset: queryArg.offset },
			}),
		}),
		getUserByIdList: build.query<GetUserByIdListApiResponse, GetUserByIdListApiArg>({
			query: (queryArg) => ({
				url: `/user/${queryArg.id}/list`,
				params: { limit: queryArg.limit, offset: queryArg.offset },
			}),
		}),
		getUser: build.query<GetUserApiResponse, GetUserApiArg>({
			query: (queryArg) => ({
				url: `/user`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					ids: queryArg.ids,
					username: queryArg.username,
					order: queryArg.order,
				},
			}),
		}),
		getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
			query: (queryArg) => ({ url: `/user/${queryArg.id}` }),
		}),
		deleteUserById: build.mutation<DeleteUserByIdApiResponse, DeleteUserByIdApiArg>({
			query: (queryArg) => ({ url: `/user/${queryArg.id}`, method: 'DELETE' }),
		}),
		postUserDeleteByCode: build.mutation<
			PostUserDeleteByCodeApiResponse,
			PostUserDeleteByCodeApiArg
		>({
			query: (queryArg) => ({ url: `/user/delete/${queryArg.code}`, method: 'POST' }),
		}),
		getChapter: build.query<GetChapterApiResponse, GetChapterApiArg>({
			query: (queryArg) => ({
				url: `/chapter`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					ids: queryArg.ids,
					title: queryArg.title,
					groups: queryArg.groups,
					uploader: queryArg.uploader,
					manga: queryArg.manga,
					volume: queryArg.volume,
					chapter: queryArg.chapter,
					translatedLanguage: queryArg.translatedLanguage,
					originalLanguage: queryArg.originalLanguage,
					excludedOriginalLanguage: queryArg.excludedOriginalLanguage,
					contentRating: queryArg.contentRating,
					excludedGroups: queryArg.excludedGroups,
					excludedUploaders: queryArg.excludedUploaders,
					includeFutureUpdates: queryArg.includeFutureUpdates,
					includeEmptyPages: queryArg.includeEmptyPages,
					includeFuturePublishAt: queryArg.includeFuturePublishAt,
					includeExternalUrl: queryArg.includeExternalUrl,
					createdAtSince: queryArg.createdAtSince,
					updatedAtSince: queryArg.updatedAtSince,
					publishAtSince: queryArg.publishAtSince,
					order: queryArg.order,
					includes: queryArg.includes,
				},
			}),
		}),
		getChapterById: build.query<GetChapterByIdApiResponse, GetChapterByIdApiArg>({
			query: (queryArg) => ({
				url: `/chapter/${queryArg.id}`,
				params: { includes: queryArg.includes },
			}),
		}),
		putChapterById: build.mutation<PutChapterByIdApiResponse, PutChapterByIdApiArg>({
			query: (queryArg) => ({
				url: `/chapter/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.chapterEdit,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		deleteChapterById: build.mutation<DeleteChapterByIdApiResponse, DeleteChapterByIdApiArg>({
			query: (queryArg) => ({ url: `/chapter/${queryArg.id}`, method: 'DELETE' }),
		}),
		getUserFollowsMangaFeed: build.query<
			GetUserFollowsMangaFeedApiResponse,
			GetUserFollowsMangaFeedApiArg
		>({
			query: (queryArg) => ({
				url: `/user/follows/manga/feed`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					translatedLanguage: queryArg.translatedLanguage,
					originalLanguage: queryArg.originalLanguage,
					excludedOriginalLanguage: queryArg.excludedOriginalLanguage,
					contentRating: queryArg.contentRating,
					excludedGroups: queryArg.excludedGroups,
					excludedUploaders: queryArg.excludedUploaders,
					includeFutureUpdates: queryArg.includeFutureUpdates,
					createdAtSince: queryArg.createdAtSince,
					updatedAtSince: queryArg.updatedAtSince,
					publishAtSince: queryArg.publishAtSince,
					order: queryArg.order,
					includes: queryArg.includes,
					includeEmptyPages: queryArg.includeEmptyPages,
					includeFuturePublishAt: queryArg.includeFuturePublishAt,
					includeExternalUrl: queryArg.includeExternalUrl,
				},
			}),
		}),
		getListByIdFeed: build.query<GetListByIdFeedApiResponse, GetListByIdFeedApiArg>({
			query: (queryArg) => ({
				url: `/list/${queryArg.id}/feed`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					translatedLanguage: queryArg.translatedLanguage,
					originalLanguage: queryArg.originalLanguage,
					excludedOriginalLanguage: queryArg.excludedOriginalLanguage,
					contentRating: queryArg.contentRating,
					excludedGroups: queryArg.excludedGroups,
					excludedUploaders: queryArg.excludedUploaders,
					includeFutureUpdates: queryArg.includeFutureUpdates,
					createdAtSince: queryArg.createdAtSince,
					updatedAtSince: queryArg.updatedAtSince,
					publishAtSince: queryArg.publishAtSince,
					order: queryArg.order,
					includes: queryArg.includes,
					includeEmptyPages: queryArg.includeEmptyPages,
					includeFuturePublishAt: queryArg.includeFuturePublishAt,
					includeExternalUrl: queryArg.includeExternalUrl,
				},
			}),
		}),
		deleteMangaByIdFollow: build.mutation<
			DeleteMangaByIdFollowApiResponse,
			DeleteMangaByIdFollowApiArg
		>({
			query: (queryArg) => ({ url: `/manga/${queryArg.id}/follow`, method: 'DELETE' }),
		}),
		postMangaByIdFollow: build.mutation<
			PostMangaByIdFollowApiResponse,
			PostMangaByIdFollowApiArg
		>({
			query: (queryArg) => ({ url: `/manga/${queryArg.id}/follow`, method: 'POST' }),
		}),
		getCover: build.query<GetCoverApiResponse, GetCoverApiArg>({
			query: (queryArg) => ({
				url: `/cover`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					manga: queryArg.manga,
					ids: queryArg.ids,
					uploaders: queryArg.uploaders,
					locales: queryArg.locales,
					order: queryArg.order,
					includes: queryArg.includes,
				},
			}),
		}),
		postCoverByMangaOrCoverId: build.mutation<
			PostCoverByMangaOrCoverIdApiResponse,
			PostCoverByMangaOrCoverIdApiArg
		>({
			query: (queryArg) => ({
				url: `/cover/${queryArg.mangaOrCoverId}`,
				method: 'POST',
				body: queryArg.body,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getCoverByMangaOrCoverId: build.query<
			GetCoverByMangaOrCoverIdApiResponse,
			GetCoverByMangaOrCoverIdApiArg
		>({
			query: (queryArg) => ({
				url: `/cover/${queryArg.mangaOrCoverId}`,
				params: { includes: queryArg.includes },
			}),
		}),
		putCoverByMangaOrCoverId: build.mutation<
			PutCoverByMangaOrCoverIdApiResponse,
			PutCoverByMangaOrCoverIdApiArg
		>({
			query: (queryArg) => ({
				url: `/cover/${queryArg.mangaOrCoverId}`,
				method: 'PUT',
				body: queryArg.coverEdit,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		deleteCoverByMangaOrCoverId: build.mutation<
			DeleteCoverByMangaOrCoverIdApiResponse,
			DeleteCoverByMangaOrCoverIdApiArg
		>({
			query: (queryArg) => ({ url: `/cover/${queryArg.mangaOrCoverId}`, method: 'DELETE' }),
		}),
		getAuthor: build.query<GetAuthorApiResponse, GetAuthorApiArg>({
			query: (queryArg) => ({
				url: `/author`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					ids: queryArg.ids,
					name: queryArg.name,
					order: queryArg.order,
					includes: queryArg.includes,
				},
			}),
		}),
		postAuthor: build.mutation<PostAuthorApiResponse, PostAuthorApiArg>({
			query: (queryArg) => ({
				url: `/author`,
				method: 'POST',
				body: queryArg.authorCreate,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getAuthorById: build.query<GetAuthorByIdApiResponse, GetAuthorByIdApiArg>({
			query: (queryArg) => ({
				url: `/author/${queryArg.id}`,
				params: { includes: queryArg.includes },
			}),
		}),
		putAuthorById: build.mutation<PutAuthorByIdApiResponse, PutAuthorByIdApiArg>({
			query: (queryArg) => ({
				url: `/author/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.authorEdit,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		deleteAuthorById: build.mutation<DeleteAuthorByIdApiResponse, DeleteAuthorByIdApiArg>({
			query: (queryArg) => ({ url: `/author/${queryArg.id}`, method: 'DELETE' }),
		}),
		postLegacyMapping: build.mutation<PostLegacyMappingApiResponse, PostLegacyMappingApiArg>({
			query: (queryArg) => ({
				url: `/legacy/mapping`,
				method: 'POST',
				body: queryArg.mappingIdBody,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getMangaByIdFeed: build.query<GetMangaByIdFeedApiResponse, GetMangaByIdFeedApiArg>({
			query: (queryArg) => ({
				url: `/manga/${queryArg.id}/feed`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					translatedLanguage: queryArg.translatedLanguage,
					originalLanguage: queryArg.originalLanguage,
					excludedOriginalLanguage: queryArg.excludedOriginalLanguage,
					contentRating: queryArg.contentRating,
					excludedGroups: queryArg.excludedGroups,
					excludedUploaders: queryArg.excludedUploaders,
					includeFutureUpdates: queryArg.includeFutureUpdates,
					createdAtSince: queryArg.createdAtSince,
					updatedAtSince: queryArg.updatedAtSince,
					publishAtSince: queryArg.publishAtSince,
					order: queryArg.order,
					includes: queryArg.includes,
					includeEmptyPages: queryArg.includeEmptyPages,
					includeFuturePublishAt: queryArg.includeFuturePublishAt,
					includeExternalUrl: queryArg.includeExternalUrl,
				},
			}),
		}),
		getMangaByIdRead: build.query<GetMangaByIdReadApiResponse, GetMangaByIdReadApiArg>({
			query: (queryArg) => ({ url: `/manga/${queryArg.id}/read` }),
		}),
		postMangaByIdRead: build.mutation<PostMangaByIdReadApiResponse, PostMangaByIdReadApiArg>({
			query: (queryArg) => ({
				url: `/manga/${queryArg.id}/read`,
				method: 'POST',
				body: queryArg.chapterReadMarkerBatch,
				params: { updateHistory: queryArg.updateHistory },
			}),
		}),
		getMangaRead: build.query<GetMangaReadApiResponse, GetMangaReadApiArg>({
			query: (queryArg) => ({
				url: `/manga/read`,
				params: { ids: queryArg.ids, grouped: queryArg.grouped },
			}),
		}),
		getMangaRandom: build.query<GetMangaRandomApiResponse, GetMangaRandomApiArg>({
			query: (queryArg) => ({
				url: `/manga/random`,
				params: {
					includes: queryArg.includes,
					contentRating: queryArg.contentRating,
					includedTags: queryArg.includedTags,
					includedTagsMode: queryArg.includedTagsMode,
					excludedTags: queryArg.excludedTags,
					excludedTagsMode: queryArg.excludedTagsMode,
				},
			}),
		}),
		getAtHomeServerByChapterId: build.query<
			GetAtHomeServerByChapterIdApiResponse,
			GetAtHomeServerByChapterIdApiArg
		>({
			query: (queryArg) => ({
				url: `/at-home/server/${queryArg.chapterId}`,
				params: { forcePort443: queryArg.forcePort443 },
			}),
		}),
		getMangaTag: build.query<GetMangaTagApiResponse, GetMangaTagApiArg>({
			query: () => ({ url: `/manga/tag` }),
		}),
		getUserMe: build.query<GetUserMeApiResponse, GetUserMeApiArg>({
			query: () => ({ url: `/user/me` }),
		}),
		getUserFollowsGroup: build.query<GetUserFollowsGroupApiResponse, GetUserFollowsGroupApiArg>(
			{
				query: (queryArg) => ({
					url: `/user/follows/group`,
					params: {
						limit: queryArg.limit,
						offset: queryArg.offset,
						includes: queryArg.includes,
					},
				}),
			},
		),
		getUserFollowsGroupById: build.query<
			GetUserFollowsGroupByIdApiResponse,
			GetUserFollowsGroupByIdApiArg
		>({
			query: (queryArg) => ({ url: `/user/follows/group/${queryArg.id}` }),
		}),
		getUserFollowsUser: build.query<GetUserFollowsUserApiResponse, GetUserFollowsUserApiArg>({
			query: (queryArg) => ({
				url: `/user/follows/user`,
				params: { limit: queryArg.limit, offset: queryArg.offset },
			}),
		}),
		getUserFollowsUserById: build.query<
			GetUserFollowsUserByIdApiResponse,
			GetUserFollowsUserByIdApiArg
		>({
			query: (queryArg) => ({ url: `/user/follows/user/${queryArg.id}` }),
		}),
		getUserFollowsManga: build.query<GetUserFollowsMangaApiResponse, GetUserFollowsMangaApiArg>(
			{
				query: (queryArg) => ({
					url: `/user/follows/manga`,
					params: {
						limit: queryArg.limit,
						offset: queryArg.offset,
						includes: queryArg.includes,
					},
				}),
			},
		),
		getUserFollowsMangaById: build.query<
			GetUserFollowsMangaByIdApiResponse,
			GetUserFollowsMangaByIdApiArg
		>({
			query: (queryArg) => ({ url: `/user/follows/manga/${queryArg.id}` }),
		}),
		getUserFollowsList: build.query<GetUserFollowsListApiResponse, GetUserFollowsListApiArg>({
			query: (queryArg) => ({
				url: `/user/follows/list`,
				params: { limit: queryArg.limit, offset: queryArg.offset },
			}),
		}),
		getUserFollowsListById: build.query<
			GetUserFollowsListByIdApiResponse,
			GetUserFollowsListByIdApiArg
		>({
			query: (queryArg) => ({ url: `/user/follows/list/${queryArg.id}` }),
		}),
		getMangaStatus: build.query<GetMangaStatusApiResponse, GetMangaStatusApiArg>({
			query: (queryArg) => ({ url: `/manga/status`, params: { status: queryArg.status } }),
		}),
		getMangaByIdStatus: build.query<GetMangaByIdStatusApiResponse, GetMangaByIdStatusApiArg>({
			query: (queryArg) => ({ url: `/manga/${queryArg.id}/status` }),
		}),
		postMangaByIdStatus: build.mutation<
			PostMangaByIdStatusApiResponse,
			PostMangaByIdStatusApiArg
		>({
			query: (queryArg) => ({
				url: `/manga/${queryArg.id}/status`,
				method: 'POST',
				body: queryArg.updateMangaStatus,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getMangaDraftById: build.query<GetMangaDraftByIdApiResponse, GetMangaDraftByIdApiArg>({
			query: (queryArg) => ({
				url: `/manga/draft/${queryArg.id}`,
				params: { includes: queryArg.includes },
			}),
		}),
		postMangaDraftByIdCommit: build.mutation<
			PostMangaDraftByIdCommitApiResponse,
			PostMangaDraftByIdCommitApiArg
		>({
			query: (queryArg) => ({
				url: `/manga/draft/${queryArg.id}/commit`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		getMangaDraft: build.query<GetMangaDraftApiResponse, GetMangaDraftApiArg>({
			query: (queryArg) => ({
				url: `/manga/draft`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					state: queryArg.state,
					order: queryArg.order,
					includes: queryArg.includes,
				},
			}),
		}),
		postCaptchaSolve: build.mutation<PostCaptchaSolveApiResponse, PostCaptchaSolveApiArg>({
			query: (queryArg) => ({
				url: `/captcha/solve`,
				method: 'POST',
				body: queryArg.body,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getReportReasonsByCategory: build.query<
			GetReportReasonsByCategoryApiResponse,
			GetReportReasonsByCategoryApiArg
		>({
			query: (queryArg) => ({ url: `/report/reasons/${queryArg.category}` }),
		}),
		getReport: build.query<GetReportApiResponse, GetReportApiArg>({
			query: (queryArg) => ({
				url: `/report`,
				params: {
					limit: queryArg.limit,
					offset: queryArg.offset,
					category: queryArg.category,
					reasonId: queryArg.reasonId,
					objectId: queryArg.objectId,
					status: queryArg.status,
					order: queryArg.order,
					includes: queryArg.includes,
				},
			}),
		}),
		postReport: build.mutation<PostReportApiResponse, PostReportApiArg>({
			query: (queryArg) => ({
				url: `/report`,
				method: 'POST',
				body: queryArg.body,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		getUpload: build.query<GetUploadApiResponse, GetUploadApiArg>({
			query: () => ({ url: `/upload` }),
		}),
		postUploadBegin: build.mutation<PostUploadBeginApiResponse, PostUploadBeginApiArg>({
			query: (queryArg) => ({
				url: `/upload/begin`,
				method: 'POST',
				body: queryArg.beginUploadSession,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		postUploadBeginByChapterId: build.mutation<
			PostUploadBeginByChapterIdApiResponse,
			PostUploadBeginByChapterIdApiArg
		>({
			query: (queryArg) => ({
				url: `/upload/begin/${queryArg.chapterId}`,
				method: 'POST',
				body: queryArg.beginEditSession,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		postUploadByUploadSessionId: build.mutation<
			PostUploadByUploadSessionIdApiResponse,
			PostUploadByUploadSessionIdApiArg
		>({
			query: (queryArg) => ({
				url: `/upload/${queryArg.uploadSessionId}`,
				method: 'POST',
				body: queryArg.body,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		deleteUploadByUploadSessionId: build.mutation<
			DeleteUploadByUploadSessionIdApiResponse,
			DeleteUploadByUploadSessionIdApiArg
		>({
			query: (queryArg) => ({ url: `/upload/${queryArg.uploadSessionId}`, method: 'DELETE' }),
		}),
		postUploadByUploadSessionIdCommit: build.mutation<
			PostUploadByUploadSessionIdCommitApiResponse,
			PostUploadByUploadSessionIdCommitApiArg
		>({
			query: (queryArg) => ({
				url: `/upload/${queryArg.uploadSessionId}/commit`,
				method: 'POST',
				body: queryArg.commitUploadSession,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		deleteUploadByUploadSessionIdAndUploadSessionFileId: build.mutation<
			DeleteUploadByUploadSessionIdAndUploadSessionFileIdApiResponse,
			DeleteUploadByUploadSessionIdAndUploadSessionFileIdApiArg
		>({
			query: (queryArg) => ({
				url: `/upload/${queryArg.uploadSessionId}/${queryArg.uploadSessionFileId}`,
				method: 'DELETE',
			}),
		}),
		deleteUploadByUploadSessionIdBatch: build.mutation<
			DeleteUploadByUploadSessionIdBatchApiResponse,
			DeleteUploadByUploadSessionIdBatchApiArg
		>({
			query: (queryArg) => ({
				url: `/upload/${queryArg.uploadSessionId}/batch`,
				method: 'DELETE',
				body: queryArg.body,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		postUploadCheckApprovalRequired: build.mutation<
			PostUploadCheckApprovalRequiredApiResponse,
			PostUploadCheckApprovalRequiredApiArg
		>({
			query: (queryArg) => ({
				url: `/upload/check-approval-required`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		getMangaByMangaIdRelation: build.query<
			GetMangaByMangaIdRelationApiResponse,
			GetMangaByMangaIdRelationApiArg
		>({
			query: (queryArg) => ({
				url: `/manga/${queryArg.mangaId}/relation`,
				params: { includes: queryArg.includes },
			}),
		}),
		postMangaByMangaIdRelation: build.mutation<
			PostMangaByMangaIdRelationApiResponse,
			PostMangaByMangaIdRelationApiArg
		>({
			query: (queryArg) => ({
				url: `/manga/${queryArg.mangaId}/relation`,
				method: 'POST',
				body: queryArg.mangaRelationCreate,
				headers: { 'Content-Type': queryArg['Content-Type'] },
			}),
		}),
		deleteMangaByMangaIdRelationAndId: build.mutation<
			DeleteMangaByMangaIdRelationAndIdApiResponse,
			DeleteMangaByMangaIdRelationAndIdApiArg
		>({
			query: (queryArg) => ({
				url: `/manga/${queryArg.mangaId}/relation/${queryArg.id}`,
				method: 'DELETE',
			}),
		}),
		getRating: build.query<GetRatingApiResponse, GetRatingApiArg>({
			query: (queryArg) => ({ url: `/rating`, params: { manga: queryArg.manga } }),
		}),
		postRatingByMangaId: build.mutation<
			PostRatingByMangaIdApiResponse,
			PostRatingByMangaIdApiArg
		>({
			query: (queryArg) => ({
				url: `/rating/${queryArg.mangaId}`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		deleteRatingByMangaId: build.mutation<
			DeleteRatingByMangaIdApiResponse,
			DeleteRatingByMangaIdApiArg
		>({
			query: (queryArg) => ({ url: `/rating/${queryArg.mangaId}`, method: 'DELETE' }),
		}),
		getStatisticsChapterByUuid: build.query<
			GetStatisticsChapterByUuidApiResponse,
			GetStatisticsChapterByUuidApiArg
		>({
			query: (queryArg) => ({ url: `/statistics/chapter/${queryArg.uuid}` }),
		}),
		getStatisticsChapter: build.query<
			GetStatisticsChapterApiResponse,
			GetStatisticsChapterApiArg
		>({
			query: (queryArg) => ({
				url: `/statistics/chapter`,
				params: { chapter: queryArg.chapter },
			}),
		}),
		getStatisticsGroupByUuid: build.query<
			GetStatisticsGroupByUuidApiResponse,
			GetStatisticsGroupByUuidApiArg
		>({
			query: (queryArg) => ({ url: `/statistics/group/${queryArg.uuid}` }),
		}),
		getStatisticsGroup: build.query<GetStatisticsGroupApiResponse, GetStatisticsGroupApiArg>({
			query: (queryArg) => ({ url: `/statistics/group`, params: { group: queryArg.group } }),
		}),
		getStatisticsMangaByUuid: build.query<
			GetStatisticsMangaByUuidApiResponse,
			GetStatisticsMangaByUuidApiArg
		>({
			query: (queryArg) => ({ url: `/statistics/manga/${queryArg.uuid}` }),
		}),
		getStatisticsManga: build.query<GetStatisticsMangaApiResponse, GetStatisticsMangaApiArg>({
			query: (queryArg) => ({ url: `/statistics/manga`, params: { manga: queryArg.manga } }),
		}),
		getSettingsTemplate: build.query<GetSettingsTemplateApiResponse, GetSettingsTemplateApiArg>(
			{
				query: () => ({ url: `/settings/template` }),
			},
		),
		postSettingsTemplate: build.mutation<
			PostSettingsTemplateApiResponse,
			PostSettingsTemplateApiArg
		>({
			query: (queryArg) => ({
				url: `/settings/template`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		getSettingsTemplateByVersion: build.query<
			GetSettingsTemplateByVersionApiResponse,
			GetSettingsTemplateByVersionApiArg
		>({
			query: (queryArg) => ({ url: `/settings/template/${queryArg.version}` }),
		}),
		getSettings: build.query<GetSettingsApiResponse, GetSettingsApiArg>({
			query: () => ({ url: `/settings` }),
		}),
		postSettings: build.mutation<PostSettingsApiResponse, PostSettingsApiArg>({
			query: (queryArg) => ({ url: `/settings`, method: 'POST', body: queryArg.body }),
		}),
		getUserHistory: build.query<GetUserHistoryApiResponse, GetUserHistoryApiArg>({
			query: () => ({ url: `/user/history` }),
		}),
		postForumsThread: build.mutation<PostForumsThreadApiResponse, PostForumsThreadApiArg>({
			query: (queryArg) => ({ url: `/forums/thread`, method: 'POST', body: queryArg.body }),
		}),
	}),
	overrideExisting: false,
});
export { injectedRtkApi as mangadexApi };
export type GetPingApiResponse = unknown;
export type GetPingApiArg = void;
export type GetMangaApiResponse = /** status 200 Manga list */ MangaList;
export type GetMangaApiArg = {
	limit?: number;
	offset?: number;
	title?: string;
	authorOrArtist?: string;
	authors?: {
		''?: string[];
	};
	artists?: {
		''?: string[];
	};
	/** Year of release or none */
	year?: number | 'none';
	includedTags?: {
		''?: string[];
	};
	includedTagsMode?: 'AND' | 'OR';
	excludedTags?: {
		''?: string[];
	};
	excludedTagsMode?: 'AND' | 'OR';
	status?: {
		''?: ('ongoing' | 'completed' | 'hiatus' | 'cancelled')[];
	};
	originalLanguage?: {
		''?: string[];
	};
	excludedOriginalLanguage?: {
		''?: string[];
	};
	availableTranslatedLanguage?: {
		''?: string[];
	};
	publicationDemographic?: {
		''?: ('shounen' | 'shoujo' | 'josei' | 'seinen' | 'none')[];
	};
	ids?: {
		''?: string[];
	};
	contentRating?: {
		''?: ('safe' | 'suggestive' | 'erotica' | 'pornographic')[];
	};
	createdAtSince?: string;
	updatedAtSince?: string;
	order?: {
		title?: 'asc' | 'desc';
		year?: 'asc' | 'desc';
		createdAt?: 'asc' | 'desc';
		updatedAt?: 'asc' | 'desc';
		latestUploadedChapter?: 'asc' | 'desc';
		followedCount?: 'asc' | 'desc';
		relevance?: 'asc' | 'desc';
		rating?: 'asc' | 'desc';
	};
	includes?: {
		''?: ReferenceExpansionManga;
	};
	hasAvailableChapters?: '0' | '1' | 'true' | 'false';
	group?: string;
};
export type PostMangaApiResponse = /** status 200 Manga Created */ MangaResponse;
export type PostMangaApiArg = {
	'Content-Type': string;
	/** The size of the body is limited to 64KB. */
	mangaCreate: MangaCreate;
};
export type GetMangaByIdAggregateApiResponse = /** status 200 OK */ {
	result?: string;
	volumes?: {
		[key: string]: {
			volume?: string;
			count?: number;
			chapters?: {
				[key: string]: {
					chapter?: string;
					id?: string;
					others?: string[];
					count?: number;
				};
			};
		};
	};
};
export type GetMangaByIdAggregateApiArg = {
	/** Manga ID */
	id: string;
	translatedLanguage?: {
		''?: string[];
	};
	groups?: {
		''?: string[];
	};
};
export type GetMangaByIdApiResponse = /** status 200 OK */ MangaResponse;
export type GetMangaByIdApiArg = {
	/** Manga ID */
	id: string;
	includes?: {
		''?: ReferenceExpansionManga;
	};
};
export type PutMangaByIdApiResponse = /** status 200 OK */ MangaResponse;
export type PutMangaByIdApiArg = {
	/** Manga ID */
	id: string;
	'Content-Type': string;
	/** The size of the body is limited to 64KB. */
	body: MangaEdit & {
		artists?: string[];
		authors?: string[];
	};
};
export type DeleteMangaByIdApiResponse = /** status 200 Manga has been deleted. */ Response;
export type DeleteMangaByIdApiArg = {
	/** Manga ID */
	id: string;
};
export type PostAuthLoginApiResponse = /** status 200 OK */ LoginResponse;
export type PostAuthLoginApiArg = {
	'Content-Type': string;
	/** The size of the body is limited to 2KB. */
	login: Login;
};
export type GetAuthCheckApiResponse = /** status 200 OK */ CheckResponse;
export type GetAuthCheckApiArg = void;
export type PostAuthLogoutApiResponse = /** status 200 OK */ LogoutResponse;
export type PostAuthLogoutApiArg = void;
export type PostAuthRefreshApiResponse = /** status 200 OK */ RefreshResponse;
export type PostAuthRefreshApiArg = {
	'Content-Type': string;
	/** The size of the body is limited to 2KB. */
	refreshToken: RefreshToken;
};
export type GetClientApiResponse = /** status 200 OK */ ApiClientList;
export type GetClientApiArg = {
	limit?: number;
	offset?: number;
	state?: 'requested' | 'approved' | 'rejected' | 'autoapproved';
	name?: string;
	includes?: {
		''?: ReferenceExpansionApiClient;
	};
	order?: {
		name?: 'asc' | 'desc';
		createdAt?: 'asc' | 'desc';
		updatedAt?: 'asc' | 'desc';
	};
};
export type PostClientApiResponse = /** status 200 OK */ ApiClientResponse;
export type PostClientApiArg = {
	'Content-Type': string;
	apiClientCreate: ApiClientCreate;
};
export type GetClientByIdApiResponse = /** status 200 OK */ ApiClientResponse;
export type GetClientByIdApiArg = {
	/** ApiClient ID */
	id: string;
	includes?: {
		''?: ReferenceExpansionApiClient;
	};
};
export type PostClientByIdApiResponse = /** status 200 OK */ ApiClientResponse;
export type PostClientByIdApiArg = {
	/** ApiClient ID */
	id: string;
	'Content-Type': string;
	apiClientEdit: ApiClient2;
};
export type DeleteClientByIdApiResponse = /** status 200 OK */ {
	result?: string;
};
export type DeleteClientByIdApiArg = {
	/** ApiClient ID */
	id: string;
	version?: string;
};
export type GetClientByIdSecretApiResponse = /** status 200 OK */ {
	result?: 'ok';
	data?: string;
};
export type GetClientByIdSecretApiArg = {
	/** ApiClient ID */
	id: string;
};
export type PostClientByIdSecretApiResponse = /** status 200 OK */ {
	result?: 'ok';
	data?: string;
};
export type PostClientByIdSecretApiArg = {
	/** ApiClient ID */
	id: string;
	'Content-Type': string;
	body: object;
};
export type GetGroupApiResponse = /** status 200 OK */ ScanlationGroupList;
export type GetGroupApiArg = {
	limit?: number;
	offset?: number;
	ids?: {
		''?: string[];
	};
	name?: string;
	focusedLanguage?: string;
	includes?: {
		''?: ReferenceExpansionScanlationGroup;
	};
	order?: {
		name?: 'asc' | 'desc';
		createdAt?: 'asc' | 'desc';
		updatedAt?: 'asc' | 'desc';
		followedCount?: 'asc' | 'desc';
		relevance?: 'asc' | 'desc';
	};
};
export type PostGroupApiResponse = /** status 200 OK */ ScanlationGroupResponse;
export type PostGroupApiArg = {
	'Content-Type': string;
	/** The size of the body is limited to 16KB. */
	createScanlationGroup: CreateScanlationGroup;
};
export type GetGroupByIdApiResponse = /** status 200 OK */ ScanlationGroupResponse;
export type GetGroupByIdApiArg = {
	/** Scanlation Group ID */
	id: string;
	includes?: {
		''?: ReferenceExpansionScanlationGroup;
	};
};
export type PutGroupByIdApiResponse = /** status 200 OK */ ScanlationGroupResponse;
export type PutGroupByIdApiArg = {
	/** Scanlation Group ID */
	id: string;
	'Content-Type': string;
	/** The size of the body is limited to 8KB. */
	scanlationGroupEdit: ScanlationGroupEdit;
};
export type DeleteGroupByIdApiResponse = /** status 200 OK */ Response;
export type DeleteGroupByIdApiArg = {
	/** Scanlation Group ID */
	id: string;
};
export type PostGroupByIdFollowApiResponse = /** status 200 OK */ Response;
export type PostGroupByIdFollowApiArg = {
	id: string;
};
export type DeleteGroupByIdFollowApiResponse = /** status 200 OK */ Response;
export type DeleteGroupByIdFollowApiArg = {
	id: string;
};
export type PostListApiResponse = /** status 200 OK */ CustomListResponse;
export type PostListApiArg = {
	'Content-Type': string;
	/** The size of the body is limited to 8KB. */
	customListCreate: CustomListCreate;
};
export type GetListByIdApiResponse = /** status 200 OK */ CustomListResponse;
export type GetListByIdApiArg = {
	/** CustomList ID */
	id: string;
};
export type PutListByIdApiResponse = /** status 200 OK */ CustomListResponse;
export type PutListByIdApiArg = {
	/** CustomList ID */
	id: string;
	'Content-Type': string;
	customListEdit: CustomListEdit;
};
export type DeleteListByIdApiResponse = /** status 200 OK */ Response;
export type DeleteListByIdApiArg = {
	/** CustomList ID */
	id: string;
};
export type PostListByIdFollowApiResponse = /** status 200 OK */ {
	result?: 'ok';
};
export type PostListByIdFollowApiArg = {
	/** CustomList ID */
	id: string;
	'Content-Type': string;
	body: object;
};
export type DeleteListByIdFollowApiResponse = /** status 200 OK */ {
	result?: 'ok';
};
export type DeleteListByIdFollowApiArg = {
	/** CustomList ID */
	id: string;
	body: object;
};
export type PostMangaByIdListAndListIdApiResponse = /** status 200 OK */ Response;
export type PostMangaByIdListAndListIdApiArg = {
	/** Manga ID */
	id: string;
	/** CustomList ID */
	listId: string;
};
export type DeleteMangaByIdListAndListIdApiResponse = /** status 200 OK */ Response;
export type DeleteMangaByIdListAndListIdApiArg = {
	/** Manga ID */
	id: string;
	/** CustomList ID */
	listId: string;
};
export type GetUserListApiResponse = /** status 200 OK */ CustomListList;
export type GetUserListApiArg = {
	limit?: number;
	offset?: number;
};
export type GetUserByIdListApiResponse = /** status 200 OK */ CustomListList;
export type GetUserByIdListApiArg = {
	/** User ID */
	id: string;
	limit?: number;
	offset?: number;
};
export type GetUserApiResponse = /** status 200 OK */ UserList;
export type GetUserApiArg = {
	limit?: number;
	offset?: number;
	ids?: {
		''?: string[];
	};
	username?: string;
	order?: {
		username?: 'asc' | 'desc';
	};
};
export type GetUserByIdApiResponse = /** status 200 OK */ UserResponse;
export type GetUserByIdApiArg = {
	/** User ID */
	id: string;
};
export type DeleteUserByIdApiResponse = /** status 200 OK */ Response;
export type DeleteUserByIdApiArg = {
	/** User ID */
	id: string;
};
export type PostUserDeleteByCodeApiResponse = /** status 200 OK */ Response;
export type PostUserDeleteByCodeApiArg = {
	/** User delete code */
	code: string;
};
export type GetChapterApiResponse = /** status 200 Chapter list */ ChapterList;
export type GetChapterApiArg = {
	limit?: number;
	offset?: number;
	ids?: {
		''?: string[];
	};
	title?: string;
	groups?: {
		''?: string[];
	};
	uploader?: string | string[];
	manga?: string;
	volume?: {
		''?: string | string[];
	};
	chapter?: string | string[];
	translatedLanguage?: {
		''?: string[];
	};
	originalLanguage?: {
		''?: string[];
	};
	excludedOriginalLanguage?: {
		''?: string[];
	};
	contentRating?: {
		''?: ('safe' | 'suggestive' | 'erotica' | 'pornographic')[];
	};
	excludedGroups?: {
		''?: string[];
	};
	excludedUploaders?: {
		''?: string[];
	};
	includeFutureUpdates?: '0' | '1';
	includeEmptyPages?: 0 | 1;
	includeFuturePublishAt?: 0 | 1;
	includeExternalUrl?: 0 | 1;
	createdAtSince?: string;
	updatedAtSince?: string;
	publishAtSince?: string;
	order?: {
		createdAt?: 'asc' | 'desc';
		updatedAt?: 'asc' | 'desc';
		publishAt?: 'asc' | 'desc';
		readableAt?: 'asc' | 'desc';
		volume?: 'asc' | 'desc';
		chapter?: 'asc' | 'desc';
	};
	includes?: ('manga' | 'scanlation_group' | 'user')[];
};
export type GetChapterByIdApiResponse = /** status 200 OK */ ChapterResponse;
export type GetChapterByIdApiArg = {
	/** Chapter ID */
	id: string;
	includes?: {
		''?: ReferenceExpansionChapter;
	};
};
export type PutChapterByIdApiResponse = /** status 200 OK */ ChapterResponse;
export type PutChapterByIdApiArg = {
	/** Chapter ID */
	id: string;
	'Content-Type': string;
	/** The size of the body is limited to 32KB. */
	chapterEdit: ChapterEdit;
};
export type DeleteChapterByIdApiResponse = /** status 200 Chapter has been deleted. */ Response;
export type DeleteChapterByIdApiArg = {
	/** Chapter ID */
	id: string;
};
export type GetUserFollowsMangaFeedApiResponse = /** status 200 OK */ ChapterList;
export type GetUserFollowsMangaFeedApiArg = {
	limit?: number;
	offset?: number;
	translatedLanguage?: {
		''?: string[];
	};
	originalLanguage?: {
		''?: string[];
	};
	excludedOriginalLanguage?: {
		''?: string[];
	};
	contentRating?: {
		''?: ('safe' | 'suggestive' | 'erotica' | 'pornographic')[];
	};
	excludedGroups?: {
		''?: string[];
	};
	excludedUploaders?: {
		''?: string[];
	};
	includeFutureUpdates?: '0' | '1';
	createdAtSince?: string;
	updatedAtSince?: string;
	publishAtSince?: string;
	order?: {
		createdAt?: 'asc' | 'desc';
		updatedAt?: 'asc' | 'desc';
		publishAt?: 'asc' | 'desc';
		readableAt?: 'asc' | 'desc';
		volume?: 'asc' | 'desc';
		chapter?: 'asc' | 'desc';
	};
	includes?: {
		''?: ReferenceExpansionChapter;
	};
	includeEmptyPages?: 0 | 1;
	includeFuturePublishAt?: 0 | 1;
	includeExternalUrl?: 0 | 1;
};
export type GetListByIdFeedApiResponse = /** status 200 OK */ ChapterList;
export type GetListByIdFeedApiArg = {
	id: string;
	limit?: number;
	offset?: number;
	translatedLanguage?: {
		''?: string[];
	};
	originalLanguage?: {
		''?: string[];
	};
	excludedOriginalLanguage?: {
		''?: string[];
	};
	contentRating?: {
		''?: ('safe' | 'suggestive' | 'erotica' | 'pornographic')[];
	};
	excludedGroups?: {
		''?: string[];
	};
	excludedUploaders?: {
		''?: string[];
	};
	includeFutureUpdates?: '0' | '1';
	createdAtSince?: string;
	updatedAtSince?: string;
	publishAtSince?: string;
	order?: {
		createdAt?: 'asc' | 'desc';
		updatedAt?: 'asc' | 'desc';
		publishAt?: 'asc' | 'desc';
		readableAt?: 'asc' | 'desc';
		volume?: 'asc' | 'desc';
		chapter?: 'asc' | 'desc';
	};
	includes?: {
		''?: ReferenceExpansionChapter;
	};
	includeEmptyPages?: 0 | 1;
	includeFuturePublishAt?: 0 | 1;
	includeExternalUrl?: 0 | 1;
};
export type DeleteMangaByIdFollowApiResponse = /** status 200 OK */ Response;
export type DeleteMangaByIdFollowApiArg = {
	id: string;
};
export type PostMangaByIdFollowApiResponse = /** status 200 OK */ Response;
export type PostMangaByIdFollowApiArg = {
	id: string;
};
export type GetCoverApiResponse = /** status 200 OK */ CoverList;
export type GetCoverApiArg = {
	limit?: number;
	offset?: number;
	manga?: {
		''?: string[];
	};
	ids?: {
		''?: string[];
	};
	uploaders?: {
		''?: string[];
	};
	locales?: {
		''?: string[];
	};
	order?: {
		createdAt?: 'asc' | 'desc';
		updatedAt?: 'asc' | 'desc';
		volume?: 'asc' | 'desc';
	};
	includes?: {
		''?: ReferenceExpansionCoverArt;
	};
};
export type PostCoverByMangaOrCoverIdApiResponse = /** status 200 OK */ CoverResponse;
export type PostCoverByMangaOrCoverIdApiArg = {
	/** Is Manga UUID on POST */
	mangaOrCoverId: string;
	'Content-Type': string;
	body: {
		file?: Blob;
		volume?: string | null;
		description?: string;
		locale?: string;
	};
};
export type GetCoverByMangaOrCoverIdApiResponse = /** status 200 OK */ CoverResponse;
export type GetCoverByMangaOrCoverIdApiArg = {
	/** Is Manga UUID on POST */
	mangaOrCoverId: string;
	includes?: {
		''?: ReferenceExpansionCoverArt;
	};
};
export type PutCoverByMangaOrCoverIdApiResponse = /** status 200 OK */ CoverResponse;
export type PutCoverByMangaOrCoverIdApiArg = {
	/** Is Manga UUID on POST */
	mangaOrCoverId: string;
	'Content-Type': string;
	/** The size of the body is limited to 2KB. */
	coverEdit: CoverEdit;
};
export type DeleteCoverByMangaOrCoverIdApiResponse = /** status 200 OK */ Response;
export type DeleteCoverByMangaOrCoverIdApiArg = {
	/** Is Manga UUID on POST */
	mangaOrCoverId: string;
};
export type GetAuthorApiResponse = /** status 200 OK */ AuthorList;
export type GetAuthorApiArg = {
	limit?: number;
	offset?: number;
	ids?: {
		''?: string[];
	};
	name?: string;
	order?: {
		name?: 'asc' | 'desc';
	};
	includes?: {
		''?: ReferenceExpansionAuthor;
	};
};
export type PostAuthorApiResponse = /** status 200 OK */ AuthorResponse;
export type PostAuthorApiArg = {
	'Content-Type': string;
	/** The size of the body is limited to 8KB. */
	authorCreate: AuthorCreate;
};
export type GetAuthorByIdApiResponse = /** status 200 OK */ AuthorResponse;
export type GetAuthorByIdApiArg = {
	/** Author ID */
	id: string;
	includes?: {
		''?: ReferenceExpansionAuthor;
	};
};
export type PutAuthorByIdApiResponse = /** status 200 OK */ AuthorResponse;
export type PutAuthorByIdApiArg = {
	/** Author ID */
	id: string;
	'Content-Type': string;
	/** The size of the body is limited to 8KB. */
	authorEdit: AuthorEdit;
};
export type DeleteAuthorByIdApiResponse = /** status 200 OK */ Response;
export type DeleteAuthorByIdApiArg = {
	/** Author ID */
	id: string;
};
export type PostLegacyMappingApiResponse =
	/** status 200 This response will give you an array of mappings of resource identifiers ; the `data.attributes.newId` field corresponds to the new UUID. */ MappingIdResponse;
export type PostLegacyMappingApiArg = {
	'Content-Type': string;
	/** The size of the body is limited to 10KB. */
	mappingIdBody: MappingIdBody;
};
export type GetMangaByIdFeedApiResponse = /** status 200 OK */ ChapterList;
export type GetMangaByIdFeedApiArg = {
	/** Manga ID */
	id: string;
	limit?: number;
	offset?: number;
	translatedLanguage?: {
		''?: string[];
	};
	originalLanguage?: {
		''?: string[];
	};
	excludedOriginalLanguage?: {
		''?: string[];
	};
	contentRating?: {
		''?: ('safe' | 'suggestive' | 'erotica' | 'pornographic')[];
	};
	excludedGroups?: {
		''?: string[];
	};
	excludedUploaders?: {
		''?: string[];
	};
	includeFutureUpdates?: '0' | '1';
	createdAtSince?: string;
	updatedAtSince?: string;
	publishAtSince?: string;
	order?: {
		createdAt?: 'asc' | 'desc';
		updatedAt?: 'asc' | 'desc';
		publishAt?: 'asc' | 'desc';
		readableAt?: 'asc' | 'desc';
		volume?: 'asc' | 'desc';
		chapter?: 'asc' | 'desc';
	};
	includes?: {
		''?: ReferenceExpansionChapter;
	};
	includeEmptyPages?: 0 | 1;
	includeFuturePublishAt?: 0 | 1;
	includeExternalUrl?: 0 | 1;
};
export type GetMangaByIdReadApiResponse = /** status 200 OK */ {
	result?: 'ok';
	data?: string[];
};
export type GetMangaByIdReadApiArg = {
	id: string;
};
export type PostMangaByIdReadApiResponse = /** status 200 OK */ {
	result?: 'ok';
};
export type PostMangaByIdReadApiArg = {
	id: string;
	/** Adding this will cause the chapter to be stored in the user's reading history */
	updateHistory?: boolean;
	/** The size of the body is limited to 10KB. */
	chapterReadMarkerBatch: ChapterReadMarkersBatch;
};
export type GetMangaReadApiResponse = /** status 200 OK */ {
	result?: 'ok';
	data?:
		| string[]
		| {
				[key: string]: string[];
		  };
};
export type GetMangaReadApiArg = {
	ids?: {
		''?: string[];
	};
	/** Group results by manga ids */
	grouped?: boolean;
};
export type GetMangaRandomApiResponse = /** status 200 OK */ MangaResponse;
export type GetMangaRandomApiArg = {
	includes?: {
		''?: ReferenceExpansionManga;
	};
	contentRating?: {
		''?: ('safe' | 'suggestive' | 'erotica' | 'pornographic')[];
	};
	includedTags?: {
		''?: string[];
	};
	includedTagsMode?: 'AND' | 'OR';
	excludedTags?: {
		''?: string[];
	};
	excludedTagsMode?: 'AND' | 'OR';
};
export type GetAtHomeServerByChapterIdApiResponse = /** status 200 OK */ {
	result?: string;
	baseUrl?: string;
	chapter?: {
		hash?: string;
		data?: string[];
		dataSaver?: string[];
	};
};
export type GetAtHomeServerByChapterIdApiArg = {
	/** Chapter ID */
	chapterId: string;
	/** Force selecting from MangaDex@Home servers that use the standard HTTPS port 443.
    
    While the conventional port for HTTPS traffic is 443 and servers are encouraged to use it, it is not a hard requirement as it technically isn't
    anything special.
    
    However, some misbehaving school/office network will at time block traffic to non-standard ports, and setting this flag to `true` will ensure
    selection of a server that uses these. */
	forcePort443?: boolean;
};
export type GetMangaTagApiResponse = /** status 200 OK */ TagResponse;
export type GetMangaTagApiArg = void;
export type GetUserMeApiResponse = /** status 200 OK */ UserResponse;
export type GetUserMeApiArg = void;
export type GetUserFollowsGroupApiResponse = /** status 200 OK */ ScanlationGroupList;
export type GetUserFollowsGroupApiArg = {
	limit?: number;
	offset?: number;
	includes?: {
		''?: ReferenceExpansionScanlationGroup;
	};
};
export type GetUserFollowsGroupByIdApiResponse =
	/** status 200 The User follow that Group */ Response;
export type GetUserFollowsGroupByIdApiArg = {
	/** Scanlation Group id */
	id: string;
};
export type GetUserFollowsUserApiResponse = /** status 200 OK */ UserList;
export type GetUserFollowsUserApiArg = {
	limit?: number;
	offset?: number;
};
export type GetUserFollowsUserByIdApiResponse =
	/** status 200 The User follow that User */ Response;
export type GetUserFollowsUserByIdApiArg = {
	/** User id */
	id: string;
};
export type GetUserFollowsMangaApiResponse = /** status 200 OK */ MangaList;
export type GetUserFollowsMangaApiArg = {
	limit?: number;
	offset?: number;
	includes?: {
		''?: ReferenceExpansionManga;
	};
};
export type GetUserFollowsMangaByIdApiResponse =
	/** status 200 The User follow that Manga */ Response;
export type GetUserFollowsMangaByIdApiArg = {
	/** Manga id */
	id: string;
};
export type GetUserFollowsListApiResponse = /** status 200 OK */ CustomListList;
export type GetUserFollowsListApiArg = {
	limit?: number;
	offset?: number;
};
export type GetUserFollowsListByIdApiResponse =
	/** status 200 The User follow that CustomList */ Response;
export type GetUserFollowsListByIdApiArg = {
	/** CustomList id */
	id: string;
};
export type GetMangaStatusApiResponse = /** status 200 OK */ {
	result?: string;
	statuses?: {
		[key: string]:
			| 'reading'
			| 'on_hold'
			| 'plan_to_read'
			| 'dropped'
			| 're_reading'
			| 'completed';
	};
};
export type GetMangaStatusApiArg = {
	/** Used to filter the list by given status */
	status?: 'reading' | 'on_hold' | 'plan_to_read' | 'dropped' | 're_reading' | 'completed';
};
export type GetMangaByIdStatusApiResponse = /** status 200 OK */ {
	result?: string;
	status?: 'reading' | 'on_hold' | 'plan_to_read' | 'dropped' | 're_reading' | 'completed';
};
export type GetMangaByIdStatusApiArg = {
	id: string;
};
export type PostMangaByIdStatusApiResponse = /** status 200 OK */ Response;
export type PostMangaByIdStatusApiArg = {
	id: string;
	'Content-Type': string;
	/** Using a `null` value in `status` field will remove the Manga reading status. The size of the body is limited to 2KB. */
	updateMangaStatus: UpdateMangaStatus;
};
export type GetMangaDraftByIdApiResponse = /** status 200 OK */ MangaResponse;
export type GetMangaDraftByIdApiArg = {
	id: string;
	includes?: {
		''?: ReferenceExpansionManga;
	};
};
export type PostMangaDraftByIdCommitApiResponse = /** status 201 OK */ MangaResponse;
export type PostMangaDraftByIdCommitApiArg = {
	id: string;
	/** A Manga Draft that is to be submitted must have at least one cover in the original language, must be in the "draft" state and must be passed the correct version in the request body. */
	body: {
		version?: number;
	};
};
export type GetMangaDraftApiResponse = /** status 200 OK */ MangaResponse;
export type GetMangaDraftApiArg = {
	limit?: number;
	offset?: number;
	state?: 'draft' | 'submitted' | 'rejected';
	order?: {
		title?: 'asc' | 'desc';
		year?: 'asc' | 'desc';
		createdAt?: 'asc' | 'desc';
		updatedAt?: 'asc' | 'desc';
	};
	includes?: {
		''?: ReferenceExpansionManga;
	};
};
export type PostCaptchaSolveApiResponse = /** status 200 OK: Captcha has been solved */ {
	result?: 'ok' | 'error';
};
export type PostCaptchaSolveApiArg = {
	'Content-Type': string;
	body: {
		captchaChallenge: string;
	};
};
export type GetReportReasonsByCategoryApiResponse = /** status 200 OK */ {
	result?: string;
	response?: string;
	data?: {
		id?: string;
		type?: string;
		attributes?: {
			reason?: LocalizedString;
			detailsRequired?: boolean;
			category?: 'manga' | 'chapter' | 'scanlation_group' | 'user' | 'author';
			version?: number;
		};
	}[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type GetReportReasonsByCategoryApiArg = {
	category: 'manga' | 'chapter' | 'scanlation_group' | 'user' | 'author';
};
export type GetReportApiResponse = /** status 200 OK */ ReportListResponse;
export type GetReportApiArg = {
	limit?: number;
	offset?: number;
	category?: 'manga' | 'chapter' | 'scanlation_group' | 'user' | 'author';
	reasonId?: string;
	objectId?: string;
	status?: 'waiting' | 'accepted' | 'refused' | 'autoresolved';
	order?: {
		createdAt?: 'asc' | 'desc';
	};
	includes?: {
		''?: ReferenceExpansionReport;
	};
};
export type PostReportApiResponse = /** status 201 Created */ Response;
export type PostReportApiArg = {
	'Content-Type': string;
	/** The size of the body is limited to 8KB. */
	body: {
		category?: 'manga' | 'chapter' | 'user' | 'scanlation_group' | 'author';
		reason?: string;
		objectId?: string;
		details?: string;
	};
};
export type GetUploadApiResponse = /** status 200 OK */ UploadSession;
export type GetUploadApiArg = void;
export type PostUploadBeginApiResponse = /** status 200 OK */ UploadSession;
export type PostUploadBeginApiArg = {
	'Content-Type': string;
	/** The size of the body is limited to 4KB. */
	beginUploadSession: BeginUploadSession;
};
export type PostUploadBeginByChapterIdApiResponse = /** status 200 OK */ UploadSession;
export type PostUploadBeginByChapterIdApiArg = {
	chapterId: string;
	'Content-Type': string;
	/** The size of the body is limited to 1KB. */
	beginEditSession: BeginEditSession;
};
export type PostUploadByUploadSessionIdApiResponse = /** status 200 OK */ {
	result?: 'ok' | 'error';
	errors?: Error[];
	data?: UploadSessionFile[];
};
export type PostUploadByUploadSessionIdApiArg = {
	uploadSessionId: string;
	'Content-Type': string;
	body: {
		file?: Blob;
	};
};
export type DeleteUploadByUploadSessionIdApiResponse = /** status 200 OK */ Response;
export type DeleteUploadByUploadSessionIdApiArg = {
	uploadSessionId: string;
};
export type PostUploadByUploadSessionIdCommitApiResponse = /** status 200 OK */ Chapter;
export type PostUploadByUploadSessionIdCommitApiArg = {
	uploadSessionId: string;
	'Content-Type': string;
	/** The size of the body is limited to 4KB. */
	commitUploadSession: BeginUploadSession2;
};
export type DeleteUploadByUploadSessionIdAndUploadSessionFileIdApiResponse =
	/** status 200 OK */ Response;
export type DeleteUploadByUploadSessionIdAndUploadSessionFileIdApiArg = {
	uploadSessionId: string;
	uploadSessionFileId: string;
};
export type DeleteUploadByUploadSessionIdBatchApiResponse = /** status 200 OK */ Response;
export type DeleteUploadByUploadSessionIdBatchApiArg = {
	uploadSessionId: string;
	'Content-Type': string;
	/** The size of the body is limited to 20KB. */
	body: string[];
};
export type PostUploadCheckApprovalRequiredApiResponse = /** status 200 OK */ Response & {
	requiresApproval?: boolean;
};
export type PostUploadCheckApprovalRequiredApiArg = {
	/** The size of the body is limited to 4KB. */
	body: {
		manga?: string;
		locale?: string;
	};
};
export type GetMangaByMangaIdRelationApiResponse =
	/** status 200 Manga relation list */ MangaRelationList;
export type GetMangaByMangaIdRelationApiArg = {
	mangaId: string;
	includes?: {
		''?: ReferenceExpansionMangaRelation;
	};
};
export type PostMangaByMangaIdRelationApiResponse =
	/** status 200 Manga relation created */ MangaRelationResponse;
export type PostMangaByMangaIdRelationApiArg = {
	mangaId: string;
	'Content-Type': string;
	/** The size of the body is limited to 8KB. */
	mangaRelationCreate: MangaRelationCreate;
};
export type DeleteMangaByMangaIdRelationAndIdApiResponse =
	/** status 200 Manga relation has been deleted. */ Response;
export type DeleteMangaByMangaIdRelationAndIdApiArg = {
	mangaId: string;
	id: string;
};
export type GetRatingApiResponse = /** status 200 Self-rating list */ {
	result?: string;
	ratings?: {
		[key: string]: {
			rating?: number;
			createdAt?: string;
		};
	};
};
export type GetRatingApiArg = {
	manga: string[];
};
export type PostRatingByMangaIdApiResponse = /** status 200 OK */ Response;
export type PostRatingByMangaIdApiArg = {
	mangaId: string;
	body: {
		rating?: number;
	};
};
export type DeleteRatingByMangaIdApiResponse = /** status 200 Manga rating was deleted */ Response;
export type DeleteRatingByMangaIdApiArg = {
	mangaId: string;
};
export type GetStatisticsChapterByUuidApiResponse = /** status 200 Statistics */ {
	result?: string;
	statistics?: {
		[key: string]: {
			comments?: StatisticsDetailsComments;
		};
	};
};
export type GetStatisticsChapterByUuidApiArg = {
	uuid: string;
};
export type GetStatisticsChapterApiResponse = /** status 200 Statistics */ {
	result?: string;
	statistics?: {
		[key: string]: {
			comments?: StatisticsDetailsComments;
		};
	};
};
export type GetStatisticsChapterApiArg = {
	chapter?: {
		''?: string[];
	};
};
export type GetStatisticsGroupByUuidApiResponse = /** status 200 Statistics */ {
	result?: string;
	statistics?: {
		[key: string]: {
			comments?: StatisticsDetailsComments;
		};
	};
};
export type GetStatisticsGroupByUuidApiArg = {
	uuid: string;
};
export type GetStatisticsGroupApiResponse = /** status 200 Statistics */ {
	result?: string;
	statistics?: {
		[key: string]: {
			comments?: StatisticsDetailsComments;
		};
	};
};
export type GetStatisticsGroupApiArg = {
	group?: {
		''?: string[];
	};
};
export type GetStatisticsMangaByUuidApiResponse = /** status 200 Statistics */ {
	result?: string;
	statistics?: {
		[key: string]: {
			comments?: StatisticsDetailsComments;
			rating?: {
				average?: number | null;
				bayesian?: number;
				distribution?: {
					'1'?: number;
					'2'?: number;
					'3'?: number;
					'4'?: number;
					'5'?: number;
					'6'?: number;
					'7'?: number;
					'8'?: number;
					'9'?: number;
					'10'?: number;
				};
			};
			follows?: number;
		};
	};
};
export type GetStatisticsMangaByUuidApiArg = {
	uuid: string;
};
export type GetStatisticsMangaApiResponse = /** status 200 Statistics */ {
	result?: string;
	statistics?: {
		[key: string]: {
			comments?: StatisticsDetailsComments;
			rating?: {
				average?: number | null;
				bayesian?: number;
			};
			follows?: number;
		};
	};
};
export type GetStatisticsMangaApiArg = {
	manga?: {
		''?: string[];
	};
};
export type GetSettingsTemplateApiResponse = /** status 200 OK */ object;
export type GetSettingsTemplateApiArg = void;
export type PostSettingsTemplateApiResponse = /** status 200 OK */ object;
export type PostSettingsTemplateApiArg = {
	body: object;
};
export type GetSettingsTemplateByVersionApiResponse = /** status 200 OK */ object;
export type GetSettingsTemplateByVersionApiArg = {
	version: string;
};
export type GetSettingsApiResponse = /** status 200 OK */ {
	result?: string;
	updatedAt?: string;
	settings?: object;
	template?: string;
};
export type GetSettingsApiArg = void;
export type PostSettingsApiResponse = /** status 200 OK */ {
	result?: string;
	updatedAt?: string;
	settings?: object;
	template?: string;
};
export type PostSettingsApiArg = {
	body: {
		settings?: object;
		updatedAt?: string;
	};
};
export type GetUserHistoryApiResponse = /** status 200 OK */ {
	result?: string;
	ratings?: {
		chapterId?: string;
		readDate?: string;
	}[];
};
export type GetUserHistoryApiArg = void;
export type PostForumsThreadApiResponse = /** status 200 OK */ ForumsThreadResponse;
export type PostForumsThreadApiArg = {
	body: {
		type?: 'manga' | 'group' | 'chapter';
		id?: string;
	};
};
export type LocalizedString = {
	[key: string]: string;
};
export type TagAttributes = {
	name?: LocalizedString;
	description?: LocalizedString;
	group?: 'content' | 'format' | 'genre' | 'theme';
	version?: number;
};
export type Relationship = {
	id?: string;
	type?: string;
	related?:
		| 'monochrome'
		| 'main_story'
		| 'adapted_from'
		| 'based_on'
		| 'prequel'
		| 'side_story'
		| 'doujinshi'
		| 'same_franchise'
		| 'shared_universe'
		| 'sequel'
		| 'spin_off'
		| 'alternate_story'
		| 'alternate_version'
		| 'preserialization'
		| 'colored'
		| 'serialization';
	attributes?: object | null;
};
export type Tag = {
	id?: string;
	type?: 'tag';
	attributes?: TagAttributes;
	relationships?: Relationship[];
};
export type MangaAttributes = {
	title?: LocalizedString;
	altTitles?: LocalizedString[];
	description?: LocalizedString;
	isLocked?: boolean;
	links?: {
		[key: string]: string;
	};
	originalLanguage?: string;
	lastVolume?: string | null;
	lastChapter?: string | null;
	publicationDemographic?: ('shounen' | 'shoujo' | 'josei' | 'seinen') | null;
	status?: 'completed' | 'ongoing' | 'cancelled' | 'hiatus';
	year?: number | null;
	contentRating?: 'safe' | 'suggestive' | 'erotica' | 'pornographic';
	chapterNumbersResetOnNewVolume?: boolean;
	availableTranslatedLanguages?: string[];
	latestUploadedChapter?: string;
	tags?: Tag[];
	state?: 'draft' | 'submitted' | 'published' | 'rejected';
	version?: number;
	createdAt?: string;
	updatedAt?: string;
};
export type Manga = {
	id?: string;
	type?: 'manga';
	attributes?: MangaAttributes;
	relationships?: Relationship[];
};
export type MangaList = {
	result?: string;
	response?: string;
	data?: Manga[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type Error = {
	id?: string;
	status?: number;
	title?: string;
	detail?: string | null;
	context?: string | null;
};
export type ErrorResponse = {
	result?: string;
	errors?: Error[];
};
export type ReferenceExpansionManga = (
	| 'manga'
	| 'cover_art'
	| 'author'
	| 'artist'
	| 'tag'
	| 'creator'
)[];
export type MangaResponse = {
	result?: 'ok' | 'error';
	response?: string;
	data?: Manga;
};
export type MangaRequest = {
	title?: LocalizedString;
	altTitles?: LocalizedString[];
	description?: LocalizedString;
	authors?: string[];
	artists?: string[];
	links?: {
		[key: string]: string;
	};
	originalLanguage?: string;
	lastVolume?: string | null;
	lastChapter?: string | null;
	publicationDemographic?: ('shounen' | 'shoujo' | 'josei' | 'seinen') | null;
	status?: 'completed' | 'ongoing' | 'cancelled' | 'hiatus';
	year?: number | null;
	contentRating?: 'safe' | 'suggestive' | 'erotica' | 'pornographic';
	chapterNumbersResetOnNewVolume?: boolean;
	tags?: string[];
	primaryCover?: string | null;
	version?: number;
};
export type MangaCreate = MangaRequest & any;
export type MangaEdit = MangaRequest & any;
export type Response = {
	result?: 'ok' | 'error';
};
export type LoginResponse = {
	result?: 'ok' | 'error';
	token?: {
		session?: string;
		refresh?: string;
	};
};
export type Login = {
	username?: string;
	email?: string;
	password: string;
};
export type CheckResponse = {
	result?: string;
	isAuthenticated?: boolean;
	roles?: string[];
	permissions?: string[];
};
export type LogoutResponse = {
	result?: 'ok' | 'error';
};
export type RefreshResponse = {
	result: 'ok' | 'error';
	token?: {
		session?: string;
		refresh?: string;
	};
	message?: string;
};
export type RefreshToken = {
	token: string;
};
export type ApiClientAttributes = {
	name?: string;
	description?: string | null;
	profile?: string;
	externalClientId?: string | null;
	isActive?: boolean;
	state?: 'requested' | 'approved' | 'rejected' | 'autoapproved';
	createdAt?: string;
	updatedAt?: string;
	version?: number;
};
export type ApiClient = {
	id?: string;
	type?: 'api_client';
	attributes?: ApiClientAttributes;
	relationships?: Relationship[];
};
export type ApiClientList = {
	result?: string;
	response?: string;
	data?: ApiClient[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type ReferenceExpansionApiClient = 'creator'[];
export type ApiClientResponse = {
	result?: string;
	response?: string;
	data?: ApiClient;
};
export type ApiClientCreate = {
	name: string;
	description?: string | null;
	profile: 'personal';
	version?: number;
};
export type ApiClient2 = {
	description?: string | null;
	version: number;
};
export type ScanlationGroupAttributes = {
	name?: string;
	altNames?: LocalizedString[];
	website?: string | null;
	ircServer?: string | null;
	ircChannel?: string | null;
	discord?: string | null;
	contactEmail?: string | null;
	description?: string | null;
	twitter?: string | null;
	mangaUpdates?: string | null;
	focusedLanguage?: string[] | null;
	locked?: boolean;
	official?: boolean;
	verified?: boolean;
	inactive?: boolean;
	exLicensed?: boolean;
	publishDelay?: string;
	version?: number;
	createdAt?: string;
	updatedAt?: string;
};
export type ScanlationGroup = {
	id?: string;
	type?: 'scanlation_group';
	attributes?: ScanlationGroupAttributes;
	relationships?: Relationship[];
};
export type ScanlationGroupList = {
	result?: string;
	response?: string;
	data?: ScanlationGroup[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type ReferenceExpansionScanlationGroup = ('leader' | 'member')[];
export type ScanlationGroupResponse = {
	result?: 'ok';
	response?: string;
	data?: ScanlationGroup;
};
export type CreateScanlationGroup = {
	name: string;
	website?: string | null;
	ircServer?: string | null;
	ircChannel?: string | null;
	discord?: string | null;
	contactEmail?: string | null;
	description?: string | null;
	twitter?: string | null;
	mangaUpdates?: string | null;
	inactive?: boolean;
	publishDelay?: string | null;
};
export type ScanlationGroupEdit = {
	name?: string;
	leader?: string;
	members?: string[];
	website?: string | null;
	ircServer?: string | null;
	ircChannel?: string | null;
	discord?: string | null;
	contactEmail?: string | null;
	description?: string | null;
	twitter?: string | null;
	mangaUpdates?: string | null;
	focusedLanguages?: string[] | null;
	inactive?: boolean;
	locked?: boolean;
	publishDelay?: string;
	version: number;
};
export type CustomListAttributes = {
	name?: string;
	visibility?: 'private' | 'public';
	version?: number;
};
export type CustomList = {
	id?: string;
	type?: 'custom_list';
	attributes?: CustomListAttributes;
	relationships?: Relationship[];
};
export type CustomListResponse = {
	result?: 'ok' | 'error';
	response?: string;
	data?: CustomList;
};
export type CustomListCreate = {
	name: string;
	visibility?: 'public' | 'private';
	manga?: string[];
	version?: number;
};
export type CustomListEdit = {
	name?: string;
	visibility?: 'public' | 'private';
	manga?: string[];
	version: number;
};
export type CustomListList = {
	result?: string;
	response?: string;
	data?: CustomList[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type UserAttributes = {
	username?: string;
	roles?: string[];
	version?: number;
};
export type User = {
	id?: string;
	type?: 'user';
	attributes?: UserAttributes;
	relationships?: Relationship[];
};
export type UserList = {
	result?: string;
	response?: string;
	data?: User[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type UserResponse = {
	result?: 'ok';
	response?: string;
	data?: User;
};
export type ChapterAttributes = {
	title?: string | null;
	volume?: string | null;
	chapter?: string | null;
	pages?: number;
	translatedLanguage?: string;
	uploader?: string;
	externalUrl?: string | null;
	version?: number;
	createdAt?: string;
	updatedAt?: string;
	publishAt?: string;
	readableAt?: string;
};
export type Chapter = {
	id?: string;
	type?: 'chapter';
	attributes?: ChapterAttributes;
	relationships?: Relationship[];
};
export type ChapterList = {
	result?: string;
	response?: string;
	data?: Chapter[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type ChapterResponse = {
	result?: 'ok' | 'error';
	response?: string;
	data?: Chapter;
};
export type ReferenceExpansionChapter = ('manga' | 'scanlation_group' | 'user')[];
export type ChapterRequest = {
	title?: string | null;
	volume?: string | null;
	chapter?: string | null;
	translatedLanguage?: string;
	groups?: string[];
	version?: number;
};
export type ChapterEdit = ChapterRequest & any;
export type CoverAttributes = {
	volume?: string | null;
	fileName?: string;
	description?: string | null;
	locale?: string | null;
	version?: number;
	createdAt?: string;
	updatedAt?: string;
};
export type Cover = {
	id?: string;
	type?: 'cover_art';
	attributes?: CoverAttributes;
	relationships?: Relationship[];
};
export type CoverList = {
	result?: string;
	response?: string;
	data?: Cover[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type ReferenceExpansionCoverArt = ('manga' | 'user')[];
export type CoverResponse = {
	result?: string;
	response?: string;
	data?: Cover;
};
export type CoverEdit = {
	volume: string | null;
	description?: string | null;
	locale?: string | null;
	version: number;
};
export type AuthorAttributes = {
	name?: string;
	imageUrl?: string | null;
	biography?: LocalizedString;
	twitter?: string | null;
	pixiv?: string | null;
	melonBook?: string | null;
	fanBox?: string | null;
	booth?: string | null;
	nicoVideo?: string | null;
	skeb?: string | null;
	fantia?: string | null;
	tumblr?: string | null;
	youtube?: string | null;
	weibo?: string | null;
	naver?: string | null;
	namicomi?: string | null;
	website?: string | null;
	version?: number;
	createdAt?: string;
	updatedAt?: string;
};
export type Author = {
	id?: string;
	type?: 'author';
	attributes?: AuthorAttributes;
	relationships?: Relationship[];
};
export type AuthorList = {
	result?: string;
	response?: string;
	data?: Author[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type ReferenceExpansionAuthor = 'manga'[];
export type AuthorResponse = {
	result?: string;
	response?: string;
	data?: Author;
};
export type AuthorCreate = {
	name: string;
	biography?: LocalizedString;
	twitter?: string | null;
	pixiv?: string | null;
	melonBook?: string | null;
	fanBox?: string | null;
	booth?: string | null;
	nicoVideo?: string | null;
	skeb?: string | null;
	fantia?: string | null;
	tumblr?: string | null;
	youtube?: string | null;
	weibo?: string | null;
	naver?: string | null;
	website?: string | null;
};
export type AuthorEdit = {
	name?: string;
	biography?: LocalizedString;
	twitter?: string | null;
	pixiv?: string | null;
	melonBook?: string | null;
	fanBox?: string | null;
	booth?: string | null;
	nicoVideo?: string | null;
	skeb?: string | null;
	fantia?: string | null;
	tumblr?: string | null;
	youtube?: string | null;
	weibo?: string | null;
	naver?: string | null;
	website?: string | null;
	version: number;
};
export type MappingIdAttributes = {
	type?: 'manga' | 'chapter' | 'group' | 'tag';
	legacyId?: number;
	newId?: string;
};
export type MappingId = {
	id?: string;
	type?: 'mapping_id';
	attributes?: MappingIdAttributes;
	relationships?: Relationship[];
};
export type MappingIdResponse = {
	result?: string;
	response?: string;
	data?: MappingId[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type MappingIdBody = {
	type?: 'group' | 'manga' | 'chapter' | 'tag';
	ids?: number[];
};
export type ChapterReadMarkersBatch = any | any;
export type TagResponse = {
	result?: string;
	response?: string;
	data?: Tag[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type UpdateMangaStatus = {
	status:
		| ('reading' | 'on_hold' | 'plan_to_read' | 'dropped' | 're_reading' | 'completed')
		| null;
};
export type ReportAttributes = {
	details?: string;
	objectId?: string;
	status?: 'waiting' | 'accepted' | 'refused' | 'autoresolved';
	createdAt?: string;
};
export type Report = {
	id?: string;
	type?: 'report';
	attributes?: ReportAttributes;
	relationships?: Relationship[];
};
export type ReportListResponse = {
	result?: 'ok' | 'error';
	response?: string;
	data?: Report[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type ReferenceExpansionReport = ('user' | 'reason')[];
export type UploadSessionAttributes = {
	isCommitted?: boolean;
	isProcessed?: boolean;
	isDeleted?: boolean;
	version?: number;
	createdAt?: string;
	updatedAt?: string;
};
export type UploadSession = {
	id?: string;
	type?: 'upload_session';
	attributes?: UploadSessionAttributes;
};
export type BeginUploadSession = {
	groups: string[];
	manga: string;
};
export type BeginEditSession = {
	version: number;
};
export type UploadSessionFileAttributes = {
	originalFileName?: string;
	fileHash?: string;
	fileSize?: number;
	mimeType?: string;
	source?: 'local' | 'remote';
	version?: number;
};
export type UploadSessionFile = {
	id?: string;
	type?: 'upload_session_file';
	attributes?: UploadSessionFileAttributes;
};
export type ChapterDraft = {
	volume: string | null;
	chapter: string | null;
	title: string | null;
	translatedLanguage: string;
	externalUrl?: string | null;
	publishAt?: string;
};
export type BeginUploadSession2 = {
	chapterDraft?: ChapterDraft;
	pageOrder?: string[];
};
export type MangaRelationAttributes = {
	relation?:
		| 'monochrome'
		| 'main_story'
		| 'adapted_from'
		| 'based_on'
		| 'prequel'
		| 'side_story'
		| 'doujinshi'
		| 'same_franchise'
		| 'shared_universe'
		| 'sequel'
		| 'spin_off'
		| 'alternate_story'
		| 'alternate_version'
		| 'preserialization'
		| 'colored'
		| 'serialization';
	version?: number;
};
export type MangaRelation = {
	id?: string;
	type?: 'manga_relation';
	attributes?: MangaRelationAttributes;
	relationships?: Relationship[];
};
export type MangaRelationList = {
	result?: string;
	response?: string;
	data?: MangaRelation[];
	limit?: number;
	offset?: number;
	total?: number;
};
export type ReferenceExpansionMangaRelation = 'manga'[];
export type MangaRelationResponse = {
	result?: 'ok' | 'error';
	response?: string;
	data?: MangaRelation;
};
export type MangaRelationRequest = {
	targetManga?: string;
	relation?:
		| 'monochrome'
		| 'main_story'
		| 'adapted_from'
		| 'based_on'
		| 'prequel'
		| 'side_story'
		| 'doujinshi'
		| 'same_franchise'
		| 'shared_universe'
		| 'sequel'
		| 'spin_off'
		| 'alternate_story'
		| 'alternate_version'
		| 'preserialization'
		| 'colored'
		| 'serialization';
};
export type MangaRelationCreate = MangaRelationRequest & any;
export type StatisticsDetailsComments = {
	threadId?: number;
	repliesCount?: number;
} | null;
export type ForumsThreadResponse = {
	result?: string;
	response?: string;
	data?: {
		type?: string;
		id?: number;
		attributes?: {
			repliesCount?: number;
		};
	};
};
export const {
	useGetPingQuery,
	useLazyGetPingQuery,
	useGetMangaQuery,
	useLazyGetMangaQuery,
	usePostMangaMutation,
	useGetMangaByIdAggregateQuery,
	useLazyGetMangaByIdAggregateQuery,
	useGetMangaByIdQuery,
	useLazyGetMangaByIdQuery,
	usePutMangaByIdMutation,
	useDeleteMangaByIdMutation,
	usePostAuthLoginMutation,
	useGetAuthCheckQuery,
	useLazyGetAuthCheckQuery,
	usePostAuthLogoutMutation,
	usePostAuthRefreshMutation,
	useGetClientQuery,
	useLazyGetClientQuery,
	usePostClientMutation,
	useGetClientByIdQuery,
	useLazyGetClientByIdQuery,
	usePostClientByIdMutation,
	useDeleteClientByIdMutation,
	useGetClientByIdSecretQuery,
	useLazyGetClientByIdSecretQuery,
	usePostClientByIdSecretMutation,
	useGetGroupQuery,
	useLazyGetGroupQuery,
	usePostGroupMutation,
	useGetGroupByIdQuery,
	useLazyGetGroupByIdQuery,
	usePutGroupByIdMutation,
	useDeleteGroupByIdMutation,
	usePostGroupByIdFollowMutation,
	useDeleteGroupByIdFollowMutation,
	usePostListMutation,
	useGetListByIdQuery,
	useLazyGetListByIdQuery,
	usePutListByIdMutation,
	useDeleteListByIdMutation,
	usePostListByIdFollowMutation,
	useDeleteListByIdFollowMutation,
	usePostMangaByIdListAndListIdMutation,
	useDeleteMangaByIdListAndListIdMutation,
	useGetUserListQuery,
	useLazyGetUserListQuery,
	useGetUserByIdListQuery,
	useLazyGetUserByIdListQuery,
	useGetUserQuery,
	useLazyGetUserQuery,
	useGetUserByIdQuery,
	useLazyGetUserByIdQuery,
	useDeleteUserByIdMutation,
	usePostUserDeleteByCodeMutation,
	useGetChapterQuery,
	useLazyGetChapterQuery,
	useGetChapterByIdQuery,
	useLazyGetChapterByIdQuery,
	usePutChapterByIdMutation,
	useDeleteChapterByIdMutation,
	useGetUserFollowsMangaFeedQuery,
	useLazyGetUserFollowsMangaFeedQuery,
	useGetListByIdFeedQuery,
	useLazyGetListByIdFeedQuery,
	useDeleteMangaByIdFollowMutation,
	usePostMangaByIdFollowMutation,
	useGetCoverQuery,
	useLazyGetCoverQuery,
	usePostCoverByMangaOrCoverIdMutation,
	useGetCoverByMangaOrCoverIdQuery,
	useLazyGetCoverByMangaOrCoverIdQuery,
	usePutCoverByMangaOrCoverIdMutation,
	useDeleteCoverByMangaOrCoverIdMutation,
	useGetAuthorQuery,
	useLazyGetAuthorQuery,
	usePostAuthorMutation,
	useGetAuthorByIdQuery,
	useLazyGetAuthorByIdQuery,
	usePutAuthorByIdMutation,
	useDeleteAuthorByIdMutation,
	usePostLegacyMappingMutation,
	useGetMangaByIdFeedQuery,
	useLazyGetMangaByIdFeedQuery,
	useGetMangaByIdReadQuery,
	useLazyGetMangaByIdReadQuery,
	usePostMangaByIdReadMutation,
	useGetMangaReadQuery,
	useLazyGetMangaReadQuery,
	useGetMangaRandomQuery,
	useLazyGetMangaRandomQuery,
	useGetAtHomeServerByChapterIdQuery,
	useLazyGetAtHomeServerByChapterIdQuery,
	useGetMangaTagQuery,
	useLazyGetMangaTagQuery,
	useGetUserMeQuery,
	useLazyGetUserMeQuery,
	useGetUserFollowsGroupQuery,
	useLazyGetUserFollowsGroupQuery,
	useGetUserFollowsGroupByIdQuery,
	useLazyGetUserFollowsGroupByIdQuery,
	useGetUserFollowsUserQuery,
	useLazyGetUserFollowsUserQuery,
	useGetUserFollowsUserByIdQuery,
	useLazyGetUserFollowsUserByIdQuery,
	useGetUserFollowsMangaQuery,
	useLazyGetUserFollowsMangaQuery,
	useGetUserFollowsMangaByIdQuery,
	useLazyGetUserFollowsMangaByIdQuery,
	useGetUserFollowsListQuery,
	useLazyGetUserFollowsListQuery,
	useGetUserFollowsListByIdQuery,
	useLazyGetUserFollowsListByIdQuery,
	useGetMangaStatusQuery,
	useLazyGetMangaStatusQuery,
	useGetMangaByIdStatusQuery,
	useLazyGetMangaByIdStatusQuery,
	usePostMangaByIdStatusMutation,
	useGetMangaDraftByIdQuery,
	useLazyGetMangaDraftByIdQuery,
	usePostMangaDraftByIdCommitMutation,
	useGetMangaDraftQuery,
	useLazyGetMangaDraftQuery,
	usePostCaptchaSolveMutation,
	useGetReportReasonsByCategoryQuery,
	useLazyGetReportReasonsByCategoryQuery,
	useGetReportQuery,
	useLazyGetReportQuery,
	usePostReportMutation,
	useGetUploadQuery,
	useLazyGetUploadQuery,
	usePostUploadBeginMutation,
	usePostUploadBeginByChapterIdMutation,
	usePostUploadByUploadSessionIdMutation,
	useDeleteUploadByUploadSessionIdMutation,
	usePostUploadByUploadSessionIdCommitMutation,
	useDeleteUploadByUploadSessionIdAndUploadSessionFileIdMutation,
	useDeleteUploadByUploadSessionIdBatchMutation,
	usePostUploadCheckApprovalRequiredMutation,
	useGetMangaByMangaIdRelationQuery,
	useLazyGetMangaByMangaIdRelationQuery,
	usePostMangaByMangaIdRelationMutation,
	useDeleteMangaByMangaIdRelationAndIdMutation,
	useGetRatingQuery,
	useLazyGetRatingQuery,
	usePostRatingByMangaIdMutation,
	useDeleteRatingByMangaIdMutation,
	useGetStatisticsChapterByUuidQuery,
	useLazyGetStatisticsChapterByUuidQuery,
	useGetStatisticsChapterQuery,
	useLazyGetStatisticsChapterQuery,
	useGetStatisticsGroupByUuidQuery,
	useLazyGetStatisticsGroupByUuidQuery,
	useGetStatisticsGroupQuery,
	useLazyGetStatisticsGroupQuery,
	useGetStatisticsMangaByUuidQuery,
	useLazyGetStatisticsMangaByUuidQuery,
	useGetStatisticsMangaQuery,
	useLazyGetStatisticsMangaQuery,
	useGetSettingsTemplateQuery,
	useLazyGetSettingsTemplateQuery,
	usePostSettingsTemplateMutation,
	useGetSettingsTemplateByVersionQuery,
	useLazyGetSettingsTemplateByVersionQuery,
	useGetSettingsQuery,
	useLazyGetSettingsQuery,
	usePostSettingsMutation,
	useGetUserHistoryQuery,
	useLazyGetUserHistoryQuery,
	usePostForumsThreadMutation,
} = injectedRtkApi;
