module.exports = {
	nekosapi: {
		output: {
			mode: 'single',
			target: '../../src/api/nekosapi/nekosapi.ts',
			schemas: '../../src/api/nekosapi/models',
			client: 'react-query',
			baseUrl: 'https://api.nekosapi.com',
			mock: false,
			override: {
				queryOptions: {
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
