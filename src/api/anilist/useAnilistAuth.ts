import { useCallback, useEffect, useState } from 'react';
import {
	makeRedirectUri,
	AuthRequest,
	AuthSessionResult,
	AuthRequestPromptOptions,
	useAuthRequest,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { useQueryClient } from '@tanstack/react-query';
import {
	useViewerDataQuery,
	ViewerDataQuery,
} from './__genereated__/gql';
import { useAuthStore } from '@/store/authStore';
import { useListFilterStore } from '@/store/listStore';
import { useShallow } from 'zustand/react/shallow';

const ANI_ID = Constants.expoConfig?.extra?.ANI_ID;
// const ANI_ID = Constants.expoConfig?.extra?.ANI_ID;
const ANI_ID_SETUP = Constants.expoConfig?.extra?.ANI_ID_SETUP;
const ANI_WEB_ID = Constants.expoConfig?.extra?.ANI_WEB_ID;

// https://anilist.co/api/v2/oauth/authorize?client_id={client_id}&response_type=token

const redirectUri = makeRedirectUri({
	path: 'auth',
	// queryParams: { rootPath: rootPath },
});

export const useAnilistAuth = () => {
	const AniListURL = `https://anilist.co/api/v2/oauth/authorize?client_id=${ANI_ID}&response_type=token`;
	const [request, setRequest] = useState<AuthRequest | null>(null);
	const [result, setResult] = useState<AuthSessionResult | null>(null);
	const queryClient = useQueryClient();
	const setAnilistAuth = useAuthStore(useShallow((state) => state.setAnilistAuth));
	const { updateListFilter } = useListFilterStore();

	const promptAsync = useCallback(
		async (options: AuthRequestPromptOptions = {}) => {
			const browserPackages = await WebBrowser.getCustomTabsSupportingBrowsersAsync();
			if (!request) {
				throw new Error(
					'Cannot prompt to authenticate until the request has finished loading.',
				);
			}
			const result = await request?.promptAsync(
				{ authorizationEndpoint: AniListURL },
				{ ...options, showInRecents: true, browserPackage: browserPackages.servicePackages[0] },
			);

			// Usually returns an error even though we still get the token :/
			if (result?.type === 'success' || result?.type === 'error') {
				const accessToken = result.authentication?.accessToken;
				const expiresAt = new Date();
				expiresAt.setFullYear(expiresAt.getFullYear() + 1);
				if (accessToken) {
					setAnilistAuth({
						token: accessToken,
						deathDate: expiresAt.toLocaleString(),
					});
					// Fetch userdata
					const user = await queryClient.fetchQuery<ViewerDataQuery>({
						queryKey: useViewerDataQuery.getKey(),
						queryFn: useViewerDataQuery.fetcher(),
					});
					// const user = await fetchUser().unwrap();
					const userAvatar =
						user?.Viewer?.avatar?.large ?? null;
					const userID = user?.Viewer?.id ?? null;
					const username = user?.Viewer?.name ?? null;
					setAnilistAuth({
						token: accessToken,
						deathDate: expiresAt.toLocaleString(),
						avatar: userAvatar,
						userID: userID,
						username: username,
					});
					updateListFilter({
						animeTabOrder: [
							'Watching',
							'Planning',
							'Completed',
							'Rewatching',
							'Paused',
							'Dropped',
							...(user?.Viewer?.mediaListOptions?.animeList?.customLists?.filter((list): list is string => list !== null) ?? []),
						],
						mangaTabOrder: [
							'Reading',
							'Planning',
							'Completed',
							'Rereading',
							'Paused',
							'Dropped',
							...(user?.Viewer?.mediaListOptions?.mangaList?.customLists?.filter((list): list is string => list !== null) ?? []),
						],
					});
					await invalidateQueries();
				}
			}
			setResult(result);
			return result;
		},
		[request?.url, AniListURL],
	);

	const invalidateQueries = async () => {
		queryClient.invalidateQueries();
	};

	useEffect(() => {
		if (AniListURL) {
			const request = new AuthRequest({
				usePKCE: false,
				redirectUri: redirectUri,
				scopes: [],
				clientId: ANI_ID,
				// responseType: ResponseType.Token,
			});
			request.url = AniListURL;
			setRequest(request);
		}
	}, [AniListURL]);

	// const [request, response, promptAsync] = useAuthRequest(
	//     {
	//         responseType: ResponseType.Token,
	//         clientId: '12490',
	//         usePKCE: false,
	//         scopes: [],
	//         redirectUri: makeRedirectUri({
	//             native: 'goraku://anilist/redirect',
	//             // path: 'anilist/redirect',
	//             // native: 'com.kuzutech.Goraku://anilist/redirect',
	//         }),
	//     },
	//     discovery,
	// );

	// useEffect(() => {
	//     if (response && response.type === 'success') {
	//         const { accessToken, expiresIn } = response.authentication;
	//         dispatch(setAniAuth({ token: accessToken, timeTillDeath: expiresIn.toString() }));
	//     }
	// }, [response]);

	return { request, result, promptAsync, invalidateQueries };
};
