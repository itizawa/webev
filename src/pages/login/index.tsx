import { VFC } from 'react';
import { useRouter } from 'next/router';

import { signIn } from 'next-auth/client';
import { LoginRequiredWrapper } from '~/components/Authentication/LogoutRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';

const Index: VFC = () => {
  const router = useRouter();

  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        <div className="p-3">
          <h1>Login Page</h1>
          {router.query.isRedirect && <div className="alert alert-warning">ログインが必要です</div>}
          <button className="btn btn-primary" onClick={() => signIn('google')}>
            ログイン
          </button>
        </div>
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

export default Index;
