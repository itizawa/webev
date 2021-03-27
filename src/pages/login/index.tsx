import { useState, VFC } from 'react';
import { useRouter } from 'next/router';

import { signIn } from 'next-auth/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { LoginRequiredWrapper } from '~/components/Authentication/LogoutRequiredWrapper';
import { DefaultLayout } from '~/components/Layout/DefaultLayout';
import { Icon } from '~/components/Icons/Icon';
import { Term } from '~/components/Term/Term';

const Index: VFC = () => {
  const router = useRouter();
  const [isCheckedAgree, setIsCheckedAgree] = useState(false);

  return (
    <LoginRequiredWrapper>
      <DefaultLayout>
        <div className="p-3">
          <h1>Login Page</h1>
          {router.query.isRedirect && <div className="alert alert-warning">ログインが必要です</div>}
          <div className="mb-3 overflow-auto border login-term p-3">
            <div className="mx-auto">
              <Term />
            </div>
          </div>
          <div className="form-check form-check-inline mb-3">
            <input className="form-check-input" type="checkbox" id="termAgreement" checked={isCheckedAgree} onChange={() => setIsCheckedAgree(!isCheckedAgree)} />
            <label className="form-check-label" htmlFor="termAgreement">
              利用規約に同意する
            </label>
          </div>
          <button type="button" className="btn btn-google text-white w-100" onClick={() => signIn('google')} disabled={!isCheckedAgree}>
            <Icon icon={BootstrapIcon.GOOGLE} color={BootstrapColor.LIGHT} />
            <span className="ms-2">Google でログインする</span>
          </button>
        </div>
      </DefaultLayout>
    </LoginRequiredWrapper>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Index;
