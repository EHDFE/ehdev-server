const ip = require('ip');
const webpackDevServer = require('webpack-dev-server');
const openBrowser = require('open');
const chalk = require('chalk');
const configer = require('./configer');

module.exports = (options, projectConfig) => {

  const DefaultProxyConfig = {};
  
  let WP;
  if (projectConfig.supportIE8) {
    WP = require('webpack-legacy');
  } else {
    WP = require('webpack');
  }

  const { port, open } = options; 

  const webpackConfig = configer(projectConfig.type, options, projectConfig);

  const compiler = WP(webpackConfig);

  const host = ip.address();
  
  const server = new webpackDevServer(compiler, {

    contentBase: webpackConfig.output.path,

    proxy: Object.assign({}, DefaultProxyConfig, projectConfig.proxy),

    hot: true,
    
    disableHostCheck: true,
    
    host: '0.0.0.0',

    historyApiFallback: projectConfig.historyApiFallback || false,

    stats: {
      colors: true,
      errorDetails: true,
    },
  });

  server.listen(port, '0.0.0.0', function() {
    console.log(chalk.green(`Starting server on http://${host}:${port}`));
    if (open) {
      openBrowser(`http://${host}:${port}`);
    }
  });
};