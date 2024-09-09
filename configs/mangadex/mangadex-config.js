module.exports = {
	mangadex: {
		output: {
			mode: 'single',
			target: '../../src/api/mangadex/mangadex.ts',
			schemas: '../../src/api/mangadex/models',
			client: 'react-query',
			mock: false,
			baseUrl: 'https://api.mangadex.org',
			override: {
				query: {
					useQuery: true,
					useInfinite: false,
					options: {
						staleTime: 10000,
					},
				},
				operations: {
					'get-search-manga': {
						query: {
							useInfinite: true,
							useInfiniteQueryParam: 'offset',
						},
					},
				},
			},
		},
		input: {
			target: './schema.yaml',
		},
	},
};
