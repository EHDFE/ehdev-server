const chalk = require('chalk');

const pkg = require('../package.json');
const server = require('./server');

module.exports = {

  command: 'server',

  description: pkg.description,

  options: [
    [ '-p, --port <port>', 'server port, default to `3000`', 3000 ]
  ],

  action(options) {
    server.run(options);
  },
};