import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { imagePath } from '@monorepo/client/src/libs/constants/imagePath';
import { WebevNextPage } from '@monorepo/client/src/libs/interfaces/webevNextPage';

import { useLocale } from '@monorepo/client/src/hooks/useLocale';
import { WebevOgpHead } from '@monorepo/client/src/components/common/WebevOgpHead';
import { DefaultLayout } from '@monorepo/client/src/components/common/Layout/DefaultLayout';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title="Webev | 404" />
      <h1 className="m-3 text-center">{t.this_is_the_404_page}</h1>
      <div className="w-50 mx-auto">
        <Image src={imagePath.NOT_FOUND_PAGE} height={958} width={1000} />
      </div>
      <h2 className="text-center">
        <Link href="/">
          <a className="text-white webev-anchor">{t.go_to_top}</a>
        </Link>
      </h2>
    </>
  );
};

const getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

Page.getLayout = getLayout;
export default Page;
