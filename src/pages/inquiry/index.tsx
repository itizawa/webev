import Head from 'next/head';
import { VFC } from 'react';

import styled from 'styled-components';

import { useLocale } from '~/hooks/useLocale';

const Index: VFC = () => {
  const { t } = useLocale();

  return (
    <>
      <Head>
        <title>Webev | {t.inquiry}</title>
      </Head>
      <div className="p-3">
        <h1 className="text-center">{t.inquiry}</h1>
        <StyledDiv className="mx-auto">
          <form className="mt-5">
            <div className="mb-3 row">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail" />
              </div>
            </div>
          </form>
        </StyledDiv>
      </div>
    </>
  );
};

const StyledDiv = styled.div`
  max-width: 800px;
`;

export default Index;
