import Link from 'next/link';
import { VFC } from 'react';
import axios from 'axios';

import { useLocale } from '~/hooks/useLocale';

type Props = {
  data: {
    contents: Array<{
      id: string;
      title: string;
    }>;
  };
};

const Index: VFC<Props> = (props: Props) => {
  const { t } = useLocale();
  const { contents } = props.data;

  return (
    <div className="p-3">
      <div className="d-flex align-items-center mb-3">
        <h1 className="mb-0">{t.news}</h1>
      </div>
      <ul>
        {contents.map((v) => {
          return (
            <li key={v.id}>
              <Link href={`/news/${v.id}`}>
                <a className="text-white fw-bold text-decoration-none">{v.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async () => {
  const key: { headers: { [key: string]: string } } = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  };
  try {
    const response = await axios.get('https://webev.microcms.io/api/v1/news', key);
    const { data } = response;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: { contents: [] },
      },
    };
  }
};

export default Index;
