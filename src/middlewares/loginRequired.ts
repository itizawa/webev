import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { User } from '~/domains/User';
import { WebevApiRequest } from '~/libs/interfaces/webevApiRequest';

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
