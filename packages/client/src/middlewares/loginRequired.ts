import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { User } from '@monorepo/client/src/domains/User';
import { WebevApiRequest } from '@monorepo/client/src/libs/interfaces/webevApiRequest';

/**
 * ログインしているかどうかチェックするミドルウェア
 * @param {NextApiRequest} req
 * @param {NextApiResponse} _res
 * @param {NextHandler} next
 */
export const loginRequired = async (req: Omit<WebevApiRequest, 'user'> & { user?: User }, res: NextApiResponse, next: NextHandler) => {
  if (!req.user) {
    return res.status(403).json({ success: false });
  }

  return next();
};
