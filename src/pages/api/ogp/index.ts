import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, registerFont, loadImage } from 'canvas';

const WIDTH = 1200 as const;
const HEIGHT = 630 as const;
const DX = 0 as const;
const DY = 0 as const;
const PAGES_HEIGHT = [250, 300, 350];

const createOgp = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { title, username, pageCount, pages } = req.query;
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
  ctx.textBaseline = 'middle';

  ctx.textAlign = 'center';
  ctx.fillText(title as string, 600, 150);

  ctx.font = '40px ipagp';

  if (pages != null && Array.isArray(pages)) {
    Array.from(pages).forEach((page, index) => {
      ctx.fillText(page, 600, PAGES_HEIGHT[index]);
    });
  }
  if (parseInt(pageCount as string) > 3) {
    ctx.fillText(`...他 ${pageCount} サイト`, 900, 450);
  }

  if (username != null) {
    ctx.textAlign = 'right';
    ctx.fillText(username as string, 1150, 550);
  }

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  });
  res.end(buffer, 'binary');
};

export default createOgp;
