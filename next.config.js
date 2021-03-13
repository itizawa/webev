module.exports = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    BASIC_USERNAME: process.env.BASIC_USERNAME,
    BASIC_PASSWORD: process.env.BASIC_PASSWORD,
  },
  trailingSlash: true,
};
