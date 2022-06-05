import { User } from '~/domains/User';

export const generateMockUser = (mock: Partial<User> = {}): User => {
  return new User({
    id: mock.id || 'mockId',
    username: mock.username || 'mockName',
    email: mock.email || 'mockEmail',
    profileUrl: mock.profileUrl || 'profileUrl',
    createdAt: mock.createdAt || new Date('2020-01-01T00:00:00'),
    updatedAt: mock.updatedAt || new Date('2020-01-01T00:00:00'),
  });
};
