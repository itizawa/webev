import axios from 'axios';
import { VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

const Index: VFC = (props) => {
  const { t } = useLocale();
  console.log(props);

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <h1 className="mb-0">{t.news}</h1>
      </div>
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
      props: {},
    };
  }
};

export default Index;
