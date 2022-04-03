import Image from 'next/image';
import { VFC } from 'react';
import { imagePath } from '@monorepo/webev-client/src/libs/constants/imagePath';

import { useLocale } from '@monorepo/webev-client/src/hooks/useLocale';

export const NoPageAlert: VFC = () => {
  const { t } = useLocale();

  return (
    <div className="text-center">
      <div className="w-25 mx-auto my-2">
        <Image src={imagePath.NO_PAGE} height={958} width={1000} />
      </div>
      <h2 className="mb-0">{t['your_pages_don’t_exist']}</h2>
    </div>
  );
};
