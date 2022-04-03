import { NextApiResponse } from 'next';
import nc from 'next-connect';

import { WebevApiRequest } from '@monorepo/webev-client/src/libs/interfaces/webevApiRequest';
import { OgpAdapter } from '@monorepo/webev-client/src/infrastructure/adapters/ogpAdapter';

const ogpAdapter = new OgpAdapter();

const handler = nc().get(async (req: WebevApiRequest<{ url: string }>, res: NextApiResponse) => {
  const { url } = req.query;

  try {
    const result = await ogpAdapter.fetch(url);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default handler;
