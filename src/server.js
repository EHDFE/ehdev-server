const path = require('path');

const projectConfig = require(path.resolve(process.cwd(), './abc.json'));

let serverInstance;
if (projectConfig.type === 'legacy') {
  serverInstance = require('./legacy-server');
} else {
  serverInstance = require('./webpack-server');
}

process.env.NODE_ENV = 'development';

exports.run = (options) => {
  serverInstance(options, projectConfig);
};
