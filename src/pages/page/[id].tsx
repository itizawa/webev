import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Loader from 'react-loader-spinner';

import styled from 'styled-components';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';

import { usePageByPageId } from '~/stores/page';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { useLocale } from '~/hooks/useLocale';
import { TopSubnavBar } from '~/components/common/Parts/TopSubnavBar';
import { toastError, toastSuccess } from '~/utils/toastr';
import { restClient } from '~/utils/rest-client';
import { Page, PageStatus } from '~/domains/Page';
import { Icon } from '~/components/base/atoms/Icon';
import { PageManageDropdown } from '~/components/domain/Page/molecules/PageManageDropdown';
import { usePageForAddToDirectory, usePageForDelete } from '~/stores/modal';
import { useRemovePageFromDirectory } from '~/hooks/Page/useRemovePageFromDirectory';

const Index: WebevNextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { t } = useLocale();
  const { data: page, mutate: mutatePage } = usePageByPageId({ pageId: id as string });
  const { mutate: mutatePageForDelete } = usePageForDelete();
  const { mutate: mutateUsePageForAddToDirectory } = usePageForAddToDirectory();
  const { removePageFromDirectory } = useRemovePageFromDirectory();

  if (!page) {
    return (
      <div className="text-center pt-5">
        <Loader type="Oval" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  const isArchived = page.status === PageStatus.PAGE_STATUS_ARCHIVE;

  const openDeleteModal = async () => {
    mutatePageForDelete(page);
  };

  const handleRemovePageButton = async () => {
    try {
      await removePageFromDirectory(page._id);
      toastSuccess(t.remove_page_from_directory);
    } catch (error) {
      toastError(error);
    }
  };

  const switchArchive = async () => {
    const bool = page.status === PageStatus.PAGE_STATUS_STOCK;
    try {
      const { data } = await restClient.apiPut<Page>(`/pages/${page._id}/archive`, { isArchive: bool });
      mutatePage(data, false);
      if (bool) {
        toastSuccess(t.toastr_success_read);
      } else {
        toastSuccess(t.toastr_success_put_back);
      }
    } catch (err) {
      toastError(err);
    }
  };

  const handleClickAddPageToDirectoryButton = () => {
    mutateUsePageForAddToDirectory(page);
  };

  return (
    <>
      <WebevOgpHead title={`Webev | ${page.title}`} />
      <LoginRequiredWrapper>
        <TopSubnavBar page={page} onClickReadButton={switchArchive} />
        <div className="ms-2 d-flex align-items-center">
          {isArchived ? (
            <button className="btn btn-sm btn-secondary d-flex ms-auto" onClick={switchArchive}>
              <Icon height={20} width={20} icon="REPLY" color="WHITE" />
              <span className="ms-2 text-nowrap">{t.return_button}</span>
            </button>
          ) : (
            <button className="btn btn-sm btn-primary d-flex ms-auto" onClick={switchArchive}>
              <Icon height={20} width={20} icon="CHECK" color="WHITE" />
              <span className="ms-2 text-nowrap">{t.read_button}</span>
            </button>
          )}
          <div className="ms-2">
            <PageManageDropdown
              page={page}
              isHideArchiveButton
              onClickDeleteButton={openDeleteModal}
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

Index.getLayout = getLayout;
export default Index;
