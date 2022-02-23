import { NextApiRequest, NextApiResponse } from 'next';
import { PostPageByUrlUseCase } from '~/application/useCases/page/PostPageByUrlUseCase';
import { PageRepository } from '~/infrastructure/repositories/pageRepository';
import dbConnect from '~/middlewares/dbConnect';

const postPageByUrlUseCase = new PostPageByUrlUseCase(new PageRepository());

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const page = await postPageByUrlUseCase.execute({ url: 'text', userId: '61f53b4331b03b00340cb4a0' });
        res.status(200).json({ success: true, data: page });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
