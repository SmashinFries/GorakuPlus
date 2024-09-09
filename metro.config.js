// Learn more https://docs.expo.io/guides/customizing-metro
const { getSentryExpoConfig } = require('@sentry/react-native/metro');

const config = getSentryExpoConfig(__dirname);

// --- burnt ---
config.resolver.sourceExts.push('mjs');
config.resolver.sourceExts.push('cjs');
// --- end burnt ---

module.exports = config;
