import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, ReactNode } from 'react';

import styled from 'styled-components';

import { signIn } from 'next-auth/react';

import { imagePath } from '~/libs/constants/imagePath';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { toastSuccess } from '~/utils/toastr';
import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/common/Authentication/LogoutRequiredWrapper';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { DefaultLayout } from '~/components/common/Layout/DefaultLayout';

const Page: WebevNextPage = () => {
  const router = useRouter();
  const { t } = useLocale();

  useEffect(() => {
    if (router.query.isRedirect) {
      toastSuccess('ログインが必要です');
    }
  }, [router.query.isRedirect]);

  return (
    <>
      <WebevOgpHead title="Webev | Login" />
      <LoginRequiredWrapper>
        <StyledDiv className="mx-auto card border-0 p-4">
          <h3 className="ms-3 text-center my-3">🎉 {t.welcome_webev} 🎉</h3>
          <p>{t.tutorial_desc1}</p>
          <span className="mb-2" dangerouslySetInnerHTML={{ __html: t.login_description }} />
          <StyledLoginButtonWrapper className="text-center" role="button" onClick={() => signIn('google')}>
            <Image src={imagePath.SIGN_IN_GOOGLE} height={46} width={191} />
          </StyledLoginButtonWrapper>
        </StyledDiv>
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

Page.getLayout = getLayout;
export default Page;

const StyledDiv = styled.div`
  max-width: 400px;
  background-color: #2f363d;
`;

const StyledLoginButtonWrapper = styled.div`
  :hover {
    opacity: 0.8;
  }
`;
