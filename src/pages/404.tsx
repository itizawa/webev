import { VFC } from 'react';
import Link from 'next/link';

import { DefaultLayout } from '~/components/Layout/DefaultLayout';
import { useLocale } from '~/hooks/useLocale';

const Page: VFC = () => {
  const { t } = useLocale();

  return (
    <DefaultLayout>
      <div className="p-3">
        <h1 className="m-3">{t.this_is_the_404_page}</h1>
        <h2>
          <Link href="/">{t.go_to_top}</Link>
        </h2>
      </div>
    </DefaultLayout>
  );
};

export default Page;
