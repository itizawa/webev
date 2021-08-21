import { Page, PageStatus } from '~/domains/Page';

export const generateMockPage = (mock: Partial<Page>): Page => {
  return new Page({
    _id: mock._id || 'mockId',
    url: mock.url || 'mockUrl',
    image: mock.image || 'mockImage',
    favicon: mock.favicon || 'mockFavicon',
    description: mock.description || 'mockDescription',
    title: mock.title || 'mockTitle',
    body: mock.body || 'mockBody',
    siteName: mock.siteName || 'mockSiteName',
    directoryId: mock.directoryId || 'mockDirectoryId',
    createdUser: mock.createdUser || 'mockCreatedUser',
    status: mock.status || PageStatus.PAGE_STATUS_ARCHIVE,
    isFavorite: mock.isFavorite || false,
    createdAt: mock.createdAt || new Date(),
    updatedAt: mock.updatedAt || new Date(),
  });
};
