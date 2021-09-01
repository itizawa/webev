import { VFC } from 'react';

import styled from 'styled-components';
import { useHooks } from './hooks';
import { Icon } from '~/components/base/atoms/Icon';
import { useLocale } from '~/hooks/useLocale';

type Props = {
  url: string;
  title: string;
  onClickReadButton: () => void;
  isArchived: boolean;
};
export const TopSubnavBar: VFC<Props> = ({ url, title, onClickReadButton, isArchived }) => {
  const { t } = useLocale();
  const { isShowScroll } = useHooks();

  return (
    <StyledDiv $isShow={isShowScroll} className="fixed-top">
      <div className="bg-dark d-flex justify-content-evenly align-items-center p-2">
        <div className="me-2">
          <StyledAnchor className="webev-limit-2lines text-white webev-anchor" href={url} target="blank" rel="noopener noreferrer">
            {title}
          </StyledAnchor>
        </div>
        {isArchived ? (
          <button className="btn btn-sm btn-secondary d-flex ms-auto" onClick={onClickReadButton}>
            <Icon height={20} width={20} icon="REPLY" color="WHITE" />
            <span className="ms-2 text-nowrap">{t.return_button}</span>
          </button>
        ) : (
          <button className="btn btn-sm btn-primary d-flex ms-auto" onClick={onClickReadButton}>
            <Icon height={20} width={20} icon="CHECK" color="WHITE" />
            <span className="ms-2 text-nowrap">{t.read_button}</span>
          </button>
        )}
      </div>
      <StyledBorder />
    </StyledDiv>
  );
};

const StyledDiv = styled.div<{ $isShow: boolean }>`
  -webkit-transition: -webkit-transform 0.4s ease;
  transition: -webkit-transform 0.4s ease;
  transition: transform 0.4s ease;
  transition: transform 0.4s ease, -webkit-transform 0.4s ease;
  transform: translateY(-150%);

  ${(props) =>
    props.$isShow &&
    `
    -webkit-transform: translateY(0);
    transform: translateY(0);
  `}
`;

const StyledAnchor = styled.a`
  font-size: 12px;
`;

const StyledBorder = styled.div`
  z-index: 980;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #f6d02e 0, #f87c00 47%, #f6d02e);
`;
