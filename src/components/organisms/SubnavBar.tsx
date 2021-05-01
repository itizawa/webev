import { useState, VFC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { IconButton } from '../Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { Icon } from '~/components/Icons/Icon';
import { navbarItemMappings } from '~/const/navbarItemMappings';
import { useLocale } from '~/hooks/useLocale';

export const SubnavBar: VFC = () => {
  const router = useRouter();
  const { t } = useLocale();
  const [isDisplayDirectoryHierarchie, setIsDisplayDirectoryHierarchie] = useState(false);
  const closeDirectoryHierarchieModal = () => {
    setIsDisplayDirectoryHierarchie(false);
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
          <button className="mx-auto btn btn-secondary w-100" onClick={closeDirectoryHierarchieModal}>
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
