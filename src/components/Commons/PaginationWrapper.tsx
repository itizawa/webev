import { FC } from 'react';
import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

type Props = {
  activePage: number;
  totalItemsCount: number;
  pagingLimit: number;
  changePage(number: number): void;
};

export const PaginationWrapper: FC<Props> = (props: Props) => {
  const { activePage, totalItemsCount, pagingLimit } = props;

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
          color={BootstrapColor.LIGHT}
          buttonColor={BootstrapColor.SECONDARY}
          activeColor={BootstrapColor.LIGHT}
          icon={BootstrapIcon.CHEVRON_DOUBLE_LEFT}
          disabled={activePage === 1}
          onClickButton={() => {
            props.changePage(1);
          }}
        />
        <IconButton
          color={BootstrapColor.LIGHT}
          buttonColor={BootstrapColor.SECONDARY}
          activeColor={BootstrapColor.LIGHT}
          icon={BootstrapIcon.CHEVRON_LEFT}
          disabled={activePage === 1}
          onClickButton={() => {
            props.changePage(activePage - 1);
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
  const renderPaginations = (activePage: number, paginationStart: number, maxViewPageNum: number) => {
    const paginationItems = [];
    for (let number = paginationStart; number <= maxViewPageNum; number++) {
      paginationItems.push(
        <button
          className={`btn btn-secondary ${activePage === number ? 'active' : ''}`}
          onClick={() => {
            return props.changePage(number);
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
          color={BootstrapColor.LIGHT}
          buttonColor={BootstrapColor.SECONDARY}
          activeColor={BootstrapColor.LIGHT}
          icon={BootstrapIcon.CHEVRON_DOUBLE_RIGHT}
          disabled={totalPage === activePage}
          onClickButton={() => {
            props.changePage(activePage + 1);
          }}
        />
        <IconButton
          color={BootstrapColor.LIGHT}
          buttonColor={BootstrapColor.SECONDARY}
          activeColor={BootstrapColor.LIGHT}
          icon={BootstrapIcon.CHEVRON_RIGHT}
          disabled={totalPage === activePage}
          onClickButton={() => {
            props.changePage(totalPage);
          }}
        />
      </>
    );
  };

  return (
    <div className="btn-group" role="group">
      {renderFirstPrev(activePage)}
      {renderPaginations(activePage, paginationStart, maxViewPageNum)}
      {renderNextLast(activePage, totalPage)}
    </div>
  );
};
