import { VFC } from 'react';
import Link from 'next/link';

import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { Icon } from '~/components/Icons/Icon';

export const Diectory: VFC = () => {
  return (
    <>
      <h5 className="text-center">
        <Icon icon={BootstrapIcon.DIRECTORY} color={BootstrapColor.LIGHT} />
        <Link href="/directory">
          <span className="ms-2 d-none d-lg-inline-block c-pointer">Directory</span>
        </Link>
      </h5>
      <div className="text-center">
        <IconButton icon={BootstrapIcon.PLUS_DOTTED} color={BootstrapColor.LIGHT} activeColor={BootstrapColor.LIGHT} />
      </div>
    </>
  );
};
