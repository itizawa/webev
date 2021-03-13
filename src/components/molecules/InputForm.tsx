import { FC } from 'react';
import { useForm } from 'react-hook-form';

import styles from '~/styles/components/molecules/InputForm.module.scss';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';
import { usePageListSWR } from '~/stores/page';

type FormValues = {
  url: string;
};

const urlInputName = 'url';

export const InputForm: FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const { mutate: mutatePageList } = usePageListSWR();

  const onSubmit = async (formValues: FormValues): Promise<void> => {
    const { url } = formValues;

    try {
      await restClient.apiPost('/pages', { url });
      toastSuccess(`${url} を保存しました!`);
      mutatePageList();
    } catch (err) {
      toastError(err);
    }
    setValue(urlInputName, '');
  };

  return (
    <form className="input-group" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" name={urlInputName} ref={register} className={`form-control ps-3 ${styles['left-side']}`} placeholder="URL を保存" />
      <button className={`btn btn-secondary ${styles['right-side']}`} type="submit" id="input-group">
        保存する
      </button>
    </form>
  );
};
