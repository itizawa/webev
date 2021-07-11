import Image from 'next/image';
import Link from 'next/link';
import { VFC } from 'react';

import { imagePath } from '~/const/imagePath';

import { useLocale } from '~/hooks/useLocale';
import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';

const Page: VFC = () => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title="Webev | 404" />
      <div className="p-3 text-center">
        <h1 className="m-3">{t.this_is_the_404_page}</h1>
        <div className="w-50 mx-auto">
          <Image src={imagePath.NOT_FOUND_PAGE} height={958} width={1000} />
        </div>
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
