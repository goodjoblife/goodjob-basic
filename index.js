const setupGraphql = require('./graphql/setupGraphql');
const errors = require('./errors');
const wrap = require('./express/wrap');

module.exports = {
  setupGraphql,
  errors,
  wrap,
};
