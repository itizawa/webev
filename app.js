const protect = require('static-auth');
const safeCompare = require('safe-compare');

const app = protect(
  '/',
  (username, password) => safeCompare(username, process.env.USERNAME || 'admin') && safeCompare(password, process.env.PASSWORD || 'admin'),
  {
    directory: `${__dirname}/out`,
    onAuthFailed: (res) => {
      res.end('Authentication failed');
    },
  },
);

module.exports = app;
