import { NextApiRequest } from 'next';
import { User } from '~/domains/User';

export type WebevApiRequest = NextApiRequest & { user: User };
