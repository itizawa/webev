const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
  },
  future: {
    webpack5: true
  }
};
