const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const configer = require('./configer');
const projectConfig = require(path.resolve(process.cwd(), './abc.json'));

const DefaultProxyConfig = {};

exports.run = (options) => {

  const webpackConfig = configer(projectConfig.type, options);

  const compiler = webpack(webpackConfig);
  
  const server = new webpackDevServer(compiler, {

    contentBase: webpackConfig.output.path,

    proxy: Object.assign({}, DefaultProxyConfig, projectConfig.proxy),

    hot: true,

    stats: {
      colors: true
    }
  });

  server.listen(options.port, '127.0.0.1', function() {
    console.log(chalk.green(`Starting server on http://localhost:${options.port}`));
  });
};