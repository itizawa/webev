import { useContext } from 'react';
import { PagePaginationContext } from '~/components/providers/PagePaginationProvider/PagePaginationProvider';

export const usePagePagination = () => {
  const {
    setSearchKeyword,
    activePage,
    setActivePage,
    isSortCreatedAt,
    setIsSortCreatedAt,
    paginationPage,
    mutatePagePagination,
    isLoadingPaginationPage,
    isRead,
    setIsRead,
  } = useContext(PagePaginationContext);

  if (!setSearchKeyword || !setActivePage || !setIsSortCreatedAt || !mutatePagePagination) {
    throw new Error('Provider is not wrap');
  }

  return {
    setSearchKeyword,
    activePage,
    setActivePage,
    isSortCreatedAt,
    setIsSortCreatedAt,
    paginationPage,
    mutatePagePagination,
    isLoadingPaginationPage,
    isRead,
    setIsRead,
  };
};
