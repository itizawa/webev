import { createClient } from 'microcms-js-sdk';

export const microCMSClient = createClient({
  serviceDomain: 'webev',
  apiKey: process.env.CMS_API_KEY as string,
});
