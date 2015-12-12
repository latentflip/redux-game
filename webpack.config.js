const Config = require('getconfig');
const makeWebpackConfig = require('hjs-webpack');

module.exports = makeWebpackConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,

  replace: {
    config: Config.clientConfig
  }
});
