import { useState, useEffect, useRef, VFC } from 'react';

import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Emoji, Picker, EmojiData, emojiIndex } from 'emoji-mart';

import { openFileFolderEmoji } from '~/const/emoji';
import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { IconButton } from '~/components/base/molecules/IconButton';

import { Modal } from '~/components/base/molecules/Modal';
import { PaginationWrapper } from '~/components/common/PaginationWrapper';
import { EditableInput } from '~/components/case/molecules/EditableInput';
import { EditableTextarea } from '~/components/case/molecules/EditableTextarea';
import { NoPageAlert } from '~/components/domain/Page/molecules/NoPageAlert';
import { PagePreviewCard } from '~/components/domain/Page/molecules/PagePreviewCard';

import { Page } from '~/domains/Page';
import { useAllPages } from '~/stores/page';
import { useScrapById } from '~/stores/scrap';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

const emojiSize = 40;

const Index: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();
  const { id: scrapId } = router.query;

  const { data: scrap } = useScrapById({ scrapId: scrapId as string });

  const [isAddPage, setIsAddPage] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [searchKeyWord, setSearchKeyWord] = useState('');

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [selectedPages, setSelectedPages] = useState<Page[]>([]);
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const { data: paginationResult } = useAllPages({ activePage, searchKeyWord });

  const [isEmojiSettingMode, setIsEmojiSettingMode] = useState<boolean>();
  const [emoji, setEmoji] = useState<EmojiData>(openFileFolderEmoji);
  const [pickerTop, setPickerTop] = useState<number>(0);
  const [pickerLeft, setPickerLeft] = useState<number>(0);
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrap != null) {
      const result = emojiIndex.search(scrap.emojiId);
      if (result != null) {
        setEmoji(result[0]);
      }
    }
  }, [scrap]);

  useEffect(() => {
    if (scrap != null) {
      setTitle(scrap.title);
      setBody(scrap.body);
      setIsPublic(scrap.isPublic);
      setSelectedPages(scrap.pages);
    }
  }, [scrap]);

  const addPageToSelectedPages = (page: Page) => {
    if (selectedPages.includes(page)) {
      return setIsAddPage(false);
    }
    setSelectedPages((prevState) => {
      return [...prevState, page];
    });
  };

  const removePageFromSelectedPages = (page: Page) => {
    setSelectedPages((prevState) => {
      return prevState.filter((v) => v !== page);
    });
    setIsAddPage(false);
  };

  const updateScrapTitle = (title: string) => {
    setTitle(title);
  };

  const updateScrapBody = (body: string) => {
    setBody(body);
  };

  const handleSelectEmoji = async (emoji: EmojiData) => {
    setEmoji(emoji);
    setIsEmojiSettingMode(false);
  };

  const handleClickEmoji = () => {
    setIsEmojiSettingMode(true);
    if (emojiRef.current != null) {
      setPickerTop(emojiRef.current.offsetTop + emojiSize + 10);
      setPickerLeft(emojiRef.current.offsetLeft);
    }
  };

  const handleClickUpdateButton = async () => {
    try {
      await restClient.apiPut(`/scraps/${scrap?._id}`, {
        property: { title, body, pages: selectedPages, emojiId: emoji.id, isPublic },
      });
      toastSuccess(t.toastr_update_scrap);
    } catch (err) {
      toastError(err);
    }
  };

  if (scrap == null) {
    return (
      <div className="text-center pt-5">
        <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  return (
    <>
      <WebevOgpHead title={`Webev | New ${t.create_scrap}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          <div className="row">
            <div className="col-12">
              <StyledTitle className="d-flex gap-3 align-items-center my-2 py-2 sticky-top">
                <div ref={emojiRef}>
                  <Emoji emoji={emoji} size={emojiSize} onClick={() => handleClickEmoji()} />
                </div>
                {isEmojiSettingMode && (
                  <>
                    <div className="position-fixed top-0 start-0 end-0 bottom-0" onClick={() => setIsEmojiSettingMode(false)} />
                    <StyledEmojiPickerWrapper top={pickerTop} left={pickerLeft}>
                      <Picker theme="dark" onSelect={(emoji) => handleSelectEmoji(emoji)} />
                    </StyledEmojiPickerWrapper>
                  </>
                )}
                <EditableInput value={title} onSubmit={updateScrapTitle} isHeader />
                <div className="px-3">
                  <div className="form-check form-switch text-nowrap">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="switchIsPublishScrap"
                      checked={isPublic}
                      onChange={() => setIsPublic((prevState) => !prevState)}
                    />
                    <label className="form-check-label" htmlFor="switchIsPublishScrap">
                      {t.publish}
                    </label>
                  </div>
                </div>
                <button className="btn btn-purple btn-sm text-nowrap" onClick={handleClickUpdateButton}>
                  {isPublic ? t.update_scrap : t.save_draft}
                </button>
              </StyledTitle>
              <EditableTextarea placeholder={t.scrap_description_placeholder} onBlur={updateScrapBody} value={scrap.body} isAllowEmpty />
              <h2>Page</h2>
              <StyledIconButtonWrapper className="text-center my-3">
                <IconButton icon="PLUS_DOTTED" color="LIGHT" activeColor="LIGHT" onClickButton={() => setIsAddPage(true)} text={t.add_page} />
              </StyledIconButtonWrapper>
              {selectedPages.map((page) => {
                return (
                  <div key={page._id} className="mb-3">
                    <PagePreviewCard
                      page={page}
                      onClickCard={() => window.open(page.url, '_blank')}
                      onClickClearButton={() => removePageFromSelectedPages(page)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Modal isOpen={isAddPage} toggle={() => setIsAddPage(false)} title={t.add_page}>
          <div className="p-3">
            <div className="d-flex gap-1 align-items-center mb-3">
              <Emoji emoji="mag" size={18} />
              <EditableInput onSubmit={(searchWord) => setSearchKeyWord(searchWord)} value={searchKeyWord} placeholder="Search..." isAllowEmpty />
            </div>
            {paginationResult == null ? (
              <div className="text-center pt-5">
                <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
              </div>
            ) : (
              <>
                <div className=" overflow-scroll">
                  {paginationResult.docs.map((page) => {
                    if (selectedPages.some((v) => v._id === page._id)) {
                      return null;
                    }
                    return (
                      <div key={page._id} className="mb-3">
                        <PagePreviewCard page={page} onClickCard={() => addPageToSelectedPages(page)} />
                      </div>
                    );
                  })}
                </div>
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
        </Modal>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;

const StyledTitle = styled.div`
  top: 4px;
  background: #0e1f25;
`;

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

const StyledEmojiPickerWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  z-index: 1300;
`;
