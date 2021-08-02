import Link from 'next/link';
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

import { Tooltip } from '~/components/base/atoms/Tooltip';
import { Modal } from '~/components/base/molecules/Modal';
import { PaginationWrapper } from '~/components/common/PaginationWrapper';
import { EditableInput } from '~/components/case/molecules/EditableInput';
import { EditableTextarea } from '~/components/case/molecules/EditableTextarea';
import { SearchTextBox } from '~/components/case/molecules/SearchTextBox';
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

  console.log(title);
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
      router.push(`/scrap/${scrap?._id}`);
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
          <div className="d-flex align-items-center">
            <Link href={`/scrap/${scrap._id}`}>
              <a className="btn btn-primary btn-sm text-white">{`< ${t.return_scrap}`}</a>
            </Link>
          </div>
          <StyledTitle className="d-flex flex-md-row flex-column gap-3 align-items-center justify-content-between my-2 py-2 sticky-md-top">
            <div className="d-flex align-items-center w-100">
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
              {title && <EditableInput value={title} onChange={updateScrapTitle} isHeader />}
            </div>
            <div className="d-flex align-items-center">
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
              <Tooltip disabled={selectedPages.length !== 0} text={t.tooltip_update_scrap}>
                <div id="update-scrap-button">
                  <button className="btn btn-purple btn-sm text-nowrap" onClick={handleClickUpdateButton} disabled={selectedPages.length === 0}>
                    {isPublic ? t.update_scrap : t.save_draft}
                  </button>
                </div>
              </Tooltip>
            </div>
          </StyledTitle>
          <EditableTextarea placeholder={t.scrap_description_placeholder} onChange={updateScrapBody} value={scrap.body} isAllowEmpty />
          <h2>Page</h2>
          <StyledIconButtonWrapper className="text-center my-3">
            <IconButton icon="PLUS_DOTTED" color="LIGHT" activeColor="LIGHT" onClickButton={() => setIsAddPage(true)} text={t.add_page} />
          </StyledIconButtonWrapper>
          {selectedPages.map((page) => {
            return (
              <div key={page._id} className="mb-3">
                <PagePreviewCard page={page} onClickCard={() => window.open(page.url, '_blank')} onClickClearButton={() => removePageFromSelectedPages(page)} />
              </div>
            );
          })}
        </div>
        <Modal isOpen={isAddPage} toggle={() => setIsAddPage(false)} title={t.add_page}>
          <div className="p-3">
            <div className="mb-3">
              <SearchTextBox onChange={(searchWord: string) => setSearchKeyWord(searchWord)} />
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
