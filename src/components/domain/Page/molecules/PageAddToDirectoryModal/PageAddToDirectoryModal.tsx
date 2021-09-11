import { useState, VFC } from 'react';

import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { Emoji } from 'emoji-mart';
import { Modal } from '~/components/base/molecules/Modal';
import { toastError, toastSuccess } from '~/utils/toastr';

import { usePageForAddToDirectory } from '~/stores/modal';

import { useLocale } from '~/hooks/useLocale';
import { SearchTextBox } from '~/components/case/molecules/SearchTextBox';
import { useDirectoryPaginationResult } from '~/stores/directory';
import { BootstrapBreakpoints } from '~/libs/interfaces/variables';
import { useAddPageToDirectory } from '~/hooks/Page/useAddPageToDirectory';
import { PaginationWrapper } from '~/components/common/PaginationWrapper';

export const PageAddToDirectoryModal: VFC = () => {
  const { t } = useLocale();

  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [activePage, setActivePage] = useState(1);
  const { data: directoryPaginationResult } = useDirectoryPaginationResult({ searchKeyWord, activePage });
  const { isLoading, addPageToDirectory } = useAddPageToDirectory();
  const { data: pageForAddToDirectory, mutate: mutatePageForAddToDirectory } = usePageForAddToDirectory();

  const handleClickDirectoryList = async (directoryId: string) => {
    if (!pageForAddToDirectory || isLoading) {
      return;
    }

    try {
      await addPageToDirectory(pageForAddToDirectory._id, directoryId);
      mutatePageForAddToDirectory(null);
      toastSuccess(t.toastr_success_add_directory);
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  const closeDeleteModal = async () => {
    mutatePageForAddToDirectory(null);
  };

  return (
    <Modal isOpen={pageForAddToDirectory != null} toggle={closeDeleteModal} title={t.add_page}>
      <div className="mb-4">
        <SearchTextBox onChange={(inputValue) => setSearchKeyWord(inputValue)} />
      </div>
      {directoryPaginationResult == null && (
        <div className="text-center pt-5">
          <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
        </div>
      )}
      {directoryPaginationResult != null && (
        <>
          {directoryPaginationResult.docs.map((directory) => (
            <StyledList className="d-flex" role="button" key={directory._id} onClick={() => handleClickDirectoryList(directory._id)}>
              <div className="w-100 text-truncate">
                <StyledEmojiWrapper>
                  <Emoji emoji={directory.emojiId} size={20} />
                </StyledEmojiWrapper>
                <span className="ms-3" role="button">
                  {directory.name}
                </span>
              </div>
            </StyledList>
          ))}
          <div className="text-center mt-4">
            <PaginationWrapper
              pagingLimit={directoryPaginationResult.limit}
              totalItemsCount={directoryPaginationResult.totalDocs}
              activePage={activePage}
              mutateActivePage={(number) => setActivePage(number)}
            />
          </div>
        </>
      )}
    </Modal>
  );
};

const StyledEmojiWrapper = styled.span`
  .emoji-mart-emoji {
    vertical-align: text-bottom;
  }
`;

const StyledList = styled.li<{ isActive?: boolean }>`
  padding: 10px;
  color: #eee;
  background-color: inherit;
  border-radius: 3px;

  .manage-directory-button {
    height: 24px;
    @media (min-width: ${BootstrapBreakpoints.md}px) {
      display: none;
    }
  }

  &:hover {
    .manage-directory-button {
      display: block;
    }
  }

  ${({ isActive }) =>
    isActive
      ? `
    margin-top: 0px;
    background-color: #00acc1;
    box-shadow: 0 12px 20px -10px rgba(0, 172, 193, 0.28), 0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 172, 193, 0.2);
  `
      : `:hover {
    background-color: rgba(200, 200, 200, 0.2);
    transition: all 300ms linear;
  }`}
`;
