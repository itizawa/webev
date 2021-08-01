import { FC, useRef } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

type Props = {
  text: string;
  fade?: boolean;
  placement?: 'top' | 'left' | 'right' | 'bottom';
};

export const Tooltip: FC<Props> = ({ children, text, fade, placement = 'top' }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={ref}>{children}</div>
      <UncontrolledTooltip fade={!!fade} placement={placement} target={ref}>
        {text}
      </UncontrolledTooltip>
    </>
  );
};
