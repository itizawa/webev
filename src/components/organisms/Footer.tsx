import Link from 'next/link';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer mt-5 py-3 bg-dark border-top border-secondary">
      <div className="container">
        <h5 className="text-muted mb-0">Webev</h5>
        <Link href="/term">
          <a className="text-muted">{t('term')}</a>
        </Link>
      </div>
    </footer>
  );
};
