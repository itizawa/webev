import { useRouter } from 'next/router';
import { VFC } from 'react';

import styled from 'styled-components';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';

import { usePageByPageId } from '~/stores/page';

const Index: VFC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: page } = usePageByPageId({ pageId: id as string });

  return (
    <>
      <WebevOgpHead title={`Webev | ${page?.title}`} />
      <LoginRequiredWrapper>
        <h1 className="text-center my-3">{page?.title}</h1>
        <StyledDiv
          className="mx-auto"
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
`;

export default Index;
