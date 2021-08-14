import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Loader from 'react-loader-spinner';

import styled from 'styled-components';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';

import { usePageByPageId } from '~/stores/page';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { useLocale } from '~/hooks/useLocale';

const Page: WebevNextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { t } = useLocale();
  const { data: page } = usePageByPageId({ pageId: id as string });

  if (page == null) {
    return (
      <div className="text-center pt-5">
        <Loader type="Oval" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  return (
    <>
      <WebevOgpHead title={`Webev | ${page.title}`} />
      <LoginRequiredWrapper>
        <h1 className="text-center mt-5">{page.title}</h1>
        <div className="text-center mt-3">
          <a className="text-white webev-anchor" href={page.url} target="blank" rel="noopener noreferrer">
            {t.view_original}
          </a>
        </div>
        <StyledDiv
          className="mx-auto mt-5"
          dangerouslySetInnerHTML={{
            __html: `${page?.body}`,
          }}
        />
      </LoginRequiredWrapper>
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

  pre {
    padding: 16px;
    background: black;
  }
`;

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
