import { FC, useState } from 'react';

import { apiPost } from '~/utils/rest-client';
import { usePageListSWR } from '~/stores/page';

import { InputForm } from '~/components/molecules/InputForm';
import { PlusBoard } from '~/components/icons/PlusBoard';

import { toastSuccess } from '~/utils/toastr';

export const Navbar: FC = () => {
  const [url, setUrl] = useState('');
  const { mutate: pageListMutate } = usePageListSWR();

  const handleSaveButton = async () => {
    try {
      const res = await apiPost('/pages', { url });
      const { title } = res.data;
      toastSuccess(`${title} を保存しました!`);
      pageListMutate();
      setUrl('');
    } catch (err) {
      console.log(err);
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
          <InputForm inputValue={url} onChangeInputValue={setUrl} onClickSaveBtn={handleSaveButton} />
        </div>
        <div className="d-md-none d-block">
          <PlusBoard />
        </div>
      </div>
    </nav>
  );
};
