import { createClient } from 'microcms-js-sdk';
import { GetRequest } from 'microcms-js-sdk/dist/cjs/types';

class MicroCMSClient {
  client: {
    get: <T>({ endpoint, contentId, queries, useGlobalDraftKey }: GetRequest) => Promise<T>;
  };
  constructor() {
    this.client = createClient({
      serviceDomain: 'webev',
      apiKey: process.env.CMS_API_KEY as string,
    });
  }
}

export const microCMSClient = new MicroCMSClient();
