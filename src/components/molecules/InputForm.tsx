import { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onSubmitForm?: (url: string) => void;
};

type FormValues = {
  url: string;
};

const urlInputName = 'url';

export const InputForm: FC<Props> = (props: Props) => {
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  const onSubmit = async (formValues: FormValues): Promise<void> => {
    const { url } = formValues;
    if (props?.onSubmitForm != null) {
      await props.onSubmitForm(url);
    }
    setValue(urlInputName, '');
  };

  return (
    <form className="input-group" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name={urlInputName}
        ref={register}
        className="form-control ps-3"
        placeholder="URL を保存"
        aria-label="Input Group"
        aria-describedby="input-group"
      />
      <button className="btn btn-secondary" type="submit" id="input-group">
        保存する
      </button>
    </form>
  );
};
