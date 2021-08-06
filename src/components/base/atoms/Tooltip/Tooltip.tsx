import { FC, useRef } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

type Props = {
  text: string;
  disabled?: boolean;
  fade?: boolean;
  placement?: 'top' | 'left' | 'right' | 'bottom';
};

export const Tooltip: FC<Props> = ({ children, disabled, text, fade, placement = 'top' }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <span ref={ref}>{children}</span>
      {!disabled && (
        <UncontrolledTooltip fade={!!fade} placement={placement} target={ref}>
          {text}
        </UncontrolledTooltip>
      )}
    </>
  );
};
