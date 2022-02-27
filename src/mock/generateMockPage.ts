import { Page } from '~/domains/Page';

export const generateMockPage = (mock: Partial<Page> = {}): Page => {
  return new Page({
    _id: mock._id || 'mockId',
    url: mock.url || 'https://example.com',
    image: mock.image || 'mockImage',
    favicon: mock.favicon || 'mockFavicon',
    description: mock.description || 'mockDescription',
    title: mock.title || 'mockTitle',
    body: mock.body || 'mockBody',
    siteName: mock.siteName || 'mockSiteName',
    isDeleted: mock.isDeleted || false,
    createdUser: mock.createdUser || 'mockCreatedUser',
    createdAt: mock.createdAt || new Date('2020-01-01T00:00:00'),
    updatedAt: mock.updatedAt || new Date('2020-01-01T00:00:00'),
    archivedAt: mock.archivedAt || new Date('2020-01-01T00:00:00'),
  });
};
