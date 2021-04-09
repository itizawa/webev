import { VFC, ComponentProps } from 'react';
import { Icon } from './Icon';
import { BootstrapColor } from '~/interfaces/variables';

type Props = {
  isActive?: boolean;
  disabled?: boolean;
  text?: string;
  color: BootstrapColor;
  activeColor: BootstrapColor;
  buttonSize?: 'sm' | 'lg';
  buttonColor?: BootstrapColor;
  onClickButton?: () => void;
} & ComponentProps<typeof Icon>;

export const IconButton: VFC<Props> = (props: Props) => {
  const { width, height, isActive, disabled, icon, text, color, activeColor, buttonColor, buttonSize, onClickButton } = props;
  const textColor = isActive ? activeColor : color;

  const handleClickButton = () => {
    if (onClickButton != null) {
      onClickButton();
    }
  };

  const btnClassName: string[] = ['btn', 'px-2'];
  if (buttonSize != null) {
    btnClassName.push(`btn-${buttonSize}`);
  }
  if (buttonColor != null) {
    btnClassName.push(`btn-${buttonColor}`);
  }
  if (disabled) {
    btnClassName.push('disabled');
  }

  return (
    <button className={btnClassName.join(' ')} onClick={handleClickButton}>
      <Icon width={width} height={height} icon={icon} color={textColor} />
      {text && <span className={`ms-2 text-${textColor}`}>{text}</span>}
    </button>
  );
};
