const ehdevConfigs = require('ehdev-configs');

module.exports = (type, options) => {
  let config;
  switch (type) {
    case 'standard':
    default:
      config = ehdevConfigs['standard']('development', options);
      break;
  }
  return config;
};