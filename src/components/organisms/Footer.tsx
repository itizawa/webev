import Link from 'next/link';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { UncontrolledTooltip } from 'reactstrap';

import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

export const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer mt-5 py-3 bg-dark border-top border-secondary">
      <div className="container d-flex">
        <div>
          <h5 className="text-muted mb-0">Webev</h5>
          <Link href="/term">
            <a className="text-muted">{t('term')}</a>
          </Link>
        </div>
        <div className="ms-auto">
          <div id="github-link-button">
            <IconButton
              width={24}
              height={24}
              icon={BootstrapIcon.GITHUB}
              color={BootstrapColor.SECONDARY}
              activeColor={BootstrapColor.SECONDARY}
              onClickButton={() => window.open('https://github.com/itizawa/webev-front', '_blank')}
            />
          </div>
          <UncontrolledTooltip placement="top" target="github-link-button">
            Webev is OSS
          </UncontrolledTooltip>
        </div>
      </div>
    </footer>
  );
};
