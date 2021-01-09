import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ogp = require('ogp-parser');

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;

  try {
    const res = await ogp(url);

    return res.status(200).send(res);
  } catch (err) {
    return res.status(500).send({ success: false });
  }
});

export default handler;
