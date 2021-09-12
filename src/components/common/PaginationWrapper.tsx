import { VFC } from 'react';
import { IconButton } from '~/components/base/molecules/IconButton';

type Props = {
  totalItemsCount: number;
  pagingLimit: number;
  activePage: number;
  mutateActivePage: (page: number) => void;
};

export const PaginationWrapper: VFC<Props> = (props) => {
  const { totalItemsCount, pagingLimit, activePage, mutateActivePage } = props;

  const handlePaginationButton = (page: number) => {
    mutateActivePage(page);
  };

  // calc totalPageNumber
  const totalPage = Math.floor(totalItemsCount / pagingLimit) + (totalItemsCount % pagingLimit === 0 ? 0 : 1);

  let paginationStart = activePage - 2;
  let maxViewPageNum = activePage + 2;
  // if pagiNation Number area size = 5 , pageNumber is calculated here
  // activePage Position calculate ex. 4 5 [6] 7 8 (Page8 over is Max), 3 4 5 [6] 7 (Page7 is Max)
  if (paginationStart < 1) {
    const diff = 1 - paginationStart;
    paginationStart += diff;
    maxViewPageNum = Math.min(totalPage, maxViewPageNum + diff);
  }
  if (maxViewPageNum > totalPage) {
    const diff = maxViewPageNum - totalPage;
    maxViewPageNum -= diff;
    paginationStart = Math.max(1, paginationStart - diff);
  }

  /**
   * generate Elements of Pagination First Prev
   * ex.  <<   <   1  2  3  >  >>
   * this function set << & <
   */
  const renderFirstPrev = (activePage: number) => {
    return (
      <>
        <IconButton
          color="LIGHT"
          buttonColor="SECONDARY"
          activeColor="LIGHT"
          icon="CHEVRON_DOUBLE_LEFT"
          disabled={activePage === 1}
          onClickButton={() => {
            handlePaginationButton(1);
          }}
        />
        <IconButton
          color="LIGHT"
          buttonColor="SECONDARY"
          activeColor="LIGHT"
          icon="CHEVRON_LEFT"
          disabled={activePage === 1}
          onClickButton={() => {
            handlePaginationButton(activePage - 1);
          }}
        />
      </>
    );
  };

  /**
   * generate Elements of Pagination First Prev
   *  ex. << < 4 5 6 7 8 > >>, << < 1 2 3 4 > >>
   * this function set  numbers
   */
  const renderPagination = (activePage: number, paginationStart: number, maxViewPageNum: number) => {
    const paginationItems = [];
    for (let number = paginationStart; number <= maxViewPageNum; number++) {
      paginationItems.push(
        <button
          key={number}
          className={`btn btn-secondary ${activePage === number ? 'active' : ''}`}
          onClick={() => {
            return handlePaginationButton(number);
          }}
        >
          {number}
        </button>,
      );
    }
    return paginationItems;
  };

  /**
   * generate Elements of Pagination First Prev
   * ex.  <<   <   1  2  3  >  >>
   * this function set > & >>
   */
  const renderNextLast = (activePage: number, totalPage: number) => {
    return (
      <>
        <IconButton
          color="LIGHT"
          buttonColor="SECONDARY"
          activeColor="LIGHT"
          icon="CHEVRON_DOUBLE_RIGHT"
          disabled={totalPage === activePage}
          onClickButton={() => {
            handlePaginationButton(activePage + 1);
          }}
        />
        <IconButton
          color="LIGHT"
          buttonColor="SECONDARY"
          activeColor="LIGHT"
          icon="CHEVRON_RIGHT"
          disabled={totalPage === activePage}
          onClickButton={() => {
            handlePaginationButton(totalPage);
          }}
        />
      </>
    );
  };

  return (
    <div className="btn-group" role="group">
      {renderFirstPrev(activePage)}
      {renderPagination(activePage, paginationStart, maxViewPageNum)}
      {renderNextLast(activePage, totalPage)}
    </div>
  );
};
