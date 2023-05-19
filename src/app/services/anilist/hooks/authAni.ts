import { useCallback, useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
    makeRedirectUri,
    useAuthRequest,
    ResponseType,
    DiscoveryDocument,
    CodeChallengeMethod,
    AuthRequest,
    AuthSessionResult,
    AuthRequestPromptOptions,
} from 'expo-auth-session';
import { useDispatch } from 'react-redux';
import { setAniAuth } from '../authSlice';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { api } from '../enhanced';
import { RootNavPaths } from '../../../../navigation/types';

const ANI_ID = Constants.expoConfig?.extra?.ANI_ID;
const ANI_WEB_ID = Constants.expoConfig?.extra?.ANI_WEB_ID;

// https://anilist.co/api/v2/oauth/authorize?client_id={client_id}&response_type=token

const discovery: DiscoveryDocument = {
    authorizationEndpoint: 'https://anilist.co/api/v2/oauth/authorize',
};

const redirectUri = makeRedirectUri({
    scheme: 'goraku',
    path: 'anilist/redirect',
    // queryParams: { rootPath: rootPath },
});

const AniListURL = `https://anilist.co/api/v2/oauth/authorize?client_id=${
    Platform.OS === 'web' ? ANI_WEB_ID : ANI_ID
}&response_type=token`;

export const useAnilistAuth = (rootPath: keyof RootNavPaths) => {
    const [request, setRequest] = useState<AuthRequest | null>(null);
    const [result, setResult] = useState<AuthSessionResult | null>(null);
    const dispatch = useDispatch();

    

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

            if (result?.type === 'success' || result?.type === 'error') {
                const { accessToken, expiresIn } = result.authentication;
                const today = new Date().getTime() / 1000;
                const death = today + expiresIn;
                dispatch(setAniAuth({ token: accessToken, timeTillDeath: death?.toString() }));
                console.log('dispatched auth!');
                dispatch(api.util.invalidateTags(['ExploreAnime', 'ExploreManga', 'ExploreNovel']));
            } else {
                console.log('useAuth!', result?.type);
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
                redirectUri,
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
    //         console.log(accessToken);
    //         dispatch(setAniAuth({ token: accessToken, timeTillDeath: expiresIn.toString() }));
    //     }
    // }, [response]);

    return { request, result, promptAsync };
};
