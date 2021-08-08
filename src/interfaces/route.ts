export const PathNames = {
  ROOT: '/',
  NOT_FOUND: '/404',
  LOGIN: '/login',
  TERM: '/term',
  HOME: '/home',
  USER: '/user',
  USER_SETTINGS: '/user/settings',
  READ: '/read',
  DIRECTORY: '/directory',
  DIRECTORY_ID: '/directory/[id]',
  NEWS: '/news',
  NEWS_ID: '/news/[id]',
} as const;
export type PathNames = typeof PathNames[keyof typeof PathNames];

export const LayoutNames = {
  DEFAULT: 'default',
  DASHBOARD: 'dashboard',
} as const;
export type LayoutName = typeof LayoutNames[keyof typeof LayoutNames];
