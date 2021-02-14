import { FC } from 'react';
import ClassNames from 'classnames';

type Props = {
  width?: number;
  height?: number;
  isActive?: boolean;
  text?: string;
};

export const IconButton: FC<Props> = (props: Props) => {
  const { width = 18, height = 18, isActive = false, text } = props;

  const classNameForListItem = ClassNames({
    'bi align-text-bottom': true,
    'text-warning': isActive,
    'text-secondary': !isActive,
  });

  return (
    <button className="btn text-white bg-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="align-text-bottom" fill="currentColor" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
      {text && <span className="ms-3">{text}</span>}
    </button>
  );
};
