import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState, useRef, ReactNode } from 'react';

import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { Emoji, Picker, EmojiData, emojiIndex } from 'emoji-mart';
import { useDebouncedCallback } from 'use-debounce';

import { openFileFolderEmoji } from '~/libs/const/emoji';
import { useLocale } from '~/hooks/useLocale';

import { useAllDirectories, useAllParentDirectories, useAncestorDirectories, useDirectoryChildren, useDirectoryInformation } from '~/stores/directory';
import { useDirectoryId, usePageListSWR, usePageStatus, useSearchKeyWord } from '~/stores/page';
import {
  useDirectoryForDelete,
  useParentDirectoryForCreateDirectory,
  useDirectoryForRename,
  useDirectoryForSavePage,
  useDirectoryForImport,
} from '~/stores/modal';
import { useUrlFromClipBoard } from '~/stores/contexts';

import { IconButton } from '~/components/base/molecules/IconButton';
import { Tooltip } from '~/components/base/atoms/Tooltip';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/common/SortButtonGroup';
import { Icon } from '~/components/base/atoms/Icon';
import { PageList } from '~/components/domain/Page/molecules/PageList';
import { EditableInput } from '~/components/case/molecules/EditableInput';
import { DirectoryListItem } from '~/components/domain/Directory/molecules/DirectoryListItem';

import { Directory } from '~/domains/Directory';
import { PageStatus } from '~/domains/Page';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';
import { SearchTextBox } from '~/components/case/molecules/SearchTextBox';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';

const emojiSize = 40;

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  const router = useRouter();
  const { id } = router.query;

  const { mutate: mutateDirectoryId } = useDirectoryId();
  const { mutate: mutateDirectoryForDelete } = useDirectoryForDelete();
  const { mutate: mutateDirectoryForRename } = useDirectoryForRename();
  const { mutate: mutateParentDirectoryForCreateDirectory } = useParentDirectoryForCreateDirectory();
  const { mutate: mutateDirectoryForImport } = useDirectoryForImport();

  const { data: urlFromClipBoard } = useUrlFromClipBoard();
  const { mutate: mutateDirectoryForSavePage } = useDirectoryForSavePage();

  mutateDirectoryId(id as string);
  const { data: directory, mutate: mutateDirectory } = useDirectoryInformation(id as string);
  const { data: ancestorDirectories } = useAncestorDirectories(id as string);
  const { data: paginationResult } = usePageListSWR();
  const { data: childrenDirectoryTrees, mutate: mutateDirectoryChildren } = useDirectoryChildren(directory?._id);
  const { mutate: mutateAllDirectories } = useAllDirectories();
  const { mutate: mutateAllParentDirectories } = useAllParentDirectories();
  const { mutate: mutateSearchKeyword } = useSearchKeyWord();

  const [isEmojiSettingMode, setIsEmojiSettingMode] = useState<boolean>();
  const [emoji, setEmoji] = useState<EmojiData>(openFileFolderEmoji);
  const [pickerTop, setPickerTop] = useState<number>(0);
  const [pickerLeft, setPickerLeft] = useState<number>(0);
  const emojiRef = useRef<HTMLDivElement>(null);

  const [newDirectoryName, setNewDirectoryName] = useState<string>('');
  const [newDirectoryDescription, setNewDirectoryDescription] = useState<string>('');

  const updateDirectoryName = async (name: string): Promise<void> => {
    // 前回から変更がなかったら何もしない
    if (!directory || name === directory?.name) {
      return;
    }
    try {
      await restClient.apiPut<Directory>(`/directories/${directory?._id}/rename`, { name });
      mutateAllParentDirectories();
      mutateDirectoryChildren();
      mutateAllDirectories();
    } catch (err) {
      toastError(err);
    }
  };

  const debounceUpdateDirectoryName = useDebouncedCallback(updateDirectoryName, 300);
  useEffect(() => {
    debounceUpdateDirectoryName(newDirectoryName);
  }, [newDirectoryName]);

  const updateDirectoryDescription = async (description: string): Promise<void> => {
    // 前回から変更がなかったら何もしない
    if (!directory || description === directory?.description) {
      return;
    }
    try {
      const { data } = await restClient.apiPut<Directory>(`/directories/${directory?._id}/description`, { description });
      mutateDirectory(data, false);
      mutateAllDirectories();
    } catch (err) {
      toastError(err);
    }
  };

  const debounceUpdateDirectoryDescription = useDebouncedCallback(updateDirectoryDescription, 300);
  useEffect(() => {
    debounceUpdateDirectoryDescription(newDirectoryDescription);
  }, [newDirectoryDescription]);

  useEffect(() => {
    if (directory) {
      setNewDirectoryName(directory.name);
      setNewDirectoryDescription(directory.description);
    }
  }, [directory]);

  useEffect(() => {
    if (directory != null) {
      const result = emojiIndex.search(directory.emojiId);
      if (result != null) {
        setEmoji(result[0]);
      }
    }
  }, [directory]);

  const { mutate: mutatePageStatus } = usePageStatus();

  useEffect(() => {
    mutatePageStatus([PageStatus.PAGE_STATUS_ARCHIVE, PageStatus.PAGE_STATUS_STOCK]);
  }, []);

  const openDeleteModal = (directory: Directory) => {
    mutateDirectoryForDelete(directory);
  };

  const openRenameModal = (directory: Directory) => {
    mutateDirectoryForRename(directory);
  };

  const openAddDirectoryModal = (directory: Directory) => {
    mutateParentDirectoryForCreateDirectory(directory);
  };

  const openImportModal = (directory: Directory) => {
    mutateDirectoryForImport(directory);
  };

  const updateDirectoryName = async (name: string): Promise<void> => {
    try {
      await restClient.apiPut(`/directories/${directory?._id}/rename`, { name });
      mutateAllParentDirectories();
      mutateDirectoryChildren();
      mutateAllDirectories();
    } catch (err) {
      toastError(err);
    }
  };

  const updateDirectoryDescription = async (description: string): Promise<void> => {
    try {
      await restClient.apiPut(`/directories/${directory?._id}/description`, { description });
      mutateAllDirectories();
    } catch (err) {
      toastError(err);
    }
  };

  const handleSelectEmoji = async (emoji: EmojiData) => {
    const emojiId = emoji.id;

    try {
      await restClient.apiPut(`/directories/${directory?._id}/emoji`, { emojiId });
      mutateDirectory();
      toastSuccess(t.toastr_update_emoji);
      setEmoji(emoji);
      setIsEmojiSettingMode(false);
      mutateAllParentDirectories();
    } catch (error) {
      toastError(error);
    }
  };

  const handleClickEmoji = () => {
    setIsEmojiSettingMode(true);
    if (emojiRef.current != null) {
      setPickerTop(emojiRef.current.offsetTop + emojiSize + 10);
      setPickerLeft(emojiRef.current.offsetLeft);
    }
  };

  if (directory == null) {
    return (
      <div className="text-center pt-5">
        <Loader type="Oval" color="#00BFFF" height={64} width={64} />
      </div>
    );
  }

  return (
    <>
      <WebevOgpHead title={`Webev | ${directory.name}`} />
      <LoginRequiredWrapper>
        {directory != null && (
          <>
            <div className="text-nowrap overflow-scroll small pb-2 pb-md-0">
              <Link href="/directory">
                <a className="webev-anchor text-white">{t.directory}</a>
              </Link>
              <span className="mx-1">{'/'}</span>
              {ancestorDirectories?.map((ancestorDirectory) => {
                const targetDirectory = ancestorDirectory.ancestor as Directory;
                if (targetDirectory._id === directory._id) {
                  return null;
                }
                return (
                  <Fragment key={targetDirectory._id}>
                    <Link href={`/directory/${targetDirectory._id}`}>
                      <a className="webev-anchor text-white">{targetDirectory.name}</a>
                    </Link>
                    <span className="mx-1">{'/'}</span>
                  </Fragment>
                );
              })}
            </div>
            <div className="d-flex gap-3 align-items-center my-2">
              <div ref={emojiRef}>
                <Emoji emoji={emoji} size={emojiSize} onClick={() => handleClickEmoji()} />
              </div>
              <EditableInput value={newDirectoryName} onChange={setNewDirectoryName} isHeader />
              <Tooltip text={t.save_to_directory(directory.name)}>
                <div id="save-page-to-directory">
                  <IconButton
                    width={18}
                    height={18}
                    icon="SAVE"
                    color="SECONDARY"
                    activeColor="WARNING"
                    isActive={urlFromClipBoard != null}
                    onClickButton={() => mutateDirectoryForSavePage(directory)}
                  />
                </div>
              </Tooltip>
              <UncontrolledDropdown direction="down">
                <DropdownToggle tag="div">
                  <IconButton width={18} height={18} icon="THREE_DOTS_HORIZONTAL" color="SECONDARY" activeColor="WARNING" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-dark" positionFixed right>
                  <DropdownItem tag="button" onClick={() => openDeleteModal(directory)}>
                    <Icon icon="TRASH" color="WHITE" />
                    <span className="ms-2">{t.delete}</span>
                  </DropdownItem>
                  <DropdownItem tag="button" onClick={() => openRenameModal(directory)}>
                    <Icon icon="PENCIL" color="WHITE" />
                    <span className="ms-2">{t.rename_directory}</span>
                  </DropdownItem>
                  <DropdownItem tag="button" onClick={() => openAddDirectoryModal(directory)}>
                    <Icon icon="ADD_TO_DIRECTORY" color="WHITE" />
                    <span className="ms-2">{t.create_directory}</span>
                  </DropdownItem>
                  <DropdownItem tag="button" onClick={() => openImportModal(directory)}>
                    <Icon icon="ADD_TO_DIRECTORY" color="WHITE" />
                    <span className="ms-2">{t.import}</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            {isEmojiSettingMode && (
              <>
                <div className="position-fixed top-0 start-0 end-0 bottom-0" onClick={() => setIsEmojiSettingMode(false)} />
                <StyledEmojiPickerWrapper top={pickerTop} left={pickerLeft}>
                  <Picker theme="dark" onSelect={(emoji) => handleSelectEmoji(emoji)} title="Webev" emoji="" />
                </StyledEmojiPickerWrapper>
              </>
            )}
            <EditableInput value={newDirectoryDescription} onChange={setNewDirectoryDescription} placeholder={t.no_description} />
          </>
        )}
        {childrenDirectoryTrees != null && childrenDirectoryTrees.length > 0 && (
          <div className="my-3 bg-dark shadow p-3">
            <h5>{t.child_directory}</h5>
            <div className="row">
              {childrenDirectoryTrees.map((v) => {
                const directory = v.descendant as Directory;
                return (
                  <div className="col-xl-4 col-md-6 col-12" key={directory._id}>
                    <DirectoryListItem directory={directory} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="my-3 d-flex flex-column flex-sm-row justify-content-between gap-3">
          <SearchTextBox onChange={mutateSearchKeyword} />
          <SortButtonGroup />
        </div>
        {paginationResult == null && (
          <div className="text-center pt-5">
            <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
          </div>
        )}
        {paginationResult != null && (
          <PageList pages={paginationResult.docs} pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} isHideArchiveButton />
        )}
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;

const StyledEmojiPickerWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  z-index: 1300;
`;
