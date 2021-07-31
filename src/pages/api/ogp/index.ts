import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, registerFont } from 'canvas';

const createOgp = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const WIDTH = 1200 as const;
  const HEIGHT = 630 as const;
  const DX = 0 as const;
  const DY = 0 as const;
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillRect(DX, DY, WIDTH, HEIGHT);

  registerFont(path.resolve('./public/fonts/ipagp.ttf'), {
    family: 'ipagp',
  });
  ctx.font = '60px ipagp';
  ctx.fillStyle = '#CCC';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('OGP画像を生成したい！！！！！', 600, 300);

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  });
  res.end(buffer, 'binary');
};

export default createOgp;
