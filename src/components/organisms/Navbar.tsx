import { FC, useState } from 'react';
import { InputForm } from '../molecules/InputForm';

type Props = {};

export const Navbar: FC<Props> = (props: Props) => {
  const [url, setUrl] = useState('');

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand mb-0 h1">Navbar</span>
        <div className="w-50">
          <InputForm inputValue={url} onChangeInputValue={setUrl} onClickSaveBtn={() => console.log('save')} />
        </div>
      </div>
    </nav>
  );
};
