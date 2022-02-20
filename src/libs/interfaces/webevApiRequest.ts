import { NextApiRequest } from 'next';
import { Session } from 'next-auth';

export type WebevApiRequest = NextApiRequest & { user?: Session['user'] };
