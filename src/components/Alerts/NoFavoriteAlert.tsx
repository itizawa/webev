import Link from 'next/link';
import { VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

export const NoFavoritePageAlert: VFC = () => {
  const { t } = useLocale();

  return (
    <div className="text-center alert alert-info">
      <h2>{t['your_favorite_pages_don’t_exist']}</h2>
      <Link href="/home">
        <a className="text-dark">{t.favorite_immediately}</a>
      </Link>
    </div>
  );
};
