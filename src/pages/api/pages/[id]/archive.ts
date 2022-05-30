import { NextApiResponse } from 'next';
import nc from 'next-connect';

import { connectDB } from '~/middlewares/dbConnect';

import { WebevApiRequest } from '~/libs/interfaces/webevApiRequest';
import { injectUserToRequest } from '~/middlewares/injectUserToRequest';
import { loginRequired } from '~/middlewares/loginRequired';
import { PageRepository } from '~/infrastructure/repositories';
import { ArchivePageUseCase } from '~/application/useCases/page';

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
      const result = await archivePageUseCase.execute({ id, userId: user.id, isArchive: Boolean(isArchive) });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default handler;
