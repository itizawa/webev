import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, registerFont, loadImage } from 'canvas';
import { toArray } from '~/utils/toArray';

const WIDTH = 1200 as const;
const HEIGHT = 630 as const;
const DX = 0 as const;
const DY = 0 as const;
const PAGES_HEIGHT = [250, 300, 350] as const;
const MAX_WORD_COUNT_OF_SCRAP_TITLE = 25 as const;
const MAX_WORD_COUNT_OF_PAGE_TITLE = 30 as const;

const createOgp = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { title, username, pageCount, pages } = req.query;
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillRect(DX, DY, WIDTH, HEIGHT);

  registerFont(path.resolve('./public/fonts/ipagp.ttf'), {
    family: 'ipagp',
  });
  // Add background
  const backgroundImage = await loadImage(path.resolve('./public/images/scrap-ogp.png'));
  ctx.drawImage(backgroundImage, 0, 0, WIDTH, HEIGHT);

  ctx.font = '60px ipagp';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'middle';

  ctx.textAlign = 'center';
  if (typeof title === 'string') {
    const displayPage = title?.length > MAX_WORD_COUNT_OF_SCRAP_TITLE ? title?.substr(0, MAX_WORD_COUNT_OF_SCRAP_TITLE) + '...' : title;
    ctx.fillText(displayPage, 600, 150);
  }

  ctx.font = '40px ipagp';

  if (pages != null) {
    Array.from(toArray(pages)).forEach((page, index) => {
      const displayPage = page?.length > MAX_WORD_COUNT_OF_PAGE_TITLE ? page?.substr(0, MAX_WORD_COUNT_OF_PAGE_TITLE) + '...' : page;
      ctx.fillText(displayPage, 600, PAGES_HEIGHT[index]);
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

  const cacheAge = 7 * 24 * 60;
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
    'Cache-Control': `public, max-age=${cacheAge}`,
    Expires: new Date(Date.now() + cacheAge).toUTCString(),
  });
  res.end(buffer, 'binary');
};

export default createOgp;
