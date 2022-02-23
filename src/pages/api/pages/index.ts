import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { PostPageByUrlUseCase } from '~/application/useCases/page/PostPageByUrlUseCase';
import { PageRepository } from '~/infrastructure/repositories/pageRepository';
import { connectDB } from '~/middlewares/dbConnect';

import { WebevApiRequest } from '~/libs/interfaces/webevApiRequest';
import { injectUserToRequest } from '~/middlewares/injectUserToRequest';
import { loginRequired } from '~/middlewares/loginRequired';

const handler = nc()
  .use(connectDB)
  .use(injectUserToRequest)
  .use(loginRequired)
  .post(async (req: WebevApiRequest<{ url: string }>, res: NextApiResponse) => {
    const { body, user } = req;

    try {
      const result = await postPageByUrlUseCase.execute({ url: body.url, userId: user._id });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default handler;

const postPageByUrlUseCase = new PostPageByUrlUseCase(new PageRepository());
