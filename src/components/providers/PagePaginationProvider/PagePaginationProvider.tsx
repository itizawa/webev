import React, { useState, createContext, ReactNode, SetStateAction, Dispatch, FC } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { Page } from '~/domains/Page';
import { PaginationResult } from '~/libs/interfaces/paginationResult';
import { joinUrl } from '~/utils/joinUrl';
import { restClient } from '~/utils/rest-client';

export const PagePaginationContext = createContext<{
  setSearchKeyword?: Dispatch<SetStateAction<string>>;
  activePage: number;
  setActivePage?: Dispatch<SetStateAction<number>>;
  isSortCreatedAt: boolean;
  setIsSortCreatedAt?: Dispatch<SetStateAction<boolean>>;
  paginationPage?: PaginationResult<Page>;
  mutatePagePagination?: KeyedMutator<PaginationResult<Page>>;
  isLoadingPaginationPage: boolean;
  setIsRead?: Dispatch<SetStateAction<boolean | undefined>>;
}>({
  setSearchKeyword: undefined,
  activePage: 1,
  setActivePage: undefined,
  isSortCreatedAt: false,
  setIsSortCreatedAt: undefined,
  paginationPage: undefined,
  mutatePagePagination: undefined,
  isLoadingPaginationPage: true,
  setIsRead: undefined,
});

export const PagePaginationProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [limit] = useState(9);
  const [isSortCreatedAt, setIsSortCreatedAt] = useState(false);
  const [isRead, setIsRead] = useState<boolean | undefined>(undefined);

  const sort = isSortCreatedAt ? 'createdAt' : '-createdAt';

  const params = [`page=${activePage}`, `limit=${limit}`, `sort=${sort}`];
  if (searchKeyword) params.push(`&q=${searchKeyword}`);
  if (isRead) params.push(`&isRead=${isRead}`);

  const endpoint = joinUrl('/pages/list', params);

  const {
    data: paginationPage,
    mutate: mutatePagePagination,
    isLoading: isLoadingPaginationPage,
  } = useSWR<PaginationResult<Page>>(endpoint, (endpoint: string) =>
    restClient.apiGet<{ paginationPage: PaginationResult<Page> }>(endpoint).then((result) => result.data.paginationPage),
  );

  return (
    <PagePaginationContext.Provider
      value={{
        setSearchKeyword,
        activePage,
        setActivePage,
        isSortCreatedAt,
        setIsSortCreatedAt,
        paginationPage,
        mutatePagePagination,
        isLoadingPaginationPage,
        setIsRead,
      }}
    >
      {children}
    </PagePaginationContext.Provider>
  );
};
