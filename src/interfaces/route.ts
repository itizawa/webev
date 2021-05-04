import { PageStatus } from '~/domains/Page';

export const PathNames = {
  ROOT: '/',
  LOGIN: '/login',
  TERM: '/term',
  HOME: '/home',
  ARCHIVED: '/archived',
  DIRECTORY: '/directory',
  DIRECTORY_ID: '/directory/[id]',
} as const;
export type PathNames = typeof PathNames[keyof typeof PathNames];

export const LayoutNames = {
  DEFAULT: 'default',
  DASHBOARD: 'dashboard',
} as const;
export type LayoutName = typeof LayoutNames[keyof typeof LayoutNames];

export const PathConfigs = {
  [PathNames.ROOT]: {
    layout: LayoutNames.DEFAULT,
    statusForFind: [PageStatus.PAGE_STATUS_STOCK],
  },
  [PathNames.LOGIN]: {
    layout: LayoutNames.DEFAULT,
    statusForFind: [PageStatus.PAGE_STATUS_STOCK],
  },
  [PathNames.TERM]: {
    layout: LayoutNames.DEFAULT,
    statusForFind: [PageStatus.PAGE_STATUS_STOCK],
  },
  [PathNames.HOME]: {
    layout: LayoutNames.DASHBOARD,
    statusForFind: [PageStatus.PAGE_STATUS_STOCK],
  },
  [PathNames.ARCHIVED]: {
    layout: LayoutNames.DASHBOARD,
    statusForFind: [PageStatus.PAGE_STATUS_ARCHIVE],
  },
  [PathNames.DIRECTORY]: {
    layout: LayoutNames.DASHBOARD,
    statusForFind: [PageStatus.PAGE_STATUS_STOCK, PageStatus.PAGE_STATUS_ARCHIVE],
  },
  [PathNames.DIRECTORY_ID]: {
    layout: LayoutNames.DASHBOARD,
    statusForFind: [PageStatus.PAGE_STATUS_STOCK, PageStatus.PAGE_STATUS_ARCHIVE],
  },
};
