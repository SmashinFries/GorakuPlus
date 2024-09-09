// {
//     "schemaFile": "https://raw.githubusercontent.com/jikan-me/jikan-rest/master/storage/api-docs/api-docs.json",
//     "apiFile": "./src/store/services/mal/baseMal.ts",
//     "apiImport": "baseMal",
//     "outputFile": "./src/store/services/mal/malApi.ts",
//     "exportName": "malApi",
//     "hooks": {
//         "queries": true,
//         "lazyQueries": true,
//         "mutations": true
//     },
//     "tag": true
// }

module.exports = {
	jikan: {
		output: {
			mode: 'single',
			target: '../../src/api/jikan/jikan.ts',
			schemas: '../../src/api/jikan/models',
			client: 'react-query',
			baseUrl: 'https://api.jikan.moe/v4',
			mock: false,
			override: {
				query: {
					useQuery: true,
					useInfinite: true,
					useInfiniteQueryParam: 'page',
					options: {
						staleTime: 10000,
					},
				},
				operations: {
					getAnimeForum: {
						query: {
							useInfinite: false,
						},
					},
					getAnimeGenres: {
						query: {
							useInfinite: false,
						},
					},
					getMangaGenres: {
						query: {
							useInfinite: false,
						},
					},
					getMangaTopics: {
						query: {
							useInfinite: false,
						},
					},
					getUserHistory: {
						query: {
							useInfinite: false,
						},
					},
					getUserAnimelist: {
						query: {
							useInfinite: false,
						},
					},
					getUserMangaList: {
						query: {
							useInfinite: false,
						},
					},
				},
			},
		},
		input: {
			target: 'https://raw.githubusercontent.com/jikan-me/jikan-rest/master/storage/api-docs/api-docs.json',
		},
	},
};
