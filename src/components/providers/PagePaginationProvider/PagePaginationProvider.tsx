import React, { VFC, useState, createContext, ReactNode, SetStateAction, Dispatch } from 'react';
import useSWR from 'swr';
import { Page } from '~/domains/Page';
import { PaginationResult } from '~/libs/interfaces/paginationResult';
import { restClient } from '~/utils/rest-client';

export const PagePaginationContext = createContext<{
  setSearchKeyword?: Dispatch<SetStateAction<string>>;
  setActivePage?: Dispatch<SetStateAction<number>>;
  isSortCreatedAt: boolean;
  setIsSortCreatedAt?: Dispatch<SetStateAction<boolean>>;
  pagePagination?: PaginationResult<Page>;
}>({
  setSearchKeyword: undefined,
  setActivePage: undefined,
  isSortCreatedAt: false,
  setIsSortCreatedAt: undefined,
  pagePagination: undefined,
});

export const PagePaginationProvider: VFC<{
  children: ReactNode;
}> = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [limit] = useState(10);
  const [isSortCreatedAt, setIsSortCreatedAt] = useState(false);

  const sort = isSortCreatedAt ? 'createdAt' : '-createdAt';

  const endpoint = `/pages/list?page=${activePage}&limit=${limit}&sort=${sort}${searchKeyword ? `&q=${searchKeyword}` : ``}`;

  const { data: pagePagination } = useSWR<PaginationResult<Page>>(endpoint, (endpoint: string) =>
    restClient.apiGet(endpoint).then((result) => result.data),
  );

  return (
    <PagePaginationContext.Provider value={{ setSearchKeyword, setActivePage, isSortCreatedAt, setIsSortCreatedAt, pagePagination }}>
      {children}
    </PagePaginationContext.Provider>
  );
};
