import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';

import { PageStatus } from '~/domains/Page';

import { usePageByPageId } from '~/stores/page';
import { usePageForAddToDirectory, usePageForDelete } from '~/stores/modal';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { useLocale } from '~/hooks/useLocale';
import { useRemovePageFromDirectory } from '~/hooks/Page/useRemovePageFromDirectory';
import { toastError, toastSuccess } from '~/utils/toastr';

import { Icon } from '~/components/base/atoms/Icon';
import { Tooltip } from '~/components/base/atoms/Tooltip';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { TopSubnavBar } from '~/components/common/Parts/TopSubnavBar';

import { PageManageDropdown } from '~/components/domain/Page/molecules/PageManageDropdown';
import { useAllDirectories } from '~/stores/directory';
import { useSwitchArchive } from '~/hooks/Page/useSwitchArchive';
import { restClient } from '~/utils/rest-client';
import { IconButton } from '~/components/base/molecules/IconButton';

const Page: WebevNextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { t, locale } = useLocale();
  const { data: page, mutate: mutatePage } = usePageByPageId({ pageId: id as string });
  const { data: allDirectories } = useAllDirectories();
  const { mutate: mutatePageForDelete } = usePageForDelete();
  const { mutate: mutateUsePageForAddToDirectory } = usePageForAddToDirectory();
  const { removePageFromDirectory } = useRemovePageFromDirectory();
  const { isLoading, switchArchive } = useSwitchArchive();

  const [isReading, setIsReading] = useState(false);
  const [lastSpeechSynthesisUtterance, setLastSpeechSynthesisUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const directoryOfPage = useMemo(() => {
    return allDirectories?.find((v) => v._id === page?.directoryId);
  }, [allDirectories, page?.directoryId]);

  const isArchived = useMemo(() => page?.status === PageStatus.PAGE_STATUS_ARCHIVE, [page?.status]);

  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setLastSpeechSynthesisUtterance(null);
  }, [locale]);

  if (!page) {
    return (
      <div className="pt-5 d-flex align-items-center justify-content-center">
        <Oval color="#00BFFF" secondaryColor="rgba(0, 191, 255, 0.7)" height={100} width={100} />
      </div>
    );
  }

  const openDeleteModal = async () => {
    mutatePageForDelete(page);
  };

  const handleRemovePageButton = async () => {
    try {
      const data = await removePageFromDirectory(page._id);
      mutatePage(data, false);
      toastSuccess(t.remove_page_from_directory);
    } catch (error) {
      if (error instanceof Error) toastError(error);
    }
  };

  const handleClickSwitchArchiveButton = async () => {
    try {
      const data = await switchArchive(page._id, !isArchived);
      mutatePage(data, false);
      if (isArchived) {
        toastSuccess(t.toastr_success_put_back);
      } else {
        toastSuccess(t.toastr_success_read);
      }
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  const handleClickAddPageToDirectoryButton = () => {
    mutateUsePageForAddToDirectory(page);
  };

  const handleFetchButton = async () => {
    try {
      await restClient.apiPut(`/pages/${page._id}/ogp`);
      toastSuccess(t.toastr_success_fetch_page);
      mutatePage();
    } catch (error) {
      if (error instanceof Error) toastError(error);
    }
  };

  const handleClickPlayButton = () => {
    if (!('speechSynthesis' in window)) {
      toastSuccess(t.not_support_text_to_speech);
      return;
    }

    if (!page.body) {
      toastSuccess(t.data_not_found);
      return;
    }

    if (lastSpeechSynthesisUtterance) {
      window.speechSynthesis.resume();
      setIsReading(true);
      return;
    }
    const speechSynthesisUtterance = new SpeechSynthesisUtterance();

    const div = document.createElement('div');
    div.innerHTML = page.body;
    speechSynthesisUtterance.text = div.innerText;
    speechSynthesisUtterance.lang = locale === 'ja' ? 'ja-JP' : 'en-US';
    speechSynthesisUtterance.rate = 1;
    speechSynthesisUtterance.pitch = 1;
    speechSynthesisUtterance.volume = 1;

    window.speechSynthesis.speak(speechSynthesisUtterance);
    setIsReading(true);
    setLastSpeechSynthesisUtterance(speechSynthesisUtterance);
  };

  const handleClickPauseButton = () => {
    window.speechSynthesis.pause();
    setIsReading(false);
  };

  const handleClickStopButton = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setLastSpeechSynthesisUtterance(null);
  };

  return (
    <>
      <WebevOgpHead title={`Webev | ${page.title}`} />
      <LoginRequiredWrapper>
        <TopSubnavBar
          page={page}
          onClickRemovePageButton={handleRemovePageButton}
          onClickSwitchArchiveButton={handleClickSwitchArchiveButton}
          onClickFetchButton={handleFetchButton}
          onClickPlayButton={handleClickPlayButton}
          onClickPauseButton={handleClickPauseButton}
          onClickStopButton={handleClickStopButton}
          isReading={isReading}
        />
        <div className="ms-2 d-flex align-items-center">
          {directoryOfPage && (
            <div className="mt-2">
              <Tooltip text={directoryOfPage.description} disabled={directoryOfPage.description.trim() === ''}>
                <Link href={`/directory/${directoryOfPage._id}`}>
                  <span role="button" className="badge bg-secondary text-white">
                    <Icon height={14} width={14} icon="DIRECTORY" color="WHITE" />
                    <span className="ms-1">{directoryOfPage.name}</span>
                  </span>
                </Link>
              </Tooltip>
            </div>
          )}
          <div className="ms-auto me-2">
            {isReading ? (
              <IconButton icon="PAUSE_CIRCLE" color="WHITE" activeColor="SUCCESS" width={24} height={24} isRemovePadding onClickButton={handleClickPauseButton} />
            ) : (
              <IconButton icon="PLAY_CIRCLE" color="WHITE" activeColor="SUCCESS" width={24} height={24} isRemovePadding onClickButton={handleClickPlayButton} />
            )}
            <IconButton icon="STOP_CIRCLE" color="WHITE" activeColor="SUCCESS" width={24} height={24} isRemovePadding onClickButton={handleClickStopButton} />
          </div>
          {isArchived ? (
            <button className="btn btn-sm btn-secondary d-flex" disabled={isLoading} onClick={handleClickSwitchArchiveButton}>
              <Icon height={20} width={20} icon="REPLY" color="WHITE" />
              <span className="ms-2 text-nowrap">{t.return_button}</span>
            </button>
          ) : (
            <button className="btn btn-sm btn-primary d-flex" disabled={isLoading} onClick={handleClickSwitchArchiveButton}>
              <Icon height={20} width={20} icon="CHECK" color="WHITE" />
              <span className="ms-2 text-nowrap">{t.read_button}</span>
            </button>
          )}
          <div className="ms-2">
            <PageManageDropdown
              page={page}
              onClickDeleteButton={openDeleteModal}
              onClickSwitchArchiveButton={handleClickSwitchArchiveButton}
              onClickRemovePageButton={handleRemovePageButton}
              onClickAddPageToDirectoryButton={handleClickAddPageToDirectoryButton}
              onClickFetchButton={handleFetchButton}
            />
          </div>
        </div>
        <h1 className="text-center my-3">{page.title}</h1>
        <div className="text-center">
          <a className="text-white webev-anchor" href={page.url} target="blank" rel="noopener noreferrer">
            {t.view_original}
          </a>
        </div>
        <StyledDiv
          className="mx-auto mt-5"
          dangerouslySetInnerHTML={{
            __html: `${page?.body}`,
          }}
        />
      </LoginRequiredWrapper>
    </>
  );
};

const StyledDiv = styled.div`
  max-width: 800px;
  word-break: break-all;

  img {
    width: 100%;
    border: 3px #aaa solid;
  }

  a {
    color: #ccc;
  }

  pre {
    padding: 16px;
    background: black;
  }

  h1 {
    padding-bottom: 5px;
    border-bottom: 2px solid #6f42c1;
  }

  p {
    line-height: 2rem;
  }

  li {
    margin-bottom: 10px;
  }

  code {
    margin: 0 5px;
  }
`;

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
