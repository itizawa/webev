import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, registerFont, loadImage } from 'canvas';

const createOgp = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { title } = req.query;

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
  // Add background
  const backgroundImage = await loadImage('./public/images/scrap-ogp.png');
  ctx.drawImage(backgroundImage, 0, 0, WIDTH, HEIGHT);

  ctx.font = '60px ipagp';
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title as string, 600, 300);

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  });
  res.end(buffer, 'binary');
};

export default createOgp;
