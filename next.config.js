const { nextI18NextRewrites } = require('next-i18next/rewrites')
const localeSubpaths = {}

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  webpackDevMiddleware(config) {
    config.watchOptions = {
      ignored: [
        /\.next\//,
        /node_modules/
      ]
    };
    return config;
  }
};
