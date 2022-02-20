import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { WebevApiRequest } from '~/libs/interfaces/webevApiRequest';
import { connectDB } from '~/middlewares/dbConnect';
import { injectUserToRequest } from '~/middlewares/injectUserToRequest';

const handler = nc()
  .use(connectDB)
  .use(injectUserToRequest)
  .get(async (req: WebevApiRequest, res: NextApiResponse) => {
    res.send({ user: req.user });
  });

export default handler;
