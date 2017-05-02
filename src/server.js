const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackIE8 = require('webpack-legacy');
const webpackDevServer = require('webpack-dev-server');
const openBrowser = require('open');
const ip = require('ip');

const configer = require('./configer');
const projectConfig = require(path.resolve(process.cwd(), './abc.json'));

const DefaultProxyConfig = {};
let WP;
if (projectConfig.supportIE8) {
  WP = webpackIE8;
} else {
  WP = webpack;
}

process.env.NODE_ENV = 'development';

exports.run = (options) => {

  const { port, open } = options; 

  const webpackConfig = configer(projectConfig.type, options, projectConfig);

  const compiler = WP(webpackConfig);

  const host = ip.address();
  
  const server = new webpackDevServer(compiler, {

    contentBase: webpackConfig.output.path,

    proxy: Object.assign({}, DefaultProxyConfig, projectConfig.proxy),

    hot: true,
    
    disableHostCheck:true,
    
    host: '0.0.0.0',

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
