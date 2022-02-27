import { useContext } from 'react';
import { PagePaginationContext } from '~/components/providers/PagePaginationProvider/PagePaginationProvider';

export const usePagePagination = () => {
  const { setSearchKeyword, setActivePage, isSortCreatedAt, setIsSortCreatedAt, pagePagination } = useContext(PagePaginationContext);

  if (!setSearchKeyword || !setActivePage || !setIsSortCreatedAt) {
    throw new Error('Provider is not wrap');
  }

  return { setSearchKeyword, setActivePage, isSortCreatedAt, setIsSortCreatedAt, pagePagination };
};
