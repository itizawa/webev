import { FC, ComponentProps } from 'react';
import ClassNames from 'classnames';
import { Icon } from './Icon';
import { BootstrapColor } from '~/interfaces/variables';

type Props = {
  isActive?: boolean;
  text?: string;
  color?: BootstrapColor;
  activeColor?: BootstrapColor;
  buttonColor?: BootstrapColor;
  onClickButton?: () => void;
} & ComponentProps<typeof Icon>;

export const IconButton: FC<Props> = (props: Props) => {
  const { width, height, isActive, icon, text, color = BootstrapColor.SECONDARY, activeColor = BootstrapColor.INFO, buttonColor, onClickButton } = props;
  const textColor = isActive ? activeColor : color;

  const handleClickButton = () => {
    if (onClickButton != null) {
      onClickButton();
    }
  };

  const btnClassName = ClassNames({
    [`btn text-${textColor}`]: true,
    [`btn-${buttonColor}`]: buttonColor != null,
  });

  return (
    <button className={btnClassName} onClick={handleClickButton}>
      <Icon width={width} height={height} icon={icon} />
      {text && <span className="ms-3">{text}</span>}
    </button>
  );
};
