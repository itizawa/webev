import { VFC } from 'react';

import { signIn } from 'next-auth/client';
import { LoginRequiredWrapper } from '~/components/Authentication/LogoutRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';

const Index: VFC = () => {
  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        <div className="p-3">
          <h1>Login Page</h1>
          <button className="btn btn-primary" onClick={() => signIn('google')}>
            ログイン
          </button>
        </div>
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

export default Index;
