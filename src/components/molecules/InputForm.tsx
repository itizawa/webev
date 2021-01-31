import { FC } from 'react';

type Props = {
  inputValue: string;
  onChangeInputValue: (value: string) => void;
  onClickSaveBtn: () => void;
};

export const InputForm: FC<Props> = (props: Props) => {
  const { inputValue } = props;

  const handleChangeValue = (inputValue: string) => {
    if (props.onChangeInputValue != null) {
      props.onChangeInputValue(inputValue);
    }
  };

  const handleClickSaveBtn = () => {
    if (props.onClickSaveBtn != null) {
      props.onClickSaveBtn();
    }
  };

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control ps-3"
        placeholder="URL を保存"
        aria-label="Input Group"
        aria-describedby="input-group"
        value={inputValue}
        onChange={(e) => handleChangeValue(e.target.value)}
      />
      <button className="btn btn-secondary" type="button" id="input-group" onClick={handleClickSaveBtn}>
        保存する
      </button>
    </div>
  );
};
