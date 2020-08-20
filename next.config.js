module.exports = {
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
