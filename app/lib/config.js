// @flow
const { is } = require('electron-util');

if (is.main) {
  module.exports = require('../main/config'); // eslint-disable-line global-require
} else {
  const getConfig = require('../utils/config'); // eslint-disable-line global-require
  module.exports = getConfig();
}
