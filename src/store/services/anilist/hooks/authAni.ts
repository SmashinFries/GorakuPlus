import { useCallback, useEffect, useState } from 'react';
import {
    makeRedirectUri,
    AuthRequest,
    AuthSessionResult,
    AuthRequestPromptOptions,
} from 'expo-auth-session';
import { useDispatch } from 'react-redux';
import { setAniAuth } from '../authSlice';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { api } from '../enhanced';
import { useLazyUserDataQuery } from '../generated-anilist';

const ANI_ID = Constants.expoConfig?.extra?.ANI_ID;
const ANI_ID_SETUP = Constants.expoConfig?.extra?.ANI_ID_SETUP;
const ANI_WEB_ID = Constants.expoConfig?.extra?.ANI_WEB_ID;

// https://anilist.co/api/v2/oauth/authorize?client_id={client_id}&response_type=token

const redirectUri = makeRedirectUri({
    path: 'more/accounts',
    // queryParams: { rootPath: rootPath },
});
const redirectSetupUri = makeRedirectUri({
    path: 'setup',
});

export const useAnilistAuth = (isSetup = false) => {
    const AniListURL = `https://anilist.co/api/v2/oauth/authorize?client_id=${
        Platform.OS === 'web' ? ANI_WEB_ID : isSetup ? ANI_ID_SETUP : ANI_ID
    }&response_type=token`;
    const [request, setRequest] = useState<AuthRequest | null>(null);
    const [result, setResult] = useState<AuthSessionResult | null>(null);
    const dispatch = useDispatch();
    const [fetchUser, userResult] = useLazyUserDataQuery();

    const promptAsync = useCallback(
        async (options: AuthRequestPromptOptions = {}) => {
            if (!request) {
                throw new Error(
                    'Cannot prompt to authenticate until the request has finished loading.',
                );
            }
            const result = await request?.promptAsync(
                { authorizationEndpoint: AniListURL },
                options,
            );

            // Using Expo Go gives error: "Cross-Site request verification failed. Cached state and returned state do not match."
            // Still provides the token though.
            if (result?.type === 'success' || result?.type === 'error') {
                const accessToken = result.authentication?.accessToken;
                // console.log('accessToken', accessToken?.length > 0 ? 'true' : 'false');
                const expiresAt = new Date();
                expiresAt.setFullYear(expiresAt.getFullYear() + 1);
                if (accessToken) {
                    // set header
                    dispatch(
                        setAniAuth({
                            token: accessToken,
                            deathDate: expiresAt.toLocaleString(),
                        }),
                    );
                    // Fetch userdata
                    const user = await fetchUser().unwrap();
                    const userAvatar =
                        user.Viewer.avatar?.large ?? user.Viewer.avatar?.medium ?? null;
                    const userID = user.Viewer.id ?? null;
                    const username = user.Viewer.name ?? null;
                    dispatch(
                        setAniAuth({
                            token: accessToken,
                            deathDate: expiresAt.toLocaleString(),
                            avatar: userAvatar,
                            userID: userID,
                            username: username,
                        }),
                    );
                    dispatch(
                        api.util.invalidateTags([
                            'AniMedia',
                            'AniSearch',
                            'ExploreAnime',
                            'ExploreManga',
                            'ExploreManhwa',
                            'ExploreNovel',
                            'UserOverview',
                        ]),
                    );
                }
            }
            setResult(result);
            return result;
        },
        [request?.url, AniListURL],
    );

    useEffect(() => {
        if (AniListURL) {
            const request = new AuthRequest({
                usePKCE: false,
                redirectUri: isSetup ? redirectSetupUri : redirectUri,
                scopes: [],
                clientId: '',
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

    return { request, result, promptAsync };
};
