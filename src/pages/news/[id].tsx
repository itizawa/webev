import { useRouter } from 'next/router';
import { VFC } from 'react';

import styled from 'styled-components';

import { format } from 'date-fns';

import { News } from '~/interfaces/news';
import { useLocale } from '~/hooks/useLocale';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { microCMSClient } from '~/utils/microCMSClient';

type Props = {
  news: News;
};

const Index: VFC<Props> = (props) => {
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
      <WebevOgpHead title={news.title} description={`${news.body.replace(/(<([^>]+)>)/gi, '').substr(0, 90)}...`} image={news.thumbnail?.url} />
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
  try {
    const response = await microCMSClient.get<{ contents: News[] }>({
      endpoint: 'news',
      useGlobalDraftKey: false, // This is an option if your have set the globalDraftKey. Default value true.
    });
    console.log(response);

    const paths = response.contents.map((content) => `/news/${content.id}`);
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

  try {
    const news = await microCMSClient.get<News>({
      endpoint: 'news',
      contentId: id, // This is an option if your have set the globalDraftKey. Default value true.
    });

    return {
      props: {
        news,
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
