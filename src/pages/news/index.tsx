import Link from 'next/link';
import { ReactNode } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import { useLocale } from '~/hooks/useLocale';
import { News } from '~/interfaces/news';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { WebevNextPage } from '~/interfaces/webevNextPage';
import { DefaultLayout } from '~/components/common/Layout/DefaultLayout';

type Props = {
  contents: News[];
};

const Page: WebevNextPage<Props> = ({ contents }) => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.news}`} />
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

const getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

Page.getLayout = getLayout;
export default Page;
