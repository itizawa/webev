import Head from 'next/head';
import { VFC } from 'react';
import { imagePath } from '~/const/imagePath';

type Props = {
  siteName?: string;
  title?: string;
  url?: string;
  image?: string;
  description?: string;
};

const DESCRIPTION = 'Webev は、誰でも使えるブックマークマネージャーです！URL を入力して保存するだけで Web ページを管理できます。';

export const WebevOgpHead: VFC<Props> = (props: Props) => {
  const { siteName, title, url, image, description } = props;

  return (
    <>
      <Head>
        <title>{title || 'Webev'}</title>
        <meta property="og:site_name" content={siteName || 'Webev'} />
        <meta property="og:title" content={title || 'Webev'} />
        <meta property="og:url" content={url || 'https://www.webev.cloud'} />
        <meta property="og:image" content={image || imagePath.EYE_CATCH_DARK} />
        <meta property="og:description" content={description || DESCRIPTION} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title || 'Webev'} />
        <meta property="twitter:image" content={image || imagePath.EYE_CATCH_DARK} />
        <meta name="twitter:description" content={description || DESCRIPTION} />
      </Head>
    </>
  );
};
