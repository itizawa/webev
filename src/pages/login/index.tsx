import { VFC } from 'react';
import { useRouter } from 'next/router';

import { signIn } from 'next-auth/client';
import { LoginRequiredWrapper } from '~/components/Authentication/LogoutRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';
import { toastError } from '~/utils/toastr';

const Index: VFC = () => {
  const router = useRouter();
  if (router.query.isRedirect) {
    toastError({ message: 'ログインが必要です' });
  }

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
