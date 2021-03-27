import { VFC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { DefaultLayout } from '~/components/Layout/DefaultLayout';

const Index: VFC = () => {
  return (
    <DefaultLayout>
      <h1 className="my-3">Welcome Webev!!</h1>
      <Image src="/images/eye-catch.png" height={1260} width={2240} />
      <div className="text-center">
        <Link href="/home">
          <button className="btn btn-info text-white mt-3">さっそく 始める</button>
        </Link>
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

export default Index;
