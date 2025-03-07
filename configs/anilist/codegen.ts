import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'https://graphql.anilist.co',
	documents: 'src/api/anilist/gql/**/*.graphql',
	generates: {
		'./src/api/anilist/__genereated__/gql.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
			config: {
				exposeQueryKeys: true,
				exposeFetcher: true,
				fetcher: {
					func: 'configs/anilist/fetcher#fetchAnilistData',
					isReactHook: false,
				},
				addInfiniteQuery: true,
				reactQueryVersion: 5,
				dedupeFragments: true,
				extractAllFieldsToTypes: true,
				skipTypename: true,
			},
		},
	},
};
export default config;
