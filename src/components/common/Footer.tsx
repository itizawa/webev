import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';

import { Tooltip } from '~/components/base/atoms/Tooltip';
import { IconButton } from '~/components/base/molecules/IconButton';
import { useLocale } from '~/hooks/useLocale';

export const Footer: FC = () => {
  const { t } = useLocale();
  const router = useRouter();

  return (
    <StyledFooter className="footer mt-5 pt-3 bg-dark border-top border-secondary">
      <div className="row mx-auto">
        <div className="col-9">
          <h5 className="text-muted mb-0 text-white">Webev</h5>
          <ul className="ps-0">
            <li className="list-unstyled my-1" role="button">
              <Link href="/term">
                <a className="fw-bold text-muted webev-anchor">{t.term}</a>
              </Link>
            </li>
            <li className="list-unstyled my-1" role="button">
              <Link href="/news">
                <a className="fw-bold text-muted webev-anchor">{t.news}</a>
              </Link>
            </li>
            <li className="list-unstyled my-1" role="button">
              <Link href="/inquiry">
                <a className="fw-bold text-muted webev-anchor">{t.inquiry}</a>
              </Link>
            </li>
          </ul>
          <span className="me-2">🇺🇸</span>
          <Link href={router.asPath} locale="en">
            <a className="text-muted webev-anchor">English</a>
          </Link>
          <span className="ms-3 me-2">🇯🇵</span>
          <Link href={router.asPath} locale="ja">
            <a className="text-muted webev-anchor">Japanese</a>
          </Link>
        </div>
        <div className="col-3 d-flex justify-content-end">
          <Tooltip text="Webev is OSS" fade>
            <IconButton
              width={24}
              height={24}
              icon="GITHUB"
              color="SECONDARY"
              activeColor="SECONDARY"
              onClickButton={() => window.open('https://github.com/webev-dev', '_blank')}
            />
          </Tooltip>
          <Tooltip text="Please feel free to contact me!" fade>
            <IconButton
              width={24}
              height={24}
              icon="TWITTER"
              color="SECONDARY"
              activeColor="SECONDARY"
              onClickButton={() => window.open('https://twitter.com/itizawa_pen', '_blank')}
            />
          </Tooltip>
        </div>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  padding-bottom: 70px;
`;
