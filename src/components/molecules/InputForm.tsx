import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { apiPost } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';
import { usePageListSWR } from '~/stores/page';

type FormValues = {
  url: string;
};

const urlInputName = 'url';

export const InputForm: FC = () => {
  const { mutate: pageListMutate } = usePageListSWR();
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  const onSubmit = async (formValues: FormValues): Promise<void> => {
    const { url } = formValues;

    try {
      const res = await apiPost('/pages', { url });
      const { title } = res.data;
      toastSuccess(`${title} を保存しました!`);
      setValue(urlInputName, '');
      pageListMutate();
    } catch (err) {
      toastError(err);
    }
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
