const chalk = require('chalk');

const pkg = require('../package.json');
const server = require('./server');

module.exports = {

  command: 'server',

  description: pkg.description,

  options: [
    [ '-p, --port <port>', '本地服务端口，默认 3000', 3000 ],
    [ '-o, --open', '使用默认浏览器访问页面' ],
  ],

  action(options) {
    server.run(options);
  },
};