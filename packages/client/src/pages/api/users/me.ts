import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { WebevApiRequest } from '@monorepo/webev-client/src/libs/interfaces/webevApiRequest';
import { connectDB } from '@monorepo/webev-client/src/middlewares/dbConnect';
import { injectUserToRequest } from '@monorepo/webev-client/src/middlewares/injectUserToRequest';

const handler = nc()
  .use(connectDB)
  .use(injectUserToRequest)
  .get(async (req: WebevApiRequest, res: NextApiResponse) => {
    res.send(req.user);
  });

export default handler;
