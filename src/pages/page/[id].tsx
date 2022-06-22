import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { Grid, Loading } from '@nextui-org/react';
import { usePageByPageId } from '~/stores/Page';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { useLocale } from '~/hooks/useLocale';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { TopSubnavBar } from '~/components/common/Parts/TopSubnavBar';
import { PageManageDropdown } from '~/components/domain/Page/PageManageDropdown';

import { speech } from '~/utils/services';

const Page: WebevNextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { t } = useLocale();
  const { data: page } = usePageByPageId({ pageId: id as string });

  if (!page) {
    return (
      <Grid css={{ width: '100%', py: '$8', display: 'flex', justifyContent: 'center' }}>
        <Loading size="xl" color="secondary" />
      </Grid>
    );
  }

  return (
    <>
      <WebevOgpHead title={`Webev | ${page.title}`} />
      <LoginRequiredWrapper>
        <TopSubnavBar page={page} />
        <div className="ms-2 d-flex align-items-center">
          <div className="ms-auto me-2">{speech.isEnabled && page.body && <></>}</div>
          <div className="ms-2">
            <PageManageDropdown page={page} />
          </div>
        </div>
        <h1 className="text-center my-3">{page.title}</h1>
        <div className="text-center">
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
  word-break: break-all;

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

  h1 {
    padding-bottom: 5px;
    border-bottom: 2px solid #6f42c1;
  }

  p {
    line-height: 2rem;
  }

  li {
    margin-bottom: 10px;
  }

  code {
    margin: 0 5px;
  }
`;

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
