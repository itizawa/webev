import { NextApiResponse } from 'next';
import nc from 'next-connect';

import { connectDB } from '@monorepo/client/src/middlewares/dbConnect';

import { WebevApiRequest } from '@monorepo/client/src/libs/interfaces/webevApiRequest';
import { injectUserToRequest } from '@monorepo/client/src/middlewares/injectUserToRequest';
import { loginRequired } from '@monorepo/client/src/middlewares/loginRequired';
import { PageRepository } from '@monorepo/client/src/infrastructure/repositories';
import { ArchivePageUseCase } from '@monorepo/client/src/application/useCases/page';

const archivePageUseCase = new ArchivePageUseCase(new PageRepository());

const handler = nc()
  .use(connectDB)
  .use(injectUserToRequest)
  .use(loginRequired)
  .put(async (req: WebevApiRequest<{ isArchive: boolean }>, res: NextApiResponse) => {
    const { user } = req;
    const { id } = req.query;
    const { isArchive } = req.body;

    try {
      const result = await archivePageUseCase.execute({ id, userId: user._id, isArchive: Boolean(isArchive) });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default handler;
