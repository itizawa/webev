import { FC } from 'react';

import { InputForm } from '~/components/molecules/InputForm';
import { PlusBoard } from '~/components/icons/PlusBoard';

export const Navbar: FC = () => {
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
          <InputForm />
        </div>
        <div className="d-md-none d-block">
          <PlusBoard />
        </div>
      </div>
    </nav>
  );
};
