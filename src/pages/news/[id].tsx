import { VFC } from 'react';
import axios from 'axios';

import { format } from 'date-fns';

type Props = {
  news: {
    id: string;
    title: string;
    publishedAt: Date;
    body: string;
  };
};

const Index: VFC<Props> = (props: Props) => {
  const { news } = props;

  if (news == null) {
    return <div className="p-3"></div>;
  }

  return (
    <div className="p-3">
      <div className="d-flex align-items-center mb-3">
        <h1 className="mb-0">{news.title}</h1>
      </div>
      <p>記事投稿日：{format(new Date(news.publishedAt), 'yyyy/MM/dd hh:ss')}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${news.body}`,
        }}
      />
    </div>
  );
};

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
