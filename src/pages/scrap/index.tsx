import Link from 'next/link';
import { VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';

const Index: VFC = () => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.scrap}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          <Link href="/scrap/new">
            <a className="text-white webev-anchor">{t.create_scrap}</a>
          </Link>
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;
