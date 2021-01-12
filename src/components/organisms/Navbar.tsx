import { FC, useState } from 'react';
import { InputForm } from '~src/components/molecules/InputForm';
import { PlusBoard } from '~src/components/icons/PlusBoard';

type Props = {};

export const Navbar: FC<Props> = (props: Props) => {
  const [url, setUrl] = useState('');

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler d-md-none d-block"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand mb-0 h1">Webev</span>
        <div className="w-50 d-none d-md-block">
          <InputForm inputValue={url} onChangeInputValue={setUrl} onClickSaveBtn={() => console.log('save')} />
        </div>
        <div className="d-md-none d-block">
          <PlusBoard />
        </div>
      </div>
    </nav>
  );
};
