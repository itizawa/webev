import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';

import Loader from 'react-loader-spinner';
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

const Page: WebevNextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { t } = useLocale();
  const { data: page, mutate: mutatePage } = usePageByPageId({ pageId: id as string });
  const { data: allDirectories } = useAllDirectories();
  const { mutate: mutatePageForDelete } = usePageForDelete();
  const { mutate: mutateUsePageForAddToDirectory } = usePageForAddToDirectory();
  const { removePageFromDirectory } = useRemovePageFromDirectory();
  const { isLoading, switchArchive } = useSwitchArchive();

  const directoryOfPage = useMemo(() => {
    return allDirectories?.find((v) => v._id === page?.directoryId);
  }, [allDirectories, page?.directoryId]);

  const isArchived = useMemo(() => page?.status === PageStatus.PAGE_STATUS_ARCHIVE, [page?.status]);

  if (!page) {
    return (
      <div className="text-center pt-5">
        <Loader type="Oval" color="#00BFFF" height={100} width={100} />
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
      toastError(error);
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

  return (
    <>
      <WebevOgpHead title={`Webev | ${page.title}`} />
      <LoginRequiredWrapper>
        <TopSubnavBar page={page} onClickRemovePageButton={handleRemovePageButton} onClickSwitchArchiveButton={handleClickSwitchArchiveButton} />
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
          {isArchived ? (
            <button className="btn btn-sm btn-secondary d-flex ms-auto" disabled={isLoading} onClick={handleClickSwitchArchiveButton}>
              <Icon height={20} width={20} icon="REPLY" color="WHITE" />
              <span className="ms-2 text-nowrap">{t.return_button}</span>
            </button>
          ) : (
            <button className="btn btn-sm btn-primary d-flex ms-auto" disabled={isLoading} onClick={handleClickSwitchArchiveButton}>
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
