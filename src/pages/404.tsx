import { VFC } from 'react';
import Link from 'next/link';

import { useLocale } from '~/hooks/useLocale';
import { WebevOgpHead } from '~/components/commons/WebevOgpHead';

const Page: VFC = () => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title="Webev | 404" />
      <div className="p-3">
        <h1 className="m-3">{t.this_is_the_404_page}</h1>
        <h2>
          <Link href="/">
            <a className="text-white webev-anchor">{t.go_to_top}</a>
          </Link>
        </h2>
      </div>
    </>
  );
};

export default Page;
