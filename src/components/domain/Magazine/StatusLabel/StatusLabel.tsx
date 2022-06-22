import { styled } from '@nextui-org/react';
import { FC } from 'react';
import { useLocale } from './useLocale';

type Props = {
  isPublic: boolean;
};

export const StatusLabel: FC<Props> = ({ isPublic }) => {
  const { t } = useLocale();
  return <StyledLabel type={isPublic ? 'public' : 'draft'}>{isPublic ? t.public : t.draft}</StyledLabel>;
};

const StyledLabel = styled('span', {
  display: 'inline-block',
  textTransform: 'uppercase',
  padding: '$2 $3',
  margin: '0 2px',
  fontSize: '12px',
  fontWeight: '$bold',
  borderRadius: '14px',
  letterSpacing: '0.6px',
  lineHeight: 1,
  boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 5%)',
  alignItems: 'center',
  alignSelf: 'center',
  color: '$white',
  variants: {
    type: {
      public: {
        bg: '$successLight',
        color: '$successLightContrast',
      },
      draft: {
        bg: '$gray800',
        color: '$gray200',
      },
    },
  },
  defaultVariants: {
    type: 'active',
  },
});
