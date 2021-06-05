import { Head } from 'next/document';
import { VFC } from 'react';
type Props = {
  siteName?: string;
  title?: string;
  url?: string;
  description?: string;
};
export const WebevOgpHead: VFC<Props> = (props: Props) => {
  const { siteName, title, url, description } = props;
  return (
    <Head>
      <meta property="og:site_name" content={siteName || 'Webev'} />
      <meta property="og:title" content={title || 'Webev'} />
      <meta property="og:url" content={url || 'https://www.webev.cloud'} />
      <meta
        property="og:description"
        content={description || 'Webev は、誰でも使えるブックマークマネージャーです！URL を入力して保存するだけで Web ページを管理できます。'}
      />
    </Head>
  );
};
