import { useState, VFC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { IconButton } from '../Icons/IconButton';
import { DirectoryItem } from '../Directory/DirectoryItem';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { Icon } from '~/components/Icons/Icon';
import { navbarItemMappings } from '~/const/navbarItemMappings';
import { useLocale } from '~/hooks/useLocale';
import { useDirectoryListSWR } from '~/stores/directory';

export const SubnavBar: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();
  const directoryId = router.query.id;

  const { data: paginationResult } = useDirectoryListSWR();

  const [isDisplayDirectoryHierarchie, setIsDisplayDirectoryHierarchie] = useState(false);

  const closeDirectoryHierarchieModal = () => {
    setIsDisplayDirectoryHierarchie(false);
  };

  const handleClickDirectory = (directoryId: string) => {
    setIsDisplayDirectoryHierarchie(false);
    router.push(`/directory/${directoryId}`);
  };

  return (
    <>
      <StyledSubnavBar className="sticky-top bg-dark d-flex justify-content-evenly d-md-none">
        {navbarItemMappings.map((v) => {
          return (
            <Link key={v.text} href={v.url}>
              <StyledSubnavBarItem className="text-center col py-2" isActive={v.url === router.pathname}>
                {v.icon != null && <Icon icon={v.icon} color={BootstrapColor.SECONDARY} />}
                <span className="ms-1">{v.text}</span>
              </StyledSubnavBarItem>
            </Link>
          );
        })}
        <IconButton
          width={24}
          height={24}
          icon={BootstrapIcon.DIRECTORY}
          color={BootstrapColor.SECONDARY}
          activeColor={BootstrapColor.SECONDARY}
          isActive={isDisplayDirectoryHierarchie}
          onClickButton={() => setIsDisplayDirectoryHierarchie(true)}
        />
      </StyledSubnavBar>
      <Modal isOpen={isDisplayDirectoryHierarchie} toggle={closeDirectoryHierarchieModal}>
        <ModalHeader className="bg-dark">{t.directory}</ModalHeader>
        <ModalBody className="bg-dark text-break">
          {paginationResult?.docs.map((directory) => {
            return <DirectoryItem key={directory._id} directory={directory} onClickDirectory={handleClickDirectory} activeDirectoryId={directoryId as string} />;
          })}
          <button className="mt-3 btn btn-secondary w-100" onClick={closeDirectoryHierarchieModal}>
            {t.cancel}
          </button>
        </ModalBody>
      </Modal>
    </>
  );
};

const StyledSubnavBar = styled.div`
  top: -1px;
`;

const StyledSubnavBarItem = styled.div<{ isActive: boolean }>`
  ${({ isActive }) => isActive && `border-bottom: 4px solid slateblue;`}
`;
