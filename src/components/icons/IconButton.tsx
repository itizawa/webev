import { FC, ComponentProps } from 'react';
import { Icon } from './Icon';
import { BootstrapColor } from '~/interfaces/variables';

type Props = {
  isActive?: boolean;
  text?: string;
  color?: BootstrapColor;
  activeColor?: BootstrapColor;
  onClickButton?: () => void;
} & ComponentProps<typeof Icon>;

export const IconButton: FC<Props> = (props: Props) => {
  const { width, height, isActive, icon, text, color = BootstrapColor.SECONDARY, activeColor = BootstrapColor.INFO, onClickButton } = props;
  const textColor = isActive ? activeColor : color;

  const handleClickButton = () => {
    if (onClickButton != null) {
      onClickButton();
    }
  };

  return (
    <button className={`btn text-${textColor}`} onClick={handleClickButton}>
      <Icon width={width} height={height} icon={icon} />
      {text && <span className="ms-3">{text}</span>}
    </button>
  );
};
