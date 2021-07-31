import Link from 'next/link';
import { VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { ScrapTab } from '~/components/domain/Scrap/molecules/ScrapTab';

const Index: VFC = () => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.scrap}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          <div className="d-flex align-items-center">
            <h1 className="mb-0">{t.scrap}</h1>
            <div className="ms-auto">
              <Link href="/scrap/new">
                <a className="btn btn-primary btn-sm text-white">{`${t.create_scrap} >`}</a>
              </Link>
            </div>
          </div>
        </div>
        <ScrapTab />
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;
