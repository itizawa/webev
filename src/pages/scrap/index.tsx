import Link from 'next/link';
import { VFC, useState } from 'react';

import Loader from 'react-loader-spinner';
import { useLocale } from '~/hooks/useLocale';

import { SearchTextBox } from '~/components/case/molecules/SearchTextBox';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { useScrapList } from '~/stores/scrap';
import { ScrapCard } from '~/components/domain/Scrap/molecules/ScrapCard';

const Index: VFC = () => {
  const { t } = useLocale();
  const [searchKeyWord, setSearchKeyWord] = useState('');

  const { data: paginationResult } = useScrapList({ activePage: 1, searchKeyWord });

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.scrap}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          <div className="d-flex align-items-center">
            <h1 className="mb-0">{t.scrap}</h1>
            <div className="ms-auto">
              <Link href="/scrap/new">
                <a className="btn btn-primary text-white">{`${t.create_scrap} >`}</a>
              </Link>
            </div>
          </div>
          <div className="my-3">
            <SearchTextBox onChange={(searchWord: string) => setSearchKeyWord(searchWord)} />
          </div>
          <div className="row">
            {paginationResult == null && (
              <div className="text-center pt-5">
                <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
              </div>
            )}
            {paginationResult != null && (
              <>
                {paginationResult.docs.map((scrap) => {
                  return (
                    <div className="col-xl-4 col-md-6 mb-3" key={scrap._id}>
                      <ScrapCard scrap={scrap} />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;
