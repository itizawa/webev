import Link from 'next/link';
import { useState, VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { ScrapList } from '~/components/domain/Scrap/molecules/ScrapList';
import { useCurrentUser } from '~/stores/user';

type ActiveTabType = 'PUBLIC' | 'PRIVATE' | 'ALL';

const Index: VFC = () => {
  const { t } = useLocale();
  const { data: currentUser } = useCurrentUser();
  const [activeTabType, setActiveTabType] = useState<ActiveTabType>('PUBLIC');

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.scrap}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          <div className="d-flex align-items-center">
            <h1 className="mb-0">{t.scrap}</h1>
            <div className="ms-auto">
              <Link href="/scrap/new">
                <a className="btn btn-primary btn-sm text-white">{`${t.new_create} >`}</a>
              </Link>
            </div>
          </div>
          <div className="btn-group btn-group-sm w-100 mt-3" role="group">
            <button
              className={`col-1 btn btn-outline-primary text-white text-nowrap ${activeTabType === 'PUBLIC' ? 'active' : ''}`}
              onClick={() => setActiveTabType('PUBLIC')}
            >
              {t.published}
            </button>
            <button
              className={`col-1 btn btn-outline-primary text-white text-nowrap ${activeTabType === 'PRIVATE' ? 'active' : ''}`}
              onClick={() => setActiveTabType('PRIVATE')}
            >
              {t.private}
            </button>
            <button
              className={`col-1 btn btn-outline-primary text-white text-nowrap ${activeTabType === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveTabType('ALL')}
            >
              {t.all_users}
            </button>
          </div>
          <div>
            <ScrapList targetUserId={activeTabType !== 'ALL' ? currentUser?._id : undefined} isPublic={activeTabType !== 'PRIVATE'} />
          </div>
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;
