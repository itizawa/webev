import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { UpdateIsExecutedTutorialUseCase } from '@monorepo/client/src/application/useCases/user';
import { UserRepository } from '@monorepo/client/src/infrastructure/repositories/userRepository';
import { WebevApiRequest } from '@monorepo/client/src/libs/interfaces/webevApiRequest';
import { connectDB } from '@monorepo/client/src/middlewares/dbConnect';
import { injectUserToRequest } from '@monorepo/client/src/middlewares/injectUserToRequest';

const updateIsExecutedTutorialUseCase = new UpdateIsExecutedTutorialUseCase(new UserRepository());

const handler = nc()
  .use(connectDB)
  .use(injectUserToRequest)
  .put(async (req: WebevApiRequest, res: NextApiResponse) => {
    if (!req.user) {
      return res.status(403).json({ success: false });
    }

    try {
      const user = await updateIsExecutedTutorialUseCase.execute({ userId: req.user._id });

      res.send(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default handler;
