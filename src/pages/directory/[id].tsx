import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState, useRef, VFC } from 'react';

import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap';
import { Emoji, Picker, EmojiData, emojiIndex } from 'emoji-mart';
import { openFileFolderEmoji } from '~/const/emoji';
import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';
import { useLocale } from '~/hooks/useLocale';

import { useAllDirectories, useAncestorDirectories, useDirectoryChildren, useDirectoryInfomation, useDirectoryListSWR } from '~/stores/directory';
import { useDirectoryId, usePageListSWR } from '~/stores/page';
import { useDirectoryForDelete, useParentDirectoryForCreateDirectory, useDirectoryForRename, useDirectoryForSavePage } from '~/stores/modal';
import { useUrlFromClipBoard } from '~/stores/contexts';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/Commons/SortButtonGroup';
import { SearchForm } from '~/components/Commons/SearchForm';
import { IconButton } from '~/components/Icons/IconButton';
import { Icon } from '~/components/Icons/Icon';
import { PageList } from '~/components/Page/PageList';

import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { Directory } from '~/domains/Directory';
import { DirectoryListItem } from '~/components/Directory/DirectoryListItem';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

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
  const { data: directory, mutate: mutateDirectory } = useDirectoryInfomation(id as string);
  const { data: ancestorDirectories } = useAncestorDirectories(id as string);
  const { data: paginationResult } = usePageListSWR();
  const { data: childrenDirectoryTrees, mutate: mutateDirectoryChildren } = useDirectoryChildren(directory?._id);
  const { mutate: mutateAllDirectories } = useAllDirectories();
  const { mutate: mutateDirectoryList } = useDirectoryListSWR();

  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [descriptionRows, setDescriptionRows] = useState<number>();
  const [isEmojiSettingMode, setIsEmojiSettingMode] = useState<boolean>();
  const [emoji, setEmoji] = useState<EmojiData>(openFileFolderEmoji);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (directory != null) {
      setName(directory.name);
      setDescription(directory.description);

      const result = emojiIndex.search(directory.emojiId);
      if (result != null) {
        setEmoji(result[0]);
      }
    }
  }, [directory]);

  useEffect(() => {
    if (description != null) {
      setDescriptionRows(description.split('\n').length);
    }
  }, [description]);

  const openDeleteModal = (directory: Directory) => {
    mutateDirectoryForDelete(directory);
  };

  const openRenameModal = (directory: Directory) => {
    mutateDirectoryForRename(directory);
  };

  const openAddDirectoryModal = (directory: Directory) => {
    mutateParentDirectoryForCreateDirectory(directory);
  };

  const handleChangeDescription = (inputValue: string) => {
    setDescription(inputValue);
  };

  const handleBlurTextInput = async (): Promise<void> => {
    // name is required
    if (name?.trim() === '') {
      return setName(directory?.name);
    }
    // do nothing, no change
    if (name === directory?.name) {
      return;
    }
    try {
      await restClient.apiPut(`/directories/${directory?._id}/rename`, { name });
      mutateAllDirectories();
      mutateDirectory();
      mutateDirectoryList();
      mutateDirectoryChildren();
      mutateAllDirectories();
      toastSuccess(t.toastr_update_directory_name);
    } catch (err) {
      toastError(err);
    }
  };

  const handleBlurTextArea = async (): Promise<void> => {
    // do nothing, no change
    if (description === directory?.description) {
      return;
    }
    try {
      await restClient.apiPut(`/directories/${directory?._id}/description`, { description });
      mutateAllDirectories();
      toastSuccess(t.toastr_update_directory_description);
    } catch (err) {
      toastError(err);
    }
  };

  const handleEmoji = async (emoji: EmojiData) => {
    const emojiId = emoji.id;

    try {
      await restClient.apiPut(`/directories/${directory?._id}/emoji`, { emojiId });
      mutateDirectory();
      toastSuccess(t.toastr_update_emoji);
      setEmoji(emoji);
      setIsEmojiSettingMode(false);
    } catch (error) {
      toastError(error);
    }
  };

  const handleEmoji2 = () => {
    setIsEmojiSettingMode(true);
    if (emojiRef.current != null) {
      setTop(emojiRef.current.offsetTop);
      setLeft(emojiRef.current.offsetLeft);
    }
  };

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
              <div className="d-flex gap-3 align-items-center mt-2">
                <div ref={emojiRef}>
                  <Emoji emoji={emoji} size={40} onClick={() => handleEmoji2()} />
                </div>
                <StyledInput
                  className="form-control text-nowrap overflow-scroll fs-1 pt-0 pb-2 pb-md-0 me-auto w-100"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleBlurTextInput}
                  value={name || ''}
                />
                <div id="save-page-to-directory">
                  <IconButton
                    width={18}
                    height={18}
                    icon={BootstrapIcon.SAVE}
                    color={BootstrapColor.SECONDARY}
                    activeColor={BootstrapColor.WARNING}
                    isActive={urlFromClipBoard != null}
                    onClickButton={() => mutateDirectoryForSavePage(directory)}
                  />
                </div>
                <UncontrolledTooltip placement="top" target="save-page-to-directory">
                  {t.save_to_directory(directory.name)}
                </UncontrolledTooltip>
                <UncontrolledDropdown direction="down">
                  <DropdownToggle tag="div">
                    <IconButton
                      width={18}
                      height={18}
                      icon={BootstrapIcon.THREE_DOTS_HORIZONAL}
                      color={BootstrapColor.SECONDARY}
                      activeColor={BootstrapColor.WARNING}
                    />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-dark" positionFixed right>
                    <DropdownItem tag="button" onClick={() => openDeleteModal(directory)}>
                      <Icon icon={BootstrapIcon.TRASH} color={BootstrapColor.WHITE} />
                      <span className="ms-2">{t.delete}</span>
                    </DropdownItem>
                    <DropdownItem tag="button" onClick={() => openRenameModal(directory)}>
                      <Icon icon={BootstrapIcon.PENCIL} color={BootstrapColor.WHITE} />
                      <span className="ms-2">{t.rename_directory}</span>
                    </DropdownItem>
                    <DropdownItem tag="button" onClick={() => openAddDirectoryModal(directory)}>
                      <Icon icon={BootstrapIcon.ADD_TO_DIRECTORY} color={BootstrapColor.WHITE} />
                      <span className="ms-2">{t.create_directory}</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              {isEmojiSettingMode && (
                <StyledEmojiPicker className=" position-fixed top-0 start-0 end-0 bottom-0" onClick={() => setIsEmojiSettingMode(false)}>
                  <Picker theme="dark" onSelect={(emoji) => handleEmoji(emoji)} style={{ position: 'absolute', left: left, top: top }} />
                </StyledEmojiPicker>
              )}
            </>
          )}
          <StyledTextarea
            className="form-control w-100 mt-2"
            value={description}
            rows={descriptionRows}
            onChange={(e) => handleChangeDescription(e.target.value)}
            onBlur={handleBlurTextArea}
            placeholder={t.no_description}
          />
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
            <PageList pages={paginationResult.docs} pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} />
          )}
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;

const StyledInput = styled.input`
  color: #ccc;
  background: transparent;
  border: none;

  &:hover {
    color: #ccc;
    background: #232323;
    ::placeholder {
      color: #ccc;
    }
  }

  &:focus {
    color: #ccc;
    background: transparent;
    ::placeholder {
      color: #ccc;
    }
  }
`;

const StyledEmojiPicker = styled.div`
  z-index: 1300;
`;

const StyledTextarea = styled.textarea`
  color: #ccc;
  resize: none;
  background: transparent;
  border: none;

  &:hover {
    color: #ccc;
    background: #232323;
    ::placeholder {
      color: #ccc;
    }
  }

  &:focus {
    color: #ccc;
    background: transparent;
    ::placeholder {
      color: #ccc;
    }
  }
`;
