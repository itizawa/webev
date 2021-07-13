import { useState, useEffect, useRef, VFC } from 'react';

import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Emoji, Picker, EmojiData, emojiIndex } from 'emoji-mart';

import { openFileFolderEmoji } from '~/const/emoji';
import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';
import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { useAllPages } from '~/stores/page';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';
import { EditableInput } from '~/components/Atoms/EditableInput';
import { NoPageAlert } from '~/components/Alerts/NoPageAlert';
import { OgpPreviewCard } from '~/components/organisms/OgpPreviewCard';

import { Page } from '~/domains/Page';
import { useScrapById } from '~/stores/scrap';

const emojiSize = 40;

const Index: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();
  const { id: scrapId } = router.query;

  const { data: scrap } = useScrapById({ scrapId: scrapId as string });
  console.log(scrap);

  const [isAddPage, setIsAddPage] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [searchKeyWord, setSearchKeyWord] = useState('');

  const [selectedPages, setSelectedPages] = useState<Page[]>([]);

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

  const addPageToSelectedPages = (page: Page) => {
    if (selectedPages.includes(page)) {
      return setIsAddPage(false);
    }
    setSelectedPages((prevState) => {
      return [...prevState, page];
    });
    setIsAddPage(false);
  };

  const removePageFromSelectedPages = (page: Page) => {
    setSelectedPages((prevState) => {
      return prevState.filter((v) => v !== page);
    });
    setIsAddPage(false);
  };

  const updateScrapTitle = (title: string) => {
    console.log(title);
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
        <div className="row pt-4">
          <div className="col-12 offset-md-2 col-md-8">
            <div className="d-flex gap-3 align-items-center my-2">
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
              <EditableInput value={scrap.title} onSubmit={updateScrapTitle} isHeader />
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
                  <OgpPreviewCard page={page} onClickCard={() => window.open(page.url, '_blank')} onClickClearButton={() => removePageFromSelectedPages(page)} />
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
                        if (selectedPages.includes(page)) {
                          return null;
                        }
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

const StyledEmojiPickerWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  z-index: 1300;
`;
