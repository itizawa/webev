import Head from 'next/head';
import { VFC } from 'react';
import { imagePath } from '~/const/imagePath';

type Props = {
  siteName?: string;
  title?: string;
  url?: string;
  image?: string;
  description?: string;
  keywords?: string[];
};

const DESCRIPTION = 'Webev は、誰でも使えるブックマークマネージャーです！URL を入力して保存するだけで Web ページを管理できます。';
const KEYWORDS = 'bookmark,ブックマーク';

export const WebevOgpHead: VFC<Props> = (props) => {
  const { siteName, title, url, image, description, keywords = [] } = props;

  return (
    <>
      <Head>
        <title>{title || 'Webev'}</title>
        <meta name="description" content={description || DESCRIPTION} />
        <meta name="keywords" content={keywords.length > 0 ? keywords?.join(',') : KEYWORDS} />
        <meta property="og:site_name" content={siteName || 'Webev'} />
        <meta property="og:title" content={title || 'Webev'} />
        <meta property="og:url" content={url || 'https://www.webev.cloud'} />
        <meta property="og:image" content={image || `https://www.webev.cloud/${imagePath.EYE_CATCH_DARK}`} />
        <meta property="og:description" content={description || DESCRIPTION} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || 'Webev'} />
        <meta name="twitter:image" content={image || `https://www.webev.cloud/${imagePath.EYE_CATCH_DARK}`} />
        <meta name="twitter:description" content={description || DESCRIPTION} />
      </Head>
    </>
  );
};
