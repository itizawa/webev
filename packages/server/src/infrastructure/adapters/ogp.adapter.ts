import * as request from 'superagent';
import * as cheerio from 'cheerio';
import { IOgpAdapter } from 'src/application/adapters/IOgpAdapter';

export class OgpAdapter implements IOgpAdapter {
  async fetch(url: string): Promise<{
    url?: string;
    title?: string;
    image?: string;
    description?: string;
    siteName?: string;
  }> {
    const result = await request(url);
    const $ = cheerio.load(result.text);

    return {
      url,
      image: $("meta[property='og:image']").attr('content'),
      description: $("meta[property='og:description']").attr('content'),
      title: $("meta[property='og:title']").attr('content'),
      siteName: $("meta[property='og:site_name']").attr('content'),
    };
  }
}
