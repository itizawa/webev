import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Loader from 'react-loader-spinner';

import styled from 'styled-components';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';

import { usePageByPageId } from '~/stores/page';
import { WebevNextPage } from '~/interfaces/webevNextPage';

const Page: WebevNextPage = () => {
  const router = useRouter();
  const { id } = router.query;

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
      <WebevOgpHead title={`Webev | ${page?.title}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          <h1 className="text-center my-3">{page?.title}</h1>
          <StyledDiv
            className="mx-auto"
            dangerouslySetInnerHTML={{
              __html: `${page?.body}`,
            }}
          />
        </div>
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
`;

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
