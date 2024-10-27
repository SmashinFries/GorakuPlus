// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: ['expo', 'prettier'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'warn',
		'import/namespace': 'off',
		'import/resolver': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/ban-types': 'off', // deprecated!
		'@typescript-eslint/no-restricted-types': [
			'error',
			{
				types: {
					Number: {
						message: 'Use `number` instead.',
						fixWith: 'number',
					},
					Boolean: {
						message: 'Use `boolean` instead.',
						fixWith: 'boolean',
					},
					Symbol: {
						message: 'Use `symbol` instead.',
						fixWith: 'symbol',
					},
					Object: {
						message: 'Use `object` instead.',
						fixWith: 'object',
					},
					String: {
						message: 'Use `string` instead.',
						fixWith: 'string',
					},
				},
			},
		],
	},
	ignorePatterns: ['src/api/*'],
};
