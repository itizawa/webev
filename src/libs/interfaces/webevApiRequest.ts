import { NextApiRequest } from 'next';
import { User } from '~/domains/User';
export interface WebevApiRequest<T = unknown> extends NextApiRequest {
  user: User;
  query: { [key: string]: string };
  params: { [key: string]: string };
  body: T;
}
