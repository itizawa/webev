import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState, useRef, VFC } from 'react';

import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap';
import { Emoji, Picker, EmojiData, emojiIndex } from 'emoji-mart';

import { openFileFolderEmoji } from '~/const/emoji';
import { useLocale } from '~/hooks/useLocale';

import { useAllDirectories, useAllParentDirectories, useAncestorDirectories, useDirectoryChildren, useDirectoryInfomation } from '~/stores/directory';
import { useDirectoryId, usePageListSWR, usePageStatus } from '~/stores/page';
import { useDirectoryForDelete, useParentDirectoryForCreateDirectory, useDirectoryForRename, useDirectoryForSavePage } from '~/stores/modal';
import { useUrlFromClipBoard } from '~/stores/contexts';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/common/SortButtonGroup';
import { SearchForm } from '~/components/common/SearchForm';
import { IconButton } from '~/components/base/molecules/IconButton';
import { Icon } from '~/components/base/atoms/Icon';
import { PageList } from '~/components/domain/Page/molecules/PageList';
import { EditableInput } from '~/components/case/molecules/EditableInput';
import { DirectoryListItem } from '~/components/domain/Directory/molecules/DirectoryListItem';

import { Directory } from '~/domains/Directory';
import { PageStatus } from '~/domains/Page';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

const emojiSize = 40;

const Index: VFC = () => {
  const { t } = useLocale();

  const router = useRouter();
  const { id } = router.query;

  const { mutate: mutateDirectoryId } = useDirectoryId();
  const { mutate: mutateDirectoryForDelete } = useDirectoryForDelete();
  const { mutate: mutateDirectoryForRename } = useDirectoryForRename();
  const { mutate: mutateParentDirectoryForCreateDirectory } = useParentDirectoryForCreateDirectory();

  const { data: urlFromClipBoard } = useUrlFromClipBoard();
  const { mutate: mutateDirectoryForSavePage } = useDirectoryForSavePage();

  mutateDirectoryId(id as string);
  const { data: directory, mutate: mutateDirectory, isValidating: isValidatingDirectory } = useDirectoryInfomation(id as string);
  const { data: ancestorDirectories } = useAncestorDirectories(id as string);
  const { data: paginationResult } = usePageListSWR();
  const { data: childrenDirectoryTrees, mutate: mutateDirectoryChildren } = useDirectoryChildren(directory?._id);
  const { mutate: mutateAllDirectories } = useAllDirectories();
  const { mutate: mutateAllParentDirectories } = useAllParentDirectories();

  const [isEmojiSettingMode, setIsEmojiSettingMode] = useState<boolean>();
  const [emoji, setEmoji] = useState<EmojiData>(openFileFolderEmoji);
  const [pickerTop, setPickerTop] = useState<number>(0);
  const [pickerLeft, setPickerLeft] = useState<number>(0);
  const emojiRef = useRef<HTMLDivElement>(null);

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

  const updateDirectroyName = async (name: string): Promise<void> => {
    try {
      await restClient.apiPut(`/directories/${directory?._id}/rename`, { name });
      mutateDirectory();
      mutateAllParentDirectories();
      mutateDirectoryChildren();
      mutateAllDirectories();
      toastSuccess(t.toastr_update_directory_name);
    } catch (err) {
      toastError(err);
    }
  };

  const updateDirectroyDescription = async (description: string): Promise<void> => {
    try {
      await restClient.apiPut(`/directories/${directory?._id}/description`, { description });
      mutateAllDirectories();
      toastSuccess(t.toastr_update_directory_description);
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

  if (isValidatingDirectory) {
    return (
      <div className="text-center pt-5">
        <Loader type="Oval" color="#00BFFF" height={64} width={64} />
      </div>
    );
  }

  return (
    <>
      <WebevOgpHead title={`Webev | ${directory?.name}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          {directory != null && (
            <>
              <div className="text-nowrap overflow-scroll small pb-2 pb-md-0">
                <Link href="/directory">
                  <a className="webev-anchor text-white">{t.directory}</a>
                </Link>
                <span className="mx-1">{'/'}</span>
                {ancestorDirectories?.map((ancestorDirectorie) => {
                  const ancestorDirectory = ancestorDirectorie.ancestor as Directory;
                  if (ancestorDirectory._id === directory._id) {
                    return null;
                  }
                  return (
                    <Fragment key={ancestorDirectorie._id}>
                      <Link href={`/directory/${ancestorDirectory._id}`}>
                        <a className="webev-anchor text-white">{ancestorDirectory.name}</a>
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
                <EditableInput value={directory.name} onSubmit={updateDirectroyName} isHeader />
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
                <UncontrolledTooltip placement="top" target="save-page-to-directory">
                  {t.save_to_directory(directory.name)}
                </UncontrolledTooltip>
                <UncontrolledDropdown direction="down">
                  <DropdownToggle tag="div">
                    <IconButton width={18} height={18} icon="THREE_DOTS_HORIZONAL" color="SECONDARY" activeColor="WARNING" />
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
              <EditableInput value={directory.description} onSubmit={updateDirectroyDescription} isAllowEmpty placeholder={t.no_description} />
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
            <div>
              <SearchForm />
            </div>
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
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;

const StyledEmojiPickerWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  z-index: 1300;
`;
