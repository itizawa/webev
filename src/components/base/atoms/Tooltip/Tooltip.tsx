import { FC, useRef } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

type Props = {
  text: string;
  placement?: 'top' | 'left' | 'right' | 'bottom';
};

export const Tooltip: FC<Props> = ({ children, text, placement = 'top' }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={ref}>{children}</div>
      <UncontrolledTooltip placement={placement} target={ref}>
        {text}
      </UncontrolledTooltip>
    </>
  );
};
