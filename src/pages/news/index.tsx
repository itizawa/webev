import Link from 'next/link';
import { VFC } from 'react';
import axios from 'axios';

import { useLocale } from '~/hooks/useLocale';
import { News } from '~/interfaces/news';

type Props = {
  contents: News[];
};

const Index: VFC<Props> = ({ contents }: Props) => {
  const { t } = useLocale();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center mb-3">
        <h1 className="mb-0">{t.news}</h1>
      </div>
      {contents.length === 0 && <span>No News</span>}
      <ul>
        {contents.map((v) => {
          return (
            <li key={v.id} role="button">
              <Link href={`/news/${v.id}`}>
                <a className="text-white fw-bold webev-anchor">{v.title}</a>
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
    headers: { 'X-API-KEY': process.env.CMS_API_KEY as string },
  };
  try {
    const response = await axios.get('https://webev.microcms.io/api/v1/news', key);
    const { contents } = response.data;

    return {
      props: {
        contents,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        contents: [],
      },
    };
  }
};

export default Index;
