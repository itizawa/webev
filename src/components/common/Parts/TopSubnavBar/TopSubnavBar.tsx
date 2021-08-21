import { VFC } from 'react';

import styled from 'styled-components';
import { useHooks } from './hooks';
import { Icon } from '~/components/base/atoms/Icon';
import { useLocale } from '~/hooks/useLocale';

type Props = {
  onClickReadButton: () => void;
};
export const TopSubnavBar: VFC<Props> = ({ onClickReadButton }) => {
  const { t } = useLocale();
  const { isShowScroll } = useHooks();

  return (
    <StyledDiv $isShow={isShowScroll} className="fixed-top d-md-none">
      <div className="bg-dark d-flex justify-content-evenly p-2">
        <button className="btn btn-sm btn-primary d-flex ms-auto" onClick={onClickReadButton}>
          <Icon height={20} width={20} icon="CHECK" color="WHITE" />
          <span className="ms-2 text-nowrap">{t.read_button}</span>
        </button>
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

const StyledBorder = styled.div`
  z-index: 980;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #f6d02e 0, #f87c00 47%, #f6d02e);
`;
