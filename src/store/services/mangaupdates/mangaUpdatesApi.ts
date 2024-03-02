import { baseMangaUpdates as api } from './baseMangaUpdates';
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		addAboutusCategory: build.mutation<AddAboutusCategoryApiResponse, AddAboutusCategoryApiArg>(
			{
				query: (queryArg) => ({
					url: `/aboutus/category`,
					method: 'POST',
					body: queryArg.aboutusCategoryModelUpdateV1,
				}),
			},
		),
		retrieveAboutusCategory: build.query<
			RetrieveAboutusCategoryApiResponse,
			RetrieveAboutusCategoryApiArg
		>({
			query: (queryArg) => ({
				url: `/aboutus/category/${queryArg.categoryId}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteAboutusCategory: build.mutation<
			DeleteAboutusCategoryApiResponse,
			DeleteAboutusCategoryApiArg
		>({
			query: (queryArg) => ({
				url: `/aboutus/category/${queryArg.categoryId}`,
				method: 'DELETE',
			}),
		}),
		updateAboutusCategory: build.mutation<
			UpdateAboutusCategoryApiResponse,
			UpdateAboutusCategoryApiArg
		>({
			query: (queryArg) => ({
				url: `/aboutus/category/${queryArg.categoryId}`,
				method: 'PATCH',
				body: queryArg.aboutusCategoryModelUpdateV1,
			}),
		}),
		retrieveAboutusCategoriesAndUsers: build.query<
			RetrieveAboutusCategoriesAndUsersApiResponse,
			RetrieveAboutusCategoriesAndUsersApiArg
		>({
			query: () => ({ url: `/aboutus/users` }),
		}),
		retrieveAboutusDescription: build.query<
			RetrieveAboutusDescriptionApiResponse,
			RetrieveAboutusDescriptionApiArg
		>({
			query: (queryArg) => ({
				url: `/aboutus`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		updateAboutusDescription: build.mutation<
			UpdateAboutusDescriptionApiResponse,
			UpdateAboutusDescriptionApiArg
		>({
			query: (queryArg) => ({
				url: `/aboutus`,
				method: 'POST',
				body: queryArg.aboutusDescriptionModelV1,
			}),
		}),
		reorderAboutus: build.mutation<ReorderAboutusApiResponse, ReorderAboutusApiArg>({
			query: (queryArg) => ({ url: `/aboutus/reorder`, method: 'POST', body: queryArg.body }),
		}),
		addAboutusCategoryUser: build.mutation<
			AddAboutusCategoryUserApiResponse,
			AddAboutusCategoryUserApiArg
		>({
			query: (queryArg) => ({
				url: `/aboutus/category/${queryArg.categoryId}/users`,
				method: 'POST',
				body: queryArg.aboutusUserModelUpdateV1,
			}),
		}),
		deleteAboutusCategoryUser: build.mutation<
			DeleteAboutusCategoryUserApiResponse,
			DeleteAboutusCategoryUserApiArg
		>({
			query: (queryArg) => ({
				url: `/aboutus/category/${queryArg.categoryId}/users/${queryArg.entryId}`,
				method: 'DELETE',
			}),
		}),
		captcha: build.query<CaptchaApiResponse, CaptchaApiArg>({
			query: () => ({ url: `/account/captcha` }),
		}),
		confirmDeleteAccount: build.mutation<
			ConfirmDeleteAccountApiResponse,
			ConfirmDeleteAccountApiArg
		>({
			query: (queryArg) => ({
				url: `/account/delete/confirm/${queryArg.authHash}`,
				method: 'POST',
			}),
		}),
		deleteAccount: build.mutation<DeleteAccountApiResponse, DeleteAccountApiArg>({
			query: (queryArg) => ({
				url: `/account/delete/${queryArg.captchaResponse}`,
				method: 'POST',
			}),
		}),
		confirmAndChangePassword: build.mutation<
			ConfirmAndChangePasswordApiResponse,
			ConfirmAndChangePasswordApiArg
		>({
			query: (queryArg) => ({
				url: `/account/forgotpass/confirm/${queryArg.authHash}`,
				method: 'POST',
				body: queryArg.userModelUpdatePasswordV1,
			}),
		}),
		forgotPassword: build.mutation<ForgotPasswordApiResponse, ForgotPasswordApiArg>({
			query: (queryArg) => ({
				url: `/account/forgotpass/${queryArg.captchaResponse}`,
				method: 'POST',
				body: queryArg.accountForgotPassModelV1,
			}),
		}),
		login: build.mutation<LoginApiResponse, LoginApiArg>({
			query: (queryArg) => ({
				url: `/account/login`,
				method: 'PUT',
				body: queryArg.accountLoginModelV1,
			}),
		}),
		logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
			query: () => ({ url: `/account/logout`, method: 'POST' }),
		}),
		profile: build.query<ProfileApiResponse, ProfileApiArg>({
			query: () => ({ url: `/account/profile` }),
		}),
		confirmRegistration: build.mutation<
			ConfirmRegistrationApiResponse,
			ConfirmRegistrationApiArg
		>({
			query: (queryArg) => ({
				url: `/account/register/confirm/${queryArg.authHash}`,
				method: 'POST',
			}),
		}),
		registerMember: build.mutation<RegisterMemberApiResponse, RegisterMemberApiArg>({
			query: (queryArg) => ({
				url: `/account/register/${queryArg.captchaResponse}`,
				method: 'POST',
				body: queryArg.userModelRegisterV1,
			}),
		}),
		resendAuthEmail: build.mutation<ResendAuthEmailApiResponse, ResendAuthEmailApiArg>({
			query: (queryArg) => ({ url: `/account/resendauth/${queryArg.id}`, method: 'POST' }),
		}),
		sendForgotEmail: build.mutation<SendForgotEmailApiResponse, SendForgotEmailApiArg>({
			query: (queryArg) => ({ url: `/account/sendforgot/${queryArg.id}`, method: 'POST' }),
		}),
		addAuthor: build.mutation<AddAuthorApiResponse, AddAuthorApiArg>({
			query: (queryArg) => ({
				url: `/authors`,
				method: 'POST',
				body: queryArg.authorsModelUpdateV1,
			}),
		}),
		retrieveAuthor: build.query<RetrieveAuthorApiResponse, RetrieveAuthorApiArg>({
			query: (queryArg) => ({
				url: `/authors/${queryArg.id}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteAuthor: build.mutation<DeleteAuthorApiResponse, DeleteAuthorApiArg>({
			query: (queryArg) => ({ url: `/authors/${queryArg.id}`, method: 'DELETE' }),
		}),
		updateAuthor: build.mutation<UpdateAuthorApiResponse, UpdateAuthorApiArg>({
			query: (queryArg) => ({
				url: `/authors/${queryArg.id}`,
				method: 'PATCH',
				body: queryArg.authorsModelUpdateV1,
			}),
		}),
		retrieveAuthorLocks: build.query<RetrieveAuthorLocksApiResponse, RetrieveAuthorLocksApiArg>(
			{
				query: (queryArg) => ({ url: `/authors/${queryArg.id}/locks` }),
			},
		),
		lockAuthorField: build.mutation<LockAuthorFieldApiResponse, LockAuthorFieldApiArg>({
			query: (queryArg) => ({
				url: `/authors/${queryArg.id}/locks/${queryArg.item}/lock`,
				method: 'POST',
				body: queryArg.authorsLockModelUpdateV1,
			}),
		}),
		unlockAuthorField: build.mutation<UnlockAuthorFieldApiResponse, UnlockAuthorFieldApiArg>({
			query: (queryArg) => ({
				url: `/authors/${queryArg.id}/locks/${queryArg.item}/unlock`,
				method: 'POST',
			}),
		}),
		searchAuthorsPost: build.mutation<SearchAuthorsPostApiResponse, SearchAuthorsPostApiArg>({
			query: (queryArg) => ({
				url: `/authors/search`,
				method: 'POST',
				body: queryArg.authorsSearchRequestV1,
			}),
		}),
		retrieveAuthorSeries: build.mutation<
			RetrieveAuthorSeriesApiResponse,
			RetrieveAuthorSeriesApiArg
		>({
			query: (queryArg) => ({
				url: `/authors/${queryArg.id}/series`,
				method: 'POST',
				body: queryArg.authorsSeriesListRequestV1,
			}),
		}),
		updateImage: build.mutation<UpdateImageApiResponse, UpdateImageApiArg>({
			query: (queryArg) => ({
				url: `/authors/${queryArg.id}/image`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		deleteImage: build.mutation<DeleteImageApiResponse, DeleteImageApiArg>({
			query: (queryArg) => ({ url: `/authors/${queryArg.id}/image`, method: 'DELETE' }),
		}),
		bulkCombineSeriesCategories: build.mutation<
			BulkCombineSeriesCategoriesApiResponse,
			BulkCombineSeriesCategoriesApiArg
		>({
			query: (queryArg) => ({
				url: `/categories/bulk/combine`,
				method: 'POST',
				body: queryArg.seriesCategoryUpdateModelV1,
			}),
		}),
		bulkDeleteSeriesCategories: build.mutation<
			BulkDeleteSeriesCategoriesApiResponse,
			BulkDeleteSeriesCategoriesApiArg
		>({
			query: (queryArg) => ({
				url: `/categories/bulk/delete`,
				method: 'POST',
				body: queryArg.categoriesModelUpdateV1,
			}),
		}),
		findCategoryByPrefix: build.mutation<
			FindCategoryByPrefixApiResponse,
			FindCategoryByPrefixApiArg
		>({
			query: (queryArg) => ({
				url: `/categories/findByPrefix`,
				method: 'POST',
				body: queryArg.categoriesModelUpdateV1,
			}),
		}),
		findCategoryByExact: build.mutation<
			FindCategoryByExactApiResponse,
			FindCategoryByExactApiArg
		>({
			query: (queryArg) => ({
				url: `/categories/findByExact`,
				method: 'POST',
				body: queryArg.categoriesModelUpdateV1,
			}),
		}),
		searchCategoriesPost: build.mutation<
			SearchCategoriesPostApiResponse,
			SearchCategoriesPostApiArg
		>({
			query: (queryArg) => ({
				url: `/categories/search`,
				method: 'POST',
				body: queryArg.categoriesSearchRequestV1,
			}),
		}),
		addConvo: build.mutation<AddConvoApiResponse, AddConvoApiArg>({
			query: (queryArg) => ({
				url: `/convo`,
				method: 'POST',
				body: queryArg.convoModelAddV1,
			}),
		}),
		abandonConvoBulk: build.mutation<AbandonConvoBulkApiResponse, AbandonConvoBulkApiArg>({
			query: (queryArg) => ({
				url: `/convo/bulk/abandon`,
				method: 'POST',
				body: queryArg.convoBulkModelV1,
			}),
		}),
		deleteConvoBulk: build.mutation<DeleteConvoBulkApiResponse, DeleteConvoBulkApiArg>({
			query: (queryArg) => ({
				url: `/convo/bulk/delete`,
				method: 'POST',
				body: queryArg.convoBulkModelV1,
			}),
		}),
		retrieveConvo: build.query<RetrieveConvoApiResponse, RetrieveConvoApiArg>({
			query: (queryArg) => ({
				url: `/convo/${queryArg.id}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteConvo: build.mutation<DeleteConvoApiResponse, DeleteConvoApiArg>({
			query: (queryArg) => ({ url: `/convo/${queryArg.id}`, method: 'DELETE' }),
		}),
		updateConvo: build.mutation<UpdateConvoApiResponse, UpdateConvoApiArg>({
			query: (queryArg) => ({
				url: `/convo/${queryArg.id}`,
				method: 'PATCH',
				body: queryArg.convoModelUpdateV1,
			}),
		}),
		isUserIgnored: build.query<IsUserIgnoredApiResponse, IsUserIgnoredApiArg>({
			query: (queryArg) => ({ url: `/convo/ignore/${queryArg.userId}` }),
		}),
		ignoreUser: build.mutation<IgnoreUserApiResponse, IgnoreUserApiArg>({
			query: (queryArg) => ({ url: `/convo/ignore/${queryArg.userId}`, method: 'POST' }),
		}),
		unIgnoreUser: build.mutation<UnIgnoreUserApiResponse, UnIgnoreUserApiArg>({
			query: (queryArg) => ({ url: `/convo/ignore/${queryArg.userId}`, method: 'DELETE' }),
		}),
		convoInbox: build.query<ConvoInboxApiResponse, ConvoInboxApiArg>({
			query: () => ({ url: `/convo/inbox` }),
		}),
		convoInboxCount: build.query<ConvoInboxCountApiResponse, ConvoInboxCountApiArg>({
			query: () => ({ url: `/convo/inbox/count` }),
		}),
		convoSent: build.mutation<ConvoSentApiResponse, ConvoSentApiArg>({
			query: (queryArg) => ({
				url: `/convo/sent`,
				method: 'POST',
				body: queryArg.perPageSearchRequestV1,
			}),
		}),
		convoReceived: build.mutation<ConvoReceivedApiResponse, ConvoReceivedApiArg>({
			query: (queryArg) => ({
				url: `/convo/received`,
				method: 'POST',
				body: queryArg.perPageSearchRequestV1,
			}),
		}),
		addConvoMessage: build.mutation<AddConvoMessageApiResponse, AddConvoMessageApiArg>({
			query: (queryArg) => ({
				url: `/convo/${queryArg.id}/messages`,
				method: 'POST',
				body: queryArg.convoMessageModelUpdateV1,
			}),
		}),
		listConvoMessages: build.mutation<ListConvoMessagesApiResponse, ListConvoMessagesApiArg>({
			query: (queryArg) => ({
				url: `/convo/${queryArg.id}/messages/list`,
				method: 'POST',
				body: queryArg.convoMessageListRequestV1,
			}),
		}),
		retrieveConvoMessage: build.query<
			RetrieveConvoMessageApiResponse,
			RetrieveConvoMessageApiArg
		>({
			query: (queryArg) => ({
				url: `/convo/${queryArg.id}/messages/${queryArg.messageId}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		updateConvoMessage: build.mutation<UpdateConvoMessageApiResponse, UpdateConvoMessageApiArg>(
			{
				query: (queryArg) => ({
					url: `/convo/${queryArg.id}/messages/${queryArg.messageId}`,
					method: 'PATCH',
					body: queryArg.convoMessageModelUpdateV1,
				}),
			},
		),
		retrieveConvoMessageLocation: build.query<
			RetrieveConvoMessageLocationApiResponse,
			RetrieveConvoMessageLocationApiArg
		>({
			query: (queryArg) => ({
				url: `/convo/${queryArg.id}/messages/${queryArg.messageId}/location`,
			}),
		}),
		searchConvoMessagesPost: build.mutation<
			SearchConvoMessagesPostApiResponse,
			SearchConvoMessagesPostApiArg
		>({
			query: (queryArg) => ({
				url: `/convo/${queryArg.id}/messages/search`,
				method: 'POST',
				body: queryArg.convoMessageSearchRequestV1,
			}),
		}),
		abandonConvo: build.mutation<AbandonConvoApiResponse, AbandonConvoApiArg>({
			query: (queryArg) => ({ url: `/convo/${queryArg.id}/abandon`, method: 'POST' }),
		}),
		inviteUserToConvo: build.mutation<InviteUserToConvoApiResponse, InviteUserToConvoApiArg>({
			query: (queryArg) => ({
				url: `/convo/${queryArg.id}/invite`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		joinConvo: build.mutation<JoinConvoApiResponse, JoinConvoApiArg>({
			query: (queryArg) => ({ url: `/convo/${queryArg.id}/join`, method: 'POST' }),
		}),
		kickUserFromConvo: build.mutation<KickUserFromConvoApiResponse, KickUserFromConvoApiArg>({
			query: (queryArg) => ({
				url: `/convo/${queryArg.id}/kick/${queryArg.userId}`,
				method: 'POST',
			}),
		}),
		retrieveConvoParticipants: build.query<
			RetrieveConvoParticipantsApiResponse,
			RetrieveConvoParticipantsApiArg
		>({
			query: (queryArg) => ({ url: `/convo/${queryArg.id}/participants` }),
		}),
		searchConvoPost: build.mutation<SearchConvoPostApiResponse, SearchConvoPostApiArg>({
			query: (queryArg) => ({
				url: `/convo/search`,
				method: 'POST',
				body: queryArg.convoSearchRequestV1,
			}),
		}),
		retrieveAllFaqCategoriesAndQuestions: build.query<
			RetrieveAllFaqCategoriesAndQuestionsApiResponse,
			RetrieveAllFaqCategoriesAndQuestionsApiArg
		>({
			query: () => ({ url: `/faq` }),
		}),
		addFaqCategory: build.mutation<AddFaqCategoryApiResponse, AddFaqCategoryApiArg>({
			query: (queryArg) => ({
				url: `/faq`,
				method: 'POST',
				body: queryArg.faqCategoryModelUpdateV1,
			}),
		}),
		retrieveFaqCategory: build.query<RetrieveFaqCategoryApiResponse, RetrieveFaqCategoryApiArg>(
			{
				query: (queryArg) => ({
					url: `/faq/${queryArg.categoryId}`,
					params: { unrenderedFields: queryArg.unrenderedFields },
				}),
			},
		),
		deleteFaqCategory: build.mutation<DeleteFaqCategoryApiResponse, DeleteFaqCategoryApiArg>({
			query: (queryArg) => ({ url: `/faq/${queryArg.categoryId}`, method: 'DELETE' }),
		}),
		updateFaqCategory: build.mutation<UpdateFaqCategoryApiResponse, UpdateFaqCategoryApiArg>({
			query: (queryArg) => ({
				url: `/faq/${queryArg.categoryId}`,
				method: 'PATCH',
				body: queryArg.faqCategoryModelUpdateV1,
			}),
		}),
		retrieveAllFaqCategoryQuestions: build.query<
			RetrieveAllFaqCategoryQuestionsApiResponse,
			RetrieveAllFaqCategoryQuestionsApiArg
		>({
			query: (queryArg) => ({ url: `/faq/${queryArg.categoryId}/questions` }),
		}),
		addFaqQuestion: build.mutation<AddFaqQuestionApiResponse, AddFaqQuestionApiArg>({
			query: (queryArg) => ({
				url: `/faq/${queryArg.categoryId}/questions`,
				method: 'POST',
				body: queryArg.faqQuestionModelUpdateV1,
			}),
		}),
		retrieveFaqQuestion: build.query<RetrieveFaqQuestionApiResponse, RetrieveFaqQuestionApiArg>(
			{
				query: (queryArg) => ({
					url: `/faq/${queryArg.categoryId}/questions/${queryArg.questionId}`,
					params: { unrenderedFields: queryArg.unrenderedFields },
				}),
			},
		),
		deleteFaqQuestion: build.mutation<DeleteFaqQuestionApiResponse, DeleteFaqQuestionApiArg>({
			query: (queryArg) => ({
				url: `/faq/${queryArg.categoryId}/questions/${queryArg.questionId}`,
				method: 'DELETE',
			}),
		}),
		updateFaqQuestion: build.mutation<UpdateFaqQuestionApiResponse, UpdateFaqQuestionApiArg>({
			query: (queryArg) => ({
				url: `/faq/${queryArg.categoryId}/questions/${queryArg.questionId}`,
				method: 'PATCH',
				body: queryArg.faqQuestionModelUpdateV1,
			}),
		}),
		reorderFaq: build.mutation<ReorderFaqApiResponse, ReorderFaqApiArg>({
			query: (queryArg) => ({ url: `/faq/reorder`, method: 'POST', body: queryArg.body }),
		}),
		addForumAdmin: build.mutation<AddForumAdminApiResponse, AddForumAdminApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/admins/${queryArg.userId}`,
				method: 'PUT',
			}),
		}),
		removeForumAdmin: build.mutation<RemoveForumAdminApiResponse, RemoveForumAdminApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/admins/${queryArg.userId}`,
				method: 'DELETE',
			}),
		}),
		retrieveForum: build.query<RetrieveForumApiResponse, RetrieveForumApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		addTopic: build.mutation<AddTopicApiResponse, AddTopicApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}`,
				method: 'POST',
				body: queryArg.forumTopicModelAddV1,
			}),
		}),
		showLogPost: build.mutation<ShowLogPostApiResponse, ShowLogPostApiArg>({
			query: (queryArg) => ({
				url: `/forums/log`,
				method: 'POST',
				body: queryArg.forumAdminHistorySearchRequestV1,
			}),
		}),
		listCategories: build.query<ListCategoriesApiResponse, ListCategoriesApiArg>({
			query: () => ({ url: `/forums` }),
		}),
		listPopularForums: build.query<ListPopularForumsApiResponse, ListPopularForumsApiArg>({
			query: () => ({ url: `/forums/popular` }),
		}),
		listPostsByMe: build.query<ListPostsByMeApiResponse, ListPostsByMeApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/my_posts`,
			}),
		}),
		listPosts: build.mutation<ListPostsApiResponse, ListPostsApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/list`,
				method: 'POST',
				body: queryArg.perPageSearchRequestV1,
			}),
		}),
		listTopics: build.mutation<ListTopicsApiResponse, ListTopicsApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/list`,
				method: 'POST',
				body: queryArg.forumTopicListRequestV1,
				params: { with_first_post: queryArg.withFirstPost },
			}),
		}),
		listGlobalTopics: build.query<ListGlobalTopicsApiResponse, ListGlobalTopicsApiArg>({
			query: () => ({ url: `/forums/global` }),
		}),
		lookupSeries: build.query<LookupSeriesApiResponse, LookupSeriesApiArg>({
			query: (queryArg) => ({ url: `/forums/lookup/series/${queryArg.seriesId}` }),
		}),
		lookupTopic: build.query<LookupTopicApiResponse, LookupTopicApiArg>({
			query: (queryArg) => ({ url: `/forums/lookup/topic/${queryArg.topicId}` }),
		}),
		lookupPost: build.query<LookupPostApiResponse, LookupPostApiArg>({
			query: (queryArg) => ({ url: `/forums/lookup/post/${queryArg.postId}` }),
		}),
		retrieveTemporaryPollImages: build.query<
			RetrieveTemporaryPollImagesApiResponse,
			RetrieveTemporaryPollImagesApiArg
		>({
			query: () => ({ url: `/forums/temp_poll_images` }),
		}),
		addTemporaryPollImage: build.mutation<
			AddTemporaryPollImageApiResponse,
			AddTemporaryPollImageApiArg
		>({
			query: (queryArg) => ({
				url: `/forums/temp_poll_images`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		updateTopicPoll: build.mutation<UpdateTopicPollApiResponse, UpdateTopicPollApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/poll`,
				method: 'PATCH',
				body: queryArg.forumPollModelUpdateV1,
			}),
		}),
		addPollVote: build.mutation<AddPollVoteApiResponse, AddPollVoteApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/poll/vote/${queryArg.choiceId}`,
				method: 'POST',
			}),
		}),
		retrieveVote: build.query<RetrieveVoteApiResponse, RetrieveVoteApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/poll/vote`,
			}),
		}),
		retrieveTopic: build.query<RetrieveTopicApiResponse, RetrieveTopicApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		addPost: build.mutation<AddPostApiResponse, AddPostApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}`,
				method: 'POST',
				body: queryArg.forumPostModelUpdateV1,
			}),
		}),
		deleteTopic: build.mutation<DeleteTopicApiResponse, DeleteTopicApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}`,
				method: 'DELETE',
			}),
		}),
		updateTopic: build.mutation<UpdateTopicApiResponse, UpdateTopicApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}`,
				method: 'PATCH',
				body: queryArg.forumTopicModelUpdateV1,
			}),
		}),
		retrievePost: build.query<RetrievePostApiResponse, RetrievePostApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/posts/${queryArg.postId}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deletePost: build.mutation<DeletePostApiResponse, DeletePostApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/posts/${queryArg.postId}`,
				method: 'DELETE',
			}),
		}),
		updatePost: build.mutation<UpdatePostApiResponse, UpdatePostApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/posts/${queryArg.postId}`,
				method: 'PATCH',
				body: queryArg.forumPostModelUpdateV1,
			}),
		}),
		reportPost: build.mutation<ReportPostApiResponse, ReportPostApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/posts/${queryArg.postId}/report`,
				method: 'POST',
				body: queryArg.forumPostReportModelUpdateV1,
			}),
		}),
		deletePostReport: build.mutation<DeletePostReportApiResponse, DeletePostReportApiArg>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/posts/${queryArg.postId}/report`,
				method: 'DELETE',
			}),
		}),
		listReportedPosts: build.query<ListReportedPostsApiResponse, ListReportedPostsApiArg>({
			query: () => ({ url: `/forums/report` }),
		}),
		retrievePostLocation: build.query<
			RetrievePostLocationApiResponse,
			RetrievePostLocationApiArg
		>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/posts/${queryArg.postId}/location`,
			}),
		}),
		searchForumPost: build.mutation<SearchForumPostApiResponse, SearchForumPostApiArg>({
			query: (queryArg) => ({
				url: `/forums/search`,
				method: 'POST',
				body: queryArg.forumSearchRequestV1,
			}),
		}),
		searchSpecificForumPost: build.mutation<
			SearchSpecificForumPostApiResponse,
			SearchSpecificForumPostApiArg
		>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/search`,
				method: 'POST',
				body: queryArg.forumSearchRequestV1,
			}),
		}),
		searchSpecificTopicPost: build.mutation<
			SearchSpecificTopicPostApiResponse,
			SearchSpecificTopicPostApiArg
		>({
			query: (queryArg) => ({
				url: `/forums/${queryArg.forumId}/topics/${queryArg.topicId}/search`,
				method: 'POST',
				body: queryArg.forumSearchRequestV1,
			}),
		}),
		listWarnHistoryForUser: build.query<
			ListWarnHistoryForUserApiResponse,
			ListWarnHistoryForUserApiArg
		>({
			query: (queryArg) => ({ url: `/forums/warn/${queryArg.userId}/history` }),
		}),
		getCurrentWarnForUser: build.query<
			GetCurrentWarnForUserApiResponse,
			GetCurrentWarnForUserApiArg
		>({
			query: (queryArg) => ({ url: `/forums/warn/${queryArg.userId}` }),
		}),
		updateUserWarnLevel: build.mutation<
			UpdateUserWarnLevelApiResponse,
			UpdateUserWarnLevelApiArg
		>({
			query: (queryArg) => ({
				url: `/forums/warn/${queryArg.userId}`,
				method: 'PUT',
				body: queryArg.forumWarnModelUpdateV1,
			}),
		}),
		retrieveGenres: build.query<RetrieveGenresApiResponse, RetrieveGenresApiArg>({
			query: () => ({ url: `/genres` }),
		}),
		addGenre: build.mutation<AddGenreApiResponse, AddGenreApiArg>({
			query: (queryArg) => ({
				url: `/genres`,
				method: 'POST',
				body: queryArg.genreModelUpdateV1,
			}),
		}),
		retrieveGenreById: build.query<RetrieveGenreByIdApiResponse, RetrieveGenreByIdApiArg>({
			query: (queryArg) => ({
				url: `/genres/${queryArg.id}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteGenre: build.mutation<DeleteGenreApiResponse, DeleteGenreApiArg>({
			query: (queryArg) => ({ url: `/genres/${queryArg.id}`, method: 'DELETE' }),
		}),
		updateGenre: build.mutation<UpdateGenreApiResponse, UpdateGenreApiArg>({
			query: (queryArg) => ({
				url: `/genres/${queryArg.id}`,
				method: 'PATCH',
				body: queryArg.genreModelUpdateV1,
			}),
		}),
		addGroup: build.mutation<AddGroupApiResponse, AddGroupApiArg>({
			query: (queryArg) => ({
				url: `/groups`,
				method: 'POST',
				body: queryArg.groupsModelUpdateV1,
			}),
		}),
		retrieveGroup: build.query<RetrieveGroupApiResponse, RetrieveGroupApiArg>({
			query: (queryArg) => ({
				url: `/groups/${queryArg.id}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteGroup: build.mutation<DeleteGroupApiResponse, DeleteGroupApiArg>({
			query: (queryArg) => ({ url: `/groups/${queryArg.id}`, method: 'DELETE' }),
		}),
		updateGroup: build.mutation<UpdateGroupApiResponse, UpdateGroupApiArg>({
			query: (queryArg) => ({
				url: `/groups/${queryArg.id}`,
				method: 'PATCH',
				body: queryArg.groupsModelUpdateV1,
			}),
		}),
		rejectGroup: build.mutation<RejectGroupApiResponse, RejectGroupApiArg>({
			query: (queryArg) => ({ url: `/groups/${queryArg.id}/reject`, method: 'POST' }),
		}),
		searchGroupsPost: build.mutation<SearchGroupsPostApiResponse, SearchGroupsPostApiArg>({
			query: (queryArg) => ({
				url: `/groups/search`,
				method: 'POST',
				body: queryArg.groupsSearchRequestV1,
			}),
		}),
		retrieveGroupSeries: build.query<RetrieveGroupSeriesApiResponse, RetrieveGroupSeriesApiArg>(
			{
				query: (queryArg) => ({ url: `/groups/${queryArg.id}/series` }),
			},
		),
		retrieveLists: build.query<RetrieveListsApiResponse, RetrieveListsApiArg>({
			query: () => ({ url: `/lists` }),
		}),
		addCustomList: build.mutation<AddCustomListApiResponse, AddCustomListApiArg>({
			query: (queryArg) => ({
				url: `/lists`,
				method: 'POST',
				body: queryArg.listsModelUpdateV1,
			}),
		}),
		retrieveListById: build.query<RetrieveListByIdApiResponse, RetrieveListByIdApiArg>({
			query: (queryArg) => ({
				url: `/lists/${queryArg.id}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteCustomList: build.mutation<DeleteCustomListApiResponse, DeleteCustomListApiArg>({
			query: (queryArg) => ({ url: `/lists/${queryArg.id}`, method: 'DELETE' }),
		}),
		updateList: build.mutation<UpdateListApiResponse, UpdateListApiArg>({
			query: (queryArg) => ({
				url: `/lists/${queryArg.id}`,
				method: 'PATCH',
				body: queryArg.listsModelUpdateV1,
			}),
		}),
		retrievePublicLists: build.query<RetrievePublicListsApiResponse, RetrievePublicListsApiArg>(
			{
				query: (queryArg) => ({ url: `/lists/public/${queryArg.userId}` }),
			},
		),
		retrievePublicListStats: build.query<
			RetrievePublicListStatsApiResponse,
			RetrievePublicListStatsApiArg
		>({
			query: (queryArg) => ({ url: `/lists/public/${queryArg.userId}/stats` }),
		}),
		searchPublicListsPost: build.mutation<
			SearchPublicListsPostApiResponse,
			SearchPublicListsPostApiArg
		>({
			query: (queryArg) => ({
				url: `/lists/public/${queryArg.userId}/search/${queryArg.id}`,
				method: 'POST',
				body: queryArg.listsSearchRequestV1,
			}),
		}),
		searchListsPost: build.mutation<SearchListsPostApiResponse, SearchListsPostApiArg>({
			query: (queryArg) => ({
				url: `/lists/${queryArg.id}/search`,
				method: 'POST',
				body: queryArg.listsSearchRequestV1,
			}),
		}),
		addListSeries: build.mutation<AddListSeriesApiResponse, AddListSeriesApiArg>({
			query: (queryArg) => ({ url: `/lists/series`, method: 'POST', body: queryArg.body }),
		}),
		addListSeriesBulk: build.mutation<AddListSeriesBulkApiResponse, AddListSeriesBulkApiArg>({
			query: (queryArg) => ({
				url: `/lists/${queryArg.id}/series/bulk`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		deleteListSeries: build.mutation<DeleteListSeriesApiResponse, DeleteListSeriesApiArg>({
			query: (queryArg) => ({
				url: `/lists/series/delete`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		retrieveListSeries: build.query<RetrieveListSeriesApiResponse, RetrieveListSeriesApiArg>({
			query: (queryArg) => ({
				url: `/lists/series/${queryArg.seriesId}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		updateListSeries: build.mutation<UpdateListSeriesApiResponse, UpdateListSeriesApiArg>({
			query: (queryArg) => ({
				url: `/lists/series/update`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		retrieveSimilarUsersBySeries: build.query<
			RetrieveSimilarUsersBySeriesApiResponse,
			RetrieveSimilarUsersBySeriesApiArg
		>({
			query: (queryArg) => ({
				url: `/lists/similar/${queryArg.listName}/${queryArg.seriesId}`,
			}),
		}),
		time: build.query<TimeApiResponse, TimeApiArg>({
			query: () => ({ url: `/misc/time` }),
		}),
		listOnlineUsers: build.query<ListOnlineUsersApiResponse, ListOnlineUsersApiArg>({
			query: () => ({ url: `/misc/online` }),
		}),
		retrieveSlowTransactionStatus: build.query<
			RetrieveSlowTransactionStatusApiResponse,
			RetrieveSlowTransactionStatusApiArg
		>({
			query: (queryArg) => ({
				url: `/misc/slow-transaction-status/${queryArg.transactionId}`,
			}),
		}),
		siteStats: build.query<SiteStatsApiResponse, SiteStatsApiArg>({
			query: () => ({ url: `/misc/stats` }),
		}),
		retrievePoll: build.query<RetrievePollApiResponse, RetrievePollApiArg>({
			query: () => ({ url: `/poll` }),
		}),
		addPoll: build.mutation<AddPollApiResponse, AddPollApiArg>({
			query: (queryArg) => ({
				url: `/poll`,
				method: 'POST',
				body: queryArg.pollModelUpdateV1,
			}),
		}),
		archivePoll: build.mutation<ArchivePollApiResponse, ArchivePollApiArg>({
			query: () => ({ url: `/poll`, method: 'DELETE' }),
		}),
		retrieveOldPolls: build.query<RetrieveOldPollsApiResponse, RetrieveOldPollsApiArg>({
			query: () => ({ url: `/poll/old` }),
		}),
		votePollNoAnswer: build.mutation<VotePollNoAnswerApiResponse, VotePollNoAnswerApiArg>({
			query: () => ({ url: `/poll/vote`, method: 'POST' }),
		}),
		votePollAnswer: build.mutation<VotePollAnswerApiResponse, VotePollAnswerApiArg>({
			query: (queryArg) => ({ url: `/poll/vote/${queryArg.answerId}`, method: 'POST' }),
		}),
		retrieveVoteStatus: build.query<RetrieveVoteStatusApiResponse, RetrieveVoteStatusApiArg>({
			query: () => ({ url: `/poll/vote/status` }),
		}),
		addPublisher: build.mutation<AddPublisherApiResponse, AddPublisherApiArg>({
			query: (queryArg) => ({
				url: `/publishers`,
				method: 'POST',
				body: queryArg.publishersModelUpdateV1,
			}),
		}),
		retrievePublisher: build.query<RetrievePublisherApiResponse, RetrievePublisherApiArg>({
			query: (queryArg) => ({
				url: `/publishers/${queryArg.id}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deletePublisher: build.mutation<DeletePublisherApiResponse, DeletePublisherApiArg>({
			query: (queryArg) => ({ url: `/publishers/${queryArg.id}`, method: 'DELETE' }),
		}),
		updatePublisher: build.mutation<UpdatePublisherApiResponse, UpdatePublisherApiArg>({
			query: (queryArg) => ({
				url: `/publishers/${queryArg.id}`,
				method: 'PATCH',
				body: queryArg.publishersModelUpdateV1,
			}),
		}),
		searchPublishersPost: build.mutation<
			SearchPublishersPostApiResponse,
			SearchPublishersPostApiArg
		>({
			query: (queryArg) => ({
				url: `/publishers/search`,
				method: 'POST',
				body: queryArg.publishersSearchRequestV1,
			}),
		}),
		retrievePublisherSeries: build.query<
			RetrievePublisherSeriesApiResponse,
			RetrievePublisherSeriesApiArg
		>({
			query: (queryArg) => ({ url: `/publishers/${queryArg.id}/series` }),
		}),
		retrievePublicationSeries: build.query<
			RetrievePublicationSeriesApiResponse,
			RetrievePublicationSeriesApiArg
		>({
			query: (queryArg) => ({
				url: `/publishers/publication`,
				params: { pubname: queryArg.pubname },
			}),
		}),
		addRelease: build.mutation<AddReleaseApiResponse, AddReleaseApiArg>({
			query: (queryArg) => ({ url: `/releases`, method: 'POST', body: queryArg.body }),
		}),
		retrieveRelease: build.query<RetrieveReleaseApiResponse, RetrieveReleaseApiArg>({
			query: (queryArg) => ({
				url: `/releases/${queryArg.id}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteRelease: build.mutation<DeleteReleaseApiResponse, DeleteReleaseApiArg>({
			query: (queryArg) => ({ url: `/releases/${queryArg.id}`, method: 'DELETE' }),
		}),
		updateRelease: build.mutation<UpdateReleaseApiResponse, UpdateReleaseApiArg>({
			query: (queryArg) => ({
				url: `/releases/${queryArg.id}`,
				method: 'PATCH',
				body: queryArg.releaseModelUpdateV1,
			}),
		}),
		moderateReleasesPost: build.mutation<
			ModerateReleasesPostApiResponse,
			ModerateReleasesPostApiArg
		>({
			query: (queryArg) => ({
				url: `/releases/moderate`,
				method: 'POST',
				body: queryArg.releaseModerateRequestV1,
			}),
		}),
		listReleasesByDay: build.query<ListReleasesByDayApiResponse, ListReleasesByDayApiArg>({
			query: (queryArg) => ({
				url: `/releases/days`,
				params: { page: queryArg.page, include_metadata: queryArg.includeMetadata },
			}),
		}),
		releaseRssFeed: build.query<ReleaseRssFeedApiResponse, ReleaseRssFeedApiArg>({
			query: () => ({ url: `/releases/rss` }),
		}),
		searchReleasesPost: build.mutation<SearchReleasesPostApiResponse, SearchReleasesPostApiArg>(
			{
				query: (queryArg) => ({
					url: `/releases/search`,
					method: 'POST',
					body: queryArg.releaseSearchRequestV1,
				}),
			},
		),
		addReview: build.mutation<AddReviewApiResponse, AddReviewApiArg>({
			query: (queryArg) => ({
				url: `/reviews`,
				method: 'POST',
				body: queryArg.reviewModelUpdateV1,
			}),
		}),
		addReviewComment: build.mutation<AddReviewCommentApiResponse, AddReviewCommentApiArg>({
			query: (queryArg) => ({
				url: `/reviews/${queryArg.id}/comments`,
				method: 'POST',
				body: queryArg.reviewCommentModelUpdateV1,
			}),
		}),
		retrieveReviewComment: build.query<
			RetrieveReviewCommentApiResponse,
			RetrieveReviewCommentApiArg
		>({
			query: (queryArg) => ({
				url: `/reviews/${queryArg.id}/comments/${queryArg.commentId}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteReviewComment: build.mutation<
			DeleteReviewCommentApiResponse,
			DeleteReviewCommentApiArg
		>({
			query: (queryArg) => ({
				url: `/reviews/${queryArg.id}/comments/${queryArg.commentId}`,
				method: 'DELETE',
			}),
		}),
		updateReviewComment: build.mutation<
			UpdateReviewCommentApiResponse,
			UpdateReviewCommentApiArg
		>({
			query: (queryArg) => ({
				url: `/reviews/${queryArg.id}/comments/${queryArg.commentId}`,
				method: 'PATCH',
				body: queryArg.reviewCommentModelUpdateV1,
			}),
		}),
		reviewCommentsModerationPost: build.mutation<
			ReviewCommentsModerationPostApiResponse,
			ReviewCommentsModerationPostApiArg
		>({
			query: (queryArg) => ({
				url: `/reviews/comments/moderation`,
				method: 'POST',
				body: queryArg.reviewCommentSearchRequestV1,
			}),
		}),
		searchReviewCommentsPost: build.mutation<
			SearchReviewCommentsPostApiResponse,
			SearchReviewCommentsPostApiArg
		>({
			query: (queryArg) => ({
				url: `/reviews/${queryArg.id}/comments/search`,
				method: 'POST',
				body: queryArg.reviewCommentSearchRequestV1,
			}),
		}),
		retrieveReview: build.query<RetrieveReviewApiResponse, RetrieveReviewApiArg>({
			query: (queryArg) => ({
				url: `/reviews/${queryArg.id}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteReview: build.mutation<DeleteReviewApiResponse, DeleteReviewApiArg>({
			query: (queryArg) => ({ url: `/reviews/${queryArg.id}`, method: 'DELETE' }),
		}),
		updateReview: build.mutation<UpdateReviewApiResponse, UpdateReviewApiArg>({
			query: (queryArg) => ({
				url: `/reviews/${queryArg.id}`,
				method: 'PATCH',
				body: queryArg.reviewModelUpdateV1,
			}),
		}),
		searchReviewsPost: build.mutation<SearchReviewsPostApiResponse, SearchReviewsPostApiArg>({
			query: (queryArg) => ({
				url: `/reviews/search`,
				method: 'POST',
				body: queryArg.reviewSearchRequestV1,
			}),
		}),
		addSeries: build.mutation<AddSeriesApiResponse, AddSeriesApiArg>({
			query: (queryArg) => ({
				url: `/series`,
				method: 'POST',
				body: queryArg.seriesModelUpdateV1,
			}),
		}),
		combineSeriesCategories: build.mutation<
			CombineSeriesCategoriesApiResponse,
			CombineSeriesCategoriesApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/categories/combine`,
				method: 'POST',
				body: queryArg.seriesCategoryUpdateModelV1,
			}),
		}),
		deleteSeriesCategory: build.mutation<
			DeleteSeriesCategoryApiResponse,
			DeleteSeriesCategoryApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/categories/delete`,
				method: 'POST',
				body: queryArg.categoriesModelUpdateV1,
			}),
		}),
		renameSeriesCategory: build.mutation<
			RenameSeriesCategoryApiResponse,
			RenameSeriesCategoryApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/categories/rename`,
				method: 'POST',
				body: queryArg.seriesCategoryUpdateModelV1,
			}),
		}),
		retrieveSeriesCategoryVotes: build.query<
			RetrieveSeriesCategoryVotesApiResponse,
			RetrieveSeriesCategoryVotesApiArg
		>({
			query: (queryArg) => ({ url: `/series/${queryArg.id}/categories/votes` }),
		}),
		addSeriesCategoryVote: build.mutation<
			AddSeriesCategoryVoteApiResponse,
			AddSeriesCategoryVoteApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/categories/vote`,
				method: 'POST',
				body: queryArg.seriesCategoryVoteModelV1,
			}),
		}),
		removeSeriesCategoryVote: build.mutation<
			RemoveSeriesCategoryVoteApiResponse,
			RemoveSeriesCategoryVoteApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/categories/vote/delete`,
				method: 'POST',
				body: queryArg.seriesCategoryVoteDeleteModelV1,
			}),
		}),
		addSeriesComment: build.mutation<AddSeriesCommentApiResponse, AddSeriesCommentApiArg>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/comments`,
				method: 'POST',
				body: queryArg.seriesCommentModelUpdateV1,
			}),
		}),
		retrieveSeriesComment: build.query<
			RetrieveSeriesCommentApiResponse,
			RetrieveSeriesCommentApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/comments/${queryArg.commentId}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteSeriesComment: build.mutation<
			DeleteSeriesCommentApiResponse,
			DeleteSeriesCommentApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/comments/${queryArg.commentId}`,
				method: 'DELETE',
			}),
		}),
		updateSeriesComment: build.mutation<
			UpdateSeriesCommentApiResponse,
			UpdateSeriesCommentApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/comments/${queryArg.commentId}`,
				method: 'PATCH',
				body: queryArg.seriesCommentModelUpdateV1,
			}),
		}),
		seriesCommentsModerationPost: build.mutation<
			SeriesCommentsModerationPostApiResponse,
			SeriesCommentsModerationPostApiArg
		>({
			query: (queryArg) => ({
				url: `/series/comments/moderation`,
				method: 'POST',
				body: queryArg.seriesCommentSearchRequestV1,
			}),
		}),
		reportSeriesComment: build.mutation<
			ReportSeriesCommentApiResponse,
			ReportSeriesCommentApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/comments/${queryArg.commentId}/report`,
				method: 'POST',
				body: queryArg.seriesCommentReportModelV1,
			}),
		}),
		retrieveMySeriesComment: build.query<
			RetrieveMySeriesCommentApiResponse,
			RetrieveMySeriesCommentApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/comments/my_comment`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		retrieveSeriesCommentLocation: build.query<
			RetrieveSeriesCommentLocationApiResponse,
			RetrieveSeriesCommentLocationApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/comments/${queryArg.commentId}/location`,
			}),
		}),
		searchSeriesCommentsPost: build.mutation<
			SearchSeriesCommentsPostApiResponse,
			SearchSeriesCommentsPostApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/comments/search`,
				method: 'POST',
				body: queryArg.seriesCommentSearchRequestV1,
			}),
		}),
		addSeriesCommentUsefulFlag: build.mutation<
			AddSeriesCommentUsefulFlagApiResponse,
			AddSeriesCommentUsefulFlagApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/comments/${queryArg.commentId}/useful`,
				method: 'PUT',
				body: queryArg.seriesCommentUsefulModelV1,
			}),
		}),
		removeSeriesCommentUsefulFlag: build.mutation<
			RemoveSeriesCommentUsefulFlagApiResponse,
			RemoveSeriesCommentUsefulFlagApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/comments/${queryArg.commentId}/useful`,
				method: 'DELETE',
			}),
		}),
		retrieveSeries: build.query<RetrieveSeriesApiResponse, RetrieveSeriesApiArg>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteSeries: build.mutation<DeleteSeriesApiResponse, DeleteSeriesApiArg>({
			query: (queryArg) => ({ url: `/series/${queryArg.id}`, method: 'DELETE' }),
		}),
		updateSeries: build.mutation<UpdateSeriesApiResponse, UpdateSeriesApiArg>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}`,
				method: 'PATCH',
				body: queryArg.seriesModelUpdateV1,
			}),
		}),
		retrieveSeriesGroups: build.query<
			RetrieveSeriesGroupsApiResponse,
			RetrieveSeriesGroupsApiArg
		>({
			query: (queryArg) => ({ url: `/series/${queryArg.id}/groups` }),
		}),
		searchSeriesHistoryPost: build.mutation<
			SearchSeriesHistoryPostApiResponse,
			SearchSeriesHistoryPostApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/history`,
				method: 'POST',
				body: queryArg.perPageSearchRequestV1,
			}),
		}),
		retrieveSeriesLocks: build.query<RetrieveSeriesLocksApiResponse, RetrieveSeriesLocksApiArg>(
			{
				query: (queryArg) => ({ url: `/series/${queryArg.id}/locks` }),
			},
		),
		lockSeriesField: build.mutation<LockSeriesFieldApiResponse, LockSeriesFieldApiArg>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/locks/${queryArg.item}/lock`,
				method: 'POST',
				body: queryArg.seriesLockModelUpdateV1,
			}),
		}),
		unlockSeriesField: build.mutation<UnlockSeriesFieldApiResponse, UnlockSeriesFieldApiArg>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/locks/${queryArg.item}/unlock`,
				method: 'POST',
			}),
		}),
		retrieveSeriesRankLocation: build.query<
			RetrieveSeriesRankLocationApiResponse,
			RetrieveSeriesRankLocationApiArg
		>({
			query: (queryArg) => ({ url: `/series/${queryArg.id}/rank/${queryArg['type']}` }),
		}),
		retrieveUserSeriesRating: build.query<
			RetrieveUserSeriesRatingApiResponse,
			RetrieveUserSeriesRatingApiArg
		>({
			query: (queryArg) => ({ url: `/series/${queryArg.id}/rating` }),
		}),
		updateUserSeriesRating: build.mutation<
			UpdateUserSeriesRatingApiResponse,
			UpdateUserSeriesRatingApiArg
		>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/rating`,
				method: 'PUT',
				body: queryArg.seriesRatingModelV1,
			}),
		}),
		deleteUserSeriesRating: build.mutation<
			DeleteUserSeriesRatingApiResponse,
			DeleteUserSeriesRatingApiArg
		>({
			query: (queryArg) => ({ url: `/series/${queryArg.id}/rating`, method: 'DELETE' }),
		}),
		retrieveSeriesRatingRainbow: build.query<
			RetrieveSeriesRatingRainbowApiResponse,
			RetrieveSeriesRatingRainbowApiArg
		>({
			query: (queryArg) => ({ url: `/series/${queryArg.id}/ratingrainbow` }),
		}),
		seriesReleaseRssFeed: build.query<
			SeriesReleaseRssFeedApiResponse,
			SeriesReleaseRssFeedApiArg
		>({
			query: (queryArg) => ({ url: `/series/${queryArg.id}/rss` }),
		}),
		searchSeriesPost: build.mutation<SearchSeriesPostApiResponse, SearchSeriesPostApiArg>({
			query: (queryArg) => ({
				url: `/series/search`,
				method: 'POST',
				body: queryArg.seriesSearchRequestV1,
			}),
		}),
		updateSeriesImage: build.mutation<UpdateSeriesImageApiResponse, UpdateSeriesImageApiArg>({
			query: (queryArg) => ({
				url: `/series/${queryArg.id}/image`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		deleteSeriesImage: build.mutation<DeleteSeriesImageApiResponse, DeleteSeriesImageApiArg>({
			query: (queryArg) => ({ url: `/series/${queryArg.id}/image`, method: 'DELETE' }),
		}),
		retrieveUserGroupById: build.query<
			RetrieveUserGroupByIdApiResponse,
			RetrieveUserGroupByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/membergroups/${queryArg.id}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		addOrUpdateUserGroup: build.mutation<
			AddOrUpdateUserGroupApiResponse,
			AddOrUpdateUserGroupApiArg
		>({
			query: (queryArg) => ({
				url: `/membergroups/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.userGroupModelUpdateV1,
			}),
		}),
		deleteUserGroup: build.mutation<DeleteUserGroupApiResponse, DeleteUserGroupApiArg>({
			query: (queryArg) => ({ url: `/membergroups/${queryArg.id}`, method: 'DELETE' }),
		}),
		retrieveUserGroups: build.query<RetrieveUserGroupsApiResponse, RetrieveUserGroupsApiArg>({
			query: () => ({ url: `/membergroups` }),
		}),
		addMember: build.mutation<AddMemberApiResponse, AddMemberApiArg>({
			query: (queryArg) => ({
				url: `/members`,
				method: 'POST',
				body: queryArg.userModelUpdateV1,
			}),
		}),
		searchMemberChangeRequests: build.query<
			SearchMemberChangeRequestsApiResponse,
			SearchMemberChangeRequestsApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/requests`,
				params: {
					page: queryArg.page,
					perpage: queryArg.perpage,
					orderby: queryArg.orderby,
					asc: queryArg.asc,
				},
			}),
		}),
		addMemberChangeRequest: build.mutation<
			AddMemberChangeRequestApiResponse,
			AddMemberChangeRequestApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/requests`,
				method: 'POST',
				body: queryArg.userChangeRequestModelUpdateV1,
			}),
		}),
		retrieveMemberChangeRequest: build.query<
			RetrieveMemberChangeRequestApiResponse,
			RetrieveMemberChangeRequestApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/requests/${queryArg.requestId}`,
			}),
		}),
		deleteMemberChangeRequest: build.mutation<
			DeleteMemberChangeRequestApiResponse,
			DeleteMemberChangeRequestApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/requests/${queryArg.requestId}`,
				method: 'DELETE',
			}),
		}),
		updateMemberChangeRequest: build.mutation<
			UpdateMemberChangeRequestApiResponse,
			UpdateMemberChangeRequestApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/requests/${queryArg.requestId}`,
				method: 'PATCH',
				body: queryArg.userChangeRequestModelUpdateV1,
			}),
		}),
		retrieveMember: build.query<RetrieveMemberApiResponse, RetrieveMemberApiArg>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}`,
				params: { unrenderedFields: queryArg.unrenderedFields },
			}),
		}),
		deleteMember: build.mutation<DeleteMemberApiResponse, DeleteMemberApiArg>({
			query: (queryArg) => ({ url: `/members/${queryArg.id}`, method: 'DELETE' }),
		}),
		updateMember: build.mutation<UpdateMemberApiResponse, UpdateMemberApiArg>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}`,
				method: 'PATCH',
				body: queryArg.userModelUpdateV1,
			}),
		}),
		retrieveMemberGenreFilters: build.query<
			RetrieveMemberGenreFiltersApiResponse,
			RetrieveMemberGenreFiltersApiArg
		>({
			query: (queryArg) => ({ url: `/members/${queryArg.id}/genre/filters` }),
		}),
		addMemberGenreFilter: build.mutation<
			AddMemberGenreFilterApiResponse,
			AddMemberGenreFilterApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/genre/${queryArg.genreId}/filter`,
				method: 'POST',
			}),
		}),
		removeMemberGenreFilter: build.mutation<
			RemoveMemberGenreFilterApiResponse,
			RemoveMemberGenreFilterApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/genre/${queryArg.genreId}/filter`,
				method: 'DELETE',
			}),
		}),
		retrieveMemberGenreHighlights: build.query<
			RetrieveMemberGenreHighlightsApiResponse,
			RetrieveMemberGenreHighlightsApiArg
		>({
			query: (queryArg) => ({ url: `/members/${queryArg.id}/genre/highlights` }),
		}),
		addMemberGenreHighlight: build.mutation<
			AddMemberGenreHighlightApiResponse,
			AddMemberGenreHighlightApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/genre/${queryArg.genreId}/highlight`,
				method: 'POST',
				body: queryArg.userGenreHighlightModelUpdateV1,
			}),
		}),
		removeMemberGenreHighlight: build.mutation<
			RemoveMemberGenreHighlightApiResponse,
			RemoveMemberGenreHighlightApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/genre/${queryArg.genreId}/highlight`,
				method: 'DELETE',
			}),
		}),
		resetGenreSettings: build.mutation<ResetGenreSettingsApiResponse, ResetGenreSettingsApiArg>(
			{
				query: (queryArg) => ({
					url: `/members/${queryArg.id}/genre/reset`,
					method: 'POST',
				}),
			},
		),
		retrieveMemberGroupFilters: build.query<
			RetrieveMemberGroupFiltersApiResponse,
			RetrieveMemberGroupFiltersApiArg
		>({
			query: (queryArg) => ({ url: `/members/${queryArg.id}/group/filters` }),
		}),
		addUserGroupFilter: build.mutation<AddUserGroupFilterApiResponse, AddUserGroupFilterApiArg>(
			{
				query: (queryArg) => ({
					url: `/members/${queryArg.id}/group/${queryArg.groupId}/filter`,
					method: 'POST',
				}),
			},
		),
		removeUserGroupFilter: build.mutation<
			RemoveUserGroupFilterApiResponse,
			RemoveUserGroupFilterApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/group/${queryArg.groupId}/filter`,
				method: 'DELETE',
			}),
		}),
		retrieveMemberAvatars: build.query<
			RetrieveMemberAvatarsApiResponse,
			RetrieveMemberAvatarsApiArg
		>({
			query: (queryArg) => ({ url: `/members/${queryArg.id}/avatars` }),
		}),
		searchMembersPost: build.mutation<SearchMembersPostApiResponse, SearchMembersPostApiArg>({
			query: (queryArg) => ({
				url: `/members/search`,
				method: 'POST',
				body: queryArg.userSearchRequestV1,
			}),
		}),
		retrieveMemberTopicSubscriptions: build.query<
			RetrieveMemberTopicSubscriptionsApiResponse,
			RetrieveMemberTopicSubscriptionsApiArg
		>({
			query: (queryArg) => ({ url: `/members/${queryArg.id}/topics` }),
		}),
		retrieveMemberTopicSubscription: build.query<
			RetrieveMemberTopicSubscriptionApiResponse,
			RetrieveMemberTopicSubscriptionApiArg
		>({
			query: (queryArg) => ({ url: `/members/${queryArg.id}/topics/${queryArg.topicId}` }),
		}),
		addUserTopicSubscription: build.mutation<
			AddUserTopicSubscriptionApiResponse,
			AddUserTopicSubscriptionApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/topics/${queryArg.topicId}`,
				method: 'POST',
			}),
		}),
		removeUserTopicSubscription: build.mutation<
			RemoveUserTopicSubscriptionApiResponse,
			RemoveUserTopicSubscriptionApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/topics/${queryArg.topicId}`,
				method: 'DELETE',
			}),
		}),
		addMemberAvatar: build.mutation<AddMemberAvatarApiResponse, AddMemberAvatarApiArg>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/avatar`,
				method: 'POST',
				body: queryArg.body,
			}),
		}),
		deleteMemberAvatar: build.mutation<DeleteMemberAvatarApiResponse, DeleteMemberAvatarApiArg>(
			{
				query: (queryArg) => ({
					url: `/members/${queryArg.id}/avatar/${queryArg.avatarId}`,
					method: 'DELETE',
				}),
			},
		),
		approveMemberUpgrade: build.mutation<
			ApproveMemberUpgradeApiResponse,
			ApproveMemberUpgradeApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/upgrade/approve`,
				method: 'POST',
			}),
		}),
		rejectMemberUpgrade: build.mutation<
			RejectMemberUpgradeApiResponse,
			RejectMemberUpgradeApiArg
		>({
			query: (queryArg) => ({
				url: `/members/${queryArg.id}/upgrade/reject`,
				method: 'POST',
			}),
		}),
	}),
	overrideExisting: false,
});
export { injectedRtkApi as mangaUpdatesApi };
export type AddAboutusCategoryApiResponse = /** status 200 Category was added */ ApiResponseV1;
export type AddAboutusCategoryApiArg = {
	aboutusCategoryModelUpdateV1: AboutusCategoryModelUpdateV1;
};
export type RetrieveAboutusCategoryApiResponse =
	/** status 200 Return category record */ AboutusCategoryModelV1;
export type RetrieveAboutusCategoryApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Aboutus Category id */
	categoryId: number;
};
export type DeleteAboutusCategoryApiResponse = /** status 200 Category was removed */ ApiResponseV1;
export type DeleteAboutusCategoryApiArg = {
	/** Aboutus Category id */
	categoryId: number;
};
export type UpdateAboutusCategoryApiResponse = /** status 200 Category was updated */ ApiResponseV1;
export type UpdateAboutusCategoryApiArg = {
	/** id of category */
	categoryId: number;
	aboutusCategoryModelUpdateV1: AboutusCategoryModelUpdateV1;
};
export type RetrieveAboutusCategoriesAndUsersApiResponse =
	/** status 200 List of categories and users */ AboutusCategoryModelV1[];
export type RetrieveAboutusCategoriesAndUsersApiArg = void;
export type RetrieveAboutusDescriptionApiResponse =
	/** status 200 Description of the site */ AboutusDescriptionModelV1;
export type RetrieveAboutusDescriptionApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
};
export type UpdateAboutusDescriptionApiResponse =
	/** status 200 Description of the site updated */ ApiResponseV1;
export type UpdateAboutusDescriptionApiArg = {
	aboutusDescriptionModelV1: AboutusDescriptionModelV1;
};
export type ReorderAboutusApiResponse =
	/** status 200 Categories and users were reordered */ ApiResponseV1;
export type ReorderAboutusApiArg = {
	body: AboutusCategoryReorderModelV1[];
};
export type AddAboutusCategoryUserApiResponse = /** status 200 User was added */ ApiResponseV1;
export type AddAboutusCategoryUserApiArg = {
	/** Aboutus Category id */
	categoryId: number;
	aboutusUserModelUpdateV1: AboutusUserModelUpdateV1;
};
export type DeleteAboutusCategoryUserApiResponse = /** status 200 User was removed */ ApiResponseV1;
export type DeleteAboutusCategoryUserApiArg = {
	/** Aboutus Category id */
	categoryId: number;
	/** Aboutus Category User Entry id */
	entryId: number;
};
export type CaptchaApiResponse = /** status 200 Return captcha record */ ApiResponseV1;
export type CaptchaApiArg = void;
export type ConfirmDeleteAccountApiResponse = /** status 200 Account was deleted */ ApiResponseV1;
export type ConfirmDeleteAccountApiArg = {
	/** auth hash from email confirmation */
	authHash: string;
};
export type DeleteAccountApiResponse = /** status 200 Account was deleted */ ApiResponseV1;
export type DeleteAccountApiArg = {
	/** response of captcha */
	captchaResponse: string;
};
export type ConfirmAndChangePasswordApiResponse =
	/** status 200 Password was changed */ ApiResponseV1;
export type ConfirmAndChangePasswordApiArg = {
	/** auth hash from email confirmation */
	authHash: string;
	userModelUpdatePasswordV1: UserModelUpdatePasswordV1;
};
export type ForgotPasswordApiResponse = /** status 200 Email was sent */ ApiResponseV1;
export type ForgotPasswordApiArg = {
	/** response of captcha */
	captchaResponse: string;
	accountForgotPassModelV1: AccountForgotPassModelV1;
};
export type LoginApiResponse = /** status 200 Login successful */ ApiResponseV1;
export type LoginApiArg = {
	accountLoginModelV1: AccountLoginModelV1;
};
export type LogoutApiResponse = /** status 200 Logout successful */ ApiResponseV1;
export type LogoutApiArg = void;
export type ProfileApiResponse = /** status 200 Return user record */ UserModelV1;
export type ProfileApiArg = void;
export type ConfirmRegistrationApiResponse = /** status 200 Member was confirmed */ ApiResponseV1;
export type ConfirmRegistrationApiArg = {
	/** auth hash from email confirmation */
	authHash: string;
};
export type RegisterMemberApiResponse = /** status 200 Member was added */ ApiResponseV1;
export type RegisterMemberApiArg = {
	/** response of captcha */
	captchaResponse: string;
	userModelRegisterV1: UserModelRegisterV1;
};
export type ResendAuthEmailApiResponse = /** status 200 Auth email was sent */ ApiResponseV1;
export type ResendAuthEmailApiArg = {
	/** Member id */
	id: number;
};
export type SendForgotEmailApiResponse = /** status 200 Auth email was sent */ ApiResponseV1;
export type SendForgotEmailApiArg = {
	/** Member id */
	id: number;
};
export type AddAuthorApiResponse = /** status 200 Author was added */ ApiResponseV1;
export type AddAuthorApiArg = {
	authorsModelUpdateV1: AuthorsModelUpdateV1;
};
export type RetrieveAuthorApiResponse = /** status 200 Return author record */ AuthorsModelV1;
export type RetrieveAuthorApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Author id */
	id: number;
};
export type DeleteAuthorApiResponse =
	/** status 200 Author delete transaction submitted */ ApiResponseV1;
export type DeleteAuthorApiArg = {
	/** id of author */
	id: number;
};
export type UpdateAuthorApiResponse = /** status 200 Author was updated */ ApiResponseV1;
export type UpdateAuthorApiArg = {
	/** id of author */
	id: number;
	authorsModelUpdateV1: AuthorsModelUpdateV1;
};
export type RetrieveAuthorLocksApiResponse =
	/** status 200 Return author lock records */ AuthorsLockModelV1[];
export type RetrieveAuthorLocksApiArg = {
	/** Author id */
	id: number;
};
export type LockAuthorFieldApiResponse = /** status 200 Field was locked */ ApiResponseV1;
export type LockAuthorFieldApiArg = {
	/** id of author */
	id: number;
	/** field name */
	item: string;
	authorsLockModelUpdateV1: AuthorsLockModelUpdateV1;
};
export type UnlockAuthorFieldApiResponse = /** status 200 Field was unlocked */ ApiResponseV1;
export type UnlockAuthorFieldApiArg = {
	/** id of author */
	id: number;
	/** field name */
	item: string;
};
export type SearchAuthorsPostApiResponse =
	/** status 200 List of authors */ AuthorsSearchResponseV1;
export type SearchAuthorsPostApiArg = {
	authorsSearchRequestV1: AuthorsSearchRequestV1;
};
export type RetrieveAuthorSeriesApiResponse =
	/** status 200 Return series list */ AuthorsSeriesListResponseV1;
export type RetrieveAuthorSeriesApiArg = {
	/** Author id */
	id: number;
	authorsSeriesListRequestV1: AuthorsSeriesListRequestV1;
};
export type UpdateImageApiResponse = /** status 200 Image was updated */ ApiResponseV1;
export type UpdateImageApiArg = {
	/** id of author */
	id: number;
	body: {
		image?: Blob;
	};
};
export type DeleteImageApiResponse = /** status 200 Image was deleted */ ApiResponseV1;
export type DeleteImageApiArg = {
	/** id of author */
	id: number;
};
export type BulkCombineSeriesCategoriesApiResponse =
	/** status 200 Transaction has started */ ApiResponseV1;
export type BulkCombineSeriesCategoriesApiArg = {
	seriesCategoryUpdateModelV1: SeriesCategoryUpdateModelV1;
};
export type BulkDeleteSeriesCategoriesApiResponse =
	/** status 200 Transaction has started */ ApiResponseV1;
export type BulkDeleteSeriesCategoriesApiArg = {
	categoriesModelUpdateV1: CategoriesModelUpdateV1;
};
export type FindCategoryByPrefixApiResponse =
	/** status 200 Return categories records */ CategoriesModelV1[];
export type FindCategoryByPrefixApiArg = {
	categoriesModelUpdateV1: CategoriesModelUpdateV1;
};
export type FindCategoryByExactApiResponse =
	/** status 200 Return categories record */ CategoriesModelV1;
export type FindCategoryByExactApiArg = {
	categoriesModelUpdateV1: CategoriesModelUpdateV1;
};
export type SearchCategoriesPostApiResponse =
	/** status 200 Return categories records */ CategoriesSearchResponseV1;
export type SearchCategoriesPostApiArg = {
	categoriesSearchRequestV1: CategoriesSearchRequestV1;
};
export type AddConvoApiResponse = /** status 200 Convo was added */ ApiResponseV1;
export type AddConvoApiArg = {
	convoModelAddV1: ConvoModelAddV1;
};
export type AbandonConvoBulkApiResponse = /** status 200 Bulk abandon result */ ApiResponseV1;
export type AbandonConvoBulkApiArg = {
	convoBulkModelV1: ConvoBulkModelV1;
};
export type DeleteConvoBulkApiResponse = /** status 200 Bulk deletion result */ ApiResponseV1;
export type DeleteConvoBulkApiArg = {
	convoBulkModelV1: ConvoBulkModelV1;
};
export type RetrieveConvoApiResponse = /** status 200 Return convo record */ ConvoModelV1;
export type RetrieveConvoApiArg = {
	/** Convo id */
	id: number;
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
};
export type DeleteConvoApiResponse = /** status 200 Convo was deleted */ ApiResponseV1;
export type DeleteConvoApiArg = {
	/** Convo id */
	id: number;
};
export type UpdateConvoApiResponse = /** status 200 Convo was updated */ ApiResponseV1;
export type UpdateConvoApiArg = {
	/** Convo id */
	id: number;
	convoModelUpdateV1: ConvoModelUpdateV1;
};
export type IsUserIgnoredApiResponse = /** status 200 User ignore record */ ConvoUserIgnoreModelV1;
export type IsUserIgnoredApiArg = {
	/** User id */
	userId: number;
};
export type IgnoreUserApiResponse = /** status 200 User was ignored */ ApiResponseV1;
export type IgnoreUserApiArg = {
	/** User id */
	userId: number;
};
export type UnIgnoreUserApiResponse = /** status 200 User ignore was removed */ ApiResponseV1;
export type UnIgnoreUserApiArg = {
	/** User id */
	userId: number;
};
export type ConvoInboxApiResponse = /** status 200 List of convos */ ConvoSearchResponseV1;
export type ConvoInboxApiArg = void;
export type ConvoInboxCountApiResponse =
	/** status 200 Return number of new convos */ ConvoSearchResponseV1;
export type ConvoInboxCountApiArg = void;
export type ConvoSentApiResponse = /** status 200 List of convos */ ConvoSearchResponseV1;
export type ConvoSentApiArg = {
	perPageSearchRequestV1: PerPageSearchRequestV1;
};
export type ConvoReceivedApiResponse = /** status 200 List of convos */ ConvoSearchResponseV1;
export type ConvoReceivedApiArg = {
	perPageSearchRequestV1: PerPageSearchRequestV1;
};
export type AddConvoMessageApiResponse = /** status 200 Message was added */ ApiResponseV1;
export type AddConvoMessageApiArg = {
	/** Convo id */
	id: number;
	convoMessageModelUpdateV1: ConvoMessageModelUpdateV1;
};
export type ListConvoMessagesApiResponse =
	/** status 200 List of convo messages */ ConvoMessageSearchResponseV1;
export type ListConvoMessagesApiArg = {
	/** Convo id */
	id: number;
	convoMessageListRequestV1: ConvoMessageListRequestV1;
};
export type RetrieveConvoMessageApiResponse =
	/** status 200 Return convo message record */ ConvoMessageModelV1;
export type RetrieveConvoMessageApiArg = {
	/** Convo id */
	id: number;
	/** Convo message id */
	messageId: number;
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
};
export type UpdateConvoMessageApiResponse = /** status 200 Message was updated */ ApiResponseV1;
export type UpdateConvoMessageApiArg = {
	/** Convo id */
	id: number;
	/** Convo message id */
	messageId: number;
	convoMessageModelUpdateV1: ConvoMessageModelUpdateV1;
};
export type RetrieveConvoMessageLocationApiResponse =
	/** status 200 Return convo message record */ ApiResponseV1;
export type RetrieveConvoMessageLocationApiArg = {
	/** Convo id */
	id: number;
	/** Convo message id */
	messageId: number;
};
export type SearchConvoMessagesPostApiResponse =
	/** status 200 List of convo messages */ ConvoMessageSearchResponseV1;
export type SearchConvoMessagesPostApiArg = {
	/** Convo id */
	id: number;
	convoMessageSearchRequestV1: ConvoMessageSearchRequestV1;
};
export type AbandonConvoApiResponse = /** status 200 Convo was abandoned */ ApiResponseV1;
export type AbandonConvoApiArg = {
	/** Convo id */
	id: number;
};
export type InviteUserToConvoApiResponse = /** status 200 User was invited */ ApiResponseV1;
export type InviteUserToConvoApiArg = {
	/** Convo id */
	id: number;
	body: ConvoParticipantModelAddV1[];
};
export type JoinConvoApiResponse = /** status 200 Join successful */ ApiResponseV1;
export type JoinConvoApiArg = {
	/** Convo id */
	id: number;
};
export type KickUserFromConvoApiResponse =
	/** status 200 User was kicked from convo */ ApiResponseV1;
export type KickUserFromConvoApiArg = {
	/** Convo id */
	id: number;
	/** User id */
	userId: number;
};
export type RetrieveConvoParticipantsApiResponse =
	/** status 200 Return convo participants */ ConvoParticipantModelV1[];
export type RetrieveConvoParticipantsApiArg = {
	/** Convo id */
	id: number;
};
export type SearchConvoPostApiResponse = /** status 200 List of convos */ ConvoSearchResponseV1;
export type SearchConvoPostApiArg = {
	convoSearchRequestV1: ConvoSearchRequestV1;
};
export type RetrieveAllFaqCategoriesAndQuestionsApiResponse =
	/** status 200 Return category and question records */ FaqCategoryQuestionsModelV1[];
export type RetrieveAllFaqCategoriesAndQuestionsApiArg = void;
export type AddFaqCategoryApiResponse = /** status 200 Faq category was added */ ApiResponseV1;
export type AddFaqCategoryApiArg = {
	faqCategoryModelUpdateV1: FaqCategoryModelUpdateV1;
};
export type RetrieveFaqCategoryApiResponse =
	/** status 200 Return category record */ FaqCategoryModelV1;
export type RetrieveFaqCategoryApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Faq category id */
	categoryId: number;
};
export type DeleteFaqCategoryApiResponse = /** status 200 Faq Category was deleted */ ApiResponseV1;
export type DeleteFaqCategoryApiArg = {
	/** id of faq category */
	categoryId: number;
};
export type UpdateFaqCategoryApiResponse = /** status 200 Faq was updated */ ApiResponseV1;
export type UpdateFaqCategoryApiArg = {
	/** id of faq category */
	categoryId: number;
	faqCategoryModelUpdateV1: FaqCategoryModelUpdateV1;
};
export type RetrieveAllFaqCategoryQuestionsApiResponse =
	/** status 200 Return question records */ FaqQuestionModelV1[];
export type RetrieveAllFaqCategoryQuestionsApiArg = {
	/** Faq category id */
	categoryId: number;
};
export type AddFaqQuestionApiResponse = /** status 200 Faq question was added */ ApiResponseV1;
export type AddFaqQuestionApiArg = {
	/** id of category to add question to */
	categoryId: number;
	faqQuestionModelUpdateV1: FaqQuestionModelUpdateV1;
};
export type RetrieveFaqQuestionApiResponse =
	/** status 200 Return question record */ FaqQuestionModelV1;
export type RetrieveFaqQuestionApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Faq category id */
	categoryId: number;
	/** Faq question id */
	questionId: number;
};
export type DeleteFaqQuestionApiResponse = /** status 200 Faq question was deleted */ ApiResponseV1;
export type DeleteFaqQuestionApiArg = {
	/** Faq category id */
	categoryId: number;
	/** Faq question id */
	questionId: number;
};
export type UpdateFaqQuestionApiResponse = /** status 200 Faq was updated */ ApiResponseV1;
export type UpdateFaqQuestionApiArg = {
	/** Faq category id */
	categoryId: number;
	/** Faq question id */
	questionId: number;
	faqQuestionModelUpdateV1: FaqQuestionModelUpdateV1;
};
export type ReorderFaqApiResponse = /** status 200 Faq was reordered */ ApiResponseV1;
export type ReorderFaqApiArg = {
	body: FaqCategoryReorderModelV1[];
};
export type AddForumAdminApiResponse = /** status 200 Forum admin was added */ ApiResponseV1;
export type AddForumAdminApiArg = {
	/** Forum id */
	forumId: number;
	/** User id */
	userId: number;
};
export type RemoveForumAdminApiResponse = /** status 200 Forum admin was removed */ ApiResponseV1;
export type RemoveForumAdminApiArg = {
	/** Forum id */
	forumId: number;
	/** User id */
	userId: number;
};
export type RetrieveForumApiResponse = /** status 200 Return topic record */ ForumForumModelV1;
export type RetrieveForumApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Forum id */
	forumId: number;
};
export type AddTopicApiResponse = /** status 200 Forum topic was added */ ApiResponseV1;
export type AddTopicApiArg = {
	/** Forum id */
	forumId: number;
	forumTopicModelAddV1: ForumTopicModelAddV1;
};
export type ShowLogPostApiResponse =
	/** status 200 Return log records */ ForumAdminHistorySearchResponseV1;
export type ShowLogPostApiArg = {
	forumAdminHistorySearchRequestV1: ForumAdminHistorySearchRequestV1;
};
export type ListCategoriesApiResponse = /** status 200 List of forums */ ForumCategoryModelListV1[];
export type ListCategoriesApiArg = void;
export type ListPopularForumsApiResponse = /** status 200 List of forums */ ForumForumModelListV1[];
export type ListPopularForumsApiArg = void;
export type ListPostsByMeApiResponse =
	/** status 200 Return post id list */ ForumPostByUserResponseV1;
export type ListPostsByMeApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
};
export type ListPostsApiResponse = /** status 200 Return post records */ ForumPostListResponseV1;
export type ListPostsApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	perPageSearchRequestV1: PerPageSearchRequestV1;
};
export type ListTopicsApiResponse = /** status 200 Return topic records */ ForumTopicListResponseV1;
export type ListTopicsApiArg = {
	/** Forum id */
	forumId: number;
	/** Also return the first post of each topic */
	withFirstPost?: boolean;
	forumTopicListRequestV1: ForumTopicListRequestV1;
};
export type ListGlobalTopicsApiResponse =
	/** status 200 Return topic records */ ForumTopicListResponseV1;
export type ListGlobalTopicsApiArg = void;
export type LookupSeriesApiResponse =
	/** status 200 Series lookup response */ ForumLookupResponseV1;
export type LookupSeriesApiArg = {
	/** Series id */
	seriesId: number;
};
export type LookupTopicApiResponse = /** status 200 Topic lookup response */ ForumLookupResponseV1;
export type LookupTopicApiArg = {
	/** Topic id */
	topicId: number;
};
export type LookupPostApiResponse = /** status 200 Post lookup response */ ForumLookupResponseV1;
export type LookupPostApiArg = {
	/** Post id */
	postId: number;
};
export type RetrieveTemporaryPollImagesApiResponse =
	/** status 200 Return image records */ ForumPollTempImageModelV1[];
export type RetrieveTemporaryPollImagesApiArg = void;
export type AddTemporaryPollImageApiResponse = /** status 200 Image was added */ ApiResponseV1;
export type AddTemporaryPollImageApiArg = {
	body: {
		image?: Blob;
		caption?: string;
	};
};
export type UpdateTopicPollApiResponse = /** status 200 Topic poll was updated */ ApiResponseV1;
export type UpdateTopicPollApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	forumPollModelUpdateV1: ForumPollModelUpdateV1;
};
export type AddPollVoteApiResponse = /** status 200 Poll vote was added */ ApiResponseV1;
export type AddPollVoteApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	/** Choice id */
	choiceId: number;
};
export type RetrieveVoteApiResponse =
	/** status 200 Return poll vote record */ ForumPollVoteModelV1;
export type RetrieveVoteApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
};
export type RetrieveTopicApiResponse = /** status 200 Return topic record */ ForumTopicModelV1;
export type RetrieveTopicApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
};
export type AddPostApiResponse = /** status 200 Forum post was added */ ApiResponseV1;
export type AddPostApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	forumPostModelUpdateV1: ForumPostModelUpdateV1;
};
export type DeleteTopicApiResponse =
	/** status 200 Topic delete transaction submitted */ ApiResponseV1;
export type DeleteTopicApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
};
export type UpdateTopicApiResponse = /** status 200 Forum topic was updated */ ApiResponseV1;
export type UpdateTopicApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	forumTopicModelUpdateV1: ForumTopicModelUpdateV1;
};
export type RetrievePostApiResponse = /** status 200 Return post record */ ForumPostModelV1;
export type RetrievePostApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	/** Post id */
	postId: number;
};
export type DeletePostApiResponse =
	/** status 200 Post delete transaction submitted */ ApiResponseV1;
export type DeletePostApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	/** Post id */
	postId: number;
};
export type UpdatePostApiResponse = /** status 200 Forum post was updated */ ApiResponseV1;
export type UpdatePostApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	/** Post id */
	postId: number;
	forumPostModelUpdateV1: ForumPostModelUpdateV1;
};
export type ReportPostApiResponse = /** status 200 Forum post was reported */ ApiResponseV1;
export type ReportPostApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	/** Post id */
	postId: number;
	forumPostReportModelUpdateV1: ForumPostReportModelUpdateV1;
};
export type DeletePostReportApiResponse = /** status 200 Post report was deleted */ ApiResponseV1;
export type DeletePostReportApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	/** Post id */
	postId: number;
};
export type ListReportedPostsApiResponse =
	/** status 200 Return Reported Posts */ ForumPostReportModelV1[];
export type ListReportedPostsApiArg = void;
export type RetrievePostLocationApiResponse = /** status 200 Return post record */ ApiResponseV1;
export type RetrievePostLocationApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	/** Post id */
	postId: number;
};
export type SearchForumPostApiResponse =
	/** status 200 Return search results */ ForumSearchResponseV1;
export type SearchForumPostApiArg = {
	forumSearchRequestV1: ForumSearchRequestV1;
};
export type SearchSpecificForumPostApiResponse =
	/** status 200 Return search results */ ForumSearchResponseV1;
export type SearchSpecificForumPostApiArg = {
	/** Forum id */
	forumId: number;
	forumSearchRequestV1: ForumSearchRequestV1;
};
export type SearchSpecificTopicPostApiResponse =
	/** status 200 Return search results */ ForumSearchResponseV1;
export type SearchSpecificTopicPostApiArg = {
	/** Forum id */
	forumId: number;
	/** Topic id */
	topicId: number;
	forumSearchRequestV1: ForumSearchRequestV1;
};
export type ListWarnHistoryForUserApiResponse = /** status 200 Warn history */ ForumWarnModelV1[];
export type ListWarnHistoryForUserApiArg = {
	/** User id */
	userId: number;
};
export type GetCurrentWarnForUserApiResponse = /** status 200 Warn status */ ForumWarnModelV1;
export type GetCurrentWarnForUserApiArg = {
	/** User id */
	userId: number;
};
export type UpdateUserWarnLevelApiResponse = /** status 200 User warn was updated */ ApiResponseV1;
export type UpdateUserWarnLevelApiArg = {
	/** User id */
	userId: number;
	forumWarnModelUpdateV1: ForumWarnModelUpdateV1;
};
export type RetrieveGenresApiResponse = /** status 200 Return genres */ GenreModelStatsV1[];
export type RetrieveGenresApiArg = void;
export type AddGenreApiResponse = /** status 200 Genre add transaction submitted */ ApiResponseV1;
export type AddGenreApiArg = {
	genreModelUpdateV1: GenreModelUpdateV1;
};
export type RetrieveGenreByIdApiResponse = /** status 200 Return genre */ GenreModelStatsV1;
export type RetrieveGenreByIdApiArg = {
	/** Genre id */
	id: number;
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
};
export type DeleteGenreApiResponse = /** status 200 Genre was deleted */ ApiResponseV1;
export type DeleteGenreApiArg = {
	/** id of genre */
	id: number;
};
export type UpdateGenreApiResponse = /** status 200 Genre was updated */ ApiResponseV1;
export type UpdateGenreApiArg = {
	/** id of genre */
	id: number;
	genreModelUpdateV1: GenreModelUpdateV1;
};
export type AddGroupApiResponse = /** status 200 Group was added */ ApiResponseV1;
export type AddGroupApiArg = {
	groupsModelUpdateV1: GroupsModelUpdateV1;
};
export type RetrieveGroupApiResponse = /** status 200 Return group record */ GroupsModelV1;
export type RetrieveGroupApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Group id */
	id: number;
};
export type DeleteGroupApiResponse =
	/** status 200 Group delete transaction submitted */ ApiResponseV1;
export type DeleteGroupApiArg = {
	/** id of group */
	id: number;
};
export type UpdateGroupApiResponse = /** status 200 Group was updated */ ApiResponseV1;
export type UpdateGroupApiArg = {
	/** id of group */
	id: number;
	groupsModelUpdateV1: GroupsModelUpdateV1;
};
export type RejectGroupApiResponse =
	/** status 200 Group reject transaction submitted */ ApiResponseV1;
export type RejectGroupApiArg = {
	/** id of group */
	id: number;
};
export type SearchGroupsPostApiResponse = /** status 200 List of groups */ GroupsSearchResponseV1;
export type SearchGroupsPostApiArg = {
	groupsSearchRequestV1: GroupsSearchRequestV1;
};
export type RetrieveGroupSeriesApiResponse =
	/** status 200 Return series list */ GroupsSeriesListResponseV1;
export type RetrieveGroupSeriesApiArg = {
	/** Group id */
	id: number;
};
export type RetrieveListsApiResponse = /** status 200 Return list records */ ListsModelV1[];
export type RetrieveListsApiArg = void;
export type AddCustomListApiResponse = /** status 200 List was added */ ApiResponseV1;
export type AddCustomListApiArg = {
	listsModelUpdateV1: ListsModelUpdateV1;
};
export type RetrieveListByIdApiResponse = /** status 200 Return list record */ ListsModelV1;
export type RetrieveListByIdApiArg = {
	/** List id */
	id: number;
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
};
export type DeleteCustomListApiResponse = /** status 200 Custom list was removed */ ApiResponseV1;
export type DeleteCustomListApiArg = {
	/** id of list */
	id: number;
};
export type UpdateListApiResponse = /** status 200 User list was updated */ ApiResponseV1;
export type UpdateListApiArg = {
	/** id of list */
	id: number;
	listsModelUpdateV1: ListsModelUpdateV1;
};
export type RetrievePublicListsApiResponse = /** status 200 Return list records */ ListsModelV1[];
export type RetrievePublicListsApiArg = {
	/** User id */
	userId: number;
};
export type RetrievePublicListStatsApiResponse =
	/** status 200 Return public list stats records */ ListsPublicStatsModelV1;
export type RetrievePublicListStatsApiArg = {
	/** User id */
	userId: number;
};
export type SearchPublicListsPostApiResponse =
	/** status 200 Return list records */ ListsPublicSearchResponseV1;
export type SearchPublicListsPostApiArg = {
	/** User id */
	userId: number;
	/** list id to search */
	id: number;
	listsSearchRequestV1: ListsSearchRequestV1;
};
export type SearchListsPostApiResponse =
	/** status 200 Return list records */ ListsSearchResponseV1;
export type SearchListsPostApiArg = {
	/** list id to search */
	id: number;
	listsSearchRequestV1: ListsSearchRequestV1;
};
export type AddListSeriesApiResponse = unknown;
export type AddListSeriesApiArg = {
	body: ListsSeriesModelUpdateV1[];
};
export type AddListSeriesBulkApiResponse =
	/** status 200 Series were (partially) added */ ApiResponseV1;
export type AddListSeriesBulkApiArg = {
	/** id of list */
	id: number;
	body: ListsBulkAddModelV1[];
};
export type DeleteListSeriesApiResponse = /** status 200 Series were removed */ ApiResponseV1;
export type DeleteListSeriesApiArg = {
	body: number[];
};
export type RetrieveListSeriesApiResponse =
	/** status 200 Return list series record */ ListsSeriesModelV1;
export type RetrieveListSeriesApiArg = {
	/** Series id */
	seriesId: number;
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
};
export type UpdateListSeriesApiResponse =
	/** status 200 Series list items were updated */ ApiResponseV1;
export type UpdateListSeriesApiArg = {
	body: ListsSeriesModelUpdateV1[];
};
export type RetrieveSimilarUsersBySeriesApiResponse =
	/** status 200 Return similar user records */ ListsSimilarUsersResponseV1;
export type RetrieveSimilarUsersBySeriesApiArg = {
	/** name of list */
	listName: 'read' | 'wish' | 'complete' | 'unfinished' | 'hold';
	/** Series id */
	seriesId: number;
};
export type TimeApiResponse = /** status 200 Current Time */ TimeV1;
export type TimeApiArg = void;
export type ListOnlineUsersApiResponse =
	/** status 200 Return online users */ MiscOnlineUsersModelV1;
export type ListOnlineUsersApiArg = void;
export type RetrieveSlowTransactionStatusApiResponse =
	/** status 200 Return transaction status */ MiscSlowTransactionStatusResponseV1;
export type RetrieveSlowTransactionStatusApiArg = {
	/** the transaction id */
	transactionId: string;
};
export type SiteStatsApiResponse = /** status 200 Return site stats */ MiscStatsModelV1;
export type SiteStatsApiArg = void;
export type RetrievePollApiResponse = /** status 200 Return poll record */ PollModelV1;
export type RetrievePollApiArg = void;
export type AddPollApiResponse = /** status 200 Poll was successfully added */ ApiResponseV1;
export type AddPollApiArg = {
	pollModelUpdateV1: PollModelUpdateV1;
};
export type ArchivePollApiResponse = /** status 200 Poll was successfully archived */ ApiResponseV1;
export type ArchivePollApiArg = void;
export type RetrieveOldPollsApiResponse = /** status 200 Return poll records */ ApiResponseV1;
export type RetrieveOldPollsApiArg = void;
export type VotePollNoAnswerApiResponse =
	/** status 200 Vote was successfully added */ ApiResponseV1;
export type VotePollNoAnswerApiArg = void;
export type VotePollAnswerApiResponse = /** status 200 Vote was successfully added */ ApiResponseV1;
export type VotePollAnswerApiArg = {
	/** id of answer to vote for */
	answerId: number;
};
export type RetrieveVoteStatusApiResponse =
	/** status 200 Return poll voter status record */ PollVoteStatusModelV1;
export type RetrieveVoteStatusApiArg = void;
export type AddPublisherApiResponse = /** status 200 Publisher was added */ ApiResponseV1;
export type AddPublisherApiArg = {
	publishersModelUpdateV1: PublishersModelUpdateV1;
};
export type RetrievePublisherApiResponse =
	/** status 200 Return publisher record */ PublishersModelV1;
export type RetrievePublisherApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Publisher id */
	id: number;
};
export type DeletePublisherApiResponse =
	/** status 200 Publisher delete transaction submitted */ ApiResponseV1;
export type DeletePublisherApiArg = {
	/** id of publisher */
	id: number;
};
export type UpdatePublisherApiResponse = /** status 200 Publisher was updated */ ApiResponseV1;
export type UpdatePublisherApiArg = {
	/** id of publisher */
	id: number;
	publishersModelUpdateV1: PublishersModelUpdateV1;
};
export type SearchPublishersPostApiResponse =
	/** status 200 Return publisher records */ PublishersSearchResponseV1;
export type SearchPublishersPostApiArg = {
	publishersSearchRequestV1: PublishersSearchRequestV1;
};
export type RetrievePublisherSeriesApiResponse =
	/** status 200 Return series list */ PublishersSeriesListResponseV1;
export type RetrievePublisherSeriesApiArg = {
	/** Publisher id */
	id: number;
};
export type RetrievePublicationSeriesApiResponse =
	/** status 200 Return series list */ PublishersPublicationResponseV1;
export type RetrievePublicationSeriesApiArg = {
	/** Publication name */
	pubname: string;
};
export type AddReleaseApiResponse = /** status 200 Release was added */ ApiResponseV1;
export type AddReleaseApiArg = {
	body: ReleaseModelUpdateV1[];
};
export type RetrieveReleaseApiResponse = /** status 200 Return release record */ ReleaseModelV1;
export type RetrieveReleaseApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Release id */
	id: number;
};
export type DeleteReleaseApiResponse = /** status 200 Release was deleted */ ApiResponseV1;
export type DeleteReleaseApiArg = {
	/** id of release */
	id: number;
};
export type UpdateReleaseApiResponse = /** status 200 Release was updated */ ApiResponseV1;
export type UpdateReleaseApiArg = {
	/** id of release */
	id: number;
	releaseModelUpdateV1: ReleaseModelUpdateV1;
};
export type ModerateReleasesPostApiResponse =
	/** status 200 Return release records */ ReleaseModerateResponseV1;
export type ModerateReleasesPostApiArg = {
	releaseModerateRequestV1: ReleaseModerateRequestV1;
};
export type ListReleasesByDayApiResponse =
	/** status 200 Return release records */ ReleaseSearchResponseV1;
export type ListReleasesByDayApiArg = {
	/** Start page */
	page?: number;
	/** Include series metadata (if available) */
	includeMetadata?: boolean;
};
export type ReleaseRssFeedApiResponse = unknown;
export type ReleaseRssFeedApiArg = void;
export type SearchReleasesPostApiResponse =
	/** status 200 Return release records */ ReleaseSearchResponseV1;
export type SearchReleasesPostApiArg = {
	releaseSearchRequestV1: ReleaseSearchRequestV1;
};
export type AddReviewApiResponse = /** status 200 Review was added */ ApiResponseV1;
export type AddReviewApiArg = {
	reviewModelUpdateV1: ReviewModelUpdateV1;
};
export type AddReviewCommentApiResponse = /** status 200 Review comment was added */ ApiResponseV1;
export type AddReviewCommentApiArg = {
	/** Review id */
	id: number;
	reviewCommentModelUpdateV1: ReviewCommentModelUpdateV1;
};
export type RetrieveReviewCommentApiResponse =
	/** status 200 Return review comment record */ ReviewCommentModelV1;
export type RetrieveReviewCommentApiArg = {
	/** Review id */
	id: number;
	/** Review comment id */
	commentId: number;
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
};
export type DeleteReviewCommentApiResponse =
	/** status 200 Review comment was deleted */ ApiResponseV1;
export type DeleteReviewCommentApiArg = {
	/** id of review */
	id: number;
	/** id of review comment */
	commentId: number;
};
export type UpdateReviewCommentApiResponse =
	/** status 200 Review comment was updated */ ApiResponseV1;
export type UpdateReviewCommentApiArg = {
	/** id of review */
	id: number;
	/** id of review comment */
	commentId: number;
	reviewCommentModelUpdateV1: ReviewCommentModelUpdateV1;
};
export type ReviewCommentsModerationPostApiResponse =
	/** status 200 Return reviews comment moderation records */ ReviewCommentSearchResponseV1;
export type ReviewCommentsModerationPostApiArg = {
	reviewCommentSearchRequestV1: ReviewCommentSearchRequestV1;
};
export type SearchReviewCommentsPostApiResponse =
	/** status 200 Return review comment records */ ReviewCommentSearchResponseV1;
export type SearchReviewCommentsPostApiArg = {
	/** Review id */
	id: number;
	reviewCommentSearchRequestV1: ReviewCommentSearchRequestV1;
};
export type RetrieveReviewApiResponse = /** status 200 Return review record */ ReviewModelV1;
export type RetrieveReviewApiArg = {
	/** Review id */
	id: number;
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
};
export type DeleteReviewApiResponse = /** status 200 Review was deleted */ ApiResponseV1;
export type DeleteReviewApiArg = {
	/** id of review */
	id: number;
};
export type UpdateReviewApiResponse = /** status 200 Review was updated */ ApiResponseV1;
export type UpdateReviewApiArg = {
	/** id of review */
	id: number;
	reviewModelUpdateV1: ReviewModelUpdateV1;
};
export type SearchReviewsPostApiResponse =
	/** status 200 Return review records */ ReviewSearchResponseV1;
export type SearchReviewsPostApiArg = {
	reviewSearchRequestV1: ReviewSearchRequestV1;
};
export type AddSeriesApiResponse = /** status 200 Series was added */ ApiResponseV1;
export type AddSeriesApiArg = {
	seriesModelUpdateV1: SeriesModelUpdateV1;
};
export type CombineSeriesCategoriesApiResponse =
	/** status 200 Series categories were combined */ ApiResponseV1;
export type CombineSeriesCategoriesApiArg = {
	/** id of series */
	id: number;
	seriesCategoryUpdateModelV1: SeriesCategoryUpdateModelV1;
};
export type DeleteSeriesCategoryApiResponse =
	/** status 200 Series category was removed */ ApiResponseV1;
export type DeleteSeriesCategoryApiArg = {
	/** id of series */
	id: number;
	categoriesModelUpdateV1: CategoriesModelUpdateV1;
};
export type RenameSeriesCategoryApiResponse =
	/** status 200 Series category was renamed */ ApiResponseV1;
export type RenameSeriesCategoryApiArg = {
	/** id of series */
	id: number;
	seriesCategoryUpdateModelV1: SeriesCategoryUpdateModelV1;
};
export type RetrieveSeriesCategoryVotesApiResponse =
	/** status 200 Return vote records */ SeriesCategoryVoteModelV1[];
export type RetrieveSeriesCategoryVotesApiArg = {
	/** Series id */
	id: number;
};
export type AddSeriesCategoryVoteApiResponse =
	/** status 200 Series category vote was added */ ApiResponseV1;
export type AddSeriesCategoryVoteApiArg = {
	/** id of series */
	id: number;
	seriesCategoryVoteModelV1: SeriesCategoryVoteModelV1;
};
export type RemoveSeriesCategoryVoteApiResponse =
	/** status 200 Series category vote was removed */ ApiResponseV1;
export type RemoveSeriesCategoryVoteApiArg = {
	/** id of series */
	id: number;
	seriesCategoryVoteDeleteModelV1: SeriesCategoryVoteDeleteModelV1;
};
export type AddSeriesCommentApiResponse = /** status 200 Series comment was added */ ApiResponseV1;
export type AddSeriesCommentApiArg = {
	/** id of series */
	id: number;
	seriesCommentModelUpdateV1: SeriesCommentModelUpdateV1;
};
export type RetrieveSeriesCommentApiResponse =
	/** status 200 Return series comment record */ SeriesCommentModelV1;
export type RetrieveSeriesCommentApiArg = {
	/** Series id */
	id: number;
	/** Series comment id */
	commentId: number;
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
};
export type DeleteSeriesCommentApiResponse =
	/** status 200 Series comment was updated */ ApiResponseV1;
export type DeleteSeriesCommentApiArg = {
	/** id of series */
	id: number;
	/** id of series comment */
	commentId: number;
};
export type UpdateSeriesCommentApiResponse =
	/** status 200 Series comment was updated */ ApiResponseV1;
export type UpdateSeriesCommentApiArg = {
	/** id of series */
	id: number;
	/** id of series comment */
	commentId: number;
	seriesCommentModelUpdateV1: SeriesCommentModelUpdateV1;
};
export type SeriesCommentsModerationPostApiResponse =
	/** status 200 Return series comment moderation records */ SeriesCommentModerationResponseV1;
export type SeriesCommentsModerationPostApiArg = {
	seriesCommentSearchRequestV1: SeriesCommentSearchRequestV1;
};
export type ReportSeriesCommentApiResponse =
	/** status 200 Series comment was reported */ ApiResponseV1;
export type ReportSeriesCommentApiArg = {
	/** id of series */
	id: number;
	/** id of series comment */
	commentId: number;
	seriesCommentReportModelV1: SeriesCommentReportModelV1;
};
export type RetrieveMySeriesCommentApiResponse =
	/** status 200 Return series comment record */ SeriesCommentModelV1;
export type RetrieveMySeriesCommentApiArg = {
	/** Series id */
	id: number;
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
};
export type RetrieveSeriesCommentLocationApiResponse =
	/** status 200 Return series comment location */ ApiResponseV1;
export type RetrieveSeriesCommentLocationApiArg = {
	/** Series id */
	id: number;
	/** Series comment id */
	commentId: number;
};
export type SearchSeriesCommentsPostApiResponse =
	/** status 200 Return series comment records */ SeriesCommentSearchResponseV1;
export type SearchSeriesCommentsPostApiArg = {
	/** Series id */
	id: number;
	seriesCommentSearchRequestV1: SeriesCommentSearchRequestV1;
};
export type AddSeriesCommentUsefulFlagApiResponse =
	/** status 200 Series comment useful was added */ ApiResponseV1;
export type AddSeriesCommentUsefulFlagApiArg = {
	/** id of series */
	id: number;
	/** id of series comment */
	commentId: number;
	seriesCommentUsefulModelV1: SeriesCommentUsefulModelV1;
};
export type RemoveSeriesCommentUsefulFlagApiResponse =
	/** status 200 Series comment useful was deleted */ ApiResponseV1;
export type RemoveSeriesCommentUsefulFlagApiArg = {
	/** id of series */
	id: number;
	/** id of series comment */
	commentId: number;
};
export type RetrieveSeriesApiResponse = /** status 200 Return series record */ SeriesModelV1;
export type RetrieveSeriesApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Series id */
	id: number;
};
export type DeleteSeriesApiResponse = /** status 200 Series was deleted */ ApiResponseV1;
export type DeleteSeriesApiArg = {
	/** id of series */
	id: number;
};
export type UpdateSeriesApiResponse = /** status 200 Series was updated */ ApiResponseV1;
export type UpdateSeriesApiArg = {
	/** id of series */
	id: number;
	seriesModelUpdateV1: SeriesModelUpdateV1;
};
export type RetrieveSeriesGroupsApiResponse =
	/** status 200 Return series list */ SeriesGroupListResponseV1;
export type RetrieveSeriesGroupsApiArg = {
	/** Series id */
	id: number;
};
export type SearchSeriesHistoryPostApiResponse =
	/** status 200 Return series records */ SeriesHistorySearchResponseV1;
export type SearchSeriesHistoryPostApiArg = {
	/** Series id */
	id: number;
	perPageSearchRequestV1: PerPageSearchRequestV1;
};
export type RetrieveSeriesLocksApiResponse =
	/** status 200 Return series lock records */ SeriesLockModelV1[];
export type RetrieveSeriesLocksApiArg = {
	/** Series id */
	id: number;
};
export type LockSeriesFieldApiResponse = /** status 200 Field was locked */ ApiResponseV1;
export type LockSeriesFieldApiArg = {
	/** id of series */
	id: number;
	/** field name */
	item: string;
	seriesLockModelUpdateV1: SeriesLockModelUpdateV1;
};
export type UnlockSeriesFieldApiResponse = /** status 200 Field was unlocked */ ApiResponseV1;
export type UnlockSeriesFieldApiArg = {
	/** id of series */
	id: number;
	/** field name */
	item: string;
};
export type RetrieveSeriesRankLocationApiResponse =
	/** status 200 Return series rank location */ ApiResponseV1;
export type RetrieveSeriesRankLocationApiArg = {
	/** Series id */
	id: number;
	/** Stat type */
	type: string;
};
export type RetrieveUserSeriesRatingApiResponse =
	/** status 200 Return series rating records */ SeriesRatingModelV1;
export type RetrieveUserSeriesRatingApiArg = {
	/** Series id */
	id: number;
};
export type UpdateUserSeriesRatingApiResponse =
	/** status 200 Series rating was updated */ ApiResponseV1;
export type UpdateUserSeriesRatingApiArg = {
	/** id of series */
	id: number;
	seriesRatingModelV1: SeriesRatingModelV1;
};
export type DeleteUserSeriesRatingApiResponse =
	/** status 200 Series rating was deleted */ ApiResponseV1;
export type DeleteUserSeriesRatingApiArg = {
	/** id of series */
	id: number;
};
export type RetrieveSeriesRatingRainbowApiResponse =
	/** status 200 Return series rating records */ SeriesRatingRainbowModelV1;
export type RetrieveSeriesRatingRainbowApiArg = {
	/** Series id */
	id: number;
};
export type SeriesReleaseRssFeedApiResponse = unknown;
export type SeriesReleaseRssFeedApiArg = {
	/** id of series */
	id: number;
};
export type SearchSeriesPostApiResponse =
	/** status 200 Return series records */ SeriesSearchResponseV1;
export type SearchSeriesPostApiArg = {
	seriesSearchRequestV1: SeriesSearchRequestV1;
};
export type UpdateSeriesImageApiResponse = /** status 200 Image was updated */ ApiResponseV1;
export type UpdateSeriesImageApiArg = {
	/** id of series */
	id: number;
	body: {
		image?: Blob;
	};
};
export type DeleteSeriesImageApiResponse = /** status 200 Image was deleted */ ApiResponseV1;
export type DeleteSeriesImageApiArg = {
	/** id of series */
	id: number;
};
export type RetrieveUserGroupByIdApiResponse = /** status 200 Return user group */ UserGroupModelV1;
export type RetrieveUserGroupByIdApiArg = {
	/** user group id */
	id: string;
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
};
export type AddOrUpdateUserGroupApiResponse =
	/** status 200 user group was added or updated */ ApiResponseV1;
export type AddOrUpdateUserGroupApiArg = {
	/** user group id */
	id: string;
	userGroupModelUpdateV1: UserGroupModelUpdateV1;
};
export type DeleteUserGroupApiResponse = /** status 200 User group was deleted */ ApiResponseV1;
export type DeleteUserGroupApiArg = {
	/** id of user group */
	id: string;
};
export type RetrieveUserGroupsApiResponse = /** status 200 Return User Groups */ UserGroupModelV1[];
export type RetrieveUserGroupsApiArg = void;
export type AddMemberApiResponse = /** status 200 Member was added */ ApiResponseV1;
export type AddMemberApiArg = {
	userModelUpdateV1: UserModelUpdateV1;
};
export type SearchMemberChangeRequestsApiResponse =
	/** status 200 Return member change requests */ UserChangeRequestSearchResponseV1;
export type SearchMemberChangeRequestsApiArg = {
	/** Member id */
	id: number;
	/** Start page */
	page?: number;
	/** Items per page */
	perpage?: number;
	/** order by field */
	orderby?: 'score' | 'time';
	/** Direction of results */
	asc?: 'asc' | 'desc';
};
export type AddMemberChangeRequestApiResponse =
	/** status 200 Change request was added */ ApiResponseV1;
export type AddMemberChangeRequestApiArg = {
	/** Member id */
	id: number;
	userChangeRequestModelUpdateV1: UserChangeRequestModelUpdateV1;
};
export type RetrieveMemberChangeRequestApiResponse =
	/** status 200 Return member change requests */ UserChangeRequestModelV1;
export type RetrieveMemberChangeRequestApiArg = {
	/** Member id */
	id: number;
	/** Change request id */
	requestId: number;
};
export type DeleteMemberChangeRequestApiResponse =
	/** status 200 Change request was deleted */ ApiResponseV1;
export type DeleteMemberChangeRequestApiArg = {
	/** Member id */
	id: number;
	/** Change request id */
	requestId: number;
};
export type UpdateMemberChangeRequestApiResponse =
	/** status 200 Change request was updated */ ApiResponseV1;
export type UpdateMemberChangeRequestApiArg = {
	/** Member id */
	id: number;
	/** Change request id */
	requestId: number;
	userChangeRequestModelUpdateV1: UserChangeRequestModelUpdateV1;
};
export type RetrieveMemberApiResponse = /** status 200 Return user record */ UserModelV1;
export type RetrieveMemberApiArg = {
	/** Output fields in unrendered form for editing */
	unrenderedFields?: boolean;
	/** Member id */
	id: number;
};
export type DeleteMemberApiResponse = /** status 200 Member was deleted */ ApiResponseV1;
export type DeleteMemberApiArg = {
	/** Member id */
	id: number;
};
export type UpdateMemberApiResponse = /** status 200 Member was updated */ ApiResponseV1;
export type UpdateMemberApiArg = {
	/** Member id */
	id: number;
	userModelUpdateV1: UserModelUpdateV1;
};
export type RetrieveMemberGenreFiltersApiResponse =
	/** status 200 Return member filter records */ UserGenreFilterModelV1[];
export type RetrieveMemberGenreFiltersApiArg = {
	/** Member id */
	id: number;
};
export type AddMemberGenreFilterApiResponse = /** status 200 Filter was added */ ApiResponseV1;
export type AddMemberGenreFilterApiArg = {
	/** id of member */
	id: number;
	/** genre id */
	genreId: number;
};
export type RemoveMemberGenreFilterApiResponse = /** status 200 Filter was removed */ ApiResponseV1;
export type RemoveMemberGenreFilterApiArg = {
	/** id of member */
	id: number;
	/** genre id */
	genreId: number;
};
export type RetrieveMemberGenreHighlightsApiResponse =
	/** status 200 Return member highlight records */ UserGenreHighlightModelV1[];
export type RetrieveMemberGenreHighlightsApiArg = {
	/** Member id */
	id: number;
};
export type AddMemberGenreHighlightApiResponse =
	/** status 200 Highlight was added */ ApiResponseV1;
export type AddMemberGenreHighlightApiArg = {
	/** id of member */
	id: number;
	/** genre id */
	genreId: number;
	userGenreHighlightModelUpdateV1: UserGenreHighlightModelUpdateV1;
};
export type RemoveMemberGenreHighlightApiResponse =
	/** status 200 Highlight was removed */ ApiResponseV1;
export type RemoveMemberGenreHighlightApiArg = {
	/** id of member */
	id: number;
	/** genre id */
	genreId: number;
};
export type ResetGenreSettingsApiResponse =
	/** status 200 Filters and highlights were reset */ ApiResponseV1;
export type ResetGenreSettingsApiArg = {
	/** id of member */
	id: number;
};
export type RetrieveMemberGroupFiltersApiResponse =
	/** status 200 Return member filter records */ UserGroupFilterModelV1[];
export type RetrieveMemberGroupFiltersApiArg = {
	/** Member id */
	id: number;
};
export type AddUserGroupFilterApiResponse = /** status 200 Filter was added */ ApiResponseV1;
export type AddUserGroupFilterApiArg = {
	/** id of member */
	id: number;
	/** group id */
	groupId: number;
};
export type RemoveUserGroupFilterApiResponse = /** status 200 Filter was removed */ ApiResponseV1;
export type RemoveUserGroupFilterApiArg = {
	/** id of member */
	id: number;
	/** group id */
	groupId: number;
};
export type RetrieveMemberAvatarsApiResponse = /** status 200 Return user record */ AvatarModelV1[];
export type RetrieveMemberAvatarsApiArg = {
	/** Member id */
	id: number;
};
export type SearchMembersPostApiResponse =
	/** status 200 Return user records */ UserSearchResponseV1;
export type SearchMembersPostApiArg = {
	userSearchRequestV1: UserSearchRequestV1;
};
export type RetrieveMemberTopicSubscriptionsApiResponse =
	/** status 200 Return member topic subscriptions */ UserSubscribedTopicModelV1[];
export type RetrieveMemberTopicSubscriptionsApiArg = {
	/** Member id */
	id: number;
};
export type RetrieveMemberTopicSubscriptionApiResponse =
	/** status 200 Return member topic subscriptions */ UserSubscribedTopicModelV1;
export type RetrieveMemberTopicSubscriptionApiArg = {
	/** Member id */
	id: number;
	/** Topic id */
	topicId: number;
};
export type AddUserTopicSubscriptionApiResponse =
	/** status 200 Topic Subscription was added */ ApiResponseV1;
export type AddUserTopicSubscriptionApiArg = {
	/** id of member */
	id: number;
	/** topic id */
	topicId: number;
};
export type RemoveUserTopicSubscriptionApiResponse =
	/** status 200 Topic subscription was removed */ ApiResponseV1;
export type RemoveUserTopicSubscriptionApiArg = {
	/** id of member */
	id: number;
	/** topic id */
	topicId: number;
};
export type AddMemberAvatarApiResponse = /** status 200 Image was added */ ApiResponseV1;
export type AddMemberAvatarApiArg = {
	/** Member id */
	id: number;
	body: {
		image?: Blob;
		title?: string;
	};
};
export type DeleteMemberAvatarApiResponse = /** status 200 Avatar was deleted */ ApiResponseV1;
export type DeleteMemberAvatarApiArg = {
	/** Member id */
	id: number;
	/** Avatar id */
	avatarId: number;
};
export type ApproveMemberUpgradeApiResponse = /** status 200 Member was upgraded */ ApiResponseV1;
export type ApproveMemberUpgradeApiArg = {
	/** Member id */
	id: number;
};
export type RejectMemberUpgradeApiResponse =
	/** status 200 Member upgrade was rejected */ ApiResponseV1;
export type RejectMemberUpgradeApiArg = {
	/** Member id */
	id: number;
};
export type ApiResponseV1 = {
	status: string;
	reason: string;
	context?: object;
};
export type AboutusCategoryModelUpdateV1 = {
	title?: string;
};
export type AboutusUserModelV1 = {
	entry_id: number;
	position?: number;
	username?: string;
	user_id?: number;
};
export type AboutusCategoryModelV1 = {
	category_id: number;
	position?: number;
	title?: string;
	users?: AboutusUserModelV1[];
};
export type AboutusDescriptionModelV1 = {
	description?: string;
};
export type AboutusUserReorderModelV1 = {
	entry_id: number;
	position?: number;
};
export type AboutusCategoryReorderModelV1 = {
	category_id: number;
	position?: number;
	users?: AboutusUserReorderModelV1[];
};
export type AboutusUserModelUpdateV1 = {
	username?: string;
};
export type UserModelUpdatePasswordV1 = {
	password?: string;
};
export type AccountForgotPassModelV1 = {
	email?: string;
};
export type AccountLoginModelV1 = {
	username?: string;
	password?: string;
};
export type AvatarModelV1 = {
	id?: number;
	url?: string;
	title?: string;
	extension?: string;
	height?: number;
	width?: number;
};
export type TimeV1 = {
	timestamp?: number;
	as_rfc3339?: string;
	as_string?: string;
};
export type BirthdayModelV1 = {
	month?: number;
	day?: number;
	year?: number;
	as_string?: string;
	zodiac?: string;
};
export type UserModelV1 = {
	user_id?: number;
	username?: string;
	url?: string;
	email?: string;
	avatar?: AvatarModelV1;
	time_joined?: TimeV1;
	last_active_time?: TimeV1;
	gender?: 'N/A' | 'Male' | 'Female' | 'Alien' | 'Hermaphrodite';
	birthday?: BirthdayModelV1;
	age?: number;
	timezone?: number;
	signature?: string;
	location?: string;
	forum_title?: string;
	folding_at_home?: boolean;
	profile?: {
		per_page?: number;
		invisible?: boolean;
		hide_birthday?: boolean;
		hide_categories?: boolean;
		filter_types?: (
			| 'Artbook'
			| 'Doujinshi'
			| 'Drama CD'
			| 'Filipino'
			| 'Indonesian'
			| 'Manga'
			| 'Manhwa'
			| 'Manhua'
			| 'Novel'
			| 'OEL'
			| 'Thai'
			| 'Vietnamese'
			| 'Malaysian'
			| 'Nordic'
			| 'French'
			| 'Spanish'
		)[];
		upgrade?: {
			requested?: boolean;
			reason?: string;
		};
		age18_verified?: boolean;
	};
	stats?: {
		forum_posts?: number;
		added_authors?: number;
		added_groups?: number;
		added_publishers?: number;
		added_releases?: number;
		added_series?: number;
		series_edits?: number;
		author_edits?: number;
		publisher_edits?: number;
		added_tags?: number;
		moderation?: {
			releases?: {
				approved?: number;
				rejected?: number;
				deleted?: number;
			};
			series?: {
				approved?: number;
				rejected?: number;
				deleted?: number;
			};
			publishers?: {
				approved?: number;
				rejected?: number;
				deleted?: number;
			};
			groups?: {
				approved?: number;
				rejected?: number;
				deleted?: number;
			};
			authors?: {
				approved?: number;
				rejected?: number;
				deleted?: number;
			};
			last_action?: TimeV1;
		};
	};
	admin?: {
		is_admin?: boolean;
		registration_ip?: string;
		permissions?: {
			p_add_releases?: boolean;
			p_edit_users?: boolean;
			p_edit_groups?: boolean;
			p_edit_poll?: boolean;
			p_edit_series?: boolean;
			p_edit_reviews?: boolean;
			p_edit_news?: boolean;
			p_edit_affiliates?: boolean;
			p_edit_aboutus?: boolean;
			p_view_log?: boolean;
			p_edit_config?: boolean;
			p_view_stats?: boolean;
			p_edit_genre?: boolean;
			p_edit_authors?: boolean;
			p_edit_publishers?: boolean;
			p_edit_partial_users?: boolean;
		};
		last_series_update?: TimeV1;
		approved?: boolean;
		email_approved?: boolean;
		forum_admin?: boolean;
		registration_reason?: string;
		upgrade?: {
			banned?: boolean;
		};
		banned?: boolean;
	};
	user_group?: string;
	user_group_name?: string;
};
export type UserModelRegisterV1 = {
	username?: string;
	email?: string;
	password?: string;
};
export type AuthorsModelUpdateV1 = {
	name?: string;
	associated?: {
		name?: string;
	}[];
	actualname?: string;
	birthday?: BirthdayModelV1;
	birthplace?: string;
	bloodtype?: 'N/A' | 'A' | 'B' | 'AB' | 'O';
	gender?: 'N/A' | 'Male' | 'Female' | 'Other';
	social?: {
		officialsite?: string;
		facebook?: string;
		twitter?: string;
	};
	comments?: string;
	admin?: {
		approved?: boolean;
	};
};
export type ImageModelV1 = {
	url?: {
		original?: string;
		thumb?: string;
	};
	height?: number;
	width?: number;
};
export type AvatarModelSearchV1 = {
	id?: number;
	url?: string;
	height?: number;
	width?: number;
};
export type UserModelSearchV1 = {
	user_id?: number;
	username?: string;
	url?: string;
	avatar?: AvatarModelSearchV1;
	time_joined?: TimeV1;
	signature?: string;
	forum_title?: string;
	folding_at_home?: boolean;
	profile?: {
		upgrade?: {
			requested?: boolean;
			reason?: string;
		};
	};
	stats?: {
		forum_posts?: number;
		added_authors?: number;
		added_groups?: number;
		added_publishers?: number;
		added_releases?: number;
		added_series?: number;
	};
	user_group?: string;
	user_group_name?: string;
};
export type AuthorsModelV1 = {
	id?: number;
	name?: string;
	url?: string;
	associated?: {
		name?: string;
	}[];
	image?: ImageModelV1;
	actualname?: string;
	birthday?: BirthdayModelV1;
	birthplace?: string;
	bloodtype?: 'N/A' | 'A' | 'B' | 'AB' | 'O';
	gender?: 'N/A' | 'Male' | 'Female' | 'Other';
	genres?: string[];
	stats?: {
		total_series?: number;
	};
	social?: {
		officialsite?: string;
		facebook?: string;
		twitter?: string;
	};
	comments?: string;
	last_updated?: TimeV1;
	added_by?: UserModelSearchV1;
	admin?: {
		approved?: boolean;
	};
};
export type AuthorsLockModelV1 = {
	field?: string;
	reason?: string;
	user_id?: number;
	username?: string;
	time_locked?: TimeV1;
};
export type AuthorsLockModelUpdateV1 = {
	reason?: string;
};
export type AuthorsModelSearchV1 = {
	id?: number;
	name?: string;
	url?: string;
	genres?: string[];
	stats?: {
		total_series?: number;
	};
	added_by?: UserModelSearchV1;
};
export type AuthorsSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: AuthorsModelSearchV1;
		hit_name?: string;
		hit_genre?: string[];
	}[];
};
export type AuthorsSearchRequestV1 = {
	search?: string;
	added_by?: number;
	page?: number;
	perpage?: number;
	letter?: string;
	genre?: string[];
	orderby?: 'name' | 'series' | 'score';
	pending?: boolean;
};
export type ListsSeriesModelV1 = {
	series: {
		id: number;
		title?: string;
	};
	list_id?: number;
	list_type?: string;
	list_icon?: string;
	status?: {
		volume?: number;
		chapter?: number;
	};
	priority?: number;
	time_added?: TimeV1;
};
export type AuthorsSeriesListResponseV1 = {
	total_series?: number;
	series_list?: {
		title?: string;
		series_id?: number;
		year?: string;
		last_updated?: TimeV1;
		genres?: string[];
		metadata?: {
			user_list?: ListsSeriesModelV1;
		};
	}[];
	genre_list?: {
		genre?: string;
		count?: number;
	}[];
};
export type AuthorsSeriesListRequestV1 = {
	orderby?: 'title' | 'year';
};
export type CategoriesModelUpdateV1 = {
	category?: string;
};
export type SeriesCategoryUpdateModelV1 = {
	from?: CategoriesModelUpdateV1;
	to?: CategoriesModelUpdateV1;
};
export type CategoriesModelV1 = {
	series_id?: number;
	category?: string;
	votes?: number;
	votes_plus?: number;
	votes_minus?: number;
	added_by?: number;
};
export type CategoriesModelSearchV1 = {
	category?: string;
	usage?: number;
	votes?: number;
	votes_plus?: number;
	votes_minus?: number;
};
export type CategoriesSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: CategoriesModelSearchV1;
	}[];
};
export type CategoriesSearchRequestV1 = {
	search?: string;
	page?: number;
	perpage?: number;
	letter?: string;
	orderby?: 'category' | 'agree' | 'disagree' | 'usage';
};
export type ConvoParticipantModelAddV1 = {
	to?: string;
};
export type ConvoMessageModelUpdateV1 = {
	content?: string;
};
export type ConvoModelAddV1 = {
	topic?: string;
	participants?: ConvoParticipantModelAddV1[];
	message?: ConvoMessageModelUpdateV1;
};
export type ConvoBulkModelV1 = {
	convo_id_list?: number[];
};
export type ConvoModelV1 = {
	convo_id?: number;
	topic?: string;
	author_id?: number;
	author_name?: string;
	time_added?: TimeV1;
	last_edit?: TimeV1;
};
export type ConvoModelUpdateV1 = {
	topic?: string;
};
export type ConvoUserIgnoreModelV1 = {
	user_ignored?: boolean;
};
export type ConvoMessageModelV1 = {
	message_id?: number;
	convo_id?: number;
	author_id?: number;
	author_name?: string;
	is_admin?: boolean;
	content?: string;
	time_added?: TimeV1;
	last_edit?: TimeV1;
};
export type ConvoParticipantModelV1 = {
	user_id?: number;
	username?: string;
	is_admin?: boolean;
	time_added?: TimeV1;
	last_time_seen?: TimeV1;
	joined?: boolean;
};
export type ConvoSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: ConvoModelV1;
		metadata?: {
			message?: ConvoMessageModelV1;
			participant?: ConvoParticipantModelV1;
		};
	}[];
};
export type PerPageSearchRequestV1 = {
	page?: number;
	perpage?: number;
};
export type ConvoMessageSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: ConvoMessageModelV1;
		metadata?: {
			user_ignored?: boolean;
		};
	}[];
};
export type ConvoMessageListRequestV1 = {
	page?: number;
	perpage?: number;
};
export type ConvoMessageSearchRequestV1 = {
	search?: string;
	added_by?: number;
	page?: number;
	perpage?: number;
};
export type ConvoSearchRequestV1 = {
	search?: string;
	page?: number;
	perpage?: number;
};
export type FaqQuestionOnlyModelV1 = {
	question_id: number;
	question?: string;
	position?: number;
};
export type FaqCategoryQuestionsModelV1 = {
	category_id: number;
	title?: string;
	questions?: FaqQuestionOnlyModelV1[];
	position?: number;
};
export type FaqCategoryModelUpdateV1 = {
	title?: string;
};
export type FaqCategoryModelV1 = {
	category_id: number;
	title?: string;
	position?: number;
};
export type FaqQuestionModelV1 = {
	question_id: number;
	question?: string;
	answer?: string;
	position?: number;
};
export type FaqQuestionModelUpdateV1 = {
	question?: string;
	answer?: string;
};
export type FaqQuestionReorderModelV1 = {
	question_id: number;
	position?: number;
};
export type FaqCategoryReorderModelV1 = {
	category_id: number;
	position?: number;
	questions?: FaqQuestionReorderModelV1[];
};
export type ForumAdminModelV1 = {
	user?: UserModelSearchV1;
	user_id?: number;
};
export type SeriesModelSearchV1 = {
	series_id?: number;
	title?: string;
	url?: string;
	description?: string;
	image?: ImageModelV1;
	type?:
		| 'Artbook'
		| 'Doujinshi'
		| 'Drama CD'
		| 'Filipino'
		| 'Indonesian'
		| 'Manga'
		| 'Manhwa'
		| 'Manhua'
		| 'Novel'
		| 'OEL'
		| 'Thai'
		| 'Vietnamese'
		| 'Malaysian'
		| 'Nordic'
		| 'French'
		| 'Spanish';
	year?: string;
	bayesian_rating?: number;
	rating_votes?: number;
	genres?: {
		genre?: string;
	}[];
	latest_chapter?: number;
	rank?: {
		position?: {
			week?: number;
			month?: number;
			three_months?: number;
			six_months?: number;
			year?: number;
		};
		old_position?: {
			week?: number;
			month?: number;
			three_months?: number;
			six_months?: number;
			year?: number;
		};
		lists?: {
			reading?: number;
			wish?: number;
			complete?: number;
			unfinished?: number;
			custom?: number;
		};
	};
	last_updated?: TimeV1;
	admin?: {
		added_by?: UserModelSearchV1;
		approved?: boolean;
	};
};
export type ForumPostModelSearchV1 = {
	post_id?: number;
	body_excerpt?: string;
	topic?: {
		forum_id?: number;
		topic_id?: number;
		topic?: string;
	};
	author?: UserModelSearchV1;
	time_added?: TimeV1;
};
export type ForumTopicModelSearchV1 = {
	topic_id?: number;
	topic?: string;
	url?: string;
	last_post?: ForumPostModelSearchV1;
	stats?: {
		posts?: number;
		views?: number;
	};
	forum?: {
		forum_id?: number;
		forum_name?: string;
	};
	is_poll?: boolean;
	admin?: {
		pinned?: boolean;
		locked?: boolean;
		global?: boolean;
	};
	topic_starter?: UserModelSearchV1;
	time_added?: TimeV1;
};
export type ForumForumModelV1 = {
	forum_id?: number;
	name?: string;
	url?: string;
	description?: string;
	position?: number;
	category?: {
		category_id?: number;
		category_name?: string;
	};
	moderators?: ForumAdminModelV1[];
	series?: SeriesModelSearchV1;
	stats?: {
		topics?: number;
		posts?: number;
	};
	last_topic?: ForumTopicModelSearchV1;
	admin?: {
		locked?: boolean;
		hidden?: boolean;
		verify_age?: boolean;
	};
};
export type ForumTopicModelUpdateV1 = {
	topic?: string;
	forum?: {
		forum_id?: number;
	};
	admin?: {
		pinned?: boolean;
		locked?: boolean;
		global?: boolean;
	};
};
export type ForumPostModelUpdateV1 = {
	body?: string;
	reply_to?: number;
};
export type ForumPollAnswerModelUpdateV1 = {
	answer_id: number;
	answer: string;
	temp_image_id?: number;
};
export type ForumPollModelUpdateV1 = {
	question?: string;
	answers?: ForumPollAnswerModelUpdateV1[];
};
export type ForumTopicModelAddV1 = {
	topic?: ForumTopicModelUpdateV1;
	post?: ForumPostModelUpdateV1;
	poll?: ForumPollModelUpdateV1;
};
export type ForumAdminHistoryModelV1 = {
	user?: UserModelSearchV1;
	action_time?: TimeV1;
	action?: string;
};
export type ForumAdminHistorySearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: ForumAdminHistoryModelV1;
	}[];
};
export type ForumAdminHistorySearchRequestV1 = {
	page?: number;
	perpage?: number;
	uid?: number;
};
export type ForumForumModelListV1 = {
	forum_id?: number;
	name?: string;
	url?: string;
	description?: string;
	position?: number;
	moderators?: ForumAdminModelV1[];
	series?: SeriesModelSearchV1;
	stats?: {
		topics?: number;
		posts?: number;
	};
	last_topic?: ForumTopicModelSearchV1;
	admin?: {
		locked?: boolean;
		hidden?: boolean;
		verify_age?: boolean;
	};
};
export type ForumCategoryModelListV1 = {
	category_id?: number;
	name?: string;
	forums?: {
		forum?: ForumForumModelListV1;
	}[];
};
export type ForumPostByUserResponseV1 = {
	topic_id?: number;
	post_id_list?: number[];
};
export type ForumPostModelV1 = {
	post_id?: number;
	body?: string;
	topic?: {
		forum_id?: number;
		topic_id?: number;
		topic?: string;
	};
	author?: UserModelSearchV1;
	reply_to?: {
		post_id?: number;
		post_author?: {
			author_id?: number;
			author_name?: string;
		};
	};
	last_edit?: {
		by?: string;
		time?: TimeV1;
	};
	time_added?: TimeV1;
};
export type ForumWarnModelPublicV1 = {
	time_added?: TimeV1;
	level: number;
};
export type ForumPostListResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: ForumPostModelV1;
		metadata?: {
			user_warn?: ForumWarnModelPublicV1;
			reported?: boolean;
			is_moderator?: boolean;
			is_forum_admin?: boolean;
		};
	}[];
};
export type ForumTopicListResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: ForumTopicModelSearchV1;
		metadata?: {
			first_post?: ForumPostModelV1;
		};
	}[];
};
export type ForumTopicListRequestV1 = {
	page?: number;
	perpage?: number;
	orderby?: 'last_post_date' | 'topic_start_date';
};
export type ForumLookupResponseV1 = {
	topic_id?: number;
	forum_id?: number;
};
export type ForumPollTempImageModelV1 = {
	image_id?: number;
	caption?: string;
	url?: {
		original?: string;
		thumb?: string;
	};
	height?: number;
	width?: number;
	time_added?: TimeV1;
};
export type ForumPollVoteModelV1 = {
	choice_id?: number;
};
export type ForumPollAnswerModelV1 = {
	answer_id: number;
	answer: string;
	votes?: number;
	image?: {
		height?: number;
		width?: number;
		filename?: string;
	};
};
export type ForumPollModelV1 = {
	question?: string;
	answers?: ForumPollAnswerModelV1[];
	votes?: number;
	admin?: {
		image_poll?: boolean;
	};
};
export type ForumTopicModelV1 = {
	topic_id?: number;
	topic?: string;
	url?: string;
	last_post?: ForumPostModelSearchV1;
	stats?: {
		posts?: number;
		views?: number;
	};
	forum?: {
		forum_id?: number;
		forum_name?: string;
	};
	is_poll?: boolean;
	poll?: ForumPollModelV1;
	admin?: {
		pinned?: boolean;
		locked?: boolean;
		global?: boolean;
	};
	topic_starter?: UserModelSearchV1;
	time_added?: TimeV1;
};
export type ForumPostReportModelUpdateV1 = {
	reason?: string;
};
export type ForumPostReportModelV1 = {
	report_id?: number;
	topic_id?: number;
	topic?: ForumTopicModelSearchV1;
	post_id?: number;
	post?: ForumPostModelSearchV1;
	user_id?: number;
	user?: UserModelSearchV1;
	reason?: string;
};
export type ForumSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	topic_results?: {
		record?: ForumTopicModelSearchV1;
		metadata?: {
			is_subscribed?: boolean;
			my_latest_post_in_topic?: number;
		};
	}[];
	post_results?: {
		record?: ForumPostModelSearchV1;
		metadata?: {
			is_subscribed?: boolean;
			my_latest_post_in_topic?: number;
			forum_info?: {
				forum_id?: number;
				forum_name?: string;
			};
			topic_stats?: {
				posts?: number;
				views?: number;
			};
		};
	}[];
};
export type ForumSearchRequestV1 = {
	search_by?: 'post' | 'topic';
	method?: 'fulltext' | 'exact';
	search?: string;
	since?: number;
	after_id?: number;
	before_id?: number;
	page?: number;
	perpage?: number;
	by_user_id?: number;
	filter_user_id?: number;
};
export type ForumWarnModelV1 = {
	user_id?: number;
	time_added?: TimeV1;
	level: number;
	reason: string;
	send_reason?: boolean;
	by_user?: UserModelSearchV1;
};
export type ForumWarnModelUpdateV1 = {
	level: number;
	reason: string;
	send_reason?: boolean;
};
export type GenreModelStatsV1 = {
	id?: number;
	genre?: string;
	description?: string;
	stats?: {
		series?: number;
		authors?: number;
		filters?: number;
		highlights?: number;
	};
	demographic?: boolean;
};
export type GenreModelUpdateV1 = {
	genre?: string;
	description?: string;
	demographic?: boolean;
};
export type GroupsModelUpdateV1 = {
	name?: string;
	associated?: {
		name?: string;
	}[];
	social?: {
		site?: string;
		facebook?: string;
		twitter?: string;
		irc?: {
			channel?: string;
			server?: string;
		};
		forum?: string;
		discord?: string;
	};
	active?: boolean;
	notes?: string;
	admin?: {
		approved?: boolean;
		hold?: boolean;
	};
};
export type GroupsModelV1 = {
	group_id?: number;
	name?: string;
	url?: string;
	associated?: {
		name?: string;
	}[];
	social?: {
		site?: string;
		facebook?: string;
		twitter?: string;
		irc?: {
			channel?: string;
			server?: string;
		};
		forum?: string;
		discord?: string;
	};
	active?: boolean;
	notes?: string;
	added_by?: UserModelSearchV1;
	admin?: {
		approved?: boolean;
		hold?: boolean;
	};
};
export type GroupsModelSearchV1 = {
	group_id?: number;
	name?: string;
	url?: string;
	social?: {
		site?: string;
		facebook?: string;
		twitter?: string;
		irc?: {
			channel?: string;
			server?: string;
		};
		forum?: string;
		discord?: string;
	};
	active?: boolean;
	notes?: string;
	added_by?: UserModelSearchV1;
};
export type GroupsSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: GroupsModelSearchV1;
		hit_name?: string;
	}[];
};
export type GroupsSearchRequestV1 = {
	search?: string;
	added_by?: number;
	page?: number;
	perpage?: number;
	letter?: string;
	active?: boolean;
	pending?: boolean;
};
export type GroupsSeriesListResponseV1 = {
	release_frequency?: string;
	series_titles?: {
		title?: string;
		series_id?: number;
		last_updated?: TimeV1;
	}[];
	series_genres?: {
		genre?: string;
		count?: number;
	}[];
	series_categories?: {
		category?: string;
		votes?: number;
	}[];
};
export type ListsModelV1 = {
	list_id?: number;
	title?: string;
	description?: string;
	type?: 'read' | 'wish' | 'complete' | 'unfinished' | 'hold';
	icon?: string;
	custom?: boolean;
	options?: {
		public?: boolean;
		sort?: 'title' | 'priority' | 'date' | 'rating' | 'release' | 'unread' | 'userrating';
		show_rating?: boolean;
		show_status?: boolean;
		show_comment?: 'link' | 'text' | 'none';
		show_per_page?: number;
		show_latest_chapter?: boolean;
	};
};
export type ListsModelUpdateV1 = {
	title?: string;
	description?: string;
	type?: 'read' | 'wish' | 'complete' | 'unfinished' | 'hold';
	icon?: string;
	options?: {
		public?: boolean;
		sort?: 'title' | 'priority' | 'date' | 'rating' | 'release' | 'unread' | 'userrating';
		show_rating?: boolean;
		show_status?: boolean;
		show_comment?: 'link' | 'text' | 'none';
		show_per_page?: number;
		show_latest_chapter?: boolean;
	};
};
export type ListsPublicStatsModelV1 = {
	genres?: {
		genre_name?: string;
		count?: number;
	}[];
};
export type ListsPublicSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	list?: ListsModelV1;
	results?: {
		series_id?: number;
		series_title?: string;
		volume?: number;
		chapter?: number;
		metadata?: {
			user_rating?: number;
			user_comment?: {
				comment_id?: number;
				comment_preview?: string;
			};
			user_list?: ListsSeriesModelV1;
		};
	}[];
};
export type ListsSearchRequestV1 = {
	page?: number;
	perpage?: number;
};
export type ListsSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	list?: ListsModelV1;
	results?: {
		record?: ListsSeriesModelV1;
		metadata?: {
			series?: SeriesModelSearchV1;
			user_rating?: number;
		};
	}[];
};
export type ListsSeriesModelUpdateV1 = {
	series: {
		id: number;
		title?: string;
	};
	list_id?: number;
	status?: {
		volume?: number;
		chapter?: number;
		increment_volume?: number;
		increment_chapter?: number;
	};
	priority?: number;
};
export type ListsBulkAddModelV1 = {
	priority?: 'High' | 'Low';
	series_title?: string;
};
export type ListsSimilarUsersResponseV1 = {
	total_hits?: number;
	users?: {
		user_id?: number;
		user_name?: string;
		user_rating?: number;
		intersect_count?: number;
		percent_match?: number;
	}[];
};
export type MiscOnlineUsersModelV1 = {
	users?: {
		record?: UserModelSearchV1;
		metadata?: {
			last_active?: TimeV1;
			invisible?: boolean;
			super_moderator?: boolean;
		};
	}[];
};
export type MiscSlowTransactionStatusResponseV1 = {
	state?: 'pending' | 'in progress' | 'complete' | 'error';
	error?: string;
	percent?: number;
	done?: number;
	total?: number;
	return?: string;
};
export type MiscStatsModelV1 = {
	total_users?: number;
	latest_user?: UserModelSearchV1;
	total_forum_topics?: number;
	total_forum_posts?: number;
};
export type PollModelV1 = {
	active?: boolean;
	question?: string;
	answers?: {
		answer_id?: number;
		answer?: string;
		total?: number;
	}[];
	total_votes?: number;
};
export type PollModelUpdateV1 = {
	question?: string;
	answers?: {
		answer?: string;
	}[];
};
export type PollVoteStatusModelV1 = {
	voted?: boolean;
};
export type PublishersModelUpdateV1 = {
	name?: string;
	associated?: {
		name?: string;
	}[];
	type?:
		| 'N/A'
		| 'Japanese'
		| 'English'
		| 'Korean'
		| 'Taiwanese'
		| 'Chinese'
		| 'Thai'
		| 'Indonesian'
		| 'Filipino'
		| 'Vietnamese'
		| 'Malaysian'
		| 'Nordic'
		| 'French'
		| 'Spanish';
	info?: string;
	site?: string;
	admin?: {
		approved?: boolean;
	};
};
export type PublishersModelV1 = {
	publisher_id?: number;
	name?: string;
	url?: string;
	associated?: {
		name?: string;
	}[];
	type?:
		| 'N/A'
		| 'Japanese'
		| 'English'
		| 'Korean'
		| 'Taiwanese'
		| 'Chinese'
		| 'Thai'
		| 'Indonesian'
		| 'Filipino'
		| 'Vietnamese'
		| 'Malaysian'
		| 'Nordic'
		| 'French'
		| 'Spanish';
	info?: string;
	site?: string;
	stats?: {
		total_series?: number;
		total_publications?: number;
	};
	added_by?: UserModelSearchV1;
	last_updated?: TimeV1;
	admin?: {
		approved?: boolean;
	};
};
export type PublishersModelSearchV1 = {
	publisher_id?: number;
	name?: string;
	url?: string;
	type?:
		| 'N/A'
		| 'Japanese'
		| 'English'
		| 'Korean'
		| 'Taiwanese'
		| 'Chinese'
		| 'Thai'
		| 'Indonesian'
		| 'Filipino'
		| 'Vietnamese'
		| 'Malaysian'
		| 'Nordic'
		| 'French'
		| 'Spanish';
	stats?: {
		total_series?: number;
		total_publications?: number;
	};
	added_by?: UserModelSearchV1;
};
export type PublishersSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: PublishersModelSearchV1;
		hit_name?: string;
	}[];
};
export type PublishersSearchRequestV1 = {
	search?: string;
	added_by?: number;
	page?: number;
	perpage?: number;
	letter?: string;
	orderby?: 'score' | 'name' | 'series' | 'publications' | 'type';
	pending?: boolean;
};
export type PublishersSeriesListResponseV1 = {
	series_list?: {
		title?: string;
		series_id?: number;
		year?: string;
		last_updated?: TimeV1;
	}[];
	publication_list?: {
		publication_name?: string;
		count?: number;
	}[];
};
export type PublishersPublicationResponseV1 = {
	publisher?: {
		publisher_name?: string;
		publisher_id?: number;
	};
	series_list?: {
		title?: string;
		series_id?: number;
		genres?: string[];
		last_updated?: TimeV1;
	}[];
};
export type TimeUpdateV1 = {
	timestamp?: number;
};
export type ReleaseModelUpdateV1 = {
	title?: string;
	volume?: string;
	chapter?: string;
	groups?: {
		name?: string;
	}[];
	release_date?: string;
	download_notes?: string;
	comment?: string;
	time_added?: TimeUpdateV1;
	admin?: {
		approved?: boolean;
		archived?: boolean;
	};
};
export type ReleaseModelV1 = {
	id?: number;
	title?: string;
	volume?: string;
	chapter?: string;
	groups?: {
		name?: string;
		group_id?: number;
	}[];
	release_date?: string;
	download_notes?: string;
	comment?: string;
	time_added?: TimeV1;
	admin?: {
		approved?: boolean;
		archived?: boolean;
		added_by?: UserModelSearchV1;
	};
};
export type ReleaseModerateResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: ReleaseModelV1;
		metadata?: {
			series?: number;
			like_releases?: ReleaseModelV1[];
		};
	}[];
	group_info?: {
		group_id?: number;
		hold?: boolean;
	}[];
};
export type ReleaseModerateRequestV1 = {
	archived?: boolean;
	disable_paging?: boolean;
	page?: number;
	perpage?: number;
};
export type ReleaseModelSearchV1 = {
	id?: number;
	title?: string;
	volume?: string;
	chapter?: string;
	groups?: {
		name?: string;
		group_id?: number;
	}[];
	release_date?: string;
	time_added?: TimeV1;
};
export type ReleaseSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: ReleaseModelSearchV1;
		metadata?: {
			series?: SeriesModelSearchV1;
			user_list?: ListsSeriesModelV1;
			user_genre_highlights?: {
				genre?: string;
				color?: string;
			}[];
			user_genre_filters?: string[];
			user_group_filters?: string[];
			type_filter?: string;
		};
	}[];
};
export type ReleaseSearchRequestV1 = {
	search?: string;
	search_type?: 'series' | 'regular';
	added_by?: number;
	page?: number;
	perpage?: number;
	letter?: string;
	orderby?: 'date' | 'time' | 'title' | 'vol' | 'chap';
	start_date?: string;
	end_date?: string;
	asc?: 'asc' | 'desc';
	group_id?: number;
	pending?: boolean;
	include_metadata?: boolean;
};
export type ReviewModelUpdateV1 = {
	title?: string;
	body?: string;
	series_title?: string;
	review?: {
		plot?: number;
		drawing?: number;
		characters?: number;
		enjoy?: number;
		overall?: number;
	};
	admin?: {
		approved?: boolean;
		moderated?: boolean;
	};
};
export type ReviewCommentModelUpdateV1 = {
	subject?: string;
	content?: string;
	rating?: number;
	admin?: {
		approved?: boolean;
	};
};
export type ReviewCommentModelV1 = {
	id?: number;
	review_id?: number;
	subject?: string;
	content?: string;
	author?: {
		user_id?: number;
		name?: string;
	};
	rating?: number;
	time_added?: TimeV1;
	time_updated?: TimeV1;
};
export type ReviewCommentSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: ReviewCommentModelV1;
	}[];
};
export type ReviewCommentSearchRequestV1 = {
	added_by?: number;
	page?: number;
	perpage?: number;
};
export type ReviewModelV1 = {
	id?: number;
	title?: string;
	body?: string;
	author?: {
		user_id?: number;
		name?: string;
	};
	series?: SeriesModelSearchV1;
	review?: {
		user?: number;
		plot?: number;
		drawing?: number;
		characters?: number;
		enjoy?: number;
		overall?: number;
	};
	time_added?: TimeV1;
};
export type ReviewModelSearchV1 = {
	id?: number;
	title?: string;
	body_excerpt?: string;
	author?: {
		user_id?: number;
		name?: string;
	};
	series?: SeriesModelSearchV1;
	review?: {
		plot?: number;
		drawing?: number;
		characters?: number;
		enjoy?: number;
		overall?: number;
	};
	time_added?: TimeV1;
};
export type ReviewSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: ReviewModelSearchV1;
	}[];
};
export type ReviewSearchRequestV1 = {
	search?: string;
	added_by?: number;
	series_id?: number;
	page?: number;
	perpage?: number;
	letter?: string;
	pending?: boolean;
};
export type SeriesModelUpdateV1 = {
	title?: string;
	associated?: {
		title?: string;
	}[];
	description?: string;
	type?:
		| 'Artbook'
		| 'Doujinshi'
		| 'Drama CD'
		| 'Filipino'
		| 'Indonesian'
		| 'Manga'
		| 'Manhwa'
		| 'Manhua'
		| 'Novel'
		| 'OEL'
		| 'Thai'
		| 'Vietnamese'
		| 'Malaysian'
		| 'Nordic'
		| 'French'
		| 'Spanish';
	year?: string;
	genres?: {
		genre?: string;
	}[];
	categories?: CategoriesModelUpdateV1[];
	status?: string;
	licensed?: boolean;
	completed?: boolean;
	anime?: {
		start?: string;
		end?: string;
	};
	related_series?: {
		relation_type:
			| 'Prequel'
			| 'Sequel'
			| 'Side Story'
			| 'Spin-Off'
			| 'Adapted From'
			| 'Alternate Story'
			| 'Main Story';
		related_series_id: number;
	}[];
	authors?: {
		name?: string;
		type?: 'Author' | 'Artist';
	}[];
	publishers?: {
		publisher_name?: string;
		type?: 'Original' | 'English';
		notes?: string;
	}[];
	publications?: {
		publication_name?: string;
		publisher_name?: string;
	}[];
	admin?: {
		approved?: boolean;
	};
};
export type SeriesCategoryVoteModelV1 = {
	category?: string;
	agree?: boolean;
};
export type SeriesCategoryVoteDeleteModelV1 = {
	category?: string;
};
export type SeriesCommentModelUpdateV1 = {
	subject?: string;
	content?: string;
	admin?: {
		moderated?: boolean;
		reported?: boolean;
	};
};
export type SeriesCommentModelV1 = {
	id?: number;
	series_id?: number;
	subject?: string;
	content?: string;
	author?: {
		user_info?: UserModelSearchV1;
		name?: string;
	};
	useful?: number;
	time_added?: TimeV1;
	time_updated?: TimeV1;
	admin?: {
		moderated?: boolean;
		reported?: boolean;
		report_reason?: string;
	};
};
export type SeriesCommentModerationResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: SeriesCommentModelV1;
		metadata?: {
			series?: SeriesModelSearchV1;
			author_series_rating?: number;
		};
	}[];
};
export type SeriesCommentSearchRequestV1 = {
	method?: 'useful' | 'time_added';
	added_by?: number;
	page?: number;
	perpage?: number;
};
export type SeriesCommentReportModelV1 = {
	report_reason?: string;
};
export type SeriesCommentSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: SeriesCommentModelV1;
		metadata?: {
			author_series_rating?: number;
			current_user_useful_rating?: boolean;
		};
	}[];
};
export type SeriesCommentUsefulModelV1 = {
	useful?: boolean;
};
export type SeriesRecommendationsModelV1 = {
	series_name?: string;
	series_id?: number;
	weight?: number;
};
export type SeriesModelV1 = {
	series_id?: number;
	title?: string;
	url?: string;
	associated?: {
		title?: string;
	}[];
	description?: string;
	image?: ImageModelV1;
	type?:
		| 'Artbook'
		| 'Doujinshi'
		| 'Drama CD'
		| 'Filipino'
		| 'Indonesian'
		| 'Manga'
		| 'Manhwa'
		| 'Manhua'
		| 'Novel'
		| 'OEL'
		| 'Thai'
		| 'Vietnamese'
		| 'Malaysian'
		| 'Nordic'
		| 'French'
		| 'Spanish';
	year?: string;
	bayesian_rating?: number;
	rating_votes?: number;
	genres?: {
		genre?: string;
	}[];
	categories?: CategoriesModelV1[];
	latest_chapter?: number;
	forum_id?: number;
	status?: string;
	licensed?: boolean;
	completed?: boolean;
	anime?: {
		start?: string;
		end?: string;
	};
	related_series?: {
		relation_id?: number;
		relation_type:
			| 'Prequel'
			| 'Sequel'
			| 'Side Story'
			| 'Spin-Off'
			| 'Adapted From'
			| 'Alternate Story'
			| 'Main Story';
		related_series_id: number;
		related_series_name?: string;
		triggered_by_relation_id?: number;
	}[];
	authors?: {
		name?: string;
		author_id?: number;
		type?: 'Author' | 'Artist';
	}[];
	publishers?: {
		publisher_name?: string;
		publisher_id?: number;
		type?: 'Original' | 'English';
		notes?: string;
	}[];
	publications?: {
		publication_name?: string;
		publisher_name?: string;
		publisher_id?: string;
	}[];
	recommendations?: SeriesRecommendationsModelV1[];
	category_recommendations?: SeriesRecommendationsModelV1[];
	rank?: {
		position?: {
			week?: number;
			month?: number;
			three_months?: number;
			six_months?: number;
			year?: number;
		};
		old_position?: {
			week?: number;
			month?: number;
			three_months?: number;
			six_months?: number;
			year?: number;
		};
		lists?: {
			reading?: number;
			wish?: number;
			complete?: number;
			unfinished?: number;
			custom?: number;
		};
	};
	last_updated?: TimeV1;
	admin?: {
		added_by?: UserModelSearchV1;
		approved?: boolean;
	};
};
export type SeriesGroupListResponseV1 = {
	group_list?: GroupsModelSearchV1[];
	release_list?: ReleaseModelSearchV1[];
};
export type SeriesHistoryModelV1 = {
	change_id?: number;
	username?: string;
	action?: string;
	changed?: string;
	time_added?: TimeV1;
};
export type SeriesHistorySearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	series_title?: string;
	results?: {
		record?: SeriesHistoryModelV1;
	}[];
};
export type SeriesLockModelV1 = {
	field?: string;
	reason?: string;
	user_id?: number;
	username?: string;
	time_locked?: TimeV1;
};
export type SeriesLockModelUpdateV1 = {
	reason?: string;
};
export type SeriesRatingModelV1 = {
	rating: number;
	last_updated?: TimeV1;
};
export type SeriesRatingRainbowModelV1 = {
	average_rating?: number;
	rainbow?: {
		rating?: number;
		count?: number;
	}[];
};
export type SeriesSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: SeriesModelSearchV1;
		hit_title?: string;
		metadata?: {
			user_list?: ListsSeriesModelV1;
			user_genre_highlights?: {
				genre?: string;
				color?: string;
			}[];
		};
	}[];
};
export type SeriesSearchRequestV1 = {
	search?: string;
	added_by?: number;
	stype?: 'title' | 'description';
	licensed?: 'yes' | 'no';
	type?: string[];
	year?: string;
	filter_types?: string[];
	category?: string[];
	filter?:
		| 'scanlated'
		| 'completed'
		| 'oneshots'
		| 'no_oneshots'
		| 'some_releases'
		| 'no_releases';
	list?: string;
	page?: number;
	perpage?: number;
	letter?: string;
	genre?: string[];
	exclude_genre?: string[];
	orderby?:
		| 'score'
		| 'title'
		| 'rank'
		| 'rating'
		| 'year'
		| 'date_added'
		| 'week_pos'
		| 'month1_pos'
		| 'month3_pos'
		| 'month6_pos'
		| 'year_pos'
		| 'list_reading'
		| 'list_wish'
		| 'list_complete'
		| 'list_unfinished';
	pending?: boolean;
	include_rank_metadata?: boolean;
	exclude_filtered_genres?: boolean;
};
export type UserGroupModelV1 = {
	id?: string;
	name: string;
	description: string;
};
export type UserGroupModelUpdateV1 = {
	name: string;
	description: string;
};
export type UserModelUpdateV1 = {
	username?: string;
	email?: string;
	password?: string;
	new_avatar_id?: number;
	gender?: 'N/A' | 'Male' | 'Female' | 'Alien' | 'Hermaphrodite';
	birthday?: BirthdayModelV1;
	timezone?: number;
	signature?: string;
	location?: string;
	forum_title?: string;
	folding_at_home?: boolean;
	profile?: {
		per_page?: number;
		invisible?: boolean;
		hide_birthday?: boolean;
		hide_categories?: boolean;
		filter_types?: (
			| 'Artbook'
			| 'Doujinshi'
			| 'Drama CD'
			| 'Filipino'
			| 'Indonesian'
			| 'Manga'
			| 'Manhwa'
			| 'Manhua'
			| 'Novel'
			| 'OEL'
			| 'Thai'
			| 'Vietnamese'
			| 'Malaysian'
			| 'Nordic'
			| 'French'
			| 'Spanish'
		)[];
		upgrade?: {
			requested?: boolean;
			reason?: string;
		};
		age18_verified?: boolean;
	};
	admin?: {
		is_admin?: boolean;
		permissions?: {
			p_add_releases?: boolean;
			p_edit_users?: boolean;
			p_edit_groups?: boolean;
			p_edit_poll?: boolean;
			p_edit_series?: boolean;
			p_edit_reviews?: boolean;
			p_edit_news?: boolean;
			p_edit_affiliates?: boolean;
			p_edit_aboutus?: boolean;
			p_view_log?: boolean;
			p_edit_config?: boolean;
			p_view_stats?: boolean;
			p_edit_genre?: boolean;
			p_edit_authors?: boolean;
			p_edit_publishers?: boolean;
			p_edit_partial_users?: boolean;
		};
		approved?: boolean;
		email_approved?: boolean;
		forum_admin?: boolean;
		banned?: boolean;
	};
	user_group?: string;
};
export type UserChangeRequestModelV1 = {
	id?: number;
	body?: string;
	added_by?: UserModelSearchV1;
	time_added?: TimeV1;
};
export type UserChangeRequestSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: UserChangeRequestModelV1;
	}[];
};
export type UserChangeRequestModelUpdateV1 = {
	body?: string;
	archived?: boolean;
};
export type UserGenreFilterModelV1 = {
	genre_id?: number;
	genre_name?: string;
};
export type UserGenreHighlightModelV1 = {
	genre_id?: number;
	genre_name?: string;
	color?: string;
};
export type UserGenreHighlightModelUpdateV1 = {
	color?: string;
};
export type UserGroupFilterModelV1 = {
	group_id?: number;
	group_name?: string;
};
export type UserSearchResponseV1 = {
	total_hits?: number;
	page?: number;
	per_page?: number;
	results?: {
		record?: UserModelSearchV1;
	}[];
};
export type UserSearchRequestV1 = {
	search?: string;
	page?: number;
	perpage?: number;
	letter?: string;
	orderby?:
		| 'username'
		| 'time_added'
		| 'forum_posts'
		| 'added_authors'
		| 'added_releases'
		| 'added_groups'
		| 'added_publishers'
		| 'added_series';
	asc?: 'asc' | 'desc';
};
export type UserSubscribedTopicModelV1 = {
	topic_id?: number;
	topic?: ForumTopicModelSearchV1;
	time_subscribed_since?: TimeV1;
};
export const {
	useAddAboutusCategoryMutation,
	useRetrieveAboutusCategoryQuery,
	useLazyRetrieveAboutusCategoryQuery,
	useDeleteAboutusCategoryMutation,
	useUpdateAboutusCategoryMutation,
	useRetrieveAboutusCategoriesAndUsersQuery,
	useLazyRetrieveAboutusCategoriesAndUsersQuery,
	useRetrieveAboutusDescriptionQuery,
	useLazyRetrieveAboutusDescriptionQuery,
	useUpdateAboutusDescriptionMutation,
	useReorderAboutusMutation,
	useAddAboutusCategoryUserMutation,
	useDeleteAboutusCategoryUserMutation,
	useCaptchaQuery,
	useLazyCaptchaQuery,
	useConfirmDeleteAccountMutation,
	useDeleteAccountMutation,
	useConfirmAndChangePasswordMutation,
	useForgotPasswordMutation,
	useLoginMutation,
	useLogoutMutation,
	useProfileQuery,
	useLazyProfileQuery,
	useConfirmRegistrationMutation,
	useRegisterMemberMutation,
	useResendAuthEmailMutation,
	useSendForgotEmailMutation,
	useAddAuthorMutation,
	useRetrieveAuthorQuery,
	useLazyRetrieveAuthorQuery,
	useDeleteAuthorMutation,
	useUpdateAuthorMutation,
	useRetrieveAuthorLocksQuery,
	useLazyRetrieveAuthorLocksQuery,
	useLockAuthorFieldMutation,
	useUnlockAuthorFieldMutation,
	useSearchAuthorsPostMutation,
	useRetrieveAuthorSeriesMutation,
	useUpdateImageMutation,
	useDeleteImageMutation,
	useBulkCombineSeriesCategoriesMutation,
	useBulkDeleteSeriesCategoriesMutation,
	useFindCategoryByPrefixMutation,
	useFindCategoryByExactMutation,
	useSearchCategoriesPostMutation,
	useAddConvoMutation,
	useAbandonConvoBulkMutation,
	useDeleteConvoBulkMutation,
	useRetrieveConvoQuery,
	useLazyRetrieveConvoQuery,
	useDeleteConvoMutation,
	useUpdateConvoMutation,
	useIsUserIgnoredQuery,
	useLazyIsUserIgnoredQuery,
	useIgnoreUserMutation,
	useUnIgnoreUserMutation,
	useConvoInboxQuery,
	useLazyConvoInboxQuery,
	useConvoInboxCountQuery,
	useLazyConvoInboxCountQuery,
	useConvoSentMutation,
	useConvoReceivedMutation,
	useAddConvoMessageMutation,
	useListConvoMessagesMutation,
	useRetrieveConvoMessageQuery,
	useLazyRetrieveConvoMessageQuery,
	useUpdateConvoMessageMutation,
	useRetrieveConvoMessageLocationQuery,
	useLazyRetrieveConvoMessageLocationQuery,
	useSearchConvoMessagesPostMutation,
	useAbandonConvoMutation,
	useInviteUserToConvoMutation,
	useJoinConvoMutation,
	useKickUserFromConvoMutation,
	useRetrieveConvoParticipantsQuery,
	useLazyRetrieveConvoParticipantsQuery,
	useSearchConvoPostMutation,
	useRetrieveAllFaqCategoriesAndQuestionsQuery,
	useLazyRetrieveAllFaqCategoriesAndQuestionsQuery,
	useAddFaqCategoryMutation,
	useRetrieveFaqCategoryQuery,
	useLazyRetrieveFaqCategoryQuery,
	useDeleteFaqCategoryMutation,
	useUpdateFaqCategoryMutation,
	useRetrieveAllFaqCategoryQuestionsQuery,
	useLazyRetrieveAllFaqCategoryQuestionsQuery,
	useAddFaqQuestionMutation,
	useRetrieveFaqQuestionQuery,
	useLazyRetrieveFaqQuestionQuery,
	useDeleteFaqQuestionMutation,
	useUpdateFaqQuestionMutation,
	useReorderFaqMutation,
	useAddForumAdminMutation,
	useRemoveForumAdminMutation,
	useRetrieveForumQuery,
	useLazyRetrieveForumQuery,
	useAddTopicMutation,
	useShowLogPostMutation,
	useListCategoriesQuery,
	useLazyListCategoriesQuery,
	useListPopularForumsQuery,
	useLazyListPopularForumsQuery,
	useListPostsByMeQuery,
	useLazyListPostsByMeQuery,
	useListPostsMutation,
	useListTopicsMutation,
	useListGlobalTopicsQuery,
	useLazyListGlobalTopicsQuery,
	useLookupSeriesQuery,
	useLazyLookupSeriesQuery,
	useLookupTopicQuery,
	useLazyLookupTopicQuery,
	useLookupPostQuery,
	useLazyLookupPostQuery,
	useRetrieveTemporaryPollImagesQuery,
	useLazyRetrieveTemporaryPollImagesQuery,
	useAddTemporaryPollImageMutation,
	useUpdateTopicPollMutation,
	useAddPollVoteMutation,
	useRetrieveVoteQuery,
	useLazyRetrieveVoteQuery,
	useRetrieveTopicQuery,
	useLazyRetrieveTopicQuery,
	useAddPostMutation,
	useDeleteTopicMutation,
	useUpdateTopicMutation,
	useRetrievePostQuery,
	useLazyRetrievePostQuery,
	useDeletePostMutation,
	useUpdatePostMutation,
	useReportPostMutation,
	useDeletePostReportMutation,
	useListReportedPostsQuery,
	useLazyListReportedPostsQuery,
	useRetrievePostLocationQuery,
	useLazyRetrievePostLocationQuery,
	useSearchForumPostMutation,
	useSearchSpecificForumPostMutation,
	useSearchSpecificTopicPostMutation,
	useListWarnHistoryForUserQuery,
	useLazyListWarnHistoryForUserQuery,
	useGetCurrentWarnForUserQuery,
	useLazyGetCurrentWarnForUserQuery,
	useUpdateUserWarnLevelMutation,
	useRetrieveGenresQuery,
	useLazyRetrieveGenresQuery,
	useAddGenreMutation,
	useRetrieveGenreByIdQuery,
	useLazyRetrieveGenreByIdQuery,
	useDeleteGenreMutation,
	useUpdateGenreMutation,
	useAddGroupMutation,
	useRetrieveGroupQuery,
	useLazyRetrieveGroupQuery,
	useDeleteGroupMutation,
	useUpdateGroupMutation,
	useRejectGroupMutation,
	useSearchGroupsPostMutation,
	useRetrieveGroupSeriesQuery,
	useLazyRetrieveGroupSeriesQuery,
	useRetrieveListsQuery,
	useLazyRetrieveListsQuery,
	useAddCustomListMutation,
	useRetrieveListByIdQuery,
	useLazyRetrieveListByIdQuery,
	useDeleteCustomListMutation,
	useUpdateListMutation,
	useRetrievePublicListsQuery,
	useLazyRetrievePublicListsQuery,
	useRetrievePublicListStatsQuery,
	useLazyRetrievePublicListStatsQuery,
	useSearchPublicListsPostMutation,
	useSearchListsPostMutation,
	useAddListSeriesMutation,
	useAddListSeriesBulkMutation,
	useDeleteListSeriesMutation,
	useRetrieveListSeriesQuery,
	useLazyRetrieveListSeriesQuery,
	useUpdateListSeriesMutation,
	useRetrieveSimilarUsersBySeriesQuery,
	useLazyRetrieveSimilarUsersBySeriesQuery,
	useTimeQuery,
	useLazyTimeQuery,
	useListOnlineUsersQuery,
	useLazyListOnlineUsersQuery,
	useRetrieveSlowTransactionStatusQuery,
	useLazyRetrieveSlowTransactionStatusQuery,
	useSiteStatsQuery,
	useLazySiteStatsQuery,
	useRetrievePollQuery,
	useLazyRetrievePollQuery,
	useAddPollMutation,
	useArchivePollMutation,
	useRetrieveOldPollsQuery,
	useLazyRetrieveOldPollsQuery,
	useVotePollNoAnswerMutation,
	useVotePollAnswerMutation,
	useRetrieveVoteStatusQuery,
	useLazyRetrieveVoteStatusQuery,
	useAddPublisherMutation,
	useRetrievePublisherQuery,
	useLazyRetrievePublisherQuery,
	useDeletePublisherMutation,
	useUpdatePublisherMutation,
	useSearchPublishersPostMutation,
	useRetrievePublisherSeriesQuery,
	useLazyRetrievePublisherSeriesQuery,
	useRetrievePublicationSeriesQuery,
	useLazyRetrievePublicationSeriesQuery,
	useAddReleaseMutation,
	useRetrieveReleaseQuery,
	useLazyRetrieveReleaseQuery,
	useDeleteReleaseMutation,
	useUpdateReleaseMutation,
	useModerateReleasesPostMutation,
	useListReleasesByDayQuery,
	useLazyListReleasesByDayQuery,
	useReleaseRssFeedQuery,
	useLazyReleaseRssFeedQuery,
	useSearchReleasesPostMutation,
	useAddReviewMutation,
	useAddReviewCommentMutation,
	useRetrieveReviewCommentQuery,
	useLazyRetrieveReviewCommentQuery,
	useDeleteReviewCommentMutation,
	useUpdateReviewCommentMutation,
	useReviewCommentsModerationPostMutation,
	useSearchReviewCommentsPostMutation,
	useRetrieveReviewQuery,
	useLazyRetrieveReviewQuery,
	useDeleteReviewMutation,
	useUpdateReviewMutation,
	useSearchReviewsPostMutation,
	useAddSeriesMutation,
	useCombineSeriesCategoriesMutation,
	useDeleteSeriesCategoryMutation,
	useRenameSeriesCategoryMutation,
	useRetrieveSeriesCategoryVotesQuery,
	useLazyRetrieveSeriesCategoryVotesQuery,
	useAddSeriesCategoryVoteMutation,
	useRemoveSeriesCategoryVoteMutation,
	useAddSeriesCommentMutation,
	useRetrieveSeriesCommentQuery,
	useLazyRetrieveSeriesCommentQuery,
	useDeleteSeriesCommentMutation,
	useUpdateSeriesCommentMutation,
	useSeriesCommentsModerationPostMutation,
	useReportSeriesCommentMutation,
	useRetrieveMySeriesCommentQuery,
	useLazyRetrieveMySeriesCommentQuery,
	useRetrieveSeriesCommentLocationQuery,
	useLazyRetrieveSeriesCommentLocationQuery,
	useSearchSeriesCommentsPostMutation,
	useAddSeriesCommentUsefulFlagMutation,
	useRemoveSeriesCommentUsefulFlagMutation,
	useRetrieveSeriesQuery,
	useLazyRetrieveSeriesQuery,
	useDeleteSeriesMutation,
	useUpdateSeriesMutation,
	useRetrieveSeriesGroupsQuery,
	useLazyRetrieveSeriesGroupsQuery,
	useSearchSeriesHistoryPostMutation,
	useRetrieveSeriesLocksQuery,
	useLazyRetrieveSeriesLocksQuery,
	useLockSeriesFieldMutation,
	useUnlockSeriesFieldMutation,
	useRetrieveSeriesRankLocationQuery,
	useLazyRetrieveSeriesRankLocationQuery,
	useRetrieveUserSeriesRatingQuery,
	useLazyRetrieveUserSeriesRatingQuery,
	useUpdateUserSeriesRatingMutation,
	useDeleteUserSeriesRatingMutation,
	useRetrieveSeriesRatingRainbowQuery,
	useLazyRetrieveSeriesRatingRainbowQuery,
	useSeriesReleaseRssFeedQuery,
	useLazySeriesReleaseRssFeedQuery,
	useSearchSeriesPostMutation,
	useUpdateSeriesImageMutation,
	useDeleteSeriesImageMutation,
	useRetrieveUserGroupByIdQuery,
	useLazyRetrieveUserGroupByIdQuery,
	useAddOrUpdateUserGroupMutation,
	useDeleteUserGroupMutation,
	useRetrieveUserGroupsQuery,
	useLazyRetrieveUserGroupsQuery,
	useAddMemberMutation,
	useSearchMemberChangeRequestsQuery,
	useLazySearchMemberChangeRequestsQuery,
	useAddMemberChangeRequestMutation,
	useRetrieveMemberChangeRequestQuery,
	useLazyRetrieveMemberChangeRequestQuery,
	useDeleteMemberChangeRequestMutation,
	useUpdateMemberChangeRequestMutation,
	useRetrieveMemberQuery,
	useLazyRetrieveMemberQuery,
	useDeleteMemberMutation,
	useUpdateMemberMutation,
	useRetrieveMemberGenreFiltersQuery,
	useLazyRetrieveMemberGenreFiltersQuery,
	useAddMemberGenreFilterMutation,
	useRemoveMemberGenreFilterMutation,
	useRetrieveMemberGenreHighlightsQuery,
	useLazyRetrieveMemberGenreHighlightsQuery,
	useAddMemberGenreHighlightMutation,
	useRemoveMemberGenreHighlightMutation,
	useResetGenreSettingsMutation,
	useRetrieveMemberGroupFiltersQuery,
	useLazyRetrieveMemberGroupFiltersQuery,
	useAddUserGroupFilterMutation,
	useRemoveUserGroupFilterMutation,
	useRetrieveMemberAvatarsQuery,
	useLazyRetrieveMemberAvatarsQuery,
	useSearchMembersPostMutation,
	useRetrieveMemberTopicSubscriptionsQuery,
	useLazyRetrieveMemberTopicSubscriptionsQuery,
	useRetrieveMemberTopicSubscriptionQuery,
	useLazyRetrieveMemberTopicSubscriptionQuery,
	useAddUserTopicSubscriptionMutation,
	useRemoveUserTopicSubscriptionMutation,
	useAddMemberAvatarMutation,
	useDeleteMemberAvatarMutation,
	useApproveMemberUpgradeMutation,
	useRejectMemberUpgradeMutation,
} = injectedRtkApi;
