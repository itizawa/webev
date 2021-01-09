import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cheerio from 'cheerio';

const handler = nextConnect();

type ogpResponse = {
  image?: string;
  desc?: string;
  title?: string;
};

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;

  try {
    const result = await axios.get(url as string);
    const $ = cheerio.load(result.data);

    const response: ogpResponse = {
      image: $("meta[property='og:image']").attr('content'),
      desc: $("meta[property='og:description']").attr('content'),
      title: $("meta[property='og:title']").attr('content'),
    };

    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send({ success: false });
  }
});

export default handler;
