const { nextI18NextRewrites } = require('next-i18next/rewrites')
//const withPWA = require('next-pwa')
const localeSubpaths = {
  ru: 'ru'
}

/*module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  compress: false,
  async rewrites () {
    return nextI18NextRewrites(localeSubpaths)
  },
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
});*/

module.exports = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  },
  compress: false,
  async rewrites () {
    return nextI18NextRewrites(localeSubpaths)
  },
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
