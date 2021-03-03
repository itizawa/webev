import { FC, ComponentProps } from 'react';
import ClassNames from 'classnames';
import { Icon } from './Icon';
import { BootstrapColor } from '~/interfaces/variables';

type Props = {
  isActive?: boolean;
  text?: string;
  color: BootstrapColor;
  activeColor: BootstrapColor;
  buttonColor?: BootstrapColor;
  onClickButton?: () => void;
} & ComponentProps<typeof Icon>;

export const IconButton: FC<Props> = (props: Props) => {
  const { width, height, isActive, icon, text, color, activeColor, buttonColor, onClickButton } = props;
  const textColor = isActive ? activeColor : color;

  const handleClickButton = () => {
    if (onClickButton != null) {
      onClickButton();
    }
  };

  const btnClassName = ClassNames({
    ['btn']: true,
    [`btn-${buttonColor}`]: buttonColor != null,
  });

  return (
    <button className={btnClassName} onClick={handleClickButton}>
      <Icon width={width} height={height} icon={icon} color={textColor} />
      {text && <span className={`ms-3 text-${textColor}`}>{text}</span>}
    </button>
  );
};
