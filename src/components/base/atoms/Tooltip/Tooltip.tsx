import { VFC, useRef, ReactNode } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

type Props = {
  text: string;
  disabled?: boolean;
  fade?: boolean;
  placement?: 'top' | 'left' | 'right' | 'bottom';
  children: ReactNode;
};

export const Tooltip: VFC<Props> = ({ children, disabled, text, fade, placement = 'top' }) => {
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
