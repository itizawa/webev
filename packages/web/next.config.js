module.exports = {
  pwa: {
    dest: "public", // output dir
    disable: process.env.NODE_ENV === 'development',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
  },
  env: {
    NEXT_PUBLIC_WEBEV_SERVER_URL: process.env.NEXT_PUBLIC_WEBEV_SERVER_URL
  },
};
