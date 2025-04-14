import { useQuery, useInfiniteQuery, UseQueryOptions, useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios, { AxiosBasicCredentials, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { AboutServerQuery, ChaptersDownloadMutation, ChaptersDownloadVariables, FetchSourceMangaMangaItem, FetchSourceMangaMutation, FetchSourceMangaVariables, GetAllCategoriesQuery, GetSourcesQuery, MangaChaptersQuery, MangaChaptersVariables, UpdateMangaMutation, UpdateMangaVariables } from './types';
import { sendErrorMessage } from '@/utils/toast';
import { DefaultSectionT, SectionListData, SectionListRenderItemInfo } from 'react-native';

const GetAboutServerDocument = `
query AboutServerQuery {
  aboutServer {
    name
    version
	buildType
	buildTime
	revision
  }
}
`;

const GetSourcesDocument = `
query Sources {
  sources {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
    nodes {
      id
      name
			displayName
			iconUrl
    }
  }
}
`;

const GetAllCategoriesDocument = `
query AllCategories {
  categories {
    nodes {
      id
      name
      mangas {
        totalCount
      }
    }
  }
}
`;

const FetchSourceMangaDocument = `
mutation FetchSourceManga($page: Int = 1, $query: String, $source: LongString!) {
  fetchSourceManga(
    input: {page: $page, type: SEARCH, query: $query, source: $source}
  ) {
		clientMutationId
    hasNextPage
    mangas {
      id
      inLibrary
      title
      url
      inLibraryAt
      sourceId
      thumbnailUrl
	  realUrl
	  chapters {
        totalCount
      }
	  categories {
			nodes {
				id
				name
			}
		}
    }
  }
}
`;

const UpdateMangaDocument = `
mutation UpdateManga($id: Int!, $inLibrary: Boolean, $addToCategories: [Int!], $updateCategories: Boolean!) {
  updateMangaCategories(
    input: {id: $id, patch: {addToCategories: $addToCategories}}
  ) @include(if: $updateCategories) {
    manga {
      id
      categories {
        nodes {
          id
          mangas {
            totalCount
          }
        }
        totalCount
      }
    }
  }
  updateManga(input: {id: $id, patch: {inLibrary: $inLibrary}}) {
    manga {
      id
      inLibrary
      inLibraryAt
    }
  }
}
`;

const MangaChaptersDocument = `
query MangaChapters($mangaId: Int) {
  chapters(condition: {mangaId: $mangaId}) {
    nodes {
      id
      chapterNumber
      isDownloaded
    }
    totalCount
  }
}
`;

const DownloadChaptersDocument = `
mutation AddChaptersToDownloadQueue($ids: [Int!]!) {
  enqueueChapterDownloads(input: {ids: $ids}) {
    downloadStatus {
      state
    }
  }
}
`;

export const checkSuwayomiStatus = async (url: string, auth?: AxiosBasicCredentials) => {
	try {
		const result = await axios.post<AboutServerQuery>(url, { query: GetAboutServerDocument }, { auth: auth });
		return result;
	} catch (e) {
		// sendErrorMessage(e)
		console.log(e);
		return null;
	}
};

export const fetchSuwayomiData = <TData, TVariables>(
	query: string,
	variables?: TVariables,
): (() => Promise<TData>) => {
	const serverUrl = useAuthStore.getState().suwayomi.serverUrl ?? '';
	const username = useAuthStore.getState().suwayomi.username;
	const password = useAuthStore.getState().suwayomi.password;

	return async () => {
		try {
			const res = await axios.post(
				serverUrl,
				{ query, variables },
				{ auth: (username && password ? { username, password } : undefined) }
			);
			return res.data ?? null;
		} catch (error) {
			console.error(error);
		}
	};
};

/**
 * Get all sources
 */
export const useSuwayomiGetSourcesQuery = <
	TData = GetSourcesQuery,
	TError = unknown
>(
	options?: Omit<UseQueryOptions<GetSourcesQuery, TError, TData>, 'queryKey'>
) =>
	useQuery<GetSourcesQuery, TError, TData>({
		queryKey: ['GetSources'],
		queryFn: fetchSuwayomiData<GetSourcesQuery, unknown>(GetSourcesDocument),
		...options
		// refetchOnMount: false
	});

/**
 * Get all categories
 */
export const useSuwayomiGetAllCategoriesQuery = <
	TData = GetAllCategoriesQuery,
	TError = unknown
>(
	options?: Omit<UseQueryOptions<GetAllCategoriesQuery, TError, TData>, 'queryKey'>
) =>
	useQuery<GetAllCategoriesQuery, TError, TData>({
		queryKey: ['GetSources'],
		queryFn: fetchSuwayomiData<GetAllCategoriesQuery, unknown>(GetAllCategoriesDocument),
		...options
	});

/**
 * Search manga from an extension
 */
export const useSuwayomiFetchSourceMangaMutation = <
	TContext = unknown,
	TError = unknown
>(
	options?: UseMutationOptions<FetchSourceMangaMutation, TError, FetchSourceMangaVariables, TContext>
) =>
	useMutation<FetchSourceMangaMutation, TError, FetchSourceMangaVariables, TContext>({
		mutationKey: ['FetchSourceManga'],
		mutationFn: (variables: FetchSourceMangaVariables) => fetchSuwayomiData<FetchSourceMangaMutation, FetchSourceMangaVariables>(FetchSourceMangaDocument, variables)(),
		...options
	});

/**
 * Update Manga State
 */
export const useSuwayomiUpdateMangaMutation = <
	TContext = unknown,
	TError = unknown
>(
	options?: UseMutationOptions<UpdateMangaMutation, TError, UpdateMangaVariables, TContext>
) =>
	useMutation<UpdateMangaMutation, TError, UpdateMangaVariables, TContext>({
		mutationKey: ['UpdateManga'],
		mutationFn: (variables: UpdateMangaVariables) => fetchSuwayomiData<UpdateMangaMutation, UpdateMangaVariables>(UpdateMangaDocument, variables)(),
		...options
	});


export const useSuwayomiMangaChaptersMutation = <
	TContext = unknown,
	TError = unknown
>(
	options?: UseMutationOptions<MangaChaptersQuery, TError, MangaChaptersVariables, TContext>
) =>
	useMutation<MangaChaptersQuery, TError, MangaChaptersVariables, TContext>({
		mutationKey: ['MangaChapters'],
		mutationFn: (variables: MangaChaptersVariables) => fetchSuwayomiData<MangaChaptersQuery, MangaChaptersVariables>(MangaChaptersDocument, variables)(),
		...options
	});

export const useSuwayomiChaptersDownloadMutation = <
	TContext = unknown,
	TError = unknown
>(
	options?: UseMutationOptions<ChaptersDownloadMutation, TError, ChaptersDownloadVariables, TContext>
) =>
	useMutation<ChaptersDownloadMutation, TError, ChaptersDownloadVariables, TContext>({
		mutationKey: ['DownloadChapters'],
		mutationFn: (variables: ChaptersDownloadVariables) => fetchSuwayomiData<ChaptersDownloadMutation, ChaptersDownloadVariables>(DownloadChaptersDocument, variables)(),
		...options
	});

export const useSuwayomiMangaSearch = (variables: { query: string, sourceId: string }) => {
	const { mutateAsync } = useSuwayomiFetchSourceMangaMutation();

	return useQuery({
		queryKey: ['MangaSourceSearch', variables],
		queryFn: async () => {
			return mutateAsync({ page: 1, query: variables.query ?? '', source: variables.sourceId })
		},
		enabled: !!variables.query && !!variables.sourceId,
		gcTime: 0,
	})
}