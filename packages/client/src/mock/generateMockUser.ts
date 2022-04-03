import { User } from '@monorepo/webev-client/src/domains/User';

export const generateMockUser = (mock: Partial<User> = {}): User => {
  return new User({
    _id: mock._id || 'mockId',
    name: mock.name || 'mockName',
    description: mock.description || 'mockDescription',
    email: mock.email || 'mockEmail',
    image: mock.image || 'mockImage',
    admin: mock.admin || false,
    isExecutedTutorial: mock.isExecutedTutorial || true,
    apiTokenForExtension: mock.apiTokenForExtension || 'mockApiTokenForExtension',
    createdAt: mock.createdAt || new Date('2020-01-01T00:00:00'),
    updatedAt: mock.updatedAt || new Date('2020-01-01T00:00:00'),
  });
};
