import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';
import { RootState } from '../../store';

export const client = new GraphQLClient('https://graphql.anilist.co');

export const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        client,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).persistedAniLogin;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    reducerPath: 'anilistApi',
    endpoints: () => ({}),
});
