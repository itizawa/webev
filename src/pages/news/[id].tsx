import Head from 'next/head';
import { useRouter } from 'next/router';
import { VFC } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import { format } from 'date-fns';

import { News } from '~/interfaces/news';
import { useLocale } from '~/hooks/useLocale';

type Props = {
  news: News;
};

const Index: VFC<Props> = (props: Props) => {
  const { news } = props;
  const { t } = useLocale();
  const router = useRouter();

  const handleClickReturnNewsListButton = () => {
    router.push('/news');
  };

  if (news == null) {
    return <div className="p-3"></div>;
  }

  return (
    <>
      <Head>
        <title>Webev - {news.title}</title>
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={`${news.body.substr(0, 90)}...`} />
        <meta name="twitter:title" content={news.title} />
        <meta name="twitter:description" content={`${news.body.substr(0, 90)}...`} />
      </Head>
      <div className="p-2">
        <button className="btn btn-indigo btn-sm text-white mt-2" onClick={handleClickReturnNewsListButton}>{`< ${t.return_news_list}`}</button>
        <h1 className="text-center my-3">{news.title}</h1>
        <p className="text-center">記事投稿日：{format(new Date(news.publishedAt), 'yyyy/MM/dd hh:ss')}</p>
        <StyledDiv
          className="mx-auto"
          dangerouslySetInnerHTML={{
            __html: `${news.body}`,
          }}
        />
      </div>
    </>
  );
};

const StyledDiv = styled.div`
  max-width: 800px;

  img {
    width: 100%;
    border: 3px #aaa solid;
  }

  a {
    color: #ccc;
  }
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticPaths = async () => {
  const key: { headers: { [key: string]: string } } = {
    headers: { 'X-API-KEY': process.env.CMS_API_KEY as string },
  };

  try {
    const response: { data: { contents: Array<{ id: string }> } } = await axios.get('https://webev.microcms.io/api/v1/news', key);
    const { data } = response;

    const paths = data.contents.map((content) => `/news/${content.id}`);
    return { paths, fallback: true };
  } catch (error) {
    console.log(error);
    return { paths: [], fallback: true };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id || null;
  if (id == null) {
    return {
      props: {
        news: null,
      },
    };
  }

  const key: { headers: { [key: string]: string } } = {
    headers: { 'X-API-KEY': process.env.CMS_API_KEY as string },
  };
  try {
    const response = await axios.get(`https://webev.microcms.io/api/v1/news/${id}`, key);
    const { data } = response;

    return {
      props: {
        news: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        news: null,
      },
    };
  }
};

export default Index;
