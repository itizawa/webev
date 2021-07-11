import { useState, VFC } from 'react';

import { Emoji } from 'emoji-mart';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';
import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { useAllPages } from '~/stores/page';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';
import { NoPageAlert } from '~/components/Alerts/NoPageAlert';
import { OgpPreviewCard } from '~/components/organisms/OgpPreviewCard';
import { EditableInput } from '~/components/Atoms/EditableInput';

import { Page } from '~/domains/Page';

const Index: VFC = () => {
  const { t } = useLocale();
  const [isAddPage, setIsAddPage] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [searchKeyWord, setSearchKeyWord] = useState('');

  const [selectedPages, setSelectedPages] = useState<Page[]>([]);

  const { data: paginationResult } = useAllPages({ activePage, searchKeyWord });

  const addPageToSelectedPages = (page: Page) => {
    if (selectedPages.includes(page)) {
      return setIsAddPage(false);
    }
    setSelectedPages((prevState) => {
      return [...prevState, page];
    });
    setIsAddPage(false);
  };

  return (
    <>
      <WebevOgpHead title={`Webev | New ${t.create_scrap}`} />
      <LoginRequiredWrapper>
        <div className="row pt-4">
          <div className="col-12 offset-md-2 col-md-8">
            <h1>{t.create_scrap}</h1>
            <div className="mb-3">
              <label htmlFor="scrap-title" className="form-label">
                {t.title}
              </label>
              <input type="text" className="form-control bg-white" id="scrap-title" placeholder={t.scrap_title_placeholder} />
            </div>
            <div className="mb-3">
              <label htmlFor="scrap-body" className="form-label">
                {t.description}
              </label>
              <textarea className="form-control bg-white" id="scrap-body" placeholder={t.scrap_description_placeholder} rows={3} />
            </div>
            <h2>Page</h2>
            {selectedPages.map((page) => {
              return (
                <div key={page._id} className="mb-3">
                  <OgpPreviewCard page={page} onClickCard={() => console.log(page)} />
                </div>
              );
            })}
            {isAddPage && (
              <div className="p-3 border border-secondary">
                <div className="d-flex gap-1 align-items-center mb-3">
                  <Emoji emoji="mag" size={18} />
                  <EditableInput onSubmit={(searchWord) => setSearchKeyWord(searchWord)} value={searchKeyWord} placeholder="Search..." isAllowEmpty />
                  <button className="btn btn-secondary btn-sm text-nowrap" onClick={() => setIsAddPage(false)}>
                    {t.cancel}
                  </button>
                </div>
                {paginationResult == null ? (
                  <div className="text-center pt-5">
                    <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
                  </div>
                ) : (
                  <>
                    <StyledDiv className=" overflow-scroll">
                      {paginationResult.docs.map((page) => {
                        return (
                          <div key={page._id} className="mb-3">
                            <OgpPreviewCard page={page} onClickCard={() => addPageToSelectedPages(page)} />
                          </div>
                        );
                      })}
                    </StyledDiv>
                    {paginationResult.docs.length === 0 ? (
                      <div className="col-12">
                        <NoPageAlert />
                      </div>
                    ) : (
                      <div className="text-center mt-3">
                        <PaginationWrapper
                          pagingLimit={paginationResult.limit}
                          totalItemsCount={paginationResult.totalDocs}
                          activePage={activePage}
                          mutateActivePage={(number) => setActivePage(number)}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            {!isAddPage && (
              <StyledIconButtonWrapper className="text-center mt-3">
                <IconButton
                  icon={BootstrapIcon.PLUS_DOTTED}
                  color={BootstrapColor.LIGHT}
                  activeColor={BootstrapColor.LIGHT}
                  onClickButton={() => setIsAddPage(true)}
                />
              </StyledIconButtonWrapper>
            )}
          </div>
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;

const StyledIconButtonWrapper = styled.div`
  > .btn {
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    :hover {
      background-color: rgba(200, 200, 200, 0.2);
      transition: all 300ms linear;
    }
  }
`;

const StyledDiv = styled.div`
  max-height: 300px;
`;
