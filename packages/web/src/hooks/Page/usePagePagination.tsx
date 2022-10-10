import { useContext } from 'react';
import { PagePaginationContext } from '@webev/web/components/providers/PagePaginationProvider/PagePaginationProvider';

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

  if (!setSearchKeyword || !setActivePage || !setIsSortCreatedAt || !setIsRead || !mutatePagePagination) {
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
