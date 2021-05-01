import { useState, VFC } from 'react';
import { useRouter } from 'next/router';

import { signIn } from 'next-auth/client';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { LoginRequiredWrapper } from '~/components/Authentication/LogoutRequiredWrapper';
import { Icon } from '~/components/Icons/Icon';
import { Term } from '~/components/Term/Term';

const Index: VFC = () => {
  const router = useRouter();
  const [isCheckedAgree, setIsCheckedAgree] = useState(false);

  return (
    <LoginRequiredWrapper>
      <div className="p-3">
        <h1>Login Page</h1>
        {router.query.isRedirect && <div className="alert alert-warning">ログインが必要です</div>}
        <Term />
        <div className="form-check form-check-inline mb-3">
          <input className="form-check-input" type="checkbox" id="termAgreement" checked={isCheckedAgree} onChange={() => setIsCheckedAgree(!isCheckedAgree)} />
          <label className="form-check-label" htmlFor="termAgreement">
            利用規約に同意する
          </label>
        </div>
        <button type="button" className="btn btn-google w-100" onClick={() => signIn('google')} disabled={!isCheckedAgree}>
          <Icon icon={BootstrapIcon.GOOGLE} color={BootstrapColor.LIGHT} />
          <span className="ms-2">Google でログインする</span>
        </button>
      </div>
    </LoginRequiredWrapper>
  );
};

export default Index;
