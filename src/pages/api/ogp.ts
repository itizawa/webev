import nextConnect from 'next-connect';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ogp = require('ogp-parser');

const handler = nextConnect();

handler.get(async (req: any, res: any) => {
  const { url } = req.query;

  try {
    const ogpData = await ogp(url);

    return res.status(200).send({ ogpData });
  } catch (err) {
    return res.status(500).send({ success: false });
  }
});

export default handler;
