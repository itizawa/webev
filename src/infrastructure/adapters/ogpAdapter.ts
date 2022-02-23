import axios from 'axios';
import * as cheerio from 'cheerio';
import { IOgpAdapter } from '~/application/adapters/IOgpAdapter';

export class OgpAdapter implements IOgpAdapter {
  async fetch(url: string): Promise<{
    url: string;
    title?: string;
    image?: string;
    description?: string;
    siteName?: string;
  }> {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);

    return {
      url,
      image: $("meta[property='og:image']").attr('content'),
      description: $("meta[property='og:description']").attr('content'),
      title: $("meta[property='og:title']").attr('content'),
      siteName: $("meta[property='og:site_name']").attr('content'),
    };
  }
}
