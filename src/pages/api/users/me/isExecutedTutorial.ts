import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { UpdateIsExecutedTutorialUseCase } from '~/application/useCases/user';
import { UserRepository } from '~/infrastructure/repositories/userRepository';
import { WebevApiRequest } from '~/libs/interfaces/webevApiRequest';
import { connectDB } from '~/middlewares/dbConnect';
import { injectUserToRequest } from '~/middlewares/injectUserToRequest';

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
