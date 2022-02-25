import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { PageRepository } from '~/infrastructure/repositories/pageRepository';
import { connectDB } from '~/middlewares/dbConnect';

import { WebevApiRequest } from '~/libs/interfaces/webevApiRequest';
import { injectUserToRequest } from '~/middlewares/injectUserToRequest';
import { loginRequired } from '~/middlewares/loginRequired';
import { FindPagesUseCase } from '~/application/useCases/page';
import { PaginationOptions } from '~/libs/interfaces/pagination';
import { Page } from '~/domains/Page';

const findPagesUseCase = new FindPagesUseCase(new PageRepository());

const handler = nc()
  .use(connectDB)
  .use(injectUserToRequest)
  .use(loginRequired)
  .get(async (req: WebevApiRequest, res: NextApiResponse) => {
    const { user } = req;
    const { sort, page = '1', limit = '10', q = '' } = req.query;

    const query: Partial<Page> & { $or?: Array<{ url?: RegExp; title?: RegExp; siteName?: RegExp; description?: RegExp }> } = {
      createdUser: user._id,
      isDeleted: false,
    };

    if (q) {
      query.$or = [{ url: new RegExp(q) }, { title: new RegExp(q) }, { siteName: new RegExp(q) }, { description: new RegExp(q) }];
    }

    const options = new PaginationOptions({ page: parseInt(page), limit: parseInt(limit), sort });

    try {
      const result = await findPagesUseCase.execute(query, options);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default handler;
