import { useState, VFC } from 'react';
import { Collapse } from 'reactstrap';

import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

type Props = {};
export const DirectoryItem: VFC = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="text-white text-left w-100 rounded" role="button" onClick={() => setIsOpen((prevState) => !prevState)}>
        {isOpen ? (
          <IconButton width={18} height={18} icon={BootstrapIcon.CARET_DOWN} color={BootstrapColor.SECONDARY} activeColor={BootstrapColor.SECONDARY} />
        ) : (
          <IconButton width={18} height={18} icon={BootstrapIcon.CARET_RIGHT} color={BootstrapColor.SECONDARY} activeColor={BootstrapColor.SECONDARY} />
        )}
        hoge
      </div>
      <Collapse isOpen={isOpen}>{isOpen && <DirectoryItem />}</Collapse>
    </>
  );
};
