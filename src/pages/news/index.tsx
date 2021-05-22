import Link from 'next/link';
import { VFC } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
      {contents.length === 0 && <span>No News</span>}
      <ul>
        {contents.map((v) => {
          return (
            <li key={v.id} role="button">
              <Link href={`/news/${v.id}`}>
                <StyledAnchor className="text-white fw-bold">{v.title}</StyledAnchor>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const StyledAnchor = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

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
