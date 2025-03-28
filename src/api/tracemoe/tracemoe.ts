/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * api.trace.moe
 * api.trace.moe
 * OpenAPI spec version: 1.0.1
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import axios from 'axios'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  Error,
  GetSearchParams,
  PostSearchParams,
  SearchBody,
  SearchResult,
  User
} from './models'




/**
 * @summary Get search result of an anime screeshot
 */
export const getSearch = (
    params: GetSearchParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<SearchResult>> => {
    
    return axios.get(
      `https://api.trace.moe/search`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetSearchQueryKey = (params: GetSearchParams,) => {
    return [`https://api.trace.moe/search`, ...(params ? [params]: [])] as const;
    }

    
export const getGetSearchQueryOptions = <TData = Awaited<ReturnType<typeof getSearch>>, TError = AxiosError<Error>>(params: GetSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getSearch>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetSearchQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getSearch>>> = ({ signal }) => getSearch(params, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getSearch>>, TError, TData> & { queryKey: QueryKey }
}

export type GetSearchQueryResult = NonNullable<Awaited<ReturnType<typeof getSearch>>>
export type GetSearchQueryError = AxiosError<Error>

/**
 * @summary Get search result of an anime screeshot
 */
export const useGetSearch = <TData = Awaited<ReturnType<typeof getSearch>>, TError = AxiosError<Error>>(
 params: GetSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getSearch>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetSearchQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Get search result of an anime screeshot
 */
export const postSearch = (
    searchBody: SearchBody,
    params?: PostSearchParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<SearchResult>> => {const formData = new FormData();
if(searchBody.image !== undefined) {
 formData.append('image', searchBody.image)
 }

    
    return axios.post(
      `https://api.trace.moe/search`,
      formData,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }



export const getPostSearchMutationOptions = <TError = AxiosError<Error>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postSearch>>, TError,{data: SearchBody;params?: PostSearchParams}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postSearch>>, TError,{data: SearchBody;params?: PostSearchParams}, TContext> => {
const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postSearch>>, {data: SearchBody;params?: PostSearchParams}> = (props) => {
          const {data,params} = props ?? {};

          return  postSearch(data,params,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostSearchMutationResult = NonNullable<Awaited<ReturnType<typeof postSearch>>>
    export type PostSearchMutationBody = SearchBody
    export type PostSearchMutationError = AxiosError<Error>

    /**
 * @summary Get search result of an anime screeshot
 */
export const usePostSearch = <TError = AxiosError<Error>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postSearch>>, TError,{data: SearchBody;params?: PostSearchParams}, TContext>, axios?: AxiosRequestConfig}
): UseMutationResult<
        Awaited<ReturnType<typeof postSearch>>,
        TError,
        {data: SearchBody;params?: PostSearchParams},
        TContext
      > => {

      const mutationOptions = getPostSearchMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * @summary Get info about your account
 */
export const getMe = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<User>> => {
    
    return axios.get(
      `https://api.trace.moe/me`,options
    );
  }


export const getGetMeQueryKey = () => {
    return [`https://api.trace.moe/me`] as const;
    }

    
export const getGetMeQueryOptions = <TData = Awaited<ReturnType<typeof getMe>>, TError = AxiosError<Error>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetMeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getMe>>> = ({ signal }) => getMe({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData> & { queryKey: QueryKey }
}

export type GetMeQueryResult = NonNullable<Awaited<ReturnType<typeof getMe>>>
export type GetMeQueryError = AxiosError<Error>

/**
 * @summary Get info about your account
 */
export const useGetMe = <TData = Awaited<ReturnType<typeof getMe>>, TError = AxiosError<Error>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetMeQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




