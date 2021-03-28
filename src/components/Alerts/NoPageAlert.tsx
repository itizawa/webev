import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

export const NoPageAlert: VFC = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center alert alert-info">
      <h2>{t('your_pages_don’t_exist')}</h2>
      <span>{t('save_the_url_immediately')}</span>
    </div>
  );
};
