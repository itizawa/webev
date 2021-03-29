import Link from 'next/link';
import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

export const NoArchivePageAlert: VFC = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center alert alert-info">
      <h2>{t('your_archive_pages_don’t_exist')}</h2>
      <Link href="/home">
        <a className="text-dark">{t('archive_immediately')}</a>
      </Link>
    </div>
  );
};
