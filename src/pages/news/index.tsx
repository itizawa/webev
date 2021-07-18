import Link from 'next/link';
import { VFC } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import { useLocale } from '~/hooks/useLocale';
import { News } from '~/interfaces/news';
import { WebevOgpHead } from '~/components/commons/WebevOgpHead';

type Props = {
  contents: News[];
};

const Index: VFC<Props> = ({ contents }) => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.news}`} />
      <div className="p-2">
        <h1 className="text-center my-3">{t.news}</h1>
        {contents.length === 0 && <span>No News</span>}
        <StyledDiv className="mx-auto">
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
        </StyledDiv>
      </div>
    </>
  );
};

const StyledDiv = styled.div`
  max-width: 800px;
`;

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
