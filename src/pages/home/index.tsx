import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useSWRInfinite, SWRInfiniteResponseInterface } from 'swr';
import { PaginationResult } from '~/interfaces/paginationResult';

import { OgpCard } from '~/components/organisms/OgpCard';
import { restClient } from '~/utils/rest-client';

import { Page } from '~/interfaces/page';

const Index: FC = () => {
  const { data: paginationResults, size, setSize, isValidating }: SWRInfiniteResponseInterface<PaginationResult<Page>, Error> = useSWRInfinite(
    (index) => `/pages/list?status=stocked&page=${index + 1}&limit=9`,
    (endpoint) => restClient.apiGet(endpoint).then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  let pages = [] as Page[];
  let hasNextPage = false;
  if (paginationResults != null) {
    pages = paginationResults.map((paginationResult) => paginationResult.docs).flat();
    hasNextPage = paginationResults[paginationResults.length - 1].hasNextPage;
  }

  return (
    <div className="p-3">
      <h1>Home</h1>
      <div className="row mt-4">
        {pages.map((page) => (
          <div className="col-lg-4 col-md-6 mb-3" key={page._id}>
            <OgpCard page={page} />
          </div>
        ))}
        {isValidating && (
          <div className="row mt-4" key={0}>
            {[...Array(9)].map((_, i) => (
              <div key={i} className="col-lg-4 col-md-6 mb-3">
                <Skeleton height={300} />
              </div>
            ))}
          </div>
        )}
        {hasNextPage && (
          <button className="btn btn-primary" onClick={() => setSize(size + 1)}>
            load more...
          </button>
        )}
      </div>
    </div>
  );
};

export default Index;
