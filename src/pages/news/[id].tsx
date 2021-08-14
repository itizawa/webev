import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import { format } from 'date-fns';

import { News } from '~/libs/interfaces/news';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { NEWS_INDEX_URL } from '~/libs/const/urls';

import { useLocale } from '~/hooks/useLocale';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { DefaultLayout } from '~/components/common/Layout/DefaultLayout';

type Props = {
  news: News;
};

const Page: WebevNextPage<Props> = (props) => {
  const { news } = props;
  const { t } = useLocale();
  const router = useRouter();

  const handleClickReturnNewsListButton = () => {
    router.push(NEWS_INDEX_URL);
  };

  if (news == null) {
    return <div className="p-3"></div>;
  }

  return (
    <>
      <WebevOgpHead title={news.title} description={`${news.body.replace(/(<([^>]+)>)/gi, '').substr(0, 90)}...`} image={news.thumbnail?.url} />
      <button className="btn btn-indigo btn-sm text-white mt-2" onClick={handleClickReturnNewsListButton}>{`< ${t.return_news_list}`}</button>
      <h1 className="text-center my-3">{news.title}</h1>
      <p className="text-center">記事投稿日：{format(new Date(news.publishedAt), 'yyyy/MM/dd hh:ss')}</p>
      <StyledDiv
        className="mx-auto"
        dangerouslySetInnerHTML={{
          __html: `${news.body}`,
        }}
      />
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

const getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

Page.getLayout = getLayout;
export default Page;
