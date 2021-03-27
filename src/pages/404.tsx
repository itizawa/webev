import { VFC } from 'react';
import Link from 'next/link';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DefaultLayout } from '~/components/Layout/DefaultLayout';

const Page: VFC = () => {
  return (
    <DefaultLayout>
      <div className="p-3">
        <h1 className="m-3">This is the 404 page</h1>
        <h2>
          <Link href="/home">Go to Home</Link>
        </h2>
      </div>
    </DefaultLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Page;
