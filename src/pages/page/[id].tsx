import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

import { usePageByPageId } from '~/stores/page';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { useLocale } from '~/hooks/useLocale';
import { toastError } from '~/utils/toastr';

import { Icon } from '~/components/base/atoms/Icon';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { TopSubnavBar } from '~/components/common/Parts/TopSubnavBar';
import { PageManageDropdown } from '~/components/domain/Page/molecules/PageManageDropdown';

import { useSwitchArchive } from '~/hooks/Page/useSwitchArchive';
import { speech } from '~/utils/services';

const Page: WebevNextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { t, locale } = useLocale();
  const { data: page, mutate: mutatePage } = usePageByPageId({ pageId: id as string });
  const { isLoading, switchArchive } = useSwitchArchive();

  const [isReading, setIsReading] = useState(false);
  const [isMidway, setIsMidway] = useState(false);

  useEffect(() => {
    speech.cancel();
    setIsReading(false);
    setIsMidway(false);
  }, [locale]);

  if (!page) {
    return (
      <div className="pt-5 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleClickSwitchArchiveButton = async () => {
    try {
      await switchArchive(page.id, !false);
      mutatePage();
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  const handleClickPlayButton = () => {
    if (!page.body) return;

    if (isMidway) {
      speech.resume();
      setIsReading(true);
      return;
    }

    const div = document.createElement('div');
    div.innerHTML = page.body;
    speech.play(div.innerText, locale === 'ja' ? 'ja-JP' : 'en-US');
    setIsReading(true);
    setIsMidway(true);
  };

  const handleClickPauseButton = () => {
    speech.pause();
    setIsReading(false);
  };

  const handleClickStopButton = () => {
    speech.cancel();
    setIsReading(false);
    setIsMidway(false);
  };

  return (
    <>
      <WebevOgpHead title={`Webev | ${page.title}`} />
      <LoginRequiredWrapper>
        <TopSubnavBar
          page={page}
          onClickSwitchArchiveButton={handleClickSwitchArchiveButton}
          onClickPlayButton={handleClickPlayButton}
          onClickPauseButton={handleClickPauseButton}
          onClickStopButton={handleClickStopButton}
          isReading={isReading}
        />
        <div className="ms-2 d-flex align-items-center">
          <div className="ms-auto me-2">{speech.isEnabled && page.body && <></>}</div>
          <button className="btn btn-sm btn-primary d-flex" disabled={isLoading} onClick={handleClickSwitchArchiveButton}>
            <Icon height={20} width={20} icon="CHECK" />
            <span className="ms-2 text-nowrap">{t.read_button}</span>
          </button>
          <div className="ms-2">
            <PageManageDropdown page={page} />
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
