import { useEffect, useState, VFC } from 'react';
import Loader from 'react-loader-spinner';

import { usePageListSWR, usePageStatus } from '~/stores/page';

import { useLocale } from '~/hooks/useLocale';

import { SearchTextBox } from '~/components/case/molecules/SearchTextBox';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/common/SortButtonGroup';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { PageList } from '~/components/domain/Page/molecules/PageList';

import { PageStatus } from '~/domains/Page';

const Index: VFC = () => {
  const { t } = useLocale();
  const [searchKeyWord, setSearchKeyWord] = useState('');

  const { mutate: mutatePageStatus } = usePageStatus();
  const { data: paginationResult } = usePageListSWR({ searchKeyWord });

  useEffect(() => {
    mutatePageStatus([PageStatus.PAGE_STATUS_ARCHIVE]);
  }, []);

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.read}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          <div className="d-flex align-items-center">
            <h1 className="mb-0">{t.read}</h1>
            <div className="ms-auto">
              <span className="badge rounded-pill bg-secondary text-white">{paginationResult?.totalDocs} Pages</span>
            </div>
          </div>
          <div className="my-3 d-flex flex-column flex-sm-row justify-content-between gap-3">
            <SearchTextBox onChange={(inputValue: string) => setSearchKeyWord(inputValue)} />
            <SortButtonGroup />
          </div>
          {paginationResult == null && (
            <div className="text-center pt-5">
              <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
            </div>
          )}
          {paginationResult != null && (
            <PageList pages={paginationResult.docs} pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} />
          )}
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;
