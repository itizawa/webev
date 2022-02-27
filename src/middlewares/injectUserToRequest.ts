import { NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NextHandler } from 'next-connect';

import { User } from '~/domains/User';
import { FindByEmailUseCase } from '~/application/useCases/user';
import { UserRepository } from '~/infrastructure/repositories/userRepository';
import { WebevApiRequest } from '~/libs/interfaces/webevApiRequest';

const findByEmailUseCase = new FindByEmailUseCase(new UserRepository());
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

  const user = await findByEmailUseCase.execute({ email: session.user.email });

  if (!user) {
    return next();
  }

  req.user = user;

  return next();
};
