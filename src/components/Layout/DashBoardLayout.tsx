import { FC } from 'react';
import style from '~/styles/navbarBorder.module.scss';

import { Navbar } from '~/components/organisms/Navbar';
import { Sidebar } from '~/components/organisms/Sidebar';
import { SubnavBar } from '~/components/organisms/SubnavBar';
import { PageModals } from '~/components/PageModals/PageModals';

export const DashBoardLayout: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className={`webev-nav-border ${style['nav-border']}`} />
      <nav className="sticky-top bg-dark d-flex justify-content-evenly d-md-none">
        <SubnavBar />
      </nav>
      <main className="d-flex mx-auto pt-lg-4">
        <div className="d-none d-md-block col-lg-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">{children}</div>
        <PageModals />
      </main>
    </>
  );
};
