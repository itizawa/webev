import { useContext } from 'react';
import { PagePaginationContext } from '@monorepo/webev-client/src/components/providers/PagePaginationProvider/PagePaginationProvider';

export const usePagePagination = () => {
  const {
    setSearchKeyword,
    activePage,
    setActivePage,
    isSortUpdatedAt,
    setIsSortUpdatedAt,
    setIsArchived,
    pagePagination,
    mutatePagePagination,
  } = useContext(PagePaginationContext);

  if (!setSearchKeyword || !setActivePage || !setIsSortUpdatedAt || !setIsArchived || !mutatePagePagination) {
    throw new Error('Provider is not wrap');
  }

  return {
    setSearchKeyword,
    activePage,
    setActivePage,
    isSortUpdatedAt,
    setIsSortUpdatedAt,
    setIsArchived,
    pagePagination,
    mutatePagePagination,
  };
};
