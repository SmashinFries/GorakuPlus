module.exports = {
	mangaupdates: {
		output: {
			mode: 'single',
			target: '../../src/api/mangaupdates/mangaupdates.ts',
			schemas: '../../src/api/mangaupdates/models',
			client: 'react-query',
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
			target: './schema.yaml',
		},
	},
};
