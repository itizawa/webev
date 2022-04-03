import { NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NextHandler } from 'next-connect';

import { User } from '@monorepo/client/src/domains/User';
import { FindByEmailUseCase } from '@monorepo/client/src/application/useCases/user';
import { UserRepository } from '@monorepo/client/src/infrastructure/repositories/userRepository';
import { WebevApiRequest } from '@monorepo/client/src/libs/interfaces/webevApiRequest';

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
