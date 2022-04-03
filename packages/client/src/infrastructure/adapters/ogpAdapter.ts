import axios from 'axios';
import * as cheerio from 'cheerio';
import { IOgpAdapter } from '@monorepo/webev-client/src/application/adapters/IOgpAdapter';

export class OgpAdapter implements IOgpAdapter {
  async fetch(url: string): Promise<{
    url: string;
    favicon?: string;
    title?: string;
    image?: string;
    description?: string;
    siteName?: string;
  }> {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);

    return {
      url,
      favicon: $("link[rel='icon']").attr('href') || $("link[rel='shortcut icon']").attr('href'),
      image: $("meta[property='og:image']").attr('content'),
      description: $("meta[property='og:description']").attr('content'),
      title: $("meta[property='og:title']").attr('content'),
      siteName: $("meta[property='og:site_name']").attr('content'),
    };
  }
}
