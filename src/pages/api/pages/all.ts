import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { CountAllPagesUseCase } from '~/application/useCases/page';
import { PageRepository } from '~/infrastructure/repositories/pageRepository';
import { connectDB } from '~/middlewares/dbConnect';

import { WebevApiRequest } from '~/libs/interfaces/webevApiRequest';
const countAllPagesUseCase = new CountAllPagesUseCase(new PageRepository());

const handler = nc()
  .use(connectDB)
  .get(async (_req: WebevApiRequest, res: NextApiResponse) => {
    try {
      const result = await countAllPagesUseCase.execute();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default handler;
