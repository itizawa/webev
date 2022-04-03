import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { PostPageByUrlUseCase } from '@monorepo/webev-client/src/application/useCases/page/PostPageByUrlUseCase';
import { PageRepository } from '@monorepo/webev-client/src/infrastructure/repositories/pageRepository';
import { connectDB } from '@monorepo/webev-client/src/middlewares/dbConnect';

import { WebevApiRequest } from '@monorepo/webev-client/src/libs/interfaces/webevApiRequest';
import { injectUserToRequest } from '@monorepo/webev-client/src/middlewares/injectUserToRequest';
import { loginRequired } from '@monorepo/webev-client/src/middlewares/loginRequired';

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
