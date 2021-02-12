import { FC } from 'react';

import { signIn, useSession, signOut } from 'next-auth/client';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';
import { usePageListSWR } from '~/stores/page';

import { InputForm } from '~/components/molecules/InputForm';
import { PlusBoard } from '~/components/icons/PlusBoard';

export const Navbar: FC = () => {
  const { mutate: pageListMutate } = usePageListSWR();
  const [session] = useSession();

  const savePage = async (url: string): Promise<void> => {
    try {
      const res = await restClient.apiPost('/pages', { url });
      const { title } = res.data;
      toastSuccess(`${title} を保存しました!`);
      pageListMutate();
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <button
          className="navbar-toggler d-lg-none d-block"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand mb-0 h1 text-white">Webev</span>
        <div className="w-50 d-none d-md-block">
          <InputForm onSubmitForm={savePage} />
        </div>
        <div className="d-md-none d-block">
          <PlusBoard />
        </div>
        {!session && (
          <button className="btn btn-primary" onClick={() => signIn('google')}>
            ログイン
          </button>
        )}
        {session && (
          <button className="btn btn-primary" onClick={() => signOut()}>
            ログアウト
          </button>
        )}
      </div>
    </nav>
  );
};
