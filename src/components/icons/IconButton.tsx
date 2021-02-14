import { FC } from 'react';
import { Icon } from './Icon';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

type Props = {
  width?: number;
  height?: number;
  isActive?: boolean;
  icon: BootstrapIcon;
  text?: string;
  color?: BootstrapColor;
  activeColor?: BootstrapColor;
  onClickButton: () => void;
};

export const IconButton: FC<Props> = (props: Props) => {
  const { width, height, isActive, icon, text, color = BootstrapColor.SECONDARY, activeColor = BootstrapColor.INFO, onClickButton } = props;
  const textColor = isActive ? activeColor : color;

  return (
    <button className={`btn text-${textColor}`} onClick={onClickButton}>
      <Icon width={width} height={height} icon={icon} />
      {text && <span className="ms-3">{text}</span>}
    </button>
  );
};
