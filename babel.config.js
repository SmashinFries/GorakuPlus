module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: ['react-native-reanimated/plugin', ['i18next-extract', { locales: ['en', 'es'] }]],
		env: {
			production: {
				plugins: ['react-native-paper/babel'],
			},
		},
	};
};
