import Link from 'next/link';
import { ReactNode } from 'react';

import { useRouter } from 'next/router';
import { useUserById } from '@monorepo/webev-client/src/stores/user';
import { useLocale } from '@monorepo/webev-client/src/hooks/useLocale';

import { UserIcon } from '@monorepo/webev-client/src/components/domain/User/atoms/UserIcon';
import { WebevOgpHead } from '@monorepo/webev-client/src/components/common/WebevOgpHead';
import { WebevNextPage } from '@monorepo/webev-client/src/libs/interfaces/webevNextPage';
import { DashBoardLayout } from '@monorepo/webev-client/src/components/common/Layout/DashBoardLayout';

const Page: WebevNextPage = () => {
  const { t } = useLocale();
  const router = useRouter();

  const { data: user, isValidating: isValidatingUser } = useUserById({ userId: router.query.id as string });

  if (isValidatingUser) {
    return (
      <div className="pt-5 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (user == null) {
    return (
      <div className="p-3">
        <h1 className="m-3">{t.this_is_the_404_page}</h1>
        <h2>
          <Link href="/">
            <a className="text-white webev-anchor">{t.go_to_top}</a>
          </Link>
        </h2>
      </div>
    );
  }

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.user_page}`} />
      <div className="row mt-3">
        <div className="col-md-3 col-12 text-center mb-3">
          <UserIcon image={user.image} size={140} isCircle />
        </div>
        <div className="col-md-9 col-12 d-flex flex-column gap-2">
          <h1 className="p-2">{user.name}</h1>
          <p className="p-2">{user.description}</p>
        </div>
      </div>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
