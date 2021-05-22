import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import styled from 'styled-components';

import { IconButton } from '~/components/Icons/IconButton';
import { useLocale } from '~/hooks/useLocale';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

export const Footer: FC = () => {
  const { t } = useLocale();
  const router = useRouter();

  return (
    <StyledFooter className="footer mt-5 pt-3 bg-dark border-top border-secondary">
      <div className="container d-flex">
        <div>
          <h5 className="text-muted mb-0">Webev</h5>
          <ul className="ps-0">
            <li className="list-unstyled my-1">
              <Link href="/term">
                <a className="fw-bold text-muted text-decoration-none">{t.term}</a>
              </Link>
            </li>
            <li className="list-unstyled my-1">
              <Link href="/news">
                <a className="fw-bold text-muted text-decoration-none">{t.news}</a>
              </Link>
            </li>
          </ul>
          <span className="me-2">🇺🇸</span>
          <Link href={router.asPath} locale="en">
            <a className="text-muted">English</a>
          </Link>
          <span className="ms-3 me-2">🇯🇵</span>
          <Link href={router.asPath} locale="ja">
            <a className="text-muted">Japanese</a>
          </Link>
        </div>
        <div id="github-link-button" className="ms-auto">
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
        <div id="twitter-link-button">
          <IconButton
            width={24}
            height={24}
            icon={BootstrapIcon.TWITTER}
            color={BootstrapColor.SECONDARY}
            activeColor={BootstrapColor.SECONDARY}
            onClickButton={() => window.open('https://twitter.com/itizawa_pen', '_blank')}
          />
        </div>
        <UncontrolledTooltip placement="top" target="twitter-link-button">
          Please feel free to contact me!
        </UncontrolledTooltip>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  padding-bottom: 80px;
`;
