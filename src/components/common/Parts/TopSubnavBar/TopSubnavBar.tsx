import { FC } from 'react';

import styled from 'styled-components';

import { Grid, Text } from '@nextui-org/react';
import { useHooks } from './hooks';
import { Page } from '~/domains/Page';

import { zIndex } from '~/libs/constants/zIndex';
import { PageManageDropdown } from '~/components/domain/Page';

type Props = {
  page: Page;
};

export const TopSubnavBar: FC<Props> = ({ page }) => {
  const { isShowScroll } = useHooks();

  return (
    <StyledDiv $isShow={isShowScroll} css={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%' }}>
      <Grid css={{ display: 'flex', bgColor: '$gray100', justifyContent: 'space-evenly', alignItems: 'center', p: '8px' }}>
        <StyledAnchor href={page.url} target="blank" rel="noopener noreferrer">
          <Text
            css={{
              color: '$white',
              fontSize: '$sm',
              display: '-webkit-box',
              overflow: 'hidden',
              overflowWrap: 'anywhere',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {page.title}
          </Text>
        </StyledAnchor>
        <div className="ms-2">
          <PageManageDropdown page={page} />
        </div>
      </Grid>
      <StyledBorder />
    </StyledDiv>
  );
};

const StyledDiv = styled(Grid)<{ $isShow: boolean }>`
  z-index: ${zIndex.TOP_BORDER + 1};
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
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #f6d02e 0, #f87c00 47%, #f6d02e);
`;
