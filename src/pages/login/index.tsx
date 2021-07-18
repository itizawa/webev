import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, VFC } from 'react';

import styled from 'styled-components';

import { signIn } from 'next-auth/client';

import { LoginRequiredWrapper } from '~/components/Authentication/LogoutRequiredWrapper';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { imagePath } from '~/const/imagePath';
import { toastSuccess } from '~/utils/toastr';
import { useLocale } from '~/hooks/useLocale';

const Index: VFC = () => {
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
        <div className="pt-5">
          <StyledDiv className="mx-auto card border-0 p-4">
            <h3 className="ms-3 text-center my-3">🎉 {t.welcome_webev} 🎉</h3>
            <p>{t.tutorial_desc1}</p>
            <span className="mb-2" dangerouslySetInnerHTML={{ __html: t.login_description }} />
            <StyledLoginButtonWrapper className="text-center" role="button" onClick={() => signIn('google')}>
              <Image src={imagePath.SIGNIN_GOOGLE} height={46} width={191} />
            </StyledLoginButtonWrapper>
          </StyledDiv>
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;

const StyledDiv = styled.div`
  max-width: 400px;
  background-color: #2f363d;
`;

const StyledLoginButtonWrapper = styled.div`
  :hover {
    opacity: 0.8;
  }
`;
