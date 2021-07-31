import { VFC, useState } from 'react';

import Loader from 'react-loader-spinner';

import { ScrapCard } from '~/components/domain/Scrap/molecules/ScrapCard';
import { SearchTextBox } from '~/components/case/molecules/SearchTextBox';
import { useScrapList } from '~/stores/scrap';

type Props = {
  targetUserId?: string;
  isPublic?: boolean;
};

export const ScrapList: VFC<Props> = ({ targetUserId, isPublic }) => {
  const [searchKeyWord, setSearchKeyWord] = useState('');

  const { data: paginationResult } = useScrapList({ activePage: 1, searchKeyWord, userId: targetUserId, isPublic });

  return (
    <>
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
    </>
  );
};
