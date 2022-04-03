import { NextApiResponse } from 'next';
import nc from 'next-connect';

import { connectDB } from '@monorepo/webev-client/src/middlewares/dbConnect';

import { WebevApiRequest } from '@monorepo/webev-client/src/libs/interfaces/webevApiRequest';
import { injectUserToRequest } from '@monorepo/webev-client/src/middlewares/injectUserToRequest';
import { loginRequired } from '@monorepo/webev-client/src/middlewares/loginRequired';
import { DeletePageUseCase } from '@monorepo/webev-client/src/application/useCases/page';
import { PageRepository } from '@monorepo/webev-client/src/infrastructure/repositories';

const deletePageUseCase = new DeletePageUseCase(new PageRepository());

const handler = nc()
  .use(connectDB)
  .use(injectUserToRequest)
  .use(loginRequired)
  .delete(async (req: WebevApiRequest<{ url: string }>, res: NextApiResponse) => {
    const { user } = req;
    const { id } = req.query;

    try {
      const result = await deletePageUseCase.execute({ id, userId: user._id });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default handler;
