import { NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NextHandler } from 'next-connect';

import { User } from '~/domains/User';
import { WebevApiRequest } from '~/libs/interfaces/webevApiRequest';

/**
 * ログインしているuserをRequestにセットするミドルウェア
 * @param {NextApiRequest} req
 * @param {NextApiResponse} _res
 * @param {NextHandler} next
 */
export const injectUserToRequest = async (req: Omit<WebevApiRequest, 'user'> & { user?: User }, _res: NextApiResponse, next: NextHandler) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    return next();
  }

  return next();
};
