module.exports = {
	panelsdesu: {
		output: {
			mode: 'single',
			target: '../../src/api/panelsdesu/panelsdesu.ts',
			schemas: '../../src/api/panelsdesu/models',
			client: 'react-query',
			baseUrl: 'https://api.panelsdesu.com',
			mock: false,
			override: {
				query: {
					useQuery: true,
					useInfinite: true,
					options: {
						staleTime: 10000,
					},
				},
			},
		},
		input: {
			target: './schema.json',
		},
	},
};
