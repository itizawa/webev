import React, { VFC, useState, createContext, ReactNode, SetStateAction, Dispatch } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { Page } from '@monorepo/client/src/domains/Page';
import { PaginationResult } from '@monorepo/client/src/libs/interfaces/paginationResult';
import { joinUrl } from '@monorepo/client/src/utils/joinUrl';
import { restClient } from '@monorepo/client/src/utils/rest-client';

export const PagePaginationContext = createContext<{
  setSearchKeyword?: Dispatch<SetStateAction<string>>;
  activePage: number;
  setActivePage?: Dispatch<SetStateAction<number>>;
  isSortUpdatedAt: boolean;
  setIsSortUpdatedAt?: Dispatch<SetStateAction<boolean>>;
  setIsArchived?: Dispatch<SetStateAction<boolean>>;
  pagePagination?: PaginationResult<Page>;
  mutatePagePagination?: KeyedMutator<PaginationResult<Page>>;
}>({
  setSearchKeyword: undefined,
  activePage: 1,
  setActivePage: undefined,
  isSortUpdatedAt: false,
  setIsSortUpdatedAt: undefined,
  setIsArchived: undefined,
  pagePagination: undefined,
  mutatePagePagination: undefined,
});

export const PagePaginationProvider: VFC<{
  children: ReactNode;
}> = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [limit] = useState(9);
  const [isSortUpdatedAt, setIsSortUpdatedAt] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  const sort = isSortUpdatedAt ? 'updatedAt' : '-updatedAt';

  const params = [`page=${activePage}`, `limit=${limit}`, `sort=${sort}`, `isArchived=${isArchived}`];
  if (searchKeyword) params.push(`&q=${searchKeyword}`);

  const endpoint = joinUrl('/pages/list', params);

  const { data: pagePagination, mutate: mutatePagePagination } = useSWR<PaginationResult<Page>>(endpoint, (endpoint: string) =>
    restClient.apiGet(endpoint).then((result) => result.data),
  );

  return (
    <PagePaginationContext.Provider
      value={{
        setSearchKeyword,
        activePage,
        setActivePage,
        isSortUpdatedAt,
        setIsSortUpdatedAt,
        setIsArchived,
        pagePagination,
        mutatePagePagination,
      }}
    >
      {children}
    </PagePaginationContext.Provider>
  );
};
