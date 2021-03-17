import { VFC, ComponentProps } from 'react';
import ClassNames from 'classnames';
import { Icon } from './Icon';
import { BootstrapColor } from '~/interfaces/variables';

type Props = {
  isActive?: boolean;
  disabled?: boolean;
  text?: string;
  color: BootstrapColor;
  activeColor: BootstrapColor;
  buttonColor?: BootstrapColor;
  onClickButton?: () => void;
} & ComponentProps<typeof Icon>;

export const IconButton: VFC<Props> = (props: Props) => {
  const { width, height, isActive, disabled, icon, text, color, activeColor, buttonColor, onClickButton } = props;
  const textColor = isActive ? activeColor : color;

  const handleClickButton = () => {
    if (onClickButton != null) {
      onClickButton();
    }
  };

  const btnClassName = ClassNames({
    ['btn']: true,
    [`btn-${buttonColor}`]: buttonColor != null,
    ['disabled']: disabled,
  });

  return (
    <button className={btnClassName} onClick={handleClickButton}>
      <Icon width={width} height={height} icon={icon} color={textColor} />
      {text && <span className={`ms-3 text-${textColor}`}>{text}</span>}
    </button>
  );
};
