// {
//     "schemaFile": "./schema.json",
//     "apiFile": "../src/store/services/tracemoe/baseTraceMoe.ts",
//     "apiImport": "baseTraceMoe",
//     "outputFile": "../src/store/services/tracemoe/traceMoeApi.ts",
//     "exportName": "traceMoeApi",
//     "hooks": {
//         "queries": true,
//         "lazyQueries": true,
//         "mutations": true
//     }
// }

module.exports = {
	tracemoe: {
		output: {
			mode: 'single',
			target: '../../src/api/tracemoe/tracemoe.ts',
			schemas: '../../src/api/tracemoe/models',
			client: 'react-query',
			mock: false,
			override: {
				query: {
					useQuery: true,
					useInfinite: false,
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
