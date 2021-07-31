import Link from 'next/link';
import { useState, VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { ScrapTab } from '~/components/domain/Scrap/molecules/ScrapTab';

const Index: VFC = () => {
  const { t } = useLocale();
  const [activeTabType, setActiveTabType] = useState<string>('Public');

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
        <div className="btn-group btn-group-sm w-100" role="group">
          <button
            className={`col-1 btn btn-outline-primary text-white text-nowrap ${activeTabType === 'Public' ? 'active' : ''}`}
            onClick={() => setActiveTabType('Public')}
          >
            {t.publish}
          </button>
          <button
            className={`col-1 btn btn-outline-primary text-white text-nowrap ${activeTabType === 'Private' ? 'active' : ''}`}
            onClick={() => setActiveTabType('Private')}
          >
            {t.private}
          </button>
          <button
            className={`col-1 btn btn-outline-primary text-white text-nowrap ${activeTabType === 'All' ? 'active' : ''}`}
            onClick={() => setActiveTabType('All')}
          >
            {t.all_users}
          </button>
        </div>
        <div className="tab-content" id="nav-tabContent">
          <ScrapTab />
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;
