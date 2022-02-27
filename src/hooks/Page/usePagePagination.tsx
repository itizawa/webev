import { useContext } from 'react';
import { PagePaginationContext } from '~/components/providers/PagePaginationProvider/PagePaginationProvider';

export const usePagePagination = () => {
  const {
    setSearchKeyword,
    activePage,
    setActivePage,
    isSortCreatedAt,
    setIsSortCreatedAt,
    setIsArchived,
    pagePagination,
    mutatePagePagination,
  } = useContext(PagePaginationContext);

  if (!setSearchKeyword || !setActivePage || !setIsSortCreatedAt || !setIsArchived || !mutatePagePagination) {
    throw new Error('Provider is not wrap');
  }

  return {
    setSearchKeyword,
    activePage,
    setActivePage,
    isSortCreatedAt,
    setIsSortCreatedAt,
    setIsArchived,
    pagePagination,
    mutatePagePagination,
  };
};
