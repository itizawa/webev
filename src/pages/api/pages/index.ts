import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { PostPageByUrlUseCase } from '~/application/useCases/page/PostPageByUrlUseCase';
import { PageRepository } from '~/infrastructure/repositories/pageRepository';
import { connectDB } from '~/middlewares/dbConnect';

import { WebevApiRequest } from '~/libs/interfaces/webevApiRequest';
import { injectUserToRequest } from '~/middlewares/injectUserToRequest';

const handler = nc()
  .use(connectDB)
  .use(injectUserToRequest)
  .post(async (req: WebevApiRequest, res: NextApiResponse) => {
    const { body } = req;

    const page = await postPageByUrlUseCase.execute({ url: body.url, userId: '61f53b4331b03b00340cb4a0' });
    res.status(200).json({ success: true, data: page });
  });

export default handler;

const postPageByUrlUseCase = new PostPageByUrlUseCase(new PageRepository());
