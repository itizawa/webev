// NOTE: directory 一覧ページ
export const DIRECTORY_INDEX_URL = '/directory';

// NOTE: directory 詳細
export const DIRECTORY_ID_URL = '/directory/[id]';

// NOTE: ニュースページ
export const NEWS_INDEX_URL = '/news';

// NOTE: ニュース詳細ページ
export const NEWS_ID_URL = '/news/[id]';

// NOTE: ページ詳細ページ
export const PAGES_ID_URL = '/pages/[id]';

// NOTE: 利用規約ページ
export const TERM_URL = '/term';

const serverUrl = process.env.NEXT_PUBLIC_WEBEV_SERVER_URL;

export const URLS = {
  HOME_URL: '/home',
  HOW_TO_USE: 'https://creative-rice-df2.notion.site/Webev-37a3c514bcbf45ba9ce938331721d254',
  ITIZAWA_TWITTER_URL: 'https://twitter.com/itizawa_pen',
  LOGIN: '/login',
  LOGIN_URL_TO_BACKEND: `${serverUrl}/auth/google`,
  LOGOUT_URL_TO_BACKEND: `${serverUrl}/logout`,
  MAGAZINE: (id: string) => `/magazines/${id}`,
  MAGAZINES: '/magazines',
  ME: '/me',
  TOP_URL: '/',
  WEBEV_GITHUB_URL: 'https://github.com/itizaworld/webev',
  NOT_FOUND_URL: '/404',
};
